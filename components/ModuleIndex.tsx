import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ContentItem, Module } from '@/lib/content'
import { MODULE_VISUAL, anchorId } from '@/lib/modules'
import { SOLID_FACTS } from '@/lib/solids'
import PageHero from '@/components/visual/PageHero'

interface Props {
  module: Module
  items: ContentItem[]
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  /** Kept for API compatibility; color now comes from the module's visual identity. */
  accentColor?: string
  /** Optional extra section rendered above the document grid (e.g. Presentaciones). */
  children?: React.ReactNode
}

export default function ModuleIndex({ module, items, title, titleEn, description, descriptionEn, children }: Props) {
  const visual = MODULE_VISUAL[module]
  const grouped: Record<string, ContentItem[]> = {}
  for (const item of items) {
    if (!grouped[item.section]) grouped[item.section] = []
    grouped[item.section].push(item)
  }
  const sections = Object.entries(grouped)
  const facts = SOLID_FACTS[visual.solid]

  return (
    <div className="page" style={{ '--c': visual.color } as CSSProperties}>
      <div className="container-wide">
        <PageHero
          eyebrow="Archivo académico"
          eyebrowNum={visual.letra}
          title={title}
          titleEn={titleEn}
          description={description}
          descriptionEn={descriptionEn}
          solid={visual.solid}
          color={visual.color}
          visualLabel={`${visual.solid} · ${facts.caras} caras`}
          stats={[
            { value: items.length, label: 'documentos' },
            { value: sections.length, label: 'secciones' },
          ]}
        />

        <nav className="chips" aria-label="Secciones del módulo" data-reveal="up">
          {sections.map(([section, sectionItems]) => (
            <a key={section} href={`#${anchorId(section)}`} className="chip">
              {section}
              <span>{sectionItems.length}</span>
            </a>
          ))}
        </nav>

        {children}

        {sections.map(([section, sectionItems]) => (
          <section key={section} id={anchorId(section)} className="doc-section" aria-labelledby={`${anchorId(section)}-t`}>
            <h2 id={`${anchorId(section)}-t`} className="doc-section-title" data-reveal="up">
              <span>{section}</span>
              <span className="doc-section-count">{String(sectionItems.length).padStart(2, '0')}</span>
            </h2>
            <div className="doc-grid">
              {sectionItems.map((item, i) => (
                <Link
                  key={item.slug}
                  href={`/${module}/${item.slug}`}
                  className="doc-card"
                  data-reveal="up"
                  data-tilt
                  data-tilt-amount="0.3"
                  style={{ '--d': `${(i % 3) * 70}ms` } as CSSProperties}
                >
                  <span className="doc-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="doc-card-title">{item.title}</h3>
                  {item.excerpt && <p className="doc-card-excerpt">{item.excerpt}</p>}
                  <span className="doc-card-arrow" aria-hidden="true">
                    →
                  </span>
                  <span className="work-card-shine" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
