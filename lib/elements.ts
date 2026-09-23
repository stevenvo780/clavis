import type { SolidKey } from './solids'

/**
 * Los cinco elementos del Timeo (53c–56c) como índice temático de la galería:
 * a cada sólido platónico le corresponde un campo de trabajo.
 */
export type ElementKey = 'fuego' | 'aire' | 'agua' | 'tierra' | 'cosmos'

export interface ElementInfo {
  key: ElementKey
  /** Nombre griego (politónico). */
  griego: string
  translit: string
  nombre: string
  solido: SolidKey
  solidoNombre: string
  tema: string
  lema: string
  /** Colores del elemento: [principal, secundario, brillo]. Se usan en CSS y en la escena WebGL. */
  colores: [string, string, string]
}

export const ELEMENTS: ElementInfo[] = [
  {
    key: 'fuego',
    griego: 'πῦρ',
    translit: 'pŷr',
    nombre: 'Fuego',
    solido: 'tetraedro',
    solidoNombre: 'Tetraedro',
    tema: 'Mente y materia',
    lema: 'El sólido más agudo, el que corta. ¿Qué sustrato puede arder con conciencia: el carbono, el silicio, la red?',
    colores: ['#e0763c', '#c0522a', '#ffb070'],
  },
  {
    key: 'aire',
    griego: 'ἀήρ',
    translit: 'aḗr',
    nombre: 'Aire',
    solido: 'octaedro',
    solidoNombre: 'Octaedro',
    tema: 'Palabra y lenguaje',
    lema: 'El aliento que se vuelve argumento: la retórica como técnica y el lenguaje como anclaje del conocimiento.',
    colores: ['#8ccfe0', '#5b8fb8', '#e8f4f0'],
  },
  {
    key: 'agua',
    griego: 'ὕδωρ',
    translit: 'hýdōr',
    nombre: 'Agua',
    solido: 'icosaedro',
    solidoNombre: 'Icosaedro',
    tema: 'Ciudad y experiencia',
    lema: 'Lo que fluye y toma la forma de su cauce: cuerpos, calles y memoria colectiva en Medellín.',
    colores: ['#43b5a6', '#2a6f8a', '#8ff0e0'],
  },
  {
    key: 'tierra',
    griego: 'γῆ',
    translit: 'gê',
    nombre: 'Tierra',
    solido: 'hexaedro',
    solidoNombre: 'Cubo',
    tema: 'Fundamentos y ontología',
    lema: 'Lo más estable, lo que sostiene: las Formas del Fedón y las estructuras previas a todo objeto.',
    colores: ['#e0a85e', '#9a6a2a', '#ffd9a0'],
  },
  {
    key: 'cosmos',
    griego: 'κόσμος',
    translit: 'kósmos',
    nombre: 'Cosmos',
    solido: 'dodecaedro',
    solidoNombre: 'Dodecaedro',
    tema: 'Sistemas y lo divino',
    lema: 'La quinta figura, que el demiurgo usó «para el todo»: religión, técnica y sistemas complejos.',
    colores: ['#8d7cc0', '#4a3f86', '#d7c8ff'],
  },
]

export const ELEMENT_BY_KEY = Object.fromEntries(ELEMENTS.map((e) => [e.key, e])) as Record<ElementKey, ElementInfo>

export const ELEMENT_INDEX = Object.fromEntries(ELEMENTS.map((e, i) => [e.key, i])) as Record<ElementKey, number>
