import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getTexasSeoArticle, texasSeoArticles } from '@/lib/texas-seo-content'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return texasSeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getTexasSeoArticle(seoSlug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/texas/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/texas/${article.slug}`,
    },
  }
}

export default async function TexasSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getTexasSeoArticle(seoSlug)
  if (!article) notFound()

  const path = `/texas/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(article.title, article.description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '德州 DPS', path: '/texas' },
        { name: article.title, path },
      ])} />
      <SeoArticleLayout
        title={article.title}
        intro={article.intro}
        practiceHref="/texas"
        practiceLabel="进入德州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
        officialName="Texas Department of Public Safety"
      />
    </>
  )
}
