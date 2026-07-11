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
        aria-controls="mobile-nav-menu"
        aria-label={open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
        className="cursor-pointer p-2 rounded border select-none"
        style={{ borderColor: 'var(--border)', color: 'var(--text)', background: 'transparent' }}
      >
        {open ? 'Cerrar menú' : 'Abrir menú'}
      </button>
      {open && (
        <div
          id="mobile-nav-menu"
          className="absolute right-0 top-10 w-52 border rounded-lg shadow-lg flex flex-col p-2 gap-1 z-50"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <Link href="/" className="brand-menuitem px-3 py-2 rounded text-sm font-semibold" onClick={() => setOpen(false)}>Galería</Link>
          <div className="border-t" style={{ borderColor: 'var(--border)' }} />
          <Link href="/buscar" className="brand-menuitem px-3 py-2 rounded text-sm" onClick={() => setOpen(false)}>Buscar</Link>
        </div>
      )}
    </div>
  )
}
