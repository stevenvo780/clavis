import { getAllContent } from '@/lib/content'
import SearchClient from './SearchClient'

export const metadata = {
  title: 'Buscar — portal de humanidades digitales · Mouseîon',
  description: 'Búsqueda instantánea en todos los módulos de Paideía: Griego Clásico, Neurofilosofía y Filosofía de la Ciudad. Sin servidor, sin latencia.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/buscar' },
  openGraph: {
    title: 'Buscar · Paideía — Mouseîon',
    description: 'Instant full-text search across all Paideía modules: Classical Greek, Neurophilosophy and Philosophy of the City.',
    url: 'https://paideia.stevenvallejo.com/buscar',
    siteName: 'Mouseîon',
  },
}

export default function BuscarPage() {
  // Pass only the fields needed for search (no full content) to keep the client bundle small
  const allItems = getAllContent().map(({ slug, title, section, module, excerpt }) => ({
    slug,
    title,
    section,
    module,
    excerpt,
  }))

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold font-serif mb-2" style={{ color: 'var(--text)' }}>Buscar</h1>
      <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
        Busqueda instantanea en los tres modulos &mdash; sin servidor, sin latencia.
        <br />
        <span className="italic">Instant search across all three modules — no server, no latency.</span>
      </p>
      <SearchClient allItems={allItems} />
    </div>
  )
}
