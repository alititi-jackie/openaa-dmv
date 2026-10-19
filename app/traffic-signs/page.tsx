import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

const title = '美国交通标志中文图解｜DMV 交通标志大全与记忆方法'
const description =
  '美国交通标志中文图解：警告标志、禁令标志、指示标志的中文含义全解析，附 DMV 笔试高频标志与记忆技巧。'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['美国交通标志中文', '美国交通标志', 'DMV 交通标志', '美国路标中文', '交通标志图解', 'road signs 中文'],
  alternates: { canonical: '/traffic-signs' },
  openGraph: {
    type: 'article',
    title,
    description,
    url: '/traffic-signs',
  },
}

const intro =
  '交通标志题占 DMV 笔试近三分之一，而且是路考也要用的真知识。这篇把美国交通标志按颜色形状分类，用中文讲清每个标志的含义，并附上笔试最高频的标志清单。'

const sections = [
  {
    heading: '先看颜色和形状：八类标志速记',
    paragraphs: [
      '美国交通标志的设计逻辑很简单：颜色 + 形状决定大类，记住 8 组就够了。',
    ],
    bullets: [
      '红色八角形：STOP（停车让行），只有这一个',
      '红色倒三角：YIELD（让行）',
      '红色圆形：禁令（禁止通行、禁止转弯等）',
      '黄色菱形：警告（前方弯道、施工、动物穿越等）',
      '橙色菱形：施工区警告',
      '绿色长方形：指路信息（出口、距离、方向）',
      '蓝色长方形：服务信息（加油、医院、休息区）',
      '荧光黄绿：学校区域和行人警告',
    ],
  },
  {
    heading: 'DMV 笔试最高频的交通标志',
    paragraphs: [
      '以下这些标志在各州笔试中出现频率最高，务必认熟：',
    ],
    bullets: [
      'STOP：完全停稳 3 秒，确认安全再走——笔试和路考都必考',
      'YIELD：减速让行，有车先让',
      'DO NOT ENTER：禁止驶入，常和单行道配合考',
      'WRONG WAY：逆行警告',
      'SPEED LIMIT：限速，注意学校区域限速通常 15–25 mph',
      'NO TURN ON RED：红灯禁止右转（默认红灯可右转，除非有此标志）',
      'RAILROAD CROSSING：铁路道口，黄色圆形预告 + 白色交叉 X',
      'SCHOOL ZONE：学校区域，限速降低、罚款翻倍',
    ],
  },
  {
    heading: '容易混淆的标志对',
    paragraphs: [
      '笔试最爱考长得像的标志，重点区分这几对：',
    ],
    bullets: [
      'YIELD（倒三角）vs STOP（八角形）：都是让行，但 STOP 必须完全停稳',
      'NO PARKING vs NO STANDING vs NO STOPPING：禁止程度递增，纽约常考',
      'Divided Highway Begins vs Ends：分隔带开始/结束，箭头方向是关键',
      'Merge vs Lane Ends：并道 vs 车道结束，标志图形细微差别',
    ],
  },
  {
    heading: '记忆方法：在练习里认标志',
    paragraphs: [
      '死记硬背标志含义效率低。建议去本站的交通标志专项练习里认——看图选含义，做错自动收录，几轮下来高频标志就全熟了。考试时先看颜色形状定大类，再看图形定具体含义，基本不会错。',
    ],
  },
]

const faq = [
  {
    question: '美国交通标志笔试考多少？',
    answer:
      '交通标志题约占笔试的四分之一到三分之一。各州题数不同，但 STOP、YIELD、限速、学校区域几乎是必考题。',
  },
  {
    question: '红灯可以右转吗？',
    answer:
      '美国默认红灯可以右转（先停稳、确认安全），但如果有 NO TURN ON RED 标志则禁止。纽约市是例外：全市默认红灯禁止右转。',
  },
  {
    question: '黄色菱形和橙色菱形有什么区别？',
    answer:
      '黄色菱形是一般警告标志（弯道、路滑等），橙色菱形专用于施工区警告。施工区内超速罚款通常翻倍，笔试常考。',
  },
  {
    question: '去哪里练习交通标志？',
    answer:
      '本站有交通标志专项练习（看图选含义），覆盖 8 个州的笔试高频标志，做错自动进错题本，适合考前突击。',
  },
]

export default function TrafficSignsPage() {
  const path = '/traffic-signs'
  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '首页', path: '/' },
          { name: '美国交通标志中文', path },
        ])}
      />
      <SeoArticleLayout
        title={title}
        intro={intro}
        practiceHref="/"
        practiceLabel="去练交通标志专项"
        sections={sections}
        faq={faq}
        officialName="各州 DMV"
      />
    </>
  )
}
