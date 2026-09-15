import { getNewYorkQuestions } from './new-york-bank'
import { englishCoverage, getEnglishContent } from './dmv-language'

export function auditNewYorkEnglish() {
  const questions = getNewYorkQuestions()
  const covered = englishCoverage(questions)
  const invalid = questions.filter((q) => {
    const en = getEnglishContent(q)
    return !en || en.choices.length !== q.choices.length || !en.question.trim() || !en.explanation.trim()
  })
  if (questions.length !== 150) throw new Error(`NY bank must expose 150 stable questions, got ${questions.length}`)
  if (covered !== 150) throw new Error(`NY English coverage must be 150/150, got ${covered}/150`)
  if (invalid.length) throw new Error(`NY English invalid entries: ${invalid.map((q) => q.id).join(', ')}`)
  return { total: questions.length, covered, invalid: invalid.length }
}
