import Link from 'next/link'
import { works } from './trabajos/works'

const SITE_URL = 'https://paideia.stevenvallejo.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Paideía — Galería de filosofía',
  url: SITE_URL,
  author: { '@type': 'Person', name: 'Steven Vallejo', url: 'https://www.stevenvallejo.com' },
}

export default function Home() {
  const ponencias = works.filter((w) => w.tipo === 'ponencia')
  const ensayos = works.filter((w) => w.tipo === 'ensayo')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero compacto */}
      <section className="pt-16 pb-8 text-center">
        <span className="inline-block mb-4 text-sm font-mono tracking-widest uppercase" style={{ color: 'var(--accent-deep)' }}>
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
          mente y materia, ontología, filosofía de la ciudad, retórica, lógica, sistemas complejos,
          filosofía de la religión y de la técnica.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/buscar" className="btn-ghost inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors">
            Buscar en todo el portal
          </Link>
        </div>
      </section>

      {/* Ponencias */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Ponencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ponencias.map((work) => (
            <a key={work.id} href={work.url} target="_blank" rel="noopener noreferrer"
              className="brand-card group rounded-lg p-6 flex flex-col gap-4 no-underline hover:no-underline">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight flex-1" style={{ color: 'var(--text)' }}>{work.titulo}</h3>
                <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap">Ponencia</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{work.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {work.topics.map((topic) => (
                  <span key={topic} className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'var(--surface-2)', color: 'var(--accent-deep)', border: '1px solid var(--border)' }}>{topic}</span>
                ))}
              </div>
              <span className="mt-4 text-sm font-medium" style={{ color: '#e0a85e' }}>Ver →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Ensayos */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Ensayos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ensayos.map((work) => (
            <a key={work.id} href={work.url} target="_blank" rel="noopener noreferrer"
              className="brand-card group rounded-lg p-6 flex flex-col gap-4 no-underline hover:no-underline">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight flex-1" style={{ color: 'var(--text)' }}>{work.titulo}</h3>
                <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap">Ensayo</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>{work.abstract}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {work.topics.map((topic) => (
                  <span key={topic} className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'var(--surface-2)', color: 'var(--accent-deep)', border: '1px solid var(--border)' }}>{topic}</span>
                ))}
              </div>
              <span className="mt-4 text-sm font-medium" style={{ color: '#e0a85e' }}>Ver →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Archivo académico — secundario */}
      <div className="border-t my-12" style={{ borderColor: 'var(--border)' }} />
      <section className="pb-16">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          También conservo un <strong style={{ color: 'var(--text)' }}>archivo académico</strong> abierto
          con notas de clase y materiales de curso:{' '}
          <Link href="/griego" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Griego clásico</Link>
          {' · '}
          <Link href="/neurofilosofia" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Neurofilosofía</Link>
          {' · '}
          <Link href="/filosofia-ciudad" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Filosofía de la ciudad</Link>.
        </p>
      </section>
    </div>
  )
}
