import Link from 'next/link'
import { ContentItem, Module } from '@/lib/content'

interface Props {
  module: Module
  items: ContentItem[]
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  accentColor: string
}

export default function ModuleIndex({
  module,
  items,
  title,
  titleEn,
  description,
  descriptionEn,
  accentColor,
}: Props) {
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }

  const headerGradient =
    accentColor === 'amber'
      ? 'from-amber-50 to-amber-100/40 border-amber-200'
      : accentColor === 'violet'
      ? 'from-violet-50 to-violet-100/40 border-violet-200'
      : 'from-teal-50 to-teal-100/40 border-teal-200'

  const sectionColor =
    accentColor === 'amber'
      ? 'text-amber-700 border-amber-200'
      : accentColor === 'violet'
      ? 'text-violet-700 border-violet-200'
      : 'text-teal-700 border-teal-200'

  const cardHover =
    accentColor === 'amber'
      ? 'hover:border-amber-300 hover:bg-amber-50/50'
      : accentColor === 'violet'
      ? 'hover:border-violet-300 hover:bg-violet-50/50'
      : 'hover:border-teal-300 hover:bg-teal-50/50'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Module header */}
      <div className={`rounded-2xl border bg-gradient-to-br p-8 mb-10 ${headerGradient}`}>
        <h1 className="text-3xl font-bold font-serif text-gray-900">{title}</h1>
        <p className="text-sm italic text-gray-400 mt-0.5">{titleEn}</p>
        <p className="mt-3 text-gray-600 max-w-2xl">{description}</p>
        <p className="mt-1 text-sm text-gray-400 italic max-w-2xl">{descriptionEn}</p>
        <p className="mt-4 text-xs font-mono text-gray-400">{items.length} documentos disponibles</p>
      </div>

      {/* Sections */}
      {Object.entries(grouped).map(([section, sectionItems]) => (
        <div key={section} className="mb-10">
          <h2 className={`text-sm font-mono font-bold uppercase tracking-widest mb-4 pb-2 border-b ${sectionColor}`}>
            {section} ({sectionItems.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectionItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${module}/${item.slug}`}
                className={`block rounded-xl border border-gray-200 bg-white p-4 transition-all ${cardHover}`}
              >
                <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3">
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
