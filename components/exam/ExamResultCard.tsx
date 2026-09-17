'use client'

import { forwardRef } from 'react'
import { BookCheck, CheckCircle2, XCircle } from 'lucide-react'

export type ExamRequirement = { label: string; value: string; met: boolean }
export type ExamCategoryResult = { label: string; correct: number; total: number; score: number }

type Props = {
  passed: boolean
  review: boolean
  correct: number
  total: number
  score: number
  requirements?: ExamRequirement[]
  categories?: ExamCategoryResult[]
  wrongCount: number
  onRestart: () => void
  onReviewWrong: () => void
}

const ExamResultCard = forwardRef<HTMLElement, Props>(function ExamResultCard({ passed, review, correct, total, score, requirements = [], categories = [], wrongCount, onRestart, onReviewWrong }, ref) {
  const tone = review ? 'border-blue-300 bg-blue-50' : passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'
  const Icon = review ? BookCheck : passed ? CheckCircle2 : XCircle
  const iconColor = review ? 'text-blue-700' : passed ? 'text-green-700' : 'text-amber-700'
  return <section ref={ref} className={`card scroll-mt-24 p-5 ${tone}`}>
    <div className="flex items-center gap-2"><Icon className={iconColor} /><h2 className="text-2xl font-black">{review ? '错题复习完成' : passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div>
    <p className="mt-3 text-lg font-black">{correct} / {total} 正确 · {score}%</p>
    <p className="mt-2 text-sm text-slate-700">{review ? '复习成绩仅用于学习，不套用整场考试及格线。' : passed ? '本次成绩已达到当前模拟考试的通过要求。' : '本次成绩尚未达到当前模拟考试的全部通过要求。'}</p>
    {!review && requirements.length ? <div className="mt-4 grid gap-2 sm:grid-cols-2">{requirements.map((item) => <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">{item.label}</p><p className={`mt-1 font-black ${item.met ? 'text-green-700' : 'text-rose-700'}`}>{item.value}</p></div>)}</div> : null}
    {categories.length ? <><div className="mt-4 grid gap-2 sm:grid-cols-2">{categories.map((item) => <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">{item.label}</p><p className="mt-1 font-black">{item.correct}/{item.total} · {item.score}%</p></div>)}</div><p className="mt-3 text-xs text-slate-500">分类成绩仅用于发现学习薄弱点，不代表官方考试按分类计分。</p></> : null}
    <div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={onRestart} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button>{wrongCount ? <button type="button" onClick={onReviewWrong} className="focus-ring rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习 {wrongCount} 道错题</button> : null}</div>
  </section>
})

export default ExamResultCard
