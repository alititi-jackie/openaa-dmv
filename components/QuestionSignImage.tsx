'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type SignMeta = { imageUrl: string; alt: string; code: string; note?: string; sourceLabel?: string }
const ASSET = '/traffic-signs/california'
const M = {
  stop: `${ASSET}/r1-1-stop.svg`, yield: `${ASSET}/r1-2-yield.svg`, speed: `${ASSET}/r2-1-speed-limit.svg`,
  enter: `${ASSET}/r5-1-do-not-enter.svg`, wrong: `${ASSET}/r5-1a-wrong-way.svg`, railroad: `${ASSET}/w10-1-railroad-warning.svg`,
  crossbuck: `${ASSET}/r15-1-crossbuck.svg`, school: `${ASSET}/s1-1-school.svg`, curve: `${ASSET}/w1-2-curve.svg`,
  work: `${ASSET}/cw20-1-road-work.svg`, hospital: `${ASSET}/d9-2-hospital.svg`, guide: `${ASSET}/d1-guide-example.svg`,
  recreation: `${ASSET}/figure-2m-2-recreation-guide.svg`, redCurb: `${ASSET}/ca-curb-red.svg`, whiteCurb: `${ASSET}/ca-curb-white.svg`,
  blueCurb: `${ASSET}/ca-curb-blue.svg`, only: `${ASSET}/figure-3b-only-arrow.svg`, yellow: `${ASSET}/figure-3b-yellow-center-lines.svg`,
  doubleYellow: `${ASSET}/ca-wide-double-yellow.svg`,
} as const
const v=(imageUrl:string,alt:string,code:string,note?:string,sourceLabel?:string):SignMeta=>({imageUrl,alt,code,note,sourceLabel})
const category='这是该题所问颜色/形状类别的标准实例；图片用于识别该类别，不表示该类别只有这一种标志。'
const curb='本图对应 California 路缘颜色规则。'
const marking='本图对应题目所考的道路标线。'

