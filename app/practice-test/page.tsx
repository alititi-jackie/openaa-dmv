import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '美国驾照模拟考试｜免费 DMV Practice Test 在线练习'
const description =
  '免费美国驾照模拟考试（DMV practice test / DMV online test）：按各州真实考试规则组卷、计时评分，覆盖 permit practice test 与 drivers test practice，考前必练。'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    '美国驾照模拟考试',
    'dmv practice test',
    'dmv online test',
    'dmv permit practice test',
    'dmv exam test',
    'drivers test practice',
    'drivers license test',
    'DMV 模拟考试',
    '驾照模拟题',
  ],
  alternates: { canonical: '/practice-test' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/practice-test',
  },
}

const intro =
  '考 DMV 笔试之前，先做几套模拟考试（DMV practice test）——这是通过率最高的方法。本站的美国驾照模拟考试按各州真实规则组卷、计时、评分，做完自动收录错题，免费在线练习。'

const sections = [
  {
    heading: '为什么一定要做 DMV Practice Test',
    paragraphs: [
      '光看手册不动手，考试时很容易在相似选项上栽跟头。DMV online test 的价值在于：熟悉真实考试的题型和时间压力，提前暴露知识盲区。数据上，考前做过 3 套以上模拟考试的人，一次通过率明显更高。',
      '建议的节奏：先用题库分章节练习 → 做第一套模拟摸底 → 针对错题回头看解析 → 再做 2–3 套，正确率稳定 90% 以上再去 DMV。',
    ],
  },
  {
    heading: '模拟考试覆盖哪些内容',
    paragraphs: [
      '本站的 drivers test practice 覆盖笔试的全部题型，和你将要面对的 dmv exam test / dmv permit practice test 一致：',
    ],
    bullets: [
      '道路规则：限速、让行、跟车距离、变道超车',
      '交通标志：警告标志、禁令标志、指示标志辨认',
      '安全驾驶：酒驾法规、恶劣天气、分心驾驶',
      '各州特有规则：比如加州的摩托车道分割、纽约的 ROW 规则',
    ],
  },
  {
    heading: '各州模拟考试入口',
    paragraphs: [
      '模拟考试按州分组，因为每个州的题数、通过线和侧重点都不同。选你所在的州进入，系统会按该州真实考试规则组卷：纽约 20 题、加州 46 题、新泽西 50 题、德州 30 题……做完立即评分，错题自动进错题本。',
      '目前支持：纽约、加州、新泽西、宾州、麻州、华盛顿、德州、佛州。多数州提供中文、English 和中英对照三种语言。',
    ],
  },
  {
    heading: '模拟考试 vs 真实考试',
    paragraphs: [
      '模拟考试的题目来自各州 DMV 驾驶手册的公开知识点，和真实考试的覆盖范围一致，但题目不会一模一样。真实考试由 DMV 官方出题，题库会定期更新。',
      '所以模拟考 90 分不等于稳过——它最大的作用是帮你找到薄弱环节。把每套模拟的错题弄懂，比刷 10 套囫囵吞枣有用得多。',
    ],
  },
]

const faq = [
  {
    question: 'DMV practice test 免费吗？',
    answer:
      '本站的模拟考试免费。DMV 官方收取的笔试考试费需在 DMV 缴纳，和在线练习无关。',
  },
  {
    question: 'dmv permit practice test 和 dmv exam test 有区别吗？',
    answer:
      '没有本质区别，都是指驾照笔试（knowledge test / written test）的练习。Permit test 强调考的是学习许可，exam test 是泛指考试，练习内容一致。',
  },
  {
    question: '做几套模拟考试再去考比较稳？',
    answer:
      '建议至少 3 套，且最近 2 套正确率稳定在 90% 以上。重点不是刷数量，而是把每套的错题弄懂。',
  },
  {
    question: '模拟考试有中文吗？',
    answer:
      '有。纽约、加州、新泽西、宾州、麻州、华盛顿、德州、佛州的模拟考试都支持中文，部分州还有 English 和中英对照。',
  },
]

export default function PracticeTestPage() {
  const path = '/practice-test'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '美国驾照模拟考试', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="开始免费模拟考试"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
