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
    <section className="mb-10">
      <h2
        className="text-sm font-mono font-bold uppercase tracking-widest mb-4 pb-2 border-b"
        style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
      >
        Presentaciones ({decks.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {decks.map((deck) => {
          const unavailable = deck.comingSoon || !deck.url
          const card = (
            <>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>
                  {deck.title}
                </h3>
                <span className="brand-badge text-xs font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                  {unavailable ? 'proximamente' : 'deck'}
                </span>
              </div>
              {deck.subtitle && (
                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {deck.subtitle}
                </p>
              )}
              {!unavailable && (
                <span className="mt-3 inline-block text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  Abrir presentacion &rarr;
                </span>
              )}
            </>
          )

          if (unavailable) {
            return (
              <div
                key={deck.title}
                className="brand-surface rounded-xl p-4"
                style={{ opacity: 0.85 }}
                aria-disabled="true"
              >
                {card}
              </div>
            )
          }

          return (
            <a
              key={deck.title}
              href={deck.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card block rounded-xl p-4"
            >
              {card}
            </a>
          )
        })}
      </div>

      {embedFirst && firstWithUrl && (
        <div
          className="mt-5 rounded-xl border overflow-hidden"
          style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
        >
          <iframe
            src={firstWithUrl.url}
            title={firstWithUrl.title}
            loading="lazy"
            className="w-full"
            style={{ height: '520px', border: '0', display: 'block' }}
            allowFullScreen
          />
        </div>
      )}
    </section>
  )
}
