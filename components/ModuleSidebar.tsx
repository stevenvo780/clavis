'use client'

import Link from 'next/link'
import { ContentItem, Module } from '@/lib/content'

interface Props {
  module: Module
  items: ContentItem[]
  activeSlug?: string
  /** Kept for API compatibility; color now comes from the brand palette. */
  accentColor?: string
}

export default function ModuleSidebar({ module, items, activeSlug }: Props) {
  // Group by section
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }

  return (
    <nav className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-6rem)] pr-2 pb-8">
        {Object.entries(grouped).map(([section, sectionItems]) => (
          <div key={section} className="mb-5">
            <p
              className="text-xs font-mono font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--primary)' }}
            >
              {section}
            </p>
            <ul className="space-y-0.5">
              {sectionItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${module}/${item.slug}`}
                    className={`brand-sidelink block px-3 py-1.5 rounded text-sm transition-colors truncate ${
                      activeSlug === item.slug ? 'is-active' : ''
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
