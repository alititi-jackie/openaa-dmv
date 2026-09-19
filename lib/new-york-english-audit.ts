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
  const nonSigns = questions.filter((question) => question.category !== 'signs')
  const normalized = (text: string) => text.replace(/[\s.,?!:;()'’/-]/g, '').toLowerCase()
  const uniqueChinese = new Set(nonSigns.map((question) => normalized(question.question))).size
  const uniqueEnglish = new Set(nonSigns.map((question) => normalized(getEnglishContent(question)?.question ?? ''))).size
  if (uniqueChinese !== nonSigns.length) throw new Error(`NY Chinese non-sign concepts must be text-unique: ${uniqueChinese}/${nonSigns.length}`)
  if (uniqueEnglish !== nonSigns.length) throw new Error(`NY English non-sign concepts must be text-unique: ${uniqueEnglish}/${nonSigns.length}`)
  return { total: questions.length, covered, invalid: invalid.length, uniqueChinese, uniqueEnglish }
}
