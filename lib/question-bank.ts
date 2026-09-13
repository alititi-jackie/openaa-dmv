import { californiaQuestions } from './california-questions'
import { getLiveStateBySlug, sharedQuestions, type DmvQuestion } from './dmv-data'

export function getQuestionsForState(stateSlug: string): DmvQuestion[] {
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return []

  if (stateSlug === 'california') {
    return [...californiaQuestions, ...sharedQuestions]
  }

  return sharedQuestions
}

export function getQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getQuestionsForState(stateSlug).filter((question) => question.category === category)
}

export function getQuestionCountForState(stateSlug: string) {
  return getQuestionsForState(stateSlug).length
}
