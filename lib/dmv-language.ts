import type { DmvQuestion } from './dmv-data'
import { californiaEnglishById } from './california-english'

export type DmvLanguage = 'zh' | 'en' | 'bilingual'

export type DmvEnglishContent = {
  question: string
  choices: string[]
  explanation: string
}

export type DmvKeyword = {
  term: string
  zh: string
}

export type BilingualDmvQuestion = DmvQuestion & {
  en?: DmvEnglishContent
  keywords?: DmvKeyword[]
}

export function languageStorageKey(stateSlug: string) {
  return `openaa-dmv:${stateSlug}:language`
}

function externalEnglish(question: DmvQuestion) {
  return californiaEnglishById[question.id]
}

export function hasEnglish(question: DmvQuestion) {
  return Boolean((question as BilingualDmvQuestion).en || externalEnglish(question))
}

export function englishCoverage(questions: DmvQuestion[]) {
  return questions.filter(hasEnglish).length
}

export function getQuestionText(question: DmvQuestion, language: DmvLanguage) {
  const english = getEnglishContent(question)
  if (language === 'en' && english) return english.question
  return question.question
}

export function getChoiceText(question: DmvQuestion, choiceIndex: number, language: DmvLanguage) {
  const english = getEnglishContent(question)
  if (language === 'en' && english?.choices[choiceIndex]) return english.choices[choiceIndex]
  return question.choices[choiceIndex]
}

export function getExplanationText(question: DmvQuestion, language: DmvLanguage) {
  const english = getEnglishContent(question)
  if (language === 'en' && english) return english.explanation
  return question.explanation
}

export function getEnglishContent(question: DmvQuestion): DmvEnglishContent | undefined {
  return (question as BilingualDmvQuestion).en ?? externalEnglish(question)
}

export function getKeywords(question: DmvQuestion): DmvKeyword[] {
  const embedded = (question as BilingualDmvQuestion).keywords
  if (embedded?.length) return embedded
  return externalEnglish(question)?.keywords ?? []
}
