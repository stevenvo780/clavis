'use client'

/**
 * Post-LCP hero island (ssr:false from Hero). Keeps SplitChars / Scramble / Magnetic /
 * GSAP parallax / scene section OFF the sync home hydration path so #hero-title can
 * paint without waiting for this chunk (Revisor: elementRenderDelay ≈ JS boot).
 */

import { useEffect, useLayoutEffect, useState, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { setSolidity } from '@/lib/experience'
import { afterLcpThenIdle, loadGsap } from '@/lib/afterLcp'
import { SCENE, applyScene } from './useSceneSection'

type SplitCharsProps = {
  text: string
  accent?: (char: string, index: number) => boolean
}

type ScrambleProps = {
  text: string
  trigger?: 'mount' | 'view' | 'intro'
  delay?: number
  duration?: number
  className?: string
}

function TitlePortal({
  target,
  SplitChars,
}: {
  target: HTMLElement
  SplitChars: ComponentType<SplitCharsProps>
}) {
  useLayoutEffect(() => {
    target.querySelectorAll('[data-hero-ssr]').forEach((n) => n.remove())
  }, [target])
  return createPortal(<SplitChars text="Paideía" accent={(c) => c === 'í'} />, target)
}

function ScramblePortal({
  target,
  Scramble,
}: {
  target: HTMLElement
  Scramble: ComponentType<ScrambleProps>
}) {
  useLayoutEffect(() => {
    target.textContent = ''
  }, [target])
  return createPortal(
    <Scramble text="παιδεία" trigger="intro" delay={0.5} duration={1.4} className="font-greek" />,
    target,
  )
}

export default function HeroEnhance() {
  const [titleEl, setTitleEl] = useState<HTMLElement | null>(null)
  const [scrambleSlot, setScrambleSlot] = useState<HTMLElement | null>(null)
  const [SplitChars, setSplitChars] = useState<ComponentType<SplitCharsProps> | null>(null)
  const [Scramble, setScramble] = useState<ComponentType<ScrambleProps> | null>(null)

  useEffect(() => {
    setTitleEl(document.getElementById('hero-title'))
    setScrambleSlot(document.getElementById('hero-scramble'))
    return afterLcpThenIdle(() => {
      void Promise.all([
        import('@/components/visual/SplitChars'),
        import('@/components/visual/Scramble'),
      ]).then(([split, scramble]) => {
        setSplitChars(() => split.default)
        setScramble(() => scramble.default)
      })
    }, 3500)
  }, [])

  useEffect(() => {
    const solidify = () => setSolidity(1)
    if (document.documentElement.classList.contains('intro-done')) solidify()
    else window.addEventListener('paideia:intro', solidify, { once: true })

    let ctx: { revert: () => void } | null = null
    let st: { kill: () => void } | null = null
    let cancelled = false

    const cancelWait = afterLcpThenIdle(() => {
      void loadGsap().then(({ gsap, ScrollTrigger }) => {
        if (cancelled) return
        const root = document.querySelector<HTMLElement>('.hero')
        if (!root) return
        applyScene(SCENE.hero)
        st = ScrollTrigger.create({
          trigger: root,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) applyScene(SCENE.hero)
          },
        })
        ctx = gsap.context(() => {
          gsap.to('.hero-parallax', {
            yPercent: -18,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
          })
          gsap.to('.hero-foot', {
            opacity: 0,
            y: 40,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: '30% top', scrub: true },
          })
        }, root)
      })
    }, 3500)

    return () => {
      cancelled = true
      cancelWait()
      window.removeEventListener('paideia:intro', solidify)
      st?.kill()
      ctx?.revert()
    }
  }, [])

  useEffect(() => {
    const cta = document.getElementById('hero-cta-obras')
    if (!cta) return
    const onClick = (e: Event) => {
      e.preventDefault()
      void import('@/components/site/SmoothScroll')
        .then((m) => m.scrollToTarget('#obras', -24))
        .catch(() => {
          document.querySelector('#obras')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
    }
    cta.addEventListener('click', onClick)
    return () => cta.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      {SplitChars && titleEl ? <TitlePortal target={titleEl} SplitChars={SplitChars} /> : null}
      {Scramble && scrambleSlot ? <ScramblePortal target={scrambleSlot} Scramble={Scramble} /> : null}
    </>
  )
}
