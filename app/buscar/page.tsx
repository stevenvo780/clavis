import { getAllContent } from '@/lib/content'
import SearchClient from './SearchClient'

export const metadata = {
  title: 'Buscar — Clavis',
  description: 'Busca en todos los modulos del portal Clavis.',
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
      <h1 className="text-3xl font-bold font-serif text-gray-900 mb-2">Buscar</h1>
      <p className="text-gray-500 mb-8 text-sm">
        Busqueda instantanea en los tres modulos &mdash; sin servidor, sin latencia.
        <br />
        <span className="italic">Instant search across all three modules — no server, no latency.</span>
      </p>
      <SearchClient allItems={allItems} />
    </div>
  )
}
