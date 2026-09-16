'use client'

import { browserStorage, readIds, writeIds } from '@/lib/browser-storage'
import ClientStudy from '@/components/ClientStudy'
import ExamProgressCard from './ExamProgressCard'
import ExamTimer from './ExamTimer'
import MobileExamAction from './MobileExamAction'
import { newExamSeed } from '@/lib/exam/random-seed'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Languages, XCircle } from 'lucide-react'
import QuestionSignImage from '@/components/QuestionSignImage'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'
import { englishCoverage, getChoiceText, getEnglishContent, getExplanationText, getQuestionText, type DmvLanguage } from '@/lib/dmv-language'
import { buildExam, examPassed } from '@/lib/exam/exam-engine'
import { examStorageKeys } from '@/lib/exam/exam-storage'
import type { StateExamConfig } from '@/lib/exam/exam-types'

type Category = DmvQuestion['category']
type Props = { questions: DmvQuestion[]; stateSlug: string; config: StateExamConfig; allowedLanguages?: DmvLanguage[]; defaultLanguage?: DmvLanguage }

const ALL_LANGUAGES: [DmvLanguage, string][] = [['zh','中文'],['en','English'],['bilingual','中英对照']]

export default function MockTestClient(props: Props) {
  return <ClientStudy><ExamSession key={props.stateSlug} {...props} /></ClientStudy>
}

