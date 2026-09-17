import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getQuestionSignMeta } from '@/lib/sign-visuals'
import { getStateQuestionsByCategory } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 交通标志练习', description:'佛州 Class E 交通标志、信号和道路标线练习。', alternates:{ canonical:'/florida/signs' } }
export default function FloridaSignsPage(){ const questions=getStateQuestionsByCategory('florida','signs').filter((q)=>getQuestionSignMeta(q)!==null); return <><PageStructuredData title="佛州 FLHSMV 交通标志练习" description="佛州 Class E 交通标志、信号和道路标线识图练习。" path="/florida/signs" stateName="佛罗里达州" statePath="/florida" pageName="交通标志"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 FLHSMV"/><StudyPageHeader eyebrow="Road Signs" title="佛州 FLHSMV 交通标志练习" description={`共 ${questions.length} 道已配对应图片的交通标志识图题。内容直接来自佛州最终题库，题库更新后本页自动同步。`} /><QuestionsClient questions={questions} storageKey="openaa-dmv:florida:wrong" stateSlug="florida"/></div></section></> }
