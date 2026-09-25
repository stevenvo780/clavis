import type { CSSProperties } from 'react'
import { ELEMENT_BY_KEY, type ElementKey } from '@/lib/elements'
import PageHero from '@/components/visual/PageHero'
import SolidGlyph from '@/components/visual/SolidGlyph'

export const metadata = {
  title: 'Ponencias — portal de humanidades digitales',
  description: 'Presentaciones académicas interactivas en filosofía, IA y ciudad: silicio o tejido (mente y materia), cartografía crítica de Medellín, la retórica como técnica, Platón Fedón, Yuk Hui sobre IA y Geoffrey Hinton. Ponencias de Steven Vallejo, parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/ponencias/' },
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

const ponencias: { title: string; subtitle: string; url: string; elemento: ElementKey }[] = [
  {
    title: '¿Silicio o Tejido? — Límites materiales y ontológicos de la mente',
    subtitle: '¿Puede la mente emularse en silicio o requiere el carbono? · Neurofilosofía · Autopoiesis y conciencia',
    url: 'https://neurocarbon.stevenvallejo.com/',
    elemento: 'fuego',
  },
  {
    title: 'La ciudad bien asignada — cartografía crítica de una Medellín posible',
    subtitle: 'Repensar y cartografiar la ciudad · Filosofía de la Ciudad · Urbanismo',
    url: 'https://autopoesis.stevenvallejo.com/',
    elemento: 'agua',
  },
  {
    title: 'La retórica como τέχνη y no ἐμπειρία',
    subtitle: 'El arte técnico de la retórica frente a la mera experiencia · Griego Clásico · Retórica',
    url: 'https://retorica.stevenvallejo.com/',
    elemento: 'aire',
  },
  {
    title: 'Fragmentar el futuro — Sobre el límite de la inteligencia artificial',
    subtitle: 'Yuk Hui, pp. 163–191 · 19 slides · Filosofía de la Ciudad · Unidad Urban AI',
    url: 'https://ponencia-yuk-hui-critertec-a963d21e.vercel.app/',
    elemento: 'cosmos',
  },
  {
    title: 'Redes Neuronales — del perceptron al deep learning',
    subtitle: 'Geoffrey Hinton · ~16 slides · Neurofilosofía',
    url: 'https://hinton.stevenvallejo.com/',
    elemento: 'fuego',
  },
  {
    title: 'Fedon — La inmortalidad del alma',
    subtitle: 'Platón · Griego Clásico',
    url: 'https://clavis-decks.vercel.app/platon/',
    elemento: 'tierra',
  },
  {
    title: 'La arquitectura de lo ausente — Bertrand Russell',
    subtitle: 'Conocimiento directo y conocimiento por referencia · Los problemas de la filosofía, cap. 5 · 14 diapositivas · Filosofía del Lenguaje',
    url: 'https://russell.stevenvallejo.com/',
    elemento: 'aire',
  },
]

export default function PonenciasPage() {
  return (
    <div className="page">
      <div className="container-wide">
        <PageHero
          eyebrow="Presentations"
          eyebrowNum="λόγοι"
          title="Ponencias"
          titleEn="Presentations"
          description="Presentaciones académicas en filosofía e inteligencia artificial. Decks interactivos elaborados a partir de los cursos de Griego Clásico, Neurofilosofía y Filosofía de la Ciudad."
          descriptionEn="Academic presentations in philosophy and artificial intelligence. Interactive decks built from Classical Greek, Neurophilosophy and Philosophy of the City courses."
          solid="dodecaedro"
          color="#8d7cc0"
          visualLabel="dodecaedro · 12 caras"
          stats={[{ value: ponencias.length, label: 'ponencias disponibles' }]}
        />

        <section className="deck-list" aria-label={`Presentaciones (${ponencias.length})`}>
          {ponencias.map((p, i) => {
            const el = ELEMENT_BY_KEY[p.elemento]
            const [main, ...rest] = p.title.split(' — ')
            return (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="deck-row"
                data-reveal="up"
                data-cursor="Abrir"
                style={{ '--c': el.colores[0], '--c2': el.colores[1], '--d': `${(i % 4) * 60}ms` } as CSSProperties}
              >
                <span className="deck-row-fill" aria-hidden="true" />
                <span className="deck-row-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="deck-row-glyph" aria-hidden="true">
                  <SolidGlyph solid={el.solido} size={56} />
                </span>
                <span className="deck-row-text">
                  <span className="deck-row-title">
                    {main}
                    {rest.length > 0 && <em> — {rest.join(' — ')}</em>}
                  </span>
                  <span className="deck-row-sub">{p.subtitle}</span>
                </span>
                <span className="deck-row-el">
                  <span lang="grc">{el.griego}</span> {el.nombre}
                </span>
                <span className="deck-row-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only"> (abre en nueva pestaña)</span>
              </a>
            )
          })}
        </section>
      </div>
    </div>
  )
}
