import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'

export const metadata = {
  title: 'Griego Clasico — Clavis',
  description: 'Lecciones, glosario y traducciones del curso universitario de griego antiguo.',
}

export default function GriegoPage() {
  const items = getContentByModule('griego')
  return (
    <ModuleIndex
      module="griego"
      items={items}
      title="Griego Clasico"
      titleEn="Classical Greek"
      description="Materiales del curso universitario de griego antiguo: clases de conjugacion verbal y declinaciones, glosario, ejercicios de traduccion, gramaticas de referencia y analisis morfologico."
      descriptionEn="University Ancient Greek course materials: verb conjugation and declension classes, glossary, translation exercises, reference grammars and morphological analysis."
      accentColor="amber"
    />
  )
}
