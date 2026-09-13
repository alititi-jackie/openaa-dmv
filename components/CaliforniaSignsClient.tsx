'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'

type SignId =
  | 'stop'
  | 'yield'
  | 'do-not-enter'
  | 'wrong-way'
  | 'no-u-turn'
  | 'railroad'
  | 'school'
  | 'warning'
  | 'speed-limit'
  | 'pedestrian'
  | 'signal-ahead'
  | 'merge'

type SignItem = {
  id: SignId
  name: string
  english: string
  meaning: string
  tip: string
}

const signs: SignItem[] = [
  { id: 'stop', name: '停车', english: 'STOP', meaning: '必须完全停车，确认路口安全后再通行。', tip: '红色八角形是最容易通过形状直接识别的标志之一。' },
  { id: 'yield', name: '让行', english: 'YIELD', meaning: '减速并准备停车，让有优先权的车辆、行人或自行车先行。', tip: '红白倒三角形表示让行。' },
  { id: 'do-not-enter', name: '禁止驶入', english: 'DO NOT ENTER', meaning: '不得进入该道路或匝道。', tip: '常见于单行道反方向或高速出口。' },
  { id: 'wrong-way', name: '方向错误', english: 'WRONG WAY', meaning: '你正在逆向进入道路，应在安全情况下停车并纠正方向。', tip: '看到此牌应立即意识到行驶方向错误。' },
  { id: 'no-u-turn', name: '禁止掉头', english: 'NO U-TURN', meaning: '此处禁止进行 U 型掉头。', tip: '红色圆圈加斜杠表示禁止图中的动作。' },
  { id: 'railroad', name: '铁路道口', english: 'RAILROAD CROSSING', meaning: '前方铁路道口，减速、观察、听声并准备停车。', tip: '黄色圆形铁路预警牌常带 X 和两个 R。' },
  { id: 'school', name: '学校区域', english: 'SCHOOL', meaning: '接近学校或学生过街区域，应减速并特别注意儿童。', tip: '学校警告牌常用五边形。' },
  { id: 'warning', name: '一般警告', english: 'WARNING', meaning: '前方存在道路条件变化或潜在危险。', tip: '黄色菱形通常用于弯道、路口、路窄等警告。' },
  { id: 'speed-limit', name: '限速', english: 'SPEED LIMIT', meaning: '表示该路段法定最高限速。', tip: '白底黑字矩形属于法规标志。' },
  { id: 'pedestrian', name: '行人过街', english: 'PEDESTRIAN CROSSING', meaning: '前方可能有行人过街，应减速并准备让行。', tip: '黄色警告牌内有人形图案。' },
  { id: 'signal-ahead', name: '前方信号灯', english: 'SIGNAL AHEAD', meaning: '前方有交通信号灯，应提前观察并准备减速停车。', tip: '黄色菱形中出现红黄绿信号灯图案。' },
  { id: 'merge', name: '车流汇入', english: 'MERGING TRAFFIC', meaning: '前方有车道或车流汇入，应观察旁侧车辆并调整速度。', tip: '黄色菱形内常用主线和斜向支线表示汇入。' },
]

