import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

export const metadata = {
  title: 'Neurofilosofia — portal de humanidades digitales · Mouseîon',
  description: 'Base de conocimiento del curso Filosofia de las Neurociencias: clases, fichas de 25 autores (Chalmers, Friston, Tononi, Damasio), temas transversales, logica formal y ensayos. Parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/neurofilosofia' },
  openGraph: {
    title: 'Neurofilosofia · Paideía — Mouseîon',
    description: 'Knowledge base for Philosophy of Neuroscience: 149+ documents, 25 author profiles, cross-cutting themes, formal logic and essays.',
    url: 'https://paideia.stevenvallejo.com/neurofilosofia',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Neurofilosofia · Paideía — Mouseîon',
    description: 'Base de conocimiento: Filosofia de las Neurociencias. 149+ documentos, 25 autores clave, ensayos y logica formal.',
    images: ['https://paideia.stevenvallejo.com/og-image.png'],
  },
}

export default function NeurofilosofiaPage() {
  const items = getContentByModule('neurofilosofia')
  return (
    <ModuleIndex
      module="neurofilosofia"
      items={items}
      title="Neurofilosofia"
      titleEn="Neurophilosophy"
      description="Base de conocimiento del curso Filosofia de las Neurociencias (Catedra 2026-1). Clases organizadas por sesion, fichas de 25 autores clave (Chalmers, Friston, Tononi, Damasio, Dennett...), temas transversales, glosario unificado y ensayos propios."
      descriptionEn="Knowledge base for the Philosophy of Neuroscience course (2026-1). Session notes, profiles of 25 key authors (Chalmers, Friston, Tononi, Damasio, Dennett...), cross-cutting themes, unified glossary and original essays."
    >
      <Presentations
        embedFirst={false}
        decks={[
          {
            title: 'Presentaciones del modulo',
            subtitle: 'Aun no hay un deck publicado para Neurofilosofia. El guion completo de la presentacion de Hinton esta disponible en la seccion Logica Formal.',
            comingSoon: true,
          },
        ]}
      />
    </ModuleIndex>
  )
}
