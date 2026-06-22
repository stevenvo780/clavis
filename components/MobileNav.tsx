'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Abrir menú de navegación"
        className="cursor-pointer p-2 rounded border select-none"
        style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
      >
        {open ? 'Cerrar' : 'Menú'}
      </button>
      {open && (
        <div
          className="absolute right-0 top-10 w-52 border rounded-lg shadow-lg flex flex-col p-2 gap-1 z-50"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <Link href="/griego" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Griego Clásico</Link>
          <Link href="/neurofilosofia" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Neurofilosofía</Link>
          <Link href="/filosofia-ciudad" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Filosofía de la Ciudad</Link>
          <Link href="/ponencias" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Ponencias</Link>
          <Link href="/buscar" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Buscar</Link>
        </div>
      )}
    </div>
  )
}
