'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/** Envuelve un botón o enlace para que "se pegue" al puntero al acercarse.
 *  GSAP loaded dynamically so Magnetic does not pull gsap into the hero boot chunk. */
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

    let cancelled = false
    let cleanup: (() => void) | undefined

    void import('gsap').then(({ gsap }) => {
      if (cancelled || !ref.current) return
      const target = ref.current
      const xTo = gsap.quickTo(target, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.45)' })
      const yTo = gsap.quickTo(target, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.45)' })
      const move = (e: PointerEvent) => {
        const r = target.getBoundingClientRect()
        xTo((e.clientX - (r.left + r.width / 2)) * strength)
        yTo((e.clientY - (r.top + r.height / 2)) * strength)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      target.addEventListener('pointermove', move)
      target.addEventListener('pointerleave', leave)
      cleanup = () => {
        target.removeEventListener('pointermove', move)
        target.removeEventListener('pointerleave', leave)
        gsap.killTweensOf(target)
      }
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [strength])

  return (
    <span ref={ref} className={`magnetic ${className}`}>
      {children}
    </span>
  )
}
