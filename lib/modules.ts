import type { SolidKey } from './solids'

export type ModuleKey = 'griego' | 'neurofilosofia' | 'filosofia-ciudad'

/** Identidad visual de cada módulo del archivo (sin dependencias de servidor). */
export const MODULE_VISUAL: Record<ModuleKey, { label: string; solid: SolidKey; color: string; letra: string }> = {
  griego: { label: 'Griego Clásico', solid: 'octaedro', color: '#e0a85e', letra: 'Α' },
  neurofilosofia: { label: 'Neurofilosofía', solid: 'tetraedro', color: '#8d7cc0', letra: 'Ψ' },
  'filosofia-ciudad': { label: 'Filosofía de la Ciudad', solid: 'icosaedro', color: '#43b5a6', letra: 'Π' },
}

export function anchorId(text: string) {
  return (
    'sec-' +
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
}
