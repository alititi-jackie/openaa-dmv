import type { DmvQuestion } from './dmv-data'
import source from '@/data/new-york/openaa-ny-dmv-questions-v1.json'

type SourceQuestion = {
  id: number
  conceptId?: string
  category: string
  question: string
  options: string[]
  answerIndex: number
  answerText: string
  explanation?: string | null
  tags?: string[]
}

function categoryOf(question: SourceQuestion): DmvQuestion['category'] {
  const category = question.category.toLowerCase()
  const tags = (question.tags ?? []).map((tag) => tag.toLowerCase())
  if (category.includes('sign') || tags.includes('sign')) return 'signs'
  if (category.includes('safety') || category.includes('alcohol') || category.includes('weather') || category.includes('sharing')) return 'safety'
  return 'rules'
}

export const newYorkQuestions: DmvQuestion[] = (source.questions as SourceQuestion[]).map((question) => ({
  id: `ny-openaa-${question.id}`,
  conceptId: question.conceptId,
  category: categoryOf(question),
  question: question.question,
  choices: question.options,
  answerIndex: question.answerIndex,
  explanation: question.explanation?.trim() || `正确答案：${question.answerText}`,
}))
