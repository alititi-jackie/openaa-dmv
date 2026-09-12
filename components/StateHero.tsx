import Link from 'next/link'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function StateHero({ state }: { state: DmvState }) {
  return (
    <section className="bg-slate-950 text-white">
      <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-cyan-100">
            <ShieldCheck size={16} className="mr-1.5" />
            {state.nameEn} · {state.code}
          </p>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{state.nameZh} DMV 中文题库</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{state.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${state.slug}/practice`} className="focus-ring inline-flex items-center rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-cyan-300">
              开始练习
              <ArrowRight size={16} className="ml-1.5" />
            </Link>
            <a href={state.officialUrl} className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
              官方 DMV
              <ExternalLink size={16} className="ml-1.5" />
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-lg border border-white/15 bg-white/8 p-4">
            <p className="text-sm font-bold text-cyan-100">考试提醒</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{state.examRule}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{state.passRule}</p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/8 p-4">
            <p className="text-sm font-bold text-cyan-100">本州工具</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {dmvTools.map((tool) => (
                <Link key={tool.href} href={`/${state.slug}/${tool.href}`} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">
                  {tool.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
