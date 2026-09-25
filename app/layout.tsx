import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Cormorant_Garamond, EB_Garamond } from 'next/font/google'
import './globals.css'
import './styles/chrome.css'
import './styles/home.css'
import './styles/pages.css'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import DeferredChrome from '@/components/site/DeferredChrome'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '700'],
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-greek',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

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
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#0b1417',
  width: 'device-width',
  initialScale: 1,
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

/**
 * Corre antes del primer pintado: marca que hay JS (los estados iniciales de las
 * animaciones viven bajo `html.js`) y decide si la portada muestra el preloader.
 * Si el bundle nunca hidrata, a los 8 s se liberan todos los revelados.
 */
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');var seen=false;try{seen=!!sessionStorage.getItem('paideia:intro')}catch(e){}var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(location.pathname!=='/'||seen||rm){d.classList.add('intro-done')}else{d.classList.add('intro-pending')}setTimeout(function(){if(!d.classList.contains('hydrated')){d.classList.remove('intro-pending');d.classList.add('intro-done','no-motion')}},8000)})();`

const fontVars = `${inter.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} ${ebGaramond.variable}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <DeferredChrome />
        <SiteHeader />
        <main id="contenido" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  )
}
