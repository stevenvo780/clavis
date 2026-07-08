import type { Metadata } from 'next'
import Link from 'next/link'
import { works } from './works'

export const metadata: Metadata = {
  title: 'Trabajos Filosóficos — Ensayos y Ponencias',
  description: 'Galería de trabajos filosóficos de Steven Vallejo: 10 ensayos y ponencias sobre neurofilosofía, ontología, retórica, filosofía de la ciudad y complejidad.',
}

const SITE_URL = 'https://paideia.stevenvallejo.com'

export const jsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Trabajos Filosóficos',
  url: `${SITE_URL}/trabajos`,
  author: {
    '@type': 'Person',
    name: 'Steven Vallejo',
    url: 'https://www.stevenvallejo.com',
  },
})

export default function TrabajosPage() {
  const ponencias = works.filter(w => w.tipo === 'ponencia')
  const ensayos = works.filter(w => w.tipo === 'ensayo')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 text-center">
        <span
          className="inline-block mb-4 text-sm font-mono tracking-widest uppercase"
          style={{ color: 'var(--accent-deep)' }}
        >
          Investigación Filosófica
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight" style={{ color: 'var(--primary)' }}>
          Trabajos
        </h1>
        <p className="mt-2 text-2xl font-light font-serif italic" style={{ color: 'var(--text-muted)' }}>
          Ensayos y ponencias
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: 'var(--text)' }}>
          Colección de trabajos filosóficos propios: investigación original en neurofilosofía,
          ontología, filosofía de la ciudad, teoría de sistemas complejos y filosofía computacional.
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-base italic" style={{ color: 'var(--text-muted)' }}>
          Original research and essays in neurophilosophy, ontology, urban philosophy, complex systems theory and computational philosophy.
        </p>
      </section>

      {/* Ponencias */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
          Ponencias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ponencias.map(work => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card group rounded-lg p-6 flex flex-col gap-4 no-underline hover:no-underline"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight flex-1" style={{ color: 'var(--text)' }}>
                  {work.titulo}
                </h3>
                <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap">
                  Ponencia
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {work.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {work.topics.map(topic => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: 'var(--surface-2)',
                      color: 'var(--accent-deep)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm font-medium" style={{ color: '#e0a85e' }}>
                <span>Ver → </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Ensayos */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>
          Ensayos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ensayos.map(work => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-card group rounded-lg p-6 flex flex-col gap-4 no-underline hover:no-underline"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold leading-tight flex-1" style={{ color: 'var(--text)' }}>
                  {work.titulo}
                </h3>
                <span className="brand-badge text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap">
                  Ensayo
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                {work.abstract}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {work.topics.map(topic => (
                  <span
                    key={topic}
                    className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{
                      background: 'var(--surface-2)',
                      color: 'var(--accent-deep)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm font-medium" style={{ color: '#e0a85e' }}>
                <span>Ver →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t my-16" style={{ borderColor: 'var(--border)' }} />

      {/* CTA back to modules */}
      <section className="pb-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Más en Paideía</h2>
        <p className="mb-6" style={{ color: 'var(--text)' }}>
          Explora también los módulos de Griego Clásico, Neurofilosofía y Filosofía de la Ciudad.
        </p>
        <Link
          href="/"
          className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          ← Volver a módulos
        </Link>
      </section>
    </div>
  )
}
