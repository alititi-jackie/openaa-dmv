'use client'

import { useEffect } from 'react'

/**
 * Registers the OpenAA DMV service worker (/sw.js).
 * Registration is what makes Chrome fire `beforeinstallprompt`, which the
 * InstallAppButton listens for. Without a registered worker that has a
 * fetch handler, the install prompt never appears.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Offline-capable install prompt is a nice-to-have; never break the page.
      })
    }
    if (document.readyState === 'complete') register()
    else window.addEventListener('load', register, { once: true })
  }, [])
  return null
}
