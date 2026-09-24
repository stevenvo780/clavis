'use client'

import { useEffect } from 'react'

/**
 * Inclinación 3D + reflejo que sigue al puntero para cualquier `[data-tilt]`, por
 * delegación: las tarjetas pueden seguir siendo componentes de servidor.
 * Publica --rx/--ry (grados) y --mx/--my (posición del brillo) en el elemento.
 */
export default function TiltManager() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let current: HTMLElement | null = null
    const reset = (el: HTMLElement) => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
      el.removeAttribute('data-hover')
    }
    const onMove = (e: PointerEvent) => {
      const target = e.target instanceof Element ? (e.target.closest('[data-tilt]') as HTMLElement | null) : null
      if (target !== current) {
        if (current) reset(current)
        current = target
      }
      if (!target) return
      const r = target.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      const amount = Number(target.dataset.tiltAmount ?? 1)
      target.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      target.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      target.style.setProperty('--rx', `${((0.5 - y) * 9 * amount).toFixed(2)}deg`)
      target.style.setProperty('--ry', `${((x - 0.5) * 11 * amount).toFixed(2)}deg`)
      target.setAttribute('data-hover', '')
    }
    const onLeave = () => {
      if (current) reset(current)
      current = null
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onLeave, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onLeave)
    }
  }, [])

  return null
}
