'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCENE, useSceneSection } from './useSceneSection'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * En escritorio, el scroll vertical desplaza la fila de tarjetas en horizontal (sección
 * fija con `position: sticky`). En pantallas táctiles/estrechas queda como carrusel nativo.
 */
export default function PonenciasRail({ count, children }: { count: number; children: ReactNode }) {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [pinned, setPinned] = useState(false)
  const [height, setHeight] = useState<number | null>(null)
  useSceneSection(root, SCENE.off)

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setPinned(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Alto de la sección = recorrido horizontal + un viewport.
  useIsoLayoutEffect(() => {
    if (!pinned) {
      setHeight(null)
      return
    }
    const t = track.current
    if (!t) return
    const measure = () => setHeight(Math.max(0, t.scrollWidth - window.innerWidth) + window.innerHeight)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!pinned || height === null) return
    const t = track.current
    const el = root.current
    if (!t || !el) return
    const ctx = gsap.context(() => {
      gsap.to(t, {
        x: () => -Math.max(0, t.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => el.style.setProperty('--rail-p', self.progress.toFixed(4)),
        },
      })
    }, el)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [pinned, height])

  return (
    <section
      ref={root}
      id="obras"
      className="rail"
      data-pinned={pinned}
      style={height ? { height } : undefined}
      aria-labelledby="rail-title"
    >
      <div className="rail-sticky">
        <div className="rail-head container-wide">
          <p className="section-label" data-reveal="up">
            <span className="section-num">§ 03</span> Ponencias
          </p>
          <div className="rail-head-row">
            <h2 id="rail-title" className="section-title" data-reveal="clip">
              Decks <em>interactivos</em>
            </h2>
            <p className="rail-hint" data-reveal="fade">
              <span className="rail-count">{String(count).padStart(2, '0')}</span> presentaciones —{' '}
              {pinned ? 'sigue bajando' : 'desliza'} <span aria-hidden="true">→</span>
            </p>
          </div>
        </div>
        <div ref={track} className="rail-track">
          {children}
        </div>
        <div className="rail-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
