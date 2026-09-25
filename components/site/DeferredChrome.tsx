'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const RevealManager = dynamic(() => import('./RevealManager'), { ssr: false })
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false })
const TiltManager = dynamic(() => import('./TiltManager'), { ssr: false })
const Cursor = dynamic(() => import('./Cursor'), { ssr: false })

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

const DEFER_MS = 4000

/**
 * PAI-001 / W3-PAI-01: mount Lenis/gsap reveal/tilt/cursor after LCP + idle so
 * hero LCP text is not blocked by eager FX bundles on the main thread.
 * Hard floor ≥4000ms. Respects prefers-reduced-motion.
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

    const w = window as IdleWindow
    let idleId = 0
    let timeoutId = 0
    let cancelled = false
    let po: PerformanceObserver | null = null
    let lcpSeen = false

    const mount = () => {
      if (cancelled) return
      setReady(true)
    }

    const scheduleIdle = () => {
      if (cancelled) return
      if (typeof w.requestIdleCallback === 'function') {
        idleId = w.requestIdleCallback(mount, { timeout: DEFER_MS })
      } else {
        timeoutId = window.setTimeout(mount, DEFER_MS)
      }
    }

    const onLcpOrFallback = () => {
      if (lcpSeen || cancelled) return
      lcpSeen = true
      po?.disconnect()
      po = null
      scheduleIdle()
    }

    try {
      if (typeof PerformanceObserver !== 'undefined') {
        po = new PerformanceObserver((list) => {
          if (list.getEntries().length) onLcpOrFallback()
        })
        po.observe({ type: 'largest-contentful-paint', buffered: true })
      } else {
        scheduleIdle()
      }
    } catch {
      scheduleIdle()
    }

    // Hard backup: mount within DEFER_MS even if LCP never fires.
    const backup = window.setTimeout(onLcpOrFallback, DEFER_MS)

    return () => {
      cancelled = true
      po?.disconnect()
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
      window.clearTimeout(backup)
    }
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
