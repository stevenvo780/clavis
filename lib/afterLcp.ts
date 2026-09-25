/** Shared idle/LCP gate so GSAP/R3F stay off the boot path (W3-PAI-01). */

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/** Wait for LCP (or hard timeout), then requestIdleCallback before running. */
export function afterLcpThenIdle(run: () => void, deferMs = 4000): () => void {
  const w = window as IdleWindow
  let idleId = 0
  let timeoutId = 0
  let cancelled = false
  let po: PerformanceObserver | null = null
  let fired = false

  const scheduleIdle = () => {
    if (cancelled) return
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(() => {
        if (!cancelled) run()
      }, { timeout: deferMs })
    } else {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) run()
      }, deferMs)
    }
  }

  const onLcpOrFallback = () => {
    if (fired || cancelled) return
    fired = true
    po?.disconnect()
    po = null
    scheduleIdle()
  }

  try {
    if (typeof PerformanceObserver !== 'undefined') {
      po = new PerformanceObserver((list) => {
        if (list.getEntries().length) onLcpOrFallback()
      })
      po.observe({ type: 'largest-contentful-paint', buffered: true })
    } else {
      scheduleIdle()
    }
  } catch {
    scheduleIdle()
  }

  const backup = window.setTimeout(onLcpOrFallback, deferMs)

  return () => {
    cancelled = true
    po?.disconnect()
    if (idleId && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
    if (timeoutId) window.clearTimeout(timeoutId)
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
