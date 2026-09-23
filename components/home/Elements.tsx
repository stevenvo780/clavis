'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ElementInfo } from '@/lib/elements'
import { SOLID_FACTS } from '@/lib/solids'
import { setElementBlend } from '@/lib/experience'
import Scramble from '@/components/visual/Scramble'
import SolidGlyph from '@/components/visual/SolidGlyph'
import { scrollToTarget } from '@/components/site/SmoothScroll'
import { SCENE, applyScene } from './useSceneSection'

export interface ElementGroup {
  element: ElementInfo
  works: { id: string; titulo: string; tipo: string; url: string }[]
}

const TIPO: Record<string, string> = { ponencia: 'Ponencia', ensayo: 'Ensayo', tesis: 'Tesis' }
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/**
 * Sección fija: al avanzar el scroll el cristal pasa por los cinco sólidos del Timeo y
 * el panel muestra el campo de trabajo que le corresponde a cada uno.
 */
export default function Elements({ groups }: { groups: ElementGroup[] }) {
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const n = groups.length

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const el = root.current
    if (!el) return
    let current = -1

    const applyProgress = (p: number) => {
      const f = Math.min(n - 1, Math.max(0, p * n - 0.5))
      const i = Math.floor(f)
      setElementBlend(i, smoothstep(0.25, 0.75, f - i))
      const idx = Math.min(n - 1, Math.floor(p * n))
      if (idx !== current) {
        current = idx
        setIndex(idx)
      }
      el.style.setProperty('--p', p.toFixed(4))
    }

    // Ambos triggers se leen entre sí y pueden disparar al crearse: declarar antes.
    let progress: ScrollTrigger | null = null
    let scene: ScrollTrigger | null = null
    progress = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (scene?.isActive) applyProgress(self.progress)
        else el.style.setProperty('--p', self.progress.toFixed(4))
      },
    })
    scene = ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        if (!self.isActive) return
        applyScene(SCENE.elementos)
        applyProgress(progress?.progress ?? 0)
      },
    })
    return () => {
      progress?.kill()
      scene?.kill()
    }
  }, [n])

  const goTo = (i: number) => {
    const el = root.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const travel = el.offsetHeight - window.innerHeight
    scrollToTarget(top + ((i + 0.5) / n) * travel)
  }

  const g = groups[index]
  const facts = SOLID_FACTS[g.element.solido]

  return (
    <section
      ref={root}
      id="elementos"
      className="elements"
      style={{ '--steps': n, '--el': g.element.colores[0], '--el-2': g.element.colores[2] } as CSSProperties}
      aria-labelledby="elements-title"
    >
      <div className="elements-sticky">
        <div className="elements-head">
          <p className="section-label">
            <span className="section-num">§ 02</span> Stoicheîa — los cinco sólidos
          </p>
          <h2 id="elements-title" className="elements-title">
            Cinco formas para ordenar el trabajo
          </h2>
          <p className="elements-cite">
            En el <em>Timeo</em> (53c–56c), Platón asigna a cada elemento un sólido regular. Aquí cada uno reúne un
            campo de la galería.
          </p>
        </div>

        <ol className="elements-rail" aria-label="Elementos">
          {groups.map((grp, i) => (
            <li key={grp.element.key}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index ? 'step' : undefined}
                className="elements-rail-item"
                style={{ '--c': grp.element.colores[0] } as CSSProperties}
              >
                <span className="elements-rail-num">0{i + 1}</span>
                <span className="elements-rail-name">{grp.element.nombre}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="elements-panel" aria-live="polite">
          <div key={g.element.key} className="elements-panel-inner">
            <div className="elements-meta">
              <span className="elements-count">
                0{index + 1} <span>/ 0{n}</span>
              </span>
              <span className="elements-solid">
                <SolidGlyph solid={g.element.solido} size={28} />
                {g.element.solidoNombre} · {facts.caras} {facts.forma}
              </span>
            </div>
            <p className="elements-greek" lang="grc">
              <Scramble text={g.element.griego} trigger="mount" duration={0.9} />
            </p>
            <h3 className="elements-name">
              {g.element.nombre} <span>— {g.element.tema}</span>
            </h3>
            <p className="elements-lema">{g.element.lema}</p>
            <ul className="elements-works">
              {g.works.map((w, i) => (
                <li key={w.id} style={{ '--i': i } as CSSProperties}>
                  <a href={w.url} target="_blank" rel="noopener noreferrer" data-cursor="Abrir">
                    <span className="elements-works-type">{TIPO[w.tipo] ?? w.tipo}</span>
                    <span className="elements-works-title">{w.titulo.split(' — ')[0]}</span>
                    <span className="elements-works-arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only"> (abre en nueva pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="elements-progress" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}
