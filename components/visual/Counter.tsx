'use client'

import { useEffect, useRef } from 'react'
import { loadGsap } from '@/lib/afterLcp'

/** Número que cuenta desde 0 al entrar en pantalla. El HTML estático ya trae el valor final. */
export default function Counter({ value, pad = 0, className = '' }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const fmt = (n: number) => String(Math.round(n)).padStart(pad, '0')

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const state = { v: 0 }
    el.textContent = fmt(0)
    let tween: { kill: () => void } | null = null
    let cancelled = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        void loadGsap().then(({ gsap }) => {
          if (cancelled) return
          tween = gsap.to(state, {
            v: value,
            duration: 1.8,
            ease: 'power3.out',
            delay: 0.15,
            onUpdate: () => {
              el.textContent = fmt(state.v)
            },
          })
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      tween?.kill()
      el.textContent = fmt(value)
    }
    // fmt depende solo de pad
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, pad])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {fmt(value)}
    </span>
  )
}
