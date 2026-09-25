'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import SolidGlyph from '@/components/visual/SolidGlyph'

const NAV = [
  { href: '/#obras', label: 'Obras', greek: 'ἔργα' },
  { href: '/#elementos', label: 'Elementos', greek: 'στοιχεῖα' },
  { href: '/ponencias', label: 'Ponencias', greek: 'λόγοι' },
  { href: '/#archivo', label: 'Archivo', greek: 'ἀρχεῖον' },
  { href: '/buscar', label: 'Buscar', greek: 'ζήτησις' },
]

/**
 * Thin client island: scroll attrs on the server-rendered header + mobile menu.
 * Brand / desktop nav paint with zero client JS (see SiteHeader server shell).
 */
export default function SiteHeaderMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      header.dataset.scrolled = y > 24 ? 'true' : 'false'
      if (!open && y > 240 && y > last + 6) header.dataset.hidden = 'true'
      else if (y < last - 6 || y < 240 || open) header.dataset.hidden = 'false'
      last = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (header) header.dataset.open = open ? 'true' : 'false'

    let cancelled = false
    if (!open) {
      document.documentElement.classList.remove('menu-open')
      void import('./SmoothScroll').then((m) => {
        if (!cancelled) m.getLenis()?.start()
      })
      return () => {
        cancelled = true
      }
    }
    document.documentElement.classList.add('menu-open')
    firstLinkRef.current?.focus()
    void import('./SmoothScroll').then((m) => {
      if (!cancelled) m.getLenis()?.stop()
    })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelled = true
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
      void import('./SmoothScroll').then((m) => m.getLenis()?.start())
    }
  }, [open])

  const onNav = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      setOpen(false)
      void import('./SmoothScroll')
        .then((m) => m.scrollToTarget(href.slice(1), -24))
        .catch(() => {
          document.querySelector(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
        })
      history.replaceState(null, '', href)
    }
  }

  const overlay =
    mounted &&
    createPortal(
      <div
        id="menu-overlay"
        className="menu-overlay"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="menu-overlay-glyph" aria-hidden="true">
          <SolidGlyph solid="icosaedro" size={520} />
        </div>
        <nav className="menu-overlay-nav" aria-label="Menú">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={onNav(item.href)}
              className="menu-overlay-link"
              style={{ '--i': i } as React.CSSProperties}
            >
              <span className="menu-overlay-index">0{i + 1}</span>
              <span className="menu-overlay-label">{item.label}</span>
              <span className="menu-overlay-greek" lang="grc">
                {item.greek}
              </span>
            </Link>
          ))}
        </nav>
        <p className="menu-overlay-foot">
          Paideía · parte de{' '}
          <a href="https://www.stevenvallejo.com" className="link-underline">
            Mouseîon
          </a>
        </p>
      </div>,
      document.body,
    )

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu-overlay"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="menu-toggle-text">{open ? 'Cerrar' : 'Menú'}</span>
        <span className="menu-toggle-icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      {overlay}
    </>
  )
}
