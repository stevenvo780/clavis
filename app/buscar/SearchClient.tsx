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

const MODULE_LABEL: Record<string, string> = {
  griego: 'Griego Clásico',
  neurofilosofia: 'Neurofilosofía',
  'filosofia-ciudad': 'Filosofía de la Ciudad',
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
          className="brand-search w-full border-2 rounded-xl px-5 py-3 text-lg font-sans focus:outline-none"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          autoFocus
        />
        {query.length >= 2 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--text-muted)' }}>
            {hits.length} resultado{hits.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>Escribe al menos 2 caracteres</p>
      )}

      {query.length >= 2 && hits.length === 0 && (
        <p className="text-sm text-center" style={{ color: 'var(--text-muted)' }}>Sin resultados para &ldquo;{query}&rdquo;</p>
      )}

      <ul className="space-y-3">
        {hits.map((item) => (
          <li key={`${item.module}:${item.slug}`}>
            <Link
              href={`/${item.module}/${item.slug}`}
              className="brand-card block rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="brand-badge text-xs font-mono px-2 py-0.5 rounded-full">
                  {MODULE_LABEL[item.module] ?? item.module}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.section}</span>
              </div>
              <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{item.title}</h3>
              {item.excerpt && (
                <p className="mt-1 text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{item.excerpt}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {!query && (
        <div className="text-center mt-12" style={{ color: 'var(--text-muted)' }}>
          <p className="text-4xl mb-4 font-serif" style={{ color: 'var(--primary)', opacity: 0.5 }}>K</p>
          <p className="text-sm">Busca en {allItems.length} documentos de los tres modulos</p>
          <p className="text-xs italic mt-1">Search across {allItems.length} documents from all three modules</p>
        </div>
      )}
    </div>
  )
}
