import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import MockTestClient from '@/components/MockTestClient'
import NewJerseyMockTestClient from '@/components/NewJerseyMockTestClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getQuestionsForState } from '@/lib/question-bank'
import { getStateQuestions } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }

export function generateStaticParams() {
  return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const isNJ = state.slug === 'new-jersey'
  return {
    title: isNJ ? '2026 新泽西 MVC 50题模拟考试｜40题正确通过' : `${state.nameZh} DMV 中文模拟考试`,
    description: isNJ ? '新泽西 MVC 驾照知识考试模拟练习，按官方 50 题、40 题正确、80% 通过标准设计。' : stateDescription(state),
    alternates: { canonical: `/${state.slug}/mock-test` },
  }
}

export default async function MockTestPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const isNJ = state.slug === 'new-jersey'
  const questions = isNJ ? getStateQuestions(state.slug) : getQuestionsForState(state.slug)

  return (
    <section className="bg-[#f4f7fb] py-10">
      <JsonLd data={webPageJsonLd(isNJ ? '2026 新泽西 MVC 50题模拟考试' : `${state.nameZh} DMV 中文模拟考试`, isNJ ? '按 New Jersey MVC 50题、80%通过标准设计的模拟考试。' : stateDescription(state), `/${state.slug}/mock-test`)} />
      <JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '模拟考试', path: `/${state.slug}/mock-test` }])} />
      <div className="page-shell">
        {state.slug === 'california' ? <BackLink href="/california" label="返回加州 DMV" /> : null}
        {isNJ ? <BackLink href="/new-jersey" label="返回新泽西 MVC" /> : null}
        {isNJ ? <NewJerseyMockTestClient questions={questions} storageKey="openaa-dmv:new-jersey:wrong" /> : <MockTestClient questions={questions} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} />}
      </div>
    </section>
  )
}
