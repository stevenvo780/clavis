import Link from 'next/link'
import { works, type Work } from './trabajos/works'

const SITE_URL = 'https://paideia.stevenvallejo.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Paideía — Galería de filosofía',
  url: SITE_URL,
  author: { '@type': 'Person', name: 'Steven Vallejo', url: 'https://www.stevenvallejo.com' },
}

// Paleta de marca (Cloud Atlas) rotada por índice para el cover de cada tarjeta.
const PALETTE: [string, string][] = [
  ['#43b5a6', '#2a7a70'],
  ['#e0a85e', '#b8873a'],
  ['#8d7cc0', '#5a4a90'],
  ['#cf6a3c', '#9e3015'],
  ['#6fd3c4', '#2a7a70'],
  ['#b48ec0', '#6f5aa0'],
]

const tipoLabel = (t: Work['tipo']) => (t === 'tesis' ? 'Tesis' : t === 'ponencia' ? 'Ponencia' : 'Ensayo')

function WorkCard({ work, i }: { work: Work; i: number }) {
  const [c1, c2] = PALETTE[i % PALETTE.length]
  const glyph = (work.topics[0]?.[0] ?? '◆').toUpperCase()
  return (
    <a
      href={work.url}
      target="_blank"
      rel="noopener noreferrer"
      className="brand-card group rounded-xl overflow-hidden flex flex-col no-underline hover:no-underline transition-transform hover:-translate-y-0.5"
    >
      {/* Cover visual: gradiente temático + glifo grande + badge de tipo */}
      <div className="relative flex items-end p-4" style={{ height: '7rem', background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }}>
        <span
          className="absolute -top-3 right-2 font-serif font-bold select-none pointer-events-none"
          style={{ fontSize: '7rem', lineHeight: 1, color: 'rgba(255,255,255,0.18)' }}
          aria-hidden="true"
        >
          {glyph}
        </span>
        <span
          className="relative text-xs font-mono font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(11,20,23,0.55)', color: '#fff' }}
        >
          {tipoLabel(work.tipo)}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>{work.titulo}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{work.abstract}</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {work.topics.slice(0, 5).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'var(--surface-2)', color: 'var(--accent-deep)', border: '1px solid var(--border)' }}>{t}</span>
          ))}
        </div>
        <span className="mt-auto pt-2 text-sm font-medium" style={{ color: '#e0a85e' }}>Ver →</span>
      </div>
    </a>
  )
}

export default function Home() {
  const ponencias = works.filter((w) => w.tipo === 'ponencia')
  const escritos = works.filter((w) => w.tipo === 'ensayo' || w.tipo === 'tesis')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero compacto */}
      <section className="pt-16 pb-6 text-center">
        <span className="inline-block mb-4 text-sm font-mono tracking-widest uppercase" style={{ color: 'var(--accent-deep)' }}>
          Filosofía &bull; Philosophy
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight" style={{ color: 'var(--primary)' }}>Paideía</h1>
        <p className="mt-2 text-2xl font-light font-serif italic" style={{ color: 'var(--text-muted)' }}>galería de filosofía</p>
        <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: 'var(--text)' }}>
          Mi trabajo en filosofía: tesis, ensayos y ponencias propios sobre una pluralidad de temas —
          mente y materia, ontología, filosofía de la ciudad, retórica, lógica, sistemas complejos,
          filosofía de la religión y de la técnica.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/buscar" className="btn-ghost inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors">
            Buscar en todo el portal
          </Link>
        </div>
      </section>

      {/* Ponencias */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Ponencias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ponencias.map((w, i) => <WorkCard key={w.id} work={w} i={i} />)}
        </div>
      </section>

      {/* Ensayos y tesis */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Ensayos y tesis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {escritos.map((w, i) => <WorkCard key={w.id} work={w} i={i + 3} />)}
        </div>
      </section>

      {/* Archivo académico — secundario */}
      <div className="border-t my-12" style={{ borderColor: 'var(--border)' }} />
      <section className="pb-16">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          También conservo un <strong style={{ color: 'var(--text)' }}>archivo académico</strong> abierto
          con notas de clase y materiales de curso:{' '}
          <Link href="/griego" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Griego clásico</Link>
          {' · '}
          <Link href="/neurofilosofia" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Neurofilosofía</Link>
          {' · '}
          <Link href="/filosofia-ciudad" className="hover:underline" style={{ color: 'var(--accent-deep)' }}>Filosofía de la ciudad</Link>.
        </p>
      </section>
    </div>
  )
}
