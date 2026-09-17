'use client'

import { useEffect, useState } from 'react'
import { Check, Download, Share } from 'lucide-react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallAppButton({ className = '' }: { className?: string }) {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [isAppleMobile, setIsAppleMobile] = useState(false)

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
      setInstalled(standalone)
      setIsAppleMobile(/iphone|ipad|ipod/i.test(navigator.userAgent))
    })

    function capturePrompt(event: Event) {
      event.preventDefault()
      setPromptEvent(event as InstallPromptEvent)
    }
    function markInstalled() {
      setInstalled(true)
      setPromptEvent(null)
      setShowHelp(false)
    }
    window.addEventListener('beforeinstallprompt', capturePrompt)
    window.addEventListener('appinstalled', markInstalled)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('beforeinstallprompt', capturePrompt)
      window.removeEventListener('appinstalled', markInstalled)
    }
  }, [])

  async function install() {
    if (installed) return
    if (!promptEvent) {
      setShowHelp(true)
      return
    }
    await promptEvent.prompt()
    const choice = await promptEvent.userChoice
    if (choice.outcome === 'accepted') setInstalled(true)
    setPromptEvent(null)
  }

  return (
    <>
      <button type="button" onClick={install} disabled={installed} className={`focus-ring inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-default disabled:bg-white/10 ${className}`}>
        {installed ? <Check size={16} className="mr-1.5" /> : <Download size={16} className="mr-1.5" />}
        {installed ? '已添加到桌面' : '下载到桌面练习'}
      </button>

      {showHelp ? (
        <div role="dialog" aria-modal="true" aria-labelledby="install-help-title" className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center" onClick={() => setShowHelp(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-5 text-slate-950 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start gap-3">
              <span className="rounded-lg bg-blue-50 p-2 text-blue-700"><Share size={20} /></span>
              <div>
                <h2 id="install-help-title" className="text-lg font-black">添加到桌面练习</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{isAppleMobile ? '请点击浏览器底部的“分享”按钮，然后选择“添加到主屏幕”。' : '请打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。'}</p>
                <p className="mt-2 text-xs leading-5 text-slate-500">添加后可像 App 一样从桌面打开；题库和模拟考试仍需联网使用。</p>
              </div>
            </div>
            <button type="button" onClick={() => setShowHelp(false)} className="focus-ring mt-5 w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-black text-white hover:bg-blue-800">知道了</button>
          </div>
        </div>
      ) : null}
    </>
  )
}
