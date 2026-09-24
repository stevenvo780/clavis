import Link from 'next/link'
import type { CSSProperties } from 'react'
import readingTime from 'reading-time'
import type { ContentItem, Module } from '@/lib/content'
import { MODULE_VISUAL } from '@/lib/modules'
import ModuleSidebar from './ModuleSidebar'
import MarkdownRenderer from './MarkdownRenderer'
import SolidGlyph from './visual/SolidGlyph'

/** Vista de lectura compartida por los tres módulos del archivo. */
export default function ArticleView({ module, item, allItems }: { module: Module; item: ContentItem; allItems: ContentItem[] }) {
  const visual = MODULE_VISUAL[module]
  const idx = allItems.findIndex((i) => i.slug === item.slug)
  const prev = idx > 0 ? allItems[idx - 1] : null
  const next = idx >= 0 && idx < allItems.length - 1 ? allItems[idx + 1] : null
  const minutes = Math.max(1, Math.round(readingTime(item.content).minutes))

  return (
    <div className="article-page container-wide" style={{ '--c': visual.color } as CSSProperties}>
      <ModuleSidebar module={module} items={allItems} activeSlug={item.slug} />
      <article className="article">
        <nav className="article-crumbs" aria-label="Ruta">
          <Link href={`/${module}`} className="article-crumb-link">
            <SolidGlyph solid={visual.solid} size={18} />
            {visual.label}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{item.section}</span>
        </nav>
        <header className="article-head">
          <h1 className="article-title">{item.title}</h1>
          <p className="article-meta">
            <span>{item.section}</span>
            <span aria-hidden="true">·</span>
            <span>{minutes} min de lectura</span>
          </p>
        </header>
        <MarkdownRenderer content={item.content} />

        <nav className="article-pager" aria-label="Documentos contiguos">
          {prev ? (
            <Link href={`/${module}/${prev.slug}`} className="article-pager-link" data-tilt data-tilt-amount="0.3">
              <span className="article-pager-dir">← Anterior</span>
              <span className="article-pager-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/${module}/${next.slug}`} className="article-pager-link is-next" data-tilt data-tilt-amount="0.3">
              <span className="article-pager-dir">Siguiente →</span>
              <span className="article-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
        <p className="article-back">
          <Link href={`/${module}`} className="link-underline">
            ← Volver al módulo
          </Link>
        </p>
      </article>
    </div>
  )
}
