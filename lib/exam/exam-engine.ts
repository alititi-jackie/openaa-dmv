import { shuffleQuestions, type DmvQuestion } from '@/lib/dmv-data'
import type { ExamModeConfig } from './exam-types'

export function buildExam(questions: DmvQuestion[], mode: ExamModeConfig, seed: number) {
  if (!mode.quotas) return shuffleQuestions(questions, seed * 977 + 17).slice(0, Math.min(mode.size, questions.length))

  const categories: DmvQuestion['category'][] = ['rules', 'safety', 'signs', 'documents']
  const selected: DmvQuestion[] = []
  for (const [index, category] of categories.entries()) {
    const count = mode.quotas[category] ?? 0
    if (!count) continue
    const pool = shuffleQuestions(questions.filter((q) => q.category === category), seed * 97 + index * 31 + 1)
    selected.push(...pool.slice(0, count))
  }

  const target = Math.min(mode.size, questions.length)
  if (selected.length < target) {
    const used = new Set(selected.map((q) => q.id))
    const remainder = shuffleQuestions(questions.filter((q) => !used.has(q.id)), seed * 193 + 7)
    selected.push(...remainder.slice(0, target - selected.length))
  }
  return shuffleQuestions(selected.slice(0, target), seed * 389 + 11)
}

export function examPassed(correct: number, total: number, mode: ExamModeConfig) {
  if (mode.passingCorrect != null) return correct >= mode.passingCorrect
  const score = total ? Math.round((correct / total) * 100) : 0
  return score >= (mode.passingPercent ?? 80)
}
