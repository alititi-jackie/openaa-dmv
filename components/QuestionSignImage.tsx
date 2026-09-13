'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = {
  imageUrl: string
  alt: string
  code: string
  note?: string
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
} as const

const official = (imageUrl: string, alt: string, code: string, note?: string): SignMeta => ({
  imageUrl,
  alt,
  code,
  note,
})

const categoryNote = '官方 MUTCD 标准示例：本题考查的是标志类别，并不表示该类别只有这一种标志。'

/**
 * California 交通标志题视觉资源审计表。
 *
 * 规则：question.id -> 固定本地资源。禁止根据题目文字猜图。
 * 这里仅使用已核对的 FHWA/MUTCD 标准设计，并保存在 public/traffic-signs/california。
 * 路缘颜色、路面标线等不是单一交通标志图的题，在没有匹配的官方图表前继续明确保持 null。
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
  'signs-007': null, // 绿色导向类别：等待本地化 D1 系列官方图。
  'signs-008': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),

  // California 专属题库：10 题
  'ca-signs-001': official(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': official(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': official(MUTCD.curve, '黄色菱形警告标志标准示例', 'W1-2', categoryNote),
  'ca-signs-004': official(MUTCD.roadWork, '橙色道路施工标志标准示例', 'CW20-1', categoryNote),
  'ca-signs-005': official(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca-signs-006': official(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca-signs-007': official(MUTCD.speedLimit, '白底黑字法规标志标准示例', 'R2-1', categoryNote),
  'ca-signs-008': null, // 绿色导向类别：等待本地化 D1 系列官方图。
  'ca-signs-009': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),
  'ca-signs-010': null, // 棕色休闲/文化类别：等待本地化 2M/RS 系列官方图。

  // California 扩展题库：20 题
  'ca2-signs-001': official(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': official(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': official(MUTCD.curve, '黄色菱形警告标志标准示例', 'W1-2', categoryNote),
  'ca2-signs-004': official(MUTCD.roadWork, '橙色道路施工标志标准示例', 'CW20-1', categoryNote),
  'ca2-signs-005': official(MUTCD.speedLimit, '白底黑字法规标志标准示例', 'R2-1', categoryNote),
  'ca2-signs-006': null, // 绿色导向类别：等待本地化 D1 系列官方图。
  'ca2-signs-007': official(MUTCD.hospital, '蓝色驾驶人服务标志标准示例', 'D9-2', categoryNote),
  'ca2-signs-008': null, // 棕色休闲/文化类别：等待本地化 2M/RS 系列官方图。
  'ca2-signs-009': official(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca2-signs-010': official(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca2-signs-011': official(MUTCD.crossbuck, '铁路道口 Crossbuck 标志', 'R15-1'),
  'ca2-signs-012': null, // 红色路缘不是单一 MUTCD 标志图。
  'ca2-signs-013': null, // 白色路缘不是单一 MUTCD 标志图。
  'ca2-signs-014': null, // 蓝色路缘不是单一 MUTCD 标志图。
  'ca2-signs-015': null, // ONLY 路面箭头属于 pavement marking，不用交通标志图代替。
  'ca2-signs-016': null, // 黄实/虚线路面标线，等待官方 Figure 3B 图表资源。
  'ca2-signs-017': null, // 宽双黄线路面标线，等待官方 Figure 3B 图表资源。
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
        FHWA / MUTCD 标准图 · {sign.code}
      </figcaption>
      {sign.note ? <p className="mt-1 max-w-xl text-center text-xs text-slate-500">{sign.note}</p> : null}
    </figure>
  )
}
