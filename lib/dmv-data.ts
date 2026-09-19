import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  AlertTriangle,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardList,
  FileQuestion,
  Home,
  Newspaper,
  ShieldCheck,
  ShoppingBag,
  Signpost,
  TrafficCone,
} from 'lucide-react'
import { OPENAA_DMV_URL } from './site'

export type StateStatus = 'live' | 'external' | 'coming-soon'

export type DmvState = {
  slug: string
  code: string
  nameEn: string
  nameZh: string
  shortZh: string
  status: StateStatus
  questionCount: number
  examRule: string
  passRule: string
  officialName: string
  officialUrl: string
  driverManualUrl: string
  permitUrl: string
  roadTestUrl: string
  externalUrl?: string
  popular?: boolean
  summary: string
  guide: string[]
}

export type DmvQuestion = {
  id: string
  conceptId?: string
  category: 'rules' | 'signs' | 'safety' | 'documents'
  question: string
  choices: string[]
  answerIndex: number
  explanation: string
}

export type ToolLink = {
  title: string
  description: string
  href: string
  icon: ComponentType<LucideProps>
}

export const dmvStates: DmvState[] = [
  {
    slug: 'new-york',
    code: 'NY',
    nameEn: 'New York',
    nameZh: '纽约州',
    shortZh: '纽约',
    status: 'external',
    questionCount: 150,
    examRule: '纽约 DMV Class D/DJ/E Permit 笔试共 20 题。',
    passRule: '至少答对 14 题；4 道交通标志题中至少答对 2 题。',
    officialName: 'New York DMV',
    officialUrl: 'https://dmv.ny.gov/',
    driverManualUrl: 'https://dmv.ny.gov/driver-license/drivers-manual-practice-tests',
    permitUrl: 'https://dmv.ny.gov/driver-license/get-learner-permit',
    roadTestUrl: 'https://dmv.ny.gov/driver-license/schedule-and-take-road-test',
    externalUrl: OPENAA_DMV_URL,
    popular: true,
    summary: '纽约 DMV 中文题库由 OpenAA 主站承接；dmv.openaa.com 同时提供独立 /ny 学习体验。',
    guide: ['阅读纽约官方 Driver Manual。', '完成 20 题模拟考试并重点练习交通标志。', '正式申请前核对纽约 DMV 最新证件、预约和路考要求。'],
  },
  {
    slug: 'california',
    code: 'CA',
    nameEn: 'California',
    nameZh: '加利福尼亚州',
    shortZh: '加州',
    status: 'live',
    questionCount: 263,
    examRule: 'California DMV 当前公布的知识考试通过标准为 80%。',
    passRule: '本站提供 36 题标准模拟和 46 题青少年强化模拟；实际考试题量、申请类型和考试安排请以 California DMV 当次规定为准。',
    officialName: 'California DMV',
    officialUrl: 'https://www.dmv.ca.gov/',
    driverManualUrl: 'https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/',
    permitUrl: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/instruction-permits/',
    roadTestUrl: 'https://www.dmv.ca.gov/portal/driver-licenses-identification-cards/drive-test/',
    popular: true,
    summary: '加州 DMV 中文、English 和中英对照题库，包含完整练习、模拟考试、交通标志和错题复习。',
    guide: [
      '先阅读 California Driver Handbook，重点看路权、限速、酒驾和行人规则。',
      '使用完整题库练习中文、English 和中英对照内容。',
      '正式考试前核对 California DMV 当前题量、申请类型和考试安排。',
    ],
  },
  {
    slug: 'new-jersey',
    code: 'NJ',
    nameEn: 'New Jersey',
    nameZh: '新泽西州',
    shortZh: '新泽西',
    status: 'live',
    questionCount: 188,
    examRule: 'New Jersey MVC Knowledge Test 共 50 题。',
    passRule: '至少答对 40 题通过（80%）。',
    officialName: 'New Jersey MVC',
    officialUrl: 'https://www.nj.gov/mvc/',
    driverManualUrl: 'https://www.nj.gov/mvc/about/manuals.htm',
    permitUrl: 'https://www.nj.gov/mvc/license/firstlic.htm',
    roadTestUrl: 'https://www.nj.gov/mvc/license/roadtest.htm',
    popular: true,
    summary: '新泽西 MVC 中文、English 和中英对照题库，包含 NJ 专属考点、50 题模拟考试和交通标志。',
    guide: [
      '阅读 New Jersey Driver Manual，并重点复习路权、标志、安全驾驶和酒驾规则。',
      '完成完整题库练习，再使用 50 题模拟考试检验掌握程度。',
      '正式考试前到 MVC 官方页面核对预约、证件和考试地点。',
    ],
  },
  {
    slug: 'pennsylvania',
    code: 'PA',
    nameEn: 'Pennsylvania',
    nameZh: '宾夕法尼亚州',
    shortZh: '宾州',
    status: 'live',
    questionCount: 187,
    examRule: 'PennDOT Knowledge Test 共 18 题。',
    passRule: '至少答对 15 题通过；本站模拟考试按 18 题 / 15 题及格标准练习。',
    officialName: 'PennDOT Driver and Vehicle Services',
    officialUrl: 'https://www.dmv.pa.gov/',
    driverManualUrl: 'https://www.pa.gov/agencies/dmv/resources/driver-and-vehicle-services-driver-services/pa-driver-s-manual.html',
    permitUrl: 'https://www.pa.gov/agencies/dmv/driver-services/driver-licensing.html',
    roadTestUrl: 'https://www.pa.gov/agencies/dmv/driver-services/driver-and-vehicle-services-driver-services-schedule-a-road-test.html',
    popular: true,
    summary: '宾州 PennDOT 中文、English 和中英对照题库，包含宾州专属考点、18 题模拟考试、交通标志和错题复习。',
    guide: [
      '先阅读 PennDOT Driver’s Manual，并熟悉宾州校车、School Zone、Move Over、车灯和积分制度。',
      '完成宾州专属题与公共核心题练习，再进行 18 题模拟考试。',
      '正式考试前到 PennDOT 官方页面核对最新考试、证件和申请要求。',
    ],
  },
  {
    slug: 'massachusetts',
    code: 'MA',
    nameEn: 'Massachusetts',
    nameZh: '马萨诸塞州',
    shortZh: '麻州',
    status: 'live',
    questionCount: 195,
    examRule: 'Massachusetts RMV Class D Permit Exam 共 25 题，考试时间 25 分钟。',
    passRule: '至少答对 18 题通过；官方提供简体中文、繁体中文和 English 等考试语言。',
    officialName: 'Massachusetts RMV',
    officialUrl: 'https://www.mass.gov/orgs/massachusetts-registry-of-motor-vehicles',
    driverManualUrl: 'https://www.mass.gov/lists/drivers-manuals',
    permitUrl: 'https://www.mass.gov/how-to/apply-for-a-passenger-class-d-learners-permit',
    roadTestUrl: 'https://www.mass.gov/how-to/schedule-your-road-test',
    popular: true,
    summary: '麻州 RMV 中文、English 和中英对照题库，包含 Class D、JOL、25 题模拟考试和交通标志。',
    guide: [
      '先阅读 Massachusetts RMV Class D Driver’s Manual。',
      '重点练习 JOL、Hands-Free、行人、自行车、校车和安全驾驶规则。',
      '完成 25 题模拟考试，并在正式考试前核对 RMV 最新申请要求。',
    ],
  },
  {
    slug: 'washington',
    code: 'WA',
    nameEn: 'Washington',
    nameZh: '华盛顿州',
    shortZh: '华州',
    status: 'live',
    questionCount: 190,
    examRule: 'Washington DOL Driving Knowledge Exam 共 40 题。',
    passRule: '至少答对 32 题通过；及格成绩有效 2 年，考试支持简体中文、繁体中文和 English 等语言。',
    officialName: 'Washington DOL',
    officialUrl: 'https://dol.wa.gov/',
    driverManualUrl: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/driver-guides',
    permitUrl: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/get-instruction-permit',
    roadTestUrl: 'https://dol.wa.gov/driver-licenses-and-permits/driver-training-and-testing/take-drive-test',
    summary: '华盛顿州 DOL 中文、English 和中英对照题库，包含华州专属考点、40 题模拟考试和交通标志。',
    guide: [
      '阅读 Washington Driver Guide，熟悉知识考试范围。',
      '重点练习雨天驾驶、行人、自行车、School Zone、Move Over 和青少年驾驶规则。',
      '完成 40 题模拟考试，并在正式考试前核对测试机构与最新要求。',
    ],
  },
  {
    slug: 'texas',
    code: 'TX',
    nameEn: 'Texas',
    nameZh: '德克萨斯州',
    shortZh: '德州',
    status: 'live',
    questionCount: 180,
    examRule: 'Texas DPS 当前官方明确公布：Knowledge Exam 至少达到 70% 才通过。',
    passRule: '普通非商业驾照正式 Knowledge Test 当前仅提供 English 或 Spanish；本站 30 题模式用于学习练习。',
    officialName: 'Texas DPS',
    officialUrl: 'https://www.dps.texas.gov/section/driver-license',
    driverManualUrl: 'https://www.dps.texas.gov/section/driver-license/driver-license-handbooks',
    permitUrl: 'https://www.dps.texas.gov/section/driver-license/how-apply-texas-driver-license',
    roadTestUrl: 'https://www.dps.texas.gov/section/driver-license/drive-test-requirements',
    summary: '德州 DPS 中文、English 和中英对照学习题库；正式普通非商业知识考试不提供中文，本站醒目标注语言限制。',
    guide: [
      '先阅读 Texas DPS Driver Handbook，并记住正式普通非商业 Knowledge Test 当前不提供中文。',
      '用中文理解 Texas 专属规则，再切换 English / 中英对照熟悉考试词汇。',
      '完成本站 30 题模拟练习，并在正式考试前核对 DPS 或授权机构当天要求。',
    ],
  },
  {
    slug: 'florida',
    code: 'FL',
    nameEn: 'Florida',
    nameZh: '佛罗里达州',
    shortZh: '佛州',
    status: 'live',
    questionCount: 197,
    examRule: 'Florida Class E Knowledge Exam 共 50 道选择题。',
    passRule: '本站以 80%（40/50）作为学习练习线，不标注为当前已由 FLHSMV 一手页面核实的官方及格线；模拟考试仅提供 English / 中英对照。',
    officialName: 'Florida Highway Safety and Motor Vehicles',
    officialUrl: 'https://www.flhsmv.gov/',
    driverManualUrl: 'https://www.flhsmv.gov/resources/handbooks-manuals/',
    permitUrl: 'https://www.flhsmv.gov/driver-licenses-id-cards/',
    roadTestUrl: 'https://www.flhsmv.gov/driver-licenses-id-cards/driver-license-exams/',
    summary: '佛州 Class E 中文、English 和中英对照题库，包含 Florida 专属考点、50 题模拟练习、交通标志和错题复习。',
    guide: [
      '先阅读 Florida Driver License Handbook，建立 Class E 道路规则框架。',
      '使用完整题库练习 Florida 专属规则、交通标志和安全驾驶。',
      '50 题模拟仅提供 English / 中英对照；正式考试语言和及格要求以 FLHSMV 或考试机构当前规定为准。',
    ],
  },
]

