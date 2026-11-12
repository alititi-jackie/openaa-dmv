import type { DmvQuestion } from './dmv-data'
import { trafficSignLibrary, type TrafficSignAsset } from './sign-library'
import newYorkSource from '@/data/new-york/openaa-ny-dmv-questions-v1.json'

export type SignMeta = { imageUrl: string; alt: string; code: string; sourceLabel?: string }

type NewYorkSourceQuestion = { id: number; image?: string | null; question: string }

const CA = '/traffic-signs/california'
const custom = (file: string, alt: string, code: string, sourceLabel?: string): SignMeta => ({ imageUrl: `${CA}/${file}`, alt, code, sourceLabel })
const fromLibrary = (asset: TrafficSignAsset): SignMeta => ({ imageUrl: asset.imageUrl, alt: asset.alt, code: asset.code, sourceLabel: asset.sourceLabel })

const NEW_YORK_SOURCE_IMAGES: Record<string, SignMeta> = Object.fromEntries(
  (newYorkSource.questions as NewYorkSourceQuestion[])
    .filter((item) => typeof item.image === 'string' && item.image.trim().length > 0)
    .map((item) => [
      `ny-openaa-${item.id}`,
      {
        imageUrl: item.image!.trim(),
        alt: `${item.question} · New York DMV traffic sign`,
        code: `OpenAA NY ${item.id}`,
        sourceLabel: 'OpenAA NY DMV source image',
      } satisfies SignMeta,
    ]),
)

const QUESTION_SIGN_KEYS: Record<string, string> = {
  'signs-001': 'R1-1',
  'signs-002': 'R1-2',
  'signs-003': 'W1-2',
  'signs-004': 'R2-1',
  'signs-005': 'W20-1',
  'signs-006': 'W10-1',

  'nj-sign-001': 'R1-1',
  'nj-sign-002': 'R1-2',
  'nj-sign-003': 'R5-1',
  'nj-sign-004': 'R5-1a',
  'nj-sign-005': 'R3-4',
  'nj-sign-006': 'R6-1',
  'nj-sign-007': 'R4-7',
  'nj-sign-008': 'W8-5',
  'nj-sign-009': 'W10-1',
  'nj-sign-010': 'S1-1',
  'nj-sign-011': 'W20-1',
  'nj-sign-012': 'R2-1',
  'nj-sign-013': 'W2-1',
  'nj-sign-014': 'W4-1',
  'nj-sign-015': 'W6-1',
  'nj-sign-016': 'W11-2',
  'nj-sign-017': 'W3-3',
  'nj-sign-018': 'W1-2',
  'nj-sign-019': 'W1-5',
  'nj-sign-020': 'W6-3',
  'nj-sign-021': 'W14-3',
  'nj-sign-022': 'W4-2',
  'nj-sign-023': 'W3-1',
  'nj-sign-024': 'W3-2',
  'nj-sign-025': 'R15-1',

  'ca2-signs-001': 'R1-1',
  'ca2-signs-002': 'R1-2',
  'ca2-signs-003': 'W1-2',
  'ca2-signs-004': 'W20-1',
  'ca2-signs-005': 'R2-1',
  'ca2-signs-009': 'S1-1',
  'ca2-signs-010': 'W10-1',
  'ca2-signs-011': 'R15-1',
  'ca2-signs-018': 'R5-1',
  'ca2-signs-019': 'R5-1a',
  'ca2-signs-020': 'W1-2',
}

