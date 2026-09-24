'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { getLenis, scrollToTarget } from './SmoothScroll'
import SolidGlyph from '@/components/visual/SolidGlyph'

const NAV = [
  { href: '/#obras', label: 'Obras', greek: 'ἔργα' },
  { href: '/#elementos', label: 'Elementos', greek: 'στοιχεῖα' },
  { href: '/ponencias', label: 'Ponencias', greek: 'λόγοι' },
  { href: '/#archivo', label: 'Archivo', greek: 'ἀρχεῖον' },
  { href: '/buscar', label: 'Buscar', greek: 'ζήτησις' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    let last = window.scrollY
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 24)
      if (y > 240 && y > last + 6) setHidden(true)
      else if (y < last - 6 || y < 240) setHidden(false)
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
  }, [])

  // Cierra el menú al navegar.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const lenis = getLenis()
    if (!open) {
      lenis?.start()
      document.documentElement.classList.remove('menu-open')
      return
    }
    lenis?.stop()
    document.documentElement.classList.add('menu-open')
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const onNav = (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      setOpen(false)
      scrollToTarget(href.slice(1), -24)
      history.replaceState(null, '', href)
    }
  }

  const isActive = (href: string) => (href.startsWith('/#') ? false : pathname.startsWith(href))

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="site-header" data-scrolled={scrolled} data-hidden={hidden && !open} data-open={open}>
        <div className="site-header-inner">
          <a
            href="https://www.stevenvallejo.com"
            className="brand-mark"
            aria-label="Mouseîon — Portal de Steven Vallejo"
            data-cursor="Mouseîon"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-192.png" alt="" width={36} height={36} aria-hidden="true" />
          </a>
          <Link href="/" className="brand-word" aria-label="Paideía — inicio">
            <span className="brand-word-main">Paideía</span>
            <span className="brand-word-tag">Mouseîon</span>
          </Link>

          <nav className="site-nav" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNav(item.href)}
                className="site-nav-link"
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="site-nav-label" data-text={item.label}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

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
        </div>
      </header>

      <div id="menu-overlay" className="menu-overlay" data-open={open} aria-hidden={!open} inert={!open}>
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
      </div>
    </>
  )
}
