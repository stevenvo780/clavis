'use client'

import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [data-cursor], summary, label, [role="button"]'
const TEXTY = 'input, textarea, select, [contenteditable="true"]'

/**
 * Cursor propio (punto + anillo con inercia). Solo con puntero fino, hover real y sin
 * movimiento reducido. `data-cursor="Texto"` en cualquier elemento muestra esa etiqueta.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    const target = { x: -100, y: -100 }
    const pos = { x: -100, y: -100 }
    let visible = false
    let raf = 0

    const setState = (state: string, text = '') => {
      const r = ring.current
      if (!r) return
      if (r.dataset.state !== state) r.dataset.state = state
      if (label.current && label.current.textContent !== text) label.current.textContent = text
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      target.x = e.clientX
      target.y = e.clientY
      if (!visible) {
        visible = true
        pos.x = target.x
        pos.y = target.y
        root.classList.add('cursor-visible')
      }
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
    }
    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null
      if (!el || !(el instanceof Element)) return
      if (el.closest(TEXTY)) return setState('text')
      const hit = el.closest(INTERACTIVE)
      if (!hit) return setState('default')
      const text = hit.getAttribute('data-cursor') ?? ''
      setState(text ? 'label' : 'hover', text)
    }
    const onLeave = () => {
      visible = false
      root.classList.remove('cursor-visible')
    }
    const onDown = () => ring.current?.classList.add('is-pressed')
    const onUp = () => ring.current?.classList.remove('is-pressed')

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      if (ring.current) ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      root.classList.remove('has-cursor', 'cursor-visible')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" data-state="default" aria-hidden="true">
        <div className="cursor-ring-inner">
          <span ref={label} className="cursor-label" />
        </div>
      </div>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
