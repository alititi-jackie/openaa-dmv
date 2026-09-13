import Link from 'next/link'
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import ShareButton from '@/components/ShareButton'
import { dmvTools, type DmvState } from '@/lib/dmv-data'

export default function StateHero({ state }: { state: DmvState }) {
  const isCalifornia = state.slug === 'california'
  const summary = isCalifornia
    ? '面向准备 California Class C 知识考试的用户，提供中文、English 和中英对照题库、模拟考试、错题复习与官方学习入口。'
    : state.summary
  const examRule = isCalifornia ? 'California DMV 当前公布的知识考试通过标准为 80%。' : state.examRule
  const passRule = isCalifornia
    ? '本站 36 题和 46 题模式仅参考历史题量用于练习；正式考试题量、申请类型和考试安排以 California DMV 当日规定为准。'
    : state.passRule

  return <section className="bg-slate-950 text-white"><div className="page-shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"><div><p className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-cyan-100"><ShieldCheck size={16} className="mr-1.5" />{state.nameEn} · {state.code}</p><h1 className="mt-4 text-4xl font-black leading-tight md:text-5xl">{state.nameZh} DMV 题库</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-200">{summary}</p><div className="mt-6 flex flex-wrap gap-3"><Link href={`/${state.slug}/${isCalifornia ? 'mock-test' : 'practice'}`} className="focus-ring inline-flex items-center rounded-md bg-cyan-400 px-4 py-2.5 text-sm font-black text-slate-950 hover:bg-cyan-300">{isCalifornia ? '开始模拟考试' : '开始练习'}<ArrowRight size={16} className="ml-1.5" /></Link>{isCalifornia ? <Link href={`/${state.slug}/questions`} className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">先刷 DMV 题库</Link> : null}<a href={state.officialUrl} className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">官方 DMV<ExternalLink size={16} className="ml-1.5" /></a><ShareButton title={`${state.nameZh} DMV 题库`} text={`${state.nameZh} DMV 驾照笔试题库、模拟考试和交通标志练习`} className="border-white/20 bg-white/10 text-white hover:bg-white/15" /></div></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><div className="rounded-lg border border-white/15 bg-white/8 p-4"><p className="text-sm font-bold text-cyan-100">考试提醒</p><p className="mt-2 text-sm leading-6 text-slate-200">{examRule}</p><p className="mt-2 text-sm leading-6 text-slate-200">{passRule}</p></div>{!isCalifornia ? <div className="rounded-lg border border-white/15 bg-white/8 p-4"><p className="text-sm font-bold text-cyan-100">本州工具</p><div className="mt-3 grid grid-cols-2 gap-2">{dmvTools.map((tool) => <Link key={tool.href} href={`/${state.slug}/${tool.href}`} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">{tool.title === '中文题库' ? 'DMV 题库' : tool.title}</Link>)}</div></div> : null}</div></div></section>
}
