'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, PerformanceMonitor } from '@react-three/drei'
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { ELEMENTS } from '@/lib/elements'
import { experience, markSceneReady } from '@/lib/experience'
import { createEdgeGeometry, createMorphGeometry, createSolidGeometry, createVertexGeometry } from './morphGeometry'
import {
  auroraFragment,
  auroraVertex,
  starsFragment,
  starsVertex,
  vertexGlowFragment,
  vertexGlowVertex,
} from './shaders'
import Studio from './Studio'

interface Quality {
  tier: 'high' | 'low'
  detail: number
  samples: number
  resolution: number
  backside: boolean
  stars: number
  dpr: [number, number]
}

const HIGH: Quality = { tier: 'high', detail: 34, samples: 8, resolution: 768, backside: true, stars: 1600, dpr: [1, 1.75] }
const LOW: Quality = { tier: 'low', detail: 20, samples: 4, resolution: 320, backside: false, stars: 700, dpr: [1, 1.25] }

function initialQuality(): Quality {
  if (typeof window === 'undefined') return HIGH
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const small = window.innerWidth < 768
  const weak = (navigator.hardwareConcurrency ?? 8) <= 4
  return coarse || small || weak ? LOW : HIGH
}

const damp = THREE.MathUtils.damp
const smooth = THREE.MathUtils.smoothstep
const PRIORITY = -1 // antes del pase de transmisión (prioridad 0) y sin tomar el control del render

// Paleta en espacio lineal (THREE.Color convierte desde sRGB).
const PALETTE = ELEMENTS.map((e) => e.colores.map((c) => new THREE.Color(c)))
const BASE = new THREE.Color('#081013')

/** Estado amortiguado que leen todos los objetos de la escena. Lo actualiza <Director/>. */
const live = {
  weights: [0, 0, 0, 0, 1],
  solidity: 0,
  x: 0.22,
  y: 0,
  scale: 0.92,
  spin: 0,
  px: 0,
  py: 0,
  time: 0,
}

function Director() {
  const invalidate = useThree((s) => s.invalidate)
  const frames = useRef(0)

  useEffect(() => {
    experience.invalidate = () => invalidate()
    return () => {
      experience.invalidate = () => {}
    }
  }, [invalidate])

  useFrame((state, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20)
    const rm = experience.reducedMotion
    const k = rm ? 1000 : 1
    const narrow = state.size.width < 768 || state.size.width / state.size.height < 0.85
    const layout = narrow ? experience.layoutMobile : experience.layout
    for (let i = 0; i < live.weights.length; i++) live.weights[i] = damp(live.weights[i], experience.weights[i], 3.4 * k, dt)
    live.solidity = damp(live.solidity, experience.solidity, 2.4 * k, dt)
    live.x = damp(live.x, layout.x, 2.2 * k, dt)
    live.y = damp(live.y, layout.y, 2.2 * k, dt)
    live.scale = damp(live.scale, layout.scale, 2.2 * k, dt)
    live.px = damp(live.px, rm ? 0 : experience.pointer.x, 2.5, dt)
    live.py = damp(live.py, rm ? 0 : experience.pointer.y, 2.5, dt)
    if (!rm) {
      const v = Math.min(Math.abs(experience.velocity), 80)
      live.spin += dt * (0.14 + v * 0.012)
      live.time += dt
    }
    // En modo `demand` (movimiento reducido) solo se pintan los frames pedidos: basta uno,
    // y se pide otro para que el pase de transmisión ya tenga el fondo.
    frames.current++
    if (frames.current === (rm ? 1 : 3)) {
      markSceneReady()
      if (rm) invalidate()
    }
  }, PRIORITY)
  return null
}

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null!)
  useFrame((state) => {
    const vp = state.viewport
    const fit = Math.min(1, vp.width / 3.1)
    const intro = 0.72 + 0.28 * live.solidity
    group.current.position.set(live.x * vp.width, live.y * vp.height, 0)
    group.current.scale.setScalar(live.scale * fit * intro)
    state.camera.position.x = live.px * 0.35
    state.camera.position.y = live.py * 0.22
    state.camera.lookAt(0, 0, 0)
  }, PRIORITY)
  return <group ref={group}>{children}</group>
}

