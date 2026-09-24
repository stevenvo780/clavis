'use client'

import { useRef, type ReactNode } from 'react'
import { SCENE, useSceneSection } from './useSceneSection'

/** Sección de portada que apaga la capa 3D mientras está en pantalla. */
export default function SceneOff({
  id,
  className,
  labelledBy,
  children,
}: {
  id?: string
  className?: string
  labelledBy?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  useSceneSection(ref, SCENE.off)
  return (
    <section ref={ref} id={id} className={className} aria-labelledby={labelledBy}>
      {children}
    </section>
  )
}
