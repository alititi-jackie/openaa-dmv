import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import OpenAACrossLinks from '@/components/OpenAACrossLinks'
import StateGuideLayout from '@/components/StateGuideLayout'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestionCount } from '@/lib/state-question-bank'
import { stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, faqJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isWashington = state.slug === 'washington'
  const title = isCalifornia ? '2026 加州 DMV 驾照笔试与 Permit 考试指南' : isPennsylvania ? '2026 宾州 PennDOT 驾照笔试指南｜18题答对15题通过' : isMassachusetts ? '2026 麻州 RMV Permit 考试指南｜25题答对18题通过' : isWashington ? '2026 华盛顿州 DOL 驾照笔试指南｜40题答对32题通过' : `${state.nameZh} DMV 驾照考试指南`
  const description = isCalifornia ? '加州 DMV 中英双语驾照考试指南：California Driver’s Handbook、中文 Class C 样题、Permit 申请、知识考试、双语练习与路考准备。' : isPennsylvania ? '宾州 PennDOT Knowledge Test 中文指南：正式知识考试 18 题、至少答对 15 题，重点复习校车、School Zone、Move Over、车灯、积分制度与宾州专属规则。' : isMassachusetts ? 'Massachusetts RMV Class D Permit 中文指南：正式考试 25 题、25 分钟、至少答对 18 题，重点复习 JOL、Hands-Free、校车、4 英尺安全超车、White Cane 和麻州路权规则。' : isWashington ? 'Washington DOL Driving Knowledge Exam 中文指南：正式考试 40 题、至少答对 32 题，重点复习 school zone、校车、Intermediate License、40+10 小时、车灯和华州专属规则。' : stateDescription(state)
  return { title, description, alternates: { canonical: `/${state.slug}/guide` } }
}

