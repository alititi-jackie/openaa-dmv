'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = {
  imageUrl: string
  alt: string
  code: string
  note?: string
  sourceLabel?: string
}

const ASSET = '/traffic-signs/california'

const MUTCD = {
  stop: `${ASSET}/r1-1-stop.svg`,
  yield: `${ASSET}/r1-2-yield.svg`,
  speedLimit: `${ASSET}/r2-1-speed-limit.svg`,
  doNotEnter: `${ASSET}/r5-1-do-not-enter.svg`,
  wrongWay: `${ASSET}/r5-1a-wrong-way.svg`,
  railroad: `${ASSET}/w10-1-railroad-warning.svg`,
  crossbuck: `${ASSET}/r15-1-crossbuck.svg`,
  school: `${ASSET}/s1-1-school.svg`,
  curve: `${ASSET}/w1-2-curve.svg`,
  roadWork: `${ASSET}/cw20-1-road-work.svg`,
  hospital: `${ASSET}/d9-2-hospital.svg`,
  greenGuide: `${ASSET}/d1-guide-example.svg`,
  brownRecreation: `${ASSET}/figure-2m-2-recreation-guide.svg`,
  redCurb: `${ASSET}/ca-curb-red.svg`,
  whiteCurb: `${ASSET}/ca-curb-white.svg`,
  blueCurb: `${ASSET}/ca-curb-blue.svg`,
  onlyArrow: `${ASSET}/figure-3b-only-arrow.svg`,
  yellowLines: `${ASSET}/figure-3b-yellow-center-lines.svg`,
  wideDoubleYellow: `${ASSET}/ca-wide-double-yellow.svg`,
} as const

const official = (
  imageUrl: string,
  alt: string,
  code: string,
  note?: string,
  sourceLabel?: string,
): SignMeta => ({ imageUrl, alt, code, note, sourceLabel })

const categoryNote = '官方 MUTCD 标准示例：本题考查的是标志类别，并不表示该类别只有这一种标志。'
const guideCategoryNote = '绿色底白字是 MUTCD 导向标志的典型配色；本图用于识别“导向/方向/距离信息”这一类别。'
const recreationCategoryNote = '棕色底白字用于休闲与文化兴趣地点；本图依据 CA MUTCD 2026 Figure 2M-2 的官方示例类型制作本地学习图。'
const curbNote = '这是 California 路缘颜色规则的本地学习图，用于对应题目含义；规则依据 California DMV 与 CA MUTCD 2026 Part 3。'
const markingNote = '这是依据 CA MUTCD 2026 Part 3 / MUTCD Figure 3B 标线规则制作的本地学习图，用于展示题目所考路面标线。'

/**
 * California 交通标志 / 路面标线题视觉资源审计表。
 *
 * 规则：question.id -> 固定本地资源，禁止根据题目文字自动猜图。
 * 标准交通标志使用 FHWA/MUTCD 标准设计本地 SVG；
 * 绿色/棕色类别和 Part 3 路缘、路面标线使用按 CA MUTCD 2026 官方图表规则制作的本地学习图。
 */
