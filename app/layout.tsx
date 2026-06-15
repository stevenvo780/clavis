import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Paideía — Portal de Humanidades',
  description:
    'Paideía: portal de humanidades con Griego Clasico, Neurofilosofia y Filosofia de la Ciudad. Parte de Mouseîon.',
  openGraph: {
    title: 'Paideía — Portal de Humanidades',
    description: 'Paideía: humanities portal — Classical Greek, Neurophilosophy and Philosophy of the City. Part of Mouseîon.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

function NavBar() {
  return (
    <header
      className="border-b sticky top-0 z-50"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Wordmark: lemniscata + nombre griego + tag Mouseîon → enlaza al portal */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.stevenvallejo.com"
            className="flex items-center gap-2 no-underline"
            style={{ color: 'var(--text)' }}
            aria-label="Mouseîon — Portal de Steven Vallejo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.svg" alt="" width={26} height={26} aria-hidden="true" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              Paideía
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                paddingLeft: '0.25rem',
              }}
            >
              Mouseîon
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
          <Link href="/griego" className="brand-navlink transition-colors">Griego Clasico</Link>
          <Link href="/neurofilosofia" className="brand-navlink transition-colors">Neurofilosofia</Link>
          <Link href="/filosofia-ciudad" className="brand-navlink transition-colors">Filosofia de la Ciudad</Link>
          <Link href="/ponencias" className="brand-navlink transition-colors">Ponencias</Link>
          <Link href="/buscar" className="brand-navlink transition-colors">Buscar</Link>
        </nav>
        <details className="md:hidden relative">
          <summary
            className="cursor-pointer list-none p-2 rounded border select-none"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            Menu
          </summary>
          <div
            className="absolute right-0 top-10 w-52 border rounded-lg shadow-lg flex flex-col p-2 gap-1 z-50"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <Link href="/griego" className="brand-menuitem px-3 py-2 rounded text-sm">Griego Clasico</Link>
            <Link href="/neurofilosofia" className="brand-menuitem px-3 py-2 rounded text-sm">Neurofilosofia</Link>
            <Link href="/filosofia-ciudad" className="brand-menuitem px-3 py-2 rounded text-sm">Filosofia de la Ciudad</Link>
            <Link href="/ponencias" className="brand-menuitem px-3 py-2 rounded text-sm">Ponencias</Link>
            <Link href="/buscar" className="brand-menuitem px-3 py-2 rounded text-sm">Buscar</Link>
          </div>
        </details>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer
      className="border-t mt-24 py-10 text-center text-sm"
      style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
    >
      <p>
        Paideía — portal de humanidades &middot;{' '}
        <span style={{ color: 'var(--text-muted)' }}>por</span>{' '}
        <a href="https://www.stevenvallejo.com" className="hover:underline" style={{ color: 'var(--link)' }}>
          Steven Vallejo
        </a>
      </p>
      <p className="mt-1 text-xs">
        Classical Greek &bull; Neurophilosophy &bull; Philosophy of the City
      </p>

      {/* Ecosistema Mouseîon */}
      <div
        className="mt-8 pt-6 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Parte de Mouseîon
        </p>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs" aria-label="Ecosistema">
          <a href="https://www.stevenvallejo.com/es#filosofia" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Filosofia
          </a>
          <a href="https://www.stevenvallejo.com/es#ciencias" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Ciencias
          </a>
          <a href="https://www.stevenvallejo.com/es#informatica" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Informatica
          </a>
          <a href="https://www.stevenvallejo.com/es#enterprise" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Enterprise
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="light">
      <body className="antialiased min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
