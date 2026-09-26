'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { markSceneReady, setSolidity } from '@/lib/experience'
import SolidGlyph from '@/components/visual/SolidGlyph'

const SceneLayer = dynamic(() => import('./SceneLayer'), { ssr: false })

/**
 * SolidGlyph paints immediately while the 3D scene loads. Start WebGL shortly after
 * hydration so the hero is already visible, without making animation depend on LCP
 * reporting, scroll, or the later idle gate used by the other effects.
 */
export default function DeferredSceneLayer() {
  const [mountScene, setMountScene] = useState(false)

  useEffect(() => {
    // Unblock preloader / intro without waiting for Three.js.
    markSceneReady()

    // The sphere can start morphing as soon as the intro ends. HeroEnhance loads
    // much later, so it cannot own the initial crystal animation.
    const solidify = () => setSolidity(1)
    if (document.documentElement.classList.contains('intro-done')) solidify()
    else window.addEventListener('paideia:intro', solidify, { once: true })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return () => window.removeEventListener('paideia:intro', solidify)

    const timer = window.setTimeout(() => setMountScene(true), 900)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('paideia:intro', solidify)
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
