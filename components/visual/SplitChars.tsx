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
 * Parte un texto en letras enmascaradas por palabra. Se revelan con CSS cuando un
 * ancestro con `data-reveal` recibe `data-in` (ver RevealManager y globals.css).
 */
export default function SplitChars({ text, className = '', offset = 0, accent }: Props) {
  let i = offset
  const words = text.split(' ')
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={`split ${className}`}>
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
    </>
  )
}
