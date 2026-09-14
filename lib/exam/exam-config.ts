import type { StateExamConfig } from './exam-types'

const PRACTICE_DEFAULT: StateExamConfig = {
  stateSlug: 'default',
  agencyLabel: 'DMV',
  defaultModeId: 'practice-20',
  modes: [{ id: 'practice-20', label: '20 题练习模式', description: '本站学习模式；正式考试题量与通过标准以该州官方最新规定为准。', size: 20, passingPercent: 80, ruleStatus: 'practice' }],
}

const CONFIGS: Record<string, StateExamConfig> = {
  california: {
    stateSlug: 'california', agencyLabel: 'DMV', defaultModeId: 'adult-36',
    modes: [
      { id: 'adult-36', label: '标准模拟 · 参考历史题量', description: '36 题练习模式，本站以 80% 作为学习目标。', size: 36, passingPercent: 80, ruleStatus: 'practice', quotas: { rules: 16, safety: 10, signs: 6, documents: 4 } },
      { id: 'teen-46', label: '青少年强化 · 参考历史题量', description: '46 题强化练习模式，本站以 80% 作为学习目标。', size: 46, passingPercent: 80, ruleStatus: 'practice', quotas: { rules: 20, safety: 13, signs: 8, documents: 5 } },
    ],
  },
  'new-jersey': {
    stateSlug: 'new-jersey', agencyLabel: 'MVC', defaultModeId: 'standard-50',
    modes: [{ id: 'standard-50', label: 'New Jersey MVC 模拟考试', description: '50 题，至少答对 40 题通过。', size: 50, passingCorrect: 40, passingPercent: 80, ruleStatus: 'verified' }],
  },
  pennsylvania: {
    stateSlug: 'pennsylvania', agencyLabel: 'PennDOT', defaultModeId: 'standard-18',
    modes: [{ id: 'standard-18', label: 'Pennsylvania PennDOT 模拟考试', description: '按 PennDOT 知识考试标准：18 题，至少答对 15 题通过。', size: 18, passingCorrect: 15, ruleStatus: 'verified', quotas: { rules: 9, safety: 5, signs: 4 } }],
  },
  massachusetts: {
    stateSlug: 'massachusetts', agencyLabel: 'RMV', defaultModeId: 'standard-25',
    modes: [{ id: 'standard-25', label: 'Massachusetts RMV 模拟考试', description: '按 RMV Class D learner’s permit exam 标准：25 题，25 分钟，至少答对 18 题通过。', size: 25, passingCorrect: 18, ruleStatus: 'verified', quotas: { rules: 12, safety: 8, signs: 5 } }],
  },
  washington: {
    stateSlug: 'washington', agencyLabel: 'DOL', defaultModeId: 'standard-40',
    modes: [{ id: 'standard-40', label: 'Washington DOL 模拟考试', description: '按 Washington DOL Driving Knowledge Exam 标准：40 题，至少答对 32 题通过。', size: 40, passingCorrect: 32, passingPercent: 80, ruleStatus: 'verified', quotas: { rules: 20, safety: 12, signs: 8 } }],
  },
}

export function getStateExamConfig(stateSlug: string): StateExamConfig {
  return CONFIGS[stateSlug] ?? { ...PRACTICE_DEFAULT, stateSlug }
}
