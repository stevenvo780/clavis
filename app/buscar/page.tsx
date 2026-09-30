import { getAllContent } from '@/lib/content'
import { works } from '@/app/trabajos/works'
import SearchClient from './SearchClient'
import SplitChars from '@/components/visual/SplitChars'

export const metadata = {
  title: 'Buscar — portal de humanidades digitales',
  description: 'Busca las obras, ponencias y cuadernos de Paideía junto al archivo de Griego Clásico, Neurofilosofía y Filosofía de la Ciudad.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/buscar/' },
  openGraph: {
    title: 'Buscar · Paideía — Mouseîon',
    description: 'Instant full-text search across all Paideía modules: Classical Greek, Neurophilosophy and Philosophy of the City.',
    url: 'https://paideia.stevenvallejo.com/buscar',
    siteName: 'Mouseîon',
  },
}

export default function BuscarPage() {
  // Pass only the fields needed for search (no full content) to keep the client bundle small
  const documents = getAllContent().map(({ slug, title, section, module, excerpt }) => ({
    slug,
    title,
    section,
    module,
    excerpt,
  }))
  const allItems = [
    ...works.map((work) => ({
      slug: work.id,
      title: work.titulo,
      section: work.tipo === 'cuaderno' ? 'Cuaderno de congreso' : work.tipo,
      module: 'obras',
      excerpt: `${work.abstract} ${work.topics.join(' · ')}`,
      href: work.url,
    })),
    ...documents,
  ]

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
          Busca entre las obras, ponencias, cuadernos y los tres módulos del archivo.
          <br />
          <span className="page-hero-desc-en">Search works, presentations, notebooks and all three archive modules.</span>
        </p>
      </header>
      <SearchClient allItems={allItems} />
    </div>
  )
}
