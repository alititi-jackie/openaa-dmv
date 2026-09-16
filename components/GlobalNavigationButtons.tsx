'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowUp } from 'lucide-react'

export default function GlobalNavigationButtons() {
  const router = useRouter()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2 md:bottom-6 md:right-6">
      {showTop && (
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:bg-slate-50" aria-label="返回顶部" title="返回顶部">
          <ArrowUp size={20} />
        </button>
      )}
      <button type="button" onClick={() => { if (window.history.length > 1) window.history.back(); else router.push('/') }} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:bg-slate-50" aria-label="返回上一页" title="返回上一页">
        <ArrowLeft size={20} />
      </button>
    </div>
  )
}
