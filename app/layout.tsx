import type { Metadata, Viewport } from 'next'
import './globals.css'
import Link from 'next/link'
import MobileNav from '@/components/MobileNav'

const SITE_URL = 'https://paideia.stevenvallejo.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Paideía — portal de humanidades digitales · Mouseîon',
    template: '%s · Mouseîon',
  },
  description:
    'Paideía: portal de humanidades digitales con Griego Clásico, Neurofilosofía y Filosofía de la Ciudad. Más de 220 documentos académicos navegables. Parte del ecosistema Mouseîon de Steven Vallejo.',
  applicationName: 'Mouseîon',
  authors: [{ name: 'Steven Vallejo', url: 'https://www.stevenvallejo.com' }],
  creator: 'Steven Vallejo',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'es-ES': SITE_URL,
      'en-US': SITE_URL,
    },
  },
  openGraph: {
    title: 'Paideía — portal de humanidades digitales · Mouseîon',
    description:
      'Paideía: humanities portal — Classical Greek, Neurophilosophy and Philosophy of the City. 220+ academic documents, no login required. Part of Mouseîon.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Mouseîon',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Paideía — portal de humanidades digitales · Mouseîon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paideía — portal de humanidades digitales · Mouseîon',
    description:
      'Portal de humanidades digitales: Griego Clásico, Neurofilosofía y Filosofía de la Ciudad. 220+ documentos. Parte de Mouseîon.',
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1417',
  width: 'device-width',
  initialScale: 1,
}

function NavBar() {
  return (
    <header
      className="border-b sticky top-0 z-50"
      style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Wordmark: isotipo de marca Eikon + nombre griego + tag Mouseîon → enlaza al portal */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.stevenvallejo.com"
            className="flex items-center gap-2 no-underline"
            style={{ color: 'var(--text)' }}
            aria-label="Mouseîon — Portal de Steven Vallejo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-isotipo.png" alt="" width={26} height={26} aria-hidden="true" />
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
          <Link href="/griego" className="brand-navlink transition-colors">Griego Clásico</Link>
          <Link href="/neurofilosofia" className="brand-navlink transition-colors">Neurofilosofía</Link>
          <Link href="/filosofia-ciudad" className="brand-navlink transition-colors">Filosofía de la Ciudad</Link>
          <Link href="/ponencias" className="brand-navlink transition-colors">Ponencias</Link>
          <Link href="/buscar" className="brand-navlink transition-colors">Buscar</Link>
        </nav>
        <MobileNav />
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
            Filosofía
          </a>
          <a href="https://www.stevenvallejo.com/es#ciencias" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Ciencias
          </a>
          <a href="https://www.stevenvallejo.com/es#informatica" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Informática
          </a>
          <a href="https://www.stevenvallejo.com/es#ingenieria" className="hover:underline transition-colors" style={{ color: 'var(--link)' }}>
            Ingeniería
          </a>
        </nav>
      </div>
    </footer>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Paideía',
      description: 'Portal de humanidades digitales: Griego Clásico, Neurofilosofía y Filosofía de la Ciudad.',
      inLanguage: ['es-ES', 'en-US'],
      publisher: { '@id': `${SITE_URL}/#author` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#app`,
      name: 'Paideía',
      url: SITE_URL,
      applicationCategory: 'EducationApplication',
      operatingSystem: 'Web',
      description:
        'Paideía es un portal de humanidades digitales con más de 220 documentos académicos en Griego Clásico, Neurofilosofía y Filosofía de la Ciudad. Parte del ecosistema Mouseîon de Steven Vallejo.',
      inLanguage: ['es-ES', 'en-US'],
      author: { '@id': `${SITE_URL}/#author` },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Mouseîon',
        url: 'https://www.stevenvallejo.com',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      screenshot: `${SITE_URL}/og-image.png`,
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#author`,
      name: 'Steven Vallejo',
      url: 'https://www.stevenvallejo.com',
      sameAs: [
        'https://github.com/stevenvo780',
        'https://linkedin.com/in/stevenvo780',
      ],
      jobTitle: 'Ingeniero de Software · Filósofo',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
