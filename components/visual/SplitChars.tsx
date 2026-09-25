import type { CSSProperties } from 'react'

interface Props {
  text: string
  className?: string
  /** Índice inicial para encadenar el escalonado con otro bloque. */
  offset?: number
  /** Letras que se pintan con el acento (por posición en el texto). */
  accent?: (char: string, index: number) => boolean
}

/**
 * Parte un texto en letras enmascaradas por palabra.
 * Single accessible copy via aria-label; glyph spans aria-hidden.
 * (sr-only + visible chars previously made H1 textContent "PaideíaPaideía".)
 * Reveal CSS unchanged — SplitChars still deferred ≥8s on home (ship LCP path).
 */
export default function SplitChars({ text, className = '', offset = 0, accent }: Props) {
  let i = offset
  const words = text.split(' ')
  return (
    <span className={`split ${className}`.trim()} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span key={wi} className="split-word">
            {[...word].map((ch, ci) => {
              const idx = i++
              return (
                <span
                  key={ci}
                  className={`split-char${accent?.(ch, idx) ? ' split-accent' : ''}`}
                  style={{ '--i': idx } as CSSProperties}
                >
                  {ch}
                </span>
              )
            })}
            {wi < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </span>
  )
}