function ExamSession({ questions, stateSlug, config, allowedLanguages, defaultLanguage = 'zh' }: Props) {
  const keys = useMemo(() => examStorageKeys(stateSlug), [stateSlug])
  const languageOptions = useMemo(() => ALL_LANGUAGES.filter(([value]) => !allowedLanguages || allowedLanguages.includes(value)), [allowedLanguages])
  const initialLanguage = languageOptions.some(([value]) => value === defaultLanguage) ? defaultLanguage : languageOptions[0]?.[0] ?? 'zh'
  const hasModeChoice = config.modes.length > 1
  const [modeId, setModeId] = useState<string | null>(() => hasModeChoice ? null : config.defaultModeId)
  const [language, setLanguage] = useState<DmvLanguage>(() => { const saved = browserStorage.getItem(keys.language); return languageOptions.some(([value]) => value === saved) ? saved as DmvLanguage : initialLanguage })
  const [seed, setSeed] = useState(newExamSeed)
  const [startedAt, setStartedAt] = useState(Date.now)
  const [finishedAt, setFinishedAt] = useState<number | undefined>()
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewIds, setReviewIds] = useState<string[] | null>(null)
  const [cardOpen, setCardOpen] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const resultRef = useRef<HTMLElement | null>(null)

  const mode = config.modes.find((item) => item.id === modeId) ?? null
  const generated = useMemo(() => mode ? buildExam(questions, mode, seed) : [], [questions, mode, seed])
  const exam = generated
  const active = useMemo(() => reviewIds ? exam.filter((q) => reviewIds.includes(q.id)) : exam, [reviewIds, exam])
  const answeredCount = active.filter((q) => answers[q.id] !== undefined).length
  const unanswered = active.filter((q) => answers[q.id] === undefined)
  const correct = active.filter((q) => answers[q.id] === q.answerIndex).length
  const score = active.length ? Math.round((correct / active.length) * 100) : 0
  const passed = reviewIds ? active.length > 0 && correct === active.length : mode ? examPassed(correct, active.length, mode) : false
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []
  const englishCount = englishCoverage(questions)
  const hasEnglish = englishCount > 0
  const categoryResults = useMemo(() => (['rules','safety','signs','documents'] as Category[]).map((category) => {
    const qs = active.filter((q) => q.category === category)
    const c = qs.filter((q) => answers[q.id] === q.answerIndex).length
    return { category, total: qs.length, correct: c, score: qs.length ? Math.round(c / qs.length * 100) : 0 }
  }).filter((x) => x.total), [active, answers])

  useEffect(() => { browserStorage.removeItem(keys.legacyResume) }, [keys.legacyResume])

  useEffect(() => { if (submitted) requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }, [submitted])

  function changeLanguage(next: DmvLanguage) { if (!languageOptions.some(([value]) => value === next) || (next !== 'zh' && !hasEnglish)) return; setLanguage(next); browserStorage.setItem(keys.language, next) }
  function chooseMode(next: string, time: number) { setModeId(next); setSeed(newExamSeed()); setStartedAt(time); setFinishedAt(undefined); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }
  function jump(id: string) { setHighlighted(id); document.getElementById(`question-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => setHighlighted((x) => x === id ? null : x), 1200) }
  function nextUnanswered() { if (unanswered.length) jump(unanswered[0].id) }
  function restart() { setSeed(newExamSeed()); setStartedAt(Date.now()); setFinishedAt(undefined); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function reviewWrong() { if (!wrong.length) return; setReviewIds(wrong.map((q) => q.id)); setAnswers({}); setSubmitted(false); setCardOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function submit() {
    if (unanswered.length) return nextUnanswered()
    const wrongIds = active.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    writeIds(keys.wrong, [...readIds(keys.wrong), ...wrongIds])
    if (!reviewIds && language !== 'bilingual') browserStorage.setItem(keys.lastScore, String(score))
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    setSubmitted(true)
    setFinishedAt(Date.now())
  }

  const languageSelector = <section className="card p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700" />考试语言</p><p className="mt-1 text-xs leading-5 text-slate-500">{hasEnglish ? `英文内容已覆盖 ${englishCount}/${questions.length} 题；未覆盖题自动显示中文。` : '当前使用中文。'}</p></div><div className="grid rounded-lg bg-slate-100 p-1 sm:w-72" style={{ gridTemplateColumns: `repeat(${languageOptions.length}, minmax(0, 1fr))` }}>{languageOptions.map(([value,label]) => <button key={value} type="button" disabled={value !== 'zh' && !hasEnglish} onClick={() => changeLanguage(value)} className={`focus-ring rounded-md px-2 py-2 text-xs font-black disabled:opacity-40 ${language === value ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>{label}</button>)}</div></div></section>

  if (!mode) return <div className="grid gap-5">{languageSelector}<section className="card p-5"><h1 className="text-2xl font-black">选择模拟考试模式</h1><p className="mt-2 text-sm text-slate-600">考试界面和学习功能全站统一，各州题量、通过标准和组卷规则独立。</p></section><div className="grid gap-4 md:grid-cols-2">{config.modes.map((item) => <button type="button" key={item.id} onClick={() => chooseMode(item.id, Date.now())} className="focus-ring card p-5 text-left"><span className="text-sm font-bold text-blue-700">{item.label}</span><span className="mt-2 block text-3xl font-black">{item.size} 题</span><span className="mt-2 block text-sm text-slate-600">{item.description}</span><span className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">开始模拟</span></button>)}</div></div>

  return <div className="grid gap-5">{mode.timeLimitMinutes && !reviewIds ? <ExamTimer key={startedAt} minutes={mode.timeLimitMinutes} startedAt={startedAt} finishedAt={finishedAt} /> : null}{languageSelector}<section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-teal-700">{reviewIds ? '本次错题复习' : mode.label}</p><h1 className="mt-1 text-xl font-black">{reviewIds ? `重新练习 ${active.length} 道错题` : `${active.length} 题模拟考试`}</h1><p className="mt-1 text-xs text-slate-500">已答 {answeredCount}/{active.length} · 未答 {unanswered.length}</p></div>{hasModeChoice ? <button type="button" onClick={() => { setModeId(null); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">更换模式</button> : <button type="button" onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button>}</div>{!reviewIds ? <p className="mt-3 text-xs leading-5 text-slate-500">退出或刷新页面将视为放弃，本次未完成的考试进度不会保存。</p> : null}</section>

<ExamProgressCard questions={active} answers={answers} submitted={submitted} cardOpen={cardOpen} onToggleCard={() => setCardOpen((value) => !value)} onJump={jump} onNextUnanswered={nextUnanswered} />

{submitted ? <section ref={resultRef} className={`card scroll-mt-6 p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}><div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-amber-700" />}<h2 className="text-2xl font-black">{reviewIds ? '错题复习完成' : passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div><p className="mt-3 text-lg font-black">{correct} / {active.length} 正确 · {score}%</p><p className="mt-2 text-sm text-slate-700">{reviewIds ? '复习成绩仅用于学习，不套用整场考试及格线。' : mode.passingCorrect != null ? `本模式要求至少答对 ${mode.passingCorrect}/${mode.size} 题。` : `本站本模式以 ${mode.passingPercent ?? 80}% 作为学习目标。`}</p><div className="mt-4 grid gap-2 sm:grid-cols-2">{categoryResults.map((r) => <div key={r.category} className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">{categoryLabels[r.category]}</p><p className="mt-1 font-black">{r.correct}/{r.total} · {r.score}%</p></div>)}</div><p className="mt-3 text-xs text-slate-500">分类成绩仅用于发现学习薄弱点，不代表官方考试按分类计分。</p><div className="mt-4 flex flex-wrap gap-2"><button onClick={restart} className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button>{wrong.length ? <button onClick={reviewWrong} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习 {wrong.length} 道错题</button> : null}</div></section> : null}

<div className="grid gap-4">{active.map((q, index) => { const english = getEnglishContent(q); const effectiveLanguage: DmvLanguage = language === 'en' && !english ? 'zh' : language; return <section id={`question-${q.id}`} key={q.id} className={`card scroll-mt-24 p-5 transition ${highlighted === q.id ? 'ring-2 ring-blue-400' : ''}`}><p className="text-xs font-bold text-slate-500">第 {index + 1} / {active.length} 题</p>{language === 'bilingual' && english ? <div className="mt-2"><h2 className="text-lg font-black">{q.question}</h2><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p></div> : <h2 className="mt-2 text-lg font-black">{getQuestionText(q, effectiveLanguage)}</h2>}<QuestionSignImage question={q} stateSlug={stateSlug} large /><div className="mt-4 grid gap-2">{q.choices.map((choice, i) => { const selected = answers[q.id] === i; const correctChoice = submitted && i === q.answerIndex; const wrongChoice = submitted && selected && i !== q.answerIndex; const englishChoice = english?.choices[i]; return <button disabled={submitted} key={`${q.id}-${i}`} onClick={() => setAnswers((old) => ({ ...old, [q.id]: i }))} className={`rounded-md border p-3 text-left text-sm ${correctChoice ? 'border-green-400 bg-green-50' : wrongChoice ? 'border-rose-400 bg-rose-50' : selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>{language === 'bilingual' && englishChoice ? <><span className="block font-semibold">{choice}</span><span className="mt-1 block text-xs text-slate-600">{englishChoice}</span></> : getChoiceText(q, i, effectiveLanguage)}</button> })}</div>{submitted ? language === 'bilingual' && english ? <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6"><p>解析：{q.explanation}</p><p className="mt-1 text-slate-600">Explanation: {english.explanation}</p></div> : <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6">{effectiveLanguage === 'en' ? 'Explanation' : '解析'}：{getExplanationText(q, effectiveLanguage)}</p> : null}</section> })}</div>

{!submitted ? <><MobileExamAction unansweredCount={unanswered.length} onNextUnanswered={nextUnanswered} onSubmit={submit} /><section className="card hidden p-4 md:block"><button type="button" onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section></> : null}</div>
}
