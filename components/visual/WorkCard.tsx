import type { CSSProperties } from 'react'
import type { Work } from '@/app/trabajos/works'
import { ELEMENT_BY_KEY } from '@/lib/elements'
import SolidGlyph from './SolidGlyph'

const TIPO: Record<Work['tipo'], string> = { ponencia: 'Ponencia', ensayo: 'Ensayo', tesis: 'Tesis' }

/** Separa "Título — subtítulo" (convención de works.ts). */
export function splitTitle(titulo: string) {
  const [main, ...rest] = titulo.split(' — ')
  return { main, sub: rest.join(' — ') }
}

/**
 * Tarjeta de obra con portada generativa: gradiente del elemento, el wireframe de su
 * sólido y la palabra griega. `data-tilt` la inclina con el puntero (TiltManager).
 */
export default function WorkCard({ work, index, prefix = 'P' }: { work: Work; index: number; prefix?: string }) {
  const el = ELEMENT_BY_KEY[work.elemento]
  const { main, sub } = splitTitle(work.titulo)
  const [c1, c2, c3] = el.colores
  return (
    <a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card"
      data-tilt
      data-reveal="card"
      data-cursor="Abrir"
      aria-label={`${work.titulo} (abre en nueva pestaña)`}
      style={{ '--c1': c1, '--c2': c2, '--c3': c3 } as CSSProperties}
    >
      <div className="work-card-media">
        <span className="work-card-greek" lang="grc" aria-hidden="true">
          {el.griego}
        </span>
        <SolidGlyph solid={el.solido} size={240} className="work-card-solid" rx={-0.4 - index * 0.13} ry={0.5 + index * 0.37} />
        <span className="work-card-index">
          {prefix}—{String(index + 1).padStart(2, '0')}
        </span>
        <span className="work-card-type">{TIPO[work.tipo]}</span>
        <span className="work-card-el">
          {el.nombre} · {el.solidoNombre}
        </span>
      </div>
      <div className="work-card-body">
        <h3 className="work-card-title">{main}</h3>
        {sub && <p className="work-card-sub">{sub}</p>}
        <p className="work-card-abstract">{work.abstract}</p>
        <ul className="work-card-topics" aria-label="Temas">
          {work.topics.slice(0, 4).map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="work-card-cta" aria-hidden="true">
          Abrir <span>↗</span>
        </span>
      </div>
      <span className="work-card-shine" aria-hidden="true" />
    </a>
  )
}