export const popularStates = dmvStates.filter((state) => state.popular)

export function getStateBySlug(slug: string) {
  return dmvStates.find((state) => state.slug === slug)
}

export function getLiveStateBySlug(slug: string) {
  const state = getStateBySlug(slug)
  return state?.status === 'live' ? state : null
}

export const dmvTools: ToolLink[] = [
  { title: '中文题库', description: '按分类查看规则、标志和安全驾驶题。', href: 'questions', icon: FileQuestion },
  { title: '随机 / 顺序练习', description: '默认随机刷题，也可切换为顺序练习。', href: 'practice', icon: BookOpenCheck },
  { title: '模拟考试', description: '随机抽题，提交后查看通过情况。', href: 'mock-test', icon: ClipboardList },
  { title: '交通标志', description: '集中练习标志、信号和道路标线。', href: 'signs', icon: Signpost },
]

export const openAALinks: ToolLink[] = [
  { title: '找工作', description: '去 OpenAA 查看华人招聘和求职信息。', href: 'https://openaa.com/jobs', icon: BriefcaseBusiness },
  { title: '找房', description: '搬家、换州和安顿生活时查看房源。', href: 'https://openaa.com/housing', icon: Home },
  { title: '二手交易', description: '考试、搬家、买车前后常用的本地交易入口。', href: 'https://openaa.com/marketplace', icon: ShoppingBag },
  { title: '生活资讯', description: '阅读美国生活、办事和新手指南。', href: 'https://openaa.com/news', icon: Newspaper },
]

