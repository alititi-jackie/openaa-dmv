'use client'

import { browserStorage, readIds, writeIds } from '@/lib/browser-storage'
import ClientStudy from '@/components/ClientStudy'
import LanguageSelector from '@/components/LanguageSelector'
import ExamProgressCard from './ExamProgressCard'
import ExamQuestionCard from './ExamQuestionCard'
import ExamResultCard from './ExamResultCard'
import MobileExamAction from './MobileExamAction'
import { buildNyExam, nyExamPassed } from '@/lib/exam/new-york-engine'
import { newExamSeed } from '@/lib/exam/random-seed'
import { examStorageKeys } from '@/lib/exam/exam-storage'

import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'
import {
  englishCoverage,
  languageStorageKey,
  type DmvLanguage,
} from '@/lib/dmv-language'

type Props = { questions: DmvQuestion[] }
type Category = DmvQuestion['category']
const NY_STORAGE_KEYS = examStorageKeys('ny')

export default function NewYorkMockTestClient(props: Props) {
  return <ClientStudy><NewYorkExamSession {...props} /></ClientStudy>
}

function NewYorkExamSession({ questions }: Props) {
  const [seed, setSeed] = useState(newExamSeed)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewIds, setReviewIds] = useState<string[] | null>(null)
  const [language, setLanguage] = useState<DmvLanguage>(() => { const saved = browserStorage.getItem(languageStorageKey('ny')); return saved === 'en' || saved === 'bilingual' ? saved : 'zh' })
  const [cardOpen, setCardOpen] = useState(false)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const resultRef = useRef<HTMLElement | null>(null)
  const languageKey = languageStorageKey('ny')

  useEffect(() => {
    if (!submitted) return
    const frame = window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [submitted])

  useEffect(() => { browserStorage.removeItem(NY_STORAGE_KEYS.legacyResume) }, [])

  function changeLanguage(next: DmvLanguage) {
    setLanguage(next)
    browserStorage.setItem(languageKey, next)
  }

  const exam = useMemo(() => buildNyExam(questions, seed), [questions, seed])
  const active = reviewIds ? exam.filter((q) => reviewIds.includes(q.id)) : exam
  const unanswered = active.filter((q) => answers[q.id] === undefined)
  const correct = active.filter((q) => answers[q.id] === q.answerIndex).length
  const score = active.length ? Math.round((correct / active.length) * 100) : 0
  const signQuestions = active.filter((q) => q.category === 'signs')
  const signCorrect = signQuestions.filter((q) => answers[q.id] === q.answerIndex).length
  const isFullExam = !reviewIds
  const passed = isFullExam ? nyExamPassed(correct, signCorrect) : correct === active.length
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []
  const englishCount = englishCoverage(questions)
  const categoryResults = useMemo(() => (['rules','safety','signs','documents'] as Category[]).map((category) => {
    const categoryQuestions = active.filter((question) => question.category === category)
    const categoryCorrect = categoryQuestions.filter((question) => answers[question.id] === question.answerIndex).length
    return { label: categoryLabels[category], total: categoryQuestions.length, correct: categoryCorrect, score: categoryQuestions.length ? Math.round(categoryCorrect / categoryQuestions.length * 100) : 0 }
  }).filter((item) => item.total), [active, answers])

  function jump(id: string) {
    setHighlighted(id)
    document.getElementById(`ny-question-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => setHighlighted((current) => current === id ? null : current), 1200)
  }

  function nextUnanswered() {
    if (unanswered.length) jump(unanswered[0].id)
  }

  function restart() {
    setSeed(newExamSeed())
    setAnswers({})
    setSubmitted(false)
    setReviewIds(null)
    setCardOpen(false)
    setHighlighted(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submit() {
    if (unanswered.length) {
      nextUnanswered()
      return
    }
    const wrongIds = active.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    writeIds(NY_STORAGE_KEYS.wrong, [...readIds(NY_STORAGE_KEYS.wrong), ...wrongIds])
    if (isFullExam && language !== 'bilingual') browserStorage.setItem(NY_STORAGE_KEYS.lastScore, String(Math.round((correct / active.length) * 100)))
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    setSubmitted(true)
  }

  function reviewWrong() {
    if (!wrong.length) return
    setReviewIds(wrong.map((q) => q.id))
    setAnswers({})
    setSubmitted(false)
    setCardOpen(false)
    setHighlighted(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className="grid gap-5">
    <section className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-bold text-teal-700">{isFullExam ? 'New York DMV 模拟考试' : '本次错题复习'}</p><h1 className="mt-1 text-xl font-black">{isFullExam ? `${active.length} 题模拟考试` : `重新练习 ${active.length} 道错题`}</h1></div>
        <button type="button" onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button>
      </div>
      {isFullExam ? <p className="mt-3 text-sm leading-6 text-slate-600">按纽约 DMV 规则组卷：20 题，其中固定 4 道交通标志题。通过必须同时满足总题答对至少 14 道、4 道标志题至少答对 2 道。</p> : null}
      {isFullExam ? <p className="mt-2 text-xs leading-5 text-slate-500">退出或刷新页面将视为放弃，本次未完成的考试进度不会保存。</p> : null}
    </section>

    <LanguageSelector language={language} onChange={changeLanguage} englishCount={englishCount} total={questions.length} label="考试语言" />

    <ExamProgressCard questions={active} answers={answers} submitted={submitted} cardOpen={cardOpen} onToggleCard={() => setCardOpen((value) => !value)} onJump={jump} onNextUnanswered={nextUnanswered} />

    {submitted ? <ExamResultCard ref={resultRef} passed={passed} review={!isFullExam} correct={correct} total={active.length} score={score} requirements={isFullExam ? [{ label: '总题要求', value: `${correct}/20 · 要求至少 14`, met: correct >= 14 }, { label: '交通标志要求', value: `${signCorrect}/4 · 要求至少 2`, met: signCorrect >= 2 }] : []} categories={categoryResults} wrongCount={wrong.length} onRestart={restart} onReviewWrong={reviewWrong} /> : null}

    <div className="grid gap-4">{active.map((question,index)=><ExamQuestionCard key={question.id} question={question} index={index} total={active.length} selected={answers[question.id]} submitted={submitted} language={language} stateSlug="ny" idPrefix="ny-question" highlighted={highlighted === question.id} onAnswer={(choiceIndex)=>setAnswers((old)=>({...old,[question.id]:choiceIndex}))}/>)}</div>

    {!submitted ? <><MobileExamAction unansweredCount={unanswered.length} onNextUnanswered={nextUnanswered} onSubmit={submit} /><section className="card hidden p-4 md:block"><button type="button" onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section></> : null}
  </div>
}
