import Link from 'next/link'
import SolidGlyph from '@/components/visual/SolidGlyph'

const ECOSYSTEM = [
  { href: 'https://www.stevenvallejo.com/es#filosofia', label: 'Filosofía' },
  { href: 'https://www.stevenvallejo.com/es#ciencias', label: 'Ciencias' },
  { href: 'https://www.stevenvallejo.com/es#informatica', label: 'Informática' },
  { href: 'https://www.stevenvallejo.com/es#ingenieria', label: 'Ingeniería' },
]

const ARCHIVE = [
  { href: '/griego', label: 'Griego clásico' },
  { href: '/neurofilosofia', label: 'Neurofilosofía' },
  { href: '/filosofia-ciudad', label: 'Filosofía de la ciudad' },
  { href: '/ponencias', label: 'Ponencias' },
  { href: '/buscar', label: 'Buscar' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-intro" data-reveal="up">
          <SolidGlyph solid="dodecaedro" size={64} className="site-footer-glyph" />
          <p className="site-footer-lead">
            Paideía — portal de humanidades
            <br />
            <span className="text-muted">
              por{' '}
              <a
                href="https://www.stevenvallejo.com"
                className="link-underline"
                aria-label="Steven Vallejo (sitio personal)"
              >
                Steven Vallejo
              </a>
            </span>
          </p>
          <p className="site-footer-sub">Classical Greek • Neurophilosophy • Philosophy of the City</p>
        </div>

        <nav className="site-footer-col" aria-label="Archivo" data-reveal="up" style={{ '--d': '80ms' } as React.CSSProperties}>
          <p className="eyebrow">Archivo</p>
          {ARCHIVE.map((l) => (
            <Link key={l.href} href={l.href} className="site-footer-link">
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="site-footer-col" aria-label="Ecosistema" data-reveal="up" style={{ '--d': '160ms' } as React.CSSProperties}>
          <p className="eyebrow">Parte de Mouseîon</p>
          {ECOSYSTEM.map((l) => (
            <a key={l.href} href={l.href} className="site-footer-link">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="site-footer-wordmark" aria-hidden="true">
        <span>Paideía</span>
      </div>

      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Steven Vallejo</span>
        <span lang="grc">ἀγεωμέτρητος μηδεὶς εἰσίτω</span>
      </div>
    </footer>
  )
}
