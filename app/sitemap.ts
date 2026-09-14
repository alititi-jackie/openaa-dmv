import type { MetadataRoute } from 'next'
import { dmvStates } from '@/lib/dmv-data'
import { getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['/']

  for (const state of dmvStates) {
    if (state.status === 'external') continue
    routes.push(`/${state.slug}`)
    const isLive = state.status === 'live' || state.slug === 'florida'
    if (isLive) {
      routes.push(
        `/${state.slug}/questions`,
        `/${state.slug}/practice`,
        `/${state.slug}/mock-test`,
        `/${state.slug}/signs`,
        `/${state.slug}/wrong-questions`,
        `/${state.slug}/guide`
      )
    }
  }

  return routes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.split('/').length === 2 ? 0.85 : 0.7,
  }))
}
