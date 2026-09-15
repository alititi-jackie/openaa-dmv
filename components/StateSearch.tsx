'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { DmvState } from '@/lib/dmv-data'
import { getStateQuestionCount } from '@/lib/state-question-bank'

export default function StateSearch({ states }: { states: DmvState[] }) {
  const [query, setQuery] = useState('')
  const filteredStates = useMemo(() => { const keyword=query.trim().toLowerCase(); if(!keyword) return states; return states.filter((state)=>[state.nameZh,state.shortZh,state.nameEn,state.code,state.slug].some((value)=>value.toLowerCase().includes(keyword))) }, [query,states])

  return <section id="states" className="bg-white py-12"><div className="page-shell"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold text-teal-700">按州学习</p><h2 className="mt-2 text-3xl font-black text-slate-950">选择你的考试州</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">选择考试州，进入对应的驾照题库、练习模式、模拟考试和交通标志学习。多数已上线题库支持中文、English 和中英对照。</p></div><label className="relative block w-full md:w-80"><Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="搜索：加州、CA、Texas..." aria-label="搜索考试州" className="focus-ring h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900" /></label></div>

  <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filteredStates.map((state)=>{
    const isLive=state.status==='live'
    const isExternal=state.status==='external'
    const href=isExternal?state.externalUrl||'/':`/${state.slug}`
    const actualCount=isLive?getStateQuestionCount(state.slug):state.questionCount
    const statusText=isLive?`${actualCount} 题 · 已上线`:isExternal?`${state.questionCount}+ 题 · 已上线`:'即将上线'
    const summary=isExternal?'纽约 DMV 驾照题库已在 OpenAA 主站上线，提供题库练习、模拟考试、交通标志和错题复习。':state.summary

    if (isExternal) {
      return <div key={state.slug} className="card flex h-full min-h-44 flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:border-slate-300">
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-black text-slate-950">{state.nameZh}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{state.nameEn} · {state.code}</p></div><span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{statusText}</span></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p>
        </div>
        <div className="grid grid-cols-2 gap-px border-t border-blue-100 bg-blue-100">
          <a href={href} className="focus-ring inline-flex min-h-14 items-center justify-center bg-blue-50 px-3 py-3 text-center text-sm font-bold text-blue-700 hover:bg-blue-100">进入中文题库<ArrowRight size={15} className="ml-1.5 shrink-0" /></a>
          <Link href="/ny" className="focus-ring inline-flex min-h-14 items-center justify-center bg-sky-50 px-3 py-3 text-center text-sm font-bold text-blue-700 hover:bg-sky-100">English / 中英练习<ArrowRight size={15} className="ml-1.5 shrink-0" /></Link>
        </div>
      </div>
    }

    const card=<div className="card flex h-full min-h-36 flex-col justify-between p-4 transition hover:-translate-y-0.5 hover:border-slate-300"><div><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-black text-slate-950">{state.nameZh}</h3><p className="mt-1 text-sm font-semibold text-slate-500">{state.nameEn} · {state.code}</p></div><span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{statusText}</span></div><p className="mt-3 text-sm leading-6 text-slate-600">{summary}</p></div><span className="mt-4 inline-flex items-center text-sm font-bold text-blue-700">{isLive?'开始学习':'查看州信息'}<ArrowRight size={15} className="ml-1.5"/></span></div>
    return <Link key={state.slug} href={href} className="focus-ring block h-full rounded-md">{card}</Link>
  })}</div>

  {filteredStates.length===0?<div className="mt-7 rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">暂时没有找到这个州。我们会继续增加更多州的 DMV 驾照学习内容。</div>:null}</div></section>
}
