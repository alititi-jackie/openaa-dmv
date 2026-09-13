'use client'

import { usePathname } from 'next/navigation'
import type { DmvQuestion } from '@/lib/dmv-data'

type VisualType =
  | 'speed-limit'
  | 'work-zone'
  | 'crossbuck'
  | 'guide-green'
  | 'service-blue'
  | 'recreation-brown'
  | 'curb-red'
  | 'curb-white'
  | 'curb-blue'
  | 'lane-only'
  | 'yellow-lines'
  | 'double-yellow'
  | 'warning-category'

type SignMeta = {
  imageUrl?: string
  alt: string
  code?: string
  note?: string
  source: 'California DMV' | '学习示例'
  visual?: VisualType
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

const example = (visual: VisualType, alt: string, note?: string): SignMeta => ({
  visual,
  alt,
  note,
  source: '学习示例',
})

// 固定映射：题目 ID -> 已审核视觉资源。
// 不再读取题目文字、不再用正则或关键词猜图。
const CALIFORNIA_QUESTION_VISUALS: Record<string, SignMeta | null> = {
  // 共享题库（California question bank 也会包含）
  'signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'signs-003': example('warning-category', '黄色菱形警告标志类别示例', '这是标志类别题，不代表某一个唯一标志。'),
  'signs-004': example('speed-limit', '白底黑字法规标志类别示例', 'SPEED LIMIT 仅作为法规标志类别示例。'),
  'signs-005': example('work-zone', '橙色施工标志类别示例', 'ROAD WORK 仅作为施工标志类别示例。'),
  'signs-006': official(DMV.railroad, '铁路道口预警标志示例', 'W10-1', '题目同时提到圆形预警牌和 Crossbuck；这里展示官方圆形预警牌示例。'),
  'signs-007': example('guide-green', '绿色方向、出口和距离信息标志示例'),
  'signs-008': example('service-blue', '蓝色驾驶人服务设施标志示例'),

  // California 专属题库
  'ca-signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'ca-signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'ca-signs-003': example('warning-category', '黄色菱形警告标志类别示例', '这是标志类别题，不绑定某一个具体警告牌。'),
  'ca-signs-004': example('work-zone', '橙色施工标志类别示例'),
  'ca-signs-005': official(DMV.school, '学校区域标志', 'S1-1'),
  'ca-signs-006': official(DMV.railroad, '铁路道口预警标志', 'W10-1'),
  'ca-signs-007': example('speed-limit', '白底黑字法规标志类别示例', 'SPEED LIMIT 仅作为法规标志类别示例。'),
  'ca-signs-008': example('guide-green', '绿色方向、出口和距离信息标志示例'),
  'ca-signs-009': example('service-blue', '蓝色驾驶人服务设施标志示例'),
  'ca-signs-010': example('recreation-brown', '棕色休闲、历史或文化地点标志示例'),

  // California 扩展题库
  'ca2-signs-001': official(DMV.stop, 'STOP 停车标志', 'R1-1'),
  'ca2-signs-002': official(DMV.yield, 'YIELD 让行标志', 'R1-2'),
  'ca2-signs-003': example('warning-category', '黄色菱形警告标志类别示例', '这是标志类别题，不绑定 W1-2 等某一个具体警告牌。'),
  'ca2-signs-004': example('work-zone', '橙色施工标志类别示例'),
  'ca2-signs-005': example('speed-limit', '白底黑字法规标志类别示例'),
  'ca2-signs-006': example('guide-green', '绿色方向、出口和距离信息标志示例'),
  'ca2-signs-007': example('service-blue', '蓝色驾驶人服务设施标志示例'),
  'ca2-signs-008': example('recreation-brown', '棕色休闲、历史或文化地点标志示例'),
  'ca2-signs-009': official(DMV.school, '学校区域标志', 'S1-1'),
  'ca2-signs-010': official(DMV.railroad, '铁路道口预警标志', 'W10-1'),
  'ca2-signs-011': example('crossbuck', '铁路道口 Crossbuck 学习示例', '当前未使用近似图冒充 California DMV 官方原图。'),
  'ca2-signs-012': example('curb-red', '红色路缘停车限制示意'),
  'ca2-signs-013': example('curb-white', '白色路缘短时上下客示意'),
  'ca2-signs-014': example('curb-blue', '蓝色残障停车区域示意'),
  'ca2-signs-015': example('lane-only', 'ONLY 专用方向车道箭头示意'),
  'ca2-signs-016': example('yellow-lines', '黄色实线与黄色虚线道路标线示意'),
  'ca2-signs-017': example('double-yellow', '相隔较宽双黄线道路分隔示意'),
  'ca2-signs-018': official(DMV.doNotEnter, 'DO NOT ENTER 禁止驶入标志', 'R5-1'),
  'ca2-signs-019': official(DMV.wrongWay, 'WRONG WAY 方向错误标志', 'R5-1a'),

  // 这道题问“看到弯道警告后应该怎么做”，不是识别某一个固定图。
  // 在拿到并本地保存准确官方 W1-2 资源前，宁可不显示图片，也不再放近似图。
  'ca2-signs-020': null,
}

export function getQuestionSignMeta(question: DmvQuestion): SignMeta | null {
  if (question.category !== 'signs') return null
  return CALIFORNIA_QUESTION_VISUALS[question.id] ?? null
}

function RoadPanel({ children, large, alt }: { children: React.ReactNode; large: boolean; alt: string }) {
  const size = large ? 'h-48 w-72 md:h-56 md:w-80' : 'h-36 w-56 md:h-40 md:w-64'
  return <div role="img" aria-label={alt} className={`${size} relative overflow-hidden rounded-md border-4 border-slate-700 bg-slate-700`}>{children}</div>
}

function ExampleVisual({ type, large, alt }: { type: VisualType; large: boolean; alt: string }) {
  const square = large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'

  if (type === 'speed-limit') return <div role="img" aria-label={alt} className={`${square} flex flex-col items-center justify-center border-[5px] border-slate-950 bg-white font-black text-slate-950`}><span className="text-xl">SPEED</span><span className="text-xl">LIMIT</span><span className="mt-1 text-5xl">50</span></div>
  if (type === 'warning-category') return <div role="img" aria-label={alt} className={`${square} flex items-center justify-center`}><div className="flex h-[72%] w-[72%] rotate-45 items-center justify-center border-[5px] border-slate-950 bg-yellow-300"><span className="-rotate-45 text-center text-lg font-black">WARNING<br/>EXAMPLE</span></div></div>
  if (type === 'work-zone') return <div role="img" aria-label={alt} className={`${square} flex items-center justify-center`}><div className="flex h-[72%] w-[72%] rotate-45 items-center justify-center border-[5px] border-slate-950 bg-orange-400"><span className="-rotate-45 text-center text-xl font-black">ROAD<br/>WORK</span></div></div>
  if (type === 'crossbuck') return <div role="img" aria-label={alt} className={`${square} relative`}><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">RAILROAD</div><div className="absolute left-1/2 top-1/2 w-[95%] -translate-x-1/2 -translate-y-1/2 -rotate-45 border-4 border-slate-950 bg-white py-2 text-center text-sm font-black">CROSSING</div></div>

  if (type === 'guide-green' || type === 'service-blue' || type === 'recreation-brown') {
    const bg = type === 'guide-green' ? 'bg-green-700' : type === 'service-blue' ? 'bg-blue-700' : 'bg-amber-800'
    const title = type === 'guide-green' ? 'EXIT 12' : type === 'service-blue' ? 'HOSPITAL' : 'STATE PARK'
    const sub = type === 'guide-green' ? 'DOWNTOWN 2 MILES' : type === 'service-blue' ? 'GAS • FOOD' : 'RECREATION AREA'
    return <div role="img" aria-label={alt} className={`${square} ${bg} flex flex-col items-center justify-center rounded-md border-4 border-white px-3 text-center font-black text-white shadow`}><span className="text-2xl">{title}</span><span className="mt-3 text-sm">{sub}</span></div>
  }

  if (type === 'curb-red' || type === 'curb-white' || type === 'curb-blue') {
    const curb = type === 'curb-red' ? 'bg-red-600' : type === 'curb-blue' ? 'bg-blue-600' : 'bg-white'
    const label = type === 'curb-red' ? 'NO STOPPING' : type === 'curb-blue' ? 'ACCESSIBLE' : 'PASSENGER LOADING'
    return <RoadPanel large={large} alt={alt}><div className="absolute inset-x-0 top-0 h-1/3 bg-slate-300"/><div className={`absolute inset-x-0 top-1/3 h-5 ${curb} border-y-2 border-slate-900`}/><div className="absolute inset-x-0 bottom-8 text-center text-sm font-black tracking-wide text-white">{label}</div><div className="absolute left-1/2 top-[55%] h-24 w-1 -translate-x-1/2 bg-white"/></RoadPanel>
  }

  if (type === 'lane-only') return <RoadPanel large={large} alt={alt}><div className="absolute left-1/2 top-3 h-24 w-2 -translate-x-1/2 bg-white"/><div className="absolute left-1/2 top-2 -translate-x-1/2 text-5xl font-black text-white">↑</div><div className="absolute inset-x-0 bottom-5 text-center text-2xl font-black text-white">ONLY</div></RoadPanel>
  if (type === 'yellow-lines') return <RoadPanel large={large} alt={alt}><div className="absolute left-[42%] top-0 h-full w-2 bg-yellow-400"/><div className="absolute left-[58%] top-0 h-full w-2 bg-[repeating-linear-gradient(to_bottom,#facc15_0_22px,transparent_22px_42px)]"/><div className="absolute bottom-2 left-3 text-xs font-bold text-white">实线</div><div className="absolute bottom-2 right-3 text-xs font-bold text-white">虚线</div></RoadPanel>
  return <RoadPanel large={large} alt={alt}><div className="absolute left-[47%] top-0 h-full w-2 -translate-x-2 bg-yellow-400"/><div className="absolute left-[53%] top-0 h-full w-2 translate-x-2 bg-yellow-400"/><div className="absolute inset-x-0 bottom-3 text-center text-xs font-bold text-white">双黄线 · 道路分隔示意</div></RoadPanel>
}

export default function QuestionSignImage({ question, stateSlug, large = false }: { question: DmvQuestion; stateSlug?: string; large?: boolean }) {
  const pathname = usePathname()
  const effectiveStateSlug = stateSlug ?? pathname.split('/').filter(Boolean)[0]
  if (effectiveStateSlug !== 'california') return null

  const sign = getQuestionSignMeta(question)
  if (!sign) return null

  return (
    <figure className="mt-4 flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-4">
      {sign.imageUrl ? (
        <img src={sign.imageUrl} alt={sign.alt} loading="lazy" referrerPolicy="no-referrer" className={`object-contain ${large ? 'h-48 w-48 md:h-56 md:w-56' : 'h-36 w-36 md:h-40 md:w-40'}`} />
      ) : sign.visual ? (
        <ExampleVisual type={sign.visual} large={large} alt={sign.alt} />
      ) : null}
      <figcaption className="mt-2 text-center text-xs font-semibold text-slate-500">
        {sign.source === 'California DMV' ? 'California DMV 官方图' : '学习示例（非官方原图）'}{sign.code ? ` · ${sign.code}` : ''}
      </figcaption>
      {sign.note ? <p className="mt-1 max-w-xl text-center text-xs text-slate-500">{sign.note}</p> : null}
    </figure>
  )
}
