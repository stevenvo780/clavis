import { getContentByModule, getContentBySlug } from '@/lib/content'
import ArticleView from '@/components/ArticleView'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentByModule('griego').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('griego', slug)
  if (!item) return { title: 'Paideía · Mouseîon' }
  const canonicalUrl = `https://paideia.stevenvallejo.com/griego/${slug}/`
  return {
    title: `${item.title} — Griego Clásico · Mouseîon`,
    description: item.excerpt ? item.excerpt.slice(0, 155) : 'Documento del curso universitario de Griego Clásico. Parte de Paideía.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${item.title} · Paideía — Mouseîon`,
      description: item.excerpt ? item.excerpt.slice(0, 155) : 'Griego Clásico · Paideía',
      url: canonicalUrl,
      siteName: 'Mouseîon',
      locale: 'es_ES',
      images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function GriegoArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('griego', slug)
  if (!item) notFound()

  return <ArticleView module="griego" item={item} allItems={getContentByModule('griego')} />
}
