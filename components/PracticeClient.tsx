'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

export default function PracticeClient({
  questions,
  stateSlug,
  storageKey,
}: {
  questions: DmvQuestion[]
  stateSlug: string
  storageKey: string
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [mode, setMode] = useState<'order' | 'random'>('order')
  const [seed, setSeed] = useState(0)

  const orderedQuestions = useMemo(() => {
    if (mode === 'order') return questions
    return shuffleQuestions(questions, seed)
  }, [mode, questions, seed])

  const question = orderedQuestions[index]
  const answered = selected !== null
  const isCorrect = answered && selected === question.answerIndex

  function answer(choiceIndex: number) {
    setSelected(choiceIndex)
    if (choiceIndex !== question.answerIndex) {
      const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]
      const next = Array.from(new Set([...existing, question.id]))
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    }
  }

  function goNext() {
    setSelected(null)
    setIndex((current) => Math.min(current + 1, orderedQuestions.length - 1))
  }

  function goPrev() {
    setSelected(null)
    setIndex((current) => Math.max(current - 1, 0))
  }

  function restart(nextMode = mode) {
    setMode(nextMode)
    setSeed((current) => current + 1)
    setIndex(0)
    setSelected(null)
  }

  return (
    <div className="card p-4 md:p-6">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">第 {index + 1} / {orderedQuestions.length} 题</p>
          <div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${((index + 1) / orderedQuestions.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => restart('order')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">
            顺序
          </button>
          <button type="button" onClick={() => restart('random')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">
            随机
          </button>
          <button type="button" onClick={() => restart()} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">
            <RotateCcw size={15} className="mr-1.5" />
            重来
          </button>
        </div>
      </div>

      <h1 className="mt-5 text-2xl font-black leading-9 text-slate-950">{question.question}</h1>
      <div className="mt-5 grid gap-3">
        {question.choices.map((choice, choiceIndex) => {
          const isAnswer = choiceIndex === question.answerIndex
          const isSelected = choiceIndex === selected
          return (
            <button
              key={choice}
              type="button"
              onClick={() => answer(choiceIndex)}
              disabled={answered}
              className={`focus-ring flex items-start justify-between gap-3 rounded-md border p-4 text-left text-sm font-semibold ${
                answered && isAnswer
                  ? 'border-green-300 bg-green-50 text-green-950'
                  : answered && isSelected
                    ? 'border-rose-300 bg-rose-50 text-rose-950'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              <span>{choice}</span>
              {answered && isAnswer ? <CheckCircle2 size={19} className="shrink-0 text-green-700" /> : null}
              {answered && isSelected && !isAnswer ? <XCircle size={19} className="shrink-0 text-rose-700" /> : null}
            </button>
          )
        })}
      </div>

      {answered ? (
        <div className="mt-5 rounded-md bg-slate-100 p-4">
          <p className={`text-sm font-black ${isCorrect ? 'text-green-700' : 'text-rose-700'}`}>{isCorrect ? '回答正确' : '已加入错题本'}</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{question.explanation}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button type="button" onClick={goPrev} disabled={index === 0} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40">
          <ArrowLeft size={16} className="mr-1.5" />
          上一题
        </button>
        {index === orderedQuestions.length - 1 ? (
          <Link href={`/${stateSlug}/mock-test`} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
            去模拟考试
            <ArrowRight size={16} className="ml-1.5" />
          </Link>
        ) : (
          <button type="button" onClick={goNext} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
            下一题
            <ArrowRight size={16} className="ml-1.5" />
          </button>
        )}
      </div>
    </div>
  )
}
