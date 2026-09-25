'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { afterLcpThenIdle, loadGsap } from '@/lib/afterLcp'
import type { Work } from '@/app/trabajos/works'
import { ELEMENT_BY_KEY } from '@/lib/elements'
import SolidGlyph from '@/components/visual/SolidGlyph'
import { splitTitle } from '@/components/visual/WorkCard'
import { SCENE, useSceneSection } from './useSceneSection'

const TIPO: Record<Work['tipo'], string> = { ponencia: 'Ponencia', ensayo: 'Ensayo', tesis: 'Tesis' }

function source(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    return host.includes('medium.com') ? 'Medium' : host
  } catch {
    return ''
  }
}

/**
 * Índice tipográfico de ensayos y tesis. En escritorio una tarjeta flotante sigue al
 * cursor con el resumen de la fila activa; en táctil el resumen va en línea.
 */
export default function EssayIndex({ works }: { works: Work[] }) {
  const root = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  useSceneSection(root, SCENE.off)

  useEffect(() => {
    const list = root.current
    const previewEl = preview.current
    if (!previewEl || !list) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cancelled = false
    let onMove: ((e: PointerEvent) => void) | undefined
    const cancelWait = afterLcpThenIdle(() => {
      void loadGsap().then(({ gsap }) => {
        if (cancelled || !preview.current) return
        const p = preview.current
        const xTo = gsap.quickTo(p, 'x', { duration: reduced ? 0 : 0.55, ease: 'power3' })
        const yTo = gsap.quickTo(p, 'y', { duration: reduced ? 0 : 0.55, ease: 'power3' })
        onMove = (e: PointerEvent) => {
          xTo(e.clientX + 28)
          yTo(e.clientY - 120)
        }
        list.addEventListener('pointermove', onMove)
      })
    })
    return () => {
      cancelled = true
      cancelWait()
      if (onMove) list.removeEventListener('pointermove', onMove)
    }
  }, [])

  const current = active !== null ? works[active] : null

  return (
    <section ref={root} className="essays section" aria-labelledby="essays-title" onPointerLeave={() => setActive(null)}>
      <div className="container-wide">
        <p className="section-label" data-reveal="up">
          <span className="section-num">§ 04</span> Escritos
        </p>
        <h2 id="essays-title" className="section-title" data-reveal="clip">
          Ensayos <em>y tesis</em>
        </h2>

        <ol className="idx">
          {works.map((w, i) => {
            const el = ELEMENT_BY_KEY[w.elemento]
            const { main, sub } = splitTitle(w.titulo)
            return (
              <li key={w.id} data-reveal="up" style={{ '--d': `${i * 70}ms`, '--c': el.colores[0] } as CSSProperties}>
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="idx-row"
                  data-cursor="Leer"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  <span className="idx-fill" aria-hidden="true" />
                  <span className="idx-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="idx-title">
                    {main}
                    {sub && <span className="idx-sub"> — {sub}</span>}
                  </span>
                  <span className="idx-meta">
                    <span className="idx-type">{TIPO[w.tipo]}</span>
                    <span className="idx-src">{source(w.url)}</span>
                  </span>
                  <span className="idx-el">
                    <SolidGlyph solid={el.solido} size={26} />
                    {el.nombre}
                  </span>
                  <span className="idx-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="idx-abstract">{w.abstract}</span>
                  <span className="sr-only"> (abre en nueva pestaña)</span>
                </a>
              </li>
            )
          })}
        </ol>
      </div>

      <div ref={preview} className="idx-preview" data-visible={current !== null} aria-hidden="true">
        {current && (
          <div
            key={current.id}
            className="idx-preview-card"
            style={
              {
                '--c1': ELEMENT_BY_KEY[current.elemento].colores[0],
                '--c2': ELEMENT_BY_KEY[current.elemento].colores[1],
                '--c3': ELEMENT_BY_KEY[current.elemento].colores[2],
              } as CSSProperties
            }
          >
            <div className="idx-preview-media">
              <SolidGlyph solid={ELEMENT_BY_KEY[current.elemento].solido} size={150} />
              <span lang="grc">{ELEMENT_BY_KEY[current.elemento].griego}</span>
            </div>
            <p>{current.abstract}</p>
          </div>
        )}
      </div>
    </section>
  )
}
