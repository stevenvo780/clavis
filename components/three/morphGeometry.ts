import * as THREE from 'three'
import { ELEMENTS } from '@/lib/elements'
import { solidEdges, solidFaces, solidVertices, type SolidKey } from '@/lib/solids'

/**
 * Circunradio visual de cada sólido. La esfera base tiene radio 1; los sólidos más
 * "puntiagudos" necesitan un circunradio mayor para que su masa visual sea parecida.
 */
export const VISUAL_RADIUS: Record<SolidKey, number> = {
  tetraedro: 1.45,
  octaedro: 1.3,
  hexaedro: 1.26,
  icosaedro: 1.16,
  dodecaedro: 1.16,
}

/**
 * Geometría morfable: una icoesfera muy subdividida (no indexada) cuyos vértices se
 * proyectan radialmente sobre la superficie de cada sólido platónico. Como todos los
 * destinos comparten la dirección de cada vértice, mezclar dos morph targets es una
 * interpolación radial limpia entre dos poliedros convexos.
 *
 * La normal de cada vértice en un destino es la de la cara que lo contiene, así las
 * caras quedan planas y las aristas se leen como un bisel fino.
 */
export function createMorphGeometry(detail: number) {
  const geometry = new THREE.IcosahedronGeometry(1, detail)
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute
  const count = pos.count

  const dirs = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const z = pos.getZ(i)
    const l = Math.hypot(x, y, z)
    dirs[i * 3] = x / l
    dirs[i * 3 + 1] = y / l
    dirs[i * 3 + 2] = z / l
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(dirs.slice(), 3))
  geometry.setAttribute('normal', new THREE.BufferAttribute(dirs.slice(), 3))

  const morphPos: THREE.BufferAttribute[] = []
  const morphNor: THREE.BufferAttribute[] = []

  for (const el of ELEMENTS) {
    const faces = solidFaces(el.solido)
    const scale = VISUAL_RADIUS[el.solido]
    // Distancia a la que el rayo desde el centro en (dx, dy, dz) sale del sólido.
    const hit = (dx: number, dy: number, dz: number) => {
      let best = Infinity
      for (const face of faces) {
        const cos = face.n[0] * dx + face.n[1] * dy + face.n[2] * dz
        if (cos > 1e-6) best = Math.min(best, face.d / cos)
      }
      return best
    }

    const p = new Float32Array(count * 3)
    const n = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const dx = dirs[i * 3]
      const dy = dirs[i * 3 + 1]
      const dz = dirs[i * 3 + 2]
      const r = hit(dx, dy, dz) * scale
      p[i * 3] = dx * r
      p[i * 3 + 1] = dy * r
      p[i * 3 + 2] = dz * r
    }
    // Normal geométrica plana por triángulo. En las caras coincide con la normal del sólido;
    // en los triángulos que cruzan una arista es la del bisel, siempre orientada hacia
    // afuera (una normal de cara "prestada" podría mirar hacia atrás y pintarse negra).
    for (let t = 0; t < count; t += 3) {
      const ax = p[t * 3], ay = p[t * 3 + 1], az = p[t * 3 + 2]
      const e1x = p[t * 3 + 3] - ax, e1y = p[t * 3 + 4] - ay, e1z = p[t * 3 + 5] - az
      const e2x = p[t * 3 + 6] - ax, e2y = p[t * 3 + 7] - ay, e2z = p[t * 3 + 8] - az
      let nx = e1y * e2z - e1z * e2y
      let ny = e1z * e2x - e1x * e2z
      let nz = e1x * e2y - e1y * e2x
      const l = Math.hypot(nx, ny, nz) || 1
      nx /= l
      ny /= l
      nz /= l
      if (nx * ax + ny * ay + nz * az < 0) {
        nx = -nx
        ny = -ny
        nz = -nz
      }
      for (let k = 0; k < 3; k++) n.set([nx, ny, nz], (t + k) * 3)
    }
    morphPos.push(new THREE.BufferAttribute(p, 3))
    morphNor.push(new THREE.BufferAttribute(n, 3))
  }

  geometry.morphAttributes.position = morphPos
  geometry.morphAttributes.normal = morphNor
  geometry.morphTargetsRelative = false
  geometry.computeBoundingSphere()
  return geometry
}

/**
 * El sólido exacto (caras planas, aristas vivas), al mismo tamaño que su morph target.
 * La escena lo usa en reposo: la icoesfera morfable corta un poco las esquinas.
 */
export function createSolidGeometry(key: SolidKey) {
  const vs = solidVertices(key)
  const s = VISUAL_RADIUS[key]
  const pos: number[] = []
  const nor: number[] = []
  for (const { n, d } of solidFaces(key)) {
    const ring = vs.filter((v) => Math.abs(v[0] * n[0] + v[1] * n[1] + v[2] * n[2] - d) < 1e-5)
    const c = ring.reduce((a, v) => [a[0] + v[0] / ring.length, a[1] + v[1] / ring.length, a[2] + v[2] / ring.length], [0, 0, 0])
    // Base ortonormal del plano de la cara para ordenar sus vértices por ángulo.
    const u = new THREE.Vector3(ring[0][0] - c[0], ring[0][1] - c[1], ring[0][2] - c[2]).normalize()
    const w = new THREE.Vector3(...n).cross(u)
    const angle = (v: number[]) => {
      const q = new THREE.Vector3(v[0] - c[0], v[1] - c[1], v[2] - c[2])
      return Math.atan2(q.dot(w), q.dot(u))
    }
    ring.sort((a, b) => angle(a) - angle(b))
    for (let i = 1; i < ring.length - 1; i++) {
      for (const v of [ring[0], ring[i], ring[i + 1]]) {
        pos.push(v[0] * s, v[1] * s, v[2] * s)
        nor.push(n[0], n[1], n[2])
      }
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3))
  g.computeBoundingSphere()
  return g
}

/** Aristas de un sólido como LineSegments, al mismo tamaño que su morph target. */
export function createEdgeGeometry(key: SolidKey, inflate = 1.006) {
  const vs = solidVertices(key)
  const s = VISUAL_RADIUS[key] * inflate
  const edges = solidEdges(key)
  const arr = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], i) => {
    arr.set([vs[a][0] * s, vs[a][1] * s, vs[a][2] * s, vs[b][0] * s, vs[b][1] * s, vs[b][2] * s], i * 6)
  })
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
  return g
}

/** Vértices de un sólido (para los puntos de luz en cada esquina). */
export function createVertexGeometry(key: SolidKey, inflate = 1.012) {
  const s = VISUAL_RADIUS[key] * inflate
  const arr = new Float32Array(solidVertices(key).flatMap((v) => [v[0] * s, v[1] * s, v[2] * s]))
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
  return g
}
