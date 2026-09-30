import { Marked, type RendererObject, type Tokens } from 'marked'
import { markdownHeadingId } from '@/lib/modules'

interface Props {
  content: string
  hideTitle?: boolean
  resolveLink?: (href: string) => string | null
}

interface DocumentHeading {
  id: string
  text: string
  depth: number
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]!)
}

function safeHref(href: string) {
  const compact = href.replace(/[\u0000-\u0020]/g, '')
  return !/^[a-z][a-z\d+.-]*:/i.test(compact) || /^(?:https?:|mailto:|tel:)/i.test(compact)
}

/** Parser aislado por documento: no acumula extensiones globales de marked. */
export function renderMarkdown({ content, hideTitle = false, resolveLink = href => href }: Props) {
  const markdown = new Marked({ gfm: true, breaks: false, pedantic: false, async: false })
  const tokens = markdown.lexer(content)
  const headings: DocumentHeading[] = []
  const headingTokens = new Map<Tokens.Heading, DocumentHeading>()
  const usedIds = new Set<string>()
  const aliases = new Map<string, string | null>()
  const plainParser = new markdown.Parser(markdown.defaults)
  const textRenderer = new markdown.TextRenderer()
  textRenderer.html = () => ''
  const plainText = (heading: Tokens.Heading) => plainParser.parseInline(heading.tokens, textRenderer)
  let titleToken: Tokens.Heading | undefined

  markdown.walkTokens(tokens, token => {
    if (token.type !== 'heading') return
    const heading = token as Tokens.Heading
    const text = plainText(heading)
    const baseId = markdownHeadingId(text) || 'seccion'
    let id = baseId
    let index = 1
    while (usedIds.has(id)) id = `${baseId}-${index++}`
    usedIds.add(id)
    const entry = { id, text, depth: Math.max(2, heading.depth) }
    headingTokens.set(heading, entry)
    if (hideTitle && !titleToken && heading.depth === 1) titleToken = heading
    else headings.push(entry)

    // Cross-refs del glosario también usan nombres sin paréntesis y sinónimos.
    const names = [text.split('(')[0], ...text.split(/\s+\/\s+/)]
    for (const name of names) {
      const alias = markdownHeadingId(name)
      if (!alias) continue
      aliases.set(alias, aliases.has(alias) && aliases.get(alias) !== id ? null : id)
    }
  })

  const hrefFor = (href: string) => {
    if (!safeHref(href)) return null
    if (href.startsWith('#')) {
      let fragment: string
      try { fragment = decodeURIComponent(href.slice(1)) } catch { return null }
      const target = usedIds.has(fragment) ? fragment : aliases.get(fragment)
      return target ? `#${encodeURIComponent(target)}` : null
    }
    const resolved = resolveLink(href)
    return resolved && safeHref(resolved) ? resolved : null
  }
  const defaultRenderer = new markdown.Renderer()
  const renderer: RendererObject = {
    html() { return '' },
    heading(token) {
      const heading = headingTokens.get(token)!
      if (token === titleToken) return `<span id="${escapeHtml(heading.id)}" class="article-heading-anchor" aria-hidden="true"></span>\n`
      const text = this.parser.parseInline(token.tokens)
      return `<h${heading.depth} id="${escapeHtml(heading.id)}">${text}</h${heading.depth}>\n`
    },
    link(token) {
      const text = this.parser.parseInline(token.tokens)
      const href = hrefFor(token.href)
      if (!href) return `<span class="article-resource-unavailable">${text}<small> (recurso no publicado)</small></span>`
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : ''
      return `<a href="${escapeHtml(href)}"${title}>${text}</a>`
    },
    image(token) {
      const href = hrefFor(token.href)
      if (!href) return `<span class="article-resource-unavailable">${escapeHtml(token.text)}<small> (imagen no publicada)</small></span>`
      const title = token.title ? ` title="${escapeHtml(token.title)}"` : ''
      return `<img src="${escapeHtml(href)}" alt="${escapeHtml(token.text)}"${title} loading="lazy" decoding="async">`
    },
    table(token) {
      return `<div class="article-table-scroll" role="region" aria-label="Tabla del documento" tabindex="0">${defaultRenderer.table.call(this, token)}</div>\n`
    },
  }
  markdown.use({ renderer })
  return { html: markdown.parser(tokens), headings }
}

// Solo se procesa Markdown estático del repositorio, en el servidor.
export default function MarkdownRenderer(props: Props) {
  const { html, headings } = renderMarkdown(props)
  const sections = headings.filter(heading => heading.depth === 2)

  return (
    <>
      {sections.length >= 3 && (
        <details className="article-toc">
          <summary>En este documento</summary>
          <nav aria-label="Secciones del documento">
            <ol>
              {sections.map(section => (
                <li key={section.id}><a href={`#${section.id}`}>{section.text}</a></li>
              ))}
            </ol>
          </nav>
        </details>
      )}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
