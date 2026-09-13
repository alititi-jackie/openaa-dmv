import type { DmvQuestion } from './dmv-data'
import { californiaEnglishById } from './california-english'
import { californiaCoreEnglishById } from './california-english-core'
import { californiaExpandedEnglishById } from './california-english-expanded'
import { californiaQualityEnglishById } from './california-english-quality'
import { newJerseyEnglishById } from './new-jersey-english'
import { getQuestionSourceForLanguage } from './question-bank'
import { sharedCoreEnglish } from './shared-core-english'

export type DmvLanguage = 'zh' | 'en' | 'bilingual'
export type DmvEnglishContent = { question: string; choices: string[]; explanation: string }
export type DmvKeyword = { term: string; zh: string }
export type BilingualDmvQuestion = DmvQuestion & { en?: DmvEnglishContent; keywords?: DmvKeyword[] }

export function languageStorageKey(stateSlug: string) { return `openaa-dmv:${stateSlug}:language` }

function externalEnglish(question: DmvQuestion) {
  return newJerseyEnglishById[question.id]
    ?? californiaQualityEnglishById[question.id]
    ?? californiaEnglishById[question.id]
    ?? californiaCoreEnglishById[question.id]
    ?? californiaExpandedEnglishById[question.id]
    ?? sharedCoreEnglish[question.id]
}

function alignChoices(question: DmvQuestion, english: DmvEnglishContent): DmvEnglishContent {
  const source = getQuestionSourceForLanguage(question.id)
  if (!source || source.choices.length !== english.choices.length || question.choices.length !== english.choices.length) return english
  const aligned = question.choices.map((choice, index) => {
    const sourceIndex = source.choices.indexOf(choice)
    return sourceIndex >= 0 ? english.choices[sourceIndex] : english.choices[index]
  })
  return { ...english, choices: aligned }
}

export function hasEnglish(question: DmvQuestion) { return Boolean((question as BilingualDmvQuestion).en || externalEnglish(question)) }
export function englishCoverage(questions: DmvQuestion[]) { return questions.filter(hasEnglish).length }
export function getQuestionText(question: DmvQuestion, language: DmvLanguage) {
  const english = getEnglishContent(question)
  return language === 'en' && english ? english.question : question.question
}
export function getChoiceText(question: DmvQuestion, choiceIndex: number, language: DmvLanguage) {
  const english = getEnglishContent(question)
  return language === 'en' && english?.choices[choiceIndex] ? english.choices[choiceIndex] : question.choices[choiceIndex]
}
export function getExplanationText(question: DmvQuestion, language: DmvLanguage) {
  const english = getEnglishContent(question)
  return language === 'en' && english ? english.explanation : question.explanation
}
export function getEnglishContent(question: DmvQuestion): DmvEnglishContent | undefined {
  const embedded = (question as BilingualDmvQuestion).en
  const english = embedded ?? externalEnglish(question)
  return english ? alignChoices(question, english) : undefined
}
export function getKeywords(question: DmvQuestion): DmvKeyword[] {
  const embedded = (question as BilingualDmvQuestion).keywords
  if (embedded?.length) return embedded
  return californiaEnglishById[question.id]?.keywords ?? []
}
