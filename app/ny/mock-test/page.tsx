import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import MockTestClient from '@/components/exam/MockTestClient'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'2026 纽约 DMV 20题模拟考试｜New York Permit Test',description:'按 NY DMV Class D/DJ/E learner permit 笔试题量练习：20题、至少14题正确，并包含4道交通标志题。',alternates:{canonical:'/ny/mock-test'}}
export default function NewYorkMockPage(){const config=getStateExamConfig('ny');return <section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><div className="mb-5 rounded-lg border border-blue-200 bg-blue-50 p-4"><p className="font-black text-blue-950">NY DMV 正式规则</p><p className="mt-1 text-sm leading-6 text-blue-900">正式笔试共20题，至少答对14题；其中4道交通标志题至少答对2道。当前组卷固定抽取4道标志题。</p></div><MockTestClient questions={getNewYorkQuestions()} stateSlug="ny" config={config}/></div></section>}
