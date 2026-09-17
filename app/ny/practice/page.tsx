import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import PracticeClient from '@/components/PracticeClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getNewYorkQuestions } from '@/lib/new-york-bank'
export const metadata:Metadata={title:'纽约 DMV 随机练习和顺序练习',description:'New York DMV Permit 中文随机和顺序练习。',alternates:{canonical:'/ny/practice'}}
export default function NewYorkPracticePage(){return <><PageStructuredData title="纽约 DMV 随机与顺序练习" description="纽约独立题库随机和顺序刷题练习。" path="/ny/practice" stateName="纽约州" statePath="/ny" pageName="随机 / 顺序练习"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/ny" label="返回纽约 DMV"/><StudyPageHeader eyebrow="Practice" title="纽约 DMV 随机 / 顺序练习" description="默认随机排列纽约独立题库，也可以随时切换为顺序练习；答题记录和错题保存在当前浏览器。"/><PracticeClient questions={getNewYorkQuestions()} stateSlug="ny" storageKey="openaa-dmv:ny:wrong"/></div></section></>}
