/* OpenAA DMV service worker: offline-first study experience.
 * - Precache the app shell (home, manifest, icons) on install.
 * - Cache-first for immutable Next.js static assets (_next/static/*) and images.
 * - Network-first for page navigations so content stays fresh; fall back to the
 *   cached copy (or the home page) when offline.
 * - Stale-while-revalidate for everything else same-origin.
 * Question banks ship inside the JS chunks, so caching _next/static/* + visited
 * pages effectively caches the question banks for offline practice.
 */
const CACHE_VERSION = 'openaa-dmv-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png',
  '/favicon/apple-touch-icon.png',
  '/openaa-logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key.startsWith('openaa-dmv-') && ![STATIC_CACHE, PAGE_CACHE, IMAGE_CACHE].includes(key),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isImageRequest(url) {
  return (
    url.pathname.startsWith('/traffic-signs/') ||
    url.pathname.startsWith('/favicon/') ||
    /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(url.pathname)
  );
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Immutable hashed Next.js build assets: cache-first.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images (traffic signs, icons): cache-first.
  if (isImageRequest(url)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Page navigations: network-first, offline falls back to cached page, then home.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, PAGE_CACHE, '/'));
    return;
  }

  // Everything else same-origin: stale-while-revalidate.
  event.respondWith(staleWhileRevalidate(request, PAGE_CACHE));
});
