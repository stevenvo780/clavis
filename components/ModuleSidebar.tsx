'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ContentItem, Module } from '@/lib/content'

interface Props {
  module: Module
  items: ContentItem[]
  activeSlug?: string
  /** Kept for API compatibility; color now comes from the brand palette. */
  accentColor?: string
}

export default function ModuleSidebar({ module, items, activeSlug }: Props) {
  const scroller = useRef<HTMLDivElement>(null)

  // Lleva el documento activo a la vista dentro de la barra (sin mover la página).
  useEffect(() => {
    const box = scroller.current
    const active = box?.querySelector<HTMLElement>('[aria-current="page"]')
    if (box && active) box.scrollTop = active.offsetTop - box.clientHeight / 3
  }, [activeSlug])

  // Group by section
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }

  return (
    <nav className="sidebar" aria-label="Documentos del módulo">
      <div ref={scroller} className="sidebar-inner" data-lenis-prevent>
        {Object.entries(grouped).map(([section, sectionItems]) => (
          <div key={section} className="sidebar-group">
            <p className="sidebar-heading">{section}</p>
            <ul>
              {sectionItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/${module}/${item.slug}`}
                    className={`sidebar-link${activeSlug === item.slug ? ' is-active' : ''}`}
                    aria-current={activeSlug === item.slug ? 'page' : undefined}
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
