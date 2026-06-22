import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

export const metadata = {
  title: 'Neurofilosofía — portal de humanidades digitales · Mouseîon',
  description: 'Base de conocimiento del curso Filosofía de las Neurociencias: clases, fichas de 25 autores (Chalmers, Friston, Tononi, Damasio), temas transversales, lógica formal y ensayos. Parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/neurofilosofia' },
  openGraph: {
    title: 'Neurofilosofía · Paideía — Mouseîon',
    description: 'Knowledge base for Philosophy of Neuroscience: 149+ documents, 25 author profiles, cross-cutting themes, formal logic and essays.',
    url: 'https://paideia.stevenvallejo.com/neurofilosofia',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Neurofilosofía · Paideía — Mouseîon',
    description: 'Base de conocimiento: Filosofía de las Neurociencias. 149+ documentos, 25 autores clave, ensayos y lógica formal.',
    images: ['https://paideia.stevenvallejo.com/og-image.png'],
  },
}

export default function NeurofilosofiaPage() {
  const items = getContentByModule('neurofilosofia')
  return (
    <ModuleIndex
      module="neurofilosofia"
      items={items}
      title="Neurofilosofía"
      titleEn="Neurophilosophy"
      description="Base de conocimiento del curso Filosofía de las Neurociencias (Cátedra 2026-1). Clases organizadas por sesión, fichas de 25 autores clave (Chalmers, Friston, Tononi, Damasio, Dennett...), temas transversales, glosario unificado y ensayos propios."
      descriptionEn="Knowledge base for the Philosophy of Neuroscience course (2026-1). Session notes, profiles of 25 key authors (Chalmers, Friston, Tononi, Damasio, Dennett...), cross-cutting themes, unified glossary and original essays."
    >
      <Presentations
        embedFirst={false}
        decks={[
          {
            title: 'Presentaciones del modulo',
            subtitle: 'Aún no hay un deck publicado para Neurofilosofía. El guión completo de la presentación de Hinton está disponible en la sección Lógica Formal.',
            comingSoon: true,
          },
        ]}
      />
    </ModuleIndex>
  )
}
