'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience } from '@/lib/experience'

let lenis: Lenis | null = null

/** Instancia global de Lenis (null con movimiento reducido o antes de montar). */
export function getLenis() {
  return lenis
}

/** Desplaza suavemente a un selector o posición; cae a scroll nativo sin Lenis. */
export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (typeof el === 'number') window.scrollTo({ top: el + offset })
  else if (el instanceof HTMLElement) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset })
}

export default function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // Las métricas de texto cambian al cargar las fuentes web: recalcula los triggers.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      allowNestedScroll: true,
      anchors: { offset: -72 },
    })
    lenis = instance
    instance.on('scroll', (e: Lenis) => {
      experience.velocity = e.velocity
      ScrollTrigger.update()
    })
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Sin scroll mientras el preloader cubre la portada.
    const resume = () => instance.start()
    if (document.documentElement.classList.contains('intro-pending')) {
      instance.stop()
      window.addEventListener('paideia:intro', resume, { once: true })
    }

    return () => {
      window.removeEventListener('paideia:intro', resume)
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis = null
    }
  }, [])

  // Tras cada navegación: sincroniza Lenis con el scroll que dejó Next y recalcula triggers.
  useEffect(() => {
    lenis?.resize()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return null
}
