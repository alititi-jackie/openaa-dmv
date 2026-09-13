'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export default function ShareButton({ title, text, className = '' }: { title: string; text?: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      } catch {}
    }
  }

  return (
    <button type="button" onClick={share} className={`focus-ring inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50 ${className}`} aria-label={`分享${title}`}>
      {copied ? <Check size={16} className="mr-1.5 text-green-700" /> : <Share2 size={16} className="mr-1.5" />}
      {copied ? '链接已复制' : '分享'}
    </button>
  )
}
