'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { markSceneReady } from '@/lib/experience'
import { afterLcpThenIdle } from '@/lib/afterLcp'
import SolidGlyph from '@/components/visual/SolidGlyph'

const SceneLayer = dynamic(() => import('./SceneLayer'), { ssr: false })

/**
 * PAI-001 / W3-PAI-01: keep the static glyph fallback for first paint, mark the
 * scene ready so the preloader does not wait on WebGL, then mount the full R3F
 * scene after LCP + idle (≥8s floor).
 */
export default function DeferredSceneLayer() {
  const [mountScene, setMountScene] = useState(false)

  useEffect(() => {
    // Unblock preloader / intro without waiting for Three.js.
    markSceneReady()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    return afterLcpThenIdle(() => setMountScene(true), 8000)
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
