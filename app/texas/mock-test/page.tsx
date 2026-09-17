import type { Metadata } from 'next'
import BackLink from '@/components/BackLink'
import JsonLd from '@/components/JsonLd'
import NoticeCard from '@/components/NoticeCard'
import TexasMockTestClient from '@/components/exam/TexasMockTestClient'
import { getStateExamConfig } from '@/lib/exam/exam-config'
import { getStateQuestions } from '@/lib/state-question-bank'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: '2026 德州 DPS 30题模拟练习｜Knowledge Test 70%通过标准',
  description: 'Texas DPS Knowledge Test 30题模拟练习，按官方明确的70%通过标准评分。正式普通非商业驾照知识考试目前不提供中文，只提供 English 或 Spanish。',
  alternates: { canonical: '/texas/mock-test' },
}

export default function TexasMockTestPage() {
  const questions = getStateQuestions('texas')
  const config = getStateExamConfig('texas')
  return <section className="bg-[#f4f7fb] py-10"><JsonLd data={webPageJsonLd('2026 德州 DPS 30题模拟练习', '本站采用30题练习模式并按Texas DPS官方70%通过标准评分；正式考试语言为English或Spanish。', '/texas/mock-test')} /><JsonLd data={breadcrumbJsonLd([{ name: '首页', path: '/' }, { name: '德克萨斯州', path: '/texas' }, { name: '30题模拟练习', path: '/texas/mock-test' }])} /><div className="page-shell"><BackLink href="/texas" label="返回德州 DPS" /><NoticeCard title="正式考试语言提醒" tone="warning" className="mb-5">Texas DPS 普通非商业驾照正式 Knowledge Test 当前不提供中文，只提供 English 或 Spanish。本站模拟考试只提供 English / 中英对照；中文学习请使用题库或普通练习。</NoticeCard><TexasMockTestClient questions={questions} config={config} /></div></section>
}
