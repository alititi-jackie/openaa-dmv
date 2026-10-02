export type NySeoArticle = {
  slug: string
  title: string
  description: string
  intro: string
  keywords: string[]
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]
  faq: { question: string; answer: string }[]
}

export const nySeoArticles: NySeoArticle[] = [
  {
    slug: 'dmv-chinese-test',
    title: '2026 纽约 DMV 中文题库｜驾照笔试中文考试练习',
    description: '纽约 DMV 中文题库与驾照笔试练习指南，覆盖中文考试、模拟题、Permit Test、交通标志和正式考试 20 题 / 14 题通过规则。',
    intro: '准备纽约驾照笔试的华人用户，可以先从中文理解规则，再结合英文或中英对照练习熟悉正式考试常见表达。OpenAA DMV 提供纽约独立题库，适合反复练习。',
    keywords: ['纽约 DMV 中文题库','纽约 DMV 中文考试','纽约 DMV 中文练习','纽约驾照笔试','纽约 DMV 考试题'],
    sections: [
      { heading: '纽约 DMV 中文考试要掌握什么', paragraphs: ['New York State DMV 的 Class D/DJ/E learner permit 知识考试重点包括道路规则、安全驾驶、交通标志，以及酒精和药物相关驾驶法规。官方 Driver’s Manual 说明，书面考试共 20 题，至少答对 14 题，同时 4 道交通标志题中至少答对 2 题。','中文题库最适合先帮助理解规则，但不建议只记答案。把路权、停车、限速、标志、酒驾和安全驾驶逻辑理解清楚，遇到不同问法时也更容易判断。'] },
      { heading: '为什么要同时熟悉英文表达', paragraphs: ['不少华人会先搜“纽约 DMV 中文题库”，之后又继续找“DMV 英文考试”“英文练习”或“中英对照”。这是因为理解规则和熟悉英文题目表达是两件事。','建议先用中文建立知识框架，再切换 English 或中英对照模式。这样既能降低学习门槛，也能帮助熟悉 stop sign、right of way、speed limit、parking、school bus 等常见词。'] },
      { heading: '复习顺序建议', paragraphs: ['先做完整题库了解自己的薄弱点，再重点复习交通标志、路权、停车和酒驾等高频知识，最后用 20 题模式模拟正式考试节奏。'], bullets: ['先看中文解释，理解规则','再做英文或中英对照练习','错题重复复习','模拟考试稳定达到通过线后再参加正式考试'] },
    ],
    faq: [
      { question: '纽约 DMV 笔试有多少题？', answer: 'Class D/DJ/E learner permit 知识考试共 20 题，至少答对 14 题；4 道交通标志题中至少答对 2 题。' },
      { question: '中文题库可以只背答案吗？', answer: '不建议。正式考试题目表达可能不同，理解路权、标志和安全驾驶规则比只背答案更稳。' },
      { question: 'OpenAA DMV 纽约题库是不是和其他州混在一起？', answer: '不是。纽约使用独立题库，不混入其他州公共题库。' },
    ],
  },
  {
    slug: 'english-practice',
    title: '2026 纽约 DMV 英文练习｜英文考试与模拟题',
    description: '纽约 DMV 英文练习、英文考试和英文模拟考试学习页，帮助华人用户熟悉 New York DMV written test 常见英文表达。',
    intro: '如果你已经理解中文交规，但担心正式考试里的英文表达，可以直接用纽约 DMV 英文练习加强熟悉度。这里重点面向会搜索“DMV 英文考试、英文模拟考试、英文练习”的华人用户。',
    keywords: ['纽约 DMV 英文练习','纽约 DMV 英文考试','纽约 DMV 英文模拟考试','纽约驾照英文考试','DMV 英文练习'],
    sections: [
      { heading: '英文练习主要练什么', paragraphs: ['英文练习不是重新学一遍交规，而是把已经理解的规则换成英文题目表达。常见词包括 right of way、yield、pedestrian、railroad crossing、school bus、speed limit、parking、BAC、lane markings 等。','纽约知识考试考查的核心仍然是道路规则、安全驾驶、交通标志和酒精药物相关法规。语言改变，但知识点本身不会因为换成英文而改变。'] },
      { heading: '华人为什么适合中英文交替练习', paragraphs: ['很多用户中文理解没有问题，但看到英文长句会反应慢。最有效的方法通常不是死背英文，而是中文理解后马上做对应英文题。','如果某一道英文题看不懂，可以先确认规则，再回头看英文关键词。这样做几轮以后，常见句型会越来越熟。'] },
      { heading: '正式考试前怎样练', paragraphs: ['建议把英文练习和 20 题模拟考试结合。目标不是只做一次达到 14 题，而是连续多轮都能稳定通过。'], bullets: ['先做中英对照熟悉词汇','再切换纯英文练习','重点记录看不懂的关键词','用 20 题模式检查稳定性'] },
    ],
    faq: [
      { question: '纽约 DMV 英文练习适合什么人？', answer: '适合已经理解交规，但想熟悉英文题目表达、英文关键词和正式考试阅读节奏的用户。' },
      { question: '英文练习和中文题库内容一样吗？', answer: '核心知识点来自同一套纽约州驾驶规则，语言显示方式不同。' },
      { question: '只做英文题就够了吗？', answer: '如果某些规则本身还不理解，建议先用中文或中英对照理解，再回到英文练习。' },
    ],
  },
  {
    slug: 'bilingual-practice',
    title: '2026 纽约 DMV 中英对照题库｜中文 English 练习',
    description: '纽约 DMV 中英对照题库和中英文练习，适合华人准备 Permit Test、驾照笔试和英文考试时同时理解中文与 English 表达。',
    intro: '中英对照练习适合既想看懂中文规则，又想熟悉英文考试表达的用户。相比只做中文或只做英文，中英对照可以更快建立关键词对应关系。',
    keywords: ['纽约 DMV 中英对照','纽约 DMV 中英文题库','纽约 DMV 中英练习','DMV 中英对照练习','纽约驾照中英文练习'],
    sections: [
      { heading: '中英对照练习有什么用', paragraphs: ['同一道知识点同时看到中文和 English，可以快速建立词义对应。例如“让行”对应 yield，“路权”常见 right of way，“铁路道口”对应 railroad crossing。','对刚到美国、英文阅读速度较慢的华人来说，这种方式比单独背词表更实用，因为词汇直接出现在驾驶场景和题目里。'] },
      { heading: '哪些知识最值得用中英对照复习', paragraphs: ['交通标志、路权、停车、车道线、校车、酒驾和安全距离，都很适合中英对照学习。它们既有固定术语，也容易在题目里换不同问法。'] },
      { heading: '从中英对照过渡到英文考试', paragraphs: ['当你已经能不看中文就理解大多数英文题目时，就可以逐步切换纯英文练习。这样既保留中文理解优势，也能降低正式考试时看到英文题目的压力。'] },
    ],
    faq: [
      { question: '中英对照和中文题库有什么区别？', answer: '中文题库侧重理解规则，中英对照会同时展示中文和英文内容，更适合熟悉英文关键词。' },
      { question: '中英对照适合零基础英语吗？', answer: '适合用来建立常见 DMV 驾驶词汇，但仍建议先把交通规则本身理解清楚。' },
      { question: '学完中英对照后还要做模拟考试吗？', answer: '建议做。模拟考试能检查你在 20 题节奏下是否能稳定达到通过要求。' },
    ],
  },
  {
    slug: 'dmv-practice',
    title: '2026 纽约 DMV 练习题｜免费驾照笔试题库',
    description: '纽约 DMV 练习题和驾照笔试题库学习指南，覆盖道路规则、交通标志、安全驾驶、停车、路权和酒驾知识。',
    intro: '纽约 DMV 练习的重点不是做题数量，而是把常考规则练到稳定。OpenAA DMV 的纽约题库独立维护，可以用中文、English 或中英对照方式反复练习。',
    keywords: ['纽约 DMV 练习','纽约 DMV 练习题','纽约驾照练习题','纽约 DMV 题库','纽约 DMV 在线练习'],
    sections: [
      { heading: '纽约 DMV 练习应该覆盖哪些内容', paragraphs: ['根据 New York State Driver’s Manual，Class D/DJ/E learner permit 知识考试主要涉及道路规则、安全驾驶、交通标志以及酒精和药物对驾驶的影响。','因此练习时不要只集中在标志题，也要覆盖路权、车道、停车、高速公路、行人和自行车、校车、铁路道口、恶劣天气和酒驾等内容。'] },
      { heading: '随机练习和顺序练习怎样搭配', paragraphs: ['第一次学习时可以顺序练习，方便系统看完题库；熟悉以后再做随机练习，避免只靠记住题目顺序判断答案。','如果某类题错误较多，应该回到对应知识点继续练，而不是只追求总正确率。'] },
      { heading: '练到什么程度再去考试', paragraphs: ['正式笔试要求 20 题至少答对 14 题，同时标志题还有单独要求。备考时最好不要只把 14 题当目标线，而应在多轮练习中保持明显高于通过线的正确率。'] },
    ],
    faq: [
      { question: '纽约 DMV 练习题越多越好吗？', answer: '题量有帮助，但更重要的是覆盖不同知识点并理解错误原因。' },
      { question: '随机练习和顺序练习哪个更好？', answer: '初学可先顺序练习，熟悉后建议随机练习，能更真实地检查掌握程度。' },
      { question: '练习题可以代替官方手册吗？', answer: '不能完全代替。练习适合复习和检测，正式规则应以 New York State DMV 最新 Driver’s Manual 为准。' },
    ],
  },
  {
    slug: 'dmv-mock-test',
    title: '2026 纽约 DMV 模拟考试｜驾照笔试模拟题',
    description: '纽约 DMV 模拟考试和驾照笔试模拟题指南，按 20 题考试节奏练习，了解 14 题通过与交通标志题要求。',
    intro: '如果你已经做过完整题库，下一步就应该用模拟考试检查自己能不能在接近正式考试的题量下稳定通过。纽约 learner permit 知识考试共 20 题。',
    keywords: ['纽约 DMV 模拟考试','纽约 DMV 模拟题','纽约驾照笔试模拟题','纽约 DMV 中文模拟考试','纽约 DMV 英文模拟考试'],
    sections: [
      { heading: '纽约模拟考试应该怎样设置', paragraphs: ['官方 Driver’s Manual 说明，Class D/DJ/E learner permit 书面考试共 20 题，至少答对 14 题，并且 4 道交通标志题至少答对 2 题。','因此真正有用的模拟考试，不应该只看总分，也要确保交通标志知识达到要求。'] },
      { heading: '为什么不能只做一套模拟题', paragraphs: ['如果题目重复太多，用户可能记住答案而不是规则。建议多轮随机组题，并把每次错误的知识点记录下来。','当不同组合的题目都能稳定通过，说明掌握程度比只做固定一套题可靠。'] },
      { heading: '中文、英文模拟考试怎样选择', paragraphs: ['中文模拟考试适合理解和检查规则，英文模拟考试适合熟悉英文阅读。华人用户可以先中文稳定通过，再做中英对照，最后用英文题检查自己是否适应。'] },
    ],
    faq: [
      { question: '纽约 DMV 模拟考试应该做多少题？', answer: '按正式 Class D/DJ/E learner permit 知识考试节奏，20 题最有参考价值。' },
      { question: '答对 14 题就一定通过吗？', answer: '除了总题至少答对 14 题，还需要在 4 道交通标志题中至少答对 2 题。' },
      { question: '模拟考试通过一次就可以去正式考试吗？', answer: '建议连续多轮都能稳定通过，并复习错题后再参加正式考试。' },
    ],
  },
  {
    slug: 'written-test',
    title: '2026 纽约驾照笔试｜DMV Written Test 中文练习',
    description: '纽约驾照笔试学习指南，覆盖 DMV written test、中文练习、英文练习、考试题数、通过要求与重点知识。',
    intro: '“纽约驾照笔试”是华人最常用的搜索说法之一。它对应 New York State DMV learner permit knowledge/written test，核心是理解道路规则和交通标志。',
    keywords: ['纽约驾照笔试','纽约驾照笔试题','纽约 DMV 笔试','纽约驾照中文笔试','纽约驾照英文笔试'],
    sections: [
      { heading: '纽约驾照笔试考什么', paragraphs: ['官方 Driver’s Manual 说明，考试内容包括道路规则、安全驾驶技巧、交通标志，以及酒精和药物相关法律。第 4 至 11 章和 Road Signs 是准备 Class D/DJ/E written test 时的重要学习范围。','考试不是单纯识别标志，还会通过实际驾驶情境考查路权、转弯、停车、超车、行人、铁路道口和安全驾驶判断。'] },
      { heading: '20 题和 14 题通过是什么意思', paragraphs: ['正式考试共 20 题，至少答对 14 题；其中包含 4 道交通标志题，至少答对 2 道。复习时应同时满足总分和标志题要求。'] },
      { heading: '怎样准备最有效', paragraphs: ['先看题库找出薄弱知识，再回到对应手册内容理解规则，之后用随机练习和模拟考试检查。中文、英文和中英对照可以按自己的语言情况切换。'] },
    ],
    faq: [
      { question: '纽约驾照笔试和 Permit Test 是一回事吗？', answer: '日常搜索中通常都指申请 learner permit 时需要通过的知识考试。' },
      { question: '纽约驾照笔试只考交通标志吗？', answer: '不是。还包括道路规则、安全驾驶、酒精药物法规等内容。' },
      { question: '英文不好可以先用中文学习吗？', answer: '可以先用中文理解规则，再通过中英对照或英文练习熟悉常见考试表达。' },
    ],
  },
  {
    slug: 'permit-test',
    title: '2026 纽约 Permit Test｜DMV 学习许可考试练习',
    description: '纽约 Permit Test 学习页，帮助准备 New York learner permit DMV 知识考试，覆盖 20 题、14 题通过、标志题和练习建议。',
    intro: '在纽约申请 learner permit 时，知识考试是关键步骤。华人用户常搜索“纽约 Permit Test”“DMV Permit 考试”或“纽约驾照笔试”，这些本质上都围绕同一类基础驾驶知识准备。',
    keywords: ['纽约 Permit Test','纽约 DMV Permit 考试','纽约 learner permit 考试','纽约 Permit 中文练习','纽约 Permit 英文练习'],
    sections: [
      { heading: 'Permit Test 的核心规则', paragraphs: ['New York State DMV Driver’s Manual 说明，Class D/DJ/E written test 共 20 道题，至少答对 14 题，并且 4 道 road signs 题至少答对 2 道。','申请 learner permit 还涉及年龄、身份材料、视力测试和费用等要求，具体办事流程应在正式申请前查看 NY DMV 最新页面。'] },
      { heading: 'Permit Test 应该先学什么', paragraphs: ['建议优先掌握交通标志、路权、转弯、停车、限速、校车、安全距离、行人自行车和酒驾法规。','官方在线 Driver’s Manual 的第 4 至 11 章包含知识考试需要学习的重要内容，并配有章节练习。'] },
      { heading: '中文和英文怎样结合', paragraphs: ['第一次接触 Permit Test 的用户，可以先用中文把规则理解清楚，再用中英对照或英文练习熟悉考试词汇。这样比一开始直接硬做英文题更容易发现自己到底是不懂规则还是不懂语言。'] },
    ],
    faq: [
      { question: '纽约申请 learner permit 至少几岁？', answer: 'NY DMV 的申请资料说明，申请 learner permit 或 driver license 通常至少需要 16 岁；未成年人还有额外要求，正式申请前应查看官方最新规定。' },
      { question: 'Permit Test 通过线是多少？', answer: '20 题至少答对 14 题，并且 4 道交通标志题至少答对 2 题。' },
      { question: 'Permit Test 可以先在线练习吗？', answer: '可以。NY DMV 官方 Driver’s Manual 提供章节练习，OpenAA DMV 也提供纽约独立题库用于复习。' },
    ],
  },
  {
    slug: 'test-rules',
    title: '2026 纽约 DMV 考试规则｜20题答对14题通过',
    description: '纽约 DMV 驾照笔试考试规则说明：20 题、至少答对 14 题，4 道交通标志题至少答对 2 题，并介绍考试重点。',
    intro: '很多人搜索“纽约 DMV 多少题”“纽约驾照笔试几题及格”。纽约 Class D/DJ/E learner permit 知识考试最重要的数字就是 20、14、4 和 2。',
    keywords: ['纽约 DMV 多少题','纽约 DMV 几题及格','纽约驾照笔试多少题','纽约 DMV 考试规则','纽约 DMV 通过分数'],
    sections: [
      { heading: '20、14、4、2 分别代表什么', paragraphs: ['正式 written test 共 20 题；总题至少答对 14 题；其中有 4 道交通标志题；标志题至少答对 2 道。','因此不是只要总分达到 14 就完全不管标志题。复习时应该把交通标志当成单独重点。'] },
      { heading: '考试内容范围', paragraphs: ['NY DMV Driver’s Manual 说明，知识考试考查道路规则、安全驾驶技巧、交通标志，以及酒精和药物相关驾驶法律。在线手册第 4 至 11 章和 Road Signs 是重要学习范围。'] },
      { heading: '怎样按规则做模拟练习', paragraphs: ['模拟考试最好使用 20 题结构，并同时检查总正确题数和交通标志题表现。连续多轮达到要求，比只做一次通过更有参考意义。'] },
    ],
    faq: [
      { question: '纽约 DMV 笔试多少题？', answer: '20 题。' },
      { question: '纽约 DMV 笔试答对几题通过？', answer: '至少答对 14 题，并满足交通标志题要求。' },
      { question: '交通标志题有什么单独要求？', answer: '4 道交通标志题中至少答对 2 道。' },
    ],
  },
  {
    slug: 'road-signs',
    title: '2026 纽约 DMV 交通标志题｜Road Signs 中文练习',
    description: '纽约 DMV 交通标志题和 Road Signs 中文练习，了解标志题考试要求、常见类别和复习方法。',
    intro: '交通标志是纽约 Permit 知识考试里不能忽视的一部分，因为正式考试不仅有总分要求，road signs 题还有单独通过要求。',
    keywords: ['纽约 DMV 交通标志','纽约 DMV 标志题','纽约 Road Signs 练习','纽约交通标志考试','DMV 交通标志中文'],
    sections: [
      { heading: '为什么交通标志必须单独复习', paragraphs: ['官方规则要求 20 题至少答对 14 题，同时 4 道交通标志题至少答对 2 道。这意味着即使其他题做得不错，标志题也不能完全放弃。','练标志时不要只认图片，还要理解颜色、形状和驾驶动作之间的关系。'] },
      { heading: '常见标志学习方式', paragraphs: ['可以按 regulatory、warning、guide、railroad、school 等类别复习，再结合真实情境题判断应该停车、减速、让行还是改变车道。','同时要熟悉 STOP、YIELD、Do Not Enter、No U-Turn、speed limit、school crossing 等常见英文表达。'] },
      { heading: '怎样避免只靠背图', paragraphs: ['同一个规则可能用图片题、文字题或情境题出现。最稳的方法是理解标志告诉驾驶员“现在必须做什么”，而不是只记颜色或答案位置。'] },
    ],
    faq: [
      { question: '纽约 DMV 有几道交通标志题？', answer: '正式 20 题考试中有 4 道交通标志题。' },
      { question: '交通标志题至少答对几道？', answer: '至少答对 2 道。' },
      { question: '只认图标够不够？', answer: '不够。还应理解标志对应的驾驶动作和道路规则。' },
    ],
  },
  {
    slug: 'driver-handbook',
    title: '2026 纽约 DMV 驾驶手册｜Driver’s Manual 复习重点',
    description: '纽约 DMV Driver’s Manual 驾驶手册复习指南，介绍 Class D/DJ/E learner permit 笔试重点章节、练习方法和考试规则。',
    intro: '题库适合练习，但真正的规则来源仍然是 New York State DMV Driver’s Manual。把手册和练习题结合起来，能减少只记答案造成的误判。',
    keywords: ['纽约 DMV 驾驶手册','纽约 Driver Manual 中文','纽约驾照考试手册','纽约 DMV 手册','纽约驾照笔试复习资料'],
    sections: [
      { heading: '哪些章节与笔试关系最直接', paragraphs: ['NY DMV 官方在线手册说明，第 4 至 11 章包含 Class D/DJ/E learner permit written test 需要掌握的重要材料，并配有 practice quizzes。','这些章节覆盖交通控制、交叉路口和转弯、超车、停车、守法驾驶、防卫性驾驶以及酒精和其他药物等内容。'] },
      { heading: '手册和题库怎样搭配', paragraphs: ['不建议从第一页开始死背整本手册。可以先做一轮练习，找出错误最多的主题，再回到手册对应章节阅读。','例如路权错误多，就重点看 intersections and turns；酒驾题不稳定，就重点复习 alcohol and other drugs。这样效率通常更高。'] },
      { heading: '为什么正式考试前还要看官方资料', paragraphs: ['交通法规、办事要求和考试安排都有可能更新。第三方练习站适合学习，但申请材料、费用、考试语言和官方流程应以 NY DMV 最新页面和手册为准。'] },
    ],
    faq: [
      { question: '纽约驾照笔试要看完整本 Driver’s Manual 吗？', answer: '官方在线手册特别指出，第 4 至 11 章和 Road Signs 与 Class D/DJ/E written test 关系最直接。' },
      { question: '做题能不能完全代替看手册？', answer: '不建议。做题适合检测，遇到不理解的知识点应回到官方手册确认规则。' },
      { question: '官方手册有练习题吗？', answer: '有。NY DMV 在线 Driver’s Manual 在相关章节提供 practice quizzes。' },
    ],
  },
]

export function getNySeoArticle(slug: string) {
  return nySeoArticles.find((article) => article.slug === slug)
}
