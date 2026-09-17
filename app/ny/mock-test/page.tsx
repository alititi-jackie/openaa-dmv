import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import NewYorkMockTestClient from '@/components/exam/NewYorkMockTestClient'
import NoticeCard from '@/components/NoticeCard'
import PageStructuredData from '@/components/PageStructuredData'
import { getNewYorkQuestions } from '@/lib/new-york-bank'

export const metadata:Metadata={title:'2026 纽约 DMV 20题模拟考试｜New York Permit Test',description:'按 NY DMV Class D/DJ/E learner permit 笔试规则练习：20题、至少14题正确，且4道交通标志题至少答对2道。',alternates:{canonical:'/ny/mock-test'}}

export default function NewYorkMockPage(){
  return <><PageStructuredData title="2026 纽约 DMV 20题模拟考试" description="按纽约独立题库组卷，同时检查总题与交通标志双重通过条件。" path="/ny/mock-test" stateName="纽约州" statePath="/ny" pageName="模拟考试"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><NoticeCard title="NY DMV 正式规则" className="mb-5">正式笔试共20题，至少答对14题；其中4道交通标志题至少答对2道。本页每次固定抽取4道交通标志题，并同时检查两个通过条件。</NoticeCard><NewYorkMockTestClient questions={getNewYorkQuestions()}/></div></section></>
}
