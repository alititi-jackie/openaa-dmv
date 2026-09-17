import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import FloridaRules from '@/components/FloridaRules'
import NoticeCard from '@/components/NoticeCard'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import PageStructuredData from '@/components/PageStructuredData'
import StateHero from '@/components/StateHero'
import ToolGrid from '@/components/ToolGrid'
import { getStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 DMV 驾照题库｜Florida Class E 50题模拟考试', description:'Florida Class E Knowledge Exam 中文、English 和中英对照学习入口，包含完整题库、随机与顺序练习、50题模拟考试、交通标志、错题本和考试指南。', alternates:{ canonical:'/florida' } }

export default function FloridaPage(){
  const state=getStateBySlug('florida')!
  const questions=getStateQuestions('florida')
  return <>
    <PageStructuredData title="2026 佛州 DMV 驾照题库" description="Florida Class E 完整题库、随机与顺序练习、50题模拟考试、交通标志和错题复习。" path="/florida" stateName="佛罗里达州" statePath="/florida"/>
    <div className="bg-white pt-6"><div className="page-shell"><BackLink href="/" label="返回美国 DMV 首页" /></div></div>
    <StateHero state={state} title="佛罗里达州 Class E 驾照题库" summary="覆盖 Florida 道路规则、交通标志、安全驾驶和常见考试知识点，支持中文、English 和中英对照学习；模拟考试每次随机抽取 50 题。" examRule="Florida Class E Knowledge Exam 共 50 道选择题；授权第三方在线考试按 60 分钟时限执行。" passRule="模拟考试仅提供 English / 中英对照；本站以 40/50 作为学习练习线。"/>
    <section className="bg-amber-50 py-5"><div className="page-shell"><NoticeCard title="正式考试语言提醒" tone="warning">目前本站尚未确认 FLHSMV Class E 正式 Knowledge Exam 支持中文。中文可用于本站题库和普通练习；为避免误导，50题模拟考试只提供 English / 中英对照，并默认 English。</NoticeCard></div></section>
    <ToolGrid state={state}/>
    <FloridaRules/>
    <section className="bg-[#f4f7fb] py-10"><div className="page-shell grid gap-4 md:grid-cols-3">
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">当前完整题库</p><p className="mt-2 text-3xl font-black">{questions.length} 题</p><p className="mt-2 text-sm text-slate-600">覆盖 Florida 道路规则、交通标志、安全驾驶和高频考试知识点。</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">模拟考试</p><p className="mt-2 text-3xl font-black">每次 50 题</p><p className="mt-2 text-sm text-slate-600">从完整题库随机组卷，不代表全站只有50题。</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">学习语言</p><p className="mt-2 text-xl font-black">中文 / English / 中英对照</p><p className="mt-2 text-sm text-slate-600">模拟考试仅 English / 中英对照。</p></div>
    </div></section>
    <OpenAACrossLinks/>
  </>
}
