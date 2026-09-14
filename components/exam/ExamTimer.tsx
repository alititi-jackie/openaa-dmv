'use client'

import { useEffect, useState } from 'react'

export default function ExamTimer({ minutes }: { minutes: number }) {
  const [remaining, setRemaining] = useState(minutes * 60)

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const mm = Math.floor(remaining / 60).toString().padStart(2, '0')
  const ss = (remaining % 60).toString().padStart(2, '0')
  const urgent = remaining <= 300

  return <section className={`mb-5 rounded-lg border p-4 ${urgent ? 'border-amber-300 bg-amber-50' : 'border-blue-200 bg-blue-50'}`}><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-black text-slate-950">考试倒计时</p><p className="mt-1 text-xs leading-5 text-slate-600">Massachusetts RMV 正式 Class D Permit Exam 限时 {minutes} 分钟。本站计时用于模拟真实考试节奏。</p></div><div className={`shrink-0 rounded-md bg-white px-4 py-2 font-mono text-2xl font-black ${urgent ? 'text-amber-800' : 'text-blue-800'}`}>{mm}:{ss}</div></div>{remaining === 0 ? <p className="mt-3 text-sm font-bold text-amber-900">模拟考试时间已到。请完成当前练习后重新组卷，继续训练时间控制。</p> : null}</section>
}
