import { getContentByModule, getContentBySlug } from '@/lib/content'
import ArticleView from '@/components/ArticleView'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentByModule('neurofilosofia').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('neurofilosofia', slug)
  if (!item) return { title: 'Paideía · Mouseîon' }
  const canonicalUrl = `https://paideia.stevenvallejo.com/neurofilosofia/${slug}`
  return {
    title: `${item.title} — Neurofilosofía · Mouseîon`,
    description: item.excerpt ? item.excerpt.slice(0, 155) : 'Documento del curso Filosofía de las Neurociencias. Parte de Paideía.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${item.title} · Paideía — Mouseîon`,
      description: item.excerpt ? item.excerpt.slice(0, 155) : 'Neurofilosofía · Paideía',
      url: canonicalUrl,
      siteName: 'Mouseîon',
      locale: 'es_ES',
      images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function NeuroArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('neurofilosofia', slug)
  if (!item) notFound()

  return <ArticleView module="neurofilosofia" item={item} allItems={getContentByModule('neurofilosofia')} />
}
