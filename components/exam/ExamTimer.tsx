'use client'

import { useEffect, useState } from 'react'

export default function ExamTimer({ minutes, startedAt, finishedAt }: { minutes: number; startedAt: number; finishedAt?: number }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    if (finishedAt !== undefined) return
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [finishedAt])
  const remaining = Math.max(0, Math.ceil((startedAt + minutes * 60000 - (finishedAt ?? now)) / 1000))
  const mm = Math.floor(remaining / 60).toString().padStart(2, '0')
  const ss = (remaining % 60).toString().padStart(2, '0')
  return <section className="rounded-lg border border-blue-200 bg-blue-50 p-4"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black text-slate-950">考试倒计时{finishedAt !== undefined ? '（已停止）' : ''}</p><p className="mt-1 text-xs leading-5 text-slate-600">本模式计时 {minutes} 分钟，用于训练考试节奏；刷新继续考试会保留已用时间。</p></div><div className="rounded-md bg-white px-4 py-2 font-mono text-2xl font-black text-blue-800">{mm}:{ss}</div></div>{remaining === 0 ? <p className="mt-3 text-sm font-bold text-amber-900">模拟时间已到，仍可完成本次练习。重新组卷后重新计时。</p> : null}</section>
}
