'use client'

import { useEffect, useRef } from 'react'

const GREEK = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω'

type Trigger = 'mount' | 'view' | 'intro'

interface Props {
  text: string
  className?: string
  /** `intro` espera a que termine el preloader; `view` a entrar en pantalla. */
  trigger?: Trigger
  delay?: number
  duration?: number
}

/**
 * Texto que se "decodifica" desde letras griegas al azar hasta el texto final.
 * El texto real va en un span solo para lectores de pantalla.
 */
export default function Scramble({ text, className = '', trigger = 'view', delay = 0, duration = 1.1 }: Props) {
  return (
    <span className={`scramble ${className}`}>
      <span className="sr-only">{text}</span>
      {/* key: al cambiar el texto se monta un nodo nuevo y la animación vuelve a correr */}
      <ScrambleInner key={text} text={text} trigger={trigger} delay={delay} duration={duration} />
    </span>
  )
}

function ScrambleInner({ text, trigger, delay, duration }: Required<Omit<Props, 'className'>>) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const chars = [...text]
    const resolveAt = chars.map((_, i) => (i / Math.max(1, chars.length)) * 0.55 + Math.random() * 0.45)
    let raf = 0
    let io: IntersectionObserver | null = null
    let lastSwap = 0
    let current = chars.map((c) => (c === ' ' ? ' ' : GREEK[(Math.random() * GREEK.length) | 0]))

    const run = () => {
      const start = performance.now() + delay * 1000
      const step = (now: number) => {
        const t = (now - start) / (duration * 1000)
        if (now - lastSwap > 45) {
          lastSwap = now
          current = chars.map((c, i) => {
            if (c === ' ' || t >= resolveAt[i]) return c
            return GREEK[(Math.random() * GREEK.length) | 0]
          })
          el.textContent = current.join('')
        }
        if (t < 1) raf = requestAnimationFrame(step)
        else el.textContent = text
      }
      raf = requestAnimationFrame(step)
    }

    // Estado inicial revuelto para que no se vea el texto final "saltar".
    el.textContent = current.join('')

    const onIntro = () => run()
    if (trigger === 'mount') run()
    else if (trigger === 'intro') {
      if (document.documentElement.classList.contains('intro-done')) run()
      else window.addEventListener('paideia:intro', onIntro, { once: true })
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          io?.disconnect()
          const waitIntro = !document.documentElement.classList.contains('intro-done')
          if (waitIntro) window.addEventListener('paideia:intro', onIntro, { once: true })
          else run()
        },
        { threshold: 0.2 },
      )
      io.observe(el)
    }

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
      window.removeEventListener('paideia:intro', onIntro)
      el.textContent = text
    }
  }, [text, trigger, delay, duration])

  return (
    <span ref={ref} aria-hidden="true">
      {text}
    </span>
  )
}
