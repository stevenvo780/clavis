import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ELEMENTS } from '@/lib/elements'
import SolidGlyph from '@/components/visual/SolidGlyph'
import HeroEnhanceLoader from './HeroEnhanceLoader'

/**
 * Server Component hero: #hero-title is plain SSR text (LCP). Client FX load via
 * HeroEnhanceLoader after afterLcpThenIdle (≥8s) — SplitChars must not hydrate
 * into the H1 until post-LCP or .split-char steals the LCP element.
 */
export default function Hero({ obras, documentos }: { obras: number; documentos: number }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-parallax">
        <div className="hero-top" data-reveal="fade">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Mouseîon · Galería de filosofía
          </span>
          <span className="eyebrow hero-top-right">
            <span id="hero-scramble" className="font-greek">
              παιδεία
            </span>
          </span>
        </div>

        <h1 id="hero-title" className="hero-title">
          <span data-hero-ssr>
            Paide<span className="split-accent">í</span>a
          </span>
        </h1>

        <div className="hero-sub">
          <p className="hero-kicker">galería de filosofía</p>
          <p className="hero-lead">
            Tesis, ensayos y ponencias sobre mente y materia, ontología, ciudad, retórica, lógica,
            sistemas complejos, religión y técnica.
          </p>
          <div className="hero-actions">
            <a href="#obras" id="hero-cta-obras" className="btn-pill" data-cursor="Ir">
              <span className="btn-pill-fill" aria-hidden="true" />
              <span className="btn-pill-text">Explorar las obras</span>
              <span className="btn-pill-arrow" aria-hidden="true">
                ↓
              </span>
            </a>
            <Link href="/buscar" className="btn-line">
              Buscar en el portal
            </Link>
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

      <HeroEnhanceLoader />
    </section>
  )
}
