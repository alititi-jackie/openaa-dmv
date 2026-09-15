import type { MetadataRoute } from 'next'
import { dmvStates } from '@/lib/dmv-data'
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

  return routes.map((route) => ({
    url: getSiteUrl(route),
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route.split('/').length === 2 ? 0.85 : 0.7,
  }))
}
