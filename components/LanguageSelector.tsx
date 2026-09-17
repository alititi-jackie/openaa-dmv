'use client'

import { Languages } from 'lucide-react'
import type { DmvLanguage } from '@/lib/dmv-language'

const LABELS: Record<DmvLanguage, string> = { zh: '中文', en: 'English', bilingual: '中英对照' }

type Props = {
  language: DmvLanguage
  onChange: (language: DmvLanguage) => void
  englishCount: number
  total: number
  allowedLanguages?: DmvLanguage[]
  label?: string
}

export default function LanguageSelector({ language, onChange, englishCount, total, allowedLanguages = ['zh', 'en', 'bilingual'], label = '题目语言' }: Props) {
  const hasEnglish = englishCount > 0
  return (
    <section className="card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="inline-flex items-center text-sm font-black text-slate-950"><Languages size={16} className="mr-1.5 text-blue-700" />{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{hasEnglish ? `英文内容已覆盖 ${englishCount}/${total} 题；未覆盖题会自动显示中文。` : '英文内容正在准备中，当前使用中文。'}</p>
        </div>
        <div className="grid rounded-lg bg-slate-100 p-1 sm:w-72" style={{ gridTemplateColumns: `repeat(${allowedLanguages.length}, minmax(0, 1fr))` }}>
          {allowedLanguages.map((value) => {
            const disabled = value !== 'zh' && !hasEnglish
            return <button key={value} type="button" disabled={disabled} onClick={() => onChange(value)} className={`focus-ring rounded-md px-2 py-2 text-xs font-black disabled:cursor-not-allowed disabled:opacity-40 ${language === value ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600'}`}>{LABELS[value]}</button>
          })}
        </div>
      </div>
    </section>
  )
}
