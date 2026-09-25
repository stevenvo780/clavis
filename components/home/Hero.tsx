'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ELEMENTS } from '@/lib/elements'
import { setSolidity } from '@/lib/experience'
import SplitChars from '@/components/visual/SplitChars'
import Scramble from '@/components/visual/Scramble'
import SolidGlyph from '@/components/visual/SolidGlyph'
import Magnetic from '@/components/site/Magnetic'
import { SCENE, useSceneSection } from './useSceneSection'

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

function afterLcpThenIdle(run: () => void, idleTimeout = 3500): () => void {
  const w = window as IdleWindow
  let idleId = 0
  let backupId = 0
  let cancelled = false
  let po: PerformanceObserver | null = null

  const scheduleIdle = () => {
    if (cancelled) return
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => {
        if (!cancelled) run()
      }, { timeout: idleTimeout })
    } else {
      backupId = window.setTimeout(() => {
        if (!cancelled) run()
      }, idleTimeout)
    }
  }

  const start = () => {
    if (cancelled) return
    try {
      if (typeof PerformanceObserver !== 'undefined') {
        po = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          if (entries.length) {
            po?.disconnect()
            po = null
            scheduleIdle()
          }
        })
        po.observe({ type: 'largest-contentful-paint', buffered: true })
        // Hard backup if LCP never reports
        backupId = window.setTimeout(() => {
          po?.disconnect()
          po = null
          scheduleIdle()
        }, idleTimeout)
        return
      }
    } catch {
      /* fall through */
    }
    scheduleIdle()
  }

  start()

  return () => {
    cancelled = true
    po?.disconnect()
    if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
    if (backupId) window.clearTimeout(backupId)
  }
}

export default function Hero({ obras, documentos }: { obras: number; documentos: number }) {
  const root = useRef<HTMLElement>(null)
  useSceneSection(root, SCENE.hero)

  // LCP: plain SSR text in #hero-title first; SplitChars only after LCP+idle.
  const [splitReady, setSplitReady] = useState(false)
  useEffect(() => afterLcpThenIdle(() => setSplitReady(true), 3500), [])

  useEffect(() => {
    // La forma "emerge" de la gota cuando termina la intro — no necesita GSAP.
    const solidify = () => setSolidity(1)
    if (document.documentElement.classList.contains('intro-done')) solidify()
    else window.addEventListener('paideia:intro', solidify, { once: true })

    let ctx: { revert: () => void } | null = null
    let cancelled = false

    const cancelWait = afterLcpThenIdle(async () => {
      if (cancelled || !root.current) return
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      if (cancelled || !root.current) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.to('.hero-parallax', {
          yPercent: -18,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-foot', {
          opacity: 0,
          y: 40,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: '30% top', scrub: true },
        })
      }, root)
    }, 3500)

    return () => {
      cancelled = true
      cancelWait()
      window.removeEventListener('paideia:intro', solidify)
      ctx?.revert()
    }
  }, [])

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-parallax">
        <div className="hero-top" data-reveal="fade">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Mouseîon · Galería de filosofía
          </span>
          <span className="eyebrow hero-top-right">
            <Scramble text="παιδεία" trigger="intro" delay={0.5} duration={1.4} className="font-greek" />
          </span>
        </div>

        <h1 id="hero-title" className="hero-title">
          {splitReady ? (
            <SplitChars text="Paideía" accent={(c) => c === 'í'} />
          ) : (
            <>
              Paide<span className="split-accent">í</span>a
            </>
          )}
        </h1>

        <div className="hero-sub">
          <p className="hero-kicker">galería de filosofía</p>
          <p className="hero-lead">
            Tesis, ensayos y ponencias sobre mente y materia, ontología, ciudad, retórica, lógica,
            sistemas complejos, religión y técnica.
          </p>
          <div className="hero-actions">
            <Magnetic>
              <a
                href="#obras"
                className="btn-pill"
                data-cursor="Ir"
                onClick={(e) => {
                  e.preventDefault()
                  void import('@/components/site/SmoothScroll').then((m) => m.scrollToTarget('#obras', -24)).catch(() => {
                    document.querySelector('#obras')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  })
                }}
              >
                <span className="btn-pill-fill" aria-hidden="true" />
                <span className="btn-pill-text">Explorar las obras</span>
                <span className="btn-pill-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <Link href="/buscar" className="btn-line">
                Buscar en el portal
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className="hero-foot" data-reveal="fade" style={{ '--d': '900ms' } as CSSProperties}>
        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-line" />
          <span>Desliza</span>
        </div>
        <ol className="hero-legend" aria-label="Los cinco elementos del Timeo">
          {ELEMENTS.map((el) => (
            <li key={el.key} style={{ '--c': el.colores[0] } as CSSProperties}>
              <SolidGlyph solid={el.solido} size={34} />
              <span>{el.nombre}</span>
            </li>
          ))}
        </ol>
        <p className="hero-stats">
          <strong>{obras}</strong> obras · <strong>{documentos}</strong> documentos de archivo
        </p>
      </div>
    </section>
  )
}
