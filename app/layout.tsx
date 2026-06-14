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
}

function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-900">
          <span className="text-2xl font-serif">K</span>
          <span>Clavis</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/griego" className="hover:text-amber-700 transition-colors">Griego Clasico</Link>
          <Link href="/neurofilosofia" className="hover:text-violet-700 transition-colors">Neurofilosofia</Link>
          <Link href="/filosofia-ciudad" className="hover:text-teal-700 transition-colors">Filosofia de la Ciudad</Link>
          <Link href="/buscar" className="hover:text-indigo-700 transition-colors">Buscar</Link>
        </nav>
        <details className="md:hidden relative">
          <summary className="cursor-pointer list-none p-2 rounded border border-gray-200 text-gray-600 select-none">
            Menu
          </summary>
          <div className="absolute right-0 top-10 w-52 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col p-2 gap-1 z-50">
            <Link href="/griego" className="px-3 py-2 rounded hover:bg-amber-50 text-sm">Griego Clasico</Link>
            <Link href="/neurofilosofia" className="px-3 py-2 rounded hover:bg-violet-50 text-sm">Neurofilosofia</Link>
            <Link href="/filosofia-ciudad" className="px-3 py-2 rounded hover:bg-teal-50 text-sm">Filosofia de la Ciudad</Link>
            <Link href="/buscar" className="px-3 py-2 rounded hover:bg-indigo-50 text-sm">Buscar</Link>
          </div>
        </details>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24 py-10 text-center text-sm text-gray-400">
      <p>
        Clavis — Portal de Humanidades Digitales &middot;{' '}
        <a href="https://github.com/stevenvo780" className="hover:underline">stevenvo780</a>
      </p>
      <p className="mt-1 text-xs">
        Classical Greek &bull; Neurophilosophy &bull; Philosophy of the City
      </p>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
