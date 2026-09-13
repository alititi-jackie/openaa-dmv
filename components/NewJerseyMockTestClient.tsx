'use client'

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Languages, XCircle } from 'lucide-react'
import QuestionSignImage from './QuestionSignImage'
import type { DmvQuestion } from '@/lib/dmv-data'
import { shuffleQuestions } from '@/lib/dmv-data'
import {
  englishCoverage,
  getChoiceText,
  getEnglishContent,
  getExplanationText,
  getQuestionText,
  languageStorageKey,
  type DmvLanguage,
} from '@/lib/dmv-language'

const SIZE = 50
const PASSING = 40
const STATE_SLUG = 'new-jersey'

type SavedExam = { questionIds: string[]; answers: Record<string, number>; savedAt: number }

export default function NewJerseyMockTestClient({ questions, storageKey }: { questions: DmvQuestion[]; storageKey: string }) {
  const resumeKey = `${storageKey}:nj-mock-resume`
  const languageKey = languageStorageKey(STATE_SLUG)
  const [seed, setSeed] = useState(1)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState<SavedExam | null>(null)
  const [resumeIds, setResumeIds] = useState<string[] | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [language, setLanguage] = useState<DmvLanguage>('zh')

  const generated = useMemo(() => shuffleQuestions(questions, seed * 977).slice(0, Math.min(SIZE, questions.length)), [questions, seed])
  const exam = useMemo(() => resumeIds ? resumeIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean) as DmvQuestion[] : generated, [resumeIds, questions, generated])
  const correct = exam.filter((q) => answers[q.id] === q.answerIndex).length
  const unanswered = exam.filter((q) => answers[q.id] === undefined)
  const passed = correct >= PASSING
  const englishCount = englishCoverage(exam)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(resumeKey)
      if (raw) setSaved(JSON.parse(raw))
      const savedLanguage = localStorage.getItem(languageKey)
      if (savedLanguage === 'zh' || savedLanguage === 'en' || savedLanguage === 'bilingual') setLanguage(savedLanguage)
    } catch {}
    setHydrated(true)
  }, [resumeKey, languageKey])

  useEffect(() => {
    if (!hydrated || submitted || !exam.length) return
    if (saved && !resumeIds && Object.keys(saved.answers || {}).length > 0) return
    const data = { questionIds: exam.map((q) => q.id), answers, savedAt: Date.now() }
    localStorage.setItem(resumeKey, JSON.stringify(data))
    setSaved(data)
  }, [hydrated, exam, answers, submitted, resumeKey, saved, resumeIds])

  function changeLanguage(next: DmvLanguage) {
    setLanguage(next)
    localStorage.setItem(languageKey, next)
  }

  function restart() {
    localStorage.removeItem(resumeKey)
    setSaved(null)
    setResumeIds(null)
    setAnswers({})
    setSubmitted(false)
    setSeed((s) => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resume() {
    if (!saved) return
    setResumeIds(saved.questionIds)
    setAnswers(saved.answers || {})
    setSubmitted(false)
  }

  function submit() {
    if (unanswered.length) {
      document.getElementById(`nj-${unanswered[0].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const wrongIds = exam.filter((q) => answers[q.id] !== q.answerIndex).map((q) => q.id)
    let old: string[] = []
    try { old = JSON.parse(localStorage.getItem(storageKey) || '[]') as string[] } catch {}
    localStorage.setItem(storageKey, JSON.stringify(Array.from(new Set([...old, ...wrongIds]))))
    localStorage.setItem(`${storageKey}:last-mock-score`, String(Math.round(correct / exam.length * 100)))
    localStorage.removeItem(resumeKey)
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
    setSaved(null)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className="grid gap-5">
    <section className="card p-5">
      <p className="text-sm font-bold text-teal-700">New Jersey MVC 模拟考试</p>
      <h1 className="mt-2 text-2xl font-black text-slate-950">50 题 · 答对 40 题通过</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">按照 NJ MVC 普通知识考试的 50 题、80% 通过标准设计。本站题目用于学习练习，不代表 MVC 官方原题。</p>
      <div className="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700" />题目语言</p>
          <p className="mt-1 text-xs text-slate-500">本套试卷英文覆盖 {englishCount}/{exam.length} 题，切换语言不会重新组卷。</p>
        </div>
        <div className="grid grid-cols-3 rounded-lg bg-white p-1 sm:w-72">
          {([['zh','中文'],['en','English'],['bilingual','中英对照']] as [DmvLanguage,string][]).map(([value,label]) => <button key={value} type="button" onClick={() => changeLanguage(value)} className={`rounded-md px-2 py-2 text-xs font-black ${language === value ? 'bg-blue-700 text-white' : 'text-slate-600'}`}>{label}</button>)}
        </div>
      </div>
    </section>

    {saved && !resumeIds && Object.keys(saved.answers || {}).length > 0 && !submitted ? <section className="card border-blue-200 bg-blue-50 p-4"><p className="font-black text-blue-950">发现未完成的模拟考试</p><p className="mt-1 text-sm text-blue-800">已完成 {Object.keys(saved.answers || {}).length}/{saved.questionIds.length} 题。</p><div className="mt-3 flex gap-2"><button onClick={resume} className="rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">继续考试</button><button onClick={restart} className="rounded-md border border-blue-300 bg-white px-4 py-2 text-sm font-bold text-blue-800">重新组卷</button></div></section> : null}

    <section className="card p-4"><div className="flex items-center justify-between gap-3"><div><p className="font-black">答题进度 {exam.length - unanswered.length}/{exam.length}</p><p className="text-xs text-slate-500">未答 {unanswered.length} 题</p></div><button onClick={restart} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold">重新组卷</button></div></section>

    {submitted ? <section className={`card p-5 ${passed ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}><div className="flex items-center gap-2">{passed ? <CheckCircle2 className="text-green-700" /> : <XCircle className="text-amber-700" />}<h2 className="text-2xl font-black">{passed ? '通过 PASS' : '未通过 NOT PASSED'}</h2></div><p className="mt-3 text-lg font-black">{correct} / {exam.length} 正确 · {Math.round(correct / exam.length * 100)}%</p><p className="mt-2 text-sm">NJ MVC 正式知识考试要求 50 题至少答对 40 题（80%）。</p><button onClick={restart} className="mt-4 rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">重新模拟</button></section> : null}

    <div className="grid gap-4">{exam.map((q, index) => {
      const english = getEnglishContent(q)
      const effectiveLanguage: DmvLanguage = language === 'en' && !english ? 'zh' : language
      return <section id={`nj-${q.id}`} key={q.id} className="card scroll-mt-6 p-5">
        <p className="text-xs font-bold text-slate-500">第 {index + 1} / {exam.length} 题</p>
        {language === 'bilingual' && english ? <div className="mt-2"><h2 className="text-lg font-black text-slate-950">{q.question}</h2><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p></div> : <h2 className="mt-2 text-lg font-black text-slate-950">{getQuestionText(q, effectiveLanguage)}</h2>}
        <QuestionSignImage question={q} stateSlug={STATE_SLUG} large />
        <div className="mt-4 grid gap-2">{q.choices.map((choice, i) => {
          const selected = answers[q.id] === i
          const correctChoice = submitted && i === q.answerIndex
          const wrongChoice = submitted && selected && i !== q.answerIndex
          const englishChoice = english?.choices[i]
          return <button disabled={submitted} key={`${q.id}-${i}`} onClick={() => setAnswers((old) => ({ ...old, [q.id]: i }))} className={`rounded-md border p-3 text-left text-sm ${correctChoice ? 'border-green-400 bg-green-50' : wrongChoice ? 'border-rose-400 bg-rose-50' : selected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>{language === 'bilingual' && englishChoice ? <><span className="block font-semibold">{choice}</span><span className="mt-1 block text-xs text-slate-600">{englishChoice}</span></> : getChoiceText(q, i, effectiveLanguage)}</button>
        })}</div>
        {submitted ? language === 'bilingual' && english ? <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700"><p>解析：{q.explanation}</p><p className="mt-1 text-slate-600">Explanation: {english.explanation}</p></div> : <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">{effectiveLanguage === 'en' ? 'Explanation' : '解析'}：{getExplanationText(q, effectiveLanguage)}</p> : null}
      </section>
    })}</div>

    {!submitted ? <section className="card p-4"><button onClick={submit} className="w-full rounded-md bg-blue-700 px-4 py-3 font-black text-white">{unanswered.length ? `还有 ${unanswered.length} 题未答` : '提交并查看成绩'}</button></section> : null}
  </div>
}
