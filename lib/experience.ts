/**
 * Estado compartido entre las secciones del DOM (que leen el scroll) y la escena WebGL.
 *
 * Es un objeto mutable a propósito: la escena lo lee en cada frame y las secciones lo
 * escriben desde ScrollTrigger, sin pasar por el ciclo de render de React.
 */

export interface SceneLayout {
  /** Desplazamiento horizontal, en fracciones del ancho visible (-0.5 … 0.5). */
  x: number
  /** Desplazamiento vertical, en fracciones del alto visible. */
  y: number
  scale: number
}

type Listener = () => void

export const experience = {
  /** Pesos objetivo de los cinco sólidos (orden de ELEMENTS). La escena los amortigua. */
  weights: [0, 0, 0, 0, 1] as number[],
  /** 0 = esfera (gota), 1 = sólido platónico nítido. */
  solidity: 0,
  layout: { x: 0.22, y: 0, scale: 0.92 } as SceneLayout,
  /** Variante para pantallas estrechas / verticales. */
  layoutMobile: { x: 0, y: 0.2, scale: 0.74 } as SceneLayout,
  /** Puntero normalizado a [-1, 1]. */
  pointer: { x: 0, y: 0 },
  /** Velocidad de scroll (px/frame) reportada por Lenis. */
  velocity: 0,
  /** Si la capa 3D debe estar visible y renderizando. */
  active: true,
  /** La escena pintó su primer frame. */
  ready: false,
  reducedMotion: false,
  /** Pide un frame nuevo cuando la escena corre en modo `demand` (movimiento reducido). */
  invalidate: (() => {}) as () => void,
}

const listeners = new Set<Listener>()

export function subscribeExperience(fn: Listener) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function emit() {
  listeners.forEach((fn) => fn())
}

export function setSceneActive(active: boolean) {
  if (experience.active === active) return
  experience.active = active
  emit()
}

export function markSceneReady() {
  if (experience.ready) return
  experience.ready = true
  emit()
}

/** Un solo elemento a peso 1 (o una mezcla continua entre `from` y `from + 1`). */
export function setElementBlend(from: number, t = 0) {
  const w = experience.weights
  for (let i = 0; i < w.length; i++) w[i] = 0
  const a = Math.max(0, Math.min(w.length - 1, Math.floor(from)))
  const b = Math.min(w.length - 1, a + 1)
  w[a] += 1 - t
  w[b] += t
  experience.invalidate()
}

export function setLayout(layout: Partial<SceneLayout>, mobile?: Partial<SceneLayout>) {
  Object.assign(experience.layout, layout)
  if (mobile) Object.assign(experience.layoutMobile, mobile)
  experience.invalidate()
}

export function setSolidity(v: number) {
  experience.solidity = v
  experience.invalidate()
}
