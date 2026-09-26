'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { afterLcpThenIdle } from '@/lib/afterLcp'

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const RevealManager = dynamic(() => import('./RevealManager'), { ssr: false })
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false })
const TiltManager = dynamic(() => import('./TiltManager'), { ssr: false })
const Cursor = dynamic(() => import('./Cursor'), { ssr: false })

/**
 * PAI-001 / W3-PAI-01: mount Lenis/gsap reveal/tilt/cursor after LCP + idle
 * (≥8s floor) so hero LCP text is not blocked by eager FX / GSAP on the main thread.
 */
export default function DeferredChrome() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Mark hydrated early so the layout boot failsafe does not strip motion at 8s
    // while FX are still waiting on LCP / requestIdleCallback.
    document.documentElement.classList.add('hydrated')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(reduced)

    const cancel = afterLcpThenIdle(() => setReady(true), 8000)
    return cancel
  }, [])

  if (!ready) return null

  return (
    <>
      {!reducedMotion && <SmoothScroll />}
      <RevealManager />
      <ScrollProgress />
      {!reducedMotion && <TiltManager />}
      {!reducedMotion && <Cursor />}
    </>
  )
}