export default async function GuidePage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isCalifornia = state.slug === 'california'
  const isPennsylvania = state.slug === 'pennsylvania'
  const isMassachusetts = state.slug === 'massachusetts'
  const isWashington = state.slug === 'washington'
  const count = getStateQuestionCount(state.slug)
  const faq = isCalifornia ? [
    { question: '准备加州 DMV 知识考试应该先看什么？', answer: '优先阅读 California DMV 官方 Driver’s Handbook。官方提供中文 PDF；本站中英双语题库适合用来理解和复习常见知识点。' },
    { question: 'California DMV 有中文练习资料吗？', answer: '有。California DMV 官方提供中文版 Driver’s Handbook，并在 Sample Driver’s License Knowledge Tests 页面提供中文 Class C 样题。' },
    { question: '未满 18 岁申请 instruction permit 有额外要求吗？', answer: '有。California Driver’s Handbook 说明，未满 18 岁申请人须至少 15 岁半，并满足驾驶教育、家长或监护人签字等额外要求。具体以申请时官方规定为准。' },
  ] : isPennsylvania ? [
    { question: '宾州 PennDOT Knowledge Test 有多少题？', answer: '共 18 题，至少答对 15 题通过。' },
    { question: '宾州题库应该重点复习什么？', answer: '除了通用交通规则和标志，还应重点复习校车、School Zone、Move Over、车灯要求、积分制度、停车距离和未成年驾驶规则。' },
    { question: '本站宾州模拟考试按什么标准？', answer: '按 18 题组卷，并以答对 15 题作为通过标准。' },
  ] : isMassachusetts ? [
    { question: 'Massachusetts RMV Class D learner’s permit exam 有多少题？', answer: '正式考试共 25 题，考试时间 25 分钟，至少答对 18 题通过。' },
    { question: '麻州 Permit 考试可以用中文吗？', answer: '可以。RMV 官方考试语言包含 Mandarin (Simplified)、Mandarin (Traditional) 和 English 等多种语言。' },
    { question: '麻州题库应该重点复习什么？', answer: '除通用交通规则和标志外，还应重点复习 Junior Operator Law、Hands-Free、校车 100 英尺、vulnerable road user 4 英尺安全超车、White Cane Law、行人和自行车路权。' },
    { question: '本站麻州模拟考试按什么标准？', answer: '按 25 题组卷，并以答对 18 题作为通过标准。' },
  ] : isWashington ? [
    { question: 'Washington DOL Driving Knowledge Exam 有多少题？', answer: '正式考试共 40 题，至少答对 32 题通过，及格成绩有效 2 年。' },
    { question: '华州 Knowledge Test 可以用中文吗？', answer: '可以。DOL 提供多种考试语言，包括简体中文、繁体中文和 English。' },
    { question: '华州题库应该重点复习什么？', answer: '除通用规则和标志外，还应重点复习 school zone 20 mph、校车、Intermediate License、40+10 小时监督驾驶、车灯 500/300 ft、行人和 DUI。' },
    { question: '本站华州模拟考试按什么标准？', answer: '按 40 题组卷，并以答对 32 题作为通过标准。' },
  ] : [
    { question: `${state.nameZh} DMV 考试前应该先看什么？`, answer: `建议先阅读本站中文说明建立框架，再打开 ${state.officialName} 官方 Driver Manual 核对最新规则。` },
    { question: '是否需要背完所有题？', answer: '不建议只背答案。应该理解路权、标志、安全距离、酒驾和特殊区域规则。' },
  ]

  const guideSteps = isCalifornia ? ['阅读 California DMV 官方中文 Driver’s Handbook。','完成中英双语题库，重点理解路权、标志、车道与安全驾驶。','进行多轮随机模拟考试，不只记答案，要阅读解析。','打开错题本集中复习薄弱知识点。','申请或考试前回到 California DMV 官方页面确认最新材料、费用和预约要求。'] : isPennsylvania ? ['先阅读 PennDOT Driver’s Manual，并熟悉宾州校车、School Zone、Move Over、车灯和积分制度。','完成宾州专属题与公共核心题练习，重点理解数字距离和处罚规则。','进行 18 题模拟考试，以至少答对 15 题作为通过目标。','把错题集中复习，直到多轮模拟考试都能稳定通过。','正式考试前回到 PennDOT 官方页面核对最新考试与申请要求。'] : isMassachusetts ? ['先阅读 Massachusetts RMV Class D Driver’s Manual；官方提供简体中文、繁体中文和 English 版本。','完成麻州专属题与公共核心题，重点掌握 JOL、Hands-Free、校车、White Cane 和 vulnerable road user 规则。','进行 25 题模拟考试，以至少答对 18 题作为通过目标；正式考试限时 25 分钟。','把错题集中复习，直到多轮模拟考试都能稳定达到通过线。','正式考试前回到 Massachusetts RMV 官方页面核对最新考试、申请和身份材料要求。'] : isWashington ? ['先阅读 Washington DOL Driver Guide，并优先使用官方中文资料核对华州规则。','完成华州专属题与公共核心题，重点掌握 school zone、校车、Intermediate License、40+10 小时、车灯和 DUI。','进行 40 题模拟考试，以至少答对 32 题作为通过目标。','把错题集中复习，直到多轮模拟考试都能稳定达到通过线。','正式考试前回到 Washington DOL 官方页面核对最新考试、permit 和驾照要求。'] : state.guide

  const body = isCalifornia ? <><p>准备加州 Class C 驾照知识考试，建议把“官方手册 + 中英双语练习 + 模拟考试”结合起来。California DMV 官方提供中文版 California Driver’s Handbook，也提供中文 Class C 样题。</p><p>本站当前提供 {count} 道练习题，支持中文、English 和中英对照，覆盖道路规则、交通标志和安全驾驶。</p><p>California DMV 的考试和申请方式会因年龄、首次申请或续期等情况不同。正式申请前，应重新核对 California DMV 官方的证件、费用、考试方式与预约信息。</p></> : isPennsylvania ? <><p>宾州 PennDOT Knowledge Test 共 18 题，至少答对 15 题通过。本站模拟考试按这个标准组卷。</p><p>本站当前提供 {count} 道宾州专属考点与公共核心练习题。宾州专属题只保留适合知识考试练习的内容；预约、费用、考试地点等说明不会混入考题。</p><p>复习时除基本交通规则和标志外，应重点掌握校车 10 英尺停车、School Zone 15 mph、Move Over、恶劣天气车灯、Point System、停车距离和未成年驾驶规则。</p></> : isMassachusetts ? <><p>Massachusetts RMV Class D learner’s permit exam 共 25 题，考试时间 25 分钟，至少答对 18 题通过。本站模拟考试按 25 题 / 18 题通过的标准组卷。</p><p>本站当前提供 {count} 道麻州专属考点与公共核心练习题，支持中文、English 和中英对照。预约、费用、线上考试设备和考试地点等说明性办事内容不混入知识考试题库。</p><p>复习时应重点掌握 Junior Operator Law、Hands-Free Law、校车 100 英尺规则、vulnerable road user 4 英尺安全超车、White Cane Law、行人/自行车路权、rotary 和通用交通标志。</p></> : isWashington ? <><p>Washington DOL Driving Knowledge Exam 共 40 题，至少答对 32 题通过，及格成绩有效 2 年。本站模拟考试按 40 题 / 32 题通过标准组卷。</p><p>本站当前提供 {count} 道华州专属考点与公共核心练习题，支持中文、English 和中英对照。考试语言、测试地点、费用和未来生效课程等说明性内容不混入考题。</p><p>复习时应重点掌握 school zone 20 mph、校车红灯与多车道例外、16–17 岁 permit 6 个月、40 小时白天 + 10 小时夜间、Intermediate License、headlights 500/300 ft、行人和 DUI 数字规则。</p></> : <><p>{state.nameZh} 的驾照考试准备，最重要的是把中文理解和官方规则结合起来。中文题库可以帮你快速掌握常见题型，但正式申请和考试安排必须以官方页面为准。</p><p>本站当前提供 {count} 道练习题。建议先从道路规则、交通标志和安全驾驶三类题开始，等正确率稳定后，再做模拟考试，并把错题集中复习。</p></>

  const guideTitle = isCalifornia ? '2026 加州 DMV 驾照考试指南' : isPennsylvania ? '2026 宾州 PennDOT 驾照笔试指南' : isMassachusetts ? '2026 麻州 RMV Class D Permit 考试指南' : isWashington ? '2026 华盛顿州 DOL Driving Knowledge Exam 指南' : `${state.nameZh} DMV 驾照考试指南`
  const jsonDescription = isMassachusetts ? 'Massachusetts RMV Class D Permit 中文、English 和中英对照考试指南，覆盖 25题/18题通过规则、JOL、Hands-Free、校车、White Cane 与 4 英尺安全超车。' : isWashington ? 'Washington DOL Driving Knowledge Exam 中文、English 和中英对照指南，覆盖 40题/32题通过、school zone、校车、Intermediate License、40+10 小时和车灯规则。' : stateDescription(state)

  const examLabel = isPennsylvania ? '18 题模拟考试' : isMassachusetts ? '25 题模拟考试' : isWashington ? '40 题模拟考试' : '模拟考试'
  return <><JsonLd data={webPageJsonLd(guideTitle, jsonDescription, `/${state.slug}/guide`)} /><JsonLd data={faqJsonLd(faq)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '考试指南', path: `/${state.slug}/guide` }])} /><StateGuideLayout state={state} backLabel={stateBackLabel(state)} eyebrow={`${state.nameEn} Driver Guide`} title={guideTitle} intro={body} steps={guideSteps} questionCount={count} examLabel={examLabel} /><OpenAACrossLinks /></>
}
