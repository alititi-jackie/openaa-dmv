import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getNewYorkQuestions } from '@/lib/new-york-bank'

export const metadata: Metadata={title:'2026 纽约 DMV 中文题库｜New York Permit Questions',description:'OpenAA 纽约 DMV 完整中文练习题库。',alternates:{canonical:'/ny/questions'}}
export default function NewYorkQuestionsPage(){const questions=getNewYorkQuestions();return <><PageStructuredData title="2026 纽约 DMV 中文题库" description="纽约独立驾照练习题库，支持中文、English 和中英对照。" path="/ny/questions" stateName="纽约州" statePath="/ny" pageName="驾照题库"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><StudyPageHeader eyebrow="New York · NY DMV" title="纽约 DMV 驾照题库" description={`当前共 ${questions.length} 道纽约独立审核练习题，支持练习模式、学习模式以及中文、English 和中英对照。`} /><QuestionsClient questions={questions} storageKey="openaa-dmv:ny:wrong" stateSlug="ny"/></div></section></>}
