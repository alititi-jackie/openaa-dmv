import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 交通标志练习',description:'New York DMV Permit 道路交通标志专项练习。',alternates:{canonical:'/ny/signs'}}
export default function NewYorkSignsPage(){const questions=getNewYorkQuestions().filter((q)=>q.category==='signs');return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">Road Signs</p><h1 className="mt-2 text-3xl font-black">纽约 DMV 交通标志专项</h1><p className="mt-3 text-sm text-slate-600">共 {questions.length} 道交通标志题。正式20题笔试包含4道道路标志题。</p></div><QuestionsClient questions={questions} storageKey="openaa-dmv:ny:wrong" stateSlug="ny"/></div></section>}
