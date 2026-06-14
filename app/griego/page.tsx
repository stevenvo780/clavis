import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

const DECKS = 'https://clavis-decks.vercel.app'

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
    >
      <Presentations
        decks={[
          {
            title: 'Platon — Fedon (84c–102a)',
            subtitle: 'Refutacion de Simmias y Cebes y la Teoria de las Formas. Deck con terminos en griego politonico y el argumento final en notacion logica.',
            url: `${DECKS}/platon/`,
          },
        ]}
      />
    </ModuleIndex>
  )
}
