'use client'

import { useSyncExternalStore } from 'react'
import { storageHasFailed, subscribeStorageFailure } from '@/lib/browser-storage'

const serverSnapshot = () => false

export default function StorageNotice() {
  const failed = useSyncExternalStore(subscribeStorageFailure, storageHasFailed, serverSnapshot)
  return failed ? <div role="status" className="page-shell my-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">浏览器暂时无法保存学习记录。你仍可继续答题，但刷新或关闭页面后，本次进度可能丢失。请检查浏览器存储设置或可用空间。</div> : null
}
