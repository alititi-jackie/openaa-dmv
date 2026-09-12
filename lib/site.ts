export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dmv.openaa.com').replace(/\/+$/, '')

export const OPENAA_URL = 'https://openaa.com'
export const OPENAA_DMV_URL = 'https://openaa.com/dmv'

export function getSiteUrl(path = '') {
  if (/^https?:\/\//i.test(path)) return path
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${path ? normalizedPath : ''}`
}

export function getOpenAAUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${OPENAA_URL}${path ? normalizedPath : ''}`
}
