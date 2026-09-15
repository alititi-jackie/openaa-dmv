import type { DmvQuestion } from './dmv-data'
import { newYorkQuestions } from './new-york-questions'

export function getNewYorkQuestions(): DmvQuestion[] {
  const ids = new Set<string>()
  const texts = new Set<string>()
  return newYorkQuestions.filter((question) => {
    const text = question.question.toLowerCase().replace(/\s+/g, '')
    if (ids.has(question.id) || texts.has(text)) return false
    ids.add(question.id)
    texts.add(text)
    return true
  })
}
