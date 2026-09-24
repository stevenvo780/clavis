import type { CSSProperties } from 'react'

interface Deck {
  title: string
  subtitle?: string
  url?: string
  /** When true (or no url), renders an honest "coming soon" state. */
  comingSoon?: boolean
}

interface Props {
  decks: Deck[]
  /** Show an embedded iframe preview for the first deck that has a url. */
  embedFirst?: boolean
}

export default function Presentations({ decks, embedFirst = true }: Props) {
  const firstWithUrl = decks.find((d) => d.url && !d.comingSoon)

  return (
    <section className="decks" aria-labelledby="decks-title">
      <h2 id="decks-title" className="doc-section-title" data-reveal="up">
        <span>Presentaciones</span>
        <span className="doc-section-count">{String(decks.length).padStart(2, '0')}</span>
      </h2>

      <div className="deck-grid">
        {decks.map((deck, i) => {
          const unavailable = deck.comingSoon || !deck.url
          const body = (
            <>
              <span className="deck-card-badge">{unavailable ? 'próximamente' : 'deck interactivo'}</span>
              <h3 className="deck-card-title">{deck.title}</h3>
              {deck.subtitle && <p className="deck-card-sub">{deck.subtitle}</p>}
              {!unavailable && (
                <span className="deck-card-cta" aria-hidden="true">
                  Abrir presentación <span>↗</span>
                </span>
              )}
            </>
          )
          const style = { '--d': `${i * 80}ms` } as CSSProperties
          if (unavailable) {
            return (
              <div key={deck.title} className="deck-card is-soon" aria-disabled="true" data-reveal="up" style={style}>
                {body}
              </div>
            )
          }
          return (
            <a
              key={deck.title}
              href={deck.url}
              target="_blank"
              rel="noopener noreferrer"
              className="deck-card"
              data-reveal="up"
              data-tilt
              data-tilt-amount="0.4"
              data-cursor="Abrir"
              style={style}
            >
              {body}
              <span className="sr-only"> (abre en nueva pestaña)</span>
              <span className="work-card-shine" aria-hidden="true" />
            </a>
          )
        })}
      </div>

      {embedFirst && firstWithUrl && (
        <div className="deck-embed" data-reveal="up">
          <div className="deck-embed-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <em>{firstWithUrl.url?.replace(/^https?:\/\//, '')}</em>
          </div>
          <iframe src={firstWithUrl.url} title={firstWithUrl.title} loading="lazy" allowFullScreen />
        </div>
      )}
    </section>
  )
}
