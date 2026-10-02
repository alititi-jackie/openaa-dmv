import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getNySeoArticle, nySeoArticles } from '@/lib/ny-seo-content'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return nySeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getNySeoArticle(seoSlug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/ny/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/ny/${article.slug}`,
    },
  }
}

export default async function NewYorkSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getNySeoArticle(seoSlug)
  if (!article) notFound()

  const path = `/ny/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(article.title, article.description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '纽约州 DMV', path: '/ny' },
        { name: article.title, path },
      ])} />
      <SeoArticleLayout
        title={article.title}
        intro={article.intro}
        practiceHref="/ny"
        practiceLabel="进入纽约州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
      />
    </>
  )
}
