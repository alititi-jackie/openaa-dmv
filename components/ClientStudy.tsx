'use client'

import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

// Local learning state is read only after hydration; server and first client render match.
export default function ClientStudy({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const ready = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  return ready ? children : fallback ?? <p role="status" className="card p-4 text-sm text-slate-600">正在读取学习记录…</p>
}
