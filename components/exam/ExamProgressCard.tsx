'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import type { DmvQuestion } from '@/lib/dmv-data'

type Props = {
  questions: DmvQuestion[]
  answers: Record<string, number>
  submitted: boolean
  cardOpen: boolean
  onToggleCard: () => void
  onJump: (id: string) => void
  onNextUnanswered: () => void
}

export default function ExamProgressCard({ questions, answers, submitted, cardOpen, onToggleCard, onJump, onNextUnanswered }: Props) {
  const answeredCount = questions.reduce((count, question) => count + (answers[question.id] === undefined ? 0 : 1), 0)
  const unansweredCount = questions.length - answeredCount
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0

  return (
    <section className="card p-3 md:p-4">
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black">答题进度 {answeredCount}/{questions.length}</p>
          <p className="mt-0.5 text-xs text-slate-500">未答 {unansweredCount} 题</p>
        </div>
        <div className="flex gap-2">
          {!submitted && unansweredCount ? (
            <button type="button" onClick={onNextUnanswered} className="focus-ring rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-black text-amber-900">
              下一道未答
            </button>
          ) : null}
          <button type="button" onClick={onToggleCard} aria-expanded={cardOpen} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-xs font-bold md:hidden">
            {cardOpen ? '收起' : '展开答题卡'}
            {cardOpen ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />}
          </button>
        </div>
      </div>
      <div className={`${cardOpen ? 'grid' : 'hidden'} mt-3 grid-cols-8 gap-2 md:grid md:grid-cols-12`}>
        {questions.map((question, index) => {
          const answer = answers[question.id]
          const correct = submitted && answer === question.answerIndex
          const wrong = submitted && answer !== question.answerIndex
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onJump(question.id)}
              aria-label={`前往第 ${index + 1} 题`}
              className={`focus-ring aspect-square rounded-md border text-xs font-black ${correct ? 'border-green-300 bg-green-100 text-green-800' : wrong ? 'border-rose-300 bg-rose-100 text-rose-800' : answer !== undefined ? 'border-blue-400 bg-blue-100 text-blue-800' : 'border-slate-300 bg-white text-slate-600'}`}
            >
              {index + 1}
            </button>
          )
        })}
      </div>
    </section>
  )
}
