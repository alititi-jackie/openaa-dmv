import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import MassachusettsRules from '@/components/MassachusettsRules'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import PennsylvaniaRules from '@/components/PennsylvaniaRules'
import StateHero from '@/components/StateHero'
import ToolGrid from '@/components/ToolGrid'
import { dmvStates, getStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, stateTitle, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status !== 'external').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getStateBySlug(stateSlug)
  if (!state || state.status === 'external') return {}
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const title = state.slug === 'california'
    ? '2026 加州 DMV 中英双语题库｜驾照笔试练习与模拟考试'
    : isPennsylvania
      ? '2026 宾州 DMV 中文题库｜PennDOT 18题模拟考试与驾照笔试练习'
      : isMassachusetts
        ? '2026 麻州 DMV 中文题库｜Massachusetts RMV 25题模拟考试'
        : stateTitle(state)
  const description = state.slug === 'california'
    ? '加州 DMV Class C 驾照知识考试中英双语学习入口，支持中文、English 和中英对照练习，包含模拟考试、交通标志、错题本、官方中文 Driver Handbook 和申请入口。'
    : isPennsylvania
      ? '宾夕法尼亚州 PennDOT 驾照知识考试中文学习入口，提供宾州专属考点、交通标志、错题本和 18 题模拟考试，按答对 15 题通过进行练习。'
      : isMassachusetts
        ? 'Massachusetts RMV Class D learner’s permit 中文学习入口，提供麻州专属考点、中文 / English / 中英对照题库、25题模拟考试，并按答对18题通过进行练习。'
        : stateDescription(state)
  return { title, description, alternates: { canonical: `/${state.slug}` }, openGraph: { title, description, url: `/${state.slug}` } }
}

