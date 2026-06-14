import Link from 'next/link'

const modules = [
  {
    href: '/griego',
    accent: 'amber',
    symbol: 'α',
    label: 'Griego Clasico',
    labelEn: 'Classical Greek',
    description:
      'Lecciones de conjugacion verbal, tablas de declinacion, glosario, ejercicios de traduccion, gramaticas de referencia y traducciones comentadas del curso universitario de griego antiguo.',
    descriptionEn:
      'Verb conjugation lessons, declension tables, glossary, translation exercises, reference grammars and annotated translations from the university Ancient Greek course.',
    count: '15',
    countLabel: 'documentos',
    border: 'border-amber-200 hover:border-amber-400',
    bg: 'bg-amber-50 hover:bg-amber-100/60',
    badge: 'bg-amber-100 text-amber-800',
    pill: 'text-amber-700',
  },
  {
    href: '/neurofilosofia',
    accent: 'violet',
    symbol: '⬡',
    label: 'Neurofilosofia',
    labelEn: 'Neurophilosophy',
    description:
      'Base de conocimiento del curso Filosofia de las Neurociencias: clases con notas detalladas, fichas de 25 autores, temas transversales, lecturas, logica formal y ensayos.',
    descriptionEn:
      'Knowledge base for Philosophy of Neuroscience: lectures with detailed class notes, profiles of 25 key authors, cross-cutting themes, readings, formal logic and essays.',
    count: '149',
    countLabel: 'documentos',
    border: 'border-violet-200 hover:border-violet-400',
    bg: 'bg-violet-50 hover:bg-violet-100/60',
    badge: 'bg-violet-100 text-violet-800',
    pill: 'text-violet-700',
  },
  {
    href: '/filosofia-ciudad',
    accent: 'teal',
    symbol: '◈',
    label: 'Filosofia de la Ciudad',
    labelEn: 'Philosophy of the City',
    description:
      'Archivo academico del curso Filosofia de la ciudad: ontologia, poder y politica. Clases con notas detalladas, lecturas (Heidegger, Sassen, Yuk Hui, Calvino, Berman) y ponencias.',
    descriptionEn:
      'Academic archive for Philosophy of the City: ontology, power, politics. Lectures with detailed notes, core readings (Heidegger, Sassen, Yuk Hui, Calvino, Berman) and papers.',
    count: '62',
    countLabel: 'documentos',
    border: 'border-teal-200 hover:border-teal-400',
    bg: 'bg-teal-50 hover:bg-teal-100/60',
    badge: 'bg-teal-100 text-teal-800',
    pill: 'text-teal-700',
  },
]

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="py-20 text-center">
        <span className="inline-block mb-4 text-sm font-mono tracking-widest text-indigo-500 uppercase">
          Humanidades Digitales &bull; Digital Humanities
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
          Clavis
        </h1>
        <p className="mt-2 text-2xl text-gray-400 font-light font-serif italic">
          Portal academico de textos y conocimiento clasico
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Tres modulos de trabajo universitario en un solo portal de consulta.
          Griego clasico, filosofia de las neurociencias y filosofia de la ciudad
          &mdash; todos navegables, buscables y sin registro.
        </p>
        <p className="mt-2 max-w-2xl mx-auto text-base text-gray-400 italic">
          Three university knowledge modules in one open portal.
          Classical Greek, neurophilosophy, and philosophy of the city &mdash;
          browsable, searchable, no login required.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/buscar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-colors"
          >
            Buscar en todo el portal
          </Link>
          <Link
            href="#modulos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
          >
            Explorar modulos
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section id="modulos" className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link
              key={mod.href}
              href={mod.href}
              className={`group rounded-2xl border-2 p-6 transition-all duration-200 ${mod.border} ${mod.bg} flex flex-col gap-4`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-5xl font-serif font-bold ${mod.pill} opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {mod.symbol}
                </span>
                <span className={`text-xs font-mono px-2 py-1 rounded-full ${mod.badge}`}>
                  {mod.count} {mod.countLabel}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{mod.label}</h2>
                <p className="text-xs text-gray-400 mt-0.5 italic">{mod.labelEn}</p>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{mod.description}</p>
              <p className="text-xs text-gray-400 italic leading-relaxed">{mod.descriptionEn}</p>
              <span className={`text-sm font-medium ${mod.pill} mt-auto`}>
                Explorar &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-gray-100 my-16" />

      {/* About */}
      <section className="pb-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sobre Clavis</h2>
        <p className="text-gray-600 leading-relaxed">
          Clavis consolida materiales academicos universitarios en un portal de consulta abierta.
          Los contenidos provienen de cuatro repositorios de trabajo real:
          <strong> helenikos</strong>, <strong>GriegoFinal</strong>, <strong>neurofilosofia</strong>{' '}
          y <strong>FilosofiaCiudad</strong>. El objetivo es que el conocimiento academico
          producido en el aula no quede atrapado en archivos locales, sino que pueda
          consultarse, compartirse y crecer.
        </p>
        <p className="mt-4 text-gray-400 italic text-sm">
          Clavis consolidates real university course materials into an open reference portal.
          Content comes from four working repositories. The goal: keep academic knowledge
          out of local files and make it browsable, shareable, and alive.
        </p>
      </section>
    </div>
  )
}
