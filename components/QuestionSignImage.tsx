'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type VisualType =
  | 'speed-limit'
  | 'warning'
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
  | 'generic'

type SignMeta = {
  imageUrl?: string
  alt: string
  code?: string
  source: 'California DMV' | 'MUTCD' | 'California DMV 学习示意'
  fallback?: VisualType
}

const CALIFORNIA_SIGN_RULES: Array<{ test: RegExp; sign: SignMeta }> = [
  { test: /(红色八角形|八角形红色|\bSTOP\b|停车标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif', alt: 'California DMV STOP 停车标志', code: 'R1-1', source: 'California DMV' } },
  { test: /(倒三角形红白|倒三角红白|红白倒三角|\bYIELD\b|让行标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif', alt: 'California DMV YIELD 让行标志', code: 'R1-2', source: 'California DMV' } },
  { test: /(DO NOT ENTER|禁止驶入)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png', alt: 'California DMV DO NOT ENTER 禁止驶入标志', code: 'R5-1', source: 'California DMV' } },
  { test: /(WRONG WAY|方向错误|逆向标志)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif', alt: 'California DMV WRONG WAY 方向错误标志', code: 'R5-1a', source: 'California DMV' } },
  { test: /(NO U-?TURN|禁止掉头|U 型掉头)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/nouturn.png', alt: 'California DMV NO U-TURN 禁止掉头标志', code: 'R3-4', source: 'California DMV' } },
  { test: /(圆形黄色铁路|铁路预警标志|前方铁路道口)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png', alt: 'California DMV 铁路道口预警标志', code: 'W10-1', source: 'California DMV' } },
  { test: /(Crossbuck|交叉形.*铁路|铁路道口的交叉形|铁路交叉的.*交叉形)/i, sign: { alt: '铁路道口 Crossbuck 标志', code: 'R15-1', source: 'MUTCD', fallback: 'crossbuck' } },
  { test: /(五边形黄色|学校区域|学童区域|SCHOOL)/i, sign: { imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png', alt: 'California DMV 学校区域标志', code: 'S1-1', source: 'California DMV' } },
  { test: /(黄色菱形|警告标志.*菱形|菱形.*警告|弯道警告|前方弯道|Curve)/i, sign: { alt: '黄色菱形警告标志', code: 'W1-2', source: 'MUTCD', fallback: 'warning' } },
  { test: /(橙色菱形|橙色标志|施工或维护区域|施工.*警告|道路施工)/i, sign: { alt: '橙色道路施工警告标志', code: 'W20-1', source: 'MUTCD', fallback: 'work-zone' } },
  { test: /(白底黑字矩形|白底黑字的矩形|白色矩形|限速标志|SPEED LIMIT)/i, sign: { alt: 'SPEED LIMIT 法规标志', code: 'R2-1', source: 'MUTCD', fallback: 'speed-limit' } },
  { test: /(前方信号灯|交通信号灯.*前方|Signal Ahead)/i, sign: { alt: '前方交通信号灯警告标志', code: 'W3-3', source: 'MUTCD', fallback: 'signal' } },
  { test: /(车流汇入|合流标志|Merging Traffic|Merge)/i, sign: { alt: '车流汇入警告标志', code: 'W4-1', source: 'MUTCD', fallback: 'merge' } },
  { test: /(行人过街|行人.*警告标志|Pedestrian Crossing)/i, sign: { alt: '行人过街警告标志', code: 'W11-2', source: 'MUTCD', fallback: 'pedestrian' } },
  { test: /(湿滑|Slippery When Wet)/i, sign: { alt: '湿滑路面警告标志', code: 'W8-5', source: 'MUTCD', fallback: 'slippery' } },
  { test: /(车道结束|Lane Ends)/i, sign: { alt: '车道结束警告标志', code: 'W4-2', source: 'MUTCD', fallback: 'lane-ends' } },
  { test: /(道路变窄|Road Narrows)/i, sign: { alt: '道路变窄警告标志', code: 'W5-1', source: 'MUTCD', fallback: 'narrows' } },
  { test: /(双向交通|Two-Way Traffic)/i, sign: { alt: '双向交通警告标志', code: 'W6-3', source: 'MUTCD', fallback: 'two-way' } },
  { test: /(绿色路牌|绿色道路标志|绿色标志)/i, sign: { alt: '绿色方向与出口信息标志示意', source: 'California DMV 学习示意', fallback: 'guide-green' } },
  { test: /(蓝色道路标志|蓝色标志通常|驾驶人服务|服务设施)/i, sign: { alt: '蓝色驾驶人服务设施标志示意', source: 'California DMV 学习示意', fallback: 'service-blue' } },
  { test: /(棕色道路标志|棕色标志)/i, sign: { alt: '棕色休闲与文化地点标志示意', source: 'California DMV 学习示意', fallback: 'recreation-brown' } },
  { test: /(红色路缘)/i, sign: { alt: '红色路缘停车限制示意', source: 'California DMV 学习示意', fallback: 'curb-red' } },
  { test: /(白色路缘)/i, sign: { alt: '白色路缘上下客区域示意', source: 'California DMV 学习示意', fallback: 'curb-white' } },
  { test: /(蓝色路缘)/i, sign: { alt: '蓝色残障停车路缘示意', source: 'California DMV 学习示意', fallback: 'curb-blue' } },
  { test: /(ONLY|白色箭头)/i, sign: { alt: 'ONLY 专用方向车道箭头示意', source: 'California DMV 学习示意', fallback: 'lane-only' } },
  { test: /(黄色实线和黄色虚线|黄实线|黄虚线)/i, sign: { alt: '黄色实线与虚线道路标线示意', source: 'California DMV 学习示意', fallback: 'yellow-lines' } },
  { test: /(两组相隔较宽的双黄线|双黄线|双黄实线)/i, sign: { alt: '双黄线道路分隔示意', source: 'California DMV 学习示意', fallback: 'double-yellow' } },
]

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  const searchable = `${question.question} ${question.explanation}`
  return CALIFORNIA_SIGN_RULES.find((item) => item.test.test(searchable))?.sign ?? {
    alt: 'California DMV 交通标志与道路标线学习示意',
    source: 'California DMV 学习示意',
    fallback: 'generic',
  }
}

function RoadPanel({ children, large, alt }: { children: React.ReactNode; large: boolean; alt: string }) {
  const size = large ? 'h-48 w-72 md:h-56 md:w-80' : 'h-36 w-56 md:h-40 md:w-64'
  return <div role="img" aria-label={alt} className={`${size} relative overflow-hidden rounded-md border-4 border-slate-700 bg-slate-700`}>{children}</div>
}

function StandardSign({ type, large, alt }: { type: VisualType; large: boolean; alt: string }) {
  const square = large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'

  if (type === 'speed-limit') return <div role="img" aria-label={alt} className={`${square} flex flex-col items-center justify-center border-[5px] border-slate-950 bg-white font-black text-slate-950`}><span className="text-xl">SPEED</span><span className="text-xl">LIMIT</span><span className="mt-1 text-5xl">50</span></div>
  if (type === 'crossbuck') return <div role="img" aria-label={alt} className={`${square} relative`}><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">RAILROAD</div><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 -rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">CROSSING</div></div>

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

  if (type === 'double-yellow') return <RoadPanel large={large} alt={alt}><div className="absolute left-[47%] top-0 h-full w-2 -translate-x-2 bg-yellow-400"/><div className="absolute left-[53%] top-0 h-full w-2 translate-x-2 bg-yellow-400"/><div className="absolute inset-x-0 bottom-3 text-center text-xs font-bold text-white">双黄线 · 分隔相反方向车流</div></RoadPanel>

  if (type === 'generic') return <div role="img" aria-label={alt} className={`${square} flex rotate-45 items-center justify-center border-4 border-slate-950 bg-yellow-300`}><span className="-rotate-45 text-center text-xl font-black text-slate-950">ROAD<br/>SIGN</span></div>

  const bg = type === 'work-zone' ? 'bg-orange-400' : 'bg-yellow-300'
  const label: Record<string, string> = { warning: '↪', 'work-zone': 'ROAD\nWORK', signal: '●\n●\n●', merge: '↗│', pedestrian: '🚶', slippery: '〰', 'lane-ends': '│╲', narrows: '╲ ╱', 'two-way': '↑ ↓' }
  return <div role="img" aria-label={alt} className={`${square} flex items-center justify-center`}><div className={`h-[72%] w-[72%] rotate-45 ${bg} flex items-center justify-center border-[5px] border-slate-950`}><span className="whitespace-pre-line -rotate-45 text-center text-2xl font-black leading-tight text-slate-950">{label[type]}</span></div></div>
}

export default function QuestionSignImage({ question, stateSlug, large = false }: { question: DmvQuestion; stateSlug?: string; large?: boolean }) {
  const pathname = usePathname()
  const effectiveStateSlug = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (effectiveStateSlug !== 'california' || question.category !== 'signs') return null

  const sign = getQuestionSignMeta(question)
  if (!sign) return null

  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      {sign.imageUrl ? <img src={sign.imageUrl} alt={sign.alt} loading="lazy" referrerPolicy="no-referrer" className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`} /> : <StandardSign type={sign.fallback ?? 'generic'} large={large} alt={sign.alt} />}
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">{sign.source === 'California DMV' ? 'California DMV 官方图' : sign.source === 'MUTCD' ? 'MUTCD 标准示意图' : 'California DMV 学习示意'}{sign.code ? ` · ${sign.code}` : ''}</figcaption>
    </figure>
  )
}
