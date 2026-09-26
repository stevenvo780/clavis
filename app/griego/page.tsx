import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

const DECKS = 'https://clavis-decks.vercel.app'

export const metadata = {
  title: 'Griego Clásico — portal de humanidades digitales',
  description: 'Lecciones de conjugación verbal, tablas de declinación, glosario, ejercicios de traducción y traducciones comentadas del curso universitario de griego antiguo. Parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/griego/' },
  openGraph: {
    title: 'Griego Clásico · Paideía — Mouseîon',
    description: 'Classical Greek university course materials: verb conjugation, declension tables, glossary, translation exercises and annotated texts.',
    url: 'https://paideia.stevenvallejo.com/griego',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Griego Clásico · Paideía — Mouseîon',
    description: 'Materiales del curso universitario de griego antiguo: clases, glosario, traducciones y ejercicios.',
    images: ['https://paideia.stevenvallejo.com/og-image.png'],
  },
}

export default function GriegoPage() {
  const items = getContentByModule('griego')
  return (
    <ModuleIndex
      module="griego"
      items={items}
      title="Griego Clásico"
      titleEn="Classical Greek"
      description="Materiales del curso universitario de griego antiguo: clases de conjugación verbal y declinaciones, glosario, ejercicios de traducción, gramáticas de referencia y análisis morfológico."
      descriptionEn="University Ancient Greek course materials: verb conjugation and declension classes, glossary, translation exercises, reference grammars and morphological analysis."
    >
      <Presentations
        decks={[
          {
            title: 'Platon — Fedon (84c–102a)',
            subtitle: 'Refutación de Simmias y Cebes y la Teoría de las Formas. Deck con términos en griego politónico y el argumento final en notación lógica.',
            url: `${DECKS}/platon/`,
          },
        ]}
      />
    </ModuleIndex>
  )
}
