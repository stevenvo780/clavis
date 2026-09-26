'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import Scramble from '@/components/visual/Scramble'
import Magnetic from '@/components/site/Magnetic'
import { SCENE, useSceneSection } from './useSceneSection'

/** Cierre: vuelve el cristal (dodecaedro, el cosmos) con la inscripción de la Academia. */
export default function Outro() {
  const root = useRef<HTMLElement>(null)
  useSceneSection(root, SCENE.outro)

  return (
    <section ref={root} className="outro" aria-labelledby="outro-title">
      <div className="outro-inner">
        <p className="section-label" data-reveal="up">
          <span className="section-num">§ 06</span> Umbral
        </p>
        <h2 id="outro-title" className="outro-greek" lang="grc">
          <Scramble text="ἀγεωμέτρητος μηδεὶς εἰσίτω" duration={1.8} />
        </h2>
        <p className="outro-trans" data-reveal="up" style={{ '--d': '200ms' } as CSSProperties}>
          «Que no entre nadie que no sepa geometría»
          <span>— inscripción que la tradición atribuye a la puerta de la Academia de Platón</span>
        </p>
        <div className="outro-actions" data-reveal="up" style={{ '--d': '350ms' } as CSSProperties}>
          <Magnetic>
            <a
              href="#elementos"
              className="btn-pill"
              data-cursor="Volver"
              onClick={(e) => {
                e.preventDefault()
                void import('@/components/site/SmoothScroll').then((m) => m.scrollToTarget('#elementos')).catch(() => {
                  document.querySelector('#elementos')?.scrollIntoView({ behavior: 'smooth' })
                })
              }}
            >
              <span className="btn-pill-fill" aria-hidden="true" />
              <span className="btn-pill-text">Recorrer los cinco sólidos</span>
              <span className="btn-pill-arrow" aria-hidden="true">
                ↑
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <Link href="/ponencias" className="btn-line">
              Todas las ponencias
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
