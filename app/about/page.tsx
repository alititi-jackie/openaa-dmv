import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = 'OpenAA DMV 是什么｜美国 DMV 中文驾照考试平台介绍'
const description =
  'OpenAA DMV（openaadmv）是专为华人打造的美国 DMV 驾照笔试中文学习平台，覆盖纽约、加州、新泽西等 8 个州的中文题库、模拟考试与交通标志练习。官网为 dmv.openaa.com。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['OpenAA DMV', 'openaadmv', 'openaa dmv', 'dmvopenaa', 'dmv openaa', 'openaadmv.com', '美国 DMV 中文', 'DMV 中文题库'],
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/about',
  },
}

const intro =
  'OpenAA DMV 是专为在美华人打造的 DMV 驾照笔试中文学习平台。无论你是搜 openaa dmv、openaadmv，还是 dmvopenaa、dmv openaa 找到这里，都是同一个网站——覆盖纽约、加州、新泽西、宾州、麻州、华盛顿、德州、佛州 8 个州的中文题库、模拟考试与交通标志练习。'

const sections = [
  {
    heading: 'OpenAA DMV 是什么',
    paragraphs: [
      'OpenAA DMV（常被简写为 openaadmv）是一个免费的美国 DMV 驾照笔试在线学习平台，主要服务在美华人。平台按州整理驾照笔试规则，提供中文题库、在线模拟考试、交通标志辨认和错题本，多数州还支持 English 英文版与中英对照练习。',
      '和 DMV 官网的英文手册不同，OpenAA DMV 把每个州的笔试知识点翻译成了中文，并配上答案解析，适合英文不够好、第一次在美国考驾照的人。',
    ],
  },
  {
    heading: '名字有几种写法？',
    paragraphs: [
      '本站的正式名称是 OpenAA DMV，官网地址是 dmv.openaa.com。网上有人把它写作 openaadmv（连写）、dmvopenaa 或 dmv openaa（前后倒置），这些都是指同一个平台。',
      '注意：openaadmv.com 并不是本站的官方域名。认准官网 dmv.openaa.com，避免在仿冒网站输入个人信息。',
    ],
  },
  {
    heading: '平台能做什么',
    paragraphs: ['OpenAA DMV 目前覆盖 8 个州，每个州都包含以下学习模块：'],
    bullets: [
      '中文题库：按道路规则、安全驾驶、交通标志分类练习，附答案解析',
      '模拟考试：按各州真实考试规则组卷、计时、评分',
      '交通标志：标志图形辨认专项练习',
      '错题本：自动收录做错的题，考前集中复习',
      '官方入口：各州 DMV 官网、手册与预约链接，方便核对最新政策',
    ],
  },
  {
    heading: '适合哪些人',
    paragraphs: [
      '刚到美国、需要考驾照的华人新移民；在美国多年但一直没考驾照的人；英文阅读吃力、希望用中文备考笔试的人；以及帮家人（比如父母）准备考试的人。',
      '笔试通过后，路考预约、车辆登记等手续仍需通过各州 DMV 官方渠道办理，本站提供官方入口方便跳转。',
    ],
  },
]

const faq = [
  {
    question: 'OpenAA DMV 和 openaadmv 是同一个网站吗？',
    answer:
      '是的。openaadmv 只是 OpenAA DMV 的连写，dmvopenaa、dmv openaa 则是前后倒置的写法，指的都是本站——官网为 dmv.openaa.com 的美国 DMV 中文驾照考试平台。',
  },
  {
    question: 'openaadmv.com 是官网吗？',
    answer:
      '不是。本站官网是 dmv.openaa.com。请认准官方域名，不要在不明网站输入姓名、地址等个人信息。',
  },
  {
    question: 'OpenAA DMV 收费吗？',
    answer:
      '本站的题库、模拟考试等学习功能免费使用。DMV 官方收取的考试费、驾照工本费需在 DMV 缴纳，与本站无关。',
  },
  {
    question: '覆盖哪些州？',
    answer:
      '目前覆盖纽约、加州、新泽西、宾夕法尼亚、马萨诸塞、华盛顿、德州、佛罗里达 8 个州，每个州都有独立的中文题库与模拟考试。',
  },
]

export default function AboutPage() {
  const path = '/about'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '关于 OpenAA DMV', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="选择你的州开始练习"
        sections={sections}
        faq={faq}
        officialName="OpenAA DMV"
      />
    </>
  )
}
