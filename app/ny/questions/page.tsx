import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import { getNewYorkQuestions } from '@/lib/new-york-bank'

export const metadata: Metadata={title:'2026 纽约 DMV 中文题库｜New York Permit Questions',description:'OpenAA 纽约 DMV 完整中文练习题库。',alternates:{canonical:'/ny/questions'}}
export default function NewYorkQuestionsPage(){const questions=getNewYorkQuestions();return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">New York · NY DMV</p><h1 className="mt-2 text-3xl font-black">纽约 DMV 完整题库</h1><p className="mt-3 text-sm leading-6 text-slate-600">当前共 {questions.length} 道 OpenAA 纽约 DMV 审核练习题。</p></div><QuestionsClient questions={questions} storageKey="openaa-dmv:ny:wrong" stateSlug="ny"/></div></section>}
