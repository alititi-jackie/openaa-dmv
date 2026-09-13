'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react'

type SignId = 'stop' | 'yield' | 'do-not-enter' | 'wrong-way' | 'no-u-turn' | 'railroad' | 'school'

type SignItem = {
  id: SignId
  name: string
  english: string
  meaning: string
  tip: string
  imageUrl: string
}

const signs: SignItem[] = [
  {
    id: 'stop',
    name: '停车',
    english: 'STOP',
    meaning: '必须完全停车，确认路口安全后再通行。',
    tip: '红色八角形。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_stopsign.gif',
  },
  {
    id: 'yield',
    name: '让行',
    english: 'YIELD',
    meaning: '减速并准备停车，让有优先权的车辆、行人或自行车先行。',
    tip: '红白倒三角形。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_yieldsign.gif',
  },
  {
    id: 'do-not-enter',
    name: '禁止驶入',
    english: 'DO NOT ENTER',
    meaning: '不得进入该道路或匝道。',
    tip: '常见于单行道反方向或高速出口。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/donotenter.png',
  },
  {
    id: 'wrong-way',
    name: '方向错误',
    english: 'WRONG WAY',
    meaning: '表示正在逆向进入道路，应在安全情况下停车并纠正方向。',
    tip: '看到此牌应立即意识到行驶方向错误。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/05/16_wrong_way_sign.gif',
  },
  {
    id: 'no-u-turn',
    name: '禁止掉头',
    english: 'NO U-TURN',
    meaning: '此处禁止进行 U 型掉头。',
    tip: '红色圆圈和斜杠表示禁止图中的动作。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/nouturn.png',
  },
  {
    id: 'railroad',
    name: '铁路道口',
    english: 'RAILROAD CROSSING',
    meaning: '前方铁路道口，减速、观察、听声并准备停车。',
    tip: '黄色圆形，黑色 X 和两个 R。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/railroad.png',
  },
  {
    id: 'school',
    name: '学校区域',
    english: 'SCHOOL',
    meaning: '接近学校或学生过街区域，应减速并特别注意儿童。',
    tip: '学校警告牌常用五边形。',
    imageUrl: 'https://qr.dmv.ca.gov/portal/uploads/2020/02/schoolzone.png',
  },
]

function OfficialSignImage({ sign, large = false }: { sign: SignItem; large?: boolean }) {
  return (
    <img
      src={sign.imageUrl}
      alt={`${sign.english} ${sign.name}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={`max-h-full max-w-full object-contain ${large ? 'h-48 w-48' : 'h-36 w-36'}`}
    />
  )
}

function buildChoices(index: number) {
  const correct = signs[index]
  const distractors = signs.filter((item) => item.id !== correct.id)
  const offset = index % distractors.length
  const rotated = [...distractors.slice(offset), ...distractors.slice(0, offset)]
  const options = [correct, rotated[0], rotated[2], rotated[4]]
  const shift = (index * 2 + 1) % options.length
  return [...options.slice(shift), ...options.slice(0, shift)]
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
          <button type="button" onClick={() => setMode('study')} className={`focus-ring rounded-md px-4 py-2 text-sm font-black ${mode === 'study' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>官方图形学习</button>
          <button type="button" onClick={() => setMode('quiz')} className={`focus-ring rounded-md px-4 py-2 text-sm font-black ${mode === 'quiz' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'}`}>官方图形识别测验</button>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          本区直接显示 California DMV 驾驶手册页面使用的交通标志图，不再使用本站自绘近似图。先记住形状、颜色和含义，再进入识图测验。
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          图像来源：California DMV Driver’s Handbook。正式规则及更多标志请同时参考 Caltrans CA MUTCD / Sign Charts。
        </p>
      </section>

      {mode === 'study' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((sign) => (
            <article key={sign.id} className="card p-4">
              <div className="flex min-h-44 items-center justify-center rounded-lg bg-white p-3"><OfficialSignImage sign={sign} /></div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-blue-700">{sign.english}</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">{sign.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{sign.meaning}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">记忆：{sign.tip}</p>
            </article>
          ))}
        </div>
      ) : finished ? (
        <section className="card p-6 text-center">
          <p className="text-sm font-bold text-teal-700">官方图形识别测验完成</p>
          <p className="mt-2 text-4xl font-black text-slate-950">{score} / {signs.length}</p>
          <p className="mt-2 text-sm text-slate-600">正确率 {Math.round((score / signs.length) * 100)}%</p>
          <button type="button" onClick={restart} className="focus-ring mt-5 inline-flex items-center rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white"><RotateCcw size={15} className="mr-1.5" />再测一次</button>
        </section>
      ) : (
        <section className="card p-5 md:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-teal-700">第 {quizIndex + 1} / {signs.length} 题</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">这个官方交通标志表示什么？</h2>
            </div>
            <p className="text-sm font-bold text-slate-500">得分 {score}</p>
          </div>
          <div className="mt-5 flex min-h-56 items-center justify-center rounded-xl bg-white p-5"><OfficialSignImage sign={current} large /></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {choices.map((choice) => {
              const correct = Boolean(selected) && choice.id === current.id
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
