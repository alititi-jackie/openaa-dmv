export type WashingtonSeoArticle = {
  slug: string
  title: string
  description: string
  intro: string
  keywords: string[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faq: { question: string; answer: string }[]
}

export const washingtonSeoArticles: WashingtonSeoArticle[] = [
  {
    slug: 'dmv-chinese-test',
    title: '2026 华盛顿州 DMV 中文题库｜DOL 驾照笔试中文试题',
    description: '华盛顿州 DMV/DOL 中文题库、驾照笔试中文试题和中文考试练习，适合华人准备 Washington DOL 40 题 Knowledge Test。',
    intro: '准备华盛顿州驾照笔试的华人，常会搜索“华盛顿州 DMV 中文题库”“华州驾照笔试中文试题”“Washington DOL 中文考试”。Washington DOL 的知识考试支持简体中文和繁体中文。',
    keywords: ['华盛顿州 DMV 中文题库','华州 DMV 中文题库','Washington DOL 中文题库','华州驾照笔试中文试题','华盛顿州中文考试','西雅图驾照笔试'],
    sections: [
      { heading: '华盛顿州中文考试怎么准备', paragraphs: ['Washington DOL Knowledge Test 共 40 题，至少答对 32 题通过，也就是 80%。中文用户可以先用中文题库理解规则，再通过中英对照熟悉英文术语。','正式知识考试支持简体中文和繁体中文，但具体考点是否提供所需语言应提前与测试机构确认。'] },
      { heading: '中文题库适合哪些人', paragraphs: ['如果英文阅读速度较慢，先用中文理解规则会更高效。理解之后再切换 English 或中英对照，可以帮助熟悉真实驾驶环境里的英文标志和道路术语。'] },
      { heading: '推荐复习顺序', paragraphs: ['先完成中文题库，再做随机练习和 40 题模拟考试。'], bullets: ['中文理解规则','中英对照熟悉词汇','随机练习查漏补缺','40 题模拟稳定达到 32 题以上'] },
    ],
    faq: [
      { question: '华盛顿州驾照笔试有中文吗？', answer: '有。Washington DOL 的知识考试支持简体中文和繁体中文。' },
      { question: '华盛顿州知识考试有多少题？', answer: '正式 Knowledge Test 共 40 题。' },
      { question: '多少题通过？', answer: '至少答对 32 题，也就是 80%。' },
    ],
  },
  {
    slug: 'english-practice',
    title: '2026 华盛顿州 DMV 英文考试｜DOL 英文练习与模拟考试',
    description: '华盛顿州 DMV/DOL 英文考试、英文练习和英文模拟考试，帮助华人熟悉 Washington DOL Knowledge Test 常见英文表达。',
    intro: '很多华人已经理解中文交规，但会担心华盛顿州 DOL 英文考试里的词汇和句型。最有效的方法是先用中文理解，再用英文题目重复相同知识点。',
    keywords: ['华盛顿州 DMV 英文考试','华州 DOL 英文考试','华州英文练习','华盛顿州英文模拟考试','Washington DOL English test'],
    sections: [
      { heading: '英文考试主要难在哪里', paragraphs: ['常见难点不是规则本身，而是 right of way、yield、school zone、move over、pedestrian、bicyclist、impaired driving 等词汇。','把中文规则与英文关键词对应起来，比单独背单词更有效。'] },
      { heading: '华人怎么练英文更快', paragraphs: ['先做中英对照，再切换纯英文。做错时先判断是规则不懂还是英文没看懂。'] },
      { heading: '正式考试前怎么检查', paragraphs: ['建议连续多轮英文模拟考试都稳定达到 32/40 以上，再参加正式考试。'] },
    ],
    faq: [
      { question: '英文不好可以先中文学习吗？', answer: '可以。官方考试支持中文，先理解规则再熟悉英文表达很实用。' },
      { question: '华盛顿州英文考试和中文考试规则一样吗？', answer: 'Knowledge Test 的核心规则相同，主要区别是语言显示。' },
      { question: '英文练习要做到多少正确率？', answer: '正式考试至少答对 32/40，备考时建议稳定高于这个水平。' },
    ],
  },
  {
    slug: 'bilingual-practice',
    title: '2026 华盛顿州 DMV 中英对照题库｜DOL 中英文驾照笔试练习',
    description: '华盛顿州 DMV/DOL 中英对照题库和中英文驾照笔试练习，帮助华人同时理解中文规则与英文考试表达。',
    intro: '中英对照最适合已经能看懂中文规则，但还不熟悉 DOL 英文关键词的用户。它可以把规则理解和英文适应放在同一道题里完成。',
    keywords: ['华盛顿州 DMV 中英对照','华州 DOL 中英文题库','华州驾照中英文练习','Washington DOL 中英对照','西雅图驾照中英练习'],
    sections: [
      { heading: '为什么中英对照适合华人', paragraphs: ['同一道知识点同时看到中文和英文，可以快速建立术语对应，例如 yield、right of way、crosswalk、school zone、move over。'] },
      { heading: '哪些内容最适合双语练习', paragraphs: ['交通标志、路权、雨天驾驶、行人、自行车、School Zone 和 Move Over 都很适合中英对照复习。'] },
      { heading: '什么时候切换纯英文', paragraphs: ['当大多数题目不用看中文也能理解时，就可以改做纯英文练习和模拟考试。'] },
    ],
    faq: [
      { question: '中英对照和中文题库有什么区别？', answer: '中文题库侧重理解规则，中英对照更适合建立英文术语对应。' },
      { question: '中英对照适合英语基础差的人吗？', answer: '适合，尤其适合刚开始熟悉 DOL 英文词汇的用户。' },
      { question: '学完中英对照还要做模拟考试吗？', answer: '建议做，模拟考试可以检查整体稳定性。' },
    ],
  },
  {
    slug: 'dmv-practice',
    title: '2026 华盛顿州 DMV 在线练习｜免费 DOL 驾照笔试题库',
    description: '华盛顿州 DMV/DOL 在线练习和免费驾照笔试题库，支持中文、English 和中英对照练习，适合华人反复刷题。',
    intro: '如果你搜索“华盛顿州 DMV 在线练习”“华州驾照题库”“DOL 免费练习”，重点应该是覆盖完整知识点，而不是只记固定答案。',
    keywords: ['华盛顿州 DMV 在线练习','华州 DOL 免费练习','华州驾照题库','华盛顿州驾照练习题','Washington DOL practice test'],
    sections: [
      { heading: '在线练习应该怎么用', paragraphs: ['第一次学习可按顺序练习，熟悉以后再切换随机模式，避免只靠记题目顺序做答。'] },
      { heading: '哪些知识值得重点练', paragraphs: ['道路规则、交通标志、雨天驾驶、行人、自行车、School Zone、Move Over 和安全驾驶都应该覆盖。'] },
      { heading: '练到什么程度再考试', paragraphs: ['正式考试 40 题要答对至少 32 题，建议练习成绩稳定高于通过线。'] },
    ],
    faq: [
      { question: '在线练习可以代替官方手册吗？', answer: '不能完全代替。题库适合检测，正式规则仍应以 Washington DOL 官方资料为准。' },
      { question: '顺序练习和随机练习哪个好？', answer: '初学可顺序练习，考试前建议随机练习。' },
      { question: '错题要不要重复做？', answer: '建议重复，并找出对应规则重新理解。' },
    ],
  },
  {
    slug: 'dmv-mock-test',
    title: '2026 华盛顿州 DMV 中文模拟考试｜40题 DOL 驾照笔试模拟题',
    description: '华盛顿州 DMV/DOL 中文模拟考试和 40 题驾照笔试模拟题，帮助华人按 40 题、32 题通过规则进行考前练习。',
    intro: '华盛顿州正式 Knowledge Test 共 40 题，因此模拟考试最好直接按 40 题节奏练习。中文模拟、英文模拟和中英对照可以分阶段使用。',
    keywords: ['华盛顿州 DMV 中文模拟考试','华州 DOL 模拟考试','华州驾照模拟考试','华盛顿州驾照笔试模拟题','Washington knowledge test mock'],
    sections: [
      { heading: '为什么要做 40 题模拟', paragraphs: ['正式考试是 40 题，至少答对 32 题。按相同题量练习更容易适应考试节奏。'] },
      { heading: '中文模拟和英文模拟怎么搭配', paragraphs: ['先中文确认规则，再用中英对照熟悉术语，最后做英文模拟。'] },
      { heading: '通过一次够不够', paragraphs: ['不建议只看一次成绩。连续多轮稳定达到 32 题以上更可靠。'] },
    ],
    faq: [
      { question: '华盛顿州 DOL 模拟考试应该多少题？', answer: '按正式 Knowledge Test 节奏，40 题最合适。' },
      { question: '答对多少题算通过？', answer: '至少答对 32 题。' },
      { question: '通过成绩有效多久？', answer: 'Washington DOL 官方说明，知识考试通过成绩有效 2 年。' },
    ],
  },
  {
    slug: 'written-test',
    title: '2026 华盛顿州驾照笔试｜中文试题与 Washington DOL Knowledge Test',
    description: '华盛顿州驾照笔试中文试题、Washington DOL Knowledge Test 和在线练习指南，覆盖 40 题考试、中文题库和模拟考试。',
    intro: '“华盛顿州驾照笔试”或“华州驾照笔试”是华人常用搜索说法，对应 Washington DOL Knowledge Test。',
    keywords: ['华盛顿州驾照笔试','华州驾照笔试中文试题','华盛顿州 DMV 笔试','Washington DOL Knowledge Test','西雅图驾照笔试'],
    sections: [
      { heading: '华盛顿州驾照笔试考什么', paragraphs: ['考试内容来自 Washington Driver Guide，覆盖道路规则、交通标志、路权、安全驾驶和州内法规。'] },
      { heading: 'DMV 和 DOL 为什么都有人搜', paragraphs: ['华人常习惯搜索“DMV”，但华盛顿州官方机构叫 Department of Licensing（DOL）。SEO 标题可以保留 DMV 用户习惯，正文则明确官方名称。'] },
      { heading: '怎样复习更稳', paragraphs: ['先看官方 Driver Guide，再做中文题库，最后用 40 题模拟检查整体掌握。'] },
    ],
    faq: [
      { question: '华盛顿州驾照笔试多少题？', answer: 'Knowledge Test 共 40 题。' },
      { question: '中文可以参加考试吗？', answer: '可以，官方支持简体中文和繁体中文。' },
      { question: '官方机构是 DMV 吗？', answer: '不是，华盛顿州官方机构是 Washington State Department of Licensing（DOL）。' },
    ],
  },
  {
    slug: 'permit-test',
    title: '2026 华盛顿州 Permit Test｜DOL 中文考试与练习',
    description: '华盛顿州 Permit Test、DOL 中文考试和学习许可笔试练习，适合华人准备 Washington Knowledge Test。',
    intro: '准备华盛顿州 instruction permit 的用户，经常会搜索“华盛顿州 Permit Test”“DOL 中文考试”“华州驾照笔试”。核心是通过 40 题知识考试。',
    keywords: ['华盛顿州 Permit Test','Washington DOL Permit Test','华州 Permit 中文考试','华州 Permit 练习','Washington instruction permit'],
    sections: [
      { heading: 'Permit Test 核心是什么', paragraphs: ['申请 instruction permit 时，很多申请人需要完成 knowledge test。正式 Knowledge Test 共 40 题，至少答对 32 题。'] },
      { heading: '中文用户怎么准备', paragraphs: ['先用中文理解规则，再做 40 题模拟；同时建议熟悉交通标志和常见英文道路术语。'] },
      { heading: '正式申请前还要确认什么', paragraphs: ['申请流程、年龄要求和测试机构安排可能调整，正式办理前应查看 Washington DOL 最新要求。'] },
    ],
    faq: [
      { question: '华盛顿州 Permit Test 可以中文考吗？', answer: '知识考试支持简体中文和繁体中文。' },
      { question: 'Permit Test 有多少题？', answer: 'Knowledge Test 共 40 题。' },
      { question: '多少题通过？', answer: '至少答对 32 题。' },
    ],
  },
  {
    slug: 'test-rules',
    title: '2026 华盛顿州 DMV 几题及格｜40题答对32题通过',
    description: '华盛顿州 DMV/DOL 笔试几题及格、多少题通过？Washington Knowledge Test 共 40 题，至少答对 32 题通过。',
    intro: '很多华人会直接搜索“华盛顿州 DMV 几题及格”“华州驾照笔试多少题”“DOL 多少题通过”。官方规则很明确：40 题、答对至少 32 题。',
    keywords: ['华盛顿州 DMV 几题及格','华州 DOL 多少题通过','华州驾照笔试多少题','Washington DOL 通过分数','华盛顿州考试规则'],
    sections: [
      { heading: '正式考试题量', paragraphs: ['Washington DOL Knowledge Test 共 40 题。'] },
      { heading: '通过标准', paragraphs: ['至少答对 32 题，也就是 80%。'] },
      { heading: '通过成绩有效多久', paragraphs: ['Washington DOL 官方说明，通过后的 knowledge test 成绩有效 2 年。'] },
    ],
    faq: [
      { question: '华盛顿州 DMV 一共多少题？', answer: 'Knowledge Test 共 40 题。' },
      { question: '答对多少题及格？', answer: '至少 32 题。' },
      { question: '通过成绩有效多久？', answer: '2 年。' },
    ],
  },
  {
    slug: 'road-signs',
    title: '2026 华盛顿州 DMV 交通标志题｜DOL 中文路标题练习',
    description: '华盛顿州 DMV/DOL 交通标志题和中文 Road Signs 练习，帮助华人准备 Knowledge Test 中的标志、信号和道路规则。',
    intro: '交通标志和道路规则是华盛顿州驾照笔试的重要内容。华人用户除了认图，还应该理解标志在真实驾驶场景里的含义。',
    keywords: ['华盛顿州 DMV 交通标志题','华州 DOL 路标题','华州交通标志中文','Washington Road Signs 中文','西雅图驾照标志题'],
    sections: [
      { heading: '交通标志怎么复习', paragraphs: ['不要只记颜色和形状，还要理解看到标志后应该减速、停车、让行还是调整车道。'] },
      { heading: '还要一起复习什么', paragraphs: ['交通信号、道路标线、行人、自行车、School Zone 和雨天驾驶应与 Road Signs 一起复习。'] },
      { heading: '中文和英文怎么搭配', paragraphs: ['先中文理解，再用中英对照熟悉 stop、yield、warning、crosswalk 等常见词。'] },
    ],
    faq: [
      { question: '交通标志题重要吗？', answer: '重要，是知识考试的核心内容之一。' },
      { question: '只背图片可以吗？', answer: '不建议，还应理解对应驾驶行为。' },
      { question: '可以中文练习吗？', answer: '可以，先中文理解后再做中英对照更好。' },
    ],
  },
  {
    slug: 'driver-handbook',
    title: '2026 华盛顿州驾驶手册中文版｜Washington DOL Driver Guide',
    description: '华盛顿州驾驶手册中文版复习指南，介绍 Washington DOL 官方简体中文、繁体中文 Driver Guide 和 40 题考试重点。',
    intro: 'Washington DOL 官方 Washington Driver Guide 提供 17 种语言，其中包括简体中文和繁体中文。对华人来说，官方中文手册加题库和模拟考试，是最稳妥的学习组合。',
    keywords: ['华盛顿州驾驶手册中文版','华州 DOL 驾驶手册中文','Washington Driver Guide 中文','西雅图驾照考试手册','华州 DMV 手册'],
    sections: [
      { heading: '官方有简体和繁体中文手册', paragraphs: ['Washington DOL 的 Driver Guides 页面同时提供 Simplified Chinese 和 Traditional Chinese Washington Driver Guide。'] },
      { heading: '哪些内容最值得重点看', paragraphs: ['重点包括道路规则、交通标志、雨天驾驶、行人、自行车、School Zone、Move Over 和安全驾驶。'] },
      { heading: '手册和题库怎么搭配', paragraphs: ['先看手册建立基础，再做题库找薄弱点，最后用 40 题模拟检查是否稳定通过。'] },
    ],
    faq: [
      { question: '华盛顿州有官方中文 Driver Guide 吗？', answer: '有，Washington DOL 官方同时提供简体中文和繁体中文版本。' },
      { question: '官方手册和题库哪个更重要？', answer: '官方手册负责规则来源，题库负责练习和检测，两者搭配最好。' },
      { question: '题库能代替官方手册吗？', answer: '不能完全代替，正式规则仍应以 Washington DOL 官方资料为准。' },
    ],
  },
]

export function getWashingtonSeoArticle(slug: string) {
  return washingtonSeoArticles.find((article) => article.slug === slug)
}
