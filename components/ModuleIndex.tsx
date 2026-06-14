import Link from 'next/link'
import { ContentItem, Module } from '@/lib/content'

interface Props {
  module: Module
  items: ContentItem[]
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  /** Kept for API compatibility; color now comes from the brand palette. */
  accentColor?: string
  /** Optional extra section rendered above the document grid (e.g. Presentaciones). */
  children?: React.ReactNode
}

export default function ModuleIndex({
  module,
  items,
  title,
  titleEn,
  description,
  descriptionEn,
  children,
}: Props) {
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Module header */}
      <div
        className="rounded-2xl border p-8 mb-10"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}
      >
        <h1 className="text-3xl font-bold font-serif" style={{ color: 'var(--text)' }}>{title}</h1>
        <p className="text-sm italic mt-0.5" style={{ color: 'var(--text-muted)' }}>{titleEn}</p>
        <p className="mt-3 max-w-2xl" style={{ color: 'var(--text)' }}>{description}</p>
        <p className="mt-1 text-sm italic max-w-2xl" style={{ color: 'var(--text-muted)' }}>{descriptionEn}</p>
        <p className="mt-4 text-xs font-mono" style={{ color: 'var(--accent-deep)' }}>{items.length} documentos disponibles</p>
      </div>

      {children}

      {/* Sections */}
      {Object.entries(grouped).map(([section, sectionItems]) => (
        <div key={section} className="mb-10">
          <h2
            className="text-sm font-mono font-bold uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
          >
            {section} ({sectionItems.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${module}/${item.slug}`}
                className="brand-card block rounded-xl p-4"
              >
                <h3 className="font-semibold text-sm leading-snug line-clamp-2" style={{ color: 'var(--text)' }}>
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="mt-2 text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                    {item.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
