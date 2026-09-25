import { getContentByModule, getContentBySlug } from '@/lib/content'
import ArticleView from '@/components/ArticleView'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return getContentByModule('filosofia-ciudad').map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('filosofia-ciudad', slug)
  if (!item) return { title: 'Paideía · Mouseîon' }
  const canonicalUrl = `https://paideia.stevenvallejo.com/filosofia-ciudad/${slug}/`
  return {
    title: `${item.title} — Filosofía de la Ciudad · Mouseîon`,
    description: item.excerpt ? item.excerpt.slice(0, 155) : 'Documento del curso Filosofía de la Ciudad: ontología, poder y política. Parte de Paideía.',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${item.title} · Paideía — Mouseîon`,
      description: item.excerpt ? item.excerpt.slice(0, 155) : 'Filosofía de la Ciudad · Paideía',
      url: canonicalUrl,
      siteName: 'Mouseîon',
      locale: 'es_ES',
      images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
    },
  }
}

export default async function CiudadArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = getContentBySlug('filosofia-ciudad', slug)
  if (!item) notFound()

  return <ArticleView module="filosofia-ciudad" item={item} allItems={getContentByModule('filosofia-ciudad')} />
}
