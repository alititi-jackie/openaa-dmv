import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getMassachusettsSeoArticle, massachusettsSeoArticles } from '@/lib/massachusetts-seo-content'
import { normalizeSeoKeywords, normalizeSeoText } from '@/lib/seo-copy'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return massachusettsSeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getMassachusettsSeoArticle(seoSlug)
  if (!article) return {}
  const title = normalizeSeoText(article.title)
  const description = normalizeSeoText(article.description)
  const keywords = normalizeSeoKeywords(article.keywords)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/massachusetts/${article.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/massachusetts/${article.slug}`,
    },
  }
}

export default async function MassachusettsSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getMassachusettsSeoArticle(seoSlug)
  if (!article) notFound()

  const title = normalizeSeoText(article.title)
  const description = normalizeSeoText(article.description)
  const path = `/massachusetts/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '麻州 RMV', path: '/massachusetts' },
        { name: title, path },
      ])} />
      <SeoArticleLayout
        title={title}
        intro={article.intro}
        practiceHref="/massachusetts"
        practiceLabel="进入麻州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
        officialName="Massachusetts RMV"
      />
    </>
  )
}
