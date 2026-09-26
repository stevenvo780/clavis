/** Shared idle/LCP gate so GSAP/R3F/SplitChars stay off the boot path (W3-PAI-01). */

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Wait for a real LCP entry (PerformanceObserver) OR a hard fallback, then idle.
 *
 * Critical: a buffered LCP at ~1s must NOT unlock SplitChars/GSAP — mutating
 * #hero-title mid-window lets .split-char steal LCP (Beta 4.6–4.9s race). Always
 * enforce a wall-clock floor ≥8s from registration before running.
 */
export function afterLcpThenIdle(run: () => void, deferMs = 8000): () => void {
  const w = window as IdleWindow
  let idleId = 0
  let waitId = 0
  let idleFallbackId = 0
  let cancelled = false
  let po: PerformanceObserver | null = null
  let fired = false
  let lcpSeen = false
  const started = performance.now()
  const minMs = Math.max(8000, deferMs)

  const scheduleIdle = () => {
    if (cancelled || fired) return
    fired = true
    po?.disconnect()
    po = null
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => {
        if (!cancelled) run()
      }, { timeout: 2000 })
    } else {
      idleFallbackId = window.setTimeout(() => {
        if (!cancelled) run()
      }, 50)
    }
  }

  /** Only proceed once minMs has elapsed (and LCP seen or backup fired). */
  const tryGo = () => {
    if (cancelled || fired) return
    if (!lcpSeen) return
    const elapsed = performance.now() - started
    const remain = minMs - elapsed
    if (remain > 0) {
      waitId = window.setTimeout(tryGo, remain)
      return
    }
    scheduleIdle()
  }

  try {
    if (typeof PerformanceObserver !== 'undefined') {
      po = new PerformanceObserver((list) => {
        if (!list.getEntries().length) return
        lcpSeen = true
        // Do NOT scheduleIdle immediately — buffered early LCP is not "safe to mutate".
        tryGo()
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    }
  } catch {
    /* backup path below */
  }

  // Hard fallback ≥8s: unlock even if LCP never reports (hidden tab / old engines).
  const backup = window.setTimeout(() => {
    lcpSeen = true
    tryGo()
  }, minMs)

  return () => {
    cancelled = true
    po?.disconnect()
    if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
    if (waitId) window.clearTimeout(waitId)
    if (idleFallbackId) window.clearTimeout(idleFallbackId)
    window.clearTimeout(backup)
  }
}

export async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)
  return { gsap, ScrollTrigger }
}