/** 每个映射均按实际题干逐题复核；不再按序号猜测。 */
const V:Record<string,SignMeta>={
  // sharedQuestions: signs-003=黄色菱形，signs-004=白底黑字矩形（此前两张图曾对调，现已修正）
  'signs-001':v(M.stop,'STOP 停车标志','R1-1'),
  'signs-002':v(M.yield,'YIELD 让行标志','R1-2'),
  'signs-003':v(M.curve,'黄色菱形警告标志实例：Curve','W1-2',category),
  'signs-004':v(M.speed,'白底黑字法规标志实例：SPEED LIMIT','R2-1',category),
  'signs-005':v(M.work,'橙色施工警告标志实例：ROAD WORK','CW20-1',category),
  'signs-006':v(M.railroad,'圆形铁路道口预警标志','W10-1','题干同时提到圆形预警标志或 Crossbuck；本图展示圆形铁路预警标志。'),
  'signs-007':v(M.guide,'绿色方向、出口与距离导向标志实例','MUTCD Chapter 2D',category,'CA MUTCD / MUTCD 导向标志学习图'),
  'signs-008':v(M.hospital,'蓝色驾驶人服务标志实例：Hospital','D9-2',category),

  'ca-signs-001':v(M.stop,'STOP 停车标志','R1-1'),
  'ca-signs-002':v(M.yield,'YIELD 让行标志','R1-2'),
  'ca-signs-003':v(M.curve,'黄色菱形警告标志实例：Curve','W1-2',category),
  'ca-signs-004':v(M.work,'橙色施工/维护警告标志实例：ROAD WORK','CW20-1',category),
  'ca-signs-005':v(M.school,'五边形学校/学童区域标志','S1-1'),
  'ca-signs-006':v(M.railroad,'圆形铁路道口预警标志','W10-1'),
  'ca-signs-007':v(M.speed,'白底黑字矩形法规标志实例：SPEED LIMIT','R2-1',category),
  'ca-signs-008':v(M.guide,'绿色方向、出口与距离导向标志实例','MUTCD Chapter 2D',category,'CA MUTCD / MUTCD 导向标志学习图'),
  'ca-signs-009':v(M.hospital,'蓝色服务设施标志实例：Hospital','D9-2',category),
  'ca-signs-010':v(M.recreation,'棕色休闲/历史/文化地点导向标志实例','CA MUTCD Chapter 2M',category,'CA MUTCD 休闲文化导向标志学习图'),

  'ca2-signs-001':v(M.stop,'STOP 停车标志','R1-1'),
  'ca2-signs-002':v(M.yield,'YIELD 让行标志','R1-2'),
  'ca2-signs-003':v(M.curve,'黄色菱形警告标志实例：Curve','W1-2',category),
  'ca2-signs-004':v(M.work,'橙色施工/维护警告标志实例：ROAD WORK','CW20-1',category),
  'ca2-signs-005':v(M.speed,'白底黑字矩形法规标志实例：SPEED LIMIT','R2-1',category),
  'ca2-signs-006':v(M.guide,'绿色方向、出口与距离导向标志实例','MUTCD Chapter 2D',category,'CA MUTCD / MUTCD 导向标志学习图'),
  'ca2-signs-007':v(M.hospital,'蓝色驾驶人服务设施标志实例：Hospital','D9-2',category),
  'ca2-signs-008':v(M.recreation,'棕色休闲、历史或文化地点导向标志实例','CA MUTCD Chapter 2M',category,'CA MUTCD 休闲文化导向标志学习图'),
  'ca2-signs-009':v(M.school,'五边形学校/学童区域标志','S1-1'),
  'ca2-signs-010':v(M.railroad,'圆形黄色铁路道口预警标志','W10-1'),
  'ca2-signs-011':v(M.crossbuck,'铁路道口 Crossbuck 标志','R15-1'),
  'ca2-signs-012':v(M.redCurb,'California 红色路缘','Part 3B · Red curb',curb,'California 路缘规则学习图'),
  'ca2-signs-013':v(M.whiteCurb,'California 白色路缘','Part 3B · White curb',curb,'California 路缘规则学习图'),
  'ca2-signs-014':v(M.blueCurb,'California 蓝色路缘','Part 3B · Blue curb',curb,'California 路缘规则学习图'),
  'ca2-signs-015':v(M.only,'白色箭头与 ONLY 路面标线','Part 3B · ONLY + Arrow',marking,'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-016':v(M.yellow,'黄色实线与黄色虚线中心线','Part 3B · Yellow center lines',marking,'CA MUTCD / MUTCD 路面标线学习图'),
  'ca2-signs-017':v(M.doubleYellow,'相隔较宽的双黄线分隔','Part 3B · Wide double yellow',marking,'California 道路标线学习图'),
  'ca2-signs-018':v(M.enter,'DO NOT ENTER 禁止驶入标志','R5-1'),
  'ca2-signs-019':v(M.wrong,'WRONG WAY 方向错误标志','R5-1a'),
  'ca2-signs-020':v(M.curve,'Curve 弯道警告标志','W1-2'),
}

export function getQuestionSignMeta(question:DmvQuestion):SignMeta|null{
  if(question.category!=='signs')return null
  return V[question.id]??null
}

export default function QuestionSignImage({question,stateSlug,large=false}:{question:DmvQuestion;stateSlug?:string;large?:boolean}){
  const pathname=usePathname();const effectiveStateSlug=stateSlug??pathname.split('/').filter(Boolean)[0]
  if(effectiveStateSlug!=='california')return null
  const sign=getQuestionSignMeta(question);if(!sign)return null
  return <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4"><img src={sign.imageUrl} alt={sign.alt} loading="lazy" className={`object-contain ${large?'h-48 w-48 md:h-56 md:w-56':'h-36 w-36 md:h-40 md:w-40'}`}/><figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.sourceLabel??'FHWA / MUTCD 标准图'} · {sign.code}</figcaption>{sign.note?<p className="mt-1 max-w-xl text-center text-xs text-slate-500">{sign.note}</p>:null}</figure>
}
