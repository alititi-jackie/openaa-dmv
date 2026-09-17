import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 错题本',description:'New York DMV Permit 错题复习。',alternates:{canonical:'/ny/wrong-questions'}}
export default function NewYorkWrongPage(){return <><PageStructuredData title="纽约 DMV 错题本" description="集中复习纽约 DMV 练习和模拟考试中的错题。" path="/ny/wrong-questions" stateName="纽约州" statePath="/ny" pageName="错题本"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><StudyPageHeader eyebrow="Wrong Questions" title="纽约 DMV 错题本" description="练习和模拟考试中的错题会保存在当前浏览器，可在这里集中复习。"/><WrongQuestionsClient questions={getNewYorkQuestions()} stateSlug="ny" storageKey="openaa-dmv:ny:wrong"/></div></section></>}
