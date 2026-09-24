import Link from 'next/link'
import type { CSSProperties } from 'react'
import Counter from '@/components/visual/Counter'
import SceneOff from './SceneOff'

export interface ArchiveModule {
  href: string
  letra: string
  titulo: string
  en: string
  descripcion: string
  secciones: string[]
  docs: number
  color: string
}

/** Archivo académico: los tres módulos de notas y materiales de curso. */
export default function Archive({ modules, total }: { modules: ArchiveModule[]; total: number }) {
  return (
    <SceneOff id="archivo" className="archive section" labelledBy="archive-title">
      <div className="container-wide">
        <p className="section-label" data-reveal="up">
          <span className="section-num">§ 05</span> Archivo académico
        </p>
        <div className="archive-head">
          <h2 id="archive-title" className="section-title" data-reveal="clip">
            Notas <em>de curso,</em> abiertas
          </h2>
          <p className="archive-lead" data-reveal="up" style={{ '--d': '120ms' } as CSSProperties}>
            Además de la galería conservo un archivo con clases, lecturas, glosarios y traducciones: más de{' '}
            {Math.floor(total / 10) * 10} documentos navegables, sin registro.
          </p>
        </div>

        <div className="archive-grid">
          {modules.map((m, i) => (
            <Link
              key={m.href}
              href={m.href}
              className="archive-card"
              data-tilt
              data-tilt-amount="0.6"
              data-cursor="Entrar"
              data-reveal="up"
              style={{ '--d': `${i * 110}ms`, '--c': m.color } as CSSProperties}
            >
              <span className="archive-letter" lang="grc" aria-hidden="true">
                {m.letra}
              </span>
              <span className="archive-docs">
                <Counter value={m.docs} pad={3} />
                <span>documentos</span>
              </span>
              <span className="archive-title">{m.titulo}</span>
              <span className="archive-en">{m.en}</span>
              <span className="archive-desc">{m.descripcion}</span>
              <span className="archive-sections">
                {m.secciones.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </span>
              <span className="archive-cta" aria-hidden="true">
                Entrar al módulo <span>→</span>
              </span>
              <span className="work-card-shine" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <Link href="/buscar" className="archive-search" data-reveal="up" data-cursor="Buscar">
          <span className="archive-search-label">Buscar en</span>
          <span className="archive-search-count">
            <Counter value={total} /> documentos
          </span>
          <span className="archive-search-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </SceneOff>
  )
}
