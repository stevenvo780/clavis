'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { afterLcpThenIdle } from '@/lib/afterLcp'
import RevealManager from './RevealManager'

const SmoothScroll = dynamic(() => import('./SmoothScroll'), { ssr: false })
const ScrollProgress = dynamic(() => import('./ScrollProgress'), { ssr: false })
const TiltManager = dynamic(() => import('./TiltManager'), { ssr: false })
const Cursor = dynamic(() => import('./Cursor'), { ssr: false })

/**
 * El observador de revelado es liviano y debe estar listo antes de ocultar contenido.
 * Lenis/GSAP, inclinación y cursor mantienen la espera de LCP + idle (≥8s).
 */
export default function DeferredChrome() {
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('hydrated')

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)

    const cancel = afterLcpThenIdle(() => setReady(true), 8000)
    return () => {
      cancel()
      motion.removeEventListener('change', updateMotion)
    }
  }, [])

  return (
    <>
      <RevealManager />
      {ready && (
        <>
          {!reducedMotion && <SmoothScroll />}
          <ScrollProgress />
          {!reducedMotion && <TiltManager />}
          {!reducedMotion && <Cursor />}
        </>
      )}
    </>
  )
}
