'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, ChevronDown, ChevronUp, Languages, XCircle } from 'lucide-react'
import QuestionSignImage from '@/components/QuestionSignImage'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'
import { englishCoverage, getChoiceText, getEnglishContent, getExplanationText, getQuestionText, type DmvLanguage } from '@/lib/dmv-language'
import { buildExam, examPassed } from '@/lib/exam/exam-engine'
import { examStorageKeys } from '@/lib/exam/exam-storage'
import type { SavedExamV1, StateExamConfig } from '@/lib/exam/exam-types'

type Category = DmvQuestion['category']

export default function MockTestClient({ questions, stateSlug, config }: { questions: DmvQuestion[]; stateSlug: string; config: StateExamConfig }) {
  const keys = useMemo(() => examStorageKeys(stateSlug), [stateSlug])
  const hasModeChoice = config.modes.length > 1
  const [modeId, setModeId] = useState<string | null>(hasModeChoice ? null : config.defaultModeId)
  const [language, setLanguage] = useState<DmvLanguage>('zh')
  const [seed, setSeed] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewIds, setReviewIds] = useState<string[] | null>(null)
  const [savedExam, setSavedExam] = useState<SavedExamV1 | null>(null)
  const [resumeQuestionIds, setResumeQuestionIds] = useState<string[] | null>(null)
  const [cardOpen, setCardOpen] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const resultRef = useRef<HTMLElement | null>(null)

  const mode = config.modes.find((item) => item.id === modeId) ?? null
  const generated = useMemo(() => mode ? buildExam(questions, mode, seed) : [], [questions, mode, seed])
  const exam = useMemo(() => resumeQuestionIds ? resumeQuestionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) as DmvQuestion[] : generated, [resumeQuestionIds, questions, generated])
  const active = useMemo(() => reviewIds ? exam.filter((q) => reviewIds.includes(q.id)) : exam, [reviewIds, exam])
  const answeredCount = active.filter((q) => answers[q.id] !== undefined).length
  const unanswered = active.filter((q) => answers[q.id] === undefined)
  const correct = active.filter((q) => answers[q.id] === q.answerIndex).length
  const score = active.length ? Math.round((correct / active.length) * 100) : 0
  const passed = mode ? examPassed(correct, active.length, mode) : false
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []
  const englishCount = englishCoverage(questions)
  const hasEnglish = englishCount > 0
  const categoryResults = useMemo(() => (['rules','safety','signs','documents'] as Category[]).map((category) => {
    const qs = active.filter((q) => q.category === category)
    const c = qs.filter((q) => answers[q.id] === q.answerIndex).length
    return { category, total: qs.length, correct: c, score: qs.length ? Math.round(c / qs.length * 100) : 0 }
  }).filter((x) => x.total), [active, answers])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(keys.resume)
      if (raw) {
        const parsed = JSON.parse(raw) as SavedExamV1
        if (parsed.version === 1 && parsed.stateSlug === stateSlug && config.modes.some((m) => m.id === parsed.modeId)) setSavedExam(parsed)
        else localStorage.removeItem(keys.resume)
      }
      const storedLanguage = localStorage.getItem(keys.language)
      if (storedLanguage === 'zh' || storedLanguage === 'en' || storedLanguage === 'bilingual') setLanguage(storedLanguage)
    } catch {}
  }, [keys, stateSlug, config.modes])

  useEffect(() => {
    if (!hasEnglish && language !== 'zh') setLanguage('zh')
  }, [hasEnglish, language])

  useEffect(() => {
    if (!mode || submitted || reviewIds || !exam.length) return
    const data: SavedExamV1 = { version: 1, stateSlug, modeId: mode.id, questionIds: exam.map((q) => q.id), answers, savedAt: Date.now() }
    localStorage.setItem(keys.resume, JSON.stringify(data))
    setSavedExam(data)
  }, [mode, submitted, reviewIds, exam, answers, stateSlug, keys.resume])

  useEffect(() => { if (submitted) requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }, [submitted])

  function clearResume() { localStorage.removeItem(keys.resume); setSavedExam(null); setResumeQuestionIds(null) }
  function changeLanguage(next: DmvLanguage) { if (next !== 'zh' && !hasEnglish) return; setLanguage(next); localStorage.setItem(keys.language, next) }
  function chooseMode(next: string) { clearResume(); setModeId(next); setSeed((v) => v + 1); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }
  function resume() { if (!savedExam) return; setModeId(savedExam.modeId); setResumeQuestionIds(savedExam.questionIds); setAnswers(savedExam.answers || {}); setSubmitted(false); setReviewIds(null) }
  function jump(id: string) { setHighlighted(id); document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => setHighlighted((x) => x === id ? null : x), 1200) }
  function nextUnanswered() { if (unanswered.length) jump(unanswered[0].id) }
  function restart() { clearResume(); setSeed((v) => v + 1); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function reviewWrong() { if (!wrong.length) return; setReviewIds(wrong.map((q) => q.id)); setAnswers({}); setSubmitted(false); setCardOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function submit() {
    if (unanswered.length) return nextUnanswered()
    const wrongIds = active.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    let oldWrong: string[] = []
    try { oldWrong = JSON.parse(localStorage.getItem(keys.wrong) || '[]') as string[] } catch {}
    localStorage.setItem(keys.wrong, JSON.stringify(Array.from(new Set([...oldWrong, ...wrongIds]))))
    if (!reviewIds && language !== 'bilingual') localStorage.setItem(keys.lastScore, String(score))
    localStorage.removeItem(keys.resume)
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    setSavedExam(null)
    setSubmitted(true)
  }

  const languageSelector = <section className="card p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700" />考试语言</p><p className="mt-1 text-xs leading-5 text-slate-500">{hasEnglish ? `英文内容已覆盖 ${englishCount}/${questions.length} 题；未覆盖题自动显示中文。` : '当前使用中文。'}</p></div><div className="grid grid-cols-3 rounded-lg bg-slate-100 p-1 sm:w-72">{([['zh','中文'],['en','English'],['bilingual','中英对照']] as [DmvLanguage,string][]).map(([value,label]) => <button key={value} type="button" disabled={value !== 'zh' && !hasEnglish} onClick={() => changeLanguage(value)} className={`focus-ring rounded-md px-2 py-2 text-xs font-black disabled:opacity-40 ${language === value ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>{label}</button>)}</div></div></section>

  if (!mode) return <div className="grid gap-5">{savedExam ? <section className="card border-blue-200 bg-blue-50 p-4"><p className="font-black text-blue-950">发现未完成的模拟考试</p><p className="mt-1 text-sm text-blue-800">已完成 {Object.keys(savedExam.answers || {}).length}/{savedExam.questionIds.length} 题。</p><div className="mt-3 flex gap-2"><button onClick={resume} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">继续考试</button><button onClick={clearResume} className="rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-bold text-blue-800">放弃记录</button></div></section> : null}{languageSelector}<section className="card p-5"><h1 className="text-2xl font-black">选择模拟考试模式</h1><p className="mt-2 text-sm text-slate-600">考试界面和学习功能全站统一，各州题量、通过标准和组卷规则独立。</p></section><div className="grid gap-4 md:grid-cols-2">{config.modes.map((item) => <button key={item.id} onClick={() => chooseMode(item.id)} className="focus-ring card p-5 text-left"><span className="text-sm font-bold text-blue-700">{item.label}</span><span className="mt-2 block text-3xl font-black">{item.size} 题</span><span className="mt-2 block text-sm text-slate-600">{item.description}</span><span className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">开始模拟</span></button>)}</div></div>

  return <div className="grid gap-5">{languageSelector}<section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-teal-700">{reviewIds ? '本次错题复习' : mode.label}</p><h1 className="mt-1 text-xl font-black">{reviewIds ? `重新练习 ${active.length} 道错题` : `${active.length} 题模拟考试`}</h1><p className="mt-1 text-xs text-slate-500">已答 {answeredCount}/{active.length} · 未答 {unanswered.length}</p></div>{hasModeChoice ? <button onClick={() => { clearResume(); setModeId(null); setAnswers({}); setSubmitted(false); setReviewIds(null) }} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">更换模式</button> : <button onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button>}</div></section>

<section className="card p-3 md:p-4"><div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-blue-600 transition-all" style={{ width: `${active.length ? Math.round(answeredCount / active.length * 100) : 0}%` }} /></div><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black">答题进度 {answeredCount}/{active.length}</p><p className="mt-0.5 text-xs text-slate-500">未答 {unanswered.length} 题</p></div><div className="flex gap-2">{!submitted && unanswered.length ? <button onClick={nextUnanswered} className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">下一道未答</button> : null}<button onClick={() => setCardOpen((v) => !v)} className="inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-xs font-bold md:hidden">{cardOpen ? '收起' : '展开答题卡'}{cardOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}</button></div></div><div className={`${cardOpen ? 'grid' : 'hidden'} mt-3 grid-cols-8 gap-2 md:grid md:grid-cols-12`}>{active.map((q, i) => { const a = answers[q.id]; const ok = submitted && a === q.answerIndex; const bad = submitted && a !== q.answerIndex; return <button key={q.id} onClick={() => jump(q.id)} className={`aspect-square rounded-md border text-xs font-black ${ok ? 'border-green-300 bg-green-100 text-green-800' : bad ? 'border-rose-300 bg-rose-100 text-rose-800' : a !== undefined ? 'border-blue-400 bg-blue-100 text-blue-800' : 'border-slate-300 bg-white text-slate-600'}`}>{i + 1}</button> })}</div></section>

{submitted ? <section ref={resultRef} className={`card scroll-mt-6 p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}><div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-amber-700" />}<h2 className="text-2xl font-black">{passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div><p className="mt-3 text-lg font-black">{correct} / {active.length} 正确 · {score}%</p><p className="mt-2 text-sm text-slate-700">{mode.passingCorrect != null ? `本模式要求至少答对 ${mode.passingCorrect}/${mode.size} 题。` : `本站本模式以 ${mode.passingPercent ?? 80}% 作为学习目标。`}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{categoryResults.map((r) => <div key={r.category} className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">{categoryLabels[r.category]}</p><p className="mt-1 font-black">{r.correct}/{r.total} · {r.score}%</p></div>)}</div><p className="mt-3 text-xs text-slate-500">分类成绩仅用于发现学习薄弱点，不代表官方考试按分类计分。</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={restart} className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button>{wrong.length ? <button onClick={reviewWrong} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习 {wrong.length} 道错题</button> : null}</div></section> : null}

<div className="grid gap-4">{active.map((q, index) => { const english = getEnglishContent(q); const effectiveLanguage: DmvLanguage = language === 'en' && !english ? 'zh' : language; return <section id={`question-${q.id}`} key={q.id} className={`card scroll-mt-24 p-5 transition ${highlighted === q.id ? 'ring-2 ring-blue-400' : ''}`}><p className="text-xs font-bold text-slate-500">第 {index + 1} / {active.length} 题</p>{language === 'bilingual' && english ? <div className="mt-2"><h2 className="text-lg font-black">{q.question}</h2><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p></div> : <h2 className="mt-2 text-lg font-black">{getQuestionText(q, effectiveLanguage)}</h2>}<QuestionSignImage question={q} stateSlug={stateSlug} large /><div className="mt-4 grid gap-2">{q.choices.map((choice, i) => { const selected = answers[q.id] === i; const correctChoice = submitted && i === q.answerIndex; const wrongChoice = submitted && selected && i !== q.answerIndex; const englishChoice = english?.choices[i]; return <button disabled={submitted} key={`${q.id}-${i}`} onClick={() => setAnswers((old) => ({ ...old, [q.id]: i }))} className={`rounded-md border p-3 text-left text-sm ${correctChoice ? 'border-green-400 bg-green-50' : wrongChoice ? 'border-rose-400 bg-rose-50' : selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>{language === 'bilingual' && englishChoice ? <><span className="block font-semibold">{choice}</span><span className="mt-1 block text-xs text-slate-600">{englishChoice}</span></> : getChoiceText(q, i, effectiveLanguage)}</button> })}</div>{submitted ? language === 'bilingual' && english ? <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6"><p>解析：{q.explanation}</p><p className="mt-1 text-slate-600">Explanation: {english.explanation}</p></div> : <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6">{effectiveLanguage === 'en' ? 'Explanation' : '解析'}：{getExplanationText(q, effectiveLanguage)}</p> : null}</section> })}</div>

{!submitted ? <section className="card p-4"><button onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section> : null}</div>
}
