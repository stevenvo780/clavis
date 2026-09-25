'use client'

import { useEffect, type RefObject } from 'react'
import { setElementBlend, setLayout, setSceneActive, type SceneLayout } from '@/lib/experience'
import { afterLcpThenIdle, loadGsap } from '@/lib/afterLcp'

export interface SceneConfig {
  active: boolean
  /** Índice del elemento (orden de ELEMENTS) que la sección fija al entrar. */
  element?: number
  layout?: SceneLayout
  mobile?: SceneLayout
}

/** Coreografía de la escena 3D por sección de la portada. */
export const SCENE = {
  hero: { active: true, element: 4, layout: { x: 0.22, y: 0, scale: 0.92 }, mobile: { x: 0, y: 0.2, scale: 0.74 } },
  manifesto: { active: true, element: 4, layout: { x: 0.34, y: -0.14, scale: 0.62 }, mobile: { x: 0.3, y: -0.32, scale: 0.5 } },
  elementos: { active: true, layout: { x: -0.2, y: -0.05, scale: 0.72 }, mobile: { x: 0, y: 0.24, scale: 0.66 } },
  off: { active: false },
  outro: { active: true, element: 4, layout: { x: 0, y: 0.02, scale: 0.8 }, mobile: { x: 0, y: -0.24, scale: 0.62 } },
} satisfies Record<string, SceneConfig>

export function applyScene(config: SceneConfig) {
  setSceneActive(config.active)
  if (config.element !== undefined) setElementBlend(config.element)
  if (config.layout) setLayout(config.layout, config.mobile)
}

/**
 * Aplica `config` mientras la sección cubre el centro del viewport. Como las secciones
 * son contiguas, en cada momento manda exactamente una.
 * GSAP/ScrollTrigger load after LCP so this hook does not pull them into the boot chunk.
 */
export function useSceneSection(ref: RefObject<HTMLElement | null>, config: SceneConfig, onActive?: () => void) {
  useEffect(() => {
    let st: { kill: () => void } | null = null
    let cancelled = false
    const cancelWait = afterLcpThenIdle(() => {
      void loadGsap().then(({ ScrollTrigger }) => {
        if (cancelled) return
        const el = ref.current
        if (!el) return
        st = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (!self.isActive) return
            applyScene(config)
            onActive?.()
          },
        })
      })
    })
    return () => {
      cancelled = true
      cancelWait()
      st?.kill()
    }
    // config y onActive son estables por sección
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
