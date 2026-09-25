'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { afterLcpThenIdle } from '@/lib/afterLcp'

/**
 * Fetches HeroEnhance only AFTER LCP + idle so SplitChars/GSAP/scene never race
 * the #hero-title paint path (idle-only @2s was too early when LCP ~4–5s).
 * Hero (RSC) keeps plain SSR text in HTML until this mounts.
 */
export default function HeroEnhanceLoader() {
  const [Comp, setComp] = useState<ComponentType | null>(null)

  useEffect(() => {
    let cancelled = false
    const cancel = afterLcpThenIdle(() => {
      void import('./HeroEnhance').then((m) => {
        if (!cancelled) setComp(() => m.default)
      })
    }, 4000)
    return () => {
      cancelled = true
      cancel()
    }
  }, [])

  if (!Comp) return null
  return <Comp />
}
