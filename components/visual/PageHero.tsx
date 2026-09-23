import type { CSSProperties, ReactNode } from 'react'
import type { SolidKey } from '@/lib/solids'
import SplitChars from './SplitChars'
import Counter from './Counter'
import MiniCrystalSlot from '@/components/three/MiniCrystalSlot'

interface Props {
  eyebrow: string
  eyebrowNum?: string
  title: string
  titleEn?: string
  description?: string
  descriptionEn?: string
  solid: SolidKey
  color: string
  stats?: { value: number; label: string }[]
  visualLabel?: string
  children?: ReactNode
}

/** Cabecera de las páginas internas: título partido, textos y el mini-cristal del módulo. */
export default function PageHero({
  eyebrow,
  eyebrowNum,
  title,
  titleEn,
  description,
  descriptionEn,
  solid,
  color,
  stats,
  visualLabel,
  children,
}: Props) {
  return (
    <header className="page-hero" style={{ '--c': color } as CSSProperties}>
      <div className="page-hero-text">
        <p className="section-label" data-reveal="up">
          {eyebrowNum && <span className="section-num">{eyebrowNum}</span>} {eyebrow}
        </p>
        <h1 className="page-hero-title" data-reveal="split">
          <SplitChars text={title} />
        </h1>
        {titleEn && (
          <p className="page-hero-en" data-reveal="up" style={{ '--d': '250ms' } as CSSProperties}>
            {titleEn}
          </p>
        )}
        {description && (
          <p className="page-hero-desc" data-reveal="up" style={{ '--d': '330ms' } as CSSProperties}>
            {description}
          </p>
        )}
        {descriptionEn && (
          <p className="page-hero-desc-en" data-reveal="up" style={{ '--d': '400ms' } as CSSProperties}>
            {descriptionEn}
          </p>
        )}
        {stats && (
          <dl className="page-hero-stats" data-reveal="up" style={{ '--d': '480ms' } as CSSProperties}>
            {stats.map((s) => (
              <div key={s.label}>
                <dd>
                  <Counter value={s.value} pad={2} />
                </dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
        {children}
      </div>
      <div className="page-hero-visual" data-reveal="fade" style={{ '--d': '150ms' } as CSSProperties}>
        <MiniCrystalSlot solid={solid} color={color} label={visualLabel} />
      </div>
    </header>
  )
}
