'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

const PRACTICE_TARGET = 80

type Category = DmvQuestion['category']
type CaliforniaMode = 'adult-36' | 'teen-46'

type ExamProfile = {
  size: number
  quotas: Record<Category, number>
}

const DEFAULT_PROFILE: ExamProfile = {
  size: 20,
  quotas: { rules: 8, safety: 5, signs: 4, documents: 3 },
}

const CALIFORNIA_PROFILES: Record<CaliforniaMode, ExamProfile> = {
  'adult-36': {
    size: 36,
    quotas: { rules: 16, safety: 10, signs: 6, documents: 4 },
  },
  'teen-46': {
    size: 46,
    quotas: { rules: 20, safety: 13, signs: 8, documents: 5 },
  },
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

function buildBalancedTest(questions: DmvQuestion[], profile: ExamProfile, seed: number) {
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
  const isCalifornia = stateSlug === 'california'
  const [californiaMode, setCaliforniaMode] = useState<CaliforniaMode | null>(null)
  const [seed, setSeed] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [reviewQuestionIds, setReviewQuestionIds] = useState<string[] | null>(null)
  const [highlightedQuestionId, setHighlightedQuestionId] = useState<string | null>(null)
  const resultRef = useRef<HTMLElement | null>(null)

  const profile = isCalifornia
    ? californiaMode
      ? CALIFORNIA_PROFILES[californiaMode]
      : null
    : DEFAULT_PROFILE

  const testQuestions = useMemo(
    () => (profile ? buildBalancedTest(questions, profile, seed + 1) : []),
    [questions, profile, seed],
  )

  const activeQuestions = useMemo(
    () => reviewQuestionIds ? testQuestions.filter((question) => reviewQuestionIds.includes(question.id)) : testQuestions,
    [reviewQuestionIds, testQuestions],
  )

  const correctCount = activeQuestions.filter((question) => answers[question.id] === question.answerIndex).length
  const score = activeQuestions.length ? Math.round((correctCount / activeQuestions.length) * 100) : 0
  const passed = score >= PRACTICE_TARGET
  const answeredCount = activeQuestions.filter((question) => answers[question.id] !== undefined).length
  const unansweredQuestions = activeQuestions.filter((question) => answers[question.id] === undefined)
  const remainingCount = unansweredQuestions.length
  const wrongQuestions = submitted
    ? activeQuestions.filter((question) => answers[question.id] !== question.answerIndex)
    : []

  const categoryCounts = useMemo(() => {
    return activeQuestions.reduce<Record<Category, number>>(
      (counts, question) => ({ ...counts, [question.category]: counts[question.category] + 1 }),
      { rules: 0, safety: 0, signs: 0, documents: 0 },
    )
  }, [activeQuestions])

  useEffect(() => {
    if (!submitted) return
    window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [submitted])

  function chooseCaliforniaMode(mode: CaliforniaMode) {
    setCaliforniaMode(mode)
    setSeed((current) => current + 1)
    setAnswers({})
    setSubmitted(false)
    setReviewQuestionIds(null)
    setHighlightedQuestionId(null)
  }

  function submit() {
    const wrongIds = activeQuestions.filter((question) => answers[question.id] !== question.answerIndex).map((question) => question.id)
    const existing = JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[]
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(new Set([...existing, ...wrongIds]))))
    setSubmitted(true)
  }

  function jumpToQuestion(questionId: string) {
    setHighlightedQuestionId(questionId)
    document.getElementById(`question-${questionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    window.setTimeout(() => setHighlightedQuestionId((current) => current === questionId ? null : current), 1800)
  }

  function jumpToNextUnanswered() {
    if (!unansweredQuestions.length) return
    const viewportTop = window.scrollY + 100
    const next = unansweredQuestions.find((question) => {
      const element = document.getElementById(`question-${question.id}`)
      return element ? element.getBoundingClientRect().top + window.scrollY > viewportTop : false
    }) ?? unansweredQuestions[0]
    jumpToQuestion(next.id)
  }

  function submitOrJump() {
    if (remainingCount > 0) {
      jumpToNextUnanswered()
      return
    }
    submit()
  }

  function restart() {
    setSeed((current) => current + 1)
    setAnswers({})
    setSubmitted(false)
    setReviewQuestionIds(null)
    setHighlightedQuestionId(null)
  }

  function changeMode() {
    setCaliforniaMode(null)
    setAnswers({})
    setSubmitted(false)
    setReviewQuestionIds(null)
    setHighlightedQuestionId(null)
  }

  function startWrongReview() {
    if (!wrongQuestions.length) return
    setReviewQuestionIds(wrongQuestions.map((question) => question.id))
    setAnswers({})
    setSubmitted(false)
    setHighlightedQuestionId(null)
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  if (isCalifornia && !californiaMode) {
    return (
      <div className="grid gap-5">
        <section className="card p-5 md:p-6">
          <p className="text-sm font-bold text-teal-700">California DMV 模拟考试</p>
          <h1 className="mt-2 text-2xl font-black text-slate-950">选择模拟考试模式</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            两种模式都会从当前加州题库中按道路规则、安全驾驶、交通标志和证件流程分类随机组卷，并尽量避免相似题集中出现。本站以 80% 作为练习目标；正式考试题量、申请类型和通过要求请以 California DMV 当日规定为准。
          </p>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() => chooseCaliforniaMode('adult-36')}
            className="focus-ring card p-5 text-left transition hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="text-sm font-bold text-blue-700">标准模拟</span>
            <span className="mt-2 block text-3xl font-black text-slate-950">36 题</span>
            <span className="mt-2 block text-sm leading-6 text-slate-600">参考加州成人 Class C 历史考试题量设计，适合大多数成人申请者进行完整模拟练习。</span>
            <span className="mt-4 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">开始 36 题模拟</span>
          </button>

          <button
            type="button"
            onClick={() => chooseCaliforniaMode('teen-46')}
            className="focus-ring card p-5 text-left transition hover:border-violet-300 hover:bg-violet-50"
          >
            <span className="text-sm font-bold text-violet-700">青少年强化模拟</span>
            <span className="mt-2 block text-3xl font-black text-slate-950">46 题</span>
            <span className="mt-2 block text-sm leading-6 text-slate-600">参考加州未满 18 岁申请者历史考试题量设计，题量更大，适合强化训练和考前自测。</span>
            <span className="mt-4 inline-flex rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">开始 46 题模拟</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-5">
      <section className="card p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold text-teal-700">{reviewQuestionIds ? '本次错题复习' : '模拟考试'}</p>
            <h1 className="mt-1 text-2xl font-black text-slate-950">{reviewQuestionIds ? `重新练习 ${activeQuestions.length} 道错题` : '模拟考试'}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {reviewQuestionIds
                ? '只显示上一轮答错的题目。全部完成后可再次提交，继续检查是否已经掌握。'
                : `本套共 ${activeQuestions.length} 题，按道路规则、安全驾驶、交通标志和证件流程配额抽题；本站建议练习目标为 ${PRACTICE_TARGET}% 以上，正式考试题量与通过要求以官方 DMV 为准。`}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              <span className="rounded-full bg-slate-100 px-2.5 py-1">道路规则 {categoryCounts.rules}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">安全驾驶 {categoryCounts.safety}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">交通标志 {categoryCounts.signs}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1">证件流程 {categoryCounts.documents}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {isCalifornia ? (
              <button type="button" onClick={changeMode} className="focus-ring inline-flex shrink-0 items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
                更换模式
              </button>
            ) : null}
            <button type="button" onClick={restart} className="focus-ring inline-flex shrink-0 items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">
              <RotateCcw size={15} className="mr-1.5" />
              {reviewQuestionIds ? '返回新试卷' : '换一套题'}
            </button>
          </div>
        </div>
      </section>

      {submitted ? (
        <section ref={resultRef} className={`card scroll-mt-6 p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-600">{reviewQuestionIds ? '错题复习结果' : '考试结果'}</p>
          <p className={`mt-1 text-3xl font-black ${passed ? 'text-green-800' : 'text-amber-900'}`}>
            {passed ? '达到练习目标' : '建议继续复习'} · {score}%
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-white/80 p-3">
              <p className="text-xs font-bold text-slate-500">答对</p>
              <p className="mt-1 text-xl font-black text-slate-950">{correctCount} / {activeQuestions.length}</p>
            </div>
            <div className="rounded-md bg-white/80 p-3">
              <p className="text-xs font-bold text-slate-500">本次错题</p>
              <p className="mt-1 text-xl font-black text-slate-950">{wrongQuestions.length} 题</p>
            </div>
            <div className="rounded-md bg-white/80 p-3">
              <p className="text-xs font-bold text-slate-500">练习目标</p>
              <p className="mt-1 text-xl font-black text-slate-950">{PRACTICE_TARGET}%</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">本次答错题目已加入本地错题本。正式考试题量和通过要求请以 California DMV 最新规定为准。</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {isCalifornia && wrongQuestions.length ? (
              <button type="button" onClick={startWrongReview} className="focus-ring rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">重新练习本次 {wrongQuestions.length} 道错题</button>
            ) : null}
            <button type="button" onClick={restart} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">再考一套</button>
            <Link href={`/${stateSlug}/wrong-questions`} className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">全部错题本</Link>
            {isCalifornia ? <Link href="/california" className="focus-ring rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">返回加州 DMV</Link> : null}
          </div>
        </section>
      ) : null}

      <div className="grid gap-4">
        {activeQuestions.map((question, index) => {
          const selected = answers[question.id]
          const answeredWrong = submitted && selected !== question.answerIndex
          const isHighlighted = highlightedQuestionId === question.id
          return (
            <article
              id={`question-${question.id}`}
              key={question.id}
              className={`card scroll-mt-24 p-4 transition ${answeredWrong ? 'border-rose-200' : ''} ${isHighlighted ? 'border-amber-400 ring-4 ring-amber-100' : ''}`}
            >
              <h2 className="text-lg font-black leading-7 text-slate-950">{index + 1}. {question.question}</h2>
              <QuestionSignImage question={question} />
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
        <div className="grid gap-3">
          {remainingCount > 0 ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm font-bold text-amber-900">还有 {remainingCount} 题未作答</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {unansweredQuestions.slice(0, 12).map((question) => {
                  const questionNumber = activeQuestions.findIndex((item) => item.id === question.id) + 1
                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() => jumpToQuestion(question.id)}
                      className="focus-ring rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-black text-amber-900"
                    >
                      第 {questionNumber} 题
                    </button>
                  )
                })}
                {remainingCount > 12 ? <span className="px-1 py-1 text-xs font-bold text-amber-800">还有 {remainingCount - 12} 题…</span> : null}
              </div>
            </div>
          ) : null}
          <button
            type="button"
            onClick={submitOrJump}
            className={`focus-ring rounded-md px-5 py-3 text-sm font-black text-white ${remainingCount > 0 ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-700 hover:bg-blue-800'}`}
          >
            {remainingCount === 0
              ? `提交${reviewQuestionIds ? '错题复习' : '考试'}（${answeredCount}/${activeQuestions.length} 已完成）`
              : `还剩 ${remainingCount} 题未作答 · 点击定位下一题`}
          </button>
          <p className="text-center text-xs text-slate-500">
            {remainingCount > 0 ? '可点击上方题号直接跳转，也可以点击按钮依次定位未答题。' : '已完成全部题目，可以提交并查看成绩。'}
          </p>
        </div>
      ) : null}
    </div>
  )
}
