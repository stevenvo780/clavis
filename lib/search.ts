const MARKS = /\p{M}/gu

function foldCharacter(character: string) {
  return character.normalize('NFD').replace(MARKS, '').toLowerCase()
}

/** La misma normalización para consultas, índice y resaltados, sin truncar Unicode. */
export function foldSearchText(text: string) {
  let folded = ''
  for (const character of text) folded += foldCharacter(character)
  return folded
}

interface SourceRange {
  start: number
  end: number
}

export interface SearchPart {
  text: string
  matched: boolean
}

/** Devuelve fragmentos del original; sus índices UTF-16 no son los del texto plegado. */
export function getSearchParts(text: string, query: string): SearchPart[] {
  const q = foldSearchText(query)
  if (!q) return [{ text, matched: false }]

  let folded = ''
  let offset = 0
  const source: SourceRange[] = []
  for (const character of text) {
    const start = offset
    offset += character.length
    const base = foldCharacter(character)
    if (base) {
      const range = { start, end: offset }
      // Una letra puede producir varios índices (descomposición o par sustituto).
      for (let i = 0; i < base.length; i++) source.push(range)
      folded += base
    } else if (source.length) {
      // Incluye los diacríticos originales en el resaltado de su letra precedente.
      source[source.length - 1].end = offset
    }
  }

  const matches: SourceRange[] = []
  for (let at = folded.indexOf(q); at !== -1; at = folded.indexOf(q, at + q.length)) {
    const start = source[at].start
    const end = source[at + q.length - 1].end
    const previous = matches[matches.length - 1]
    // Dos coincidencias plegadas pueden pertenecer a la misma letra original.
    if (previous && start < previous.end) previous.end = Math.max(previous.end, end)
    else matches.push({ start, end })
  }

  const parts: SearchPart[] = []
  let from = 0
  for (const { start, end } of matches) {
    if (start > from) parts.push({ text: text.slice(from, start), matched: false })
    parts.push({ text: text.slice(start, end), matched: true })
    from = end
  }
  if (from < text.length) parts.push({ text: text.slice(from), matched: false })
  return parts
}
