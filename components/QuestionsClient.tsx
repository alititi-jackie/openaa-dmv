'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Circle, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'

type Filter = 'all' | DmvQuestion['category']

export default function QuestionsClient({ questions, storageKey }: { questions: DmvQuestion[]; storageKey: string }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [revealed, setRevealed] = useState<Record<string, number>>({})

  const filteredQuestions = useMemo(() => {
    if (filter === 'all') return questions
    return questions.filter((question) => question.category === filter)
  }, [filter, questions])

  function markWrong(questionId: string) {
    const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]
    const next = Array.from(new Set([...existing, questionId]))
    window.localStorage.setItem(storageKey, JSON.stringify(next))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(['all', 'rules', 'signs', 'safety', 'documents'] as Filter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${
              filter === item ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white text-slate-700'
            }`}
          >
            {item === 'all' ? '全部题目' : categoryLabels[item]}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {filteredQuestions.map((question, index) => {
          const selected = revealed[question.id]
          return (
            <article key={question.id} className="card p-4">
              <p className="text-xs font-bold text-teal-700">{categoryLabels[question.category]}</p>
              <h2 className="mt-2 text-lg font-black leading-7 text-slate-950">
                {index + 1}. {question.question}
              </h2>
              <QuestionSignImage question={question} />
              <div className="mt-4 grid gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const isSelected = selected === choiceIndex
                  const isAnswer = question.answerIndex === choiceIndex
                  const visible = selected !== undefined
                  const Icon = visible && isAnswer ? CheckCircle2 : visible && isSelected ? XCircle : Circle
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        setRevealed((current) => ({ ...current, [question.id]: choiceIndex }))
                        if (choiceIndex !== question.answerIndex) markWrong(question.id)
                      }}
                      className={`focus-ring flex items-start gap-3 rounded-md border p-3 text-left text-sm ${
                        visible && isAnswer
                          ? 'border-green-300 bg-green-50 text-green-950'
                          : visible && isSelected
                            ? 'border-rose-300 bg-rose-50 text-rose-950'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={18} className="mt-0.5 shrink-0" />
                      <span>{choice}</span>
                    </button>
                  )
                })}
              </div>
              {selected !== undefined ? (
                <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm leading-6 text-slate-700">{question.explanation}</p>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}
