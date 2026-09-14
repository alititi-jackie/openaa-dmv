import type { DmvQuestion } from './dmv-data'
import { trafficSignLibrary, type TrafficSignAsset } from './sign-library'

export type SignMeta = { imageUrl: string; alt: string; code: string; sourceLabel?: string }

const CA = '/traffic-signs/california'
const custom = (file: string, alt: string, code: string, sourceLabel?: string): SignMeta => ({ imageUrl: `${CA}/${file}`, alt, code, sourceLabel })
const fromLibrary = (asset: TrafficSignAsset): SignMeta => ({ imageUrl: asset.imageUrl, alt: asset.alt, code: asset.code, sourceLabel: asset.sourceLabel })

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

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  const customMeta = CUSTOM_VISUALS[question.id]
  if (customMeta) return customMeta
  const signKey = QUESTION_SIGN_KEYS[question.id]
  const asset = signKey ? trafficSignLibrary[signKey] : null
  return asset ? fromLibrary(asset) : null
}
