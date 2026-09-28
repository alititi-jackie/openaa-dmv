import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStatePageConfig } from '@/lib/state-page-config'
import { getQuestionSignMeta } from '@/lib/sign-visuals'
import { getStateQuestionsByCategory } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) return {}; const config=getStatePageConfig(state).signs!; return { title: config.title, description: config.description, alternates: { canonical: `/${state.slug}/signs` } } }
export default async function SignsPage({ params }: Props) { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) notFound(); const config=getStatePageConfig(state).signs!; const signQuestions = getStateQuestionsByCategory(state.slug, 'signs').filter((question) => getQuestionSignMeta(question) !== null); return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(config.structuredTitle ?? `${stateAgencyLabel(state)} 交通标志练习`, config.structuredDescription ?? stateDescription(state), `/${state.slug}/signs`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '交通标志', path: `/${state.slug}/signs` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={config.backLabel ?? stateBackLabel(state)} /><StudyPageHeader eyebrow="Road Signs" title={config.heading ?? `${stateAgencyLabel(state)} 交通标志练习`} description={config.headerDescription?.(signQuestions.length) ?? `共 ${signQuestions.length} 道已配对应图片的交通标志识图题。内容直接来自该州最终题库，题库更新后本页自动同步。`} /><QuestionsClient questions={signQuestions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} /></div></section> }
