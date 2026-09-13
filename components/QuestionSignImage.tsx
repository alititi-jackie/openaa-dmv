'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = { imageUrl: string; alt: string; code: string; sourceLabel?: string }
const CA = '/traffic-signs/california'
const COMMON = '/traffic-signs/common'
const visual = (base:string,file:string,alt:string,code:string,sourceLabel?:string):SignMeta => ({ imageUrl:`${base}/${file}`, alt, code, sourceLabel })
const ca=(file:string,alt:string,code:string,sourceLabel?:string)=>visual(CA,file,alt,code,sourceLabel)
const common=(file:string,alt:string,code:string)=>visual(COMMON,file,alt,code)

const V: Record<string, SignMeta> = {
  'signs-001':ca('r1-1-stop.svg','STOP 停车标志','R1-1'),'signs-002':ca('r1-2-yield.svg','YIELD 让行标志','R1-2'),'signs-003':ca('w1-2-curve.svg','弯道警告标志','W1-2'),'signs-004':ca('r2-1-speed-limit.svg','SPEED LIMIT 限速标志','R2-1'),'signs-005':ca('cw20-1-road-work.svg','ROAD WORK 道路施工标志','W20-1'),'signs-006':ca('w10-1-railroad-warning.svg','铁路道口预警标志','W10-1'),'signs-007':ca('d1-guide-example.svg','绿色导向标志','Guide sign','MUTCD 导向标志学习图'),'signs-008':ca('d9-2-hospital.svg','医院服务标志','D9-2'),
  'nj-sign-001':ca('r1-1-stop.svg','STOP 停车标志','R1-1'),'nj-sign-002':ca('r1-2-yield.svg','YIELD 让行标志','R1-2'),'nj-sign-003':common('r5-1-do-not-enter.svg','DO NOT ENTER 标志','R5-1'),'nj-sign-004':common('r5-1a-wrong-way.svg','WRONG WAY 标志','R5-1a'),'nj-sign-005':common('r3-4-no-u-turn.svg','NO U-TURN 标志','R3-4'),'nj-sign-006':common('r6-1-one-way.svg','ONE WAY 标志','R6-1'),'nj-sign-007':common('r4-7-keep-right.svg','KEEP RIGHT 标志','R4-7'),'nj-sign-008':common('w8-5-slippery.svg','SLIPPERY WHEN WET 标志','W8-5'),'nj-sign-009':ca('w10-1-railroad-warning.svg','铁路道口预警标志','W10-1'),'nj-sign-010':ca('s1-1-school.svg','SCHOOL 学校区域标志','S1-1'),'nj-sign-011':ca('cw20-1-road-work.svg','ROAD WORK 道路施工标志','W20-1'),'nj-sign-012':ca('r2-1-speed-limit.svg','SPEED LIMIT 限速标志','R2-1'),'nj-sign-013':common('w2-1-crossroad.svg','CROSSROAD 交叉路口警告标志','W2-1'),'nj-sign-014':common('w4-1-merge.svg','MERGE 汇流警告标志','W4-1'),'nj-sign-015':common('w6-1-divided-highway.svg','DIVIDED HIGHWAY 警告标志','W6-1'),'nj-sign-016':common('w11-2-pedestrian.svg','PEDESTRIAN CROSSING 行人警告标志','W11-2'),'nj-sign-017':common('w3-3-signal-ahead.svg','SIGNAL AHEAD 前方信号灯标志','W3-3'),
  'ca2-signs-001':ca('r1-1-stop.svg','STOP 停车标志','R1-1'),'ca2-signs-002':ca('r1-2-yield.svg','YIELD 让行标志','R1-2'),'ca2-signs-003':ca('w1-2-curve.svg','弯道警告标志','W1-2'),'ca2-signs-004':ca('cw20-1-road-work.svg','道路施工标志','W20-1'),'ca2-signs-005':ca('r2-1-speed-limit.svg','限速标志','R2-1'),'ca2-signs-006':ca('d1-guide-example.svg','绿色导向标志','Guide sign','MUTCD 导向标志学习图'),'ca2-signs-007':ca('d9-2-hospital.svg','医院服务标志','D9-2'),'ca2-signs-008':ca('figure-2m-2-recreation-guide.svg','棕色休闲文化导向标志','Chapter 2M','MUTCD 休闲文化导向标志学习图'),'ca2-signs-009':ca('s1-1-school.svg','学校区域标志','S1-1'),'ca2-signs-010':ca('w10-1-railroad-warning.svg','铁路道口预警标志','W10-1'),'ca2-signs-011':ca('r15-1-crossbuck.svg','铁路道口 Crossbuck 标志','R15-1'),'ca2-signs-012':ca('ca-curb-red.svg','California 红色路缘','Part 3B','California 路缘规则学习图'),'ca2-signs-013':ca('ca-curb-white.svg','California 白色路缘','Part 3B','California 路缘规则学习图'),'ca2-signs-014':ca('ca-curb-blue.svg','California 蓝色路缘','Part 3B','California 路缘规则学习图'),'ca2-signs-015':ca('figure-3b-only-arrow.svg','ONLY 与方向箭头路面标线','Part 3B','MUTCD 路面标线学习图'),'ca2-signs-016':ca('figure-3b-yellow-center-lines.svg','黄色中心线标线','Part 3B','MUTCD 路面标线学习图'),'ca2-signs-017':ca('ca-wide-double-yellow.svg','宽间隔双黄线','Part 3B','California 道路标线学习图'),'ca2-signs-018':ca('r5-1-do-not-enter.svg','DO NOT ENTER 标志','R5-1'),'ca2-signs-019':ca('r5-1a-wrong-way.svg','WRONG WAY 标志','R5-1a'),'ca2-signs-020':ca('w1-2-curve.svg','弯道警告标志','W1-2'),
}

export function getQuestionSignMeta(question:DmvQuestion):SignMeta|null { return question.category==='signs' ? V[question.id] ?? null : null }

export default function QuestionSignImage({question,stateSlug,large=false}:{question:DmvQuestion;stateSlug?:string;large?:boolean}) {
  const pathname=usePathname(); const state=stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if(state!=='california'&&state!=='new-jersey') return null
  const sign=getQuestionSignMeta(question); if(!sign) return null
  return <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4"><img src={sign.imageUrl} alt={sign.alt} loading="lazy" className={`object-contain ${large?'h-48 w-48 md:h-56 md:w-56':'h-36 w-36 md:h-40 md:w-40'}`} /><figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.sourceLabel ?? 'FHWA / MUTCD 标准图'} · {sign.code}</figcaption></figure>
}
