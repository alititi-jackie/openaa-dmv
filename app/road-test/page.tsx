import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '美国驾照路考指南｜考试流程、常见挂科点与预约方法'
const description =
  '美国驾照路考（road test）怎么考？考试流程、考官评分要点、最常见的挂科原因、路考预约方法与当天注意事项，一次讲清。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['路考', '美国路考', '美国驾照路考', '路考预约', 'road test', 'DMV 路考', '路考挂科'],
  alternates: { canonical: '/road-test' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/road-test',
  },
}

const intro =
  '笔试通过拿到 learner\'s permit 之后，第二关就是路考（road test）。和笔试不同，路考考的是实际操作，考官坐在副驾按项目打分。这篇讲清美国驾照路考的流程、评分要点和最常见的挂科原因。'

const sections = [
  {
    heading: '路考流程',
    paragraphs: [
      '路考需要提前在 DMV 官网预约，热门地区可能要等几周。考试当天开自己的车（或教练车）去 DMV，考官先检查车辆：灯光、喇叭、刹车、转向灯都要正常，缺一样可能直接取消考试。',
      '考试一般 15–20 分钟，在 DMV 附近的实际道路上进行。考官会指令你完成一系列操作：起步、转弯、变道、路口让行、平行泊车（parallel parking）、三点掉头（three-point turn）、靠边停车等，全程按项目打分。',
    ],
  },
  {
    heading: '考官看什么：评分要点',
    paragraphs: [
      '考官主要看四样：',
    ],
    bullets: [
      '观察习惯：变道、转弯前是否打灯、看后视镜、转头看盲区（shoulder check）——不看盲区是最常见的扣分项',
      '车速控制：跟上限速，不超速也不过慢，学校区域降速',
      '路口处理：STOP 停稳 3 秒，让行规则正确，行人优先',
      '泊车：平行泊车一次到位，离路缘距离合适（一般 12 英寸内）',
    ],
  },
  {
    heading: '最常见的挂科原因',
    paragraphs: [
      '根据各州 DMV 的统计和教练的经验，路考挂科集中在几个地方：',
    ],
    bullets: [
      '变道/转弯不看盲区——直接大扣分',
      'STOP 没停稳就走——考官眼里等于闯 stop sign',
      '平行泊车压路缘或离太远',
      '超速，哪怕只超 5 mph',
      '路口犹豫不决或抢行',
      '危险动作：比如没看到行人、差点追尾——一次就挂',
    ],
  },
  {
    heading: '路考预约与当天准备',
    paragraphs: [
      '预约：在各州 DMV 官网的路考预约页面选时间地点，建议约工作日的上午，车少、考官状态好。改期一般免费，但要在考前 24–48 小时操作。',
      '当天带：learner\'s permit、身份证明、车辆保险和登记证明（registration）。提前 15 分钟到，熟悉一下 DMV 周边的路况——很多考试路线就在附近几个街区。',
    ],
  },
]

const faq = [
  {
    question: '美国路考难吗？通过率多少？',
    answer:
      '比笔试难一些，各州一次通过率约 50–60%。挂科多半不是技术不行，而是观察习惯（盲区、后视镜）和细节（停稳 3 秒）没做到位，针对性练 1–2 周就能过。',
  },
  {
    question: '路考需要自己带车吗？',
    answer:
      '是的。开自己的车或教练车去，考官会先检查车况：灯光、喇叭、刹车、转向灯都要正常。租车公司的车一般不能用于路考。',
  },
  {
    question: '路考挂了多久能重考？',
    answer:
      '各州不同，多数州隔几天到两周可以重约，重考要再交一次考试费。建议针对挂科项目练熟再约，不要裸考碰运气。',
  },
  {
    question: '平行泊车是必考的吗？',
    answer:
      '多数州必考，少数州（如佛州的部分考场）不考。即使你所在州不考，日常开车也用得上，建议学会。',
  },
]

export default function RoadTestPage() {
  const path = '/road-test'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '美国驾照路考指南', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="先练笔试，再约路考"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
