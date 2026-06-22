import { getContentByModule } from '@/lib/content'
import ModuleIndex from '@/components/ModuleIndex'
import Presentations from '@/components/Presentations'

export const metadata = {
  title: 'Filosofía de la Ciudad — portal de humanidades digitales · Mouseîon',
  description: 'Archivo académico del curso Filosofía de la ciudad: ontología, poder y política. Clases, lecturas de Heidegger, Sassen, Yuk Hui, Calvino y Berman, ponencias y trabajos finales. Parte de Paideía.',
  alternates: { canonical: 'https://paideia.stevenvallejo.com/filosofia-ciudad' },
  openGraph: {
    title: 'Filosofía de la Ciudad · Paideía — Mouseîon',
    description: 'Academic archive: Philosophy of the City — ontology, power, politics. Heidegger, Sassen, Yuk Hui, Calvino, Berman. 62+ documents.',
    url: 'https://paideia.stevenvallejo.com/filosofia-ciudad',
    siteName: 'Mouseîon',
    locale: 'es_ES',
    images: [{ url: 'https://paideia.stevenvallejo.com/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Filosofía de la Ciudad · Paideía — Mouseîon',
    description: 'Archivo académico: ontología, poder y política urbana. 62+ documentos con Heidegger, Sassen, Yuk Hui.',
    images: ['https://paideia.stevenvallejo.com/og-image.png'],
  },
}

export default function FilosofiaCiudadPage() {
  const items = getContentByModule('filosofia-ciudad')
  return (
    <ModuleIndex
      module="filosofia-ciudad"
      items={items}
      title="Filosofía de la Ciudad"
      titleEn="Philosophy of the City"
      description="Archivo académico del curso Filosofía de la ciudad: ontología, poder y política. Cinco clases con apuntes y recursos, lecturas base de Heidegger, Saskia Sassen, Yuk Hui, Calvino y Berman, más ponencias y trabajos finales."
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
