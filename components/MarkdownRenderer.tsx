'use client'

import { marked } from 'marked'
import { useMemo } from 'react'

interface Props {
  content: string
}

// marked renders our own static markdown files (no user input).
// Content is authored by the repo owner; no external/user-supplied strings
// ever reach this component, so dangerouslySetInnerHTML is safe here.
export default function MarkdownRenderer({ content }: Props) {
  const html = useMemo(() => {
    // Configure marked with safe defaults
    marked.setOptions({ gfm: true, breaks: false })
    return marked.parse(content) as string
  }, [content])

  return (
    <div
      className="prose max-w-none text-gray-800"
      // Safe: content is static, author-controlled markdown from local files.
      // No user input, no external URLs rendered as HTML.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
