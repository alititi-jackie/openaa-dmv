'use client'

import { browserStorage, readIds, writeIds } from '@/lib/browser-storage'

import { useMemo, useState } from 'react'
import ClientStudy from './ClientStudy'
import { CheckCircle2, ChevronLeft, ChevronRight, Circle, Languages, Star, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import { categoryLabels, type DmvQuestion } from '@/lib/dmv-data'
import {
  englishCoverage,
  getChoiceText,
  getEnglishContent,
  getExplanationText,
  getKeywords,
  getQuestionText,
  languageStorageKey,
  type DmvLanguage,
} from '@/lib/dmv-language'

type Filter = 'all' | 'favorites' | DmvQuestion['category']
type StudyMode = 'practice' | 'study'
type ProgressState = {
  answered: string[]
  correct: string[]
  mastered: string[]
  favorites: string[]
}

const PAGE_SIZE = 20

type Props = {
  questions: DmvQuestion[]
  storageKey: string
  stateSlug: string
  removeFromWrongOnMastery?: boolean
}

export default function QuestionsClient(props: Props) {
  return <ClientStudy fallback={<QuestionsSession {...props} restore={false} />}><QuestionsSession key={props.stateSlug} {...props} restore /></ClientStudy>
}

function QuestionsSession({
  questions,
  storageKey,
  stateSlug,
  removeFromWrongOnMastery = false,
  restore,
}: Props & { restore: boolean }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [studyMode, setStudyMode] = useState<StudyMode>(() => restore && browserStorage.getItem(`${storageKey}:questions-mode`) === 'study' ? 'study' : 'practice')
  const [language, setLanguage] = useState<DmvLanguage>(() => {
    const saved = restore ? browserStorage.getItem(languageStorageKey(stateSlug)) : null
    return saved === 'en' || saved === 'bilingual' ? saved : 'zh'
  })
  const [revealed, setRevealed] = useState<Record<string, number>>({})
  const [requestedPage, setPage] = useState(1)
  const [progress, setProgress] = useState<ProgressState>(() => ({
    answered: restore ? readIds(`${storageKey}:answered`) : [],
    correct: restore ? readIds(`${storageKey}:correct`) : [],
    mastered: restore ? readIds(`${storageKey}:mastered`) : [],
    favorites: restore ? readIds(`${storageKey}:favorites`) : [],
  }))

  const answeredKey = `${storageKey}:answered`
  const correctKey = `${storageKey}:correct`
  const masteredKey = `${storageKey}:mastered`
  const favoritesKey = `${storageKey}:favorites`
  const studyModeKey = `${storageKey}:questions-mode`
  const languageKey = languageStorageKey(stateSlug)
  const englishCount = englishCoverage(questions)
  const hasEnglishContent = englishCount > 0

  const filteredQuestions = useMemo(() => {
    if (filter === 'all') return questions
    if (filter === 'favorites') return questions.filter((question) => progress.favorites.includes(question.id))
    return questions.filter((question) => question.category === filter)
  }, [filter, questions, progress.favorites])

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
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
    if (studyMode === 'study') return
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

  function changeStudyMode(next: StudyMode) {
    setStudyMode(next)
    browserStorage.setItem(studyModeKey, next)
  }

  function changeLanguage(next: DmvLanguage) {
    if (next !== 'zh' && !hasEnglishContent) return
    setLanguage(next)
    browserStorage.setItem(languageKey, next)
  }

  return (
    <div>
      <section className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 lg:grid-cols-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:border-r lg:border-slate-200 lg:pr-4">
          <div>
            <p className="text-sm font-black text-slate-950">题库模式</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {studyMode === 'study'
                ? '学习模式会直接显示正确答案和解析，不计入正确率、已完成或错题记录。'
                : '练习模式需要先作答，再显示答案和解析，并记录学习进度。'}
            </p>
          </div>
          <div className="grid grid-cols-2 rounded-lg bg-slate-100 p-1 sm:w-64">
            <button type="button" onClick={() => changeStudyMode('practice')} className={`focus-ring rounded-md px-3 py-2 text-sm font-black ${studyMode === 'practice' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>练习模式</button>
            <button type="button" onClick={() => changeStudyMode('study')} className={`focus-ring rounded-md px-3 py-2 text-sm font-black ${studyMode === 'study' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600'}`}>学习模式</button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:pl-1">
          <div>
            <p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700" />题目语言</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {hasEnglishContent ? `英文内容已覆盖 ${englishCount}/${questions.length} 题；没有英文内容的题会自动显示中文。` : '双语结构已准备好，英文题目正在分批校对，当前先使用中文。'}
            </p>
          </div>
          <div className="grid grid-cols-3 rounded-lg bg-slate-100 p-1 sm:w-72">
            <button type="button" onClick={() => changeLanguage('zh')} className={`focus-ring rounded-md px-2 py-2 text-xs font-black ${language === 'zh' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>中文</button>
            <button type="button" disabled={!hasEnglishContent} onClick={() => changeLanguage('en')} className={`focus-ring rounded-md px-2 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 ${language === 'en' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>English</button>
            <button type="button" disabled={!hasEnglishContent} onClick={() => changeLanguage('bilingual')} className={`focus-ring rounded-md px-2 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 ${language === 'bilingual' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600'}`}>中英对照</button>
          </div>
        </div>
      </section>

      <section className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">已完成</p><p className="mt-1 text-xl font-black text-slate-950">{answeredCount} / {questions.length}</p></div>
        <div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">正确率</p><p className="mt-1 text-xl font-black text-slate-950">{accuracy}%</p></div>
        <div className="rounded-lg border border-slate-200 bg-white p-3"><p className="text-xs font-bold text-slate-500">已掌握</p><p className="mt-1 text-xl font-black text-slate-950">{masteredCount}</p></div>
        <button type="button" onClick={() => changeFilter('favorites')} className="focus-ring rounded-lg border border-slate-200 bg-white p-3 text-left hover:border-amber-300 hover:bg-amber-50"><p className="text-xs font-bold text-slate-500">已收藏</p><p className="mt-1 text-xl font-black text-slate-950">{favoriteCount}</p></button>
      </section>

      <div className="flex flex-wrap gap-2">
        {(['all', 'favorites', 'rules', 'signs', 'safety', 'documents'] as Filter[]).map((item) => (
          <button key={item} type="button" onClick={() => changeFilter(item)} className={`focus-ring rounded-md border px-3 py-2 text-sm font-bold ${filter === item ? 'border-blue-700 bg-blue-700 text-white' : 'border-slate-300 bg-white text-slate-700'}`}>
            {item === 'all' ? '全部题目' : item === 'favorites' ? `收藏题 ${favoriteCount}` : categoryLabels[item]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600"><span>每页 {PAGE_SIZE} 题 · 共 {filteredQuestions.length} 题</span><span>第 {page} / {totalPages} 页</span></div>

      {filter === 'favorites' && filteredQuestions.length === 0 ? <div className="card mt-4 p-6 text-center text-sm text-slate-600">还没有收藏题目。刷题时点击右上角“收藏”，以后可以在这里集中复习。</div> : null}

      <div className="mt-4 grid gap-4">
        {pageQuestions.map((question, index) => {
          const selected = revealed[question.id]
          const globalIndex = (page - 1) * PAGE_SIZE + index + 1
          const isFavorite = progress.favorites.includes(question.id)
          const isMastered = progress.mastered.includes(question.id)
          const showAnswer = studyMode === 'study' || selected !== undefined
          const english = getEnglishContent(question)
          const keywords = getKeywords(question)
          const effectiveLanguage: DmvLanguage = language === 'en' && !english ? 'zh' : language

          return (
            <article key={question.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold text-teal-700">{categoryLabels[question.category]}</p>
                  {language !== 'zh' && !english ? <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">英文待补充</span> : null}
                </div>
                <button type="button" onClick={() => toggleFavorite(question.id)} className={`focus-ring inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-bold ${isFavorite ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-slate-200 bg-white text-slate-500'}`} aria-label={isFavorite ? '取消收藏' : '收藏题目'}><Star size={14} className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />{isFavorite ? '已收藏' : '收藏'}</button>
              </div>

              {language === 'bilingual' && english ? (
                <div className="mt-2">
                  <h2 className="text-lg font-black leading-7 text-slate-950">{globalIndex}. {question.question}</h2>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p>
                </div>
              ) : (
                <h2 className="mt-2 text-lg font-black leading-7 text-slate-950">{globalIndex}. {getQuestionText(question, effectiveLanguage)}</h2>
              )}

              <QuestionSignImage question={question} stateSlug={stateSlug} />

              {keywords.length > 0 && language !== 'zh' ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((item) => <span key={item.term} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-800">{item.term} = {item.zh}</span>)}
                </div>
              ) : null}

              <div className="mt-4 grid gap-2">
                {question.choices.map((choice, choiceIndex) => {
                  const isSelected = selected === choiceIndex
                  const isAnswer = question.answerIndex === choiceIndex
                  const Icon = showAnswer && isAnswer ? CheckCircle2 : showAnswer && isSelected ? XCircle : Circle
                  const englishChoice = english?.choices[choiceIndex]
                  return (
                    <button key={`${question.id}-${choiceIndex}`} type="button" onClick={() => recordAnswer(question, choiceIndex)} disabled={studyMode === 'study'} className={`focus-ring flex items-start gap-3 rounded-md border p-3 text-left text-sm ${showAnswer && isAnswer ? 'border-green-300 bg-green-50 text-green-950' : showAnswer && isSelected ? 'border-rose-300 bg-rose-50 text-rose-950' : studyMode === 'study' ? 'cursor-default border-slate-200 bg-white text-slate-600' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'}`}>
                      <Icon size={18} className={`mt-0.5 shrink-0 ${showAnswer && isAnswer ? 'text-green-700' : ''}`} />
                      {language === 'bilingual' && englishChoice ? <span><span className="block">{choice}</span><span className="mt-0.5 block text-xs font-medium text-slate-500">{englishChoice}</span></span> : <span>{getChoiceText(question, choiceIndex, effectiveLanguage)}</span>}
                    </button>
                  )
                })}
              </div>

              {showAnswer ? (
                <div className={`mt-4 rounded-md p-3 ${studyMode === 'study' ? 'border border-teal-100 bg-teal-50/70' : 'bg-slate-100'}`}>
                  {studyMode === 'study' ? <p className="mb-2 text-xs font-black text-teal-800">正确答案：{language === 'bilingual' && english?.choices[question.answerIndex] ? `${question.choices[question.answerIndex]} / ${english.choices[question.answerIndex]}` : getChoiceText(question, question.answerIndex, effectiveLanguage)}</p> : null}
                  {language === 'bilingual' && english ? <><p className="text-sm leading-6 text-slate-700">{question.explanation}</p><p className="mt-2 border-t border-slate-200 pt-2 text-sm leading-6 text-slate-600">{english.explanation}</p></> : <p className="text-sm leading-6 text-slate-700">{getExplanationText(question, effectiveLanguage)}</p>}
                  {(studyMode === 'study' || selected === question.answerIndex) ? <button type="button" onClick={() => toggleMastered(question.id)} className={`focus-ring mt-3 rounded-md border px-3 py-2 text-xs font-black ${isMastered ? 'border-green-300 bg-green-50 text-green-800' : 'border-slate-300 bg-white text-slate-700'}`}>{isMastered ? '✓ 已掌握' : removeFromWrongOnMastery ? '已会了，从错题中移除' : '标记为已掌握'}</button> : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>

      {totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={() => { setPage((current) => Math.max(1, current - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }} disabled={page === 1} className="focus-ring inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:opacity-40"><ChevronLeft size={16} className="mr-1" />上一页</button>
          <span className="text-sm font-bold text-slate-600">{page} / {totalPages}</span>
          <button type="button" onClick={() => { setPage((current) => Math.min(totalPages, current + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }} disabled={page === totalPages} className="focus-ring inline-flex items-center rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white disabled:opacity-40">下一页<ChevronRight size={16} className="ml-1" /></button>
        </div>
      ) : null}
    </div>
  )
}
