import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import WrongQuestionsClient from '@/components/WrongQuestionsClient'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 错题本',description:'New York DMV Permit 错题复习。',alternates:{canonical:'/ny/wrong-questions'}}
export default function NewYorkWrongPage(){return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><div className="mb-6"><p className="text-sm font-bold text-teal-700">Wrong Questions</p><h1 className="mt-2 text-3xl font-black">纽约 DMV 错题本</h1></div><WrongQuestionsClient questions={getNewYorkQuestions()} stateSlug="ny" storageKey="openaa-dmv:ny:wrong"/></div></section>}
