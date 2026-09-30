'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Observa todo elemento con `data-reveal` y le pone `data-in` al entrar en pantalla.
 * Arma los estados iniciales solo cuando el observador está preparado. El primer
 * viewport conserva el HTML legible; el resto se anima al entrar en pantalla.
 */
export default function RevealManager() {
  const pathname = usePathname()

  useEffect(() => {
    const html = document.documentElement
    const reveal = (el: HTMLElement) => el.setAttribute('data-in', '')
    if (typeof IntersectionObserver === 'undefined') {
      html.classList.remove('reveal-ready')
      return
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Un elemento recortado por completo con clip-path nunca "intersecta": para esos se
    // observa el padre y se revela el hijo.
    const targets = new Map<Element, HTMLElement[]>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          targets.get(entry.target)?.forEach(reveal)
          targets.delete(entry.target)
          io.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const watch = (el: HTMLElement) => {
      const target = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el
      const rect = target.getBoundingClientRect()
      // No ocultar texto ya pintado ni la vista que acaba de insertar el router.
      if (motion.matches || (rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth)) {
        reveal(el)
        return
      }
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
    html.classList.add('reveal-ready')

    // Un enlace alcanzado con Tab debe seguir siendo visible aunque todavía esté
    // fuera del margen del IntersectionObserver.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return
      let el = event.target.closest<HTMLElement>('[data-reveal]')
      while (el) {
        reveal(el)
        el = el.parentElement?.closest<HTMLElement>('[data-reveal]') ?? null
      }
    }
    document.addEventListener('focusin', onFocus)

    const onMotionChange = () => {
      if (motion.matches) document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(reveal)
    }
    motion.addEventListener('change', onMotionChange)

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal]:not([data-in])')) watch(n)
            scan(n)
          }
        })
        if ([...r.removedNodes].some((node) => node instanceof HTMLElement)) {
          for (const [target, elements] of targets) {
            const connected = elements.filter((el) => el.isConnected)
            if (target.isConnected && connected.length) targets.set(target, connected)
            else {
              io.unobserve(target)
              targets.delete(target)
            }
          }
        }
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('focusin', onFocus)
      motion.removeEventListener('change', onMotionChange)
      html.classList.remove('reveal-ready')
    }
  }, [pathname])

  return null
}
