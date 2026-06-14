import { getContentByModule, getContentBySlug } from '@/lib/content'
import ModuleSidebar from '@/components/ModuleSidebar'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentByModule('neurofilosofia').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('neurofilosofia', slug)
  return { title: item ? `${item.title} — Neurofilosofia — Clavis` : 'Clavis' }
}

export default async function NeuroArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('neurofilosofia', slug)
  if (!item) notFound()

  const allItems = getContentByModule('neurofilosofia')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-10">
      <ModuleSidebar module="neurofilosofia" items={allItems} activeSlug={slug} />
      <article className="flex-1 min-w-0">
        <div className="mb-6">
          <Link href="/neurofilosofia" className="text-sm hover:underline" style={{ color: 'var(--link)' }}>
            &larr; Neurofilosofia
          </Link>
          <span className="mx-2" style={{ color: 'var(--text-muted)' }}>/</span>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.section}</span>
        </div>
        <h1 className="text-3xl font-bold font-serif mb-8" style={{ color: 'var(--text)' }}>{item.title}</h1>
        <MarkdownRenderer content={item.content} />
        <div className="mt-12 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <Link href="/neurofilosofia" className="text-sm hover:underline" style={{ color: 'var(--link)' }}>
            &larr; Volver al modulo
          </Link>
        </div>
      </article>
    </div>
  )
}
