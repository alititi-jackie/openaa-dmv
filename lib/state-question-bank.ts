import type { DmvQuestion } from './dmv-data'
import { getQuestionsForState as getBaseQuestionsForState } from './question-bank'
import { newJerseyQuestions } from './new-jersey-questions'

function normalize(value: string) {
  return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

function dedupe(questions: DmvQuestion[]) {
  const ids = new Set<string>()
  const texts = new Set<string>()
  return questions.filter((question) => {
    const text = normalize(question.question)
    if (ids.has(question.id) || texts.has(text)) return false
    ids.add(question.id)
    texts.add(text)
    return true
  })
}

export function getStateQuestions(stateSlug: string): DmvQuestion[] {
  const shared = getBaseQuestionsForState(stateSlug)
  if (stateSlug !== 'new-jersey') return shared
  // NJ-specific questions are placed first so exact duplicates prefer the state-specific wording.
  return dedupe([...newJerseyQuestions, ...shared])
}

export function getStateQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getStateQuestions(stateSlug).filter((question) => question.category === category)
}

export function getStateQuestionCount(stateSlug: string) {
  return getStateQuestions(stateSlug).length
}
