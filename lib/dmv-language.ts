import type { DmvQuestion } from './dmv-data'
import { californiaEnglishById } from './california-english'
import { californiaCoreEnglishById } from './california-english-core'
import { californiaExpandedEnglishById } from './california-english-expanded'
import { californiaQualityEnglishById } from './california-english-quality'
import { newJerseyEnglishById } from './new-jersey-english'
import { newYorkEnglishById } from './new-york-english'
import { pennsylvaniaEnglishById } from './pennsylvania-english'
import { getQuestionSourceForLanguage } from './question-bank'
import { sharedCoreEnglish } from './shared-core-english'

export type DmvLanguage = 'zh' | 'en' | 'bilingual'
export type DmvEnglishContent = { question: string; choices: string[]; explanation: string }
export type DmvKeyword = { term: string; zh: string }
export type BilingualDmvQuestion = DmvQuestion & { en?: DmvEnglishContent; keywords?: DmvKeyword[] }

export function languageStorageKey(stateSlug: string) { return `openaa-dmv:${stateSlug}:language` }

function matchesLanguageSource(question: DmvQuestion) {
  const source = getQuestionSourceForLanguage(question.id)
  if (!source || source.question !== question.question || source.choices.length !== question.choices.length) return false
  return question.choices.every((choice) => source.choices.includes(choice))
}

function externalEnglish(question: DmvQuestion) {
  const stateSpecific = newYorkEnglishById[question.id]
    ?? pennsylvaniaEnglishById[question.id]
    ?? newJerseyEnglishById[question.id]
  if (stateSpecific) return stateSpecific

  // Some states keep the canonical Shared Core wording while California uses
  // a visual, image-specific variant with the same stable ID. Select English
  // by the actual Chinese variant as well as the ID so those banks cannot
  // accidentally inherit California's picture-specific question and answers.
  if (!matchesLanguageSource(question)) {
    return californiaCoreEnglishById[question.id]
      ?? sharedCoreEnglish[question.id]
      ?? californiaQualityEnglishById[question.id]
      ?? californiaEnglishById[question.id]
      ?? californiaExpandedEnglishById[question.id]
  }

  return californiaQualityEnglishById[question.id]
    ?? californiaEnglishById[question.id]
    ?? californiaCoreEnglishById[question.id]
    ?? californiaExpandedEnglishById[question.id]
    ?? sharedCoreEnglish[question.id]
}

function alignChoices(question: DmvQuestion, english: DmvEnglishContent): DmvEnglishContent {
  const source = getQuestionSourceForLanguage(question.id)
  if (!source || !matchesLanguageSource(question) || source.choices.length !== english.choices.length || question.choices.length !== english.choices.length) return english
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
