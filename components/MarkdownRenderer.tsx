'use client'

import { marked, type Tokens } from 'marked'
import { useMemo } from 'react'

interface Props {
  content: string
}

// marked renders our own static markdown files (no user input).
// Content is authored by the repo owner; no external/user-supplied strings
// ever reach this component. Disabled HTML parsing in marked to prevent any
// XSS risks from malformed markdown containing <script>, <img onclick>, etc.
export default function MarkdownRenderer({ content }: Props) {
  const html = useMemo(() => {
    // Configure marked: GFM enabled, HTML disabled, line breaks disabled
    marked.setOptions({ gfm: true, breaks: false, pedantic: false, async: false })
    // Create a custom renderer to strip raw HTML tags from markdown
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderer: any = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      html(_token: Tokens.HTML | Tokens.Tag) {
        return '' // Drop raw HTML from markdown
      }
    }
    marked.use({ renderer })
    return marked.parse(content) as string
  }, [content])

  return (
    <div
      className="prose max-w-none"
      // Safe: content is static, author-controlled markdown from local files.
      // No user input, no external URLs rendered as HTML.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
