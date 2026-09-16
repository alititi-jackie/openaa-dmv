'use client'

import { browserStorage, readIds, writeIds } from '@/lib/browser-storage'
import ClientStudy from '@/components/ClientStudy'
import ExamProgressCard from './ExamProgressCard'
import MobileExamAction from './MobileExamAction'
import { buildNyExam, nyExamPassed } from '@/lib/exam/new-york-engine'
import { newExamSeed } from '@/lib/exam/random-seed'
import { examStorageKeys } from '@/lib/exam/exam-storage'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Languages, XCircle } from 'lucide-react'
import QuestionSignImage from '@/components/QuestionSignImage'
import type { DmvQuestion } from '@/lib/dmv-data'
import {
  getChoiceText,
  getEnglishContent,
  getExplanationText,
  getQuestionText,
  languageStorageKey,
  type DmvLanguage,
} from '@/lib/dmv-language'

type Props = { questions: DmvQuestion[] }
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
  const signQuestions = active.filter((q) => q.category === 'signs')
  const signCorrect = signQuestions.filter((q) => answers[q.id] === q.answerIndex).length
  const isFullExam = !reviewIds
  const passed = isFullExam ? nyExamPassed(correct, signCorrect) : correct === active.length
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []

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
      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700"/>题目语言</p><p className="mt-1 text-xs text-slate-500">纽约 150 题已提供完整 English 映射，可随时切换。</p></div>
        <div className="grid grid-cols-3 rounded-lg bg-white p-1 ring-1 ring-slate-200 sm:w-72">
          {([['zh','中文'],['en','English'],['bilingual','中英对照']] as const).map(([value,label])=><button key={value} type="button" onClick={()=>changeLanguage(value)} className={`rounded-md px-2 py-2 text-xs font-black ${language===value?'bg-blue-700 text-white':'text-slate-600'}`}>{label}</button>)}
        </div>
      </div>
    </section>

    <ExamProgressCard questions={active} answers={answers} submitted={submitted} cardOpen={cardOpen} onToggleCard={() => setCardOpen((value) => !value)} onJump={jump} onNextUnanswered={nextUnanswered} />

    {submitted ? <section ref={resultRef} className={`card scroll-mt-24 p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
      <div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700"/> : <XCircle className="text-amber-700"/>}<h2 className="text-2xl font-black">{!isFullExam ? '错题复习完成' : passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div>
      <p className="mt-3 text-lg font-black">总题：{correct}/{active.length} 正确</p>
      {isFullExam ? <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="rounded-lg border bg-white p-3"><p className="text-xs font-bold text-slate-500">总题要求</p><p className={`mt-1 font-black ${correct >= 14 ? 'text-green-700' : 'text-rose-700'}`}>{correct}/20 · 要求至少 14</p></div><div className="rounded-lg border bg-white p-3"><p className="text-xs font-bold text-slate-500">交通标志要求</p><p className={`mt-1 font-black ${signCorrect >= 2 ? 'text-green-700' : 'text-rose-700'}`}>{signCorrect}/4 · 要求至少 2</p></div></div> : null}
      <div className="mt-4 flex flex-wrap gap-2"><button onClick={restart} className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button>{wrong.length ? <button onClick={reviewWrong} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习 {wrong.length} 道错题</button> : null}</div>
    </section> : null}

    <div className="grid gap-4">{active.map((q,index)=>{const english=getEnglishContent(q);return <section id={`ny-question-${q.id}`} key={q.id} className={`card scroll-mt-24 p-5 transition ${highlighted === q.id ? 'ring-2 ring-blue-400' : ''}`}><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-500">第 {index+1} / {active.length} 题</p>{q.category==='signs'?<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">交通标志</span>:null}</div>{language==='bilingual'&&english?<div className="mt-2"><h2 className="text-lg font-black leading-7">{q.question}</h2><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p></div>:<h2 className="mt-2 text-lg font-black leading-7">{getQuestionText(q,language)}</h2>}<QuestionSignImage question={q} stateSlug="ny"/><div className="mt-4 grid gap-2">{q.choices.map((choice,choiceIndex)=>{const chosen=answers[q.id]===choiceIndex;const correctChoice=submitted&&choiceIndex===q.answerIndex;const wrongChoice=submitted&&chosen&&choiceIndex!==q.answerIndex;const englishChoice=english?.choices[choiceIndex];return <button key={choiceIndex} type="button" disabled={submitted} onClick={()=>setAnswers((old)=>({...old,[q.id]:choiceIndex}))} className={`rounded-lg border p-3 text-left text-sm font-bold ${correctChoice?'border-green-400 bg-green-50 text-green-900':wrongChoice?'border-rose-400 bg-rose-50 text-rose-900':chosen?'border-blue-500 bg-blue-50 text-blue-900':'border-slate-200 bg-white text-slate-800'}`}>{language==='bilingual'&&englishChoice?<span><span className="block">{String.fromCharCode(65+choiceIndex)}. {choice}</span><span className="mt-1 block text-xs font-semibold text-slate-500">{englishChoice}</span></span>:<>{String.fromCharCode(65+choiceIndex)}. {getChoiceText(q,choiceIndex,language)}</>}</button>})}</div>{submitted?<div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700">{language==='bilingual'&&english?<><p><span className="font-black">解析：</span>{q.explanation}</p><p className="mt-1 text-slate-600"><span className="font-black">Explanation: </span>{english.explanation}</p></>:<><span className="font-black">{language==='en'?'Explanation: ':'解析：'}</span>{getExplanationText(q,language)}</>}</div>:null}</section>})}</div>

    {!submitted ? <><MobileExamAction unansweredCount={unanswered.length} onNextUnanswered={nextUnanswered} onSubmit={submit} /><section className="card hidden p-4 md:block"><button type="button" onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section></> : null}
  </div>
}
