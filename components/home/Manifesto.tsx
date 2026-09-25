'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import { afterLcpThenIdle, loadGsap } from '@/lib/afterLcp'
import Counter from '@/components/visual/Counter'
import { SCENE, useSceneSection } from './useSceneSection'

// Texto de la portada original; los fragmentos entre *asteriscos* van resaltados.
const TEXT =
  'Mi trabajo en filosofía: tesis, ensayos y ponencias propios sobre una pluralidad de temas — *mente y materia,* *ontología,* *filosofía de la ciudad,* *retórica,* *lógica,* *sistemas complejos,* *filosofía de la religión* y *de la técnica.*'

interface Stat {
  value: number
  label: string
}

export default function Manifesto({ stats }: { stats: Stat[] }) {
  const root = useRef<HTMLElement>(null)
  useSceneSection(root, SCENE.manifesto)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ctx: { revert: () => void } | null = null
    let cancelled = false
    const cancelWait = afterLcpThenIdle(() => {
      void loadGsap().then(({ gsap }) => {
        if (cancelled || !root.current) return
        ctx = gsap.context(() => {
          gsap.fromTo(
            '.mf-word',
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: 'none',
              scrollTrigger: { trigger: '.mf-text', start: 'top 78%', end: 'bottom 42%', scrub: 0.4 },
            },
          )
        }, root)
      })
    })
    return () => {
      cancelled = true
      cancelWait()
      ctx?.revert()
    }
  }, [])

  let inHighlight = false
  const words = TEXT.split(' ').map((raw) => {
    if (raw.startsWith('*')) inHighlight = true
    const word = { text: raw.replace(/\*/g, ''), hl: inHighlight }
    if (raw.endsWith('*')) inHighlight = false
    return word
  })
  return (
    <section ref={root} className="manifesto section" aria-labelledby="manifesto-label">
      <div className="container-wide">
        <p id="manifesto-label" className="section-label" data-reveal="up">
          <span className="section-num">§ 01</span> Qué hay aquí
        </p>
        <p className="mf-text">
          {words.map((w, i) => (
            <span key={i} className={`mf-word${w.hl ? ' mf-hl' : ''}`}>
              {w.text}{' '}
            </span>
          ))}
        </p>
        <dl className="mf-stats">
          {stats.map((s, i) => (
            <div key={s.label} className="mf-stat" data-reveal="up" style={{ '--d': `${i * 90}ms` } as CSSProperties}>
              <dt>{s.label}</dt>
              <dd>
                <Counter value={s.value} pad={2} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
