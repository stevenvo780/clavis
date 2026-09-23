import { wireframePaths, type SolidKey } from '@/lib/solids'

interface Props {
  solid: SolidKey
  size?: number
  className?: string
  /** Orientación de la proyección (radianes). */
  rx?: number
  ry?: number
  rz?: number
  style?: React.CSSProperties
}

/**
 * Wireframe SVG de un sólido platónico, calculado en build. Las aristas frontales se
 * dibujan con trazo (animable con `stroke-dashoffset` gracias a pathLength=1) y las
 * traseras punteadas.
 */
export default function SolidGlyph({ solid, size = 120, className = '', rx, ry, rz, style }: Props) {
  const half = size / 2
  const w = wireframePaths(solid, half * 0.86, rx, ry, rz)
  return (
    <svg
      viewBox={`${-half} ${-half} ${size} ${size}`}
      width={size}
      height={size}
      className={`solid-glyph ${className}`}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d={w.back} className="solid-glyph-back" pathLength={1} />
      <path d={w.front} className="solid-glyph-front" pathLength={1} />
      {w.points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={Math.max(1.2, size / 110)} className="solid-glyph-pt" />
      ))}
    </svg>
  )
}
