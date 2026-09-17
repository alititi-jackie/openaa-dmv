'use client'

import { browserStorage, readIds, writeIds } from '@/lib/browser-storage'
import ClientStudy from '@/components/ClientStudy'
import ExamProgressCard from './ExamProgressCard'
import ExamQuestionCard from './ExamQuestionCard'
import ExamResultCard from './ExamResultCard'
import ExamTimer from './ExamTimer'
import MobileExamAction from './MobileExamAction'
import LanguageSelector from '@/components/LanguageSelector'
import { newExamSeed } from '@/lib/exam/random-seed'

import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'
import { englishCoverage, type DmvLanguage } from '@/lib/dmv-language'
import { buildExam, examPassed } from '@/lib/exam/exam-engine'
import { examStorageKeys } from '@/lib/exam/exam-storage'
import type { StateExamConfig } from '@/lib/exam/exam-types'

type Category = DmvQuestion['category']
type Props = { questions: DmvQuestion[]; stateSlug: string; config: StateExamConfig; allowedLanguages?: DmvLanguage[]; defaultLanguage?: DmvLanguage }

const ALL_LANGUAGES: DmvLanguage[] = ['zh','en','bilingual']

export default function MockTestClient(props: Props) {
  return <ClientStudy><ExamSession key={props.stateSlug} {...props} /></ClientStudy>
}

function ExamSession({ questions, stateSlug, config, allowedLanguages, defaultLanguage = 'zh' }: Props) {
  const keys = useMemo(() => examStorageKeys(stateSlug), [stateSlug])
  const languageOptions = useMemo(() => ALL_LANGUAGES.filter((value) => !allowedLanguages || allowedLanguages.includes(value)), [allowedLanguages])
  const initialLanguage = languageOptions.includes(defaultLanguage) ? defaultLanguage : languageOptions[0] ?? 'zh'
  const hasModeChoice = config.modes.length > 1
  const [modeId, setModeId] = useState<string | null>(() => hasModeChoice ? null : config.defaultModeId)
  const [language, setLanguage] = useState<DmvLanguage>(() => { const saved = browserStorage.getItem(keys.language); return languageOptions.includes(saved as DmvLanguage) ? saved as DmvLanguage : initialLanguage })
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

  function changeLanguage(next: DmvLanguage) { if (!languageOptions.includes(next) || (next !== 'zh' && !hasEnglish)) return; setLanguage(next); browserStorage.setItem(keys.language, next) }
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

  const languageSelector = <LanguageSelector language={language} onChange={changeLanguage} englishCount={englishCount} total={questions.length} allowedLanguages={languageOptions} label="考试语言" />

  if (!mode) return <div className="grid gap-5">{languageSelector}<section className="card p-5"><h1 className="text-2xl font-black">选择模拟考试模式</h1><p className="mt-2 text-sm text-slate-600">考试界面和学习功能全站统一，各州题量、通过标准和组卷规则独立。</p></section><div className="grid gap-4 md:grid-cols-2">{config.modes.map((item) => <button type="button" key={item.id} onClick={() => chooseMode(item.id, Date.now())} className="focus-ring card p-5 text-left"><span className="text-sm font-bold text-blue-700">{item.label}</span><span className="mt-2 block text-3xl font-black">{item.size} 题</span><span className="mt-2 block text-sm text-slate-600">{item.description}</span><span className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">开始模拟</span></button>)}</div></div>

  return <div className="grid gap-5">{mode.timeLimitMinutes && !reviewIds ? <ExamTimer key={startedAt} minutes={mode.timeLimitMinutes} startedAt={startedAt} finishedAt={finishedAt} /> : null}{languageSelector}<section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-bold text-teal-700">{reviewIds ? '本次错题复习' : mode.label}</p><h1 className="mt-1 text-xl font-black">{reviewIds ? `重新练习 ${active.length} 道错题` : `${active.length} 题模拟考试`}</h1><p className="mt-1 text-xs text-slate-500">已答 {answeredCount}/{active.length} · 未答 {unanswered.length}</p></div>{hasModeChoice ? <button type="button" onClick={() => { setModeId(null); setAnswers({}); setSubmitted(false); setReviewIds(null); setCardOpen(false) }} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">更换模式</button> : <button type="button" onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button>}</div>{!reviewIds ? <p className="mt-3 text-xs leading-5 text-slate-500">退出或刷新页面将视为放弃，本次未完成的考试进度不会保存。</p> : null}</section>

<ExamProgressCard questions={active} answers={answers} submitted={submitted} cardOpen={cardOpen} onToggleCard={() => setCardOpen((value) => !value)} onJump={jump} onNextUnanswered={nextUnanswered} />

{submitted ? <ExamResultCard ref={resultRef} passed={passed} review={Boolean(reviewIds)} correct={correct} total={active.length} score={score} requirements={reviewIds ? [] : [{ label: '通过要求', value: mode.passingCorrect != null ? `${correct}/${mode.size} · 要求至少 ${mode.passingCorrect}` : `${score}% · 目标至少 ${mode.passingPercent ?? 80}%`, met: passed }]} categories={categoryResults.map((item) => ({ label: categoryLabels[item.category], correct: item.correct, total: item.total, score: item.score }))} wrongCount={wrong.length} onRestart={restart} onReviewWrong={reviewWrong} /> : null}

<div className="grid gap-4">{active.map((question, index) => <ExamQuestionCard key={question.id} question={question} index={index} total={active.length} selected={answers[question.id]} submitted={submitted} language={language} stateSlug={stateSlug} highlighted={highlighted === question.id} onAnswer={(choiceIndex) => setAnswers((old) => ({ ...old, [question.id]: choiceIndex }))} />)}</div>

{!submitted ? <><MobileExamAction unansweredCount={unanswered.length} onNextUnanswered={nextUnanswered} onSubmit={submit} /><section className="card hidden p-4 md:block"><button type="button" onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section></> : null}</div>
}
