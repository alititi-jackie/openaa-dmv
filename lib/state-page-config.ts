import type { DmvState } from './dmv-data'
import { stateAgencyLabel } from './state-ui'
import { stateDescription } from './seo'

export const CONTENT_YEAR = 2026

export type StatePageConfig = {
  questions?: { title: string; description: string; headerDescription?: (count: number) => string }
  practice?: { title: string; description: string }
  mockTest?: { title: string; description: string; pageTitle?: string; pageDescription?: string; allowedLanguages?: Array<'zh'|'en'|'bilingual'>; defaultLanguage?: 'zh'|'en'|'bilingual'; notices?: Array<{ title: string; body: string; tone?: 'warning' }> }
  signs?: { title: string; description: string }
  wrongQuestions?: { title: string; description: string; heading?: string; structuredDescription?: string; backLabel?: string }
}

const CONFIGS: Record<string, StatePageConfig> = {
  california: {
    questions: { title: `${CONTENT_YEAR} 加州 DMV 中英文题库｜驾照笔试练习`, description: '加州 DMV 驾照知识考试中英文练习题库。' },
    signs: { title: `${CONTENT_YEAR} 加州 DMV 交通标志题库｜中英文识图练习`, description: '加州 DMV 交通标志专项题库，支持中文、English 和中英对照。' },
  },
  'new-jersey': {
    questions: { title: `${CONTENT_YEAR} 新泽西 MVC 驾照题库｜50题知识考试练习`, description: '新泽西 MVC 驾照知识考试练习题库，包含 NJ 专属考点与公共核心题。', headerDescription: (count) => `当前共 ${count} 道练习题。题库由新泽西专属考点与公共核心题组成；正式知识考试为50题，至少答对40题通过。` },
    mockTest: { title: `${CONTENT_YEAR} 新泽西 MVC 50题模拟考试｜40题正确通过`, description: '新泽西 MVC 驾照知识考试模拟练习，按 50 题、40 题正确、80% 通过标准设计。', pageTitle: `${CONTENT_YEAR} 新泽西 MVC 50题模拟考试`, pageDescription: '按 New Jersey MVC 50题、80%通过标准设计的模拟考试。' },
  },
  massachusetts: {
    mockTest: { title: `${CONTENT_YEAR} 麻州 RMV 25题模拟考试｜18题正确通过`, description: 'Massachusetts RMV Class D learner’s permit 模拟考试：25题、25分钟、至少答对18题通过，支持中文、English和中英对照。', pageTitle: `${CONTENT_YEAR} 麻州 RMV 25题模拟考试`, pageDescription: '按 Massachusetts RMV Class D Permit Exam 的 25题、25分钟、18题正确通过标准设计。' },
  },
  washington: {
    mockTest: { title: `${CONTENT_YEAR} 华盛顿州 DOL 40题模拟考试｜32题正确通过`, description: 'Washington DOL Driving Knowledge Exam 模拟练习：40题、至少答对32题通过，支持中文、English和中英对照。', pageTitle: `${CONTENT_YEAR} 华盛顿州 DOL 40题模拟考试`, pageDescription: '按 Washington DOL Driving Knowledge Exam 的 40题、32题正确通过标准设计。' },
  },
  florida: {
    questions: { title: `${CONTENT_YEAR} 佛州 Class E 中文题库｜Florida 驾照笔试练习`, description: 'Florida Class E 中文、English 和中英对照题库，覆盖佛州道路规则、Learner License、校车、限速、安全驾驶和交通标志。', headerDescription: (count) => `当前共 ${count} 道练习题，支持中文、English 和中英对照。` },
    practice: { title: 'Florida Class E 随机练习和顺序练习', description: '佛州 Class E 中文、English 和中英对照驾照笔试练习。' },
    mockTest: {
      title: `${CONTENT_YEAR} 佛州 Class E 50题模拟考试｜Florida DMV`,
      description: 'Florida Class E Knowledge Exam 50题模拟练习；本站以80%作为学习通过线，并提供60分钟倒计时。模拟考试仅提供 English / 中英对照；目前本站尚未确认 FLHSMV 正式考试支持中文。',
      pageTitle: `${CONTENT_YEAR} 佛州 Class E 50题模拟考试`,
      pageDescription: '佛州 Class E 50题限时模拟考试，提供 English 和中英对照。',
      allowedLanguages: ['en','bilingual'],
      defaultLanguage: 'en',
      notices: [
        { title: '正式考试语言提醒', tone: 'warning', body: '目前本站尚未确认 FLHSMV Class E 正式 Knowledge Exam 支持中文。为避免误导，Florida 模拟考试只提供 English / 中英对照；中文学习请使用题库或普通练习。' },
        { title: '练习评分说明', body: '正式 Class E Knowledge Exam 为 50 题；本站采用 80%（40/50）作为学习练习线，不将该数值标注为已经由 FLHSMV 当前一手页面核实的官方及格线。60 分钟倒计时用于模拟授权第三方在线考试节奏。' },
      ],
    },
    signs: { title: 'Florida Class E 交通标志练习', description: '佛州 Class E 交通标志、信号和道路标线练习。' },
    wrongQuestions: { title: 'Florida Class E 错题本', description: '佛州 Class E 驾照笔试错题复习。', heading: '佛州 FLHSMV 错题本', structuredDescription: '集中复习佛州 Class E 练习和模拟考试中的错题。', backLabel: '返回佛州 FLHSMV' },
  },
}

export function getStatePageConfig(state: DmvState): StatePageConfig {
  const agency = stateAgencyLabel(state)
  const description = stateDescription(state)
  return {
    questions: { title: `${agency} 题库｜中文驾照笔试练习`, description },
    practice: { title: `${agency} 随机练习和顺序练习`, description },
    mockTest: { title: `${agency} 中文模拟考试`, description, pageTitle: `${agency} 中文模拟考试`, pageDescription: description },
    signs: { title: `${agency} 交通标志练习`, description },
    wrongQuestions: { title: `${agency} 错题本`, description },
    ...CONFIGS[state.slug],
  }
}
