import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'

export const metadata = {
  title: 'Neurofilosofia — Clavis',
  description: 'Base de conocimiento del curso Filosofia de las Neurociencias: 210 documentos.',
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
      accentColor="violet"
    />
  )
}
