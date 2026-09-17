import JsonLd from './JsonLd'
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo'

export default function PageStructuredData({ title, description, path, stateName, statePath, pageName }: { title: string; description: string; path: string; stateName?: string; statePath?: string; pageName?: string }) {
  const crumbs = [{ name: '首页', path: '/' }]
  if (stateName && statePath) crumbs.push({ name: stateName, path: statePath })
  if (pageName) crumbs.push({ name: pageName, path })
  return <><JsonLd data={webPageJsonLd(title, description, path)}/><JsonLd data={breadcrumbJsonLd(crumbs)}/></>
}
