import Link from 'next/link'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import ShareButton from '@/components/ShareButton'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function StateHero({ state }: { state: DmvState }) {
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isVerifiedState = isCalifornia || isPennsylvania || isMassachusetts
  const summary = isCalifornia
    ? '面向准备 California Class C 知识考试的用户，提供中文、English 和中英对照题库、模拟考试、错题复习与官方学习入口。'
    : isPennsylvania
      ? '面向准备 Pennsylvania PennDOT Knowledge Test 的中文用户，提供宾州专属考点、公共核心题、18 题模拟考试、交通标志和错题复习。'
      : isMassachusetts
        ? '面向准备 Massachusetts RMV Class D learner’s permit exam 的用户，提供麻州专属考点、中文 / English / 中英对照题库、25 题模拟考试、交通标志和错题复习。'
        : state.summary
  const examRule = isCalifornia
    ? 'California DMV 当前公布的知识考试通过标准为 80%。'
    : isPennsylvania
      ? 'PennDOT Knowledge Test 共 18 题。'
      : isMassachusetts
        ? 'Massachusetts RMV Class D Permit Exam 共 25 题，考试时间 25 分钟。'
        : state.examRule
  const passRule = isCalifornia
    ? '本站 36 题和 46 题模式仅参考历史题量用于练习；正式考试题量、申请类型和考试安排以 California DMV 当日规定为准。'
    : isPennsylvania
      ? '至少答对 15 题通过；本站模拟考试按 18 题 / 15 题及格标准组卷。'
      : isMassachusetts
        ? '至少答对 18 题通过；官方考试提供简体中文、繁体中文和 English 等多种语言。'
        : state.passRule

  return <section className="bg-slate-950 text-white"><div className="page-shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><div><p className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-cyan-100"><ShieldCheck size={16} className="mr-1.5" />{state.nameEn} · {state.code}</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{state.nameZh} DMV 题库</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{summary}</p><div className="mt-6 flex flex-wrap gap-3"><Link href={`/${state.slug}/${isVerifiedState ? 'mock-test' : 'practice'}`} className="focus-ring inline-flex items-center rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-cyan-300">{isVerifiedState ? '开始模拟考试' : '开始练习'}<ArrowRight size={16} className="ml-1.5" /></Link>{isVerifiedState ? <Link href={`/${state.slug}/questions`} className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">先刷 DMV 题库</Link> : null}<a href={state.officialUrl} className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">官方 DMV<ExternalLink size={16} className="ml-1.5" /></a><ShareButton title={`${state.nameZh} DMV 题库`} text={`${state.nameZh} DMV 驾照笔试题库、模拟考试和交通标志练习`} className="border-white/20 bg-white/10 text-white hover:bg-white/15" /></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-lg border border-white/15 bg-white/8 p-4"><p className="text-sm font-bold text-cyan-100">考试提醒</p><p className="mt-2 text-sm leading-6 text-slate-200">{examRule}</p><p className="mt-2 text-sm leading-6 text-slate-200">{passRule}</p></div>{!isCalifornia ? <div className="rounded-lg border border-white/15 bg-white/8 p-4"><p className="text-sm font-bold text-cyan-100">本州工具</p><div className="mt-3 grid grid-cols-2 gap-2">{dmvTools.map((tool) => <Link key={tool.href} href={`/${state.slug}/${tool.href}`} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">{tool.title === '中文题库' ? 'DMV 题库' : tool.title}</Link>)}</div></div> : null}</div></div></section>
}
