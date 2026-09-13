'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = {
  imageUrl: string
  alt: string
  code: string
  source: 'California DMV'
  note?: string
}

const DMV = {
  stop: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif',
  yield: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif',
  doNotEnter: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png',
  wrongWay: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif',
  railroad: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png',
  school: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png',
} as const

const official = (imageUrl: string, alt: string, code: string, note?: string): SignMeta => ({
  imageUrl,
  alt,
  code,
  note,
  source: 'California DMV',
})

/**
 * California 交通标志题视觉资源审计表。
 *
 * 原则：
 * 1. 只按 question.id 固定映射，不读取题目文字，不用关键词/正则猜图。
 * 2. 只有已经确认来自 California DMV Driver's Handbook 的官方图才显示。
 * 3. 类别题、道路标线、路缘、Crossbuck、弯道等如果当前没有可靠官方原图，明确映射为 null。
 * 4. null 是有意设计：宁可不显示图片，也绝不使用近似图、Emoji、CSS/SVG 自绘图冒充官方图。
 *
 * 当前已审计：共享 8 题 + California 专属 10 题 + California 扩展 20 题 = 38 题。
 */
const CALIFORNIA_QUESTION_VISUALS: Record<string, SignMeta | null> = {
  // ── 共享题库：8 题 ──
  'signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'signs-003': null, // 黄色菱形“类别题”，不存在唯一对应标志。
  'signs-004': null, // 白底黑字矩形“法规类别题”，不存在唯一对应标志。
  'signs-005': null, // 橙色“施工类别题”，不存在唯一对应标志。
  'signs-006': official(
    DMV.railroad,
    '铁路道口圆形预警标志',
    'W10-1',
    '本题文字同时提到圆形预警标志和 Crossbuck；这里仅展示 California DMV 官方手册中的圆形铁路预警标志。',
  ),
  'signs-007': null, // 绿色导向牌属于类别题。
  'signs-008': null, // 蓝色服务牌属于类别题。

  // ── California 专属题库：10 题 ──
  'ca-signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': null, // 黄色菱形类别题。
  'ca-signs-004': null, // 橙色施工类别题。
  'ca-signs-005': official(DMV.school, '学校区域标志', 'S1-1'),
  'ca-signs-006': official(DMV.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca-signs-007': null, // 法规标志类别题。
  'ca-signs-008': null, // 绿色导向牌类别题。
  'ca-signs-009': null, // 蓝色服务牌类别题。
  'ca-signs-010': null, // 棕色休闲/文化地点类别题。

  // ── California 扩展题库：20 题 ──
  'ca2-signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': null, // 黄色菱形类别题。
  'ca2-signs-004': null, // 橙色施工类别题。
  'ca2-signs-005': null, // 白底黑字法规类别题。
  'ca2-signs-006': null, // 绿色导向牌类别题。
  'ca2-signs-007': null, // 蓝色服务牌类别题。
  'ca2-signs-008': null, // 棕色休闲/文化地点类别题。
  'ca2-signs-009': official(DMV.school, '学校区域标志', 'S1-1'),
  'ca2-signs-010': official(DMV.railroad, '铁路道口圆形预警标志', 'W10-1'),
  'ca2-signs-011': null, // Crossbuck：当前不使用自绘近似图。
  'ca2-signs-012': null, // 红色路缘：等待可靠官方视觉资源。
  'ca2-signs-013': null, // 白色路缘：等待可靠官方视觉资源。
  'ca2-signs-014': null, // 蓝色路缘：等待可靠官方视觉资源。
  'ca2-signs-015': null, // ONLY 车道箭头：等待可靠官方视觉资源。
  'ca2-signs-016': null, // 黄实线/黄虚线：等待可靠官方视觉资源。
  'ca2-signs-017': null, // 相隔较宽双黄线：等待可靠官方视觉资源。
  'ca2-signs-018': official(DMV.doNotEnter, 'DO NOT ENTER 禁止驶入标志', 'R5-1'),
  'ca2-signs-019': official(DMV.wrongWay, 'WRONG WAY 方向错误标志', 'R5-1a'),
  'ca2-signs-020': null, // 弯道规则题：不再用自绘 W1-2 近似图。
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
        referrerPolicy="no-referrer"
        className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`}
      />
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">
        California DMV 官方图 · {sign.code}
      </figcaption>
      {sign.note ? <p className="mt-1 max-w-xl text-center text-xs text-slate-500">{sign.note}</p> : null}
    </figure>
  )
}
