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
  noUTurn: `${ASSET}/r3-4-no-u-turn.svg`,
  doNotEnter: `${ASSET}/r5-1-do-not-enter.svg`,
  wrongWay: `${ASSET}/r5-1a-wrong-way.svg`,
  railroad: `${ASSET}/w10-1-railroad-warning.svg`,
  crossbuck: `${ASSET}/r15-1-crossbuck.svg`,
  school: `${ASSET}/s1-1-school.svg`,
  curve: `${ASSET}/w1-2-curve.svg`,
  roadWork: `${ASSET}/cw20-1-road-work.svg`,
  hospital: `${ASSET}/d9-2-hospital.svg`,
  guide: `${ASSET}/d1-guide-example.svg`,
  recreation: `${ASSET}/figure-2m-2-recreation-guide.svg`,
  redCurb: `${ASSET}/ca-curb-red.svg`,
  whiteCurb: `${ASSET}/ca-curb-white.svg`,
  blueCurb: `${ASSET}/ca-curb-blue.svg`,
  onlyArrow: `${ASSET}/figure-3b-only-arrow.svg`,
  yellowLines: `${ASSET}/figure-3b-yellow-center-lines.svg`,
  wideDoubleYellow: `${ASSET}/ca-wide-double-yellow.svg`,
} as const

const visual = (
  imageUrl: string,
  alt: string,
  code: string,
  note?: string,
  sourceLabel?: string,
): SignMeta => ({ imageUrl, alt, code, note, sourceLabel })

const categoryExample = '本图是该颜色/类别的官方标准示例，用于帮助识别标志体系；答题仍应以题目所问的类别含义为准。'
const curbNote = '本图用于对应 California 路缘颜色规则；请结合题目文字判断该颜色的停车或停靠限制。'
const markingNote = '本图用于展示题目所考的道路标线，不代表交通标志牌。'

/**
 * California 交通标志题图：固定 question.id -> 固定资源。
 * 标准标志优先使用 FHWA/MUTCD 标准图；California 路缘/标线使用按 CA MUTCD 规则核对的学习图。
 * 颜色或类别概念题使用明确标注的官方标准“类别示例”，避免让用户误以为只有这一种标志。
 */
const CALIFORNIA_QUESTION_VISUALS: Record<string, SignMeta> = {
  // 公共核心标志题
  'signs-001': visual(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'signs-002': visual(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'signs-003': visual(MUTCD.speedLimit, '白底黑字法规标志示例：SPEED LIMIT', 'R2-1', categoryExample),
  'signs-004': visual(MUTCD.curve, '黄色菱形警告标志示例：Curve', 'W1-2', categoryExample),
  'signs-005': visual(MUTCD.roadWork, '橙色施工警告标志示例：ROAD WORK', 'CW20-1', categoryExample),
  'signs-006': visual(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'signs-007': visual(MUTCD.guide, '绿色导向标志示例', 'MUTCD Chapter 2D', categoryExample, 'CA MUTCD / MUTCD 导向标志学习图'),
  'signs-008': visual(MUTCD.hospital, '蓝色服务标志示例：Hospital', 'D9-2', categoryExample),

  // California 专属标志题
  'ca-signs-001': visual(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': visual(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': visual(MUTCD.curve, '黄色菱形警告标志示例：Curve', 'W1-2', categoryExample),
  'ca-signs-004': visual(MUTCD.roadWork, '橙色施工警告标志示例：ROAD WORK', 'CW20-1', categoryExample),
  'ca-signs-005': visual(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca-signs-006': visual(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca-signs-007': visual(MUTCD.speedLimit, '白底黑字限速法规标志', 'R2-1'),
  'ca-signs-008': visual(MUTCD.guide, '绿色导向标志示例', 'MUTCD Chapter 2D', categoryExample, 'CA MUTCD / MUTCD 导向标志学习图'),
  'ca-signs-009': visual(MUTCD.hospital, '蓝色服务标志示例：Hospital', 'D9-2', categoryExample),
  'ca-signs-010': visual(MUTCD.recreation, '棕色休闲/文化兴趣地点标志示例', 'CA MUTCD Figure 2M-2', categoryExample, 'CA MUTCD 休闲导向标志学习图'),

  // California 扩展标志与标线题
  'ca2-signs-001': visual(MUTCD.stop, 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': visual(MUTCD.yield, 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': visual(MUTCD.speedLimit, '白底黑字法规标志示例：SPEED LIMIT', 'R2-1', categoryExample),
  'ca2-signs-004': visual(MUTCD.curve, '黄色菱形警告标志示例：Curve', 'W1-2', categoryExample),
  'ca2-signs-005': visual(MUTCD.roadWork, '橙色施工警告标志示例：ROAD WORK', 'CW20-1', categoryExample),
  'ca2-signs-006': visual(MUTCD.guide, '绿色导向标志示例', 'MUTCD Chapter 2D', categoryExample, 'CA MUTCD / MUTCD 导向标志学习图'),
  'ca2-signs-007': visual(MUTCD.hospital, '蓝色服务标志示例：Hospital', 'D9-2', categoryExample),
  'ca2-signs-008': visual(MUTCD.recreation, '棕色休闲/文化兴趣地点标志示例', 'CA MUTCD Figure 2M-2', categoryExample, 'CA MUTCD 休闲导向标志学习图'),
  'ca2-signs-009': visual(MUTCD.school, '学校区域标志', 'S1-1'),
  'ca2-signs-010': visual(MUTCD.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca2-signs-011': visual(MUTCD.crossbuck, '铁路道口 Crossbuck 标志', 'R15-1'),
  'ca2-signs-012': visual(MUTCD.redCurb, 'California 红色路缘', 'Part 3B · Red curb', curbNote, 'California 路缘规则学习图'),
  'ca2-signs-013': visual(MUTCD.whiteCurb, 'California 白色路缘', 'Part 3B · White curb', curbNote, 'California 路缘规则学习图'),
  'ca2-signs-014': visual(MUTCD.blueCurb, 'California 蓝色路缘', 'Part 3B · Blue curb', curbNote, 'California 路缘规则学习图'),
  'ca2-signs-015': visual(MUTCD.onlyArrow, 'ONLY 文字与方向箭头路面标线', 'Part 3B · ONLY + Arrow', markingNote, 'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-016': visual(MUTCD.yellowLines, '黄色实线与黄色虚线中心线', 'Part 3B · Yellow center lines', markingNote, 'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-017': visual(MUTCD.wideDoubleYellow, '相隔较宽的双黄线分隔', 'Part 3B · Wide double yellow', markingNote, 'California 道路标线学习图'),
  'ca2-signs-018': visual(MUTCD.doNotEnter, 'DO NOT ENTER 禁止驶入标志', 'R5-1'),
  'ca2-signs-019': visual(MUTCD.wrongWay, 'WRONG WAY 方向错误标志', 'R5-1a'),
  'ca2-signs-020': visual(MUTCD.curve, 'Curve 弯道警告标志', 'W1-2'),
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
