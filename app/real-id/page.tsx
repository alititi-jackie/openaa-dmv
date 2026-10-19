import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = 'Real ID 是什么｜申请条件、材料清单与办理流程'
const description =
  'Real ID 是什么？2025 年 5 月 7 日起，坐飞机、进联邦机构必须用 Real ID 或护照。申请条件、材料清单、办理流程与常见问题一次讲清。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Real ID', 'real id 申请', 'real id 需要什么材料', 'real id 办理', '真实身份证', 'Real ID 驾照'],
  alternates: { canonical: '/real-id' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/real-id',
  },
}

const intro =
  '自 2025 年 5 月 7 日起，在美国坐国内航班、进入联邦机构，必须出示 Real ID 或护照——普通驾照不行了。这篇讲清 Real ID 是什么、谁需要办、要带什么材料、去哪里办。'

const sections = [
  {
    heading: 'Real ID 是什么',
    paragraphs: [
      'Real ID 是符合联邦安全标准的身份证件，2005 年《真实身份法案》立的法，2025 年 5 月 7 日正式强制执行。它的样子就是你的州驾照或州 ID，只是右上角多了一颗星星（★）标记。',
      '注意：Real ID 不是一种新证件类型，而是你现有驾照/州 ID 的"升级版"。申请时选 Real ID，DMV 会在你的驾照上加星标。',
    ],
  },
  {
    heading: '谁需要办 Real ID',
    paragraphs: [
      '如果你符合以下任一情况，就需要 Real ID（或用护照代替）：坐美国国内航班登机、进入联邦机构（如军事基地、联邦法院）、进核电站等受限设施。',
      '如果不出差不坐飞机、平时只开车，普通驾照也够用——但办驾照时顺手升级成 Real ID 是多数人的选择，因为只差几份材料。',
    ],
  },
  {
    heading: '申请 Real ID 需要什么材料',
    paragraphs: [
      'DMV 要求提供以下四类证明的原件（或认证复印件），缺一不可：',
    ],
    bullets: [
      '身份证明：美国护照、出生证明或绿卡等',
      '社安号证明：社安卡、W-2 或工资单（二选一）',
      '居住地址证明（两份）：水电账单、银行对账单、租房合同等，需显示姓名和现住址',
      '合法身份证明（非公民）：I-20、H-1B 批准信等有效签证文件',
    ],
  },
  {
    heading: '办理流程',
    paragraphs: [
      'Real ID 必须本人去 DMV 办理，不能网办：',
    ],
    bullets: [
      '第一步：在 DMV 官网预约（强烈建议，walk-in 排队很久）',
      '第二步：带齐上述四类材料原件去 DMV',
      '第三步：填表、拍照、交费（费用各州不同，约 $30–60）',
      '第四步：等 2–4 周，Real ID 邮寄到家',
    ],
  },
]

const faq = [
  {
    question: '没有 Real ID 还能坐飞机吗？',
    answer:
      '能，但必须用护照（或其他 TSA 认可的证件）代替。2025 年 5 月 7 日之后，普通无星标驾照不能再用于登机。',
  },
  {
    question: 'Real ID 和普通驾照有什么区别？',
    answer:
      '开车功能完全一样，区别是右上角的星标（★）和办理时更严格的材料审核。有星标的驾照可用于登机和进联邦机构，无星标的不行。',
  },
  {
    question: '绿卡/签证身份能办 Real ID 吗？',
    answer:
      '能。合法非移民身份（F-1、H-1B 等）可以办，但 Real ID 的有效期通常和你的签证/I-20 有效期挂钩，到期要续。',
  },
  {
    question: '办 Real ID 要多少钱？要等多久？',
    answer:
      '各州不同，约 $30–60。必须本人去 DMV，建议预约；办好后 2–4 周邮寄到家。',
  },
]

export default function RealIdPage() {
  const path = '/real-id'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: 'Real ID 指南', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="回首页练题"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
