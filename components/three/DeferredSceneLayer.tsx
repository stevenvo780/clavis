'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { markSceneReady } from '@/lib/experience'
import { afterLcpThenIdle } from '@/lib/afterLcp'
import SolidGlyph from '@/components/visual/SolidGlyph'

const SceneLayer = dynamic(() => import('./SceneLayer'), { ssr: false })

/**
 * PAI-001 / W3-PAI-01: SolidGlyph is the static first-paint poster (Stev: no empty hole
 * while R3F defers). Mount full scene after LCP + idle (≥8s). Page places this AFTER
 * #hero-title in DOM so hero text is discovered first.
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
