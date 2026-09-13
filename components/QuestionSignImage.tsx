'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type VisualType =
  | 'speed-limit'
  | 'curve'
  | 'work-zone'
  | 'crossbuck'
  | 'signal'
  | 'merge'
  | 'pedestrian'
  | 'slippery'
  | 'lane-ends'
  | 'narrows'
  | 'two-way'
  | 'guide-green'
  | 'service-blue'
  | 'recreation-brown'
  | 'curb-red'
  | 'curb-white'
  | 'curb-blue'
  | 'lane-only'
  | 'yellow-lines'
  | 'double-yellow'

type SignMeta = {
  imageUrl?: string
  alt: string
  code?: string
  source: 'California DMV' | 'CA MUTCD' | '学习示意'
  visual?: VisualType
}

// 只在题意能够明确对应到某一种标志/标线时显示图片。
// 不再用“通用黄菱形”兜底，避免题目与图形不一致。
const CALIFORNIA_SIGN_RULES: Array<{ test: RegExp; sign: SignMeta }> = [
  { test: /(红色八角形|八角形红色|\bSTOP\b|停车标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif', alt: 'STOP 停车标志', code: 'R1-1', source: 'California DMV' } },
  { test: /(倒三角形红白|倒三角红白|红白倒三角|\bYIELD\b|让行标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif', alt: 'YIELD 让行标志', code: 'R1-2', source: 'California DMV' } },
  { test: /(DO NOT ENTER|禁止驶入)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png', alt: 'DO NOT ENTER 禁止驶入标志', code: 'R5-1', source: 'California DMV' } },
  { test: /(WRONG WAY|方向错误|逆向标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif', alt: 'WRONG WAY 方向错误标志', code: 'R5-1a', source: 'California DMV' } },
  { test: /(NO U-?TURN|禁止掉头|U 型掉头)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/nouturn.png', alt: 'NO U-TURN 禁止掉头标志', code: 'R3-4', source: 'California DMV' } },
  { test: /(圆形黄色铁路|铁路预警标志|前方铁路道口)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png', alt: '铁路道口预警标志', code: 'W10-1', source: 'California DMV' } },
  { test: /(Crossbuck|交叉形.*铁路|铁路道口的交叉形|铁路交叉的.*交叉形)/i, sign: { alt: '铁路道口 Crossbuck 标志', code: 'R15-1', source: 'CA MUTCD', visual: 'crossbuck' } },
  { test: /(五边形黄色|学校区域|学童区域|SCHOOL)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png', alt: '学校区域标志', code: 'S1-1', source: 'California DMV' } },

  // W1-2 必须画真正的 Curve 曲线符号，不能用回转箭头代替。
  { test: /(弯道警告|前方弯道|Curve)/i, sign: { alt: 'Curve 弯道警告标志', code: 'W1-2', source: 'CA MUTCD', visual: 'curve' } },
  // “黄色菱形属于哪类”是类别题，只用典型曲线牌作为示例，并明确标注“示例”。
  { test: /(黄色菱形|警告标志.*菱形|菱形.*警告)/i, sign: { alt: '黄色菱形警告标志示例', code: 'W1-2 示例', source: '学习示意', visual: 'curve' } },
  { test: /(橙色菱形|橙色标志|施工或维护区域|施工.*警告|道路施工)/i, sign: { alt: '道路施工警告标志', code: 'W20-1 示例', source: '学习示意', visual: 'work-zone' } },
  { test: /(白底黑字矩形|白底黑字的矩形|白色矩形|限速标志|SPEED LIMIT)/i, sign: { alt: 'SPEED LIMIT 法规标志', code: 'R2-1 示例', source: '学习示意', visual: 'speed-limit' } },
  { test: /(前方信号灯|交通信号灯.*前方|Signal Ahead)/i, sign: { alt: '前方交通信号灯警告标志', code: 'W3-3', source: 'CA MUTCD', visual: 'signal' } },
  { test: /(车流汇入|合流标志|Merging Traffic|Merge)/i, sign: { alt: '车流汇入警告标志', code: 'W4-1', source: 'CA MUTCD', visual: 'merge' } },
  { test: /(行人过街|行人.*警告标志|Pedestrian Crossing)/i, sign: { alt: '行人过街警告标志', code: 'W11-2', source: 'CA MUTCD', visual: 'pedestrian' } },
  { test: /(湿滑|Slippery When Wet)/i, sign: { alt: '湿滑路面警告标志', code: 'W8-5', source: 'CA MUTCD', visual: 'slippery' } },
  { test: /(车道结束|Lane Ends)/i, sign: { alt: '车道结束警告标志', code: 'W4-2', source: 'CA MUTCD', visual: 'lane-ends' } },
  { test: /(道路变窄|Road Narrows)/i, sign: { alt: '道路变窄警告标志', code: 'W5-1', source: 'CA MUTCD', visual: 'narrows' } },
  { test: /(双向交通|Two-Way Traffic)/i, sign: { alt: '双向交通警告标志', code: 'W6-3', source: 'CA MUTCD', visual: 'two-way' } },

  // 颜色、路缘和路面标线题不是单一标准牌，使用明确标注的学习示意，不冒充官方原图。
  { test: /(绿色路牌|绿色道路标志|绿色标志)/i, sign: { alt: '绿色方向与出口信息标志示意', source: '学习示意', visual: 'guide-green' } },
  { test: /(蓝色道路标志|蓝色标志通常|驾驶人服务|服务设施)/i, sign: { alt: '蓝色驾驶人服务设施标志示意', source: '学习示意', visual: 'service-blue' } },
  { test: /(棕色道路标志|棕色标志)/i, sign: { alt: '棕色休闲与文化地点标志示意', source: '学习示意', visual: 'recreation-brown' } },
  { test: /(红色路缘)/i, sign: { alt: '红色路缘停车限制示意', source: '学习示意', visual: 'curb-red' } },
  { test: /(白色路缘)/i, sign: { alt: '白色路缘上下客区域示意', source: '学习示意', visual: 'curb-white' } },
  { test: /(蓝色路缘)/i, sign: { alt: '蓝色残障停车路缘示意', source: '学习示意', visual: 'curb-blue' } },
  { test: /(ONLY|白色箭头)/i, sign: { alt: 'ONLY 专用方向车道箭头示意', source: '学习示意', visual: 'lane-only' } },
  { test: /(黄色实线和黄色虚线|黄实线|黄虚线)/i, sign: { alt: '黄色实线与虚线道路标线示意', source: '学习示意', visual: 'yellow-lines' } },
  { test: /(两组相隔较宽的双黄线|双黄线|双黄实线)/i, sign: { alt: '双黄线道路分隔示意', source: '学习示意', visual: 'double-yellow' } },
]

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  const searchable = `${question.question} ${question.explanation}`
  return CALIFORNIA_SIGN_RULES.find((item) => item.test.test(searchable))?.sign ?? null
}

function RoadPanel({ children, large, alt }: { children: React.ReactNode; large: boolean; alt: string }) {
  const size = large ? 'h-48 w-72 md:h-56 md:w-80' : 'h-36 w-56 md:h-40 md:w-64'
  return <div role="img" aria-label={alt} className={`${size} relative overflow-hidden rounded-md border-4 border-slate-700 bg-slate-700`}>{children}</div>
}

function Diamond({ children, large, orange = false, alt }: { children: React.ReactNode; large: boolean; orange?: boolean; alt: string }) {
  const square = large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'
  return <div role="img" aria-label={alt} className={`${square} flex items-center justify-center`}><div className={`h-[72%] w-[72%] rotate-45 border-[5px] border-slate-950 ${orange ? 'bg-orange-400' : 'bg-yellow-300'} flex items-center justify-center`}><div className="h-full w-full -rotate-45 flex items-center justify-center">{children}</div></div></div>
}

function StandardSign({ type, large, alt }: { type: VisualType; large: boolean; alt: string }) {
  const square = large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'

  if (type === 'speed-limit') return <div role="img" aria-label={alt} className={`${square} flex flex-col items-center justify-center border-[5px] border-slate-950 bg-white font-black text-slate-950`}><span className="text-xl">SPEED</span><span className="text-xl">LIMIT</span><span className="mt-1 text-5xl">50</span></div>
  if (type === 'crossbuck') return <div role="img" aria-label={alt} className={`${square} relative`}><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">RAILROAD</div><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 -rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">CROSSING</div></div>

  if (type === 'curve') return <Diamond large={large} alt={alt}><svg viewBox="0 0 100 100" className="h-[72%] w-[72%]" aria-hidden="true"><path d="M35 88 C35 66 68 65 68 43 C68 30 59 22 48 14" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/><path d="M38 20 L48 12 L52 26" fill="currentColor"/></svg></Diamond>
  if (type === 'work-zone') return <Diamond large={large} orange alt={alt}><span className="text-center text-xl font-black leading-tight">ROAD<br/>WORK</span></Diamond>
  if (type === 'signal') return <Diamond large={large} alt={alt}><div className="rounded-lg border-4 border-slate-950 bg-slate-950 px-3 py-2"><div className="mb-1 h-5 w-5 rounded-full bg-red-600"/><div className="mb-1 h-5 w-5 rounded-full bg-yellow-400"/><div className="h-5 w-5 rounded-full bg-green-600"/></div></Diamond>
  if (type === 'merge') return <Diamond large={large} alt={alt}><svg viewBox="0 0 100 100" className="h-[70%] w-[70%]" aria-hidden="true"><path d="M42 88 V18 M72 88 C72 60 58 55 42 50" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round"/><path d="M32 28 L42 15 L52 28" fill="currentColor"/></svg></Diamond>
  if (type === 'pedestrian') return <Diamond large={large} alt={alt}><span className="text-6xl" aria-hidden="true">🚶</span></Diamond>
  if (type === 'slippery') return <Diamond large={large} alt={alt}><div className="text-center text-4xl font-black leading-none">🚗<br/><span className="text-3xl">〰 〰</span></div></Diamond>
  if (type === 'lane-ends') return <Diamond large={large} alt={alt}><div className="text-5xl font-black">│╲</div></Diamond>
  if (type === 'narrows') return <Diamond large={large} alt={alt}><div className="text-5xl font-black">╲ ╱</div></Diamond>
  if (type === 'two-way') return <Diamond large={large} alt={alt}><div className="text-5xl font-black">↑ ↓</div></Diamond>

  if (type === 'guide-green' || type === 'service-blue' || type === 'recreation-brown') {
    const bg = type === 'guide-green' ? 'bg-green-700' : type === 'service-blue' ? 'bg-blue-700' : 'bg-amber-800'
    const title = type === 'guide-green' ? 'EXIT 12' : type === 'service-blue' ? 'HOSPITAL' : 'STATE PARK'
    const sub = type === 'guide-green' ? 'DOWNTOWN  2 MILES' : type === 'service-blue' ? 'GAS  •  FOOD' : 'RECREATION AREA'
    return <div role="img" aria-label={alt} className={`${square} ${bg} flex flex-col items-center justify-center rounded-md border-4 border-white px-3 text-center font-black text-white shadow`}><span className="text-2xl">{title}</span><span className="mt-3 text-sm">{sub}</span></div>
  }

  if (type === 'curb-red' || type === 'curb-white' || type === 'curb-blue') {
    const curb = type === 'curb-red' ? 'bg-red-600' : type === 'curb-blue' ? 'bg-blue-600' : 'bg-white'
    const label = type === 'curb-red' ? 'NO STOPPING' : type === 'curb-blue' ? 'ACCESSIBLE' : 'PASSENGER LOADING'
    return <RoadPanel large={large} alt={alt}><div className="absolute inset-x-0 top-0 h-1/3 bg-slate-300"/><div className={`absolute inset-x-0 top-1/3 h-5 ${curb} border-y-2 border-slate-900`}/><div className="absolute inset-x-0 bottom-8 text-center text-sm font-black tracking-wide text-white">{label}</div><div className="absolute left-1/2 top-[55%] h-24 w-1 -translate-x-1/2 bg-white"/></RoadPanel>
  }
  if (type === 'lane-only') return <RoadPanel large={large} alt={alt}><div className="absolute left-1/2 top-3 h-24 w-2 -translate-x-1/2 bg-white"/><div className="absolute left-1/2 top-2 -translate-x-1/2 text-5xl font-black text-white">↑</div><div className="absolute inset-x-0 bottom-5 text-center text-2xl font-black text-white">ONLY</div></RoadPanel>
  if (type === 'yellow-lines') return <RoadPanel large={large} alt={alt}><div className="absolute left-[42%] top-0 h-full w-2 bg-yellow-400"/><div className="absolute left-[58%] top-0 h-full w-2 bg-[repeating-linear-gradient(to_bottom,#facc15_0_22px,transparent_22px_42px)]"/><div className="absolute bottom-2 left-3 text-xs font-bold text-white">实线</div><div className="absolute bottom-2 right-3 text-xs font-bold text-white">虚线</div></RoadPanel>
  return <RoadPanel large={large} alt={alt}><div className="absolute left-[47%] top-0 h-full w-2 -translate-x-2 bg-yellow-400"/><div className="absolute left-[53%] top-0 h-full w-2 translate-x-2 bg-yellow-400"/><div className="absolute inset-x-0 bottom-3 text-center text-xs font-bold text-white">双黄线 · 分隔相反方向车流</div></RoadPanel>
}

export default function QuestionSignImage({ question, stateSlug, large = false }: { question: DmvQuestion; stateSlug?: string; large?: boolean }) {
  const pathname = usePathname()
  const effectiveStateSlug = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (effectiveStateSlug !== 'california') return null
  const sign = getQuestionSignMeta(question)
  if (!sign) return null

  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      {sign.imageUrl ? <img src={sign.imageUrl} alt={sign.alt} loading="lazy" referrerPolicy="no-referrer" className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`} /> : sign.visual ? <StandardSign type={sign.visual} large={large} alt={sign.alt} /> : null}
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.source === 'California DMV' ? 'California DMV 官方图' : sign.source === 'CA MUTCD' ? '按 CA MUTCD 标准绘制' : '学习示意图'}{sign.code ? ` · ${sign.code}` : ''}</figcaption>
    </figure>
  )
}
