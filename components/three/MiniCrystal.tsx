'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { SolidKey } from '@/lib/solids'
import { createEdgeGeometry, createSolidGeometry, createVertexGeometry } from './morphGeometry'
import { vertexGlowFragment, vertexGlowVertex } from './shaders'
import Studio from './Studio'

const backdropVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`

// Fondo del "espécimen": halo del color del módulo y anillos concéntricos que se expanden.
const backdropFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uBase;
uniform float uTime;
varying vec2 vUv;
void main() {
  vec2 p = vUv - 0.5;
  float d = length(p);
  vec3 col = uBase;
  col += uColor * exp(-d * d * 10.0) * 0.4;
  float ring = abs(fract(d * 7.0 - uTime * 0.08) - 0.5);
  col += uColor * smoothstep(0.03, 0.0, ring) * 0.05 * smoothstep(0.7, 0.1, d);
  float beam = exp(-abs(p.y + p.x * 0.35) * 18.0) * smoothstep(0.7, 0.0, d);
  col += uColor * beam * 0.08;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`

function Backdrop({ color }: { color: string }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: backdropVertex,
        fragmentShader: backdropFragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uBase: { value: new THREE.Color('#0b1518') },
          uTime: { value: 0 },
        },
        depthWrite: false,
        depthTest: false,
      }),
    [color],
  )
  useEffect(() => () => material.dispose(), [material])
  useFrame((s) => {
    material.uniforms.uTime.value = s.clock.elapsedTime
  })
  return (
    <mesh frustumCulled={false} renderOrder={-10} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

function Specimen({ solid, color }: { solid: SolidKey; color: string }) {
  const group = useRef<THREE.Group>(null!)
  const geometry = useMemo(() => createSolidGeometry(solid), [solid])
  const edges = useMemo(() => createEdgeGeometry(solid, 1.004), [solid])
  const verts = useMemo(() => createVertexGeometry(solid), [solid])
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
      }),
    [color],
  )
  const glowMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertexGlowVertex,
        fragmentShader: vertexGlowFragment,
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: 0.9 },
          uSize: { value: 60 },
          uPixelRatio: { value: 1 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color],
  )
  useEffect(
    () => () => {
      geometry.dispose()
      edges.dispose()
      verts.dispose()
      lineMat.dispose()
      glowMat.dispose()
    },
    [geometry, edges, verts, lineMat, glowMat],
  )

  const spin = useRef(0)
  useFrame((state, dt) => {
    spin.current += Math.min(dt, 0.05) * 0.3
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, spin.current + state.pointer.x * 0.6, 4, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.35 - state.pointer.y * 0.5 + Math.sin(spin.current) * 0.15, 4, dt)
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06
    glowMat.uniforms.uPixelRatio.value = state.viewport.dpr
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <MeshTransmissionMaterial
          samples={5}
          resolution={384}
          thickness={1}
          roughness={0.03}
          ior={1.5}
          chromaticAberration={0.4}
          anisotropy={0.2}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.05}
          clearcoat={1}
          iridescence={0.6}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 800]}
          color="#ffffff"
          envMapIntensity={1.6}
        />
      </mesh>
      <lineSegments geometry={edges} material={lineMat} />
      <points geometry={verts} material={glowMat} />
    </group>
  )
}

/**
 * Cristal pequeño para la cabecera de las páginas internas: el sólido del módulo sobre
 * un fondo propio (el vidrio necesita algo detrás que refractar). Se pausa fuera de pantalla.
 */
export default function MiniCrystal({
  solid,
  color,
  active,
  onReady,
}: {
  solid: SolidKey
  color: string
  active: boolean
  onReady?: () => void
}) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.4], fov: 32 }}
      frameloop={active ? (reduced ? 'demand' : 'always') : 'never'}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Studio />
      <Backdrop color={color} />
      <Specimen solid={solid} color={color} />
    </Canvas>
  )
}
