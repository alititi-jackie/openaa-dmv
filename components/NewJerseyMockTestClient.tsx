'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import type { DmvQuestion } from '@/lib/dmv-data'
import { shuffleQuestions } from '@/lib/dmv-data'

const SIZE = 50
const PASSING = 40

type SavedExam = { questionIds: string[]; answers: Record<string, number>; savedAt: number }

export default function NewJerseyMockTestClient({ questions, storageKey }: { questions: DmvQuestion[]; storageKey: string }) {
  const resumeKey = `${storageKey}:nj-mock-resume`
  const [seed, setSeed] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState<SavedExam | null>(null)
  const [resumeIds, setResumeIds] = useState<string[] | null>(null)

  const generated = useMemo(() => shuffleQuestions(questions, seed * 977).slice(0, Math.min(SIZE, questions.length)), [questions, seed])
  const exam = useMemo(() => resumeIds ? resumeIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) as DmvQuestion[] : generated, [resumeIds, questions, generated])
  const correct = exam.filter((q) => answers[q.id] === q.answerIndex).length
  const unanswered = exam.filter((q) => answers[q.id] === undefined)
  const passed = correct >= PASSING

  useEffect(() => {
    try {
      const raw = localStorage.getItem(resumeKey)
      if (raw) setSaved(JSON.parse(raw))
    } catch {}
  }, [resumeKey])

  useEffect(() => {
    if (submitted || !exam.length) return
    const data = { questionIds: exam.map((q) => q.id), answers, savedAt: Date.now() }
    localStorage.setItem(resumeKey, JSON.stringify(data))
    setSaved(data)
  }, [exam, answers, submitted, resumeKey])

  function restart() {
    localStorage.removeItem(resumeKey)
    setSaved(null); setResumeIds(null); setAnswers({}); setSubmitted(false); setSeed((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resume() {
    if (!saved) return
    setResumeIds(saved.questionIds); setAnswers(saved.answers || {}); setSubmitted(false)
  }

  function submit() {
    if (unanswered.length) {
      document.getElementById(`nj-${unanswered[0].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const wrongIds = exam.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    const old = JSON.parse(localStorage.getItem(storageKey) || '[]') as string[]
    localStorage.setItem(storageKey, JSON.stringify(Array.from(new Set([...old, ...wrongIds]))))
    localStorage.setItem(`${storageKey}:last-mock-score`, String(Math.round(correct / exam.length * 100)))
    localStorage.removeItem(resumeKey)
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    setSaved(null); setSubmitted(true)
  }

  return <div className="grid gap-5">
    <section className="card p-5">
      <p className="text-sm font-bold text-teal-700">New Jersey MVC 模拟考试</p>
      <h1 className="mt-2 text-2xl font-black text-slate-950">50 题 · 答对 40 题通过</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">按照 NJ MVC 普通知识考试的 50 题、80% 通过标准设计。本站题目用于学习练习，不代表 MVC 官方原题。</p>
    </section>

    {saved && !resumeIds && Object.keys(saved.answers || {}).length > 0 && !submitted ? <section className="card border-blue-200 bg-blue-50 p-4"><p className="font-black text-blue-950">发现未完成的模拟考试</p><p className="mt-1 text-sm text-blue-800">已完成 {Object.keys(saved.answers || {}).length}/{saved.questionIds.length} 题。</p><button onClick={resume} className="mt-3 rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">继续考试</button></section> : null}

    <section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-black">答题进度 {exam.length - unanswered.length}/{exam.length}</p><p className="text-xs text-slate-500">未答 {unanswered.length} 题</p></div><button onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button></div></section>

    {submitted ? <section className={`card p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}><div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-amber-700" />}<h2 className="text-2xl font-black">{passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div><p className="mt-3 text-lg font-black">{correct} / {exam.length} 正确 · {Math.round(correct / exam.length * 100)}%</p><p className="mt-2 text-sm">NJ MVC 正式知识考试要求 50 题至少答对 40 题（80%）。</p><button onClick={restart} className="mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button></section> : null}

    <div className="grid gap-4">{exam.map((q, index) => <section id={`nj-${q.id}`} key={q.id} className="card scroll-mt-6 p-5"><p className="text-xs font-bold text-slate-500">第 {index + 1} / {exam.length} 题</p><h2 className="mt-2 text-lg font-black text-slate-950">{q.question}</h2><div className="mt-4 grid gap-2">{q.choices.map((choice, i) => { const selected = answers[q.id] === i; const correctChoice = submitted && i === q.answerIndex; const wrongChoice = submitted && selected && i !== q.answerIndex; return <button disabled={submitted} key={choice} onClick={() => setAnswers((old) => ({ ...old, [q.id]: i }))} className={`rounded-md border p-3 text-left text-sm ${correctChoice ? 'border-green-400 bg-green-50' : wrongChoice ? 'border-rose-400 bg-rose-50' : selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>{choice}</button> })}</div>{submitted ? <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">解析：{q.explanation}</p> : null}</section>)}</div>

    {!submitted ? <section className="card p-4"><button onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section> : null}
  </div>
}
