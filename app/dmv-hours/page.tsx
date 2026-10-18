import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '美国 DMV 营业时间查询｜DMV open hours、节假日是否开门'
const description =
  '美国 DMV 营业时间（DMV open hours）怎么查？各州 DMV 办公时间、周末是否开门、节假日闭馆安排，以及去 DMV 办事前的预约与材料准备指南。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['DMV 营业时间', 'opendmv', 'open dmv', 'dmvopen', 'DMV open hours', 'DMV 开门时间', 'DMV 节假日'],
  alternates: { canonical: '/dmv-hours' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/dmv-hours',
  },
}

const intro =
  '去 DMV 办事之前，先确认它开不开门（DMV open hours）。美国各州 DMV 的营业时间不统一，周末大多闭馆，联邦节假日也休息；很多业务现在要求先网上预约，直接 walk-in 可能白跑一趟。这篇教你怎么查你所在州 DMV 的营业时间。'

const sections = [
  {
    heading: '怎么查 DMV 营业时间',
    paragraphs: [
      '最可靠的方法是查你所在州 DMV 官网的办公地点（office locator）页面，输入邮编就能看到附近网点的地址、营业时间（open hours）和是否需要预约。不要轻信第三方网站上的时间，节假日调休时它们更新不及时。',
      '如果你搜的是 opendmv、open dmv 或 dmvopen，想找的一般就是"DMV 现在开门吗"——答案因州、因网点而异，务必以各州 DMV 官网为准。',
    ],
  },
  {
    heading: '各州 DMV 一般营业时间',
    paragraphs: [
      '大多数州的 DMV 工作日营业时间为早上 8 点到下午 5 点左右，中午不休息；周六部分网点上午开半天，周日普遍闭馆。但例外很多：比如纽约州部分网点周六开门，加州 DMV 周六只有部分办公室营业。',
      '去之前做两件事：一是在官网确认该网点当天的 open hours，二是看是否需要预约——加州、德州等州的热门业务（Real ID、路考）基本都要先预约。',
    ],
    bullets: [
      '工作日：一般 8:00 AM – 5:00 PM，中午不休',
      '周六：部分网点上午营业，部分州完全闭馆',
      '周日：绝大多数州闭馆',
      '联邦节假日：全国 DMV 闭馆（如国庆日、感恩节、圣诞节）',
    ],
  },
  {
    heading: '节假日 DMV 开门吗',
    paragraphs: [
      '联邦节假日 DMV 一律闭馆，包括：元旦、马丁·路德·金日、总统日、阵亡将士纪念日、独立日、劳工节、哥伦布日、退伍军人节、感恩节、圣诞节。各州自己的节假日（如麻州的爱国者日）该州 DMV 也会闭馆。',
      '节假日前后是 DMV 最忙的时候，建议错峰：节后第一天通常排队最长，工作日的上午 10 点前或下午 3 点后人相对少。',
    ],
  },
  {
    heading: '去 DMV 之前准备什么',
    paragraphs: [
      '查好营业时间只是第一步。去 DMV 办事（考笔试、换 Real ID、车辆登记）一般要带：身份证明（护照/I-20/绿卡等）、地址证明（水电账单或银行信）、SSN 或相关证明。具体清单各州不同，出门前对照官网的材料清单检查一遍，少带一样就得再跑一趟。',
      '笔试可以在家先练：本站有各州 DMV 中文题库与模拟考试，笔试通过率会高很多。',
    ],
  },
]

const faq = [
  {
    question: 'DMV 周末开门吗（DMV open on weekends）？',
    answer:
      '多数州的 DMV 周日闭馆，周六部分网点上午营业、部分州完全闭馆。具体以你所在州 DMV 官网的办公地点页面为准，出门前务必确认。',
  },
  {
    question: 'opendmv / open dmv 查的是什么？',
    answer:
      '一般是指查询 DMV 的营业时间（open hours）或某家 DMV 网点现在是否开门。最可靠的办法是上各州 DMV 官网的 office locator 页面，输入邮编查询。',
  },
  {
    question: '去 DMV 需要预约吗？',
    answer:
      '看州和业务。加州、德州等州的 Real ID、路考等热门业务通常要求网上预约；简单的笔试有些州可以直接 walk-in。建议一律先上官网预约，能省几小时排队。',
  },
  {
    question: '联邦节假日 DMV 开门吗？',
    answer:
      '不开。联邦节假日全国 DMV 闭馆，各州自己的节假日该州 DMV 也闭馆。节假日前后人最多，建议错峰前往。',
  },
]

export default function DmvHoursPage() {
  const path = '/dmv-hours'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: 'DMV 营业时间', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="顺便练一下 DMV 笔试"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