const CALIFORNIA_QUESTION_VISUALS: Record<string, SignMeta | null> = {
  // 共享题库：8 题
  'signs-001': official(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'signs-002': official(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'signs-003': official(MUTCD.curve, '黄色菱形警告标志标准示例', 'W1-2', categoryNote),
  'signs-004': official(MUTCD.speedLimit, '白底黑字法规标志标准示例', 'R2-1', categoryNote),
  'signs-005': official(MUTCD.roadWork, '橙色道路施工标志标准示例', 'CW20-1', categoryNote),
  'signs-006': official(
    MUTCD.railroad,
    '铁路道口圆形预警标志',
    'W10-1',
    '本题文字同时提到圆形铁路预警标志和 Crossbuck；这里展示 W10-1 圆形预警标志。',
  ),
  'signs-007': official(MUTCD.greenGuide, '绿色导向标志标准示例', 'D1 / Guide Signs', guideCategoryNote, 'FHWA / MUTCD 导向标志标准'),
  'signs-008': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),

  // California 专属题库：10 题
  'ca-signs-001': official(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': official(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': official(MUTCD.curve, '黄色菱形警告标志标准示例', 'W1-2', categoryNote),
  'ca-signs-004': official(MUTCD.roadWork, '橙色道路施工标志标准示例', 'CW20-1', categoryNote),
  'ca-signs-005': official(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca-signs-006': official(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca-signs-007': official(MUTCD.speedLimit, '白底黑字法规标志标准示例', 'R2-1', categoryNote),
  'ca-signs-008': official(MUTCD.greenGuide, '绿色导向标志标准示例', 'D1 / Guide Signs', guideCategoryNote, 'FHWA / MUTCD 导向标志标准'),
  'ca-signs-009': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),
  'ca-signs-010': official(MUTCD.brownRecreation, '棕色休闲与文化兴趣地点导向标志示例', 'Figure 2M-2', recreationCategoryNote, 'Caltrans CA MUTCD 2026'),

  // California 扩展题库：20 题
  'ca2-signs-001': official(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': official(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': official(MUTCD.curve, '黄色菱形警告标志标准示例', 'W1-2', categoryNote),
  'ca2-signs-004': official(MUTCD.roadWork, '橙色道路施工标志标准示例', 'CW20-1', categoryNote),
  'ca2-signs-005': official(MUTCD.speedLimit, '白底黑字法规标志标准示例', 'R2-1', categoryNote),
  'ca2-signs-006': official(MUTCD.greenGuide, '绿色导向标志标准示例', 'D1 / Guide Signs', guideCategoryNote, 'FHWA / MUTCD 导向标志标准'),
  'ca2-signs-007': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),
  'ca2-signs-008': official(MUTCD.brownRecreation, '棕色休闲与文化兴趣地点导向标志示例', 'Figure 2M-2', recreationCategoryNote, 'Caltrans CA MUTCD 2026'),
  'ca2-signs-009': official(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca2-signs-010': official(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca2-signs-011': official(MUTCD.crossbuck, '铁路道口 Crossbuck 标志', 'R15-1'),
  'ca2-signs-012': official(MUTCD.redCurb, 'California 红色路缘示例', 'Part 3B · Red curb', curbNote, 'Caltrans CA MUTCD 2026 / California DMV'),
  'ca2-signs-013': official(MUTCD.whiteCurb, 'California 白色路缘示例', 'Part 3B · White curb', curbNote, 'Caltrans CA MUTCD 2026 / California DMV'),
  'ca2-signs-014': official(MUTCD.blueCurb, 'California 蓝色路缘示例', 'Part 3B · Blue curb', curbNote, 'Caltrans CA MUTCD 2026 / California DMV'),
  'ca2-signs-015': official(MUTCD.onlyArrow, 'ONLY 文字与方向箭头路面标线示例', 'Part 3B · ONLY + Arrow', markingNote, 'Caltrans CA MUTCD 2026 / FHWA MUTCD'),
  'ca2-signs-016': official(MUTCD.yellowLines, '黄色实线与黄色虚线中心线示例', 'Figure 3B · Yellow center lines', markingNote, 'Caltrans CA MUTCD 2026 / FHWA MUTCD'),
  'ca2-signs-017': official(MUTCD.wideDoubleYellow, '相隔较宽的双黄线分隔示例', 'Part 3B · Wide double yellow', markingNote, 'California DMV / CA MUTCD 2026'),
  'ca2-signs-018': official(MUTCD.doNotEnter, 'DO NOT ENTER 禁止驶入标志', 'R5-1'),
  'ca2-signs-019': official(MUTCD.wrongWay, 'WRONG WAY 方向错误标志', 'R5-1a'),
  'ca2-signs-020': official(
    MUTCD.curve,
    'Curve 弯道警告标志',
    'W1-2',
    '本题考查看到弯道警告后的驾驶处理；这里展示与题意直接对应的 W1-2 弯道标准图。',
  ),
}

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  return CALIFORNIA_QUESTION_VISUALS[question.id] ?? null
}

export default function QuestionSignImage({
  question,
  stateSlug,
  large = false,
}: {
  question: DmvQuestion
  stateSlug?: string
  large?: boolean
}) {
  const pathname = usePathname()
  const effectiveStateSlug = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (effectiveStateSlug !== 'california') return null

  const sign = getQuestionSignMeta(question)
  if (!sign) return null

  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      <img
        src={sign.imageUrl}
        alt={sign.alt}
        loading="lazy"
        className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`}
      />
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">
        {sign.sourceLabel ?? 'FHWA / MUTCD 标准图'} · {sign.code}
      </figcaption>
      {sign.note ? <p className="mt-1 max-w-xl text-center text-xs text-slate-500">{sign.note}</p> : null}
    </figure>
  )
}
