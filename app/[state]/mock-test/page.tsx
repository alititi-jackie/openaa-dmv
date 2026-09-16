import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import MockTestClient from '@/components/exam/MockTestClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const isNJ = state.slug === 'new-jersey'
  const isMA = state.slug === 'massachusetts'
  const isWA = state.slug === 'washington'
  const title = isNJ ? '2026 新泽西 MVC 50题模拟考试｜40题正确通过' : isMA ? '2026 麻州 RMV 25题模拟考试｜18题正确通过' : isWA ? '2026 华盛顿州 DOL 40题模拟考试｜32题正确通过' : `${stateAgencyLabel(state)} 中文模拟考试`
  const description = isNJ ? '新泽西 MVC 驾照知识考试模拟练习，按 50 题、40 题正确、80% 通过标准设计。' : isMA ? 'Massachusetts RMV Class D learner’s permit 模拟考试：25题、25分钟、至少答对18题通过，支持中文、English和中英对照。' : isWA ? 'Washington DOL Driving Knowledge Exam 模拟练习：40题、至少答对32题通过，支持中文、English和中英对照。' : stateDescription(state)
  return { title, description, alternates: { canonical: `/${state.slug}/mock-test` } }
}
export default async function MockTestPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const questions = getStateQuestions(state.slug)
  const config = getStateExamConfig(state.slug)
  const isNJ = state.slug === 'new-jersey'
  const isMA = state.slug === 'massachusetts'
  const isWA = state.slug === 'washington'
  const title = isNJ ? '2026 新泽西 MVC 50题模拟考试' : isMA ? '2026 麻州 RMV 25题模拟考试' : isWA ? '2026 华盛顿州 DOL 40题模拟考试' : `${stateAgencyLabel(state)} 中文模拟考试`
  const description = isNJ ? '按 New Jersey MVC 50题、80%通过标准设计的模拟考试。' : isMA ? '按 Massachusetts RMV Class D Permit Exam 的 25题、25分钟、18题正确通过标准设计。' : isWA ? '按 Washington DOL Driving Knowledge Exam 的 40题、32题正确通过标准设计。' : stateDescription(state)
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(title, description, `/${state.slug}/mock-test`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '模拟考试', path: `/${state.slug}/mock-test` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={stateBackLabel(state)} /><MockTestClient questions={questions} stateSlug={state.slug} config={config} /></div></section>
}
