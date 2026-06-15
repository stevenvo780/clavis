import Link from 'next/link'

const modules = [
  {
    href: '/griego',
    symbol: 'α',
    label: 'Griego Clasico',
    labelEn: 'Classical Greek',
    description:
      'Lecciones de conjugacion verbal, tablas de declinacion, glosario, ejercicios de traduccion, gramaticas de referencia y traducciones comentadas del curso universitario de griego antiguo.',
    descriptionEn:
      'Verb conjugation lessons, declension tables, glossary, translation exercises, reference grammars and annotated translations from the university Ancient Greek course.',
    count: '15',
    countLabel: 'documentos',
  },
  {
    href: '/neurofilosofia',
    symbol: '⬡',
    label: 'Neurofilosofia',
    labelEn: 'Neurophilosophy',
    description:
      'Base de conocimiento del curso Filosofia de las Neurociencias: clases con notas detalladas, fichas de 25 autores, temas transversales, lecturas, logica formal y ensayos.',
    descriptionEn:
      'Knowledge base for Philosophy of Neuroscience: lectures with detailed class notes, profiles of 25 key authors, cross-cutting themes, readings, formal logic and essays.',
    count: '149',
    countLabel: 'documentos',
  },
  {
    href: '/filosofia-ciudad',
    symbol: '◈',
    label: 'Filosofia de la Ciudad',
    labelEn: 'Philosophy of the City',
    description:
      'Archivo academico del curso Filosofia de la ciudad: ontologia, poder y politica. Clases con notas detalladas, lecturas (Heidegger, Sassen, Yuk Hui, Calvino, Berman) y ponencias.',
    descriptionEn:
      'Academic archive for Philosophy of the City: ontology, power, politics. Lectures with detailed notes, core readings (Heidegger, Sassen, Yuk Hui, Calvino, Berman) and papers.',
    count: '62',
    countLabel: 'documentos',
  },
  {
    href: '/ponencias',
    symbol: '◉',
    label: 'Ponencias',
    labelEn: 'Presentations',
    description:
      'Presentaciones academicas en filosofia e inteligencia artificial. Decks interactivos de Griego Clasico, Neurofilosofia y Filosofia de la Ciudad.',
    descriptionEn:
      'Academic presentations in philosophy and artificial intelligence. Interactive decks from Classical Greek, Neurophilosophy and Philosophy of the City.',
    count: '3',
    countLabel: 'ponencias',
  },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 text-center">
        <span
          className="inline-block mb-4 text-sm font-mono tracking-widest uppercase"
          style={{ color: 'var(--accent-deep)' }}
        >
          Humanidades Digitales &bull; Digital Humanities
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight" style={{ color: 'var(--primary)' }}>
          Paideía
        </h1>
        <p className="mt-2 text-2xl font-light font-serif italic" style={{ color: 'var(--text-muted)' }}>
          portal de humanidades
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: 'var(--text)' }}>
          Tres modulos de trabajo universitario en un solo portal de consulta.
          Griego clasico, filosofia de las neurociencias y filosofia de la ciudad
          &mdash; todos navegables, buscables y sin registro.
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-base italic" style={{ color: 'var(--text-muted)' }}>
          Three university knowledge modules in one open portal.
          Classical Greek, neurophilosophy, and philosophy of the city &mdash;
          browsable, searchable, no login required.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/buscar"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Buscar en todo el portal
          </Link>
          <Link
            href="#modulos"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Explorar modulos
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section id="modulos" className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className="brand-card group rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-5xl font-serif font-bold opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--primary)' }}
                >
                  {mod.symbol}
                </span>
                <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full">
                  {mod.count} {mod.countLabel}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{mod.label}</h2>
                <p className="text-xs mt-0.5 italic" style={{ color: 'var(--text-muted)' }}>{mod.labelEn}</p>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{mod.description}</p>
              <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>{mod.descriptionEn}</p>
              <span className="text-sm font-medium mt-auto" style={{ color: 'var(--primary)' }}>
                Explorar &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t my-16" style={{ borderColor: 'var(--border)' }} />

      {/* About */}
      <section className="pb-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Sobre Paideía</h2>
        <p className="leading-relaxed" style={{ color: 'var(--text)' }}>
          Paideía consolida materiales academicos universitarios en un portal de consulta abierta.
          Los contenidos provienen de cuatro repositorios de trabajo real:
          <strong> helenikos</strong>, <strong>GriegoFinal</strong>, <strong>neurofilosofia</strong>{' '}
          y <strong>FilosofiaCiudad</strong>. El objetivo es que el conocimiento academico
          producido en el aula no quede atrapado en archivos locales, sino que pueda
          consultarse, compartirse y crecer.
        </p>
        <p className="mt-4 italic text-sm" style={{ color: 'var(--text-muted)' }}>
          Paideía consolidates real university course materials into an open reference portal.
          Content comes from four working repositories. The goal: keep academic knowledge
          out of local files and make it browsable, shareable, and alive.
        </p>
      </section>
    </div>
  )
}
