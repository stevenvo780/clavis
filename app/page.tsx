import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 text-center">
        <span
          className="inline-block mb-4 text-sm font-mono tracking-widest uppercase"
          style={{ color: 'var(--accent-deep)' }}
        >
          Filosofía &bull; Philosophy
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight" style={{ color: 'var(--primary)' }}>
          Paideía
        </h1>
        <p className="mt-2 text-2xl font-light font-serif italic" style={{ color: 'var(--text-muted)' }}>
          galería de filosofía
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: 'var(--text)' }}>
          Mi trabajo en filosofía: ensayos y ponencias propios sobre una pluralidad de temas —
          mente y materia, ontología, filosofía de la ciudad, retórica, lógica formal, sistemas
          complejos, filosofía de la religión y de la técnica.
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-base italic" style={{ color: 'var(--text-muted)' }}>
          My work in philosophy: original essays and presentations across a plurality of topics —
          mind and matter, ontology, urban philosophy, rhetoric, logic, complex systems.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/trabajos"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Ver la galería
          </Link>
          <Link
            href="/buscar"
            className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Buscar en todo el portal
          </Link>
        </div>
      </section>

      {/* Galería de trabajos — protagonista */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
          Ensayos y Ponencias
        </h2>
        <Link
          href="/trabajos"
          className="brand-card group rounded-2xl p-6 flex flex-col gap-4 mb-12 md:mb-16"
        >
          <div className="flex items-start justify-between">
            <span
              className="text-5xl font-serif font-bold opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ color: '#e0a85e' }}
            >
              ◎
            </span>
            <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full">
              10 trabajos
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Galería de trabajos filosóficos</h3>
            <p className="text-xs mt-0.5 italic" style={{ color: 'var(--text-muted)' }}>Original research collection</p>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
            Investigación y ensayos propios que cruzan muchos temas: de la mente y el carbono a la
            ciudad, de la retórica clásica a la crítica del gnosticismo, de la filosofía de la ciencia
            a la filosofía de la programación.
          </p>
          <p className="text-xs italic leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Original essays and presentations spanning many topics — from mind and matter to the city,
            from classical rhetoric to philosophy of science and of programming.
          </p>
          <span className="text-sm font-medium mt-auto" style={{ color: '#e0a85e' }}>
            Explorar galería &rarr;
          </span>
        </Link>
      </section>

      {/* Archivo académico — secundario, sin protagonismo temático */}
      <section className="pb-8">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          También conservo un <strong style={{ color: 'var(--text)' }}>archivo académico</strong> abierto
          con notas de clase y materiales de curso:{' '}
          <Link href="/griego" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Griego clásico</Link>
          {' · '}
          <Link href="/neurofilosofia" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Neurofilosofía</Link>
          {' · '}
          <Link href="/filosofia-ciudad" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Filosofía de la ciudad</Link>
          {' · '}
          <Link href="/ponencias" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Ponencias</Link>.
        </p>
      </section>

      {/* Divider */}
      <div className="border-t my-12" style={{ borderColor: 'var(--border)' }} />

      {/* About */}
      <section className="pb-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Sobre Paideía</h2>
        <p className="leading-relaxed" style={{ color: 'var(--text)' }}>
          Paideía es la galería de mi trabajo en filosofía: un portafolio creciente de ensayos y
          ponencias propios que atraviesan muchos temas. Conserva además un archivo académico abierto,
          para que el conocimiento no quede atrapado en archivos locales, sino que pueda consultarse,
          compartirse y crecer.
        </p>
        <p className="mt-4 italic text-sm" style={{ color: 'var(--text-muted)' }}>
          Paideía is the gallery of my work in philosophy: a growing portfolio of original essays and
          presentations across many topics, plus an open academic archive — browsable, shareable, alive.
        </p>
      </section>
    </div>
  )
}
