import type { DmvQuestion } from '@/lib/dmv-data'

export type ExamModeConfig = {
  id: string
  label: string
  description?: string
  size: number
  passingPercent?: number
  passingCorrect?: number
  quotas?: Partial<Record<DmvQuestion['category'], number>>
  ruleStatus?: 'verified' | 'practice'
  timeLimitMinutes?: number
}

export type StateExamConfig = {
  stateSlug: string
  agencyLabel: string
  modes: ExamModeConfig[]
  defaultModeId: string
}

export type SavedExamV1 = {
  version: 1
  stateSlug: string
  modeId: string
  questionIds: string[]
  answers: Record<string, number>
  savedAt: number
  startedAt?: number
}
