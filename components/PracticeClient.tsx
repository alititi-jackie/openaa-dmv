'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

function readIds(key: string) { try { return JSON.parse(window.localStorage.getItem(key) || '[]') as string[] } catch { return [] } }
function writeIds(key: string, ids: string[]) { window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids)))) }

export default function PracticeClient({ questions, stateSlug, storageKey }: { questions: DmvQuestion[]; stateSlug: string; storageKey: string }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [mode, setMode] = useState<'order' | 'random'>('order')
  const [scope, setScope] = useState<'all' | 'favorites'>('all')
  const [seed, setSeed] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<string[]>([])
  const [correctIds, setCorrectIds] = useState<string[]>([])
  const [masteredIds, setMasteredIds] = useState<string[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [autoNext, setAutoNext] = useState(false)
  const autoNextTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const answeredKey = `${storageKey}:answered`, correctKey = `${storageKey}:correct`, masteredKey = `${storageKey}:mastered`, favoritesKey = `${storageKey}:favorites`, resumeKey = `${storageKey}:practice-index`, autoNextKey = `${storageKey}:auto-next`, mockScoreKey = `${storageKey}:last-mock-score`

  useEffect(() => {
    setAnsweredIds(readIds(answeredKey)); setCorrectIds(readIds(correctKey)); setMasteredIds(readIds(masteredKey)); setFavoriteIds(readIds(favoritesKey)); setAutoNext(window.localStorage.getItem(autoNextKey) === '1')
    const savedIndex = Number(window.localStorage.getItem(resumeKey) || '0'); if (Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < questions.length) setIndex(savedIndex)
    return () => { if (autoNextTimer.current) clearTimeout(autoNextTimer.current) }
  }, [answeredKey, correctKey, masteredKey, favoritesKey, resumeKey, autoNextKey, questions.length])

  const scopedQuestions = useMemo(() => scope === 'favorites' ? questions.filter((q) => favoriteIds.includes(q.id)) : questions, [scope, questions, favoriteIds])
  const orderedQuestions = useMemo(() => mode === 'order' ? scopedQuestions : shuffleQuestions(scopedQuestions, seed), [mode, scopedQuestions, seed])
  useEffect(() => { if (index >= orderedQuestions.length) { setIndex(0); setSelected(null) } }, [index, orderedQuestions.length])

  const scopedIds = useMemo(() => new Set(questions.map((q) => q.id)), [questions])
  const completedCount = answeredIds.filter((id) => scopedIds.has(id)).length
  const correctCount = correctIds.filter((id) => scopedIds.has(id)).length
  const masteredCount = masteredIds.filter((id) => scopedIds.has(id)).length
  const accuracy = completedCount ? Math.round((correctCount / completedCount) * 100) : 0
  const favoriteCount = favoriteIds.filter((id) => scopedIds.has(id)).length
  const coverage = questions.length ? completedCount / questions.length : 0
  const mastery = completedCount ? masteredCount / completedCount : 0
  const lastMockScore = typeof window !== 'undefined' ? Number(window.localStorage.getItem(mockScoreKey) || '0') : 0
  const readiness = Math.min(100, Math.round(coverage * 40 + (lastMockScore / 100) * 40 + mastery * 20))

  function changeScope(next: 'all' | 'favorites') { setScope(next); setIndex(0); setSelected(null) }
  function toggleAutoNext() { const next = !autoNext; setAutoNext(next); window.localStorage.setItem(autoNextKey, next ? '1' : '0') }

  if (scope === 'favorites' && orderedQuestions.length === 0) return <div className="card p-6 text-center"><Star size={28} className="mx-auto text-amber-500" /><h1 className="mt-3 text-2xl font-black text-slate-950">还没有收藏题目</h1><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">在练习或题库中点击“收藏”，以后可以只练这些重点题。</p><button type="button" onClick={() => changeScope('all')} className="focus-ring mt-5 rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">返回全部练习</button></div>

  const question = orderedQuestions[index], answered = selected !== null, isCorrect = answered && selected === question.answerIndex, isFavorite = favoriteIds.includes(question.id), isMastered = masteredIds.includes(question.id)

  function goNext() { if (autoNextTimer.current) clearTimeout(autoNextTimer.current); setSelected(null); const next = Math.min(index + 1, orderedQuestions.length - 1); setIndex(next); if (scope === 'all' && mode === 'order') window.localStorage.setItem(resumeKey, String(next)) }
  function answer(choiceIndex: number) {
    setSelected(choiceIndex); const nextAnswered = Array.from(new Set([...answeredIds, question.id])); setAnsweredIds(nextAnswered); writeIds(answeredKey, nextAnswered)
    if (choiceIndex === question.answerIndex) { const nextCorrect = Array.from(new Set([...correctIds, question.id])); setCorrectIds(nextCorrect); writeIds(correctKey, nextCorrect) } else { const nextCorrect = correctIds.filter((id) => id !== question.id); setCorrectIds(nextCorrect); writeIds(correctKey, nextCorrect); writeIds(storageKey, [...readIds(storageKey), question.id]); window.dispatchEvent(new Event('openaa-dmv-wrong-update')) }
    if (autoNext && index < orderedQuestions.length - 1) autoNextTimer.current = setTimeout(goNext, 1600)
  }
  function toggleFavorite() { const next = isFavorite ? favoriteIds.filter((id) => id !== question.id) : [...favoriteIds, question.id]; setFavoriteIds(next); writeIds(favoritesKey, next) }
  function toggleMastered() { const next = isMastered ? masteredIds.filter((id) => id !== question.id) : [...masteredIds, question.id]; setMasteredIds(next); writeIds(masteredKey, next) }
  function goPrev() { if (autoNextTimer.current) clearTimeout(autoNextTimer.current); setSelected(null); const next = Math.max(index - 1, 0); setIndex(next); if (scope === 'all' && mode === 'order') window.localStorage.setItem(resumeKey, String(next)) }
  function restart(nextMode = mode) { if (autoNextTimer.current) clearTimeout(autoNextTimer.current); setMode(nextMode); setSeed((c) => c + 1); setIndex(0); setSelected(null); if (scope === 'all' && nextMode === 'order') window.localStorage.setItem(resumeKey, '0') }

  return <div className="card p-4 md:p-6">
    <div className="grid grid-cols-4 gap-2 border-b border-slate-200 pb-3"><div className="rounded-md bg-slate-50 p-2"><p className="text-[10px] font-bold text-slate-500">已完成</p><p className="text-base font-black">{completedCount}/{questions.length}</p></div><div className="rounded-md bg-slate-50 p-2"><p className="text-[10px] font-bold text-slate-500">正确率</p><p className="text-base font-black">{accuracy}%</p></div><div className="rounded-md bg-blue-50 p-2"><p className="text-[10px] font-bold text-blue-600">准备度</p><p className="text-base font-black text-blue-900">{readiness}%</p></div><button type="button" onClick={() => changeScope('favorites')} className="focus-ring rounded-md bg-amber-50 p-2 text-left"><p className="text-[10px] font-bold text-amber-700">收藏题</p><p className="text-base font-black text-amber-900">{favoriteCount}</p></button></div>
    <p className="mt-2 text-[11px] text-slate-500">准备度综合题库完成、已掌握题和最近一次模拟成绩，仅用于学习参考。</p>
    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-bold text-teal-700">{scope === 'favorites' ? '收藏专项 · ' : ''}第 {index + 1} / {orderedQuestions.length} 题</p><div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-teal-600" style={{ width: `${((index + 1) / orderedQuestions.length) * 100}%` }} /></div></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => changeScope(scope === 'all' ? 'favorites' : 'all')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">{scope === 'favorites' ? '返回全部题' : `只练收藏 ${favoriteCount}`}</button><button type="button" onClick={toggleAutoNext} className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${autoNext ? 'border-teal-300 bg-teal-50 text-teal-800' : 'border-slate-300 text-slate-700'}`}>自动下一题 {autoNext ? '开' : '关'}</button><button type="button" onClick={() => restart(mode === 'order' ? 'random' : 'order')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">{mode === 'order' ? '切换随机' : '切换顺序'}</button><button type="button" onClick={() => restart()} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700"><RotateCcw size={15} className="mr-1" />重来</button></div></div>
    <div className="mt-5 flex items-start justify-between gap-3"><h1 className="text-2xl font-black leading-9 text-slate-950">{question.question}</h1><button type="button" onClick={toggleFavorite} className={`focus-ring mt-1 inline-flex shrink-0 items-center rounded-md border px-2.5 py-2 text-xs font-bold ${isFavorite ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-300 text-slate-500'}`}><Star size={15} className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />{isFavorite ? '已收藏' : '收藏'}</button></div>
    <QuestionSignImage question={question} stateSlug={stateSlug} large />
    <div className="mt-5 grid gap-3">{question.choices.map((choice, choiceIndex) => { const isAnswer = choiceIndex === question.answerIndex, isSelected = choiceIndex === selected; return <button key={choice} type="button" onClick={() => answer(choiceIndex)} disabled={answered} className={`focus-ring flex items-start justify-between gap-3 rounded-md border p-4 text-left text-sm font-semibold ${answered && isAnswer ? 'border-green-300 bg-green-50 text-green-950' : answered && isSelected ? 'border-rose-300 bg-rose-50 text-rose-950' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'}`}><span>{choice}</span>{answered && isAnswer ? <CheckCircle2 size={19} className="shrink-0 text-green-700" /> : null}{answered && isSelected && !isAnswer ? <XCircle size={19} className="shrink-0 text-rose-700" /> : null}</button> })}</div>
    {answered ? <div className="mt-5 rounded-md bg-slate-100 p-4"><p className={`text-sm font-black ${isCorrect ? 'text-green-700' : 'text-rose-700'}`}>{isCorrect ? '回答正确' : '已加入错题本'}</p><p className="mt-2 text-sm leading-6 text-slate-700">{question.explanation}</p>{autoNext && index < orderedQuestions.length - 1 ? <p className="mt-2 text-xs font-bold text-teal-700">1.6 秒后自动进入下一题</p> : null}{isCorrect ? <button type="button" onClick={toggleMastered} className={`focus-ring mt-3 rounded-md border px-3 py-2 text-xs font-black ${isMastered ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700'}`}>{isMastered ? '✓ 已掌握' : '标记为已掌握'}</button> : null}</div> : null}
    <div className="mt-6 flex justify-between gap-3"><button type="button" onClick={goPrev} disabled={index === 0} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"><ArrowLeft size={16} className="mr-1" />上一题</button>{index === orderedQuestions.length - 1 ? <Link href={`/${stateSlug}/mock-test`} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">去模拟考试<ArrowRight size={16} className="ml-1" /></Link> : <button type="button" onClick={goNext} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">下一题<ArrowRight size={16} className="ml-1" /></button>}</div>
  </div>
}
