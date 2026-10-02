import type { MetadataRoute } from 'next'
import { dmvStates } from '@/lib/dmv-data'
import { nySeoArticles } from '@/lib/ny-seo-content'
import { californiaSeoArticles } from '@/lib/california-seo-content'
import { newJerseySeoArticles } from '@/lib/new-jersey-seo-content'
import { pennsylvaniaSeoArticles } from '@/lib/pennsylvania-seo-content'
import { massachusettsSeoArticles } from '@/lib/massachusetts-seo-content'
import { washingtonSeoArticles } from '@/lib/washington-seo-content'
import { texasSeoArticles } from '@/lib/texas-seo-content'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['/']

  for (const state of dmvStates) {
    if (state.status === 'external') continue
    routes.push(`/${state.slug}`)
    if (state.status === 'live') {
      routes.push(`/${state.slug}/questions`, `/${state.slug}/practice`, `/${state.slug}/mock-test`, `/${state.slug}/signs`, `/${state.slug}/wrong-questions`, `/${state.slug}/guide`)
    }
  }

  routes.push('/ny','/ny/questions','/ny/practice','/ny/mock-test','/ny/signs','/ny/wrong-questions','/ny/guide')
  routes.push(...nySeoArticles.map((article) => `/ny/${article.slug}`))
  routes.push(...californiaSeoArticles.map((article) => `/california/${article.slug}`))
  routes.push(...newJerseySeoArticles.map((article) => `/new-jersey/${article.slug}`))
  routes.push(...pennsylvaniaSeoArticles.map((article) => `/pennsylvania/${article.slug}`))
  routes.push(...massachusettsSeoArticles.map((article) => `/massachusetts/${article.slug}`))
  routes.push(...washingtonSeoArticles.map((article) => `/washington/${article.slug}`))
  routes.push(...texasSeoArticles.map((article) => `/texas/${article.slug}`))

  return routes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.split('/').length === 2 ? 0.85 : 0.7,
  }))
}
