'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

const PRACTICE_TARGET = 80

type Category = DmvQuestion['category']

type ExamProfile = {
  size: number
  quotas: Record<Category, number>
}

const DEFAULT_PROFILE: ExamProfile = {
  size: 20,
  quotas: { rules: 8, safety: 5, signs: 4, documents: 3 },
}

const CALIFORNIA_PROFILE: ExamProfile = {
  size: 30,
  quotas: { rules: 14, safety: 8, signs: 5, documents: 3 },
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

function bigrams(value: string) {
  const text = normalize(value)
  const result = new Set<string>()
  for (let index = 0; index < text.length - 1; index += 1) result.add(text.slice(index, index + 2))
  return result
}

function similarity(left: string, right: string) {
  const a = bigrams(left)
  const b = bigrams(right)
  if (!a.size || !b.size) return 0
  let overlap = 0
  a.forEach((item) => {
    if (b.has(item)) overlap += 1
  })
  return overlap / Math.max(a.size, b.size)
}

function isTooSimilar(question: DmvQuestion, selected: DmvQuestion[]) {
  return selected.some((item) => similarity(question.question, item.question) >= 0.58)
}

function takeWithVariety(pool: DmvQuestion[], amount: number, selected: DmvQuestion[]) {
  const picked: DmvQuestion[] = []

  for (const question of pool) {
    if (picked.length >= amount) break
    if (!isTooSimilar(question, [...selected, ...picked])) picked.push(question)
  }

  if (picked.length < amount) {
    for (const question of pool) {
      if (picked.length >= amount) break
      if (!picked.some((item) => item.id === question.id)) picked.push(question)
    }
  }

  return picked
}

function buildBalancedTest(questions: DmvQuestion[], stateSlug: string, seed: number) {
  const profile = stateSlug === 'california' ? CALIFORNIA_PROFILE : DEFAULT_PROFILE
  const selected: DmvQuestion[] = []
  const categories: Category[] = ['rules', 'safety', 'signs', 'documents']

  categories.forEach((category, categoryIndex) => {
    const pool = shuffleQuestions(
      questions.filter((question) => question.category === category),
      seed * 97 + categoryIndex * 31 + 1,
    )
    selected.push(...takeWithVariety(pool, profile.quotas[category], selected))
  })

  if (selected.length < Math.min(profile.size, questions.length)) {
    const remaining = shuffleQuestions(
      questions.filter((question) => !selected.some((item) => item.id === question.id)),
      seed * 193 + 7,
    )
    selected.push(...takeWithVariety(remaining, Math.min(profile.size, questions.length) - selected.length, selected))
  }

  return shuffleQuestions(selected.slice(0, profile.size), seed * 389 + 11)
}

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

  const testQuestions = useMemo(() => buildBalancedTest(questions, stateSlug, seed + 1), [questions, seed, stateSlug])
  const correctCount = testQuestions.filter((question) => answers[question.id] === question.answerIndex).length
  const score = testQuestions.length ? Math.round((correctCount / testQuestions.length) * 100) : 0
  const passed = score >= PRACTICE_TARGET

  const categoryCounts = useMemo(() => {
    return testQuestions.reduce<Record<Category, number>>(
      (counts, question) => ({ ...counts, [question.category]: counts[question.category] + 1 }),
      { rules: 0, safety: 0, signs: 0, documents: 0 },
    )
  }, [testQuestions])

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
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950">模拟考试</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              本套共 {testQuestions.length} 题，按道路规则、安全驾驶、交通标志和证件流程配额抽题；本站建议练习目标为 {PRACTICE_TARGET}% 以上，正式考试题量与通过要求以官方 DMV 为准。
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              <span className="rounded-full bg-slate-100 px-2.5 py-1">道路规则 {categoryCounts.rules}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">安全驾驶 {categoryCounts.safety}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">交通标志 {categoryCounts.signs}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">证件流程 {categoryCounts.documents}</span>
            </div>
          </div>
          <button type="button" onClick={restart} className="focus-ring inline-flex shrink-0 items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
            <RotateCcw size={15} className="mr-1.5" />
            换一套题
          </button>
        </div>
      </section>

      {submitted ? (
        <section className={`card p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
          <p className={`text-2xl font-black ${passed ? 'text-green-800' : 'text-amber-900'}`}>
            {passed ? '达到练习目标' : '建议继续复习'} · {score}%
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
