import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

export const metadata = {
  title: 'Filosofia de la Ciudad — Clavis',
  description: 'Archivo academico del curso Filosofia de la ciudad: ontologia, poder y politica.',
}

export default function FilosofiaCiudadPage() {
  const items = getContentByModule('filosofia-ciudad')
  return (
    <ModuleIndex
      module="filosofia-ciudad"
      items={items}
      title="Filosofia de la Ciudad"
      titleEn="Philosophy of the City"
      description="Archivo academico del curso Filosofia de la ciudad: ontologia, poder y politica. Cinco clases con apuntes y recursos, lecturas base de Heidegger, Saskia Sassen, Yuk Hui, Calvino y Berman, mas ponencias y trabajos finales."
      descriptionEn="Academic archive for Philosophy of the City: ontology, power, politics. Five classes with notes and resources, core readings from Heidegger, Saskia Sassen, Yuk Hui, Calvino and Berman, plus papers and final assignments."
    >
      <Presentations
        decks={[
          {
            title: 'Fragmentar el futuro — Sobre el limite de la inteligencia artificial',
            subtitle: '(Yuk Hui, pp. 163–191) · 19 slides · Filosofía de la Ciudad · Unidad Urban AI',
            url: 'https://ponencia-yuk-hui-critertec-a963d21e.vercel.app/',
          },
        ]}
      />
    </ModuleIndex>
  )
}
