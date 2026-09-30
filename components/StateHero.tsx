import { ShieldCheck } from 'lucide-react'
import type { DmvState } from '@/lib/dmv-data'

type Props = {
  state: DmvState
  basePath?: string
  title?: string
  summary?: string
  examRule?: string
  passRule?: string
  examButtonLabel?: string
}

export default function StateHero({ state, title, summary: summaryOverride }: Props) {
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isWashington = state.slug === 'washington'
  const isTexas = state.slug === 'texas'
  const summary = summaryOverride ?? (isCalifornia ? '面向准备 California Class C 知识考试的用户，提供中文、English 和中英对照题库、模拟考试、错题复习与官方学习入口。' : isPennsylvania ? '面向准备 Pennsylvania PennDOT Knowledge Test 的用户，提供驾照题库、18 题模拟考试、交通标志和错题复习。' : isMassachusetts ? '面向准备 Massachusetts RMV Class D learner’s permit exam 的用户，提供中文 / English / 中英对照题库、25 题模拟考试、交通标志和错题复习。' : isWashington ? '面向准备 Washington DOL Driving Knowledge Exam 的用户，提供中文 / English / 中英对照题库、40 题模拟考试、交通标志和错题复习。' : isTexas ? '面向准备 Texas DPS Knowledge Test 的用户，提供中文 / English / 中英对照学习题库、30 题模拟练习、交通标志和英文考试关键词。' : state.summary)

  return <section className="bg-slate-950 text-white"><div className="page-shell py-8 md:py-10"><p className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-cyan-100"><ShieldCheck size={16} className="mr-1.5" />{state.nameEn} · {state.code}</p><h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{title ?? `${state.nameZh} DMV 驾照题库`}</h1><p className="mt-3 max-w-3xl text-base leading-7 text-slate-200">{summary}</p></div></section>
}
