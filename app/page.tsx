import Link from 'next/link'
import { works } from './trabajos/works'
import { getContentByModule } from '@/lib/content'
import { ELEMENTS } from '@/lib/elements'
import DeferredSceneLayer from '@/components/three/DeferredSceneLayer'
import Preloader from '@/components/site/Preloader'
import Hero from '@/components/home/Hero'
import Manifesto from '@/components/home/Manifesto'
import Elements from '@/components/home/Elements'
import PonenciasRail from '@/components/home/PonenciasRail'
import Marquee from '@/components/home/Marquee'
import EssayIndex from '@/components/home/EssayIndex'
import Archive, { type ArchiveModule } from '@/components/home/Archive'
import Outro from '@/components/home/Outro'
import WorkCard from '@/components/visual/WorkCard'
import SolidGlyph from '@/components/visual/SolidGlyph'

const SITE_URL = 'https://paideia.stevenvallejo.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Paideía — Galería de filosofía',
  url: SITE_URL,
  author: { '@type': 'Person', name: 'Steven Vallejo', url: 'https://www.stevenvallejo.com' },
}

export default function Home() {
  const ponencias = works.filter((w) => w.tipo === 'ponencia')
  const escritos = works.filter((w) => w.tipo === 'ensayo' || w.tipo === 'tesis')

  const counts = {
    griego: getContentByModule('griego').length,
    neurofilosofia: getContentByModule('neurofilosofia').length,
    ciudad: getContentByModule('filosofia-ciudad').length,
  }
  const totalDocs = counts.griego + counts.neurofilosofia + counts.ciudad

  const groups = ELEMENTS.map((element) => ({
    element,
    works: works
      .filter((w) => w.elemento === element.key)
      .map(({ id, titulo, tipo, url }) => ({ id, titulo, tipo, url })),
  }))

  const modules: ArchiveModule[] = [
    {
      href: '/griego',
      letra: 'Α',
      titulo: 'Griego clásico',
      en: 'Classical Greek',
      descripcion: 'Conjugación verbal, declinaciones, glosario, ejercicios y traducciones comentadas.',
      secciones: ['Clases', 'Glosario', 'Traducciones', 'Gramáticas'],
      docs: counts.griego,
      color: '#e0a85e',
    },
    {
      href: '/neurofilosofia',
      letra: 'Ψ',
      titulo: 'Neurofilosofía',
      en: 'Neurophilosophy',
      descripcion: 'Clases, fichas de 25 autores, temas transversales, lecturas y ensayos del curso.',
      secciones: ['Clases', 'Autores', 'Temas', 'Lecturas'],
      docs: counts.neurofilosofia,
      color: '#8d7cc0',
    },
    {
      href: '/filosofia-ciudad',
      letra: 'Π',
      titulo: 'Filosofía de la ciudad',
      en: 'Philosophy of the City',
      descripcion: 'Ontología, poder y política de lo urbano: Heidegger, Sassen, Yuk Hui, Calvino.',
      secciones: ['Clases', 'Notas', 'Lecturas', 'Trabajos'],
      docs: counts.ciudad,
      color: '#43b5a6',
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Preloader />
      <DeferredSceneLayer />

      <div className="home">
        <Hero obras={works.length} documentos={totalDocs} />
        <Manifesto
          stats={[
            { value: works.length, label: 'obras' },
            { value: ponencias.length, label: 'ponencias' },
            { value: escritos.length, label: 'ensayos y tesis' },
            { value: ELEMENTS.length, label: 'sólidos' },
          ]}
        />
        <Elements groups={groups} />

        <PonenciasRail count={ponencias.length}>
          {ponencias.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} />
          ))}
          <Link href="/ponencias" className="rail-end" data-cursor="Ver todas">
            <SolidGlyph solid="dodecaedro" size={140} />
            <span className="rail-end-title">Todas las ponencias</span>
            <span className="rail-end-sub">Incluye decks de curso — Yuk Hui, Fedón</span>
            <span className="rail-end-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </PonenciasRail>

        <Marquee />
        <EssayIndex works={escritos} />
        <Archive modules={modules} total={totalDocs} />
        <Outro />
      </div>
    </>
  )
}
