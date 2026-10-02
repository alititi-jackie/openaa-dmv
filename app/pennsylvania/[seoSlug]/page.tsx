import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getPennsylvaniaSeoArticle, pennsylvaniaSeoArticles } from '@/lib/pennsylvania-seo-content'
import { normalizeSeoKeywords, normalizeSeoText } from '@/lib/seo-copy'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return pennsylvaniaSeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getPennsylvaniaSeoArticle(seoSlug)
  if (!article) return {}
  const title = normalizeSeoText(article.title)
  const description = normalizeSeoText(article.description)
  const keywords = normalizeSeoKeywords(article.keywords)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `/pennsylvania/${article.slug}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/pennsylvania/${article.slug}`,
    },
  }
}

export default async function PennsylvaniaSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getPennsylvaniaSeoArticle(seoSlug)
  if (!article) notFound()

  const title = normalizeSeoText(article.title)
  const description = normalizeSeoText(article.description)
  const path = `/pennsylvania/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(title, description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '宾州 DMV', path: '/pennsylvania' },
        { name: title, path },
      ])} />
      <SeoArticleLayout
        title={title}
        intro={article.intro}
        practiceHref="/pennsylvania"
        practiceLabel="进入宾州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
        officialName="PennDOT Driver and Vehicle Services"
      />
    </>
  )
}
