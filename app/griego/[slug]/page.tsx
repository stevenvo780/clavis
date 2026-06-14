import { getContentByModule, getContentBySlug } from '@/lib/content'
import ModuleSidebar from '@/components/ModuleSidebar'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentByModule('griego').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('griego', slug)
  return { title: item ? `${item.title} — Griego Clasico — Clavis` : 'Clavis' }
}

export default async function GriegoArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('griego', slug)
  if (!item) notFound()

  const allItems = getContentByModule('griego')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex gap-10">
      <ModuleSidebar module="griego" items={allItems} activeSlug={slug} accentColor="amber" />
      <article className="flex-1 min-w-0">
        <div className="mb-6">
          <Link href="/griego" className="text-sm text-amber-700 hover:underline">
            &larr; Griego Clasico
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-sm text-gray-400">{item.section}</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">{item.title}</h1>
        <MarkdownRenderer content={item.content} />
        <div className="mt-12 pt-6 border-t border-gray-100">
          <Link href="/griego" className="text-sm text-amber-700 hover:underline">
            &larr; Volver al modulo
          </Link>
        </div>
      </article>
    </div>
  )
}
