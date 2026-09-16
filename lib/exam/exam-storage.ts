import type { DmvQuestion } from '../dmv-data'
import type { SavedExamV1, StateExamConfig } from './exam-types'

export function parseSavedExam(raw: string | null, stateSlug: string, config: StateExamConfig, questions: DmvQuestion[]): SavedExamV1 | null {
  if (!raw) return null
  try {
    const value = JSON.parse(raw)
    if (!value || value.version !== 1 || value.stateSlug !== stateSlug) return null
    const mode = config.modes.find((item) => item.id === value.modeId)
    const byId = new Map(questions.map((q) => [q.id, q]))
    if (!mode || !Array.isArray(value.questionIds) || value.questionIds.length !== Math.min(mode.size, questions.length) || !value.questionIds.length) return null
    if (new Set(value.questionIds).size !== value.questionIds.length || !value.questionIds.every((id: unknown) => typeof id === 'string' && byId.has(id))) return null
    if (!value.answers || typeof value.answers !== 'object' || Array.isArray(value.answers)) return null
    for (const [id, answer] of Object.entries(value.answers)) {
      const question = byId.get(id)
      if (!value.questionIds.includes(id) || !question || !Number.isInteger(answer) || Number(answer) < 0 || Number(answer) >= question.choices.length) return null
    }
    if (!Number.isFinite(value.savedAt) || value.savedAt < 0) return null
    if (value.startedAt !== undefined && (!Number.isFinite(value.startedAt) || value.startedAt < 0)) return null
    return value as SavedExamV1
  } catch { return null }
}

export function examStorageKeys(stateSlug: string) {
  const base = `openaa-dmv:${stateSlug}`
  return {
    wrong: `${base}:wrong`,
    resume: `${base}:exam:resume`,
    lastScore: `${base}:exam:last-score`,
    language: `${base}:language`,
    answered: `${base}:answered`,
    correct: `${base}:correct`,
    mastered: `${base}:mastered`,
    favorites: `${base}:favorites`,
  }
}
