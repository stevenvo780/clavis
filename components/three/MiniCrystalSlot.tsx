'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { SolidKey } from '@/lib/solids'
import SolidGlyph from '@/components/visual/SolidGlyph'

const MiniCrystal = dynamic(() => import('./MiniCrystal'), { ssr: false })

/** Hueco del mini-cristal: wireframe SVG hasta que (y si) WebGL2 está disponible. */
export default function MiniCrystalSlot({ solid, color, label }: { solid: SolidKey; color: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [supported, setSupported] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      setSupported(!!document.createElement('canvas').getContext('webgl2'))
    } catch {
      setSupported(false)
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="mini-crystal"
      data-ready={ready}
      style={{ '--c': color } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="mini-crystal-fallback">
        <SolidGlyph solid={solid} size={220} />
      </div>
      {supported && (visible || ready) && (
        <div className="mini-crystal-canvas">
          <MiniCrystal solid={solid} color={color} active={visible} onReady={() => setReady(true)} />
        </div>
      )}
      {label && <span className="mini-crystal-label">{label}</span>}
    </div>
  )
}
