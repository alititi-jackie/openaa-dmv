'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, Star, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'

type Filter = 'all' | 'favorites' | DmvQuestion['category']
type ProgressState = {
  answered: string[]
  correct: string[]
  mastered: string[]
  favorites: string[]
}

const PAGE_SIZE = 20

function readIds(key: string) {
  try {
    return JSON.parse(window.localStorage.getItem(key) || '[]') as string[]
  } catch {
    return []
  }
}

function writeIds(key: string, ids: string[]) {
  window.localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids))))
}

export default function QuestionsClient({
  questions,
  storageKey,
  stateSlug,
  removeFromWrongOnMastery = false,
}: {
  questions: DmvQuestion[]
  storageKey: string
  stateSlug: string
  removeFromWrongOnMastery?: boolean
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const [revealed, setRevealed] = useState<Record<string, number>>({})
  const [page, setPage] = useState(1)
  const [progress, setProgress] = useState<ProgressState>({ answered: [], correct: [], mastered: [], favorites: [] })

  const answeredKey = `${storageKey}:answered`
  const correctKey = `${storageKey}:correct`
  const masteredKey = `${storageKey}:mastered`
  const favoritesKey = `${storageKey}:favorites`

  useEffect(() => {
    setProgress({
      answered: readIds(answeredKey),
      correct: readIds(correctKey),
      mastered: readIds(masteredKey),
      favorites: readIds(favoritesKey),
    })
  }, [answeredKey, correctKey, masteredKey, favoritesKey])

  const filteredQuestions = useMemo(() => {
    if (filter === 'all') return questions
    if (filter === 'favorites') return questions.filter((question) => progress.favorites.includes(question.id))
    return questions.filter((question) => question.category === filter)
  }, [filter, questions, progress.favorites])

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE))
  const pageQuestions = useMemo(
    () => filteredQuestions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredQuestions, page],
  )

  const scopedIds = useMemo(() => new Set(questions.map((question) => question.id)), [questions])
  const answeredCount = progress.answered.filter((id) => scopedIds.has(id)).length
  const correctCount = progress.correct.filter((id) => scopedIds.has(id)).length
  const masteredCount = progress.mastered.filter((id) => scopedIds.has(id)).length
  const favoriteCount = progress.favorites.filter((id) => scopedIds.has(id)).length
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0

  function persistProgress(next: ProgressState) {
    setProgress(next)
    writeIds(answeredKey, next.answered)
    writeIds(correctKey, next.correct)
    writeIds(masteredKey, next.mastered)
    writeIds(favoritesKey, next.favorites)
  }

  function markWrong(questionId: string) {
    const existing = readIds(storageKey)
    writeIds(storageKey, [...existing, questionId])
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
  }

  function recordAnswer(question: DmvQuestion, choiceIndex: number) {
    const isCorrect = choiceIndex === question.answerIndex
    const nextAnswered = Array.from(new Set([...progress.answered, question.id]))
    const nextCorrect = isCorrect
      ? Array.from(new Set([...progress.correct, question.id]))
      : progress.correct.filter((id) => id !== question.id)

    persistProgress({ ...progress, answered: nextAnswered, correct: nextCorrect })
    setRevealed((current) => ({ ...current, [question.id]: choiceIndex }))
    if (!isCorrect) markWrong(question.id)
  }

  function toggleFavorite(questionId: string) {
    const exists = progress.favorites.includes(questionId)
    persistProgress({
      ...progress,
      favorites: exists ? progress.favorites.filter((id) => id !== questionId) : [...progress.favorites, questionId],
    })
  }

  function toggleMastered(questionId: string) {
    const exists = progress.mastered.includes(questionId)
    const nextMastered = exists ? progress.mastered.filter((id) => id !== questionId) : [...progress.mastered, questionId]
    persistProgress({ ...progress, mastered: nextMastered })

    if (!exists && removeFromWrongOnMastery) {
      writeIds(storageKey, readIds(storageKey).filter((id) => id !== questionId))
      window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    }
  }

  function changeFilter(next: Filter) {
    setFilter(next)
    setPage(1)
  }

  return (
    <div>
      <section className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs font-bold text-slate-500">已完成</p>
          <p className="mt-1 text-xl font-black text-slate-950">{answeredCount} / {questions.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs font-bold text-slate-500">正确率</p>
          <p className="mt-1 text-xl font-black text-slate-950">{accuracy}%</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-xs font-bold text-slate-500">已掌握</p>
          <p className="mt-1 text-xl font-black text-slate-950">{masteredCount}</p>
        </div>
        <button type="button" onClick={() => changeFilter('favorites')} className="focus-ring rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-amber-300 hover:bg-amber-50">
          <p className="text-xs font-bold text-slate-500">已收藏</p>
          <p className="mt-1 text-xl font-black text-slate-950">{favoriteCount}</p>
        </button>
      </section>

      <div className="flex flex-wrap gap-2">
        {(['all', 'favorites', 'rules', 'signs', 'safety', 'documents'] as Filter[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => changeFilter(item)}
            className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${
              filter === item ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white text-slate-700'
            }`}
          >
            {item === 'all' ? '全部题目' : item === 'favorites' ? `收藏题 ${favoriteCount}` : categoryLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>每页 {PAGE_SIZE} 题 · 共 {filteredQuestions.length} 题</span>
        <span>第 {page} / {totalPages} 页</span>
      </div>

      {filter === 'favorites' && filteredQuestions.length === 0 ? (
        <div className="card mt-4 p-6 text-center text-sm text-slate-600">还没有收藏题目。刷题时点击右上角“收藏”，以后可以在这里集中复习。</div>
      ) : null}

      <div className="mt-4 grid gap-4">
        {pageQuestions.map((question, index) => {
          const selected = revealed[question.id]
          const globalIndex = (page - 1) * PAGE_SIZE + index + 1
          const isFavorite = progress.favorites.includes(question.id)
          const isMastered = progress.mastered.includes(question.id)
          return (
            <article key={question.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-bold text-teal-700">{categoryLabels[question.category]}</p>
                <button
                  type="button"
                  onClick={() => toggleFavorite(question.id)}
                  className={`focus-ring inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-bold ${isFavorite ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-200 bg-white text-slate-500'}`}
                  aria-label={isFavorite ? '取消收藏' : '收藏题目'}
                >
                  <Star size={14} className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? '已收藏' : '收藏'}
                </button>
              </div>
              <h2 className="mt-2 text-lg font-black leading-7 text-slate-950">
                {globalIndex}. {question.question}
              </h2>
              <QuestionSignImage question={question} stateSlug={stateSlug} />
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
                      onClick={() => recordAnswer(question, choiceIndex)}
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
                <div className="mt-4 rounded-md bg-slate-100 p-3">
                  <p className="text-sm leading-6 text-slate-700">{question.explanation}</p>
                  {selected === question.answerIndex ? (
                    <button
                      type="button"
                      onClick={() => toggleMastered(question.id)}
                      className={`focus-ring mt-3 rounded-md border px-3 py-2 text-xs font-black ${isMastered ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700'}`}
                    >
                      {isMastered ? '✓ 已掌握' : removeFromWrongOnMastery ? '已会了，从错题中移除' : '标记为已掌握'}
                    </button>
                  ) : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setPage((current) => Math.max(1, current - 1))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            disabled={page === 1}
            className="focus-ring inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"
          >
            <ChevronLeft size={16} className="mr-1" />上一页
          </button>
          <span className="text-sm font-bold text-slate-600">{page} / {totalPages}</span>
          <button
            type="button"
            onClick={() => {
              setPage((current) => Math.min(totalPages, current + 1))
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            disabled={page === totalPages}
            className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
          >
            下一页<ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