export const categoryLabels: Record<DmvQuestion['category'], string> = {
  rules: '道路规则',
  signs: '交通标志',
  safety: '安全驾驶',
  documents: '证件流程',
}

export const categoryIcons: Record<DmvQuestion['category'], ComponentType<LucideProps>> = {
  rules: TrafficCone,
  signs: Signpost,
  safety: ShieldCheck,
  documents: AlertTriangle,
}

export const sharedQuestions: DmvQuestion[] = [
  {
    id: 'rules-001',
    category: 'rules',
    question: '遇到没有交通信号灯的四向停车路口，几辆车几乎同时到达时，通常应如何通行？',
    choices: ['速度最快的车先走', '右侧车辆通常先行', '左侧车辆一定先走', '大车一定先走'],
    answerIndex: 1,
    explanation: '四向停车路口通常遵循先到先行；同时到达时，让右侧车辆先行。',
  },
  {
    id: 'rules-002',
    category: 'rules',
    question: '看见行人已经进入人行横道时，驾驶人应该怎么做？',
    choices: ['鸣笛提醒后通过', '加速在行人前通过', '停车或减速让行', '只要没有警察就可以继续'],
    answerIndex: 2,
    explanation: '行人在合法人行横道内有优先权，驾驶人必须让行。',
  },
  {
    id: 'rules-003',
    category: 'rules',
    question: '黄灯亮起时，最安全的做法通常是什么？',
    choices: ['总是加速通过', '如果能安全停车，应停车等待', '立即倒车', '关闭车灯'],
    answerIndex: 1,
    explanation: '黄灯表示信号即将变红；如果可以安全停车，应停车等待。',
  },
  {
    id: 'rules-004',
    category: 'rules',
    question: '校车停下并闪红灯时，后方车辆通常应该怎么做？',
    choices: ['从左侧慢慢绕过', '停车等待，直到红灯停止且安全', '只在有儿童时停车', '鸣笛后通过'],
    answerIndex: 1,
    explanation: '校车闪红灯通常表示学生上下车，车辆必须按当地规则停车等待。',
  },
  {
    id: 'rules-005',
    category: 'rules',
    question: '变更车道前，驾驶人应该先做什么？',
    choices: ['只看前方', '打转向灯、检查后视镜和盲区', '直接转向', '踩刹车停在车道中间'],
    answerIndex: 1,
    explanation: '安全变道需要提前示意，并确认旁边车道和盲区没有危险。',
  },
  {
    id: 'rules-006',
    category: 'rules',
    question: '在高速公路汇入车流时，应该怎样处理速度？',
    choices: ['尽量停在加速车道末端', '与主路车流速度接近后安全汇入', '低速直接并入', '倒车寻找空位'],
    answerIndex: 1,
    explanation: '汇入高速时应在加速车道调整到接近车流速度，再寻找安全空隙。',
  },
  {
    id: 'rules-007',
    category: 'rules',
    question: '听到紧急车辆警笛并看到警灯时，驾驶人通常应该怎么做？',
    choices: ['加速跟在后面', '在安全情况下靠边让行', '停在路口中央', '继续原速度行驶'],
    answerIndex: 1,
    explanation: '紧急车辆需要优先通行，驾驶人应安全靠边并让出道路。',
  },
  {
    id: 'rules-008',
    category: 'rules',
    question: '双黄实线通常表示什么？',
    choices: ['可以随时掉头', '双向交通，通常禁止跨线超车', '单行道', '自行车专用线'],
    answerIndex: 1,
    explanation: '双黄实线分隔相反方向车流，通常不得跨线超车。',
  },
  {
    id: 'rules-009',
    category: 'rules',
    question: '接近环岛时，车辆通常应让谁先行？',
    choices: ['已经在环岛内的车辆', '准备进入环岛的车辆', '后方车辆', '鸣笛车辆'],
    answerIndex: 0,
    explanation: '进入环岛前通常应让已经在环岛内行驶的车辆先行。',
  },
  {
    id: 'safety-001',
    category: 'safety',
    question: '与前车保持安全距离的主要目的是什么？',
    choices: ['方便超车', '有足够时间反应和刹车', '让后车更快通过', '减少使用转向灯'],
    answerIndex: 1,
    explanation: '安全跟车距离能给驾驶人留出观察、反应和制动空间。',
  },
  {
    id: 'safety-002',
    category: 'safety',
    question: '雨天或路面湿滑时，驾驶人应该如何调整？',
    choices: ['提高速度避免打滑', '减速并增加跟车距离', '关闭车灯', '紧贴前车行驶'],
    answerIndex: 1,
    explanation: '湿滑路面制动距离更长，应该减速并保持更大距离。',
  },
  {
    id: 'safety-003',
    category: 'safety',
    question: '酒精会对驾驶产生什么影响？',
    choices: ['提高反应速度', '降低判断力和反应能力', '让夜间视力更好', '只影响新手司机'],
    answerIndex: 1,
    explanation: '酒精会削弱判断、协调和反应能力，增加事故风险。',
  },
  {
    id: 'safety-004',
    category: 'safety',
    question: '开车时收到手机消息，最安全的做法是什么？',
    choices: ['边开边回复', '只看一眼', '安全停车后再处理', '让车辆自动保持方向'],
    answerIndex: 2,
    explanation: '分心驾驶风险很高，手机消息应在安全停车后处理。',
  },
  {
    id: 'safety-005',
    category: 'safety',
    question: '夜间会车时，对向车灯很亮，应该看哪里？',
    choices: ['直视对方车灯', '看道路右侧边缘或车道线', '闭眼一秒', '打开远光灯反照'],
    answerIndex: 1,
    explanation: '避免直视强光，参考道路右侧边缘能帮助保持方向。',
  },
  {
    id: 'safety-006',
    category: 'safety',
    question: '儿童乘车最重要的安全原则是什么？',
    choices: ['可以坐前排抱着', '按年龄、身高和体重使用合适安全座椅', '只要系成人安全带即可', '短途不需要约束'],
    answerIndex: 1,
    explanation: '儿童应按当地法律和安全标准使用合适的儿童座椅或增高垫。',
  },
  {
    id: 'safety-007',
    category: 'safety',
    question: '车辆打滑时，驾驶人最应该避免什么？',
    choices: ['保持冷静', '突然猛踩刹车或猛打方向', '看向希望车辆前进的方向', '缓慢修正方向'],
    answerIndex: 1,
    explanation: '突然操作会加重失控，应平稳修正方向并避免急刹。',
  },
  {
    id: 'signs-001',
    category: 'signs',
    question: '八角形红色标志表示什么？',
    choices: ['让路', '停止', '限速', '施工区'],
    answerIndex: 1,
    explanation: '八角形红色标志是 Stop，表示必须完全停车并确认安全。',
  },
  {
    id: 'signs-002',
    category: 'signs',
    question: '倒三角形红白标志通常表示什么？',
    choices: ['停车', '让路', '禁止停车', '铁路道口'],
    answerIndex: 1,
    explanation: '倒三角形红白标志是 Yield，表示让有优先权的车辆或行人先行。',
  },
  {
    id: 'signs-003',
    category: 'signs',
    question: '黄色菱形标志通常代表什么类型的信息？',
    choices: ['警告前方道路状况', '服务区', '停车收费', '车辆注册'],
    answerIndex: 0,
    explanation: '黄色菱形标志多为警告标志，提醒弯道、交叉路口、行人等情况。',
  },
  {
    id: 'signs-004',
    category: 'signs',
    question: '白底黑字的矩形标志通常表示什么？',
    choices: ['法规或限制', '旅游景点', '医院入口', '天气预报'],
    answerIndex: 0,
    explanation: '白底黑字标志多为法规标志，例如限速、车道使用或禁止行为。',
  },
  {
    id: 'signs-005',
    category: 'signs',
    question: '橙色标志最常见于什么区域？',
    choices: ['学校区域', '施工或维护区域', '休息区', '住宅区'],
    answerIndex: 1,
    explanation: '橙色通常用于道路施工、维护和临时交通控制。',
  },
  {
    id: 'signs-006',
    category: 'signs',
    question: '铁路交叉的圆形或交叉形标志提醒驾驶人什么？',
    choices: ['前方可能有火车通行', '前方是机场', '前方只能左转', '前方禁止行人'],
    answerIndex: 0,
    explanation: '铁路道口标志提醒驾驶人减速观察，必要时停车等待火车通过。',
  },
  {
    id: 'signs-007',
    category: 'signs',
    question: '绿色路牌通常提供什么信息？',
    choices: ['方向、出口或距离', '禁止停车', '施工绕行', '车辆故障'],
    answerIndex: 0,
    explanation: '绿色标志通常用于方向、里程、出口和目的地信息。',
  },
  {
    id: 'signs-008',
    category: 'signs',
    question: '蓝色标志通常表示什么？',
    choices: ['驾驶人服务或设施信息', '危险警告', '停止', '道路封闭'],
    answerIndex: 0,
    explanation: '蓝色标志常用于医院、休息区、加油、餐饮等服务信息。',
  },
  {
    id: 'documents-001',
    category: 'documents',
    question: '参加驾照考试或申请 permit 前，最应该在哪里核对材料要求？',
    choices: ['社交媒体评论', '州 DMV/MVC/RMV/DOL 官方网站', '非官方广告页', '二手交易网站'],
    answerIndex: 1,
    explanation: '证件、费用和预约规则可能变化，最终应以州官方 DMV 类网站为准。',
  },
  {
    id: 'documents-002',
    category: 'documents',
    question: '搬家后，驾驶人通常需要注意什么？',
    choices: ['永远不用更新地址', '按州规定更新 DMV 地址信息', '只告诉朋友即可', '删除旧驾照'],
    answerIndex: 1,
    explanation: '多数州要求居民在规定时间内更新驾照或车辆登记地址。',
  },
  {
    id: 'documents-003',
    category: 'documents',
    question: '如果中文练习题与官方手册内容不一致，应该以哪个为准？',
    choices: ['中文练习题', '官方 DMV 手册和官方页面', '朋友经验', '搜索结果摘要'],
    answerIndex: 1,
    explanation: 'OpenAA DMV 是学习辅助，正式规则和考试要求应以官方资料为准。',
  },
  {
    id: 'documents-004',
    category: 'documents',
    question: '路考前检查车辆，以下哪项通常最重要？',
    choices: ['车内香水味道', '刹车、灯光、保险和登记状态', '音响音量', '座椅颜色'],
    answerIndex: 1,
    explanation: '路考车辆必须安全、合法并符合当地 DMV 对保险、登记和设备的要求。',
  },
]

export function getQuestionsForState(stateSlug: string) {
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return []
  return sharedQuestions
}

export function getQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) {
  return getQuestionsForState(stateSlug).filter((question) => question.category === category)
}

export function shuffleQuestions(questions: DmvQuestion[], seed = Date.now()) {
  let value = Math.abs(Math.trunc(seed)) % 233280 || 1
  const random = () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
  const result = [...questions]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
