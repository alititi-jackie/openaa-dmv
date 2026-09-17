import type { Metadata } from 'next'
import { Smartphone } from 'lucide-react'
import BackLink from '@/components/BackLink'
import ExternalLinkAnchor from '@/components/ExternalLinkAnchor'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import PageStructuredData from '@/components/PageStructuredData'
import StateHero from '@/components/StateHero'
import ToolGrid from '@/components/ToolGrid'
import { getStateBySlug } from '@/lib/dmv-data'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
import { NUMBERMOBI_NY_URL } from '@/lib/site'

export const metadata: Metadata = { title:'2026 纽约 DMV 驾照题库｜20题 Permit 模拟考试', description:'New York DMV Class D/DJ/E learner permit 学习入口，提供中文、English 和中英对照题库、随机/顺序练习、20题模拟考试、交通标志和错题复习。', alternates:{ canonical:'/ny' } }

export default function NewYorkPage(){
  const questions=getNewYorkQuestions()
  const state=getStateBySlug('new-york')!
  return <>
    <PageStructuredData title="2026 纽约 DMV 驾照题库" description="纽约独立 DMV 题库、随机与顺序练习、20题模拟考试、交通标志和错题复习。" path="/ny" stateName="纽约州" statePath="/ny"/>
    <div className="bg-white pt-6"><div className="page-shell"><BackLink href="/" label="返回美国 DMV 首页"/></div></div>
    <StateHero state={state} basePath="/ny" title="纽约州 DMV 驾照题库" summary="提供独立的纽约 DMV 中文、English 和中英对照题库，支持随机 / 顺序练习、20题模拟考试、交通标志专项和错题复习。" examRule="New York DMV Class D/DJ/E learner permit 笔试共 20 题。" passRule="至少答对 14 题；其中 4 道交通标志题至少答对 2 题。"/>
    <ToolGrid state={state} basePath="/ny"/>
    <section className="bg-[#f4f7fb] py-10"><div className="page-shell grid gap-4 md:grid-cols-3">
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">当前题库</p><p className="mt-2 text-3xl font-black">{questions.length} 题</p><p className="mt-2 text-sm text-slate-600">纽约独立题库，不混入其它州公共题库。</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">正式笔试</p><p className="mt-2 text-3xl font-black">20 题</p><p className="mt-2 text-sm text-slate-600">至少答对14题；4道交通标志题至少答对2道。</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">学习范围</p><p className="mt-2 text-xl font-black">Chapter 4–11 + Road Signs</p></div>
    </div></section>
    <section className="bg-white py-10"><div className="page-shell"><div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><Smartphone size={25} className="mt-0.5 shrink-0 text-blue-700" aria-hidden="true"/><div><p className="text-sm font-bold text-blue-700">纽约生活服务</p><h2 className="mt-1 text-xl font-black text-slate-950">需要一个好记的美国手机号？</h2><p className="mt-2 text-sm leading-6 text-slate-600">NumberMobi 提供纽约 917、347、646、929 等精品好记号码和购买说明。</p></div></div><ExternalLinkAnchor href={NUMBERMOBI_NY_URL} className="shrink-0 justify-center border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-800 hover:bg-blue-100">查看美国靓号</ExternalLinkAnchor></div></div></section>
    <OpenAACrossLinks/>
  </>
}
