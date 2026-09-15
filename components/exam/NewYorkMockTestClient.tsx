'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import QuestionSignImage from '@/components/QuestionSignImage'
import type { DmvQuestion } from '@/lib/dmv-data'

type Props = { questions: DmvQuestion[] }

function shuffled<T>(items: T[], seed: number) {
  const out = [...items]
  let value = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    value = (value * 9301 + 49297) % 233280
    const j = Math.floor((value / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function buildNyExam(questions: DmvQuestion[], seed: number) {
  const signs = shuffled(questions.filter((q) => q.category === 'signs'), seed * 17 + 3).slice(0, 4)
  const signIds = new Set(signs.map((q) => q.id))
  const others = shuffled(questions.filter((q) => !signIds.has(q.id) && q.category !== 'signs'), seed * 31 + 7).slice(0, 16)
  return shuffled([...signs, ...others], seed * 43 + 11)
}

export default function NewYorkMockTestClient({ questions }: Props) {
  const [seed, setSeed] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewIds, setReviewIds] = useState<string[] | null>(null)
  const exam = useMemo(() => buildNyExam(questions, seed), [questions, seed])
  const active = reviewIds ? exam.filter((q) => reviewIds.includes(q.id)) : exam
  const unanswered = active.filter((q) => answers[q.id] === undefined)
  const correct = active.filter((q) => answers[q.id] === q.answerIndex).length
  const signQuestions = active.filter((q) => q.category === 'signs')
  const signCorrect = signQuestions.filter((q) => answers[q.id] === q.answerIndex).length
  const isFullExam = !reviewIds
  const passed = isFullExam ? correct >= 14 && signCorrect >= 2 : correct === active.length
  const wrong = submitted ? active.filter((q) => answers[q.id] !== q.answerIndex) : []

  function restart() {
    setSeed((v) => v + 1)
    setAnswers({})
    setSubmitted(false)
    setReviewIds(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submit() {
    if (unanswered.length) {
      document.getElementById(`ny-question-${unanswered[0].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const wrongIds = active.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    try {
      const key = 'openaa-dmv:ny:wrong'
      const old = JSON.parse(localStorage.getItem(key) || '[]') as string[]
      localStorage.setItem(key, JSON.stringify(Array.from(new Set([...old, ...wrongIds]))))
      if (isFullExam) localStorage.setItem('openaa-dmv:ny:last-score', String(Math.round((correct / active.length) * 100)))
      window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    } catch {}
    setSubmitted(true)
  }

  function reviewWrong() {
    if (!wrong.length) return
    setReviewIds(wrong.map((q) => q.id))
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className="grid gap-5">
    <section className="card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-bold text-teal-700">{isFullExam ? 'New York DMV 模拟考试' : '本次错题复习'}</p><h1 className="mt-1 text-xl font-black">{active.length} 题 · 已答 {active.length - unanswered.length}/{active.length}</h1></div>
        <button type="button" onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button>
      </div>
      {isFullExam ? <p className="mt-3 text-sm leading-6 text-slate-600">按纽约 DMV 规则组卷：20 题，其中固定 4 道交通标志题。通过必须同时满足总题答对至少 14 道、4 道标志题至少答对 2 道。</p> : null}
    </section>

    {submitted ? <section className={`card p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
      <div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700"/> : <XCircle className="text-amber-700"/>}<h2 className="text-2xl font-black">{passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div>
      <p className="mt-3 text-lg font-black">总题：{correct}/{active.length} 正确</p>
      {isFullExam ? <div className="mt-3 grid gap-2 sm:grid-cols-2"><div className="rounded-lg border bg-white p-3"><p className="text-xs font-bold text-slate-500">总题要求</p><p className={`mt-1 font-black ${correct >= 14 ? 'text-green-700' : 'text-rose-700'}`}>{correct}/20 · 要求至少 14</p></div><div className="rounded-lg border bg-white p-3"><p className="text-xs font-bold text-slate-500">交通标志要求</p><p className={`mt-1 font-black ${signCorrect >= 2 ? 'text-green-700' : 'text-rose-700'}`}>{signCorrect}/4 · 要求至少 2</p></div></div> : null}
      <div className="mt-4 flex flex-wrap gap-2"><button onClick={restart} className="rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button>{wrong.length ? <button onClick={reviewWrong} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习 {wrong.length} 道错题</button> : null}</div>
    </section> : null}

    <section className="card p-3"><div className="grid grid-cols-8 gap-2 md:grid-cols-10">{active.map((q, index) => { const a=answers[q.id]; const ok=submitted&&a===q.answerIndex; const bad=submitted&&a!==q.answerIndex; return <button key={q.id} onClick={() => document.getElementById(`ny-question-${q.id}`)?.scrollIntoView({behavior:'smooth',block:'center'})} className={`aspect-square rounded-md border text-xs font-black ${ok?'border-green-300 bg-green-100 text-green-800':bad?'border-rose-300 bg-rose-100 text-rose-800':a!==undefined?'border-blue-400 bg-blue-100 text-blue-800':'border-slate-300 bg-white text-slate-600'}`}>{index+1}</button>})}</div></section>

    <div className="grid gap-4">{active.map((q,index)=><section id={`ny-question-${q.id}`} key={q.id} className="card scroll-mt-24 p-5"><div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-500">第 {index+1} / {active.length} 题</p>{q.category==='signs'?<span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">交通标志</span>:null}</div><h2 className="mt-2 text-lg font-black leading-7">{q.question}</h2><QuestionSignImage question={q}/><div className="mt-4 grid gap-2">{q.choices.map((choice,choiceIndex)=>{const chosen=answers[q.id]===choiceIndex;const correctChoice=submitted&&choiceIndex===q.answerIndex;const wrongChoice=submitted&&chosen&&choiceIndex!==q.answerIndex;return <button key={choiceIndex} type="button" disabled={submitted} onClick={()=>setAnswers((old)=>({...old,[q.id]:choiceIndex}))} className={`rounded-lg border p-3 text-left text-sm font-bold ${correctChoice?'border-green-400 bg-green-50 text-green-900':wrongChoice?'border-rose-400 bg-rose-50 text-rose-900':chosen?'border-blue-500 bg-blue-50 text-blue-900':'border-slate-200 bg-white text-slate-800'}`}>{String.fromCharCode(65+choiceIndex)}. {choice}</button>})}</div>{submitted?<div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700"><span className="font-black">解析：</span>{q.explanation}</div>:null}</section>)}</div>

    {!submitted ? <section className="sticky bottom-3 z-10 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold">未答 {unanswered.length} 题</p><button type="button" onClick={submit} className={`rounded-md px-5 py-2.5 text-sm font-black text-white ${unanswered.length?'bg-amber-600':'bg-blue-700'}`}>{unanswered.length?'前往下一道未答':'提交考试'}</button></div></section> : null}
  </div>
}
