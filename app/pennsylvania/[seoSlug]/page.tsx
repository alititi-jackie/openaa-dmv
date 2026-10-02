import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getPennsylvaniaSeoArticle, pennsylvaniaSeoArticles } from '@/lib/pennsylvania-seo-content'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return pennsylvaniaSeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getPennsylvaniaSeoArticle(seoSlug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/pennsylvania/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/pennsylvania/${article.slug}`,
    },
  }
}

export default async function PennsylvaniaSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getPennsylvaniaSeoArticle(seoSlug)
  if (!article) notFound()

  const path = `/pennsylvania/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(article.title, article.description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '宾州 DMV', path: '/pennsylvania' },
        { name: article.title, path },
      ])} />
      <SeoArticleLayout
        title={article.title}
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
