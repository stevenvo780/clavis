import Link from 'next/link'
import MiniCrystalSlot from '@/components/three/MiniCrystalSlot'
import Scramble from '@/components/visual/Scramble'

export default function NotFound() {
  return (
    <div className="page container-wide">
      <div className="notfound">
        <div className="notfound-visual">
          <MiniCrystalSlot solid="hexaedro" color="#c0522a" label="404 · aporía" />
        </div>
        <div className="notfound-text">
          <p className="section-label">
            <span className="section-num">404</span> Página no encontrada · Page not found
          </p>
          <h1 className="notfound-title" lang="grc">
            <Scramble text="ἀπορία" trigger="mount" duration={1.4} />
          </h1>
          <p className="notfound-desc">
            <em>Aporía</em>: sin camino. Esta ruta no lleva a ningún documento — quizá se movió o nunca existió.
          </p>
          <div className="notfound-actions">
            <Link href="/" className="btn-pill">
              <span className="btn-pill-fill" aria-hidden="true" />
              <span className="btn-pill-text">Volver al inicio</span>
              <span className="btn-pill-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link href="/buscar" className="btn-line">
              Buscar en el portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
