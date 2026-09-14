import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import QuestionsClient from '@/components/QuestionsClient'
import { dmvStates, getLiveStateBySlug } from '@/lib/dmv-data'
import { getStateQuestions } from '@/lib/state-question-bank'
import { stateAgencyLabel, stateBackLabel } from '@/lib/state-ui'
import { breadcrumbJsonLd, stateDescription, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ state: string }> }
export function generateStaticParams() { return dmvStates.filter((state) => state.status === 'live').map((state) => ({ state: state.slug })) }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) return {}; const isNJ=state.slug==='new-jersey'; return { title: state.slug === 'california' ? '2026 加州 DMV 中英文题库｜驾照笔试练习' : isNJ ? '2026 新泽西 MVC 驾照题库｜50题知识考试练习' : `${stateAgencyLabel(state)} 题库｜中文驾照笔试练习`, description: isNJ ? '新泽西 MVC 驾照知识考试练习题库，包含 NJ 专属考点与公共核心题。' : stateDescription(state), alternates: { canonical: `/${state.slug}/questions` } } }
export default async function QuestionsPage({ params }: Props) { const { state: stateSlug } = await params; const state = getLiveStateBySlug(stateSlug); if (!state) notFound(); const isNJ=state.slug==='new-jersey'; const questions = getStateQuestions(state.slug); const pageTitle = `${stateAgencyLabel(state)} 驾照题库`; return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd(state.slug === 'california' ? '2026 加州 DMV 中英文题库' : pageTitle, stateDescription(state), `/${state.slug}/questions`)} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: state.nameZh, path: `/${state.slug}` }, { name: '驾照题库', path: `/${state.slug}/questions` }])} /><div className="page-shell"><BackLink href={`/${state.slug}`} label={stateBackLabel(state)} /><div className="mb-6"><p className="text-sm font-bold text-teal-700">{state.nameEn} · {state.officialName}</p><h1 className="mt-2 text-3xl font-black text-slate-950">{pageTitle}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">当前共 {questions.length} 道练习题。{isNJ ? '题库由新泽西专属考点与公共核心题组成；正式知识考试为50题，至少答对40题通过。' : '可使用练习模式或学习模式；已完成英文校对的题目支持中文、English 和中英对照。'}</p></div><QuestionsClient questions={questions} storageKey={`openaa-dmv:${state.slug}:wrong`} stateSlug={state.slug} /></div></section> }
