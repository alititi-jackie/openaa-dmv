import { californiaQuestions } from './california-questions'
import { californiaExpandedQuestions } from './california-questions-expanded'
import { getLiveStateBySlug, sharedQuestions, type DmvQuestion } from './dmv-data'

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '')
}

function hashString(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return Math.abs(hash >>> 0)
}

function balanceAnswerPosition(question: DmvQuestion): DmvQuestion {
  if (question.choices.length < 2) return question

  const targetIndex = hashString(question.id) % question.choices.length
  if (targetIndex === question.answerIndex) return question

  const choices = [...question.choices]
  const correctChoice = choices[question.answerIndex]
  choices.splice(question.answerIndex, 1)
  choices.splice(targetIndex, 0, correctChoice)

  return {
    ...question,
    choices,
    answerIndex: targetIndex,
  }
}

function dedupeExactQuestions(questions: DmvQuestion[]) {
  const seenIds = new Set<string>()
  const seenQuestions = new Set<string>()

  return questions.filter((question) => {
    const normalized = normalizeText(question.question)
    if (seenIds.has(question.id) || seenQuestions.has(normalized)) return false
    seenIds.add(question.id)
    seenQuestions.add(normalized)
    return true
  })
}

function prepareQuestions(questions: DmvQuestion[]) {
  return dedupeExactQuestions(questions).map(balanceAnswerPosition)
}

export function getQuestionsForState(stateSlug: string): DmvQuestion[] {
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return []

  if (stateSlug === 'california') {
    return prepareQuestions([...californiaQuestions, ...californiaExpandedQuestions, ...sharedQuestions])
  }

  return prepareQuestions(sharedQuestions)
}

export function getQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getQuestionsForState(stateSlug).filter((question) => question.category === category)
}

export function getQuestionCountForState(stateSlug: string) {
  return getQuestionsForState(stateSlug).length
}
