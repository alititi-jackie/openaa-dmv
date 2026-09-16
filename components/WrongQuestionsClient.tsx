'use client'

import { browserStorage } from '@/lib/browser-storage'

import { useCallback, useMemo, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import QuestionsClient from './QuestionsClient'
import type { DmvQuestion } from '@/lib/dmv-data'

function parseWrongIds(raw: string) {
  try {
    const value = JSON.parse(raw)
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

export default function WrongQuestionsClient({ questions, stateSlug, storageKey }: { questions: DmvQuestion[]; stateSlug: string; storageKey: string }) {
  const subscribe = useCallback((refresh: () => void) => {
    function handleStorage(event: StorageEvent) {
      if (!event.key || event.key === storageKey) refresh()
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('openaa-dmv-wrong-update', refresh)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('openaa-dmv-wrong-update', refresh)
    }
  }, [storageKey])
  const getSnapshot = useCallback(() => browserStorage.getItem(storageKey) || '[]', [storageKey])
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => '[]')
  const wrongIds = useMemo(() => parseWrongIds(raw), [raw])

  const wrongQuestions = useMemo(() => questions.filter((question) => wrongIds.includes(question.id)), [questions, wrongIds])

  function clearWrongQuestions() {
    browserStorage.setItem(storageKey, JSON.stringify([]))
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
  }

  if (wrongQuestions.length === 0) {
    return <div className="card p-6 text-center"><h1 className="text-2xl font-black text-slate-950">待复习错题已经清空</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">练习或模拟考试中答错的题会自动进入这里；重新答对后可标记“已会了”，题目会从待复习错题中移除。</p><Link href={`/${stateSlug}/practice`} className="focus-ring mt-5 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">去练习</Link></div>
  }

  return <div><div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-black text-amber-950">待复习错题 {wrongQuestions.length} 道</p><p className="mt-1 text-xs leading-5 text-amber-900">重新答对后点击“已会了，从错题中移除”，只保留真正还没掌握的题。</p></div><button type="button" onClick={clearWrongQuestions} className="focus-ring inline-flex shrink-0 items-center rounded-md border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-700"><Trash2 size={15} className="mr-1.5" />清空</button></div></div><QuestionsClient questions={wrongQuestions} storageKey={storageKey} stateSlug={stateSlug} removeFromWrongOnMastery /></div>
}
