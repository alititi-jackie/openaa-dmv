import { californiaQuestions } from './california-questions'
import { californiaExpandedQuestions } from './california-questions-expanded'
import { getLiveStateBySlug, type DmvQuestion } from './dmv-data'
import { sharedCoreBank } from './shared-core-bank'

const overrides: Record<string, Partial<DmvQuestion>> = {
  'ca2-rules-001': { question: '接近没有信号灯的人行横道时，看到行人已经准备进入横道，最合适的做法是什么？', choices: ['保持车速，只要行人还没踏上车道即可', '减速并准备停车让行，确认行人安全通过', '轻按喇叭提醒行人后继续通过'], answerIndex: 1, explanation: '接近人行横道时应主动观察并为行人留出安全通行空间，必要时停车让行。' },
  'ca2-rules-006': { question: '你驶近一个闪烁红灯的路口，正确处理方式是什么？', choices: ['减速观察后直接通过', '像 STOP 标志一样完全停车，确认安全后再通行', '如果没有其他车辆，只需短暂停顿'], answerIndex: 1, explanation: '闪烁红灯按停车标志处理：先完全停车，再在安全且有路权时通行。' },
  'ca2-rules-007': { question: '交通信号为闪烁黄灯时，驾驶人应如何通行？', choices: ['完全停车后等待信号变化', '保持原速，只注意横向车辆', '减速、观察路口并谨慎通过'], answerIndex: 2, explanation: '闪烁黄灯要求减速并谨慎通行，不要求像闪烁红灯那样完全停车。' },
  'ca2-rules-011': { question: '在高速公路上发现自己刚刚错过出口，最安全的处理方式是什么？', choices: ['继续前行，在下一个出口离开后重新规划路线', '打开双闪并在路肩倒车回出口', '确认后方无车后跨越实线驶回出口'], answerIndex: 0, explanation: '错过出口后应继续前往下一个出口，不能倒车或突然跨越车道。' },
  'ca2-rules-013': { question: '使用高速公路加速车道时，最重要的目标是什么？', choices: ['尽早并入，即使车速明显低于主车流', '在车道末端停车等待完全没有车辆', '调整到接近主车流速度，并寻找足够安全的空隙汇入'], answerIndex: 2, explanation: '加速车道用于匹配主车流速度并寻找安全汇入空间。' },
  'ca2-rules-020': { question: '交通缓慢时，你前方需要穿越铁路轨道，但轨道另一侧暂时没有足够空间容纳你的车辆。应该怎么办？', choices: ['先驶上轨道，等前车继续前进', '在轨道前等待，直到能一次完全通过', '跟紧前车，尽量缩短停在轨道上的时间'], answerIndex: 1, explanation: '只有在确认车辆能够完全越过轨道时才能进入，不能把车辆停在轨道上。' },
  'ca2-rules-021': { question: '没有闸门的铁路道口前，你看到火车正在接近，但估计自己可能来得及通过。最安全且正确的选择是什么？', choices: ['停车等待火车完全通过', '如果前车已经通过就立即跟上', '只要没有听到汽笛就可以通过'], answerIndex: 0, explanation: '火车制动距离很长，看到火车接近时不要抢行。' },
  'ca2-rules-022': { question: '前方校车开始闪烁黄色警示灯时，这通常表示什么？', choices: ['校车正在准备停车，应减速并做好停车准备', '校车已经允许后车安全超越', '只有对向车辆需要减速'], answerIndex: 0, explanation: '黄色警示灯表示校车即将停车上下学生，应降低速度并准备停车。' },
  'ca2-rules-023': { question: '前方校车已经停车并闪烁红灯时，你应如何判断是否可以继续行驶？', choices: ['只要没有看到学生就可以慢速通过', '按适用道路条件遵守加州校车停车规则，等待红灯停止且确认安全', '如果后车鸣笛催促就可以通过'], answerIndex: 1, explanation: '校车红灯通常表示学生正在上下车或过街，必须遵守适用的停车规则。' },
  'ca2-rules-028': { question: '施工区内旗手给出的手势与临时车道标线看起来不一致时，应优先怎么做？', choices: ['服从现场旗手或交通控制人员的指示', '只按照原有道路标线行驶', '自行选择看起来最空的车道'], answerIndex: 0, explanation: '施工区现场交通控制人员的指示用于应对临时路况，应按其指挥安全通行。' },
  'ca2-rules-030': { question: '进入浓雾路段后，你发现前方车辆越来越难看清。最合适的做法是什么？', choices: ['打开远光灯并保持原速', '减速、增加跟车距离并使用合适的近光灯', '紧跟前车尾灯以免偏离车道'], answerIndex: 1, explanation: '雾天应降低速度、扩大跟车距离，并避免远光灯造成反射眩光。' },

  // California 视觉标志题：题干与显示图片一一对应
  'signs-003': { question: '图中的 W1-2 黄色菱形标志表示什么？', choices: ['前方有弯道', '前方有医院', '禁止驶入', '前方停车收费'], answerIndex: 0, explanation: 'W1-2 是弯道警告标志，黄色菱形用于提醒前方道路状况。' },
  'signs-004': { question: '图中的白底黑字 SPEED LIMIT 标志表示什么？', choices: ['该路段的法定最高限速', '建议最低速度', '停车时间限制', '出口距离'], answerIndex: 0, explanation: 'R2-1 SPEED LIMIT 属于法规标志，表示适用路段的最高法定限速。' },
  'signs-005': { question: '图中的橙色 ROAD WORK 标志提醒什么？', choices: ['前方道路施工或作业', '前方医院', '前方学校', '前方休息区'], answerIndex: 0, explanation: '橙色施工警告标志用于提醒前方临时道路施工或维护作业。' },
  'signs-007': { question: '图中的绿色导向标志主要提供什么信息？', choices: ['方向、目的地、出口或距离', '禁止停车', '道路施工', '铁路警告'], answerIndex: 0, explanation: '绿色导向标志用于帮助驾驶人识别路线、方向、目的地、出口和距离。' },
  'signs-008': { question: '图中的蓝色 H 医院服务标志表示什么？', choices: ['附近有医院服务', '前方施工', '禁止进入', '铁路道口'], answerIndex: 0, explanation: '蓝色 H 标志属于驾驶人服务信息，表示医院服务。' },
  'ca-signs-003': { question: '看图：这个 W1-2 黄色菱形标志表示什么？', choices: ['前方弯道', '前方铁路', '禁止掉头'], answerIndex: 0, explanation: 'W1-2 用于警告前方道路弯曲，应提前调整速度。' },
  'ca-signs-004': { question: '看图：这个橙色 ROAD WORK 标志表示什么？', choices: ['前方道路施工或维护', '前方医院', '学校区域'], answerIndex: 0, explanation: '橙色 ROAD WORK 标志提醒驾驶人前方存在道路施工或维护作业。' },
  'ca-signs-007': { question: '看图：这个 SPEED LIMIT 法规标志告诉驾驶人什么？', choices: ['该路段适用的最高法定限速', '前方弯道建议速度', '停车收费'], answerIndex: 0, explanation: 'R2-1 是限速法规标志，驾驶人应遵守标示的速度限制。' },
  'ca-signs-008': { question: '看图：这个绿色导向标志的主要作用是什么？', choices: ['提供方向、目的地、出口或距离信息', '发出危险警告', '禁止停车'], answerIndex: 0, explanation: '绿色导向标志用于路线和目的地导航。' },
  'ca-signs-009': { question: '看图：蓝色 H 标志表示什么服务？', choices: ['医院', '道路施工', '停车禁令'], answerIndex: 0, explanation: '蓝底白色 H 是医院服务信息标志。' },
  'ca-signs-010': { question: '看图：棕色休闲/文化导向标志通常指向什么？', choices: ['休闲、历史或文化兴趣地点', '限速区域', '铁路道口'], answerIndex: 0, explanation: '棕色导向标志用于休闲和文化兴趣区域的信息。' },
  'ca2-signs-003': { question: '根据图片，这个 W1-2 标志表示什么？', choices: ['前方弯道', '停车许可', '服务设施'], answerIndex: 0, explanation: 'W1-2 是黄色菱形弯道警告标志。' },
  'ca2-signs-004': { question: '根据图片，这个 ROAD WORK 标志提醒什么？', choices: ['前方道路施工或维护', '医院区域', '停车场'], answerIndex: 0, explanation: 'ROAD WORK 是道路施工/作业警告标志。' },
  'ca2-signs-005': { question: '根据图片，这个 SPEED LIMIT 标志属于什么含义？', choices: ['规定该路段最高法定限速', '指向景点', '提示施工'], answerIndex: 0, explanation: 'R2-1 SPEED LIMIT 是法规性限速标志。' },
  'ca2-signs-006': { question: '根据图片，这个绿色导向标志主要告诉驾驶人什么？', choices: ['方向、目的地、出口或距离信息', '禁止行为', '施工警告'], answerIndex: 0, explanation: '绿色导向标志用于路线导航和目的地信息。' },
  'ca2-signs-007': { question: '根据图片，这个蓝色 H 标志表示什么？', choices: ['医院服务', '铁路警告', '禁止停车'], answerIndex: 0, explanation: '蓝底白色 H 标志表示附近有医院服务。' },
  'ca2-signs-008': { question: '根据图片，这个棕色导向标志主要用于什么地点？', choices: ['休闲、历史或文化兴趣地点', '限速路段', '施工区域'], answerIndex: 0, explanation: '棕色标志用于休闲和文化兴趣区域导向。' },
}

