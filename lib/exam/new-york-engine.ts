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

export function buildNyExam(questions: DmvQuestion[], seed: number) {
  const signs = shuffled(questions.filter((q) => q.category === 'signs'), seed * 17 + 3).slice(0, 4)
  const signIds = new Set(signs.map((q) => q.id))
  const others = shuffled(questions.filter((q) => !signIds.has(q.id) && q.category !== 'signs'), seed * 31 + 7).slice(0, 16)
  return shuffled([...signs, ...others], seed * 43 + 11)
}

export function nyExamPassed(correct: number, signCorrect: number) { return correct >= 14 && signCorrect >= 2 }
