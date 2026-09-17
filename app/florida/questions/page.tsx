import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import QuestionsClient from '@/components/QuestionsClient'
import StudyPageHeader from '@/components/StudyPageHeader'
import PageStructuredData from '@/components/PageStructuredData'
import { getStateQuestions } from '@/lib/state-question-bank'

export const metadata: Metadata = { title:'2026 佛州 Class E 中文题库｜Florida 驾照笔试练习', description:'Florida Class E 中文、English 和中英对照题库，覆盖佛州道路规则、Learner License、校车、限速、安全驾驶和交通标志。', alternates:{ canonical:'/florida/questions' } }
export default function FloridaQuestionsPage(){ const questions=getStateQuestions('florida'); return <><PageStructuredData title="2026 佛州 Class E 驾照题库" description="佛州 FLHSMV 中文、English 和中英对照练习题库。" path="/florida/questions" stateName="佛罗里达州" statePath="/florida" pageName="驾照题库"/><section className="bg-[#f4f7fb] py-10"><div className="page-shell"><BackLink href="/florida" label="返回佛州 FLHSMV"/><StudyPageHeader eyebrow="Florida · FLHSMV" title="佛州 FLHSMV 驾照题库" description={`当前共 ${questions.length} 道练习题，支持中文、English 和中英对照。`} /><QuestionsClient questions={questions} storageKey="openaa-dmv:florida:wrong" stateSlug="florida"/></div></section></> }
