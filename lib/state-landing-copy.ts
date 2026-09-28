import type { DmvState } from './dmv-data'
import { stateDescription, stateTitle } from './seo'

type LandingCopy = {
  homeMetadata: { title: string; description: string }
  homeHeading: string
  homeSummary: (count: number) => string
  guideMetadata: { title: string; description: string }
  guideHeading: string
  guideStructuredDescription?: string
}

// Keep state-specific editorial content alongside its metadata; generic pages only render it.
const COPY: Partial<Record<string, LandingCopy>> = {
  california: {
    homeMetadata: { title: '2026 加州 DMV 驾照题库｜中英对照练习与模拟考试', description: '加州 DMV Class C 驾照知识考试学习入口，支持中文、English 和中英对照练习，包含模拟考试、交通标志、错题本、官方 Driver Handbook 和申请入口。' },
    homeHeading: '2026 加州 DMV 驾照题库',
    homeSummary: (count) => `当前提供 ${count} 道练习题，支持中文、English 和中英对照，覆盖道路规则、交通标志和安全驾驶，并配套模拟考试、错题本和官方 California DMV 学习入口。`,
    guideMetadata: { title: '2026 加州 DMV 驾照笔试与 Permit 考试指南', description: '加州 DMV 中英双语驾照考试指南：California Driver’s Handbook、中文 Class C 样题、Permit 申请、知识考试、双语练习与路考准备。' },
    guideHeading: '2026 加州 DMV 驾照考试指南',
  },
  pennsylvania: {
    homeMetadata: { title: '2026 宾州 DMV 驾照题库｜PennDOT 18题模拟考试', description: '宾夕法尼亚州 PennDOT 驾照知识考试学习入口，提供中文、English 和中英对照练习、交通标志、错题本和 18 题模拟考试。' },
    homeHeading: '2026 宾州 PennDOT 驾照题库',
    homeSummary: (count) => `当前提供 ${count} 道练习题，覆盖宾州道路规则、交通标志和安全驾驶，并配套 PennDOT 18 题模拟考试、错题本和官方学习入口。`,
    guideMetadata: { title: '2026 宾州 PennDOT 驾照笔试指南｜18题答对15题通过', description: '宾州 PennDOT Knowledge Test 中文指南：正式知识考试 18 题、至少答对 15 题，重点复习校车、School Zone、Move Over、车灯、积分制度与宾州专属规则。' },
    guideHeading: '2026 宾州 PennDOT 驾照笔试指南',
  },
  massachusetts: {
    homeMetadata: { title: '2026 麻州 DMV 驾照题库｜Massachusetts RMV 25题模拟考试', description: 'Massachusetts RMV Class D learner’s permit 学习入口，提供中文、English 和中英对照题库、25题模拟考试，并按答对18题通过进行练习。' },
    homeHeading: '2026 麻州 Massachusetts RMV 驾照题库',
    homeSummary: (count) => `当前提供 ${count} 道练习题，支持中文、English 和中英对照，并配套 RMV 25题 / 18题通过模拟考试。`,
    guideMetadata: { title: '2026 麻州 RMV Permit 考试指南｜25题答对18题通过', description: 'Massachusetts RMV Class D Permit 中文指南：正式考试 25 题、25 分钟、至少答对 18 题，重点复习 JOL、Hands-Free、校车、4 英尺安全超车、White Cane 和麻州路权规则。' },
    guideHeading: '2026 麻州 RMV Class D Permit 考试指南',
    guideStructuredDescription: 'Massachusetts RMV Class D Permit 中文、English 和中英对照考试指南，覆盖 25题/18题通过规则、JOL、Hands-Free、校车、White Cane 与 4 英尺安全超车。',
  },
  washington: {
    homeMetadata: { title: '2026 华盛顿州 DOL 驾照题库｜40题模拟考试', description: 'Washington DOL Driving Knowledge Exam 学习入口，提供中文、English 和中英对照题库、40题模拟考试，并按答对32题通过进行练习。' },
    homeHeading: '2026 华盛顿州 Washington DOL 驾照题库',
    homeSummary: (count) => `当前提供 ${count} 道练习题，支持中文、English 和中英对照，并配套 DOL 40题 / 32题通过模拟考试。`,
    guideMetadata: { title: '2026 华盛顿州 DOL 驾照笔试指南｜40题答对32题通过', description: 'Washington DOL Driving Knowledge Exam 中文指南：正式考试 40 题、至少答对 32 题，重点复习 school zone、校车、Intermediate License、40+10 小时、车灯和华州专属规则。' },
    guideHeading: '2026 华盛顿州 DOL Driving Knowledge Exam 指南',
    guideStructuredDescription: 'Washington DOL Driving Knowledge Exam 中文、English 和中英对照指南，覆盖 40题/32题通过、school zone、校车、Intermediate License、40+10 小时和车灯规则。',
  },
}

export function getStateLandingCopy(state: DmvState) {
  const copy = COPY[state.slug]
  return {
    homeMetadata: copy?.homeMetadata ?? { title: stateTitle(state), description: stateDescription(state) },
    homeHeading: copy?.homeHeading ?? stateTitle(state),
    homeSummary: copy?.homeSummary ?? (() => stateDescription(state)),
    guideMetadata: copy?.guideMetadata ?? { title: `${state.nameZh} DMV 驾照考试指南`, description: stateDescription(state) },
    guideHeading: copy?.guideHeading ?? `${state.nameZh} DMV 驾照考试指南`,
    guideStructuredDescription: copy?.guideStructuredDescription ?? stateDescription(state),
  }
}
