'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

const TEST_SIZE = 20

export default function MockTestClient({
  questions,
  stateSlug,
  storageKey,
}: {
  questions: DmvQuestion[]
  stateSlug: string
  storageKey: string
}) {
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const testQuestions = useMemo(() => shuffleQuestions(questions, seed + 1).slice(0, TEST_SIZE), [questions, seed])
  const correctCount = testQuestions.filter((question) => answers[question.id] === question.answerIndex).length
  const score = Math.round((correctCount / testQuestions.length) * 100)
  const passed = score >= 70

  function submit() {
    const wrongIds = testQuestions.filter((question) => answers[question.id] !== question.answerIndex).map((question) => question.id)
    const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(new Set([...existing, ...wrongIds]))))
    setSubmitted(true)
  }

  function restart() {
    setSeed((current) => current + 1)
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="grid gap-5">
      <section className="card p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950">模拟考试</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">随机抽取 {testQuestions.length} 题，70% 以上视为练习通过。正式考试规则以官方 DMV 为准。</p>
          </div>
          <button type="button" onClick={restart} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
            <RotateCcw size={15} className="mr-1.5" />
            换一套题
          </button>
        </div>
      </section>

      {submitted ? (
        <section className={`card p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-rose-300 bg-rose-50'}`}>
          <p className={`text-2xl font-black ${passed ? 'text-green-800' : 'text-rose-800'}`}>
            {passed ? '练习通过' : '继续加油'} · {score}%
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">答对 {correctCount} / {testQuestions.length} 题，错题已保存到本地错题本。</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={restart} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">再考一次</button>
            <Link href={`/${stateSlug}/wrong-questions`} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">查看错题</Link>
          </div>
        </section>
      ) : null}

      <div className="grid gap-4">
        {testQuestions.map((question, index) => {
          const selected = answers[question.id]
          return (
            <article key={question.id} className="card p-4">
              <h2 className="text-lg font-black leading-7 text-slate-950">{index + 1}. {question.question}</h2>
              <div className="mt-4 grid gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const isAnswer = choiceIndex === question.answerIndex
                  const isSelected = selected === choiceIndex
                  return (
                    <button
                      key={choice}
                      type="button"
                      disabled={submitted}
                      onClick={() => setAnswers((current) => ({ ...current, [question.id]: choiceIndex }))}
                      className={`focus-ring flex items-start justify-between gap-3 rounded-md border p-3 text-left text-sm ${
                        submitted && isAnswer
                          ? 'border-green-300 bg-green-50 text-green-950'
                          : submitted && isSelected && !isAnswer
                            ? 'border-rose-300 bg-rose-50 text-rose-950'
                            : isSelected
                              ? 'border-blue-400 bg-blue-50 text-blue-950'
                              : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>{choice}</span>
                      {submitted && isAnswer ? <CheckCircle2 size={18} className="shrink-0 text-green-700" /> : null}
                      {submitted && isSelected && !isAnswer ? <XCircle size={18} className="shrink-0 text-rose-700" /> : null}
                    </button>
                  )
                })}
              </div>
              {submitted ? <p className="mt-3 text-sm leading-6 text-slate-600">{question.explanation}</p> : null}
            </article>
          )
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={Object.keys(answers).length < testQuestions.length}
          className="focus-ring rounded-md bg-blue-700 px-5 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          提交考试
        </button>
      ) : null}
    </div>
  )
}
