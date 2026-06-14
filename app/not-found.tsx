import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-serif mb-4" style={{ color: 'var(--primary)', opacity: 0.4 }}>404</p>
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Pagina no encontrada</h1>
      <p className="mb-8 italic" style={{ color: 'var(--text-muted)' }}>Page not found</p>
      <Link href="/" className="hover:underline" style={{ color: 'var(--link)' }}>
        Volver al inicio &rarr;
      </Link>
    </div>
  )
}
