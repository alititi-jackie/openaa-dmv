import type { Metadata } from 'next'
import Link from 'next/link'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import TexasLanguageNotice from '@/components/TexasLanguageNotice'
import { getStateQuestionCount } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '2026 德州 DPS 中文驾照笔试指南｜Knowledge Test 70%通过',
  description: 'Texas DPS Knowledge Test 中文、English 和中英对照学习指南。正式普通非商业驾照知识考试目前不提供中文，只提供 English 或 Spanish；本站提供 30 题练习、Texas 专属规则、英文关键词和错题复习。',
  alternates: { canonical: '/texas/guide' },
}

const faq = [
  { question: 'Texas DPS 正式 Knowledge Test 可以用中文吗？', answer: '目前不可以。Texas DPS 对普通非商业驾照知识考试的说明是 English 或 Spanish；本站中文和中英对照题库用于学习辅助。' },
  { question: 'Texas DPS Knowledge Exam 通过标准是多少？', answer: 'Texas Driver Handbook 当前明确要求知识考试至少达到 70% 才通过。' },
  { question: '本站为什么使用 30 题模拟练习？', answer: '30 题是本站的练习模式。DPS 当前公开资料明确的是 70% 通过标准，正式考试实际题量应以考试当天 DPS 或授权考试机构为准。' },
  { question: '德州青少年应重点复习什么？', answer: 'learner license、6个月持证期、30小时监督驾驶（至少10小时夜间）、provisional license 乘客与午夜到5点限制、手机限制和 Zero Tolerance。' },
]

export default function TexasGuidePage() {
  const count = getStateQuestionCount('texas')
  const steps = [
    '先阅读 Texas DPS 2026 Driver Handbook，确认正式考试只提供 English 或 Spanish。',
    '先用中文题库理解 Texas 专属规则，再切换到中英对照熟悉英文考试词汇。',
    '重点复习 Move Over / Slow Down、校车、Teen Learner、Provisional License、手机、Zero Tolerance、限速和跟车距离。',
    '完成本站 30 题模拟练习；官方通过标准为 70%，实际备考建议稳定达到 85% 以上。',
    '把错题集中复习，并在正式考试前再次核对 DPS 或授权考试机构当日安排。',
  ]
  return <><JsonLd data={webPageJsonLd('2026 德州 DPS 中文驾照笔试指南', 'Texas DPS Knowledge Test 中文、English 和中英对照学习指南，正式考试不提供中文，官方通过标准为70%。', '/texas/guide')} /><JsonLd data={faqJsonLd(faq)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: '德克萨斯州', path: '/texas' }, { name: '考试指南', path: '/texas/guide' }])} /><section className="bg-white py-12"><div className="page-shell"><BackLink href="/texas" label="返回德州 DPS" /><div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]"><article><p className="text-sm font-bold text-teal-700">Texas DPS Driver Guide</p><h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">2026 德州 DPS 中文驾照笔试指南</h1><p className="mt-5 text-base leading-8 text-slate-700">Texas DPS 当前官方资料明确：Knowledge Exam 至少达到 70% 才通过。普通非商业驾照正式知识考试目前提供 English 或 Spanish，不提供中文。</p><p className="mt-4 text-base leading-8 text-slate-700">本站当前提供 {count} 道 Texas 专属题与公共核心题，支持中文、English 和中英对照。本站 30 题模式是练习模式，不把第三方常见的“30题/21题”说法冒充为 DPS 当前官方固定题量。</p><div className="mt-6"><TexasLanguageNotice /></div><div className="mt-8 grid gap-3">{steps.map((item,index)=><div key={item} className="card p-4"><p className="text-sm font-black text-blue-700">步骤 {index+1}</p><p className="mt-2 text-sm leading-6 text-slate-700">{item}</p></div>)}</div></article><aside className="grid content-start gap-4"><div className="card p-5"><h2 className="text-xl font-black text-slate-950">学习入口</h2><div className="mt-4 grid gap-2"><Link href="/texas/questions" className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">DMV 题库（{count} 题）</Link><Link href="/texas/practice" className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">顺序 / 随机练习</Link><Link href="/texas/mock-test" className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">30 题模拟练习</Link><Link href="/texas/wrong-questions" className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">错题本</Link></div></div><div className="card p-5"><h2 className="text-xl font-black text-slate-950">考试英文关键词</h2><div className="mt-3 grid gap-2 text-sm text-slate-700"><p><b>yield</b> · 让行</p><p><b>right-of-way</b> · 路权</p><p><b>divided highway</b> · 分隔道路</p><p><b>flashing red lights</b> · 闪烁红灯</p><p><b>shoulder</b> · 路肩</p><p><b>intoxicated</b> · 醉酒/受影响</p><p><b>provisional license</b> · 阶段性驾照</p><p><b>learner license</b> · 学习驾照</p></div></div></aside></div></div></section><OpenAACrossLinks /></>
}
