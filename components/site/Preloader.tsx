'use client'

import { useEffect, useRef, useState } from 'react'
import { experience } from '@/lib/experience'

const WORD = 'ΠΑΙΔΕΙΑ'
const GREEK = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
const MIN_MS = 1700
const MAX_MS = 4800

/** Marca la intro como terminada: libera los revelados del hero y avisa a quien escuche. */
export function finishIntro() {
  const root = document.documentElement
  if (root.classList.contains('intro-done')) return
  root.classList.remove('intro-pending')
  root.classList.add('intro-done')
  try {
    sessionStorage.setItem('paideia:intro', '1')
  } catch {}
  window.dispatchEvent(new Event('paideia:intro'))
}

/**
 * Pantalla de carga de la portada (una vez por sesión). Cuenta hasta 100 mientras
 * esperan las fuentes y el primer frame de la escena 3D, y luego se abre como un telón.
 * Solo se ve si el script inline del layout puso `intro-pending` en <html>.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<'idle' | 'loading' | 'leaving' | 'gone'>('idle')
  const count = useRef<HTMLSpanElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('intro-pending')) {
      setPhase('gone')
      return
    }
    setPhase('loading')

    const start = performance.now()
    let fontsReady = false
    let raf = 0
    let shown = 0
    let leaving = false
    document.fonts?.ready.then(() => (fontsReady = true)).catch(() => (fontsReady = true))

    const letters = [...WORD]
    let last = start
    const step = (now: number) => {
      const elapsed = now - start
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const sceneReady = experience.ready
      // La meta sube con el tiempo, pero no pasa de 90 hasta que todo está listo.
      const allReady = fontsReady && sceneReady
      const timeCap = Math.min(1, elapsed / MIN_MS)
      const goal = allReady || elapsed > MAX_MS ? 100 * timeCap : Math.min(90, 100 * timeCap)
      // Suavizado por tiempo (no por frame) para que dure lo mismo a 30 o 120 fps.
      shown += (goal - shown) * (1 - Math.exp(-dt * 7))
      const n = Math.min(100, Math.round(shown + 0.4))
      if (count.current) count.current.textContent = String(n).padStart(3, '0')
      if (bar.current) bar.current.style.transform = `scaleX(${n / 100})`
      if (word.current) {
        const settled = Math.floor((n / 100) * letters.length)
        word.current.textContent = letters
          .map((c, i) => (i < settled ? c : GREEK[(Math.random() * GREEK.length) | 0]))
          .join('')
      }
      if (n >= 100 && !leaving) {
        leaving = true
        if (word.current) word.current.textContent = WORD
        setTimeout(() => {
          setPhase('leaving')
          finishIntro()
          setTimeout(() => setPhase('gone'), 1300)
        }, 220)
        return
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (phase === 'gone') return null
  return (
    <div className="preloader" data-phase={phase} aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-kicker">Mouseîon · galería de filosofía</span>
        <span ref={word} className="preloader-word">
          {WORD}
        </span>
        <div className="preloader-meta">
          <span>Timeo 53c — los cinco sólidos</span>
          <span ref={count} className="preloader-count">
            000
          </span>
        </div>
        <span className="preloader-bar">
          <span ref={bar} />
        </span>
      </div>
    </div>
  )
}
