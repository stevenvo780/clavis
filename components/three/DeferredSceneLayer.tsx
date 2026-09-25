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

/**
 * PAI-001: keep the static glyph fallback for first paint, mark the scene ready
 * so the preloader does not wait on WebGL, then mount the full R3F scene on idle.
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

    const go = () => {
      if (!cancelled) setMountScene(true)
    }

    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(go, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(go, 400)
    }
    // Ensure WebGL still arrives even if idle never fires.
    const backup = window.setTimeout(go, 2500)

    return () => {
      cancelled = true
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
