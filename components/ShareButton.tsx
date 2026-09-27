'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'

export default function ShareButton({ title, text, className = '', iconOnly = false }: { title: string; text?: string; className?: string; iconOnly?: boolean }) {
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
    <button type="button" onClick={share} className={`focus-ring inline-flex items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-black text-slate-700 transition hover:bg-slate-50 ${iconOnly ? 'h-10 w-10 shrink-0' : 'px-4 py-2.5'} ${className}`} aria-label={copied ? '链接已复制' : `分享${title}`} title={copied ? '链接已复制' : '分享'}>
      {copied ? <Check size={17} className="text-green-700" /> : <Share2 size={17} className={iconOnly ? '' : 'mr-1.5'} />}
      {iconOnly ? <span className="sr-only" aria-live="polite">{copied ? '链接已复制' : '分享'}</span> : copied ? '链接已复制' : '分享'}
    </button>
  )
}
