import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStatePageConfig } from '@/lib/state-page-config'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) return {}
  const config = getStatePageConfig(state).questions!
  return { title: config.title, description: config.description, alternates: { canonical: `/${state.slug}/questions` } }
}
export default async function QuestionsPage({ params }: Props) {
  const { state: stateSlug } = await params
  const state = getLiveStateBySlug(stateSlug)
  if (!state) notFound()
  const questions = getStateQuestions(state.slug)
  const config = getStatePageConfig(state).questions!
  const pageTitle = `${stateAgencyLabel(state)} 驾照题库`
  const headerDescription = config.headerDescription?.(questions.length) ?? `当前共 ${questions.length} 道练习题。可使用练习模式或学习模式；已完成英文校对的题目支持中文、English 和中英对照。`
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(config.structuredTitle ?? pageTitle, config.structuredDescription ?? stateDescription(state), `/${state.slug}/questions`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '驾照题库', path: `/${state.slug}/questions` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={config.backLabel ?? stateBackLabel(state)} /><StudyPageHeader eyebrow={config.eyebrow ?? `${state.nameEn} · ${state.officialName}`} title={config.heading ?? pageTitle} description={headerDescription} /><QuestionsClient questions={questions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} /></div></section>
}
