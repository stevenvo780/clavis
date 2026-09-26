'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { afterLcpThenIdle } from '@/lib/afterLcp'

/**
 * Fetches HeroEnhance only AFTER LCP + idle (≥8s floor) so SplitChars/GSAP/scene
 * never race the #hero-title paint path. Buffered LCP alone must not unlock.
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
    }, 8000)
    return () => {
      cancelled = true
      cancel()
    }
  }, [])

  if (!Comp) return null
  return <Comp />
}
