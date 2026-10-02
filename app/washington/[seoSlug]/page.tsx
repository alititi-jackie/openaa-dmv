import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import SeoArticleLayout from '@/components/SeoArticleLayout'
import { getWashingtonSeoArticle, washingtonSeoArticles } from '@/lib/washington-seo-content'
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ seoSlug: string }> }

export function generateStaticParams() {
  return washingtonSeoArticles.map((article) => ({ seoSlug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params
  const article = getWashingtonSeoArticle(seoSlug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/washington/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/washington/${article.slug}`,
    },
  }
}

export default async function WashingtonSeoArticlePage({ params }: Props) {
  const { seoSlug } = await params
  const article = getWashingtonSeoArticle(seoSlug)
  if (!article) notFound()

  const path = `/washington/${article.slug}`

  return (
    <>
      <JsonLd data={webPageJsonLd(article.title, article.description, path)} />
      <JsonLd data={faqJsonLd(article.faq)} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首页', path: '/' },
        { name: '华盛顿州 DOL', path: '/washington' },
        { name: article.title, path },
      ])} />
      <SeoArticleLayout
        title={article.title}
        intro={article.intro}
        practiceHref="/washington"
        practiceLabel="进入华盛顿州 DMV 练习"
        sections={article.sections}
        faq={article.faq}
        officialName="Washington State Department of Licensing"
      />
    </>
  )
}
