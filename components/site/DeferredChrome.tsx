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

/**
 * PAI-001: mount Lenis/gsap reveal/tilt/cursor after first paint + idle so the
 * hero LCP text is not blocked by eager FX bundles on the main thread.
 * Respects prefers-reduced-motion (skips SmoothScroll / Cursor / Tilt).
 */
export default function DeferredChrome() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Mark hydrated early so the layout boot failsafe does not strip motion at 8s
    // while FX are still waiting on requestIdleCallback.
    document.documentElement.classList.add('hydrated')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducedMotion(reduced)

    const w = window as IdleWindow
    let idleId = 0
    let timeoutId = 0
    let cancelled = false

    const mount = () => {
      if (cancelled) return
      setReady(true)
    }

    const schedule = () => {
      if (typeof w.requestIdleCallback === 'function') {
        idleId = w.requestIdleCallback(mount, { timeout: 2000 })
      } else {
        timeoutId = window.setTimeout(mount, 200)
      }
    }

    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })

    // Fallback if load is delayed: still mount within ~2s of hydrate.
    const backup = window.setTimeout(mount, 2000)

    return () => {
      cancelled = true
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
