'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { experience, markSceneReady, subscribeExperience } from '@/lib/experience'
import SolidGlyph from '@/components/visual/SolidGlyph'

const CrystalCanvas = dynamic(() => import('./CrystalCanvas'), { ssr: false })

function hasWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

/**
 * Capa fija detrás de la página de inicio. Monta el canvas WebGL solo en el cliente;
 * mientras carga (o si no hay WebGL2) muestra un respaldo estático en CSS/SVG.
 */
export default function SceneLayer() {
  const [supported, setSupported] = useState(false)
  const [active, setActive] = useState(experience.active)
  // La señal global también libera la intro: el canvas tiene su propio primer frame.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ok = hasWebGL2()
    const syncMotion = () => {
      experience.reducedMotion = motion.matches
      setReady(false)
      setSupported(ok && !motion.matches)
    }
    syncMotion()
    motion.addEventListener('change', syncMotion)
    // Sin WebGL2 el respaldo estático ya es la escena: no hagas esperar al preloader.
    if (!ok) markSceneReady()
    const sync = () => {
      setActive(experience.active)
    }
    sync()
    const off = subscribeExperience(sync)

    const onPointer = (e: PointerEvent) => {
      experience.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      experience.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      off()
      motion.removeEventListener('change', syncMotion)
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return (
    <div className="scene-layer" data-active={active} data-ready={supported && ready} aria-hidden="true">
      <div className="scene-fallback">
        <SolidGlyph solid="dodecaedro" size={220} className="scene-fallback-glyph" />
      </div>
      {supported && <CrystalCanvas active={active} onReady={() => setReady(true)} />}
    </div>
  )
}
