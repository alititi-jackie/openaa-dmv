import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import PracticeClient from '@/components/PracticeClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'Florida Class E 随机练习和顺序练习', description:'佛州 Class E 中文、English 和中英对照驾照笔试练习。', alternates:{ canonical:'/florida/practice' } }
export default function FloridaPracticePage(){ return <><PageStructuredData title="佛州 FLHSMV 随机与顺序练习" description="佛州 Class E 中文、English 和中英对照随机与顺序练习。" path="/florida/practice" stateName="佛罗里达州" statePath="/florida" pageName="随机 / 顺序练习"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 FLHSMV"/><StudyPageHeader eyebrow="Practice" title="佛州 FLHSMV 随机 / 顺序练习" description="默认随机排列题目，也可以随时切换为顺序练习；答题记录和错题保存在当前浏览器。"/><PracticeClient questions={getStateQuestions('florida')} stateSlug="florida" storageKey="openaa-dmv:florida:wrong"/></div></section></> }
