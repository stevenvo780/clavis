'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

interface SearchItem {
  slug: string
  title: string
  section: string
  module: string
  excerpt: string
}

interface Props {
  allItems: SearchItem[]
}

const MODULE_COLOR: Record<string, string> = {
  griego: 'bg-amber-100 text-amber-800',
  neurofilosofia: 'bg-violet-100 text-violet-800',
  'filosofia-ciudad': 'bg-teal-100 text-teal-800',
}

const MODULE_LABEL: Record<string, string> = {
  griego: 'Griego Clasico',
  neurofilosofia: 'Neurofilosofia',
  'filosofia-ciudad': 'Filosofia de la Ciudad',
}

export default function SearchClient({ allItems }: Props) {
  const [query, setQuery] = useState('')

  const results = useCallback(() => {
    if (!query.trim() || query.length < 2) return []
    const q = query.toLowerCase()
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.module.toLowerCase().includes(q)
    )
  }, [query, allItems])

  const hits = results()

  return (
    <div>
      <div className="relative mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar en todo el portal... / Search the entire portal..."
          className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 text-lg focus:outline-none focus:border-indigo-400 bg-white font-sans"
          autoFocus
        />
        {query.length >= 2 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {hits.length} resultado{hits.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-gray-400 text-center">Escribe al menos 2 caracteres</p>
      )}

      {query.length >= 2 && hits.length === 0 && (
        <p className="text-sm text-gray-400 text-center">Sin resultados para &ldquo;{query}&rdquo;</p>
      )}

      <ul className="space-y-3">
        {hits.map((item) => (
          <li key={`${item.module}:${item.slug}`}>
            <Link
              href={`/${item.module}/${item.slug}`}
              className="block rounded-xl border border-gray-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${MODULE_COLOR[item.module] ?? 'bg-gray-100 text-gray-600'}`}>
                  {MODULE_LABEL[item.module] ?? item.module}
                </span>
                <span className="text-xs text-gray-400">{item.section}</span>
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              {item.excerpt && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {!query && (
        <div className="text-center text-gray-400 mt-12">
          <p className="text-4xl mb-4 font-serif text-gray-200">K</p>
          <p className="text-sm">Busca en {allItems.length} documentos de los tres modulos</p>
          <p className="text-xs italic mt-1">Search across {allItems.length} documents from all three modules</p>
        </div>
      )}
    </div>
  )
}