function SolidGroup({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null!)
  const mesh = useRef<THREE.Mesh>(null!)
  const geometry = useMemo(() => createMorphGeometry(quality.detail), [quality.detail])
  const crisp = useMemo(() => ELEMENTS.map((e) => createSolidGeometry(e.solido)), [])

  useLayoutEffect(() => {
    mesh.current.updateMorphTargets()
  }, [geometry])
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => crisp.forEach((g) => g.dispose()), [crisp])

  useFrame(() => {
    const m = mesh.current
    const infl = m.morphTargetInfluences
    if (!infl) return
    let sum = 0
    let peak = 0
    let top = 0
    live.weights.forEach((w, i) => {
      sum += w
      if (w > peak) {
        peak = w
        top = i
      }
    })
    sum = Math.max(sum, 1e-5)
    // A mitad de una transición el cristal se "funde" un poco hacia la esfera.
    const melt = 1 - smooth(peak / sum, 0.5, 1)
    const s = live.solidity * (1 - 0.4 * melt)
    for (let i = 0; i < infl.length; i++) infl[i] = (live.weights[i] / sum) * s

    // En reposo, el sólido exacto; durante la transformación, la malla morfable.
    const settled = s > 0.997 && peak / sum > 0.997
    const target = settled ? crisp[top] : geometry
    if (m.geometry !== target) m.geometry = target

    const g = group.current
    g.rotation.y = live.spin + live.px * 0.4
    g.rotation.x = 0.32 + Math.sin(live.spin * 0.37) * 0.22 - live.py * 0.3
    g.rotation.z = Math.sin(live.spin * 0.23) * 0.12
  }, PRIORITY)

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry} frustumCulled={false}>
        <MeshTransmissionMaterial
          key={quality.tier}
          samples={quality.samples}
          resolution={quality.resolution}
          backside={quality.backside}
          backsideThickness={0.25}
          thickness={1.1}
          roughness={0.02}
          ior={1.55}
          chromaticAberration={0.45}
          anisotropy={0.2}
          distortion={0.25}
          distortionScale={0.35}
          temporalDistortion={0.06}
          clearcoat={1}
          clearcoatRoughness={0.03}
          iridescence={0.7}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 800]}
          attenuationDistance={6}
          attenuationColor="#fff2df"
          color="#ffffff"
          envMapIntensity={1.6}
        />
      </mesh>
      <Edges />
      <VertexGlow />
    </group>
  )
}

function Edges() {
  const items = useMemo(
    () =>
      ELEMENTS.map((e) => ({
        geometry: createEdgeGeometry(e.solido),
        material: new THREE.LineBasicMaterial({
          color: e.colores[2],
          transparent: true,
          opacity: 0,
          depthWrite: false,
          toneMapped: false,
          blending: THREE.AdditiveBlending,
        }),
      })),
    [],
  )
  useEffect(
    () => () =>
      items.forEach((it) => {
        it.geometry.dispose()
        it.material.dispose()
      }),
    [items],
  )
  useFrame(() => {
    items.forEach((it, i) => {
      const w = live.weights[i]
      it.material.opacity = Math.pow(Math.min(1, w), 4) * 0.6 * smooth(live.solidity, 0.6, 1)
      it.material.visible = it.material.opacity > 0.002
    })
  }, PRIORITY)
  return (
    <>
      {items.map((it, i) => (
        <lineSegments key={i} geometry={it.geometry} material={it.material} />
      ))}
    </>
  )
}

