'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Star, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'

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
  const [answeredIds, setAnsweredIds] = useState<string[]>([])
  const [correctIds, setCorrectIds] = useState<string[]>([])
  const [masteredIds, setMasteredIds] = useState<string[]>([])
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  const answeredKey = `${storageKey}:answered`
  const correctKey = `${storageKey}:correct`
  const masteredKey = `${storageKey}:mastered`
  const favoritesKey = `${storageKey}:favorites`
  const resumeKey = `${storageKey}:practice-index`

  useEffect(() => {
    setAnsweredIds(readIds(answeredKey))
    setCorrectIds(readIds(correctKey))
    setMasteredIds(readIds(masteredKey))
    setFavoriteIds(readIds(favoritesKey))
    const savedIndex = Number(window.localStorage.getItem(resumeKey) || '0')
    if (Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < questions.length) setIndex(savedIndex)
  }, [answeredKey, correctKey, masteredKey, favoritesKey, resumeKey, questions.length])

  const orderedQuestions = useMemo(() => {
    if (mode === 'order') return questions
    return shuffleQuestions(questions, seed)
  }, [mode, questions, seed])

  const question = orderedQuestions[index]
  const answered = selected !== null
  const isCorrect = answered && selected === question.answerIndex
  const scopedIds = useMemo(() => new Set(questions.map((item) => item.id)), [questions])
  const completedCount = answeredIds.filter((id) => scopedIds.has(id)).length
  const correctCount = correctIds.filter((id) => scopedIds.has(id)).length
  const accuracy = completedCount ? Math.round((correctCount / completedCount) * 100) : 0
  const isFavorite = favoriteIds.includes(question.id)
  const isMastered = masteredIds.includes(question.id)

  function answer(choiceIndex: number) {
    setSelected(choiceIndex)
    const nextAnswered = Array.from(new Set([...answeredIds, question.id]))
    setAnsweredIds(nextAnswered)
    writeIds(answeredKey, nextAnswered)

    if (choiceIndex === question.answerIndex) {
      const nextCorrect = Array.from(new Set([...correctIds, question.id]))
      setCorrectIds(nextCorrect)
      writeIds(correctKey, nextCorrect)
    } else {
      const nextCorrect = correctIds.filter((id) => id !== question.id)
      setCorrectIds(nextCorrect)
      writeIds(correctKey, nextCorrect)
      const existing = readIds(storageKey)
      writeIds(storageKey, [...existing, question.id])
      window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    }
  }

  function toggleFavorite() {
    const next = isFavorite ? favoriteIds.filter((id) => id !== question.id) : [...favoriteIds, question.id]
    setFavoriteIds(next)
    writeIds(favoritesKey, next)
  }

  function toggleMastered() {
    const next = isMastered ? masteredIds.filter((id) => id !== question.id) : [...masteredIds, question.id]
    setMasteredIds(next)
    writeIds(masteredKey, next)
  }

  function goNext() {
    setSelected(null)
    const next = Math.min(index + 1, orderedQuestions.length - 1)
    setIndex(next)
    if (mode === 'order') window.localStorage.setItem(resumeKey, String(next))
  }

  function goPrev() {
    setSelected(null)
    const next = Math.max(index - 1, 0)
    setIndex(next)
    if (mode === 'order') window.localStorage.setItem(resumeKey, String(next))
  }

  function restart(nextMode = mode) {
    setMode(nextMode)
    setSeed((current) => current + 1)
    setIndex(0)
    setSelected(null)
    if (nextMode === 'order') window.localStorage.setItem(resumeKey, '0')
  }

  return (
    <div className="card p-4 md:p-6">
      <div className="grid grid-cols-3 gap-2 border-b border-slate-200 pb-4 sm:max-w-md">
        <div className="rounded-md bg-slate-50 p-2.5">
          <p className="text-[11px] font-bold text-slate-500">已完成</p>
          <p className="mt-0.5 text-base font-black text-slate-950">{completedCount}/{questions.length}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-2.5">
          <p className="text-[11px] font-bold text-slate-500">正确率</p>
          <p className="mt-0.5 text-base font-black text-slate-950">{accuracy}%</p>
        </div>
        <div className="rounded-md bg-slate-50 p-2.5">
          <p className="text-[11px] font-bold text-slate-500">已掌握</p>
          <p className="mt-0.5 text-base font-black text-slate-950">{masteredIds.filter((id) => scopedIds.has(id)).length}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">第 {index + 1} / {orderedQuestions.length} 题</p>
          <div className="mt-2 h-2 w-64 max-w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${((index + 1) / orderedQuestions.length) * 100}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => restart('order')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">顺序</button>
          <button type="button" onClick={() => restart('random')} className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">随机</button>
          <button type="button" onClick={() => restart()} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700">
            <RotateCcw size={15} className="mr-1.5" />重来
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-3">
        <h1 className="text-2xl font-black leading-9 text-slate-950">{question.question}</h1>
        <button
          type="button"
          onClick={toggleFavorite}
          className={`focus-ring mt-1 inline-flex shrink-0 items-center rounded-md border px-2.5 py-2 text-xs font-bold ${isFavorite ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-300 text-slate-500'}`}
          aria-label={isFavorite ? '取消收藏' : '收藏题目'}
        >
          <Star size={15} className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />{isFavorite ? '已收藏' : '收藏'}
        </button>
      </div>
      <QuestionSignImage question={question} stateSlug={stateSlug} large />
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
          {isCorrect ? (
            <button
              type="button"
              onClick={toggleMastered}
              className={`focus-ring mt-3 rounded-md border px-3 py-2 text-xs font-black ${isMastered ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700'}`}
            >
              {isMastered ? '✓ 已掌握' : '标记为已掌握'}
            </button>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button type="button" onClick={goPrev} disabled={index === 0} className="focus-ring inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40">
          <ArrowLeft size={16} className="mr-1.5" />上一题
        </button>
        {index === orderedQuestions.length - 1 ? (
          <Link href={`/${stateSlug}/mock-test`} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
            去模拟考试<ArrowRight size={16} className="ml-1.5" />
          </Link>
        ) : (
          <button type="button" onClick={goNext} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
            下一题<ArrowRight size={16} className="ml-1.5" />
          </button>
        )}
      </div>
    </div>
  )
}
