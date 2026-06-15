import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Clavis — Portal de Humanidades Digitales',
  description:
    'Portal academico de Humanidades Digitales: Griego Clasico, Neurofilosofia y Filosofia de la Ciudad.',
  openGraph: {
    title: 'Clavis — Digital Humanities Portal',
    description: 'Academic knowledge base: Classical Greek, Neurophilosophy and Philosophy of the City.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
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
        {/* Wordmark: lemniscata + "Steven Vallejo" → enlaza al portal */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.stevenvallejo.com"
            className="flex items-center gap-2 no-underline"
            style={{ color: 'var(--text)' }}
            aria-label="Steven Vallejo — Portal"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/favicon.svg" alt="" width={26} height={26} aria-hidden="true" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
              Steven Vallejo
            </span>
          </a>
          <span style={{ color: 'var(--border)', fontSize: '1.2rem', userSelect: 'none' }} aria-hidden="true">|</span>
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            <span className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>K</span>
            <span>Clavis</span>
          </Link>
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
        Clavis — Portal de Humanidades Digitales &middot;{' '}
        <a href="https://github.com/stevenvo780" className="hover:underline" style={{ color: 'var(--link)' }}>
          stevenvo780
        </a>
      </p>
      <p className="mt-1 text-xs">
        Classical Greek &bull; Neurophilosophy &bull; Philosophy of the City
      </p>

      {/* Ecosistema de Steven Vallejo */}
      <div
        className="mt-8 pt-6 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Parte del ecosistema de Steven Vallejo
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