function VertexGlow() {
  const dpr = useThree((s) => s.viewport.dpr)
  const items = useMemo(
    () =>
      ELEMENTS.map((e) => ({
        geometry: createVertexGeometry(e.solido),
        material: new THREE.ShaderMaterial({
          vertexShader: vertexGlowVertex,
          fragmentShader: vertexGlowFragment,
          uniforms: {
            uColor: { value: new THREE.Color(e.colores[2]) },
            uOpacity: { value: 0 },
            uSize: { value: 70 },
            uPixelRatio: { value: 1 },
          },
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      })),
    [],
  )
  useEffect(
    () => () =>
      items.forEach((it) => {
        it.geometry.dispose()
        it.material.dispose()
      }),
    [items],
  )
  useFrame(() => {
    items.forEach((it, i) => {
      const o = Math.pow(Math.min(1, live.weights[i]), 4) * smooth(live.solidity, 0.7, 1)
      it.material.uniforms.uOpacity.value = o
      it.material.uniforms.uPixelRatio.value = dpr
      it.material.visible = o > 0.002
    })
  }, PRIORITY)
  return (
    <>
      {items.map((it, i) => (
        <points key={i} geometry={it.geometry} material={it.material} />
      ))}
    </>
  )
}

/** Esfera armilar: anillos de oro que orbitan el cristal (el cosmos del Timeo). */
function Armillary() {
  const rings = useRef<(THREE.Group | null)[]>([])
  const spec = useMemo<{ r: number; tilt: [number, number, number]; speed: number; bead: number }[]>(
    () => [
      { r: 1.62, tilt: [Math.PI / 2.1, 0, 0.35], speed: 0.1, bead: 0.028 },
      { r: 1.76, tilt: [0.45, 0.2, -0.7], speed: -0.07, bead: 0.022 },
      { r: 1.9, tilt: [1.15, -0.5, 0.1], speed: 0.045, bead: 0.034 },
    ],
    [],
  )
  useFrame(() => {
    rings.current.forEach((g, i) => {
      if (g) g.rotation.z = live.time * spec[i].speed * 2 + i
    })
  }, PRIORITY)
  return (
    <group>
      {spec.map((s, i) => (
        <group key={i} rotation={s.tilt}>
          <group ref={(el) => void (rings.current[i] = el)}>
            <mesh>
              <torusGeometry args={[s.r, 0.0042, 6, 320]} />
              <meshStandardMaterial
                color="#e0a85e"
                emissive="#b8873a"
                emissiveIntensity={0.35}
                metalness={1}
                roughness={0.25}
                envMapIntensity={1.5}
              />
            </mesh>
            <mesh position={[s.r, 0, 0]}>
              <sphereGeometry args={[s.bead, 16, 16]} />
              <meshStandardMaterial color="#ffd9a0" emissive="#e0a85e" emissiveIntensity={0.9} metalness={0.6} roughness={0.2} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  )
}

function Stars({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null!)
  const dpr = useThree((s) => s.viewport.dpr)
  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const seed = new Float32Array(count)
    const scale = new Float32Array(count)
    let s = 1234567
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    for (let i = 0; i < count; i++) {
      const u = rand() * 2 - 1
      const th = rand() * Math.PI * 2
      const r = 3.2 + Math.pow(rand(), 0.6) * 11
      const q = Math.sqrt(1 - u * u)
      pos[i * 3] = q * Math.cos(th) * r * 1.4
      pos[i * 3 + 1] = u * r * 0.8
      pos[i * 3 + 2] = q * Math.sin(th) * r - 4
      seed[i] = rand()
      scale[i] = 0.35 + Math.pow(rand(), 3) * 1.6
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
    return g
  }, [count])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: starsVertex,
        fragmentShader: starsFragment,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: { value: 1 },
          uSize: { value: 42 },
          uColorA: { value: new THREE.Color('#f3dcb2') },
          uColorB: { value: new THREE.Color('#8ff0e0') },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  )
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])
  useFrame(() => {
    material.uniforms.uTime.value = live.time
    material.uniforms.uPixelRatio.value = dpr
    group.current.rotation.y = live.time * 0.012 + live.px * 0.08
    group.current.rotation.x = live.py * 0.05
  }, PRIORITY)
  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  )
}

function Aurora() {
  const size = useThree((s) => s.size)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: auroraVertex,
        fragmentShader: auroraFragment,
        uniforms: {
          uTime: { value: 0 },
          uAspect: { value: new THREE.Vector2(1, 1) },
          uPointer: { value: new THREE.Vector2() },
          uCenter: { value: new THREE.Vector2() },
          uBase: { value: BASE.clone() },
          uA: { value: new THREE.Color() },
          uB: { value: new THREE.Color() },
          uC: { value: new THREE.Color() },
          uIntensity: { value: 1 },
        },
        depthWrite: false,
        depthTest: false,
      }),
    [],
  )
  useEffect(() => () => material.dispose(), [material])
  const tmp = useMemo(() => new THREE.Color(), [])
  useFrame(() => {
    const u = material.uniforms
    const aspect = size.width / Math.max(1, size.height)
    u.uTime.value = live.time
    u.uAspect.value.set(aspect, 1)
    u.uPointer.value.set(live.px, live.py)
    u.uCenter.value.set(live.x * aspect, live.y)
    ;(['uA', 'uB', 'uC'] as const).forEach((key, slot) => {
      const c = u[key].value as THREE.Color
      c.setRGB(0, 0, 0)
      live.weights.forEach((w, i) => {
        tmp.copy(PALETTE[i][slot]).multiplyScalar(w)
        c.add(tmp)
      })
    })
    u.uIntensity.value = 0.55 + 0.45 * live.solidity
  }, PRIORITY)
  return (
    <mesh frustumCulled={false} renderOrder={-10} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

export default function CrystalCanvas({ active }: { active: boolean }) {
  const [quality, setQuality] = useState<Quality>(initialQuality)
  const reduced = experience.reducedMotion

  return (
    <Canvas
      className="scene-canvas"
      dpr={quality.dpr}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      camera={{ position: [0, 0, 7], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: quality.tier === 'high', powerPreference: 'high-performance', alpha: false, stencil: false }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <PerformanceMonitor flipflops={2} onDecline={() => setQuality(LOW)} />
      <Director />
      <Studio />
      <Aurora />
      <Stars count={quality.stars} />
      <Rig>
        <SolidGroup quality={quality} />
        <Armillary />
      </Rig>
    </Canvas>
  )
}
