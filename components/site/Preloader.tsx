'use client'

import { useEffect, useRef, useState } from 'react'

const WORD = 'ΠΑΙΔΕΙΑ'
const GREEK = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
/** Short floor so intro does not own LCP / elementRenderDelay (JS boot). Scene is deferred. */
const MIN_MS = 700
const MAX_MS = 1800

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
 * Pantalla de carga de la portada (una vez por sesión).
 * Does NOT wait on WebGL/sceneReady — R3F is deferred past LCP (W3-PAI-01).
 * Only gates briefly on fonts (with hard MAX) so #hero-title can become LCP sooner.
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
    // Hard 200ms floor for Cormorant preload — do NOT await document.fonts.ready
    // (Inter/EB optional faces kept the gate open and inflated elementRenderDelay).
    const fontTimer = window.setTimeout(() => {
      fontsReady = true
    }, 200)

    const letters = [...WORD]
    let last = start
    const step = (now: number) => {
      const elapsed = now - start
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const allReady = fontsReady || elapsed > MAX_MS
      const timeCap = Math.min(1, elapsed / MIN_MS)
      const goal = allReady ? 100 * timeCap : Math.min(88, 100 * timeCap)
      shown += (goal - shown) * (1 - Math.exp(-dt * 10))
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
        // finishIntro first so #hero-title can become LCP without waiting on leave CSS.
        finishIntro()
        setPhase('leaving')
        setTimeout(() => setPhase('gone'), 700)
        return
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fontTimer)
    }
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
