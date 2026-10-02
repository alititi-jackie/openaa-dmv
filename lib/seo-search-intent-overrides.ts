type SearchIntentOverride = {
  title: string
  description: string
  keywords: string[]
}

const ny: Record<string, SearchIntentOverride> = {
  'dmv-chinese-test': {
    title: '2026 纽约 DMV 中文题库｜驾照笔试中文试题',
    description: '纽约 DMV 中文题库、驾照笔试中文试题和中文考试练习，适合华人免费在线复习 Permit Test、交通标志和 20 题考试规则。',
    keywords: ['纽约 DMV 中文题库','纽约 DMV 中文试题','纽约驾照笔试中文试题','纽约 DMV 中文考试','纽约 DMV 中文练习','纽约 DMV 考试题'],
  },
  'english-practice': {
    title: '2026 纽约 DMV 英文考试｜英文练习与模拟考试',
    description: '纽约 DMV 英文考试、英文练习和英文模拟考试学习页，帮助华人熟悉 New York DMV written test 常见英文表达。',
    keywords: ['纽约 DMV 英文考试','纽约 DMV 英文练习','纽约 DMV 英文模拟考试','纽约驾照英文考试','DMV 英文考试'],
  },
  'bilingual-practice': {
    title: '2026 纽约 DMV 中英对照题库｜中英文驾照笔试练习',
    description: '纽约 DMV 中英对照题库和中英文驾照笔试练习，适合华人同时理解中文交规与英文考试表达。',
    keywords: ['纽约 DMV 中英对照','纽约 DMV 中英文题库','纽约 DMV 中英文练习','纽约驾照中英对照','DMV 中英对照练习'],
  },
  'dmv-practice': {
    title: '2026 纽约 DMV 在线练习｜免费驾照笔试题库',
    description: '纽约 DMV 在线练习和免费驾照笔试题库，支持中文、英文和中英对照练习，适合华人反复刷题和复习错题。',
    keywords: ['纽约 DMV 在线练习','纽约 DMV 免费练习','纽约 DMV 练习题','纽约驾照笔试题库','纽约 DMV 题库'],
  },
  'dmv-mock-test': {
    title: '2026 纽约 DMV 中文模拟考试｜驾照笔试模拟题',
    description: '纽约 DMV 中文模拟考试和驾照笔试模拟题，按纽约 20 题考试节奏练习，帮助华人检查正式考试前的通过稳定性。',
    keywords: ['纽约 DMV 中文模拟考试','纽约 DMV 模拟考试','纽约 DMV 模拟题','纽约驾照笔试模拟题','纽约驾照模拟考试'],
  },
  'written-test': {
    title: '2026 纽约驾照笔试｜中文试题与 DMV Written Test 练习',
    description: '纽约驾照笔试中文试题、DMV Written Test 和在线练习指南，覆盖中文题库、英文考试与 Permit 知识考试重点。',
    keywords: ['纽约驾照笔试','纽约驾照笔试中文试题','纽约 DMV 笔试','纽约驾照考试题','New York DMV Written Test'],
  },
  'permit-test': {
    title: '2026 纽约 Permit Test｜DMV 中文考试与练习',
    description: '纽约 Permit Test、DMV 中文考试和学习许可笔试练习，适合华人准备 learner permit 知识考试。',
    keywords: ['纽约 Permit Test','纽约 DMV Permit 考试','纽约 Permit 中文考试','纽约 Permit 练习','纽约 learner permit 笔试'],
  },
  'test-rules': {
    title: '2026 纽约 DMV 几题及格｜20题答对14题通过',
    description: '纽约 DMV 笔试几题及格、多少题通过？Class D/DJ/E 知识考试共 20 题，至少答对 14 题，交通标志题另有要求。',
    keywords: ['纽约 DMV 几题及格','纽约 DMV 多少题通过','纽约驾照笔试几题','纽约 DMV 通过分数','纽约 DMV 考试规则'],
  },
  'road-signs': {
    title: '2026 纽约 DMV 交通标志题｜中文路标题练习',
    description: '纽约 DMV 交通标志题、中文路标题和 Road Signs 练习，帮助华人准备驾照笔试中的交通标志部分。',
    keywords: ['纽约 DMV 交通标志题','纽约 DMV 路标题','纽约交通标志中文','纽约 Road Signs 练习','纽约驾照标志题'],
  },
  'driver-handbook': {
    title: '2026 纽约 DMV 驾驶手册中文版｜Driver’s Manual 复习',
    description: '纽约 DMV 驾驶手册中文版复习指南，整理 New York Driver’s Manual 与驾照笔试、中文题库和交通标志的学习重点。',
    keywords: ['纽约 DMV 驾驶手册中文版','纽约驾驶手册中文','New York Driver Manual 中文','纽约驾照考试手册','纽约 DMV 手册'],
  },
}

