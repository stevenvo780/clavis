import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-serif text-gray-200 mb-4">404</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Pagina no encontrada</h1>
      <p className="text-gray-500 mb-8 italic">Page not found</p>
      <Link href="/" className="text-indigo-600 hover:underline">
        Volver al inicio &rarr;
      </Link>
    </div>
  )
}
