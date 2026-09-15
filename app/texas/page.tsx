import type { Metadata } from 'next'
import Link from 'next/link'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateHero from '@/components/StateHero'
import TexasLanguageNotice from '@/components/TexasLanguageNotice'
import TexasRules from '@/components/TexasRules'
import ToolGrid from '@/components/ToolGrid'
import { getStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '2026 德州 DPS 驾照题库｜Texas 中英对照练习与模拟考试',
  description: 'Texas DPS Knowledge Test 学习入口。正式普通非商业驾照知识考试目前提供 English 或 Spanish；本站提供中文、English、中英对照学习题库、30题模拟练习、错题和英文关键词。',
  alternates: { canonical: '/texas' },
  openGraph: { title: '2026 德州 DPS 驾照题库｜Texas 中英对照练习与模拟考试', description: 'Texas DPS 正式 Knowledge Test 不提供中文。本站提供中文、English、中英对照学习题库、30题模拟练习和 Texas 专属规则。', url: '/texas' },
}

const faq = [
  { question: 'Texas DPS 正式驾照知识考试可以用中文吗？', answer: '目前不可以。普通非商业驾照 Knowledge Test 当前提供 English 或 Spanish。本站中文和中英对照内容用于学习辅助。' },
  { question: 'Texas DPS Knowledge Exam 的官方通过标准是多少？', answer: '当前 Texas Driver Handbook 明确要求知识考试至少达到 70% 才通过。' },
  { question: '本站德州模拟为什么是30题？', answer: '30题是本站练习模式。DPS 当前公开资料明确的是70%通过标准，正式考试实际题量请以考试当天DPS或授权考试机构为准。' },
  { question: '德州青少年最重要的考点有哪些？', answer: 'Learner License、6个月持证期、30小时监督驾驶（至少10小时夜间）、Provisional License 乘客与午夜到5点限制、手机限制和 Zero Tolerance。' },
]

export default function TexasPage() {
  const state = getStateBySlug('texas')!
  const questions = getStateQuestions('texas')
  const steps = [
    '先阅读 Texas DPS 2026 Driver Handbook，并记住正式普通非商业驾照 Knowledge Test 不提供中文。',
    '先用中文理解 Texas 规则，再切换 English / 中英对照熟悉正式考试词汇。',
    '重点练习 Move Over / Slow Down、School Bus、Teen Learner、Provisional License、手机、Zero Tolerance、限速和跟车距离。',
    '完成本站30题模拟练习；官方通过标准为70%，备考建议稳定达到85%以上。',
    '正式考试前再次到 Texas DPS 或授权考试机构核对考试语言、题量、材料和当天安排。',
  ]
  return <><JsonLd data={webPageJsonLd('2026 德州 DPS 驾照题库', 'Texas DPS Knowledge Test 中文、English 和中英对照学习入口，正式考试不提供中文，官方通过标准70%。', '/texas')} /><JsonLd data={faqJsonLd(faq)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: '德克萨斯州', path: '/texas' }])} /><div className="bg-white pt-6"><div className="page-shell"><BackLink href="/" label="返回美国 DMV 首页" /></div></div><StateHero state={state} /><TexasLanguageNotice /><ToolGrid state={state} /><TexasRules /><section className="bg-white py-10"><div className="page-shell grid gap-4 md:grid-cols-3"><div className="card p-5"><p className="text-sm font-bold text-teal-700">当前题库</p><p className="mt-2 text-3xl font-black text-slate-950">{questions.length} 题</p><p className="mt-2 text-sm leading-6 text-slate-600">覆盖 Texas 道路规则、交通标志、安全驾驶和常见考试知识点，支持中文、English 和中英对照学习。</p></div><div className="card p-5"><p className="text-sm font-bold text-teal-700">官方通过标准</p><p className="mt-2 text-3xl font-black text-slate-950">70%</p><p className="mt-2 text-sm leading-6 text-slate-600">本站采用30题练习模式；正式题量以考试当天DPS或授权考试机构为准。</p></div><div className="card p-5"><p className="text-sm font-bold text-amber-700">正式考试语言</p><p className="mt-2 text-xl font-black text-slate-950">English / Spanish</p><p className="mt-2 text-sm leading-6 text-slate-600">普通非商业驾照 Knowledge Test 当前不提供中文，本站中文内容只用于学习。</p></div></div></section><section className="bg-[#f4f7fb] py-10"><div className="page-shell grid gap-5 lg:grid-cols-[1fr_0.8fr]"><div className="card p-5"><h2 className="text-2xl font-black text-slate-950">德州考试准备步骤</h2><div className="mt-4 grid gap-3">{steps.map((item,index)=><div key={item} className="flex gap-3 rounded-md bg-slate-50 p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">{index+1}</span><p className="text-sm leading-6 text-slate-700">{item}</p></div>)}</div><Link href="/texas/guide" className="focus-ring mt-5 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">查看完整考试指南</Link></div><div className="card p-5"><h2 className="text-2xl font-black text-slate-950">考试英文关键词</h2><div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700"><p><b>yield</b><br/>让行</p><p><b>right-of-way</b><br/>路权</p><p><b>divided highway</b><br/>分隔道路</p><p><b>shoulder</b><br/>路肩</p><p><b>intoxicated</b><br/>醉酒/受影响</p><p><b>provisional license</b><br/>阶段性驾照</p></div></div></div></section><section className="bg-white py-10"><div className="page-shell"><div className="card p-5"><h2 className="text-2xl font-black text-slate-950">德州 DMV / DPS 题库概览</h2><p className="mt-3 text-sm leading-6 text-slate-600">当前开放 {questions.length} 道练习题，覆盖 Texas 道路规则、交通标志和安全驾驶。练习页支持中文、English、中英对照及答案解析；模拟考试采用本站30题练习模式，并以 Texas DPS 官方明确的70%通过标准评分。正式考试语言目前为 English 或 Spanish。</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/texas/questions" className="focus-ring inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">查看全部题目</Link><Link href="/texas/mock-test" className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">开始30题模拟练习</Link><Link href="/texas/wrong-questions" className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">复习错题</Link></div></div></div></section><OpenAACrossLinks /></>
}
