import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getNewJerseySeoArticle, newJerseySeoArticles } from '@/lib/new-jersey-seo-content'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return newJerseySeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getNewJerseySeoArticle(seoSlug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/new-jersey/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/new-jersey/${article.slug}`,
    },
  }
}

export default async function NewJerseySeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getNewJerseySeoArticle(seoSlug)
  if (!article) notFound()

  const path = `/new-jersey/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(article.title, article.description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '新泽西州 DMV', path: '/new-jersey' },
        { name: article.title, path },
      ])} />
      <SeoArticleLayout
        title={article.title}
        intro={article.intro}
        practiceHref="/new-jersey"
        practiceLabel="进入新泽西 DMV 练习"
        sections={article.sections}
        faq={article.faq}
        officialName="New Jersey MVC"
      />
    </>
  )
}