export default async function StatePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getStateBySlug(stateSlug)
  if (!state || state.status === 'external') notFound()

  if (state.status === 'coming-soon') {
    return <section className="bg-white py-16"><div className="page-shell"><BackLink href="/" label="返回美国 DMV 首页" /><div className="card mt-5 p-6"><p className="text-sm font-bold text-amber-800">题库准备中</p><h1 className="mt-2 text-3xl font-black text-slate-950">{state.nameZh} DMV 中文题库</h1><p className="mt-3 text-sm leading-6 text-slate-600">{state.summary}</p><div className="mt-5 flex flex-wrap gap-3"><a href={state.officialUrl} className="focus-ring rounded-md bg-slate-950 px-4 py-2 text-sm font-black text-white">打开官方 DMV</a><Link href="/" className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700">返回选州</Link></div></div></div></section>
  }

  const questions = getStateQuestions(state.slug)
  const isCalifornia = state.slug === 'california'
  const isNJ = state.slug === 'new-jersey'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isCompleteState = isCalifornia || isNJ || isPennsylvania || isMassachusetts
  const faq = isCalifornia ? [
    { question: '加州 DMV 有官方中文 Driver Handbook 吗？', answer: '有。California DMV 官方 Driver’s Handbooks 页面提供中文版 California Driver’s Handbook PDF，考试前建议与本站练习配合使用。' },
    { question: '加州 DMV 是否提供中文 Class C 样题？', answer: '提供。California DMV 官方 Sample Driver’s License Knowledge Tests 页面提供中文 Class C 驾照知识考试样题。' },
    { question: '加州 DMV 题库需要登录吗？', answer: '不需要。练习记录和错题默认保存在当前浏览器本地，清理浏览器数据或更换设备后可能无法保留。' },
    { question: '本站题库可以代替 California Driver’s Handbook 吗？', answer: '不能。本站用于中英双语学习和模拟练习，正式考试规则、证件、费用与预约要求应以 California DMV 官方页面和 Driver’s Handbook 为准。' },
  ] : isPennsylvania ? [
    { question: '宾州 PennDOT 知识考试有多少题？', answer: 'PennDOT Knowledge Test 共 18 题，至少答对 15 题通过。' },
    { question: '宾州 DMV 中文题库可以代替官方 Driver’s Manual 吗？', answer: '不可以。本站用于中文学习和模拟练习，正式法规与考试要求仍应以 PennDOT 官方 Driver’s Manual 为准。' },
    { question: '宾州模拟考试按什么标准练习？', answer: '本站宾州模拟考试按 18 题组卷，并以答对 15 题作为通过标准。' },
    { question: '宾州题库需要登录吗？', answer: '不需要，练习、模拟考试和错题记录默认保存在当前浏览器本地。' },
  ] : isMassachusetts ? [
    { question: '麻州 RMV Class D Permit 考试有多少题？', answer: '正式 Class D learner’s permit exam 共 25 题，考试时间 25 分钟，至少答对 18 题通过。' },
    { question: 'Massachusetts RMV 提供中文考试吗？', answer: '提供。官方考试语言包括 Mandarin (Simplified)、Mandarin (Traditional) 和 English 等多种语言。' },
    { question: '麻州模拟考试按什么标准练习？', answer: '本站麻州模拟考试固定按 25 题组卷，并以答对 18 题作为通过标准。' },
    { question: '麻州题库会把预约、费用和考试地点当成考题吗？', answer: '不会。说明性办事信息放在州首页和指南，题库只保留适合知识考试学习的道路规则、JOL、标志和安全驾驶考点。' },
  ] : [
    { question: `${state.nameZh} DMV 中文题库可以直接代替官方手册吗？`, answer: `不可以。本站用于中文学习辅助，正式规则、费用和预约以 ${state.officialName} 官方页面为准。` },
    { question: `${state.shortZh} DMV 练习需要登录吗？`, answer: '不需要，练习和错题默认保存在当前浏览器本地。' },
  ]

  const pageTitle = isCalifornia ? '2026 加州 DMV 中英双语题库' : isPennsylvania ? '2026 宾州 PennDOT 中文题库' : isMassachusetts ? '2026 麻州 Massachusetts RMV 中英双语题库' : stateTitle(state)
  const pageDescription = isCalifornia
    ? `当前提供 ${questions.length} 道中英双语练习题，覆盖道路规则、交通标志和安全驾驶，并配套模拟考试、错题本和官方 California DMV 学习入口。`
    : isPennsylvania
      ? `当前提供 ${questions.length} 道宾州专属考点与公共核心练习题，覆盖道路规则、交通标志和安全驾驶，并配套 PennDOT 18 题模拟考试、错题本和官方学习入口。`
      : isMassachusetts
        ? `当前提供 ${questions.length} 道麻州专属考点与公共核心练习题，支持中文、English 和中英对照，并配套 RMV 25题 / 18题通过模拟考试。`
        : stateDescription(state)

  return <>
    <JsonLd data={webPageJsonLd(pageTitle, pageDescription, `/${state.slug}`)} />
    <JsonLd data={faqJsonLd(faq)} />
    <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }])} />
    <div className="bg-white pt-6"><div className="page-shell"><BackLink href="/" label="返回美国 DMV 首页" /></div></div>
    <StateHero state={state} />
    <ToolGrid state={state} />

    {isCompleteState ? <section className="bg-white py-10"><div className="page-shell grid gap-4 md:grid-cols-3">
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">当前题库</p><p className="mt-2 text-3xl font-black text-slate-950">{questions.length} 题</p><p className="mt-2 text-sm leading-6 text-slate-600">{isNJ ? '新泽西专属考点 + 去重筛选后的公共核心题，支持中文、English 和中英对照。' : isPennsylvania ? '宾州专属考试题 + 去重后的公共核心题；说明性内容不混入考题。' : isMassachusetts ? '麻州专属考试题 + 去重后的公共核心题，专属题从第一版起即支持中文、English 和中英对照。' : '加州专属题 + 去重后的公共核心题，支持中文、English 和中英对照。'}</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">官方资料</p><p className="mt-2 text-xl font-black text-slate-950">Driver Manual</p><p className="mt-2 text-sm leading-6 text-slate-600">{isNJ ? 'New Jersey MVC 提供 Driver Manual 与 Knowledge Test 官方说明。' : isPennsylvania ? 'PennDOT Driver’s Manual 是正式考试规则与考点的最终依据。' : isMassachusetts ? 'Massachusetts RMV 官方提供 English、简体中文和繁体中文 Class D Driver’s Manual。' : 'California DMV 官方提供 Driver Handbook 和 Class C 样题。'}</p></div>
      <div className="card p-5"><p className="text-sm font-bold text-teal-700">推荐学习顺序</p><p className="mt-2 text-xl font-black text-slate-950">题库 → 模考 → 错题</p><p className="mt-2 text-sm leading-6 text-slate-600">先理解规则，再模拟考试，最后集中复习错题。</p></div>
    </div></section> : null}

    {isPennsylvania ? <PennsylvaniaRules /> : null}
    {isMassachusetts ? <MassachusettsRules /> : null}

    <section className="bg-[#f4f7fb] py-10"><div className="page-shell grid gap-5 lg:grid-cols-[1fr_0.8fr]">
      <div className="card p-5"><h2 className="text-2xl font-black text-slate-950">{state.nameZh} 考试准备步骤</h2><div className="mt-4 grid gap-3">{(isCalifornia ? ['先阅读 California DMV 官方 Driver’s Handbook；官方提供中文版本。','使用本站题库熟悉路权、车道线、交通标志、行人、自行车和安全驾驶，可切换中文、English 或中英对照。','完成多次模拟考试，把答错题目集中到错题本反复复习。','申请或预约前再次到 California DMV 官方页面核对证件、费用、考试方式和最新规定。','通过知识考试取得相应许可后，再按年龄和申请类型准备驾驶训练及路考。'] : isPennsylvania ? ['先阅读 PennDOT Driver’s Manual，并在本页先熟悉宾州高频规则。','使用题库练习宾州专属考点与公共核心驾驶知识，不把预约、费用、考试地点等说明性内容当作考题。','完成 18 题模拟考试，目标至少答对 15 题；把错题集中到错题本反复复习。','正式考试前再次到 PennDOT 官方页面核对证件、考试地点和最新规定。'] : isMassachusetts ? ['先阅读 Massachusetts RMV Class D Driver’s Manual；官方提供简体中文、繁体中文和 English 版本。','使用题库重点掌握 JOL、Hands-Free、校车 100 英尺、4 英尺安全超车、White Cane、路权与交通标志。','完成 25 题模拟考试，目标至少答对 18 题；把错题集中到错题本反复复习。','预约、费用、线上考试环境等办事信息只作为说明，不混入知识考试题库。','正式考试前再次核对 Massachusetts RMV 当前规则和 Driver’s Manual。'] : state.guide).map((item,index)=><div key={item} className="flex gap-3 rounded-md bg-slate-50 p-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-700 text-sm font-black text-white">{index+1}</span><p className="text-sm leading-6 text-slate-700">{item}</p></div>)}</div><Link href={`/${state.slug}/guide`} className="focus-ring mt-5 inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">查看完整考试指南</Link></div>
      <div className="card p-5"><h2 className="text-2xl font-black text-slate-950">官方入口</h2><div className="mt-4 grid gap-2 text-sm font-bold text-blue-800"><a href={state.officialUrl}>{state.officialName} 官方首页</a><a href={state.driverManualUrl}>Driver Manual / Handbook</a><a href={state.permitUrl}>Permit / License 申请</a><a href={state.roadTestUrl}>Road Test</a>{isCalifornia ? <a href="https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/">官方 Class C 样题</a> : null}</div><p className="mt-4 text-xs leading-5 text-slate-500">正式考试规则、申请资格、费用和预约信息请以官方页面最新内容为准。</p></div>
    </div></section>

    <section className="bg-white py-10"><div className="page-shell"><div className="card p-5"><h2 className="text-2xl font-black text-slate-950">{state.shortZh} DMV 题库概览</h2><p className="mt-3 text-sm leading-6 text-slate-600">当前开放 {questions.length} 道练习题，覆盖道路规则、交通标志和安全驾驶。练习页支持中文、English、中英对照及即时答案解析，{isCalifornia ? '模拟考试提供参考历史题量设计的 36 题和 46 题练习模式' : isNJ ? '模拟考试按 50 题、答对 40 题通过的形式练习' : isPennsylvania ? '模拟考试按 PennDOT 18 题、答对 15 题通过的标准练习' : isMassachusetts ? '模拟考试按 Massachusetts RMV 25 题、答对 18 题通过的标准练习' : '模拟考试支持分类随机组卷'}，答错题目会保存到本地错题本。正式考试要求以官方最新规定为准。</p><div className="mt-5 flex flex-wrap gap-3"><Link href={`/${state.slug}/questions`} className="focus-ring inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-black text-white">查看全部题目</Link><Link href={`/${state.slug}/mock-test`} className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">开始模拟考试</Link><Link href={`/${state.slug}/wrong-questions`} className="focus-ring inline-flex rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-800">复习错题</Link></div></div></div></section>
    <OpenAACrossLinks />
  </>
}
