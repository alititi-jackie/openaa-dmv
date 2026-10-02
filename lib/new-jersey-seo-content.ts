export type NewJerseySeoArticle = {
  slug: string
  title: string
  description: string
  intro: string
  keywords: string[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faq: { question: string; answer: string }[]
}

export const newJerseySeoArticles: NewJerseySeoArticle[] = [
  {
    slug: 'dmv-chinese-test',
    title: '2026 新泽西 DMV 中文题库｜驾照笔试中文试题',
    description: '新泽西 DMV 中文题库、驾照笔试中文试题和中文考试练习，适合华人准备 NJ MVC 50 题 Knowledge Test。',
    intro: '准备新泽西驾照笔试的华人，最常搜索“新泽西 DMV 中文题库”“新泽西驾照笔试中文试题”“NJ MVC 中文考试”。新泽西官方知识考试支持中文，正式考试共 50 题。',
    keywords: ['新泽西 DMV 中文题库','新泽西 DMV 中文试题','新泽西驾照笔试中文试题','NJ MVC 中文题库','新泽西中文考试','新州驾照笔试'],
    sections: [
      { heading: '新泽西中文考试怎么准备', paragraphs: ['New Jersey MVC Knowledge Test 共 50 题，至少答对 40 题通过。中文用户可以先用中文题库理解规则，再通过中英对照熟悉英文术语。','复习重点应覆盖道路规则、交通标志、酒驾、安全驾驶、停车、路权和新泽西专属法规。'] },
      { heading: '中文题库适合哪些人', paragraphs: ['如果你刚到美国、英文阅读速度较慢，先用中文理解规则会更高效。理解之后再切换 English 或中英对照，可以减少正式考试时对关键词不熟的问题。'] },
      { heading: '推荐复习顺序', paragraphs: ['先完成中文题库，再做随机练习和 50 题模拟考试。'], bullets: ['中文理解规则','中英对照熟悉词汇','随机练习查漏补缺','50 题模拟稳定达到 40 题以上'] },
    ],
    faq: [
      { question: '新泽西 DMV 笔试有中文吗？', answer: '有。New Jersey MVC 的知识考试支持中文。' },
      { question: '新泽西知识考试有多少题？', answer: '正式 Knowledge Test 共 50 题。' },
      { question: '多少题通过？', answer: '至少答对 40 题，也就是 80%。' },
    ],
  },
  {
    slug: 'english-practice',
    title: '2026 新泽西 DMV 英文考试｜英文练习与模拟考试',
    description: '新泽西 DMV 英文考试、英文练习和英文模拟考试页面，帮助华人熟悉 NJ MVC Knowledge Test 常见英文表达。',
    intro: '很多华人已经理解中文交规，但会担心新泽西 DMV 英文考试里的词汇和句型。最有效的方法是中文理解后，再用英文题目重复相同知识点。',
    keywords: ['新泽西 DMV 英文考试','新泽西 DMV 英文练习','新泽西 DMV 英文模拟考试','新泽西驾照英文考试','NJ MVC English test'],
    sections: [
      { heading: '英文考试主要难在哪里', paragraphs: ['常见难点不是规则本身，而是 right of way、yield、BAC、school bus、railroad crossing、parking、pedestrian 等词汇。','把中文规则与英文关键词对应起来，比单独背单词更有效。'] },
      { heading: '华人怎么练英文更快', paragraphs: ['先做中英对照，再切换纯英文。做错时先判断是规则不懂还是英文没看懂。'] },
      { heading: '正式考试前怎么检查', paragraphs: ['建议连续多轮英文模拟考试都稳定达到 80% 以上，再参加正式考试。'] },
    ],
    faq: [
      { question: '英文不好可以先中文学习吗？', answer: '可以，而且通常更高效。先理解规则，再熟悉英文表达。' },
      { question: '新泽西英文考试和中文考试规则一样吗？', answer: '核心知识考试规则相同，主要区别是语言显示。' },
      { question: '英文练习要做到多少正确率？', answer: '正式通过线是 80%，备考时建议稳定高于这个水平。' },
    ],
  },
  {
    slug: 'bilingual-practice',
    title: '2026 新泽西 DMV 中英对照题库｜中英文驾照笔试练习',
    description: '新泽西 DMV 中英对照题库和中英文驾照笔试练习，帮助华人同时理解中文规则与 NJ MVC 英文考试表达。',
    intro: '中英对照最适合已经能看懂中文规则，但还不熟悉 DMV 英文关键词的用户。它可以把“规则理解”和“英文适应”放在同一道题里完成。',
    keywords: ['新泽西 DMV 中英对照','新泽西 DMV 中英文题库','新泽西驾照中英文练习','NJ MVC 中英对照','新州中文英文题库'],
    sections: [
      { heading: '为什么中英对照适合华人', paragraphs: ['同一道知识点同时看到中文和英文，可以快速建立术语对应，例如 yield、right of way、crosswalk、school bus、BAC。','比单独背词表更实用，因为词汇直接出现在驾驶场景里。'] },
      { heading: '哪些内容最适合双语练习', paragraphs: ['交通标志、路权、停车、酒驾、校车和道路标线都很适合中英对照复习。'] },
      { heading: '什么时候切换纯英文', paragraphs: ['当大多数题目不用看中文也能理解时，就可以改做纯英文练习和模拟考试。'] },
    ],
    faq: [
      { question: '中英对照和中文题库有什么区别？', answer: '中文题库侧重理解规则，中英对照更适合建立英文术语对应。' },
      { question: '中英对照适合英语基础差的人吗？', answer: '适合，尤其适合刚开始熟悉 DMV 英文词汇的用户。' },
      { question: '学完中英对照还要做模拟考试吗？', answer: '建议做，模拟考试可以检查整体稳定性。' },
    ],
  },
  {
    slug: 'dmv-practice',
    title: '2026 新泽西 DMV 在线练习｜免费驾照笔试题库',
    description: '新泽西 DMV 在线练习和免费驾照笔试题库，支持中文、English 和中英对照练习，适合华人反复刷题。',
    intro: '如果你搜索“新泽西 DMV 在线练习”“新泽西驾照题库”“NJ MVC 免费练习”，重点应该是覆盖完整知识点，而不是只记固定答案。',
    keywords: ['新泽西 DMV 在线练习','新泽西 DMV 免费练习','新泽西驾照题库','新泽西 DMV 练习题','NJ MVC practice test'],
    sections: [
      { heading: '在线练习应该怎么用', paragraphs: ['第一次学习可按顺序练习，熟悉以后再切换随机模式。这样能避免只靠记题目顺序做答。'] },
      { heading: '哪些知识值得重点练', paragraphs: ['道路规则、交通标志、酒驾、安全距离、路权、停车和新泽西专属法规都应该覆盖。'] },
      { heading: '练到什么程度再考试', paragraphs: ['正式考试 50 题要答对至少 40 题，建议练习成绩稳定高于通过线。'] },
    ],
    faq: [
      { question: '在线练习可以代替官方手册吗？', answer: '不能完全代替。题库适合检测，正式规则仍应以 New Jersey MVC 官方资料为准。' },
      { question: '顺序练习和随机练习哪个好？', answer: '初学可顺序练习，考试前建议随机练习。' },
      { question: '错题要不要重复做？', answer: '建议重复，并找出对应规则重新理解。' },
    ],
  },
  {
    slug: 'dmv-mock-test',
    title: '2026 新泽西 DMV 中文模拟考试｜50题驾照笔试模拟题',
    description: '新泽西 DMV 中文模拟考试和 50 题驾照笔试模拟题，帮助华人按 NJ MVC 50 题、40 题通过规则进行考前练习。',
    intro: '新泽西正式 Knowledge Test 共 50 题，因此模拟考试最好直接按 50 题节奏练习。对华人来说，中文模拟、英文模拟和中英对照可以分阶段使用。',
    keywords: ['新泽西 DMV 中文模拟考试','新泽西 DMV 模拟考试','新泽西驾照模拟考试','新泽西驾照笔试模拟题','NJ MVC mock test'],
    sections: [
      { heading: '为什么要做 50 题模拟', paragraphs: ['正式考试是 50 题，至少答对 40 题。50 题模拟可以更真实地检查长时间答题时的稳定性。'] },
      { heading: '中文模拟和英文模拟怎么搭配', paragraphs: ['先中文确认规则，再用中英对照熟悉术语，最后做英文模拟。'] },
      { heading: '通过一次够不够', paragraphs: ['不建议只看一次成绩。连续多轮稳定达到 40 题以上更可靠。'] },
    ],
    faq: [
      { question: '新泽西 DMV 模拟考试应该多少题？', answer: '按正式考试节奏，50 题最合适。' },
      { question: '答对多少题算通过？', answer: '至少答对 40 题。' },
      { question: '中文模拟通过后还需要英文练习吗？', answer: '如果准备使用英文考试，建议继续做英文练习。' },
    ],
  },
  {
    slug: 'written-test',
    title: '2026 新泽西驾照笔试｜中文试题与 NJ MVC Written Test',
    description: '新泽西驾照笔试中文试题、NJ MVC Written Test 和在线练习指南，覆盖 50 题考试、中文题库和模拟考试。',
    intro: '“新泽西驾照笔试”是华人最常用的搜索说法之一，对应 NJ MVC Knowledge Test。准备时可以把中文试题、模拟考试和官方 Driver Manual 结合起来。',
    keywords: ['新泽西驾照笔试','新泽西驾照笔试中文试题','新泽西 DMV 笔试','NJ MVC Written Test','新州驾照笔试'],
    sections: [
      { heading: '新泽西驾照笔试考什么', paragraphs: ['考试内容来自 New Jersey Driver Manual，包括交通法规、标志、安全驾驶、酒驾和道路规则。'] },
      { heading: 'Written Test 和 Knowledge Test', paragraphs: ['华人常说“笔试”，NJ MVC 官方更多使用 Knowledge Test。备考时可以理解为同一类驾照知识考试。'] },
      { heading: '怎样复习更稳', paragraphs: ['先看官方手册，再做中文题库，最后用 50 题模拟检查整体掌握。'] },
    ],
    faq: [
      { question: '新泽西驾照笔试多少题？', answer: 'Knowledge Test 共 50 题。' },
      { question: '中文可以参加考试吗？', answer: '可以，新泽西知识考试支持中文。' },
      { question: '只刷题不看手册可以吗？', answer: '不建议，规则仍应以官方 Driver Manual 为准。' },
    ],
  },
  {
    slug: 'permit-test',
    title: '2026 新泽西 Permit Test｜MVC 中文考试与练习',
    description: '新泽西 Permit Test、MVC 中文考试和学习许可笔试练习，适合华人准备 NJ Knowledge Test。',
    intro: '准备新泽西 learner permit 的用户，经常会搜索“新泽西 Permit Test”“NJ MVC 中文考试”“新泽西驾照笔试”。核心仍是通过 50 题知识考试。',
    keywords: ['新泽西 Permit Test','NJ MVC Permit Test','新泽西 Permit 中文考试','新泽西 Permit 练习','新泽西 learner permit'],
    sections: [
      { heading: 'Permit Test 核心是什么', paragraphs: ['新泽西首次驾驶许可流程中，知识考试是重要步骤。正式 Knowledge Test 共 50 题，至少答对 40 题。'] },
      { heading: '中文用户怎么准备', paragraphs: ['先中文理解规则，再做 50 题模拟；如果以后需要英文驾驶环境，也建议做中英对照。'] },
      { heading: '正式申请前还要确认什么', paragraphs: ['证件、预约、身份和许可流程可能调整，正式办理前应查看 NJ MVC 最新要求。'] },
    ],
    faq: [
      { question: '新泽西 Permit Test 可以中文考吗？', answer: '新泽西知识考试支持中文。' },
      { question: 'Permit Test 有多少题？', answer: '共 50 题。' },
      { question: '多少题通过？', answer: '至少答对 40 题。' },
    ],
  },
  {
    slug: 'test-rules',
    title: '2026 新泽西 DMV 几题及格｜50题答对40题通过',
    description: '新泽西 DMV 笔试几题及格、多少题通过？NJ MVC Knowledge Test 共 50 题，至少答对 40 题通过，也就是 80%。',
    intro: '很多华人会直接搜索“新泽西 DMV 几题及格”“新泽西驾照笔试多少题”“NJ MVC 多少分通过”。答案很明确：正式知识考试 50 题，至少答对 40 题。',
    keywords: ['新泽西 DMV 几题及格','新泽西 DMV 多少题通过','新泽西驾照笔试多少题','NJ MVC 通过分数','新泽西 DMV 考试规则'],
    sections: [
      { heading: '正式考试题量', paragraphs: ['New Jersey MVC Knowledge Test 共 50 题。'] },
      { heading: '通过标准', paragraphs: ['至少答对 40 题，也就是 80%。'] },
      { heading: '为什么练习成绩要更高', paragraphs: ['正式考试时可能紧张，建议平时模拟稳定高于 80%，不要只压线。'] },
    ],
    faq: [
      { question: '新泽西 DMV 一共多少题？', answer: '50 题。' },
      { question: '答对多少题及格？', answer: '至少 40 题。' },
      { question: '80% 就够了吗？', answer: '80% 是通过线，备考时建议稳定更高。' },
    ],
  },
  {
    slug: 'road-signs',
    title: '2026 新泽西 DMV 交通标志题｜中文路标题练习',
    description: '新泽西 DMV 交通标志题和中文 Road Signs 练习，帮助华人准备 NJ MVC Knowledge Test 中的标志、信号和道路标线知识。',
    intro: '交通标志是新泽西驾照笔试的重要部分。华人用户除了认图，还应该理解标志在真实驾驶场景里的含义。',
    keywords: ['新泽西 DMV 交通标志题','新泽西 DMV 路标题','新泽西交通标志中文','NJ MVC Road Signs','新泽西驾照标志题'],
    sections: [
      { heading: '交通标志怎么复习', paragraphs: ['不要只记颜色和形状，还要理解看到标志后应该减速、停车、让行还是调整车道。'] },
      { heading: '还要复习哪些交通控制', paragraphs: ['除了 signs，还要熟悉 traffic signals、road markings 和铁路道口等内容。'] },
      { heading: '中文和英文怎么搭配', paragraphs: ['先中文理解，再用中英对照熟悉 stop、yield、warning、school zone 等常见词。'] },
    ],
    faq: [
      { question: '交通标志题重要吗？', answer: '重要，是知识考试中的核心内容之一。' },
      { question: '只背图片可以吗？', answer: '不建议，还应理解对应驾驶行为。' },
      { question: '可以中文练习吗？', answer: '可以，先中文理解后再做中英对照更好。' },
    ],
  },
  {
    slug: 'driver-handbook',
    title: '2026 新泽西驾驶手册中文版｜NJ MVC Driver Manual',
    description: '新泽西驾驶手册中文版复习指南，介绍 NJ MVC 官方中文 Driver Manual、驾照笔试、交通标志和 50 题考试重点。',
    intro: 'New Jersey MVC 官方提供中文 Driver Manual。对华人来说，官方中文手册加上题库和模拟考试，是最稳妥的学习组合。',
    keywords: ['新泽西驾驶手册中文版','新泽西 DMV 驾驶手册中文','NJ MVC Driver Manual 中文','新州驾驶手册','新泽西驾照考试手册'],
    sections: [
      { heading: '官方有中文驾驶手册', paragraphs: ['New Jersey MVC 提供中文版本 Driver Manual，可以直接用来理解州内交通规则和考试知识。'] },
      { heading: '哪些内容最值得重点看', paragraphs: ['重点包括交通法规、标志、酒驾、安全驾驶、路权、停车和新泽西州专属规则。'] },
      { heading: '手册和题库怎么搭配', paragraphs: ['先看手册建立基础，再做题库找薄弱点，最后用 50 题模拟检查是否稳定通过。'] },
    ],
    faq: [
      { question: '新泽西有官方中文 Driver Manual 吗？', answer: '有，NJ MVC 提供中文驾驶手册。' },
      { question: '中文手册能代替练习题吗？', answer: '不能完全代替，两者搭配最好。' },
      { question: '题库能代替官方手册吗？', answer: '不能完全代替，正式规则仍应以 NJ MVC 官方资料为准。' },
    ],
  },
]

export function getNewJerseySeoArticle(slug: string) {
  return newJerseySeoArticles.find((article) => article.slug === slug)
}
