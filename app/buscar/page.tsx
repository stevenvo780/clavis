import { getAllContent } from '@/lib/content'
import SearchClient from './SearchClient'
import SplitChars from '@/components/visual/SplitChars'

export const metadata = {
  title: 'Buscar — portal de humanidades digitales',
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
    <div className="page container-wide">
      <header className="search-hero">
        <p className="section-label" data-reveal="up">
          <span className="section-num">ζήτησις</span> Búsqueda instantánea
        </p>
        <h1 className="page-hero-title" data-reveal="split">
          <SplitChars text="Buscar" />
        </h1>
        <p className="page-hero-desc" data-reveal="up" style={{ '--d': '250ms' } as React.CSSProperties}>
          Búsqueda instantánea en los tres módulos &mdash; sin servidor, sin latencia.
          <br />
          <span className="page-hero-desc-en">Instant search across all three modules — no server, no latency.</span>
        </p>
      </header>
      <SearchClient allItems={allItems} />
    </div>
  )
}
