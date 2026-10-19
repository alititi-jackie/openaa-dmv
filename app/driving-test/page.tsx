import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '美国驾照考试指南｜笔试流程、中文考试与题库全解析'
const description =
  '美国驾照考试（笔试）怎么考？支持中文的州、考试题型与题及答案解析、预约流程一次讲清，并附免费中文题库与模拟考试入口。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['美国驾照考试', '美国驾照笔试', '美国驾照考试中文', '美国驾照考试题及答案', '美国考驾照', 'DMV 笔试中文'],
  alternates: { canonical: '/driving-test' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/driving-test',
  },
}

const intro =
  '在美国考驾照，第一关是 DMV 的笔试（knowledge test / written test）。这篇把美国驾照考试的流程、哪些州支持中文考试、题型与评分规则一次讲清，并告诉你去哪里找中文题库和考试题及答案解析。'

const sections = [
  {
    heading: '美国驾照考试流程',
    paragraphs: [
      '美国驾照考试分两步：先过笔试（permit test），拿到学习许可（learner\'s permit），再约路考（road test）。笔试在各州 DMV 办公室进行，现在多数州支持网上预约，walk-in 也可以但排队久。',
      '笔试内容各州大同小异：道路规则、交通标志、安全驾驶知识。题数 18–50 题不等，多数州答对 80% 即通过。没通过可以重考，但两次之间通常要隔几天。',
    ],
  },
  {
    heading: '哪些州支持美国驾照考试中文版',
    paragraphs: [
      '好消息：纽约、加州、新泽西、宾州、麻州、华盛顿、德州、佛州等华人集中的州，DMV 笔试都提供中文试卷。去考试时直接跟工作人员说要中文版（Chinese）即可，不需要额外申请。',
      '但要注意：中文翻译的质量各州不一，有些州的翻译比较生硬。建议备考时中英对照着看，正式考试时遇到翻译别扭的题，靠英文关键词也能判断。',
    ],
    bullets: [
      '纽约：提供中文笔试，20 题答对 14 题通过',
      '加州：提供中文笔试，46 题答对 38 题通过',
      '新泽西：提供中文笔试，50 题答对 40 题通过',
      '德州：提供中文笔试，30 题答对 21 题通过',
    ],
  },
  {
    heading: '美国驾照考试题及答案：怎么高效备考',
    paragraphs: [
      '笔试的题库是公开的——各州 DMV 官网都有驾驶手册（driver handbook），考题基本都出自手册。但手册是英文的，直接啃效率低。最高效的方法是：先过一遍中文题库熟悉题型，再用模拟考试检验，最后回头看错题。',
      '本站按州整理了美国驾照考试中文题库，每道题都有答案解析；模拟考试按各州真实规则组卷计时，考前做 3–5 套模拟，正确率稳定在 90% 以上再去考，通过率会高很多。',
    ],
  },
  {
    heading: '考试当天带什么',
    paragraphs: [
      '去 DMV 考笔试一般要带：身份证明（护照、I-20、绿卡等）、地址证明（水电账单、银行信）、SSN 或社安号相关证明。具体清单各州不同，出门前对照官网检查。',
      '另外提醒：笔试通过后拿的是 learner\'s permit，不是正式驾照，开车时副驾必须有持照司机陪同，之后再预约路考。',
    ],
  },
]

const faq = [
  {
    question: '美国驾照笔试有中文吗？',
    answer:
      '有。纽约、加州、新泽西、宾州、麻州、华盛顿、德州、佛州等州的 DMV 笔试都提供中文试卷，考试时直接要求中文版即可。',
  },
  {
    question: '美国驾照考试多少题？答对多少通过？',
    answer:
      '各州不同：纽约 20 题答对 14 题，加州 46 题答对 38 题，新泽西 50 题答对 40 题，德州 30 题答对 21 题。多数州要求正确率 80% 左右。',
  },
  {
    question: '美国驾照考试题及答案去哪里找？',
    answer:
      '各州 DMV 官网的驾驶手册是官方题源；本站按州整理了中文题库与答案解析，并有模拟考试可以在线练习，考前建议做 3–5 套模拟题。',
  },
  {
    question: '笔试没通过可以重考吗？',
    answer:
      '可以。多数州允许当天或几天后重考，但重考可能要再交一次考试费。建议用模拟考试练到 90% 正确率再去，减少重考次数。',
  },
]

export default function DrivingTestPage() {
  const path = '/driving-test'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '美国驾照考试指南', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="选择你的州开始练题"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
