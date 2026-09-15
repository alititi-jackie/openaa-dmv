import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import PracticeClient from '@/components/PracticeClient'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 顺序练习和随机练习',description:'New York DMV Permit 中文顺序和随机练习。',alternates:{canonical:'/ny/practice'}}
export default function NewYorkPracticePage(){return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><PracticeClient questions={getNewYorkQuestions()} stateSlug="ny" storageKey="openaa-dmv:ny:wrong"/></div></section>}
