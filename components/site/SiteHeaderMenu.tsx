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
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add('menu-ready')
    return () => document.documentElement.classList.remove('menu-ready')
  }, [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (!header) return
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      header.dataset.scrolled = y > 24 ? 'true' : 'false'
      if (!open && !header.contains(document.activeElement) && y > 240 && y > last + 6) header.dataset.hidden = 'true'
      else if (y < last - 6 || y < 240 || open) header.dataset.hidden = 'false'
      last = y
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    const onFocus = () => { header.dataset.hidden = 'false' }
    window.addEventListener('scroll', onScroll, { passive: true })
    header.addEventListener('focusin', onFocus)
    return () => {
      window.removeEventListener('scroll', onScroll)
      header.removeEventListener('focusin', onFocus)
      cancelAnimationFrame(raf)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    window.addEventListener('popstate', close)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('hashchange', close)
      window.removeEventListener('popstate', close)
    }
  }, [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header')
    if (header) header.dataset.open = open ? 'true' : 'false'

    if (!open) {
      document.documentElement.classList.remove('menu-open')
      window.dispatchEvent(new Event('paideia:menu'))
      return
    }
    document.documentElement.classList.add('menu-open')
    window.dispatchEvent(new Event('paideia:menu'))
    const background = [...document.querySelectorAll<HTMLElement>('main, .site-footer, .skip-link, .brand-mark, .brand-word, .site-nav')]
    const previousInert = background.map((el) => el.inert)
    background.forEach((el) => { el.inert = true })
    const focusFrame = requestAnimationFrame(() => firstLinkRef.current?.focus())
    const focusable = () => [
      toggleRef.current,
      ...overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
    ].filter((el): el is HTMLElement => !!el)
    const onFocus = (e: FocusEvent) => {
      if (!focusable().includes(e.target as HTMLElement)) firstLinkRef.current?.focus()
    }
    document.addEventListener('focusin', onFocus)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const items = focusable()
        const index = items.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && index <= 0) {
          e.preventDefault()
          items.at(-1)?.focus()
        } else if (!e.shiftKey && (index === -1 || index === items.length - 1)) {
          e.preventDefault()
          items[0]?.focus()
        }
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
      background.forEach((el, i) => { el.inert = previousInert[i] })
      document.documentElement.classList.remove('menu-open')
      window.dispatchEvent(new Event('paideia:menu'))
    }
  }, [open])

  const onNav = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    setOpen(false)
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      void import('./SmoothScroll')
        .then((m) => m.scrollToTarget(href.slice(1), -72))
        .catch(() => {
          document.querySelector(href.slice(1))?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
        })
      if (location.hash !== href.slice(1)) history.pushState(history.state, '', href)
    }
  }

  const overlay =
    mounted &&
    createPortal(
      <div
        ref={overlayRef}
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
