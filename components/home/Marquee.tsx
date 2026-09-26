'use client'

import { useEffect, useRef } from 'react'
import { afterLcpThenIdle, loadGsap } from '@/lib/afterLcp'
import { experience } from '@/lib/experience'

const ROW_A = ['λόγος', 'τέχνη', 'ψυχή', 'πόλις', 'κόσμος', 'ἐπιστήμη', 'φύσις', 'εἶδος']
const ROW_B = ['logos', 'téchne', 'psyché', 'pólis', 'kósmos', 'epistéme', 'phýsis', 'eîdos']

/**
 * Dos cintas de vocabulario griego que corren en sentidos opuestos. La velocidad y la
 * inclinación responden al scroll (velocidad de Lenis).
 */
export default function Marquee() {
  const rowA = useRef<HTMLDivElement>(null)
  const rowB = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    let remove: (() => void) | undefined
    const cancelWait = afterLcpThenIdle(() => {
      void loadGsap().then(({ gsap }) => {
        if (cancelled) return
        const a = rowA.current
        const b = rowB.current
        if (!a || !b) return
        let xa = 0
        let xb = 0
        let dir = 1
        let skew = 0
        const tick = (_: number, dt: number) => {
          const v = experience.velocity
          if (Math.abs(v) > 0.5) dir = Math.sign(v)
          const speed = (0.045 + Math.min(Math.abs(v), 60) * 0.012) * dt * dir
          const wa = a.scrollWidth / 2
          const wb = b.scrollWidth / 2
          xa = (xa - speed) % wa
          xb = (xb + speed) % wb
          if (xa > 0) xa -= wa
          if (xb > 0) xb -= wb
          skew += (Math.max(-8, Math.min(8, v * 0.25)) - skew) * 0.1
          a.style.transform = `translate3d(${xa}px,0,0) skewX(${-skew}deg)`
          b.style.transform = `translate3d(${xb}px,0,0) skewX(${-skew}deg)`
        }
        gsap.ticker.add(tick)
        remove = () => gsap.ticker.remove(tick)
      })
    })
    return () => {
      cancelled = true
      cancelWait()
      remove?.()
    }
  }, [])

  const render = (words: string[], cls: string) =>
    [...words, ...words].map((w, i) => (
      <span key={i} className={cls}>
        {w}
        <span className="marquee-star" aria-hidden="true">
          ✦
        </span>
      </span>
    ))

  return (
    <section className="marquee" aria-label="Vocabulario griego">
      <div className="marquee-row">
        <div ref={rowA} className="marquee-track" lang="grc">
          {render(ROW_A, 'marquee-item marquee-greek')}
        </div>
      </div>
      <div className="marquee-row marquee-row-b">
        <div ref={rowB} className="marquee-track">
          {render(ROW_B, 'marquee-item marquee-latin')}
        </div>
      </div>
    </section>
  )
}
