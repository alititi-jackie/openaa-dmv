import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) return {}; return { title: `${stateAgencyLabel(state)} 错题本`, description: stateDescription(state), alternates: { canonical: `/${state.slug}/wrong-questions` } } }
export default async function WrongQuestionsPage({ params }: Props) { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) notFound(); return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(`${stateAgencyLabel(state)} 错题本`, stateDescription(state), `/${state.slug}/wrong-questions`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '错题本', path: `/${state.slug}/wrong-questions` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={stateBackLabel(state)} /><StudyPageHeader eyebrow="Wrong Questions" title={`${stateAgencyLabel(state)} 错题本`} description="练习和模拟考试中的错题会保存在当前浏览器，可在这里集中复习。" /><WrongQuestionsClient questions={getStateQuestions(state.slug)} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} /></div></section> }
