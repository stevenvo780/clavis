'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { markSceneReady } from '@/lib/experience'
import SolidGlyph from '@/components/visual/SolidGlyph'

const SceneLayer = dynamic(() => import('./SceneLayer'), { ssr: false })

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

const DEFER_MS = 4000

/**
 * PAI-001 / W3-PAI-01: keep the static glyph fallback for first paint, mark the
 * scene ready so the preloader does not wait on WebGL, then mount the full R3F
 * scene after LCP + idle (hard floor ≥4000ms).
 */
export default function DeferredSceneLayer() {
  const [mountScene, setMountScene] = useState(false)

  useEffect(() => {
    // Unblock preloader / intro without waiting for Three.js.
    markSceneReady()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const w = window as IdleWindow
    let idleId = 0
    let timeoutId = 0
    let cancelled = false
    let po: PerformanceObserver | null = null
    let lcpSeen = false

    const go = () => {
      if (!cancelled) setMountScene(true)
    }

    const scheduleIdle = () => {
      if (cancelled) return
      if (typeof w.requestIdleCallback === 'function') {
        idleId = w.requestIdleCallback(go, { timeout: DEFER_MS })
      } else {
        timeoutId = window.setTimeout(go, DEFER_MS)
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

    // Hard backup: WebGL still arrives even if LCP never fires.
    const backup = window.setTimeout(onLcpOrFallback, DEFER_MS)

    return () => {
      cancelled = true
      po?.disconnect()
      if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      if (timeoutId) window.clearTimeout(timeoutId)
      window.clearTimeout(backup)
    }
  }, [])

  if (mountScene) return <SceneLayer />

  return (
    <div className="scene-layer" data-active="true" data-ready="false" aria-hidden="true">
      <div className="scene-fallback">
        <SolidGlyph solid="dodecaedro" size={220} className="scene-fallback-glyph" />
      </div>
    </div>
  )
}
