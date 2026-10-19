import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '中国驾照在美国能用吗｜换美国驾照全指南'
const description =
  '中国驾照在美国能用吗？短期可用、长期要换：各州对中国驾照的认可政策、换美国驾照的流程，以及国际驾照（IDP）到底有没有用，一次讲清。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['中国驾照', '中国驾照在美国', '中国驾照换美国驾照', '国际驾照美国', 'IDP 美国', '中国驾照美国能用吗'],
  alternates: { canonical: '/chinese-license' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/chinese-license',
  },
}

const intro =
  '刚到美国的人最常问：中国驾照在美国能用吗？答案是：短期可以，长期不行。这篇讲清各州对中国驾照的认可政策、怎么换成美国驾照，以及国际驾照（IDP）到底有没有用。'

const sections = [
  {
    heading: '中国驾照在美国能用吗',
    paragraphs: [
      '多数州允许持中国驾照 + 有效签证短期开车，一般是入境后 30 天到 1 年，具体看州。比如加州允许游客持本国驾照开车，纽约州允许持外国驾照开车 1 年。但注意两点：',
    ],
    bullets: [
      '必须是"短期停留"身份（旅游、商务、留学初期）；一旦成为该州居民（resident），就必须在规定期限内（通常 30–60 天）考取本州驾照',
      '建议同时准备一份驾照英文翻译件或公证件，警察临检时出示更方便',
    ],
  },
  {
    heading: '国际驾照（IDP）有没有用',
    paragraphs: [
      '先说结论：在美国，IDP 只是你本国驾照的翻译件，不能单独使用——必须和中国驾照原件一起出示才有效。而且中国不是《联合国道路交通公约》缔约国，在国内办的"国际驾照"多是翻译公司产品，法律效力存疑。',
      '所以别花冤枉钱办所谓的国际驾照：一份正规的驾照翻译公证件更实用。',
    ],
  },
  {
    heading: '中国驾照换美国驾照：要重考吗',
    paragraphs: [
      '多数州不承认中国驾照直接换发，需要完整走一遍流程：DMV 笔试 → 拿 learner\'s permit → 路考 → 拿驾照。笔试有中文版，认真准备 1–2 周可以通过。',
      '少数州有互惠政策的传言，但截至目前，美国没有哪个州与中国大陆有驾照直接互换协议。网上说的"免考换发"多是中介话术，别信。',
      '好消息：有中国驾照、有实际驾驶经验的人，路考通过率远高于新手——考的都是基本操作，练 1–2 周熟悉本地规则即可。',
    ],
  },
  {
    heading: '换照流程四步',
    paragraphs: [
      '以多数州为例：',
    ],
    bullets: [
      '第一步：准备材料——护照、I-94、I-20 或其他身份文件、地址证明、SSN 或豁免信',
      '第二步：DMV 笔试——有中文版，考前用中文题库 + 模拟考试练习',
      '第三步：拿 learner\'s permit，开车练习（副驾需持照司机陪同）',
      '第四步：预约路考，通过后拿正式驾照',
    ],
  },
]

const faq = [
  {
    question: '中国驾照在美国能开多久？',
    answer:
      '看州。多数州允许持中国驾照短期开车 30 天到 1 年，但一旦成为该州居民，必须在 30–60 天内考取本州驾照。具体期限查你所在州 DMV 官网。',
  },
  {
    question: '中国驾照可以直接换美国驾照吗？',
    answer:
      '不可以。美国没有州与中国大陆有驾照互换协议，需要完整参加笔试和路考。所谓"免考换发"多是中介话术，不可信。',
  },
  {
    question: '国际驾照（IDP）在中国能办吗？在美国有用吗？',
    answer:
      '中国不是联合国道路交通公约缔约国，国内办的"国际驾照"法律效力存疑。在美国，IDP 只是翻译件，必须配合本国驾照原件使用，不能单独当驾照。',
  },
  {
    question: '有中国驾照，路考还难吗？',
    answer:
      '不难。有实际驾驶经验的人，路考主要练的是本地规则（STOP 停稳、盲区观察、平行泊车），1–2 周针对性练习通过率很高。',
  },
]

export default function ChineseLicensePage() {
  const path = '/chinese-license'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '中国驾照在美国', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="开始练中文笔试题"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
