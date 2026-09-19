import type { DmvQuestion } from '../dmv-data'

function shuffled<T>(items: T[], seed: number) {
  const out = [...items]
  let value = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    value = (value * 9301 + 49297) % 233280
    const j = Math.floor((value / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function normalizedQuestion(question: DmvQuestion) {
  return question.question.replace(/[\s，。！？、：；“”‘’（）()]/g, '').toLowerCase()
}

function uniqueConcepts(questions: DmvQuestion[]) {
  const seenConcepts = new Set<string>()
  const seenText = new Set<string>()
  return questions.filter((question) => {
    const concept = question.conceptId ?? normalizedQuestion(question)
    const text = normalizedQuestion(question)
    if (seenConcepts.has(concept) || seenText.has(text)) return false
    seenConcepts.add(concept)
    seenText.add(text)
    return true
  })
}

export function buildNyExam(questions: DmvQuestion[], seed: number) {
  const bank = uniqueConcepts(questions)
  const signs = shuffled(bank.filter((q) => q.category === 'signs'), seed * 17 + 3).slice(0, 4)
  const others = shuffled(bank.filter((q) => q.category !== 'signs'), seed * 31 + 7).slice(0, 16)
  if (signs.length !== 4 || others.length !== 16) throw new Error('New York bank does not have enough unique concepts to build an exam')
  return shuffled([...signs, ...others], seed * 43 + 11)
}

export function nyExamPassed(correct: number, signCorrect: number) { return correct >= 14 && signCorrect >= 2 }
