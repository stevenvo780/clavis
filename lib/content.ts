import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Module = 'griego' | 'neurofilosofia' | 'filosofia-ciudad'

export interface ContentItem {
  slug: string
  title: string
  section: string
  module: Module
  excerpt: string
  content: string
  filePath: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) return match[1].trim()
  // fallback: humanize filename
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/^\d+\s*/, '')
    .trim()
}

function extractExcerpt(content: string): string {
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('```'))
  return lines.slice(0, 3).join(' ').slice(0, 200).trim()
}

function readMdFiles(dir: string, module: Module, section: string): ContentItem[] {
  if (!fs.existsSync(dir)) return []
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('00_indice'))
  return files.map(file => {
    const filePath = path.join(dir, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { content } = matter(raw)
    const title = extractTitle(content, file)
    return {
      slug: slugify(file.replace(/\.md$/, '')),
      title,
      section,
      module,
      excerpt: extractExcerpt(content),
      content,
      filePath,
    }
  })
}

export function getAllContent(): ContentItem[] {
  const items: ContentItem[] = [
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego/clases'), 'griego', 'Clases'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego/glosario'), 'griego', 'Glosario'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego/traducciones'), 'griego', 'Traducciones'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego/ejercicios'), 'griego', 'Ejercicios'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego/gramaticas'), 'griego', 'Gramaticas'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'griego'), 'griego', 'Recursos'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/clases'), 'neurofilosofia', 'Clases'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/clases-detalle'), 'neurofilosofia', 'Notas de clase'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/autores'), 'neurofilosofia', 'Autores'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/temas'), 'neurofilosofia', 'Temas'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/lecturas'), 'neurofilosofia', 'Lecturas'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/referencia'), 'neurofilosofia', 'Referencia'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/ensayos'), 'neurofilosofia', 'Ensayos'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'neurofilosofia/logica'), 'neurofilosofia', 'Logica Formal'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'filosofia-ciudad/clases'), 'filosofia-ciudad', 'Clases'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'filosofia-ciudad/notas-clase'), 'filosofia-ciudad', 'Notas de clase'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'filosofia-ciudad/lecturas'), 'filosofia-ciudad', 'Lecturas'),
    ...readMdFiles(path.join(CONTENT_ROOT, 'filosofia-ciudad/trabajos'), 'filosofia-ciudad', 'Trabajos'),
  ]
  // Deduplicate by slug+module
  const seen = new Set<string>()
  return items.filter(item => {
    const key = `${item.module}:${item.slug}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function getContentByModule(module: Module): ContentItem[] {
  return getAllContent().filter(item => item.module === module)
}

export function getContentBySlug(module: Module, slug: string): ContentItem | undefined {
  return getContentByModule(module).find(item => item.slug === slug)
}

export function searchContent(query: string): ContentItem[] {
  const q = query.toLowerCase()
  return getAllContent().filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.excerpt.toLowerCase().includes(q) ||
    item.content.toLowerCase().includes(q)
  )
}

export const MODULE_META = {
  griego: {
    label: 'Griego Clasico',
    labelEn: 'Classical Greek',
    description: 'Lecciones, glosario, ejercicios, gramaticas de referencia y traducciones del curso de griego clasico. Analisis morfologico y textos comentados.',
    descriptionEn: 'Lessons, glossary, exercises, reference grammars and translations from the Classical Greek course. Morphological analysis and annotated texts.',
    color: 'amber',
    icon: 'Alpha',
    sections: ['Clases', 'Glosario', 'Traducciones', 'Ejercicios', 'Gramaticas', 'Recursos'],
  },
  neurofilosofia: {
    label: 'Neurofilosofia',
    labelEn: 'Neurophilosophy',
    description: 'Base de conocimiento del curso Filosofia de las Neurociencias. 210 documentos: clases, notas de clase, autores, temas transversales, lecturas, logica formal y ensayos.',
    descriptionEn: 'Knowledge base for the Philosophy of Neuroscience course. 210 documents: lectures, class notes, authors, cross-cutting themes, readings, formal logic and essays.',
    color: 'violet',
    icon: 'Brain',
    sections: ['Clases', 'Notas de clase', 'Autores', 'Temas', 'Lecturas', 'Referencia', 'Ensayos', 'Logica Formal'],
  },
  'filosofia-ciudad': {
    label: 'Filosofia de la Ciudad',
    labelEn: 'Philosophy of the City',
    description: 'Archivo academico del curso Filosofia de la ciudad: ontologia, poder y politica. Clases, notas de clase, lecturas base (Heidegger, Sassen, Yuk Hui, Calvino) y trabajos.',
    descriptionEn: 'Academic archive for Philosophy of the City: ontology, power, politics. Lectures, class notes, core readings (Heidegger, Sassen, Yuk Hui, Calvino) and papers.',
    color: 'teal',
    icon: 'Building2',
    sections: ['Clases', 'Notas de clase', 'Lecturas', 'Trabajos'],
  },
} as const
