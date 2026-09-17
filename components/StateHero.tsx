import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import InstallAppButton from '@/components/InstallAppButton'
import ShareButton from '@/components/ShareButton'
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

export default function StateHero({ state, basePath = `/${state.slug}`, title, summary: summaryOverride, examRule: examRuleOverride, passRule: passRuleOverride, examButtonLabel = '开始模拟考试' }: Props) {
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isWashington = state.slug === 'washington'
  const isTexas = state.slug === 'texas'
  const summary = summaryOverride ?? (isCalifornia ? '面向准备 California Class C 知识考试的用户，提供中文、English 和中英对照题库、模拟考试、错题复习与官方学习入口。' : isPennsylvania ? '面向准备 Pennsylvania PennDOT Knowledge Test 的用户，提供驾照题库、18 题模拟考试、交通标志和错题复习。' : isMassachusetts ? '面向准备 Massachusetts RMV Class D learner’s permit exam 的用户，提供中文 / English / 中英对照题库、25 题模拟考试、交通标志和错题复习。' : isWashington ? '面向准备 Washington DOL Driving Knowledge Exam 的用户，提供中文 / English / 中英对照题库、40 题模拟考试、交通标志和错题复习。' : isTexas ? '面向准备 Texas DPS Knowledge Test 的用户，提供中文 / English / 中英对照学习题库、30 题模拟练习、交通标志和英文考试关键词。' : state.summary)
  const examRule = examRuleOverride ?? (isCalifornia ? 'California DMV 当前公布的知识考试通过标准为 80%。' : isPennsylvania ? 'PennDOT Knowledge Test 共 18 题。' : isMassachusetts ? 'Massachusetts RMV Class D Permit Exam 共 25 题，考试时间 25 分钟。' : isWashington ? 'Washington DOL Driving Knowledge Exam 共 40 题。' : isTexas ? 'Texas DPS 当前官方明确公布：Knowledge Exam 至少达到 70% 才通过。' : state.examRule)
  const passRule = passRuleOverride ?? (isCalifornia ? '本站 36 题和 46 题模式仅参考历史题量用于练习；正式考试题量、申请类型和考试安排以 California DMV 当日规定为准。' : isPennsylvania ? '至少答对 15 题通过；本站模拟考试按 18 题 / 15 题及格标准组卷。' : isMassachusetts ? '至少答对 18 题通过；官方考试提供简体中文、繁体中文和 English 等多种语言。' : isWashington ? '至少答对 32 题通过；及格成绩有效 2 年，官方考试支持简体中文、繁体中文和 English 等语言。' : isTexas ? '重要：普通非商业驾照正式 Knowledge Test 当前仅提供 English 或 Spanish，不提供中文。本站 30 题模式仅用于练习。' : state.passRule)

  return <section className="bg-slate-950 text-white"><div className="page-shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><div><p className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-cyan-100"><ShieldCheck size={16} className="mr-1.5" />{state.nameEn} · {state.code}</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{title ?? `${state.nameZh} DMV 驾照题库`}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{summary}</p><div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3"><Link href={`${basePath}/mock-test`} className="focus-ring inline-flex items-center justify-center rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-cyan-300">{examButtonLabel}<ArrowRight size={16} className="ml-1.5" /></Link><InstallAppButton /><ShareButton title={`${state.nameZh} DMV 驾照题库`} text={`${state.nameZh} DMV 驾照笔试题库、模拟考试和交通标志练习`} className="border-white/20 bg-white/10 text-white hover:bg-white/15" /></div></div><div className="rounded-lg border border-white/15 bg-white/8 p-4"><p className="text-sm font-bold text-cyan-100">考试提醒</p><p className="mt-2 text-sm leading-6 text-slate-200">{examRule}</p><p className="mt-2 text-sm leading-6 text-slate-200">{passRule}</p></div></div></section>
}
