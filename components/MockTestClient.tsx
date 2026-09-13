'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronDown, ChevronUp, RotateCcw, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { categoryLabels, shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

const TARGET = 80
type Category = DmvQuestion['category']
type Mode = 'adult-36' | 'teen-46'
type Profile = { size: number; quotas: Record<Category, number> }
type SavedExam = { mode: Mode; questionIds: string[]; answers: Record<string, number>; savedAt: number }
const PROFILES: Record<Mode, Profile> = { 'adult-36': { size: 36, quotas: { rules: 16, safety: 10, signs: 6, documents: 4 } }, 'teen-46': { size: 46, quotas: { rules: 20, safety: 13, signs: 8, documents: 5 } } }
const DEFAULT: Profile = { size: 20, quotas: { rules: 8, safety: 5, signs: 4, documents: 3 } }

function buildTest(questions: DmvQuestion[], profile: Profile, seed: number) {
  const selected: DmvQuestion[] = []
  ;(['rules', 'safety', 'signs', 'documents'] as Category[]).forEach((category, i) => {
    const pool = shuffleQuestions(questions.filter((q) => q.category === category), seed * 97 + i * 31 + 1)
    selected.push(...pool.slice(0, profile.quotas[category]))
  })
  if (selected.length < Math.min(profile.size, questions.length)) {
    selected.push(...shuffleQuestions(questions.filter((q) => !selected.some((s) => s.id === q.id)), seed * 193 + 7).slice(0, profile.size - selected.length))
  }
  return shuffleQuestions(selected.slice(0, profile.size), seed * 389 + 11)
}

