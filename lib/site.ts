// This project has one public canonical origin. Keep it deterministic so a
// stale deployment environment variable cannot point metadata and sitemaps at
// a retired hostname.
export const SITE_URL = 'https://dmv.openaa.com'

export const OPENAA_URL = 'https://openaa.com'
export const OPENAA_DMV_URL = 'https://openaa.com/dmv'
export const TOOLKU_URL = 'https://toolku.com/?utm_source=dmv.openaa.com&utm_medium=referral&utm_campaign=ecosystem'
export const TOOLKU_DMV_CHECKER_URL = 'https://toolku.com/usa/dmv/document-checker.html?utm_source=dmv.openaa.com&utm_medium=referral&utm_campaign=dmv-guide'
export const NUMBERMOBI_URL = 'https://numbermobi.com/?utm_source=dmv.openaa.com&utm_medium=referral&utm_campaign=ecosystem'
export const NUMBERMOBI_NY_URL = 'https://numbermobi.com/?utm_source=dmv.openaa.com&utm_medium=referral&utm_campaign=new-york'

export function getSiteUrl(path = '') {
  if (/^https?:\/\//i.test(path)) return path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${path ? normalizedPath : ''}`
}

export function getOpenAAUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${OPENAA_URL}${path ? normalizedPath : ''}`
}
