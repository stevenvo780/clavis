import type { CSSProperties } from 'react'
import { ELEMENT_BY_KEY, type ElementKey } from '@/lib/elements'
import PageHero from '@/components/visual/PageHero'
import SolidGlyph from '@/components/visual/SolidGlyph'
import { works } from '@/app/trabajos/works'

export const metadata = {
  title: 'Ponencias y cuadernos — portal de humanidades digitales',
  description: 'Ponencias académicas interactivas y un cuaderno de congreso con seis conversaciones sobre IA, conocimiento y juicio. Diagramas de argumentos, mapas conceptuales y notas personales, junto a los decks de filosofía, neurofilosofía y ciudad de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/ponencias/' },
  openGraph: {
    title: 'Ponencias y cuadernos · Paideía — Mouseîon',
    description: 'Interactive philosophy presentations and a conference notebook with six conversations on AI, knowledge and judgment.',
    url: 'https://paideia.stevenvallejo.com/ponencias',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Ponencias y cuadernos · Paideía — Mouseîon',
    description: 'Filosofía en conversación: cuaderno de congreso y presentaciones interactivas sobre filosofía, IA y ciudad.',
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
  const cuadernos = works.filter((work) => work.tipo === 'cuaderno')
  const recorridos = [
    ...cuadernos.map((work) => ({
      title: work.titulo,
      subtitle: `Cuaderno de congreso · ${work.topics.slice(0, 3).join(' · ')} · Mapas y notas personales`,
      url: work.url,
      elemento: work.elemento,
    })),
    ...ponencias,
  ]

  return (
    <div className="page">
      <div className="container-wide">
        <PageHero
          eyebrow="Presentations"
          eyebrowNum="λόγοι"
          title="Ponencias"
          titleEn="Presentations"
          description="Ponencias de curso y un cuaderno de congreso para recorrer seis conversaciones sobre IA, conocimiento y juicio. Decks interactivos, diagramas de argumentos, mapas conceptuales y notas personales."
          descriptionEn="Academic course presentations and a conference notebook covering six conversations on AI, knowledge and judgment. Interactive decks, argument diagrams, concept maps and personal notes."
          solid="dodecaedro"
          color="#8d7cc0"
          visualLabel="dodecaedro · 12 caras"
          stats={[
            { value: ponencias.length, label: 'ponencias disponibles' },
            { value: cuadernos.length, label: 'cuaderno de congreso' },
          ]}
        />

        <section className="deck-list" aria-label={`Ponencias y cuadernos (${recorridos.length})`}>
          {recorridos.map((p, i) => {
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
