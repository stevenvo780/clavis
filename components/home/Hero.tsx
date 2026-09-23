'use client'

import Link from 'next/link'
import { useEffect, useRef, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ELEMENTS } from '@/lib/elements'
import { setSolidity } from '@/lib/experience'
import SplitChars from '@/components/visual/SplitChars'
import Scramble from '@/components/visual/Scramble'
import SolidGlyph from '@/components/visual/SolidGlyph'
import Magnetic from '@/components/site/Magnetic'
import { scrollToTarget } from '@/components/site/SmoothScroll'
import { SCENE, useSceneSection } from './useSceneSection'

export default function Hero({ obras, documentos }: { obras: number; documentos: number }) {
  const root = useRef<HTMLElement>(null)
  useSceneSection(root, SCENE.hero)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // La forma "emerge" de la gota cuando termina la intro.
    const solidify = () => setSolidity(1)
    if (document.documentElement.classList.contains('intro-done')) solidify()
    else window.addEventListener('paideia:intro', solidify, { once: true })

    const ctx = gsap.context(() => {
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
    return () => {
      window.removeEventListener('paideia:intro', solidify)
      ctx.revert()
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

        <h1 id="hero-title" className="hero-title" data-reveal="split">
          <SplitChars text="Paideía" accent={(c) => c === 'í'} />
        </h1>

        <div className="hero-sub" data-reveal="up" style={{ '--d': '550ms' } as CSSProperties}>
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
                  scrollToTarget('#obras', -24)
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
