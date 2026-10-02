import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getNySeoArticle, nySeoArticles } from '@/lib/ny-seo-content'
import { normalizeSeoKeywords, normalizeSeoText } from '@/lib/seo-copy'
import { getSearchIntentOverride } from '@/lib/seo-search-intent-overrides'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return nySeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getNySeoArticle(seoSlug)
  if (!article) return {}
  const intent = getSearchIntentOverride('ny', seoSlug)
  const title = normalizeSeoText(intent?.title ?? article.title)
  const description = normalizeSeoText(intent?.description ?? article.description)
  const keywords = normalizeSeoKeywords(intent?.keywords ?? article.keywords)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/ny/${article.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/ny/${article.slug}`,
    },
  }
}

export default async function NewYorkSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getNySeoArticle(seoSlug)
  if (!article) notFound()
  const intent = getSearchIntentOverride('ny', seoSlug)
  const title = normalizeSeoText(intent?.title ?? article.title)
  const description = normalizeSeoText(intent?.description ?? article.description)
  const path = `/ny/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '纽约州 DMV', path: '/ny' },
        { name: title, path },
      ])} />
      <SeoArticleLayout
        title={title}
        intro={article.intro}
        practiceHref="/ny"
        practiceLabel="进入纽约州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
      />
    </>
  )
}