function SignVisual({ id, size = 150 }: { id: SignId; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 160 160', role: 'img' as const, 'aria-label': id }

  if (id === 'stop') {
    return <svg {...common}><polygon points="50,10 110,10 150,50 150,110 110,150 50,150 10,110 10,50" fill="#c81e1e" stroke="white" strokeWidth="7"/><text x="80" y="92" textAnchor="middle" fontSize="36" fontWeight="900" fill="white">STOP</text></svg>
  }
  if (id === 'yield') {
    return <svg {...common}><polygon points="80,145 12,22 148,22" fill="white" stroke="#c81e1e" strokeWidth="10"/><text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="900" fill="#b91c1c">YIELD</text></svg>
  }
  if (id === 'do-not-enter') {
    return <svg {...common}><circle cx="80" cy="80" r="63" fill="#c81e1e"/><rect x="28" y="68" width="104" height="24" rx="3" fill="white"/><text x="80" y="122" textAnchor="middle" fontSize="13" fontWeight="900" fill="white">DO NOT ENTER</text></svg>
  }
  if (id === 'wrong-way') {
    return <svg {...common}><rect x="12" y="34" width="136" height="92" rx="7" fill="#c81e1e" stroke="white" strokeWidth="5"/><text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="900" fill="white">WRONG</text><text x="80" y="102" textAnchor="middle" fontSize="22" fontWeight="900" fill="white">WAY</text></svg>
  }
  if (id === 'no-u-turn') {
    return <svg {...common}><rect x="16" y="16" width="128" height="128" rx="8" fill="white" stroke="#111827" strokeWidth="3"/><path d="M98 105V69c0-20-12-31-30-31-18 0-30 12-30 30" fill="none" stroke="#111827" strokeWidth="10" strokeLinecap="round"/><path d="M27 57l11 14 13-12" fill="none" stroke="#111827" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="80" cy="80" r="54" fill="none" stroke="#dc2626" strokeWidth="9"/><line x1="42" y1="118" x2="118" y2="42" stroke="#dc2626" strokeWidth="10"/></svg>
  }
  if (id === 'railroad') {
    return <svg {...common}><circle cx="80" cy="80" r="64" fill="#facc15" stroke="#111827" strokeWidth="4"/><line x1="42" y1="42" x2="118" y2="118" stroke="#111827" strokeWidth="8"/><line x1="118" y1="42" x2="42" y2="118" stroke="#111827" strokeWidth="8"/><text x="48" y="88" fontSize="30" fontWeight="900" fill="#111827">R</text><text x="94" y="88" fontSize="30" fontWeight="900" fill="#111827">R</text></svg>
  }
  if (id === 'school') {
    return <svg {...common}><polygon points="80,10 145,55 120,145 40,145 15,55" fill="#facc15" stroke="#111827" strokeWidth="4"/><circle cx="65" cy="63" r="8" fill="#111827"/><circle cx="94" cy="58" r="8" fill="#111827"/><path d="M65 72l-12 28m12-28 15 23m-20-6 22 0M94 67l-11 31m11-31 15 25m-19-5 24 0" stroke="#111827" strokeWidth="7" strokeLinecap="round"/></svg>
  }
  if (id === 'warning') {
    return <svg {...common}><rect x="31" y="31" width="98" height="98" rx="7" transform="rotate(45 80 80)" fill="#facc15" stroke="#111827" strokeWidth="4"/><text x="80" y="95" textAnchor="middle" fontSize="54" fontWeight="900" fill="#111827">!</text></svg>
  }
  if (id === 'speed-limit') {
    return <svg {...common}><rect x="38" y="12" width="84" height="136" rx="5" fill="white" stroke="#111827" strokeWidth="4"/><text x="80" y="45" textAnchor="middle" fontSize="15" fontWeight="900" fill="#111827">SPEED</text><text x="80" y="65" textAnchor="middle" fontSize="15" fontWeight="900" fill="#111827">LIMIT</text><text x="80" y="119" textAnchor="middle" fontSize="48" fontWeight="900" fill="#111827">55</text></svg>
  }
  if (id === 'pedestrian') {
    return <svg {...common}><rect x="31" y="31" width="98" height="98" rx="7" transform="rotate(45 80 80)" fill="#facc15" stroke="#111827" strokeWidth="4"/><circle cx="80" cy="53" r="8" fill="#111827"/><path d="M80 63l-10 28m10-28 13 22m-19-7 18 0m-22 28 10-15m14 15-8-20" stroke="#111827" strokeWidth="7" strokeLinecap="round"/></svg>
  }
  if (id === 'signal-ahead') {
    return <svg {...common}><rect x="31" y="31" width="98" height="98" rx="7" transform="rotate(45 80 80)" fill="#facc15" stroke="#111827" strokeWidth="4"/><rect x="62" y="39" width="36" height="82" rx="8" fill="#111827"/><circle cx="80" cy="58" r="9" fill="#dc2626"/><circle cx="80" cy="80" r="9" fill="#facc15"/><circle cx="80" cy="102" r="9" fill="#16a34a"/></svg>
  }
  return <svg {...common}><rect x="31" y="31" width="98" height="98" rx="7" transform="rotate(45 80 80)" fill="#facc15" stroke="#111827" strokeWidth="4"/><path d="M57 116V47M104 116V83c0-13-8-22-22-22H73" fill="none" stroke="#111827" strokeWidth="9" strokeLinecap="round"/><path d="M73 61l12-10m-12 10 12 10" fill="none" stroke="#111827" strokeWidth="7" strokeLinecap="round"/></svg>
}

function buildChoices(index: number) {
  const correct = signs[index]
  const distractors = signs.filter((item) => item.id !== correct.id)
  const picks = [
    distractors[(index * 3 + 1) % distractors.length],
    distractors[(index * 5 + 4) % distractors.length],
    distractors[(index * 7 + 6) % distractors.length],
  ]
  return [correct, ...picks].sort((a, b) => ((a.id.charCodeAt(0) + index * 11) % 17) - ((b.id.charCodeAt(0) + index * 11) % 17))
}

export default function CaliforniaSignsClient() {
  const [mode, setMode] = useState<'study' | 'quiz'>('study')
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = signs[quizIndex]
  const choices = useMemo(() => buildChoices(quizIndex), [quizIndex])

  function answer(id: string) {
    if (selected) return
    setSelected(id)
    if (id === current.id) setScore((value) => value + 1)
  }

  function next() {
    if (quizIndex >= signs.length - 1) {
      setFinished(true)
      return
    }
    setQuizIndex((value) => value + 1)
    setSelected(null)
  }

  function restart() {
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <div className="grid gap-6">
      <section className="card p-4 md:p-5">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setMode('study')} className={`focus-ring rounded-md px-4 py-2 text-sm font-black ${mode === 'study' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>图形学习</button>
          <button type="button" onClick={() => setMode('quiz')} className={`focus-ring rounded-md px-4 py-2 text-sm font-black ${mode === 'quiz' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>图形识别测验</button>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">先记住形状、颜色和含义，再进入识图测验。图形为站内自绘学习示意，正式标志样式与规定以 California DMV / Caltrans 为准。</p>
      </section>

      {mode === 'study' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((sign) => (
            <article key={sign.id} className="card p-4">
              <div className="flex min-h-44 items-center justify-center rounded-lg bg-slate-50 p-3"><SignVisual id={sign.id} /></div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-blue-700">{sign.english}</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">{sign.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{sign.meaning}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">记忆：{sign.tip}</p>
            </article>
          ))}
        </div>
      ) : finished ? (
        <section className="card p-6 text-center">
          <p className="text-sm font-bold text-teal-700">图形识别测验完成</p>
          <p className="mt-2 text-4xl font-black text-slate-950">{score} / {signs.length}</p>
          <p className="mt-2 text-sm text-slate-600">正确率 {Math.round((score / signs.length) * 100)}%</p>
          <button type="button" onClick={restart} className="focus-ring mt-5 inline-flex items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white"><RotateCcw size={15} className="mr-1.5" />再测一次</button>
        </section>
      ) : (
        <section className="card p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-teal-700">第 {quizIndex + 1} / {signs.length} 题</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">这个交通标志表示什么？</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">得分 {score}</p>
          </div>
          <div className="mt-5 flex min-h-56 items-center justify-center rounded-xl bg-slate-50 p-5"><SignVisual id={current.id} size={190} /></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {choices.map((choice) => {
              const correct = selected && choice.id === current.id
              const wrong = selected === choice.id && choice.id !== current.id
              return (
                <button key={choice.id} type="button" onClick={() => answer(choice.id)} disabled={Boolean(selected)} className={`focus-ring flex items-center justify-between rounded-md border p-3 text-left text-sm font-bold ${correct ? 'border-green-300 bg-green-50 text-green-900' : wrong ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-slate-200 bg-white text-slate-800'}`}>
                  <span>{choice.name}</span>
                  {correct ? <CheckCircle2 size={18} /> : wrong ? <XCircle size={18} /> : null}
                </button>
              )
            })}
          </div>
          {selected ? (
            <div className="mt-4 rounded-md bg-slate-100 p-4">
              <p className="text-sm font-black text-slate-900">{current.name} · {current.english}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{current.meaning}</p>
              <button type="button" onClick={next} className="focus-ring mt-3 rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">{quizIndex === signs.length - 1 ? '查看成绩' : '下一题'}</button>
            </div>
          ) : null}
        </section>
      )}
    </div>
  )
}
