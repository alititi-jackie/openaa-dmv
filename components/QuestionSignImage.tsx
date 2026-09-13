'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = { imageUrl: string; alt: string; code: string; sourceLabel?: string }
const ASSET = '/traffic-signs/california'
const visual = (file: string, alt: string, code: string, sourceLabel?: string): SignMeta => ({ imageUrl: `${ASSET}/${file}`, alt, code, sourceLabel })

const V: Record<string, SignMeta> = {
  'signs-001': visual('r1-1-stop.svg', 'STOP 停车标志', 'R1-1'),
  'signs-002': visual('r1-2-yield.svg', 'YIELD 让行标志', 'R1-2'),
  'signs-003': visual('w1-2-curve.svg', 'W1-2 弯道警告标志', 'W1-2'),
  'signs-004': visual('r2-1-speed-limit.svg', 'SPEED LIMIT 限速标志', 'R2-1'),
  'signs-005': visual('cw20-1-road-work.svg', 'ROAD WORK 道路施工标志', 'CW20-1'),
  'signs-006': visual('w10-1-railroad-warning.svg', '铁路道口预警标志', 'W10-1'),
  'signs-007': visual('d1-guide-example.svg', '绿色导向标志', 'Chapter 2D', 'CA MUTCD / MUTCD 导向标志学习图'),
  'signs-008': visual('d9-2-hospital.svg', '医院服务标志', 'D9-2'),

  'ca-signs-001': visual('r1-1-stop.svg', 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': visual('r1-2-yield.svg', 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': visual('w1-2-curve.svg', 'W1-2 弯道警告标志', 'W1-2'),
  'ca-signs-004': visual('cw20-1-road-work.svg', 'ROAD WORK 道路施工标志', 'CW20-1'),
  'ca-signs-005': visual('s1-1-school.svg', '学校区域标志', 'S1-1'),
  'ca-signs-006': visual('w10-1-railroad-warning.svg', '铁路道口预警标志', 'W10-1'),
  'ca-signs-007': visual('r2-1-speed-limit.svg', 'SPEED LIMIT 限速标志', 'R2-1'),
  'ca-signs-008': visual('d1-guide-example.svg', '绿色导向标志', 'Chapter 2D', 'CA MUTCD / MUTCD 导向标志学习图'),
  'ca-signs-009': visual('d9-2-hospital.svg', '医院服务标志', 'D9-2'),
  'ca-signs-010': visual('figure-2m-2-recreation-guide.svg', '棕色休闲文化导向标志', 'Chapter 2M', 'CA MUTCD 休闲文化导向标志学习图'),

  'ca2-signs-001': visual('r1-1-stop.svg', 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': visual('r1-2-yield.svg', 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': visual('w1-2-curve.svg', 'W1-2 弯道警告标志', 'W1-2'),
  'ca2-signs-004': visual('cw20-1-road-work.svg', 'ROAD WORK 道路施工标志', 'CW20-1'),
  'ca2-signs-005': visual('r2-1-speed-limit.svg', 'SPEED LIMIT 限速标志', 'R2-1'),
  'ca2-signs-006': visual('d1-guide-example.svg', '绿色导向标志', 'Chapter 2D', 'CA MUTCD / MUTCD 导向标志学习图'),
  'ca2-signs-007': visual('d9-2-hospital.svg', '医院服务标志', 'D9-2'),
  'ca2-signs-008': visual('figure-2m-2-recreation-guide.svg', '棕色休闲文化导向标志', 'Chapter 2M', 'CA MUTCD 休闲文化导向标志学习图'),
  'ca2-signs-009': visual('s1-1-school.svg', '学校区域标志', 'S1-1'),
  'ca2-signs-010': visual('w10-1-railroad-warning.svg', '铁路道口预警标志', 'W10-1'),
  'ca2-signs-011': visual('r15-1-crossbuck.svg', '铁路道口 Crossbuck 标志', 'R15-1'),
  'ca2-signs-012': visual('ca-curb-red.svg', 'California 红色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-013': visual('ca-curb-white.svg', 'California 白色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-014': visual('ca-curb-blue.svg', 'California 蓝色路缘', 'Part 3B', 'California 路缘规则学习图'),
  'ca2-signs-015': visual('figure-3b-only-arrow.svg', 'ONLY 与方向箭头路面标线', 'Part 3B', 'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-016': visual('figure-3b-yellow-center-lines.svg', '黄色中心线标线', 'Part 3B', 'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-017': visual('ca-wide-double-yellow.svg', '宽间隔双黄线', 'Part 3B', 'California 道路标线学习图'),
  'ca2-signs-018': visual('r5-1-do-not-enter.svg', 'DO NOT ENTER 标志', 'R5-1'),
  'ca2-signs-019': visual('r5-1a-wrong-way.svg', 'WRONG WAY 标志', 'R5-1a'),
  'ca2-signs-020': visual('w1-2-curve.svg', 'W1-2 弯道警告标志', 'W1-2'),
}

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  return question.category === 'signs' ? V[question.id] ?? null : null
}

export default function QuestionSignImage({ question, stateSlug, large = false }: { question: DmvQuestion; stateSlug?: string; large?: boolean }) {
  const pathname = usePathname()
  const state = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (state !== 'california') return null
  const sign = getQuestionSignMeta(question)
  if (!sign) return null
  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      <img src={sign.imageUrl} alt={sign.alt} loading="lazy" className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`} />
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.sourceLabel ?? 'FHWA / MUTCD 标准图'} · {sign.code}</figcaption>
    </figure>
  )
}
