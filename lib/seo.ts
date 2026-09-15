import type { DmvState } from './dmv-data'
import { getSiteUrl, OPENAA_URL } from './site'

export function stateTitle(state: DmvState, suffix = '驾照题库与模拟考试') {
  return `${state.nameZh} DMV ${suffix}`
}

export function stateDescription(state: DmvState) {
  return `${state.nameZh} ${state.nameEn} DMV 驾照笔试题库、练习、模拟考试、交通标志和考试指南。多数已上线内容支持中文、English 和中英对照；正式要求以官方 ${state.officialName} 为准。`
}

export function webPageJsonLd(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: getSiteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: 'OpenAA DMV',
      url: getSiteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenAA',
      url: OPENAA_URL,
    },
  }
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  }
}
