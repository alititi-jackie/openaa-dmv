import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import PracticeClient from '@/components/PracticeClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) return {}; return { title: `${stateAgencyLabel(state)} 随机练习和顺序练习`, description: stateDescription(state), alternates: { canonical: `/${state.slug}/practice` } } }
export default async function PracticePage({ params }: Props) { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) notFound(); return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(`${stateAgencyLabel(state)} 随机与顺序练习`, stateDescription(state), `/${state.slug}/practice`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '随机 / 顺序练习', path: `/${state.slug}/practice` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={stateBackLabel(state)} /><StudyPageHeader eyebrow="Practice" title={`${stateAgencyLabel(state)} 随机 / 顺序练习`} description="默认随机排列题目，也可以随时切换为顺序练习；答题记录和错题保存在当前浏览器。"/><PracticeClient questions={getStateQuestions(state.slug)} stateSlug={state.slug} storageKey={`openaa-dmv:${state.slug}:wrong`} /></div></section> }
