'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Link from 'next/link'
import { MODULE_VISUAL, type ModuleKey } from '@/lib/modules'
import SolidGlyph from '@/components/visual/SolidGlyph'

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

const RESULTS_PER_PAGE = 20
const SUGGESTIONS = ['Platón', 'conciencia', 'Heidegger', 'verbo', 'memoria', 'ciudad', 'Chalmers', 'λόγος']
const MODULES = Object.keys(MODULE_VISUAL) as ModuleKey[]

/** Pliega acentos y espíritus letra por letra, así los índices coinciden con el original. */
function fold(text: string) {
  let out = ''
  for (const ch of text) {
    const base = ch.normalize('NFD').replace(/[̀-ͯ͂̓ͅ]/g, '').toLowerCase()
    out += base.length === 1 ? base : ch.toLowerCase().slice(0, 1) || ' '
  }
  return out
}

function highlight(text: string, q: string): ReactNode {
  if (!q) return text
  const chars = [...text]
  const folded = fold(text)
  const parts: ReactNode[] = []
  let from = 0
  let at = folded.indexOf(q)
  while (at !== -1) {
    if (at > from) parts.push(chars.slice(from, at).join(''))
    parts.push(<mark key={at}>{chars.slice(at, at + q.length).join('')}</mark>)
    from = at + q.length
    at = folded.indexOf(q, from)
  }
  if (from < chars.length) parts.push(chars.slice(from).join(''))
  return parts
}

export default function SearchClient({ allItems }: Props) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ModuleKey | 'todos'>('todos')
  const [currentPage, setCurrentPage] = useState(1)
  const input = useRef<HTMLInputElement>(null)

  // "/" enfoca el buscador desde cualquier parte de la página.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(t.tagName)) {
        e.preventDefault()
        input.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const indexed = useMemo(
    () => allItems.map((item) => ({ item, hay: fold(`${item.title} ${item.excerpt} ${item.section} ${item.module}`) })),
    [allItems],
  )

  const q = fold(query.trim())
  const matches = useMemo(() => {
    if (q.length < 2) return []
    return indexed.filter((x) => x.hay.includes(q)).map((x) => x.item)
  }, [indexed, q])

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: matches.length }
    for (const m of MODULES) c[m] = matches.filter((x) => x.module === m).length
    return c
  }, [matches])

  const allHits = filter === 'todos' ? matches : matches.filter((x) => x.module === filter)
  const totalPages = Math.max(1, Math.ceil(allHits.length / RESULTS_PER_PAGE))
  const startIdx = (currentPage - 1) * RESULTS_PER_PAGE
  const hits = allHits.slice(startIdx, startIdx + RESULTS_PER_PAGE)

  const handleQueryChange = (value: string) => {
    setQuery(value.slice(0, 200))
    setCurrentPage(1)
  }

  return (
    <div className="search">
      <div className="search-box" data-reveal="up" style={{ '--d': '320ms' } as CSSProperties}>
        <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          ref={input}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Platón, conciencia, Heidegger…"
          aria-label="Buscar en el portal de humanidades digitales"
          className="search-input"
          autoFocus
          maxLength={200}
        />
        {query ? (
          <button type="button" className="search-clear" onClick={() => handleQueryChange('')} aria-label="Borrar búsqueda">
            ×
          </button>
        ) : (
          <kbd className="search-kbd" aria-hidden="true">
            /
          </kbd>
        )}
      </div>

      <div className="search-status" aria-live="polite">
        {query.length > 0 && q.length < 2 && <span>Escribe al menos 2 caracteres</span>}
        {q.length >= 2 && (
          <span>
            {allHits.length} resultado{allHits.length !== 1 ? 's' : ''}
            {filter !== 'todos' && ` en ${MODULE_VISUAL[filter].label}`}
          </span>
        )}
      </div>

      {q.length >= 2 && (
        <div className="chips search-filters" role="group" aria-label="Filtrar por módulo">
          <button type="button" className="chip" aria-pressed={filter === 'todos'} onClick={() => { setFilter('todos'); setCurrentPage(1) }}>
            Todos <span>{counts.todos}</span>
          </button>
          {MODULES.map((m) => (
            <button
              key={m}
              type="button"
              className="chip"
              aria-pressed={filter === m}
              onClick={() => {
                setFilter(m)
                setCurrentPage(1)
              }}
              style={{ '--c': MODULE_VISUAL[m].color } as CSSProperties}
            >
              {MODULE_VISUAL[m].label} <span>{counts[m]}</span>
            </button>
          ))}
        </div>
      )}

      {q.length >= 2 && hits.length === 0 && (
        <p className="search-empty">Sin resultados para &ldquo;{query}&rdquo;</p>
      )}

      <ul className="search-results" key={`${q}:${filter}:${currentPage}`}>
        {hits.map((item, i) => {
          const visual = MODULE_VISUAL[item.module as ModuleKey]
          return (
            <li key={`${item.module}:${item.slug}`} style={{ '--i': Math.min(i, 12), '--c': visual?.color } as CSSProperties}>
              <Link href={`/${item.module}/${item.slug}`} className="search-hit">
                <span className="search-hit-meta">
                  {visual && <SolidGlyph solid={visual.solid} size={18} />}
                  {visual?.label ?? item.module}
                  <span aria-hidden="true">·</span>
                  {item.section}
                </span>
                <span className="search-hit-title">{highlight(item.title, q)}</span>
                {item.excerpt && <span className="search-hit-excerpt">{highlight(item.excerpt, q)}</span>}
                <span className="search-hit-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {q.length >= 2 && allHits.length > RESULTS_PER_PAGE && (
        <div className="search-pager">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn-line"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="btn-line"
          >
            Siguiente
          </button>
        </div>
      )}

      {!query && (
        <div className="search-idle">
          <SolidGlyph solid="hexaedro" size={120} className="search-idle-glyph" />
          <p>Busca en {allItems.length} documentos de los tres módulos</p>
          <p className="search-idle-en">Search across {allItems.length} documents from all three modules</p>
          <div className="chips search-suggestions" aria-label="Sugerencias">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="chip" onClick={() => handleQueryChange(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
