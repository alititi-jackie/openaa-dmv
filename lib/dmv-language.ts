import type { DmvQuestion } from './dmv-data'

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

export function hasEnglish(question: DmvQuestion) {
  return Boolean((question as BilingualDmvQuestion).en)
}

export function englishCoverage(questions: DmvQuestion[]) {
  return questions.filter(hasEnglish).length
}

export function getQuestionText(question: DmvQuestion, language: DmvLanguage) {
  const item = question as BilingualDmvQuestion
  if (language === 'en' && item.en) return item.en.question
  return question.question
}

export function getChoiceText(question: DmvQuestion, choiceIndex: number, language: DmvLanguage) {
  const item = question as BilingualDmvQuestion
  if (language === 'en' && item.en?.choices[choiceIndex]) return item.en.choices[choiceIndex]
  return question.choices[choiceIndex]
}

export function getExplanationText(question: DmvQuestion, language: DmvLanguage) {
  const item = question as BilingualDmvQuestion
  if (language === 'en' && item.en) return item.en.explanation
  return question.explanation
}

export function getEnglishContent(question: DmvQuestion) {
  return (question as BilingualDmvQuestion).en
}

export function getKeywords(question: DmvQuestion) {
  return (question as BilingualDmvQuestion).keywords ?? []
}
