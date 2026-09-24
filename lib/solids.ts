/**
 * Geometría pura de los cinco sólidos platónicos (sin dependencias).
 *
 * La usan tanto la escena WebGL (planos de cara para el morph del cristal,
 * aristas doradas) como el render estático de wireframes SVG en las tarjetas.
 */

export type Vec3 = [number, number, number]

export type SolidKey = 'tetraedro' | 'octaedro' | 'icosaedro' | 'hexaedro' | 'dodecaedro'

const PHI = (1 + Math.sqrt(5)) / 2
const IPHI = 1 / PHI

const signs = [1, -1]

function cyclic([x, y, z]: Vec3): Vec3[] {
  return [
    [x, y, z],
    [z, x, y],
    [y, z, x],
  ]
}

function expandSigns(v: Vec3): Vec3[] {
  const out: Vec3[] = []
  for (const sx of v[0] === 0 ? [1] : signs)
    for (const sy of v[1] === 0 ? [1] : signs)
      for (const sz of v[2] === 0 ? [1] : signs) out.push([v[0] * sx, v[1] * sy, v[2] * sz])
  return out
}

function unitCircumradius(vs: Vec3[]): Vec3[] {
  const r = Math.hypot(...vs[0])
  return vs.map((v) => [v[0] / r, v[1] / r, v[2] / r])
}

const RAW: Record<SolidKey, Vec3[]> = {
  tetraedro: [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
  ],
  hexaedro: expandSigns([1, 1, 1]),
  octaedro: cyclic([1, 0, 0]).flatMap((v) => expandSigns(v)),
  icosaedro: cyclic([0, 1, PHI]).flatMap((v) => expandSigns(v)),
  dodecaedro: [...expandSigns([1, 1, 1]), ...cyclic([0, IPHI, PHI]).flatMap((v) => expandSigns(v))],
}

const cache = new Map<string, unknown>()
function memo<T>(key: string, fn: () => T): T {
  if (!cache.has(key)) cache.set(key, fn())
  return cache.get(key) as T
}

/** Vértices normalizados a circunradio 1. */
export function solidVertices(key: SolidKey): Vec3[] {
  return memo(`v:${key}`, () => unitCircumradius(RAW[key]))
}

const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
]

/** Aristas: pares de vértices a la distancia mínima (vale para todo sólido platónico). */
export function solidEdges(key: SolidKey): [number, number][] {
  return memo(`e:${key}`, () => {
    const vs = solidVertices(key)
    let min = Infinity
    for (let i = 0; i < vs.length; i++)
      for (let j = i + 1; j < vs.length; j++) min = Math.min(min, Math.hypot(...sub(vs[i], vs[j])))
    const out: [number, number][] = []
    for (let i = 0; i < vs.length; i++)
      for (let j = i + 1; j < vs.length; j++)
        if (Math.hypot(...sub(vs[i], vs[j])) < min * 1.001) out.push([i, j])
    return out
  })
}

/**
 * Planos de las caras (normal exterior unitaria + distancia al origen), por casco convexo
 * de fuerza bruta: a lo sumo 20 vértices, así que sobra.
 */
export function solidFaces(key: SolidKey): { n: Vec3; d: number }[] {
  return memo(`f:${key}`, () => {
    const vs = solidVertices(key)
    const faces: { n: Vec3; d: number }[] = []
    for (let i = 0; i < vs.length; i++)
      for (let j = i + 1; j < vs.length; j++)
        for (let k = j + 1; k < vs.length; k++) {
          let n = cross(sub(vs[j], vs[i]), sub(vs[k], vs[i]))
          const len = Math.hypot(...n)
          if (len < 1e-9) continue
          n = [n[0] / len, n[1] / len, n[2] / len]
          let d = dot(n, vs[i])
          if (d < 0) {
            n = [-n[0], -n[1], -n[2]]
            d = -d
          }
          if (d < 1e-6) continue
          if (!vs.every((v) => dot(n, v) <= d + 1e-6)) continue
          if (faces.some((f) => dot(f.n, n) > 1 - 1e-6)) continue
          faces.push({ n, d })
        }
    return faces
  })
}

// Giro en Y, luego en X, luego en Z.
function rotate([x, y, z]: Vec3, rx: number, ry: number, rz = 0): Vec3 {
  const x1 = x * Math.cos(ry) + z * Math.sin(ry)
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry)
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx)
  return [x1 * Math.cos(rz) - y2 * Math.sin(rz), x1 * Math.sin(rz) + y2 * Math.cos(rz), z2]
}

export interface Wireframe {
  /** Aristas cuyo punto medio queda hacia el espectador. */
  front: string
  /** Aristas traseras (se dibujan tenues / punteadas). */
  back: string
  points: [number, number][]
}

/** Proyección ortográfica de las aristas a paths SVG, centrada en (0,0) con radio `size`. */
export function wireframePaths(key: SolidKey, size: number, rx = -0.45, ry = 0.62, rz = 0): Wireframe {
  const vs = solidVertices(key).map((v) => rotate(v, rx, ry, rz))
  const f = (n: number) => (Math.round(n * 100) / 100).toString()
  let front = ''
  let back = ''
  for (const [a, b] of solidEdges(key)) {
    const seg = `M${f(vs[a][0] * size)} ${f(-vs[a][1] * size)}L${f(vs[b][0] * size)} ${f(-vs[b][1] * size)}`
    if ((vs[a][2] + vs[b][2]) / 2 >= -0.05) front += seg
    else back += seg
  }
  return { front, back, points: vs.map((v) => [v[0] * size, -v[1] * size]) }
}

export const SOLID_FACTS: Record<SolidKey, { caras: number; forma: string; vertices: number; aristas: number }> = {
  tetraedro: { caras: 4, forma: 'triángulos', vertices: 4, aristas: 6 },
  octaedro: { caras: 8, forma: 'triángulos', vertices: 6, aristas: 12 },
  icosaedro: { caras: 20, forma: 'triángulos', vertices: 12, aristas: 30 },
  hexaedro: { caras: 6, forma: 'cuadrados', vertices: 8, aristas: 12 },
  dodecaedro: { caras: 12, forma: 'pentágonos', vertices: 20, aristas: 30 },
}