function normalize(value: string) { return value.toLowerCase().replace(/[\s，。！？、,.!?;；:'"“”‘’（）()\-]/g, '') }
function hash(value: string) { let result = 2166136261; for (let index = 0; index < value.length; index += 1) { result ^= value.charCodeAt(index); result = Math.imul(result, 16777619) } return Math.abs(result >>> 0) }
function applyOverride(question: DmvQuestion): DmvQuestion { return overrides[question.id] ? { ...question, ...overrides[question.id] } : question }
function balanceAnswerPosition(question: DmvQuestion): DmvQuestion { if (question.choices.length < 2) return question; const target = hash(question.id) % question.choices.length; if (target === question.answerIndex) return question; const choices = [...question.choices]; const correct = choices[question.answerIndex]; choices.splice(question.answerIndex, 1); choices.splice(target, 0, correct); return { ...question, choices, answerIndex: target } }
function prepareQuestions(questions: DmvQuestion[]) { const ids = new Set<string>(); const texts = new Set<string>(); return questions.map(applyOverride).filter((question) => { const text = normalize(question.question); if (ids.has(question.id) || texts.has(text)) return false; ids.add(question.id); texts.add(text); return true }).map(balanceAnswerPosition) }

const californiaCanonicalSignId = /^ca2-signs-(?:00[1-9]|01\d|020)$/
function dedupeCaliforniaSigns(questions: DmvQuestion[]) {
  return questions.filter((question) => question.category !== 'signs' || californiaCanonicalSignId.test(question.id))
}

const languageSources = new Map<string, DmvQuestion>()
for (const question of [...californiaQuestions, ...californiaExpandedQuestions, ...sharedCoreBank]) {
  if (!languageSources.has(question.id)) languageSources.set(question.id, applyOverride(question))
}
export function getQuestionSourceForLanguage(questionId: string): DmvQuestion | null { return languageSources.get(questionId) ?? null }
export function getQuestionsForState(stateSlug: string): DmvQuestion[] { if (!getLiveStateBySlug(stateSlug)) return []; if (stateSlug === 'california') return dedupeCaliforniaSigns(prepareQuestions([...californiaQuestions, ...californiaExpandedQuestions, ...sharedCoreBank])); return prepareQuestions(sharedCoreBank) }
export function getQuestionsByCategory(stateSlug: string, category: DmvQuestion['category']) { return getQuestionsForState(stateSlug).filter((question) => question.category === category) }
export function getQuestionCountForState(stateSlug: string) { return getQuestionsForState(stateSlug).length }
