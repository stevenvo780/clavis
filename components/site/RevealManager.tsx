'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Observa todo elemento con `data-reveal` y le pone `data-in` al entrar en pantalla.
 * Los estados iniciales viven en CSS bajo `html.js`, así que sin JS todo queda visible.
 * Así los componentes de servidor pueden animarse sin volverse componentes de cliente.
 */
export default function RevealManager() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add('hydrated')
  }, [])

  useEffect(() => {
    // Un elemento recortado por completo con clip-path nunca "intersecta": para esos se
    // observa el padre y se revela el hijo.
    const targets = new Map<Element, HTMLElement[]>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          targets.get(entry.target)?.forEach((el) => el.setAttribute('data-in', ''))
          targets.delete(entry.target)
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const watch = (el: HTMLElement) => {
      const target = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el
      const list = targets.get(target)
      if (list) {
        if (!list.includes(el)) list.push(el)
        return
      }
      targets.set(target, [el])
      io.observe(target)
    }

    const scan = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])').forEach(watch)
    }
    scan(document)

    const mo = new MutationObserver((records) => {
      for (const r of records)
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal]:not([data-in])')) watch(n)
            scan(n)
          }
        })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
