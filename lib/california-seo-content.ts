export type CaliforniaSeoArticle = {
  slug: string
  title: string
  description: string
  intro: string
  keywords: string[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faq: { question: string; answer: string }[]
}

export const californiaSeoArticles: CaliforniaSeoArticle[] = [
  {
    slug: 'dmv-chinese-test',
    title: '2026 加州 DMV 中文题库｜驾照笔试中文考试练习',
    description: '加州 DMV 中文题库与 Class C 驾照笔试练习指南，覆盖 California DMV 中文考试、样题、交通规则和 80% 通过标准。',
    intro: '准备加州 Class C 驾照知识考试的华人用户，可以先用中文理解 California Driver’s Handbook 的规则，再结合英文或中英对照练习。California DMV 官方本身也提供中文 Class C 样题。',
    keywords: ['加州 DMV 中文题库','加州 DMV 中文考试','加州 DMV 中文练习','加州驾照笔试','加州 DMV 考试题'],
    sections: [
      { heading: '加州 DMV 中文考试重点', paragraphs: ['California DMV 的 knowledge test 是基于 California Driver’s Handbook 的多选题，官方说明通过标准为 80%。准备时应该覆盖道路规则、交通标志、安全驾驶、停车、路权、自行车道、校车和酒驾等内容。','官方 Class C 中文样题说明，加州 DMV 确实提供中文练习资源。OpenAA DMV 的作用是把这些知识点整理成更适合华人反复练习的题库。'] },
      { heading: '官方中文样题能帮助什么', paragraphs: ['California DMV 官方提供多套 Class C 中文样题，可以让考生了解题目表达方式和常见知识点。官方样题里可以看到铁路道口、平行停车、高速并入、蓝色路缘、校车、Basic Speed Law 等内容。','学习时不要只记某一套答案，因为 DMV 会更新样题，正式考试也可能用不同问法考同一条规则。'] },
      { heading: '推荐复习顺序', paragraphs: ['先用中文题库建立规则框架，再做中英对照或英文练习，最后用随机题检查是否真正理解。'], bullets: ['先理解 California Driver’s Handbook 规则','再做中文题库','切换中英对照熟悉术语','最后用英文练习检查阅读能力'] },
    ],
    faq: [
      { question: '加州 DMV 有官方中文样题吗？', answer: '有。California DMV 官方 Sample Driver’s License Knowledge Tests 页面提供 Class C 中文样题。' },
      { question: '加州 knowledge test 的通过标准是多少？', answer: 'California DMV 官方 learner permit 页面说明，knowledge test 的 passing score 是 80%。' },
      { question: '中文题库可以代替官方手册吗？', answer: '不能完全代替。题库适合练习，正式规则仍应以 California Driver’s Handbook 和 DMV 最新页面为准。' },
    ],
  },
  {
    slug: 'english-practice',
    title: '2026 加州 DMV 英文练习｜英文考试与模拟题',
    description: '加州 DMV 英文练习、英文考试和英文模拟题学习页，帮助华人用户熟悉 California Class C knowledge test 常见英文表达。',
    intro: '如果你已经理解中文交规，但担心加州 DMV 英文考试里的表达，可以用英文练习加强熟悉度。California DMV 官方提供多套 English Class C sample tests。',
    keywords: ['加州 DMV 英文练习','加州 DMV 英文考试','加州 DMV 英文模拟考试','加州驾照英文考试','DMV 英文练习'],
    sections: [
      { heading: '加州英文练习常见内容', paragraphs: ['California DMV 官方英文样题覆盖 railroad crossing、parallel parking、freeway merging、school bus、Basic Speed Law、bike lane、pedestrian、high beam、curb colors 等知识。','这些内容的核心不是英语本身，而是能否把已经理解的规则对应到英文题目。'] },
      { heading: '华人怎样练英文更有效', paragraphs: ['可以先用中文确认规则，再做相同主题的英文题。看到 right of way、yield、curb、crosswalk、bike lane、railroad crossing 等词时，要能直接联想到对应驾驶动作。','如果一题做错，先判断是规则不懂还是英文没看懂，再针对性复习。'] },
      { heading: '正式考试前怎么练', paragraphs: ['建议把中英对照和纯英文交替使用，最终目标是看到常见英文题型时不需要逐字翻译。'], bullets: ['先做中英对照','记录看不懂的 DMV 词汇','再做纯英文练习','持续保持高于 80% 的练习正确率'] },
    ],
    faq: [
      { question: 'California DMV 有官方英文样题吗？', answer: '有。官方提供多套 Regular Driver Class C English sample tests。' },
      { question: '英文不好是否可以先中文学习？', answer: '可以。先理解规则，再切换英文练习通常更有效。' },
      { question: '加州 DMV 英文练习主要练什么？', answer: '主要练道路规则、标志和安全驾驶知识在英文题目里的表达方式。' },
    ],
  },
  {
    slug: 'bilingual-practice',
    title: '2026 加州 DMV 中英对照题库｜中文 English 练习',
    description: '加州 DMV 中英对照题库和中英文练习，帮助华人同时理解中文规则和 California DMV English Class C 题目表达。',
    intro: '中英对照最适合已经能理解中文规则，但又希望熟悉加州 DMV 英文题目的用户。California DMV 官方同时提供 English 和 Chinese Class C sample tests。',
    keywords: ['加州 DMV 中英对照','加州 DMV 中英文题库','加州 DMV 中英练习','加州 DMV 双语题库','加州驾照中英文练习'],
    sections: [
      { heading: '为什么加州特别适合中英对照', paragraphs: ['California DMV 官方样题本身就有 English 和 Chinese 版本，很多相同知识点可以直接对照理解。','例如 Basic Speed Law、自行车道右转、路缘颜色、铁路道口和大型卡车盲区，都很适合通过中英对照建立术语对应。'] },
      { heading: '高频词怎样对应', paragraphs: ['常见词包括 curb 路缘、crosswalk 人行横道、bike lane 自行车道、railroad crossing 铁路道口、high beam 远光灯、tailgater 跟车过近车辆、right of way 路权。','不需要单独死背词表，最好直接在题目情境里掌握。'] },
      { heading: '怎样过渡到纯英文', paragraphs: ['先看中英对照确认理解，再遮住中文尝试独立判断。等大多数题目能直接看英文做答后，再切换纯英文练习。'] },
    ],
    faq: [
      { question: '中英对照是否适合刚开始准备 DMV 的用户？', answer: '适合，但建议先把交通规则本身理解清楚，再利用双语显示强化英文表达。' },
      { question: '官方有没有中英文两种样题？', answer: '有。California DMV 的 Class C sample tests 提供 English 和 Chinese 版本。' },
      { question: '中英对照练习后还要做英文题吗？', answer: '建议做，尤其是准备英文考试的用户。' },
    ],
  },
  {
    slug: 'dmv-practice',
    title: '2026 加州 DMV 练习题｜Class C 驾照笔试题库',
    description: '加州 DMV 练习题和 Class C 驾照笔试题库学习指南，覆盖 Basic Speed Law、停车、路权、自行车道、校车和铁路道口。',
    intro: '加州 DMV 练习不应该只刷固定题目，而应该覆盖 California Driver’s Handbook 中不同类型的道路规则和安全驾驶知识。',
    keywords: ['加州 DMV 练习','加州 DMV 练习题','加州驾照练习题','加州 DMV 题库','加州 DMV 在线练习'],
    sections: [
      { heading: '加州练习题应该覆盖什么', paragraphs: ['California DMV 官方样题实际覆盖很多具体场景，例如高速公路并入速度、铁路道口限速、蓝色路缘停车资格、校车黄灯、Basic Speed Law、手机使用、交叉路口、双黄线和右转进入自行车道。','这些题目说明，加州知识考试很重视实际驾驶判断，而不是只认交通标志。'] },
      { heading: '随机练习比固定套题更重要', paragraphs: ['固定一套题做多次很容易记住答案位置。随机练习可以把同一个规则用不同题目重新组合，更能检查是否真正理解。','错题应该按主题回看，而不是只重新做一遍。'] },
      { heading: '80% 只是最低通过标准', paragraphs: ['California DMV 官方说明 permit knowledge test 的 passing score 为 80%。备考时最好让练习正确率长期稳定高于这个标准，而不是刚好压线。'] },
    ],
    faq: [
      { question: '加州 DMV 练习题主要来自哪些知识？', answer: '核心知识来自 California Driver’s Handbook 的道路规则和安全驾驶内容。' },
      { question: '随机练习和顺序练习哪个更适合考试前？', answer: '考试前更建议随机练习，用来减少对题目顺序和固定答案的依赖。' },
      { question: '做到 80% 就够了吗？', answer: '80% 是官方通过标准，但备考时建议保持更高且更稳定的正确率。' },
    ],
  },
  {
    slug: 'dmv-mock-test',
    title: '2026 加州 DMV 模拟考试｜Class C 驾照笔试模拟题',
    description: '加州 DMV 模拟考试与 Class C 驾照笔试模拟题指南，帮助华人按 California knowledge test 的题型和 80% 通过标准练习。',
    intro: '做完完整题库后，可以用模拟考试检查自己能否在随机题目下保持稳定正确率。California DMV 官方明确建议考前使用 sample knowledge tests 帮助准备。',
    keywords: ['加州 DMV 模拟考试','加州 DMV 模拟题','加州驾照笔试模拟题','加州 DMV 中文模拟考试','加州 DMV 英文模拟考试'],
    sections: [
      { heading: '模拟考试应该模拟什么', paragraphs: ['重点不是复制官方某一套题，而是模拟多选题阅读、规则判断和随机出题。California DMV 官方说明 knowledge test 题目基于 Driver’s Handbook，并采用多选形式。','练习结果应该重点看总体正确率和薄弱主题。'] },
      { heading: '为什么要多轮随机模拟', paragraphs: ['California DMV 会定期更新 sample tests。只背固定套题无法覆盖规则变化和不同问法。','建议连续多轮随机考试都稳定高于 80%，再把剩余错题集中复习。'] },
      { heading: '中文和英文模拟如何搭配', paragraphs: ['华人用户可以先中文模拟确认规则，再用中英对照，最后做英文模拟。这样可以把知识掌握和语言适应分开处理。'] },
    ],
    faq: [
      { question: 'California DMV 官方有 sample tests 吗？', answer: '有，而且 Regular Driver Class C 提供多套样题和多种语言版本。' },
      { question: '加州知识考试通过标准是多少？', answer: 'California DMV 官方 instruction permit 页面说明通过标准为 80%。' },
      { question: '模拟考试通过一次就够吗？', answer: '建议连续多轮随机题都能稳定高于通过标准。' },
    ],
  },
  {
    slug: 'written-test',
    title: '2026 加州驾照笔试｜DMV Class C Written Test 练习',
    description: '加州驾照笔试与 DMV Class C written test 学习指南，覆盖中文练习、英文练习、California Driver’s Handbook 和知识考试重点。',
    intro: '“加州驾照笔试”是华人常见搜索说法，对应 California DMV 的 Class C knowledge test。官方 sample tests 页面也沿用 Sample Class C Written Test 的名称。',
    keywords: ['加州驾照笔试','加州驾照笔试题','加州 DMV 笔试','加州驾照中文笔试','加州驾照英文笔试'],
    sections: [
      { heading: '加州驾照笔试考什么', paragraphs: ['考试核心是你是否理解 California Driver’s Handbook 中的交通法规和安全驾驶知识。官方样题涉及 Basic Speed Law、停车、校车、铁路道口、车灯、行人、自行车道和高速公路等。','每道题的重点都是判断在具体驾驶情境下应该怎么做。'] },
      { heading: 'Written Test 和 Knowledge Test 有什么区别', paragraphs: ['华人常说“笔试”，California DMV 现在更多使用 knowledge test 这个名称；官方样题标题仍可看到 Sample Class C Written Test。实际备考时可以把这两个搜索词理解为同一类 Class C 知识考试准备。'] },
      { heading: '如何准备更稳', paragraphs: ['先看 Driver’s Handbook，再通过中文、英文或中英对照练习检测。遇到有争议的规则，应该回到 California DMV 官方手册确认。'] },
    ],
    faq: [
      { question: '加州驾照笔试就是 knowledge test 吗？', answer: '日常搜索中通常指同一类 Class C 驾驶知识考试。' },
      { question: '官方样题叫什么？', answer: 'California DMV 官方使用 Sample Class C Written Test 和 Sample Driver’s License Knowledge Tests 等名称。' },
      { question: '笔试可以只刷题不看手册吗？', answer: '不建议。题库适合检测，规则来源应以官方 Driver’s Handbook 为准。' },
    ],
  },
  {
    slug: 'permit-test',
    title: '2026 加州 Permit Test｜Instruction Permit 知识考试练习',
    description: '加州 Permit Test 和 Instruction Permit 知识考试指南，覆盖 15½ 岁未成年人要求、18 岁以上申请、80% 通过标准和练习方法。',
    intro: '准备 California instruction permit 的用户通常会搜索“加州 Permit Test”“DMV Permit 考试”或“加州驾照笔试”。不同年龄申请要求不同，但知识考试都应围绕 Driver’s Handbook 准备。',
    keywords: ['加州 Permit Test','加州 DMV Permit 考试','California instruction permit','加州 Permit 中文练习','加州 Permit 英文练习'],
    sections: [
      { heading: '未满 18 岁申请 Permit', paragraphs: ['California DMV 官方说明，未满 18 岁申请 provisional instruction permit 通常至少需要 15½ 岁，并需要完成或参加 Driver Education，还要由父母或监护人签署申请。','到 DMV 办理时还涉及身份证明、费用、视力检查、拍照和 knowledge test。'] },
      { heading: '18 岁以上申请 Permit', paragraphs: ['18 岁以上申请 instruction permit 不需要未成年人那套 Driver Education 条件，但仍需要申请、身份和居住证明、费用、视力检查、拍照和 knowledge test。','官方说明 knowledge test 是基于 California Driver’s Handbook 的多选题，passing score 为 80%。'] },
      { heading: 'Permit Test 如何准备', paragraphs: ['先阅读官方 Driver’s Handbook，再使用题库练习。中文用户可以先中文理解，之后切换 English 或中英对照。'] },
    ],
    faq: [
      { question: '加州未满 18 岁几岁可以申请 instruction permit？', answer: 'California DMV 官方说明通常至少要 15½ 岁且未满 18 岁，并满足 Driver Education 等额外要求。' },
      { question: '18 岁以上还需要 Driver Education 吗？', answer: 'California DMV 的成人 instruction permit 申请要求中没有未成年人那套 Driver Education 条件。' },
      { question: 'Permit knowledge test 通过标准是多少？', answer: '官方页面说明 passing score 为 80%。' },
    ],
  },
  {
    slug: 'test-rules',
    title: '2026 加州 DMV 考试规则｜Knowledge Test 80% 通过',
    description: '加州 DMV knowledge test 考试规则说明，介绍 80% 通过标准、多选题、Driver’s Handbook、考试准备和 renewal eLearning 区别。',
    intro: '很多华人会搜索“加州 DMV 几题及格”“加州驾照笔试通过分数”。与其固定写可能调整的题数，更稳妥的是记住 California DMV 当前官方明确公布的通过标准：80%。',
    keywords: ['加州 DMV 几题及格','加州 DMV 通过分数','加州 DMV 考试规则','加州驾照笔试及格','California knowledge test 80%'],
    sections: [
      { heading: '官方明确的通过标准', paragraphs: ['California DMV instruction permit 页面说明，knowledge test 采用基于 Driver’s Handbook 的多选题，passing score 是 80%。','题目数量和具体安排可能随申请类型或 DMV 政策变化，因此正式考试前应查看当前申请页面，而不是只依赖旧版网上文章。'] },
      { heading: 'Knowledge Test 和 Renewal eLearning 不一样', paragraphs: ['California DMV 目前对部分符合条件的驾照续期用户提供 Interactive eLearning Course。官方说明这是续期场景下的替代方式，属于 pass-only / no-fail 的互动课程。','它不能简单等同于首次申请 instruction permit 时的 knowledge test。'] },
      { heading: '考试前确认什么', paragraphs: ['确认自己是首次申请、未成年人 permit、成人 permit 还是驾照续期，然后再看对应 DMV 官方要求。'] },
    ],
    faq: [
      { question: '加州 DMV knowledge test 多少分通过？', answer: 'California DMV 官方 instruction permit 页面说明 passing score 为 80%。' },
      { question: '为什么这里不写固定题数？', answer: '因为题数和考试安排可能因申请类型或 DMV 政策调整，正式考试前应以官方当前页面为准。' },
      { question: 'eLearning 是不是所有人都可以用？', answer: '不是。California DMV 官方说明 eLearning 主要用于符合条件的 noncommercial Class C renewal 申请人。' },
    ],
  },
  {
    slug: 'road-signs',
    title: '2026 加州 DMV 交通标志题｜Road Signs 中文练习',
    description: '加州 DMV 交通标志题和 Road Signs 中文练习，覆盖标志、路缘颜色、信号灯、铁路道口、校车和道路标线。',
    intro: '加州 DMV 交通标志复习不只是认图片，还要理解路缘颜色、道路标线、信号灯和铁路道口等交通控制信息。官方 Class C 样题里这些内容经常以驾驶情境出现。',
    keywords: ['加州 DMV 交通标志','加州 DMV 标志题','California Road Signs 中文','加州交通标志考试','DMV 交通标志中文'],
    sections: [
      { heading: '加州常见交通控制知识', paragraphs: ['官方样题会考红色路缘禁止停车、蓝色路缘与残障停车资格、闪烁黄灯、双黄线、铁路道口和 school bus warning lights 等。','这些内容说明“Road Signs”应该按广义交通控制来复习，而不是只看传统三角形或八角形标志。'] },
      { heading: '路缘颜色为什么重要', paragraphs: ['California 的 curb color rules 是很有地方特色的知识点。官方样题会直接问什么颜色路缘不能停车，以及谁可以在蓝色路缘停车。','复习时要把颜色与允许的驾驶行为关联起来。'] },
      { heading: '怎样避免死记图片', paragraphs: ['题目可能把标志、颜色或信号放进实际场景。理解“看到这个控制信息后应该做什么”比单纯认图更可靠。'] },
    ],
    faq: [
      { question: 'California DMV 官方样题会考路缘颜色吗？', answer: '会。官方 Class C sample tests 中包含红色路缘和蓝色路缘相关题目。' },
      { question: '交通标志学习只需要看 signs 吗？', answer: '不够，还应复习 traffic signals、road markings、curb colors 和 railroad crossing 等。' },
      { question: 'Road Signs 可以用中文练吗？', answer: '可以先中文理解，再用中英对照熟悉英文名称。' },
    ],
  },
  {
    slug: 'driver-handbook',
    title: '2026 加州 DMV 驾驶手册｜California Driver’s Handbook 中文复习',
    description: 'California Driver’s Handbook 加州 DMV 驾驶手册中文复习指南，介绍官方中文 PDF、Class C knowledge test 和题库搭配方法。',
    intro: 'California Driver’s Handbook 是准备加州 Class C knowledge test 最重要的官方资料。California DMV 官方提供 English PDF，也提供 Chinese PDF。',
    keywords: ['加州 DMV 驾驶手册','California Driver Handbook 中文','加州驾照考试手册','加州 DMV 手册','加州驾照笔试复习资料'],
    sections: [
      { heading: '官方手册有中文版本', paragraphs: ['California DMV Driver’s Handbooks 页面明确提供 California Driver’s Handbook 的 Chinese PDF，同时也有 English、Spanish、Vietnamese 等版本。','对华人用户来说，可以先阅读中文手册理解规则，再通过英文练习熟悉正式题目里的常用表达。'] },
      { heading: '手册里哪些知识最值得重点看', paragraphs: ['结合官方 Class C sample tests，可以重点掌握速度与路况、铁路道口、停车、路缘颜色、高速并入、校车、行人、自行车道、车灯、车道线和分心驾驶。','这些都是官方样题已经实际覆盖的知识类型。'] },
      { heading: '手册和题库怎样搭配', paragraphs: ['先做一轮题库找到薄弱点，再回到官方手册查对应规则，之后继续随机练习。这样比从头到尾机械背手册更容易发现真正不会的内容。'] },
    ],
    faq: [
      { question: 'California Driver’s Handbook 有中文 PDF 吗？', answer: '有。California DMV 官方 Driver’s Handbooks 页面提供 Chinese PDF。' },
      { question: '官方手册和官方样题应该先看哪个？', answer: '建议先阅读手册建立规则基础，再用 sample tests 检查掌握情况。' },
      { question: 'OpenAA DMV 题库能代替官方手册吗？', answer: '不能完全代替，题库用于练习，规则最终应以 California DMV 官方资料为准。' },
    ],
  },
]

export function getCaliforniaSeoArticle(slug: string) {
  return californiaSeoArticles.find((article) => article.slug === slug)
}
