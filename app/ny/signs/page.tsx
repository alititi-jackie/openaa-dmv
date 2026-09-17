import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 交通标志练习',description:'New York DMV Permit 道路交通标志专项练习。',alternates:{canonical:'/ny/signs'}}
export default function NewYorkSignsPage(){const questions=getNewYorkQuestions().filter((q)=>q.category==='signs');return <><PageStructuredData title="纽约 DMV 交通标志练习" description="纽约独立题库交通标志专项识图练习。" path="/ny/signs" stateName="纽约州" statePath="/ny" pageName="交通标志"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><StudyPageHeader eyebrow="Road Signs" title="纽约 DMV 交通标志练习" description={`共 ${questions.length} 道交通标志题。内容直接来自纽约独立题库；正式20题笔试包含4道道路标志题。`} /><QuestionsClient questions={questions} storageKey="openaa-dmv:ny:wrong" stateSlug="ny"/></div></section></>}