const california: Record<string, SearchIntentOverride> = {
  'dmv-chinese-test': {
    title: '2026 加州 DMV 中文题库｜驾照笔试中文试题',
    description: '加州 DMV 中文题库、驾照笔试中文试题和中文考试练习，适合华人免费在线准备 California Class C knowledge test。',
    keywords: ['加州 DMV 中文题库','加州 DMV 中文试题','加州驾照笔试中文试题','加州 DMV 中文考试','加州 DMV 中文练习','加州 DMV 考试题'],
  },
  'english-practice': {
    title: '2026 加州 DMV 英文考试｜英文练习与模拟考试',
    description: '加州 DMV 英文考试、英文练习和英文模拟考试学习页，帮助华人熟悉 California Class C knowledge test 常见英文表达。',
    keywords: ['加州 DMV 英文考试','加州 DMV 英文练习','加州 DMV 英文模拟考试','加州驾照英文考试','DMV 英文考试'],
  },
  'bilingual-practice': {
    title: '2026 加州 DMV 中英对照题库｜中英文驾照笔试练习',
    description: '加州 DMV 中英对照题库和中英文驾照笔试练习，帮助华人同时理解中文交规与 California DMV 英文题目。',
    keywords: ['加州 DMV 中英对照','加州 DMV 中英文题库','加州 DMV 中英文练习','加州驾照中英对照','DMV 中英对照练习'],
  },
  'dmv-practice': {
    title: '2026 加州 DMV 在线练习｜免费驾照笔试题库',
    description: '加州 DMV 在线练习和免费驾照笔试题库，覆盖中文、英文和中英对照练习，适合华人反复刷题备考。',
    keywords: ['加州 DMV 在线练习','加州 DMV 免费练习','加州 DMV 练习题','加州驾照笔试题库','加州 DMV 题库'],
  },
  'dmv-mock-test': {
    title: '2026 加州 DMV 中文模拟考试｜驾照笔试模拟题',
    description: '加州 DMV 中文模拟考试、驾照笔试模拟题和英文模拟练习，帮助华人在正式 Class C knowledge test 前检查掌握程度。',
    keywords: ['加州 DMV 中文模拟考试','加州 DMV 模拟考试','加州 DMV 模拟题','加州驾照笔试模拟题','加州驾照模拟考试'],
  },
  'written-test': {
    title: '2026 加州驾照笔试｜中文试题与 DMV Written Test 练习',
    description: '加州驾照笔试中文试题、DMV Written Test 和在线练习指南，覆盖中文题库、英文考试和 Class C knowledge test。',
    keywords: ['加州驾照笔试','加州驾照笔试中文试题','加州 DMV 笔试','加州驾照考试题','California DMV Written Test'],
  },
  'permit-test': {
    title: '2026 加州 Permit Test｜DMV 中文考试与练习',
    description: '加州 Permit Test、DMV 中文考试和 Instruction Permit 笔试练习，适合华人准备 California learner permit knowledge test。',
    keywords: ['加州 Permit Test','加州 DMV Permit 考试','加州 Permit 中文考试','加州 Permit 练习','California instruction permit'],
  },
  'test-rules': {
    title: '2026 加州 DMV 几题及格｜Knowledge Test 80% 通过',
    description: '加州 DMV 笔试几题及格、多少分通过？California DMV 当前官方说明 knowledge test 为多选题，passing score 是 80%。',
    keywords: ['加州 DMV 几题及格','加州 DMV 多少分通过','加州驾照笔试几题','加州 DMV 通过分数','加州 DMV 考试规则'],
  },
  'road-signs': {
    title: '2026 加州 DMV 交通标志题｜中文路标题练习',
    description: '加州 DMV 交通标志题、中文路标题和 Road Signs 练习，覆盖交通标志、路缘颜色、信号灯和道路标线。',
    keywords: ['加州 DMV 交通标志题','加州 DMV 路标题','加州交通标志中文','California Road Signs 中文','加州驾照标志题'],
  },
  'driver-handbook': {
    title: '2026 加州 DMV 驾驶手册中文版｜Driver’s Handbook 复习',
    description: '加州 DMV 驾驶手册中文版复习指南，介绍 California Driver’s Handbook 中文 PDF、驾照笔试和题库学习方法。',
    keywords: ['加州 DMV 驾驶手册中文版','加州驾驶手册中文','California Driver Handbook 中文','加州驾照考试手册','加州 DMV 手册'],
  },
}

export function getSearchIntentOverride(state: 'ny' | 'california', slug: string) {
  return state === 'ny' ? ny[slug] : california[slug]
}
