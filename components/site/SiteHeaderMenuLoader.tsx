'use client'

import dynamic from 'next/dynamic'

function MenuToggleStub() {
  return (
    <button type="button" className="menu-toggle" aria-label="Abrir menú" aria-expanded={false} disabled>
      <span className="menu-toggle-text">Menú</span>
      <span className="menu-toggle-icon" aria-hidden="true">
        <span />
        <span />
      </span>
    </button>
  )
}

const SiteHeaderMenu = dynamic(() => import('./SiteHeaderMenu'), {
  ssr: false,
  loading: () => <MenuToggleStub />,
})

/** Client boundary so ssr:false is legal; keeps menu JS off the server shell. */
export default function SiteHeaderMenuLoader() {
  return <SiteHeaderMenu />
}
