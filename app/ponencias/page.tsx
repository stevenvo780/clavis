export const metadata = {
  title: 'Ponencias — portal de humanidades digitales · Mouseîon',
  description: 'Presentaciones academicas interactivas en filosofia e inteligencia artificial: Platon Fedon, Yuk Hui sobre IA, Geoffrey Hinton y redes neuronales. Parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/ponencias' },
  openGraph: {
    title: 'Ponencias · Paideía — Mouseîon',
    description: 'Academic presentations in philosophy and AI: Plato Phaedo, Yuk Hui on AI limits, Geoffrey Hinton and neural networks.',
    url: 'https://paideia.stevenvallejo.com/ponencias',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Ponencias · Paideía — Mouseîon',
    description: 'Presentaciones academicas: Platon, Yuk Hui (IA) y Hinton (redes neuronales). Parte de Paideía.',
    images: ['https://paideia.stevenvallejo.com/og-image.png'],
  },
}

const ponencias = [
  {
    title: 'Fragmentar el futuro — Sobre el limite de la inteligencia artificial',
    subtitle: 'Yuk Hui, pp. 163–191 · 19 slides · Filosofía de la Ciudad · Unidad Urban AI',
    url: 'https://ponencia-yuk-hui-critertec-a963d21e.vercel.app/',
  },
  {
    title: 'Redes Neuronales — del perceptron al deep learning',
    subtitle: 'Geoffrey Hinton · ~16 slides · Neurofilosofía',
    url: 'https://hinton.stevenvallejo.com/',
  },
  {
    title: 'Fedon — La inmortalidad del alma',
    subtitle: 'Platón · Griego Clásico',
    url: 'https://clavis-decks.vercel.app/platon/',
  },
]

export default function PonenciasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Module header */}
      <div
        className="rounded-2xl border p-8 mb-10"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
      >
        <h1 className="text-3xl font-bold font-serif" style={{ color: 'var(--text)' }}>
          Ponencias
        </h1>
        <p className="text-sm italic mt-0.5" style={{ color: 'var(--text-muted)' }}>
          Presentations
        </p>
        <p className="mt-3 max-w-2xl" style={{ color: 'var(--text)' }}>
          Presentaciones académicas en filosofía e inteligencia artificial. Decks interactivos
          elaborados a partir de los cursos de Griego Clásico, Neurofilosofía y Filosofía de la Ciudad.
        </p>
        <p className="mt-1 text-sm italic max-w-2xl" style={{ color: 'var(--text-muted)' }}>
          Academic presentations in philosophy and artificial intelligence. Interactive decks
          built from Classical Greek, Neurophilosophy and Philosophy of the City courses.
        </p>
        <p className="mt-4 text-xs font-mono" style={{ color: 'var(--accent-deep)' }}>
          {ponencias.length} ponencias disponibles
        </p>
      </div>

      {/* Ponencias grid */}
      <section>
        <h2
          className="text-sm font-mono font-bold uppercase tracking-widest mb-4 pb-2 border-b"
          style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
        >
          Presentaciones ({ponencias.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ponencias.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card block rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text)' }}>
                  {p.title}
                </h3>
                <span className="brand-badge text-xs font-mono px-2 py-0.5 rounded-full whitespace-nowrap">
                  deck
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {p.subtitle}
              </p>
              <span className="mt-auto inline-block text-sm font-medium" style={{ color: 'var(--primary)' }}>
                Ver presentacion &rarr;
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
