'use client'

import QuestionSignImage from '@/components/QuestionSignImage'
import type { DmvQuestion } from '@/lib/dmv-data'
import { getChoiceText, getEnglishContent, getExplanationText, getQuestionText, type DmvLanguage } from '@/lib/dmv-language'

type Props = {
  question: DmvQuestion
  index: number
  total: number
  selected?: number
  submitted: boolean
  language: DmvLanguage
  stateSlug: string
  idPrefix?: string
  highlighted?: boolean
  onAnswer: (choiceIndex: number) => void
}

export default function ExamQuestionCard({ question, index, total, selected, submitted, language, stateSlug, idPrefix = 'question', highlighted = false, onAnswer }: Props) {
  const english = getEnglishContent(question)
  const effectiveLanguage: DmvLanguage = language === 'en' && !english ? 'zh' : language
  return (
    <section id={`${idPrefix}-${question.id}`} className={`card scroll-mt-24 p-5 transition ${highlighted ? 'ring-2 ring-blue-400' : ''}`}>
      <div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-slate-500">第 {index + 1} / {total} 题</p>{question.category === 'signs' ? <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">交通标志</span> : null}</div>
      {language === 'bilingual' && english ? <div className="mt-2"><h2 className="text-lg font-black leading-7 text-slate-950">{question.question}</h2><p className="mt-1 text-sm font-semibold leading-6 text-slate-600">{english.question}</p></div> : <h2 className="mt-2 text-lg font-black leading-7 text-slate-950">{getQuestionText(question, effectiveLanguage)}</h2>}
      {language !== 'zh' && !english ? <p className="mt-2 text-xs font-bold text-amber-700">本题英文正在校对，暂时显示中文。</p> : null}
      <QuestionSignImage question={question} stateSlug={stateSlug} large />
      <div className="mt-4 grid gap-2">{question.choices.map((choice, choiceIndex) => {
        const chosen = selected === choiceIndex
        const correctChoice = submitted && choiceIndex === question.answerIndex
        const wrongChoice = submitted && chosen && choiceIndex !== question.answerIndex
        const englishChoice = english?.choices[choiceIndex]
        const prefix = `${String.fromCharCode(65 + choiceIndex)}. `
        return <button key={`${question.id}-${choiceIndex}`} type="button" disabled={submitted} onClick={() => onAnswer(choiceIndex)} className={`focus-ring rounded-md border p-3 text-left text-sm font-semibold ${correctChoice ? 'border-green-400 bg-green-50 text-green-900' : wrongChoice ? 'border-rose-400 bg-rose-50 text-rose-900' : chosen ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'}`}>{language === 'bilingual' && englishChoice ? <span><span className="block">{prefix}{choice}</span><span className="mt-1 block text-xs font-medium text-slate-500">{englishChoice}</span></span> : <>{prefix}{getChoiceText(question, choiceIndex, effectiveLanguage)}</>}</button>
      })}</div>
      {submitted ? <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">{language === 'bilingual' && english ? <><p><span className="font-black">解析：</span>{question.explanation}</p><p className="mt-1 border-t border-slate-200 pt-2 text-slate-600"><span className="font-black">Explanation: </span>{english.explanation}</p></> : <><span className="font-black">{effectiveLanguage === 'en' ? 'Explanation: ' : '解析：'}</span>{getExplanationText(question, effectiveLanguage)}</>}</div> : null}
    </section>
  )
}