const CUSTOM_VISUALS: Record<string, SignMeta> = {
  'signs-007': custom('d1-guide-example.svg', '绿色导向标志', 'Guide sign', 'MUTCD 导向标志学习图'),
  'signs-008': custom('d9-2-hospital.svg', '医院服务标志', 'D9-2'),
  'ca2-signs-006': custom('d1-guide-example.svg', '绿色导向标志', 'Guide sign', 'MUTCD 导向标志学习图'),
  'ca2-signs-007': custom('d9-2-hospital.svg', '医院服务标志', 'D9-2'),
  'ca2-signs-008': custom('figure-2m-2-recreation-guide.svg', '棕色休闲文化导向标志', 'Chapter 2M', 'MUTCD 休闲文化导向标志学习图'),
  'ca2-signs-012': custom('ca-curb-red.svg', 'California 红色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-013': custom('ca-curb-white.svg', 'California 白色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-014': custom('ca-curb-blue.svg', 'California 蓝色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-015': custom('figure-3b-only-arrow.svg', 'ONLY 与方向箭头路面标线', 'Part 3B', 'MUTCD 路面标线学习图'),
  'ca2-signs-016': custom('figure-3b-yellow-center-lines.svg', '黄色中心线标线', 'Part 3B', 'MUTCD 路面标线学习图'),
  'ca2-signs-017': custom('ca-wide-double-yellow.svg', '宽间隔双黄线', 'Part 3B', 'California 道路标线学习图'),
}


const PA_SIGNS = '/traffic-signs/pennsylvania'
const paOfficial = (file: string, alt: string, code: string): SignMeta => ({ imageUrl: `${PA_SIGNS}/${file}`, alt, code, sourceLabel: 'PennDOT 官方手册 PUB 95 原图' })

// Pennsylvania official bank is source-faithful like New York: paired images are
// the exact figures printed in the PennDOT manual (PUB 95 / PUB 95C) review
// questions; questions without a printed figure show no image.
const PA_OFFICIAL_IMAGES: Record<string, SignMeta> = {
  'pa-ch2-001': paOfficial('pa-ch2-q01.png', '停车标志（红色八角形）', 'PUB 95 CH2 Q1'),
  'pa-ch2-002': paOfficial('pa-ch2-q02.png', '让行标志（红白倒三角形）', 'PUB 95 CH2 Q2'),
  'pa-ch2-003': paOfficial('pa-ch2-q03.png', '禁止进入标志', 'PUB 95 CH2 Q3'),
  'pa-ch2-004': paOfficial('pa-ch2-q04.png', '禁止掉头标志', 'PUB 95 CH2 Q4'),
  'pa-ch2-005': paOfficial('pa-ch2-q05.png', '禁止右转标志', 'PUB 95 CH2 Q5'),
  'pa-ch2-006': paOfficial('pa-ch2-q06.png', '分岔高速公路交叉标志', 'PUB 95 CH2 Q6'),
  'pa-ch2-009': paOfficial('pa-ch2-q09.png', '铁路道口实景照片', 'PUB 95 CH2 Q9'),
  'pa-ch2-011': paOfficial('pa-ch2-q11.png', '出口专用车道指路标志', 'PUB 95 CH2 Q11'),
  'pa-ch2-013': paOfficial('pa-ch2-q13.png', '右弯道警告标志', 'PUB 95 CH2 Q13'),
  'pa-ch2-014': paOfficial('pa-ch2-q14.png', '连续弯道警告标志', 'PUB 95 CH2 Q14'),
  'pa-ch2-015': paOfficial('pa-ch2-q15.png', '路面湿滑警告标志', 'PUB 95 CH2 Q15'),
  'pa-ch2-016': paOfficial('pa-ch2-q16.png', '陡坡警告标志', 'PUB 95 CH2 Q16'),
  'pa-ch2-017': paOfficial('pa-ch2-q17.png', '警告标志（黄色菱形）', 'PUB 95 CH2 Q17'),
  'pa-ch2-018': paOfficial('pa-ch2-q18.png', '禁止超车区标志（黄色三角旗）', 'PUB 95 CH2 Q18'),
  'pa-ch2-019': paOfficial('pa-ch2-q19.png', '四个候选标志组合图（编号1-4）', 'PUB 95 CH2 Q19'),
  'pa-ch2-020': paOfficial('pa-ch2-q20.png', '车道结束向左汇流标志', 'PUB 95 CH2 Q20'),
  'pa-ch2-021': paOfficial('pa-ch2-q21.png', '十字路口警告标志', 'PUB 95 CH2 Q21'),
  'pa-ch2-022': paOfficial('pa-ch2-q22.png', '丁字路口警告标志', 'PUB 95 CH2 Q22'),
  'pa-ch2-023': paOfficial('pa-ch2-q23.png', '软路肩警告标志', 'PUB 95 CH2 Q23'),
  'pa-ch2-024': paOfficial('pa-ch2-q24.png', '前方交通信号警告标志', 'PUB 95 CH2 Q24'),
  'pa-ch2-025': paOfficial('pa-ch2-q25.png', '分岔高速公路开始标志', 'PUB 95 CH2 Q25'),
  'pa-ch2-026': paOfficial('pa-ch2-q26.png', '交通信号灯警告标志', 'PUB 95 CH2 Q26'),
  'pa-ch2-041': paOfficial('pa-ch2-q41.png', '车道使用控制信号（绿色箭头）', 'PUB 95 CH2 Q41'),
  'pa-ch2-042': paOfficial('pa-ch2-q42.png', '前方有旗手标志', 'PUB 95 CH2 Q42'),
  'pa-ch2-043': paOfficial('pa-ch2-q43.png', '前方施工人员标志', 'PUB 95 CH2 Q43'),
  'pa-ch2-044': paOfficial('pa-ch2-q44.png', '施工区箭头面板', 'PUB 95 CH2 Q44'),
  'pa-ch2-045': paOfficial('pa-ch2-q45.png', '中央左转车道实景照片', 'PUB 95 CH2 Q45'),
  'pa-ch2-052': paOfficial('pa-ch2-q52.png', '大型方向箭头标志', 'PUB 95 CH2 Q52'),
  'pa-ch2-053': paOfficial('pa-ch2-q53.png', '向左急弯人字纹标志', 'PUB 95 CH2 Q53'),
  'pa-ch2-055': paOfficial('pa-ch2-q55.png', '限速20标志实景照片', 'PUB 95 CH2 Q55'),
  'pa-ch2-056': paOfficial('pa-ch2-q56.png', '四个候选标志组合图（编号1-4）', 'PUB 95 CH2 Q56'),
  'pa-ch2-057': paOfficial('pa-ch2-q57.png', '中央车道左转专用标志', 'PUB 95 CH2 Q57'),
  'pa-ch2-058': paOfficial('pa-ch2-q58.png', '四个候选标志组合图（编号1-4）', 'PUB 95 CH2 Q58'),
  'pa-ch3-030': paOfficial('pa-ch3-q30.png', '手势信号实景照片（左臂向下：减速或停车）', 'PUB 95 CH3 Q30'),
  'pa-ch3-040': paOfficial('pa-ch3-q40.png', '手势信号实景照片（左臂向上：右转）', 'PUB 95 CH3 Q40'),
  'pa-ch3-041': paOfficial('pa-ch3-q41.png', '手势信号实景照片（左臂平伸：左转）', 'PUB 95 CH3 Q41'),
}

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  // New York is source-faithful: if the original OpenAA question has an image,
  // use that exact image; if the source image field is empty, show no invented
  // representative sign. This keeps dmv.openaa.com/ny aligned with OpenAA.com/dmv.
  if (question.id.startsWith('ny-openaa-')) return NEW_YORK_SOURCE_IMAGES[question.id] ?? null
  if (question.id.startsWith('pa-ch')) return PA_OFFICIAL_IMAGES[question.id] ?? null

  if (question.category !== 'signs') return null
  const customMeta = CUSTOM_VISUALS[question.id]
  if (customMeta) return customMeta
  const signKey = QUESTION_SIGN_KEYS[question.id]
  const asset = signKey ? trafficSignLibrary[signKey] : null
  return asset ? fromLibrary(asset) : null
}
