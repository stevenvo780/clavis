'use client'

import { useEffect, useState, type ComponentType } from 'react'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Fetches HeroEnhance only after idle so the chunk is off the sync home boot path.
 * Hero (RSC) keeps #hero-title in the HTML; this loader returns null until idle.
 */
export default function HeroEnhanceLoader() {
  const [Comp, setComp] = useState<ComponentType | null>(null)

  useEffect(() => {
    const w = window as IdleWindow
    let idleId = 0
    let timeoutId = 0
    let cancelled = false

    const load = () => {
      void import('./HeroEnhance').then((m) => {
        if (!cancelled) setComp(() => m.default)
      })
    }

    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(load, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(load, 1)
    }

    return () => {
      cancelled = true
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  if (!Comp) return null
  return <Comp />
}
