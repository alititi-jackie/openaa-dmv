'use client'

import { useMemo, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import QuestionsClient from './QuestionsClient'
import type { DmvQuestion } from '@/lib/dmv-data'

export default function WrongQuestionsClient({
  questions,
  stateSlug,
  storageKey,
}: {
  questions: DmvQuestion[]
  stateSlug: string
  storageKey: string
}) {
  const wrongIds = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange)
      window.addEventListener('openaa-dmv-wrong-update', onStoreChange)
      return () => {
        window.removeEventListener('storage', onStoreChange)
        window.removeEventListener('openaa-dmv-wrong-update', onStoreChange)
      }
    },
    () => JSON.parse(window.localStorage.getItem(storageKey) || '[]') as string[],
    () => []
  )

  const wrongQuestions = useMemo(() => questions.filter((question) => wrongIds.includes(question.id)), [questions, wrongIds])

  function clearWrongQuestions() {
    window.localStorage.setItem(storageKey, JSON.stringify([]))
    window.dispatchEvent(new Event('openaa-dmv-wrong-update'))
  }

  if (wrongQuestions.length === 0) {
    return (
      <div className="card p-6 text-center">
        <h1 className="text-2xl font-black text-slate-950">错题本是空的</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">练习或模拟考试中答错的题会自动保存在这台设备上。</p>
        <Link href={`/${stateSlug}/practice`} className="focus-ring mt-5 inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">
          去练习
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-slate-700">共 {wrongQuestions.length} 道错题</p>
        <button type="button" onClick={clearWrongQuestions} className="focus-ring inline-flex items-center rounded-md border border-rose-200 bg-white px-3 py-2 text-sm font-bold text-rose-700">
          <Trash2 size={15} className="mr-1.5" />
          清空
        </button>
      </div>
      <QuestionsClient questions={wrongQuestions} storageKey={storageKey} />
    </div>
  )
}
