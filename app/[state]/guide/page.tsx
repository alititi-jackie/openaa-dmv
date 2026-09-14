import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestionCount } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const title = isCalifornia ? '2026 加州 DMV 驾照笔试与 Permit 考试指南' : isPennsylvania ? '2026 宾州 PennDOT 驾照笔试指南｜18题答对15题通过' : `${state.nameZh} DMV 驾照考试指南`
  const description = isCalifornia ? '加州 DMV 中英双语驾照考试指南：California Driver’s Handbook、中文 Class C 样题、Permit 申请、知识考试、双语练习与路考准备。' : isPennsylvania ? '宾州 PennDOT Knowledge Test 中文指南：正式知识考试 18 题、至少答对 15 题，重点复习校车、School Zone、Move Over、车灯、积分制度与宾州专属规则。' : stateDescription(state)
  return { title, description, alternates: { canonical: `/${state.slug}/guide` } }
}

export default async function GuidePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isCalifornia = state.slug === 'california'
  const isNJ = state.slug === 'new-jersey'
  const isPennsylvania = state.slug === 'pennsylvania'
  const count = getStateQuestionCount(state.slug)
  const faq = isCalifornia ? [
    { question: '准备加州 DMV 知识考试应该先看什么？', answer: '优先阅读 California DMV 官方 Driver’s Handbook。官方提供中文 PDF；本站中英双语题库适合用来理解和复习常见知识点。' },
    { question: 'California DMV 有中文练习资料吗？', answer: '有。California DMV 官方提供中文版 Driver’s Handbook，并在 Sample Driver’s License Knowledge Tests 页面提供中文 Class C 样题。' },
    { question: '未满 18 岁申请 instruction permit 有额外要求吗？', answer: '有。California Driver’s Handbook 说明，未满 18 岁申请人须至少 15 岁半，并满足驾驶教育、家长或监护人签字等额外要求。具体以申请时官方规定为准。' },
  ] : isPennsylvania ? [
    { question: '宾州 PennDOT Knowledge Test 有多少题？', answer: '共 18 题，至少答对 15 题通过。' },
    { question: '宾州题库应该重点复习什么？', answer: '除了通用交通规则和标志，还应重点复习校车、School Zone、Move Over、车灯要求、积分制度、停车距离和未成年驾驶规则。' },
    { question: '本站宾州模拟考试按什么标准？', answer: '按 18 题组卷，并以答对 15 题作为通过标准。' },
  ] : [
    { question: `${state.nameZh} DMV 考试前应该先看什么？`, answer: `建议先阅读本站中文说明建立框架，再打开 ${state.officialName} 官方 Driver Manual 核对最新规则。` },
    { question: '是否需要背完所有题？', answer: '不建议只背答案。应该理解路权、标志、安全距离、酒驾和特殊区域规则。' },
  ]

  const guideSteps = isCalifornia ? ['阅读 California DMV 官方中文 Driver’s Handbook。','完成中英双语题库，重点理解路权、标志、车道与安全驾驶。','进行多轮随机模拟考试，不只记答案，要阅读解析。','打开错题本集中复习薄弱知识点。','申请或考试前回到 California DMV 官方页面确认最新材料、费用和预约要求。'] : isPennsylvania ? ['先阅读 PennDOT Driver’s Manual，并熟悉宾州校车、School Zone、Move Over、车灯和积分制度。','完成宾州专属题与公共核心题练习，重点理解数字距离和处罚规则。','进行 18 题模拟考试，以至少答对 15 题作为通过目标。','把错题集中复习，直到多轮模拟考试都能稳定通过。','正式考试前回到 PennDOT 官方页面核对最新考试与申请要求。'] : state.guide

  const body = isCalifornia ? <><p>准备加州 Class C 驾照知识考试，建议把“官方手册 + 中英双语练习 + 模拟考试”结合起来。California DMV 官方提供中文版 California Driver’s Handbook，也提供中文 Class C 样题。</p><p>本站当前提供 {count} 道练习题，支持中文、English 和中英对照，覆盖道路规则、交通标志和安全驾驶。</p><p>California DMV 的考试和申请方式会因年龄、首次申请或续期等情况不同。正式申请前，应重新核对 California DMV 官方的证件、费用、考试方式与预约信息。</p></> : isPennsylvania ? <><p>宾州 PennDOT Knowledge Test 共 18 题，至少答对 15 题通过。本站模拟考试按这个标准组卷。</p><p>本站当前提供 {count} 道宾州专属考点与公共核心练习题。宾州专属题只保留适合知识考试练习的内容；预约、费用、考试地点等说明不会混入考题。</p><p>复习时除基本交通规则和标志外，应重点掌握校车 10 英尺停车、School Zone 15 mph、Move Over、恶劣天气车灯、Point System、停车距离和未成年驾驶规则。</p></> : <><p>{state.nameZh} 的驾照考试准备，最重要的是把中文理解和官方规则结合起来。中文题库可以帮你快速掌握常见题型，但正式申请和考试安排必须以官方页面为准。</p><p>本站当前提供 {count} 道练习题。建议先从道路规则、交通标志和安全驾驶三类题开始，等正确率稳定后，再做模拟考试，并把错题集中复习。</p></>

  return <><JsonLd data={webPageJsonLd(`${state.nameZh} DMV 驾照考试指南`, stateDescription(state), `/${state.slug}/guide`)} /><JsonLd data={faqJsonLd(faq)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '考试指南', path: `/${state.slug}/guide` }])} /><section className="bg-white py-12"><div className="page-shell"><BackLink href={`/${state.slug}`} label={`返回${state.nameZh}${isNJ ? ' MVC' : ' DMV'}`} /><div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]"><article className="prose-copy"><p className="text-sm font-bold text-teal-700">{state.nameEn} Driver Guide</p><h1 className="mt-2 text-4xl font-black leading-tight text-slate-950">{isCalifornia ? '2026 加州 DMV 驾照考试指南' : isPennsylvania ? '2026 宾州 PennDOT 驾照笔试指南' : `${state.nameZh} DMV 驾照考试指南`}</h1><div className="mt-6 text-base leading-8 text-slate-700">{body}</div><div className="mt-8 grid gap-3">{guideSteps.map((item,index)=><div key={item} className="card p-4"><p className="text-sm font-black text-blue-700">步骤 {index+1}</p><p className="mt-2 text-sm leading-6 text-slate-700">{item}</p></div>)}</div></article><aside className="grid content-start gap-4"><div className="card p-5"><h2 className="text-xl font-black text-slate-950">学习入口</h2><div className="mt-4 grid gap-2"><Link href={`/${state.slug}/questions`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">DMV 题库（{count} 题）</Link><Link href={`/${state.slug}/practice`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">顺序 / 随机练习</Link><Link href={`/${state.slug}/mock-test`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">{isPennsylvania ? '18 题模拟考试' : '模拟考试'}</Link><Link href={`/${state.slug}/wrong-questions`} className="rounded-md bg-slate-100 px-3 py-2 text-sm font-bold text-slate-800">错题本</Link></div></div><div className="card p-5"><h2 className="text-xl font-black text-slate-950">官方入口</h2><div className="mt-4 grid gap-2 text-sm font-bold text-blue-800"><a href={state.driverManualUrl}>官方 Driver Manual</a><a href={state.permitUrl}>Permit / License 申请</a><a href={state.roadTestUrl}>Road Test / Drive Test</a>{isCalifornia ? <a href="https://www.dmv.ca.gov/portal/driver-education-and-safety/educational-materials/sample-driver-license-dl-knowledge-tests/">California DMV 官方样题</a> : null}</div></div></aside></div></div></section><OpenAACrossLinks /></>
}
