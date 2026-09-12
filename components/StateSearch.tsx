'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Search } from 'lucide-react'
import type { DmvState } from '@/lib/dmv-data'

export default function StateSearch({ states }: { states: DmvState[] }) {
  const [query, setQuery] = useState('')

  const filteredStates = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return states
    return states.filter((state) =>
      [state.nameZh, state.shortZh, state.nameEn, state.code, state.slug].some((value) => value.toLowerCase().includes(keyword))
    )
  }, [query, states])

  return (
    <section id="states" className="bg-white py-12">
      <div className="page-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-teal-700">Choose your state</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">选择你的考试州</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              已上线的州可以直接练习；准备中的州先提供官方入口，题库完成后再开放。
            </p>
          </div>
          <label className="relative block w-full md:w-80">
            <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索州名或缩写"
              className="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900"
            />
          </label>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStates.map((state) => {
            const isExternal = state.status === 'external'
            const href = isExternal ? state.externalUrl || '/' : `/${state.slug}`
            const statusText =
              state.status === 'live' ? `${state.questionCount} 题 · 已上线` : state.status === 'external' ? '主站承接' : '题库准备中'
            const content = (
              <div className="card flex h-full min-h-36 flex-col justify-between p-4 transition hover:-translate-y-0.5 hover:border-slate-300">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">{state.nameZh}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{state.nameEn} · {state.code}</p>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{statusText}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{state.summary}</p>
                </div>
                <span className="mt-4 inline-flex items-center text-sm font-bold text-blue-700">
                  {state.status === 'live' ? '进入题库' : isExternal ? '去 OpenAA 主站' : '查看官方入口'}
                  {isExternal ? <ExternalLink size={15} className="ml-1.5" /> : <ArrowRight size={15} className="ml-1.5" />}
                </span>
              </div>
            )

            if (isExternal) {
              return (
                <a key={state.slug} href={href} className="focus-ring rounded-md">
                  {content}
                </a>
              )
            }

            return (
              <Link key={state.slug} href={href} className="focus-ring rounded-md">
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
