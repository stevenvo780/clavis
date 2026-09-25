import Link from 'next/link'
import SiteHeaderMenu from './SiteHeaderMenu'

const NAV = [
  { href: '/#obras', label: 'Obras', greek: 'ἔργα' },
  { href: '/#elementos', label: 'Elementos', greek: 'στοιχεῖα' },
  { href: '/ponencias', label: 'Ponencias', greek: 'λόγοι' },
  { href: '/#archivo', label: 'Archivo', greek: 'ἀρχεῖον' },
  { href: '/buscar', label: 'Buscar', greek: 'ζήτησις' },
]

/** Server shell: brand + desktop nav paint with zero client JS. Menu/scroll = thin island. */
export default function SiteHeader() {
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <header className="site-header" data-scrolled="false" data-hidden="false" data-open="false">
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
              <Link key={item.href} href={item.href} className="site-nav-link">
                <span className="site-nav-label" data-text={item.label}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <SiteHeaderMenu />
        </div>
      </header>
    </>
  )
}