export default function MockTestClient({ questions, stateSlug, storageKey }: { questions: DmvQuestion[]; stateSlug: string; storageKey: string }) {
  const isCalifornia = stateSlug === 'california'
  const resumeKey = `${storageKey}:mock-resume`
  const scoreKey = `${storageKey}:last-mock-score`
  const [mode, setMode] = useState<Mode | null>(null)
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewIds, setReviewIds] = useState<string[] | null>(null)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const [savedExam, setSavedExam] = useState<SavedExam | null>(null)
  const [resumeQuestionIds, setResumeQuestionIds] = useState<string[] | null>(null)
  const [cardOpen, setCardOpen] = useState(false)
  const resultRef = useRef<HTMLElement | null>(null)
  const profile = isCalifornia ? (mode ? PROFILES[mode] : null) : DEFAULT
  const generated = useMemo(() => profile ? buildTest(questions, profile, seed + 1) : [], [questions, profile, seed])
  const testQuestions = useMemo(() => resumeQuestionIds ? resumeQuestionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) as DmvQuestion[] : generated, [resumeQuestionIds, questions, generated])
  const active = useMemo(() => reviewIds ? testQuestions.filter((q) => reviewIds.includes(q.id)) : testQuestions, [reviewIds, testQuestions])
  const answeredCount = active.filter((q) => answers[q.id] !== undefined).length
  const unanswered = active.filter((q) => answers[q.id] === undefined)
  const correct = active.filter((q) => answers[q.id] === q.answerIndex).length
  const score = active.length ? Math.round(correct / active.length * 100) : 0
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []
  const categoryResults = useMemo(() => (['rules', 'safety', 'signs', 'documents'] as Category[]).map((category) => { const qs = active.filter((q) => q.category === category); const c = qs.filter((q) => answers[q.id] === q.answerIndex).length; return { category, total: qs.length, correct: c, score: qs.length ? Math.round(c / qs.length * 100) : 0 } }).filter((x) => x.total), [active, answers])
  const weak = submitted ? categoryResults.filter((x) => x.score < TARGET).sort((a, b) => a.score - b.score) : []

  useEffect(() => { try { const raw = window.localStorage.getItem(resumeKey); if (raw) setSavedExam(JSON.parse(raw) as SavedExam) } catch {} }, [resumeKey])
  useEffect(() => {
    if (!mode || submitted || reviewIds || !testQuestions.length) return
    const data: SavedExam = { mode, questionIds: testQuestions.map((q) => q.id), answers, savedAt: Date.now() }
    window.localStorage.setItem(resumeKey, JSON.stringify(data)); setSavedExam(data)
  }, [mode, answers, submitted, reviewIds, testQuestions, resumeKey])
  useEffect(() => { if (submitted) requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }, [submitted])

  function clearResume() { window.localStorage.removeItem(resumeKey); setSavedExam(null); setResumeQuestionIds(null) }
  function start(nextMode: Mode) { clearResume(); setMode(nextMode); setSeed((s) => s + 1); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }
  function resume() { if (!savedExam) return; setMode(savedExam.mode); setResumeQuestionIds(savedExam.questionIds); setAnswers(savedExam.answers || {}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }
  function jump(id: string) { setHighlighted(id); document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => setHighlighted((x) => x === id ? null : x), 1500) }
  function nextUnanswered() { if (unanswered.length) jump(unanswered[0].id) }
  function submit() { if (unanswered.length) return nextUnanswered(); const ids = active.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id); const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]; window.localStorage.setItem(storageKey, JSON.stringify(Array.from(new Set([...existing, ...ids])))); window.localStorage.setItem(scoreKey, String(score)); window.dispatchEvent(new Event('openaa-dmv-wrong-update')); clearResume(); setSubmitted(true) }
  function restart() { clearResume(); setSeed((s) => s + 1); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }
  function reviewWrong() { if (!wrong.length) return; setReviewIds(wrong.map((q) => q.id)); setAnswers({}); setSubmitted(false); setCardOpen(false); requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' })) }

  if (isCalifornia && !mode) return <div className="grid gap-5">
    {savedExam ? <section className="card border-blue-200 bg-blue-50 p-4"><p className="text-sm font-black text-blue-950">发现未完成的模拟考试</p><p className="mt-1 text-sm text-blue-800">已完成 {Object.keys(savedExam.answers || {}).length}/{savedExam.questionIds.length} 题，可以从上次进度继续。</p><div className="mt-3 flex gap-2"><button onClick={resume} className="focus-ring rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">继续考试</button><button onClick={clearResume} className="focus-ring rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-bold text-blue-800">放弃记录</button></div></section> : null}
    <section className="card p-5"><p className="text-sm font-bold text-teal-700">California DMV 模拟考试</p><h1 className="mt-2 text-2xl font-black">选择模拟考试模式</h1><p className="mt-3 text-sm leading-6 text-slate-600">本站以 80% 作为练习目标；正式考试题量和要求以 California DMV 当日规定为准。</p></section>
    <div className="grid gap-4 md:grid-cols-2"><button onClick={() => start('adult-36')} className="focus-ring card p-5 text-left"><span className="text-sm font-bold text-blue-700">标准模拟</span><span className="mt-2 block text-3xl font-black">36 题</span><span className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">开始 36 题模拟</span></button><button onClick={() => start('teen-46')} className="focus-ring card p-5 text-left"><span className="text-sm font-bold text-violet-700">青少年强化模拟</span><span className="mt-2 block text-3xl font-black">46 题</span><span className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">开始 46 题模拟</span></button></div>
  </div>

  return <div className="grid gap-5">
    <section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-teal-700">{reviewIds ? '本次错题复习' : '模拟考试'}</p><h1 className="mt-1 text-xl font-black">{reviewIds ? `重新练习 ${active.length} 道错题` : `${active.length} 题模拟考试`}</h1><p className="mt-1 text-xs text-slate-500">已答 {answeredCount}/{active.length} · 未答 {unanswered.length}</p></div><button onClick={() => { clearResume(); setMode(null); setAnswers({}); setSubmitted(false); setReviewIds(null) }} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">更换模式</button></div></section>

    <section className="card p-3 md:p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black">答题进度 {answeredCount}/{active.length}</p><p className="mt-0.5 text-xs text-slate-500">未答 {unanswered.length} 题</p></div><div className="flex gap-2">{!submitted && unanswered.length ? <button onClick={nextUnanswered} className="focus-ring rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">下一道未答</button> : null}<button onClick={() => setCardOpen((v) => !v)} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 md:hidden">{cardOpen ? '收起' : '展开答题卡'}{cardOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}</button></div></div><div className={`${cardOpen ? 'grid' : 'hidden'} mt-3 grid-cols-8 gap-2 md:grid md:grid-cols-12`}>{active.map((q, i) => { const a = answers[q.id]; const ok = submitted && a === q.answerIndex; const bad = submitted && a !== q.answerIndex; return <button key={q.id} onClick={() => jump(q.id)} className={`focus-ring aspect-square rounded-md border text-xs font-black ${ok ? 'border-green-300 bg-green-100 text-green-800' : bad ? 'border-rose-300 bg-rose-100 text-rose-800' : a !== undefined ? 'border-blue-400 bg-blue-100 text-blue-800' : 'border-slate-300 bg-white text-slate-600'}`}>{i + 1}</button> })}</div></section>

    {submitted ? <section ref={resultRef} className={`card scroll-mt-6 p-4 ${score >= TARGET ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}><p className="text-sm font-bold text-slate-600">考试结果</p><p className={`mt-1 text-3xl font-black ${score >= TARGET ? 'text-green-800' : 'text-amber-900'}`}>{score >= TARGET ? '达到练习目标' : '建议继续复习'} · {score}%</p><div className="mt-3 grid grid-cols-3 gap-2"><div className="rounded-md bg-white/80 p-2"><p className="text-[10px] text-slate-500">答对</p><p className="text-lg font-black">{correct}/{active.length}</p></div><div className="rounded-md bg-white/80 p-2"><p className="text-[10px] text-slate-500">错题</p><p className="text-lg font-black">{wrong.length}</p></div><div className="rounded-md bg-white/80 p-2"><p className="text-[10px] text-slate-500">目标</p><p className="text-lg font-black">80%</p></div></div><div className="mt-4 border-t border-slate-200 pt-3"><p className="text-sm font-black">分类成绩</p><div className="mt-2 overflow-hidden rounded-lg border border-slate-200 bg-white/80">{categoryResults.map((x) => <div key={x.category} className="flex items-center gap-3 border-b border-slate-100 px-3 py-2 last:border-0"><span className="min-w-20 text-sm font-bold text-slate-700">{categoryLabels[x.category]}</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className={`h-full ${x.score < TARGET ? 'bg-amber-500' : 'bg-green-600'}`} style={{ width: `${x.score}%` }} /></div><span className="text-xs text-slate-500">{x.correct}/{x.total}</span><b className={`w-11 text-right text-sm ${x.score < TARGET ? 'text-amber-800' : 'text-green-800'}`}>{x.score}%</b></div>)}</div>{weak.length ? <p className="mt-3 text-sm font-black">优先复习：{weak.slice(0, 2).map((x) => categoryLabels[x.category]).join('、')}</p> : <p className="mt-3 text-sm font-bold text-green-800">所有分类都达到练习目标。</p>}</div><div className="mt-4 flex flex-wrap gap-2">{wrong.length ? <button onClick={reviewWrong} className="focus-ring rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习本次 {wrong.length} 道错题</button> : null}<button onClick={restart} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">再考一套</button><Link href={`/${stateSlug}/wrong-questions`} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">全部错题本</Link></div></section> : null}

    <div className="grid gap-4">{active.map((q, i) => { const selected = answers[q.id]; return <article id={`question-${q.id}`} key={q.id} className={`card scroll-mt-24 p-4 transition ${highlighted === q.id ? 'border-amber-400 ring-4 ring-amber-100' : ''}`}><h2 className="text-lg font-black leading-7">{i + 1}. {q.question}</h2><QuestionSignImage question={q} stateSlug={stateSlug} /><div className="mt-4 grid gap-2">{q.choices.map((choice, ci) => <button key={choice} disabled={submitted} onClick={() => setAnswers((a) => ({ ...a, [q.id]: ci }))} className={`focus-ring flex justify-between gap-3 rounded-md border p-3 text-left text-sm ${submitted && ci === q.answerIndex ? 'border-green-300 bg-green-50' : submitted && selected === ci && ci !== q.answerIndex ? 'border-rose-300 bg-rose-50' : selected === ci ? 'border-blue-400 bg-blue-50' : 'border-slate-200 bg-white'}`}><span>{choice}</span>{submitted && ci === q.answerIndex ? <CheckCircle2 size={18} className="text-green-700" /> : null}{submitted && selected === ci && ci !== q.answerIndex ? <XCircle size={18} className="text-rose-700" /> : null}</button>)}</div>{submitted ? <p className="mt-3 text-sm leading-6 text-slate-600">{q.explanation}</p> : null}</article> })}</div>
    {!submitted ? <div className="grid gap-2">{unanswered.length ? <p className="rounded-md bg-amber-50 p-3 text-sm font-bold text-amber-900">还有 {unanswered.length} 题未作答，点击下面按钮会直接定位。</p> : null}<button onClick={submit} className={`focus-ring rounded-md px-5 py-3 text-sm font-black text-white ${unanswered.length ? 'bg-amber-600' : 'bg-blue-700'}`}>{unanswered.length ? `还剩 ${unanswered.length} 题未作答 · 点击定位` : `提交考试（${answeredCount}/${active.length} 已完成）`}</button></div> : null}
  </div>
}
