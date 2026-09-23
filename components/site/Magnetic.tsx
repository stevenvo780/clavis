'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'

/** Envuelve un botón o enlace para que "se pegue" al puntero al acercarse. */
export default function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.45)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.45)' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - (r.left + r.width / 2)) * strength)
      yTo((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}
