import Link from 'next/link'
import { ContentItem, Module } from '@/lib/content'

interface Props {
  module: Module
  items: ContentItem[]
  activeSlug?: string
  accentColor: string
}

export default function ModuleSidebar({ module, items, activeSlug, accentColor }: Props) {
  // Group by section
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }

  const hoverClass =
    accentColor === 'amber'
      ? 'hover:bg-amber-50 hover:text-amber-900'
      : accentColor === 'violet'
      ? 'hover:bg-violet-50 hover:text-violet-900'
      : 'hover:bg-teal-50 hover:text-teal-900'

  const activeClass =
    accentColor === 'amber'
      ? 'bg-amber-100 text-amber-900 font-semibold'
      : accentColor === 'violet'
      ? 'bg-violet-100 text-violet-900 font-semibold'
      : 'bg-teal-100 text-teal-900 font-semibold'

  const sectionColor =
    accentColor === 'amber'
      ? 'text-amber-700'
      : accentColor === 'violet'
      ? 'text-violet-700'
      : 'text-teal-700'

  return (
    <nav className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2 pb-8">
        {Object.entries(grouped).map(([section, sectionItems]) => (
          <div key={section} className="mb-5">
            <p className={`text-xs font-mono font-bold uppercase tracking-widest mb-2 ${sectionColor}`}>
              {section}
            </p>
            <ul className="space-y-0.5">
              {sectionItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${module}/${item.slug}`}
                    className={`block px-3 py-1.5 rounded text-sm text-gray-700 transition-colors truncate ${
                      activeSlug === item.slug ? activeClass : hoverClass
                    }`}
                    title={item.title}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
