import { Environment, Lightformer } from '@react-three/drei'

/** Estudio de luces (sin HDR externo): tiras largas que dibujan reflejos finos en las caras. */
export default function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#05090b']} />
      {/* Tiras largas: reflejos finos y elegantes sobre las caras planas */}
      <Lightformer form="rect" intensity={6} color="#fff4e2" position={[0, 5, -6]} rotation-x={Math.PI / 2.4} scale={[12, 0.6, 1]} />
      <Lightformer form="rect" intensity={3.5} color="#ffe0b0" position={[-6, 0.5, 1]} rotation-y={Math.PI / 2} scale={[8, 0.4, 1]} />
      <Lightformer form="rect" intensity={3} color="#8ff0e0" position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[8, 0.5, 1]} />
      <Lightformer form="rect" intensity={2.2} color="#d7c8ff" position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[10, 0.5, 1]} />
      <Lightformer form="circle" intensity={2.5} color="#e0a85e" position={[3, 2.5, 5]} scale={0.8} />
    </Environment>
  )
}
