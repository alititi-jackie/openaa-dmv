import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import NoticeCard from '@/components/NoticeCard'
import MockTestClient from '@/components/exam/MockTestClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStatePageConfig } from '@/lib/state-page-config'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const page = getStatePageConfig(state).mockTest!
  return { title: page.title, description: page.description, alternates: { canonical: `/${state.slug}/mock-test` } }
}
export default async function MockTestPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const questions = getStateQuestions(state.slug)
  const config = getStateExamConfig(state.slug)
  const page = getStatePageConfig(state).mockTest!
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(page.pageTitle ?? page.title, page.pageDescription ?? page.description, `/${state.slug}/mock-test`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: page.breadcrumbLabel ?? '模拟考试', path: `/${state.slug}/mock-test` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={page.backLabel ?? stateBackLabel(state)} />{page.notices?.map((notice)=><NoticeCard key={notice.title} title={notice.title} tone={notice.tone} className="mb-4">{notice.body}</NoticeCard>)}<MockTestClient questions={questions} stateSlug={state.slug} config={config} allowedLanguages={page.allowedLanguages} defaultLanguage={page.defaultLanguage} /></div></section>
}
