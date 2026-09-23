# Paideia — Architecture

## Overview

Static Next.js 15 portal for digital humanities. No database, no auth, no runtime server.
Deployed as fully static export on Vercel. All content is Markdown from four source repos.

## Source repos (cloned in _sources/)

| Repo | Role in Paideia |
|---|---|
| helenikos | Design reference only (Next.js 15 + Tailwind app with auth/DB — not reused directly; its visual language and component structure informed the layout) |
| GriegoFinal | Primary content for the Griego Clasico module: 2 clases (Clase 2 y 3), glosario, glosario tecnico, traducciones (completa/literal/solucion final), analisis morfologico, taller |
| neurofilosofia | Primary content for the Neurofilosofia module: 210 MD files across 10 folders (Inicio, Clases, Lecturas, Autores, Temas, Visualizaciones, Referencia, Bibliografia, Evaluacion, Ensayos, LogicaFormal) |
| FilosofiaCiudad | Primary content for the Filosofia de la Ciudad module: 97 MD files across 5 folders (Gestion_Codex, Clases, Lecturas_Base, Trabajos/Ponencias, Recursos_Tecnicos) |

## Content pipeline

```
_sources/<repo>/**/*.md
        |
        v
content/<module>/<section>/*.md    (static copy, cleaned of agent/CI files)
        |
        v
lib/content.ts                     (gray-matter parse, slug generation, excerpt)
        |
        v
app/<module>/page.tsx              (module index — static)
app/<module>/[slug]/page.tsx       (article — generateStaticParams)
app/buscar/page.tsx                (search index passed to client component)
```

## Directory layout

```
/tmp/revive/paideia/
├── app/
│   ├── layout.tsx                 # Global nav + footer
│   ├── page.tsx                   # Landing (bilingual es/en)
│   ├── griego/
│   │   ├── page.tsx               # Module index
│   │   └── [slug]/page.tsx        # Article viewer
│   ├── neurofilosofia/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── filosofia-ciudad/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── buscar/
│       ├── page.tsx               # Passes item index to client
│       └── SearchClient.tsx       # Client-side instant search
├── components/
│   ├── MarkdownRenderer.tsx       # marked-based MD->HTML (static content, owner-authored)
│   ├── ModuleIndex.tsx            # Card grid grouped by section
│   └── ModuleSidebar.tsx          # Sticky sidebar for article pages
├── lib/
│   └── content.ts                 # FS reader, slugifier, getAllContent, searchContent
├── content/
│   ├── griego/
│   │   ├── clases/                # 3 lesson MDs
│   │   ├── glosario/              # Glosario + GlosarioTecnico
│   │   ├── traducciones/          # TraduccionCompleta, Literal, SolucionFinal
│   │   └── AnalisisMorfologico.md, TallerGriego.md
│   ├── neurofilosofia/
│   │   ├── clases/                # 1 synthesis/notes MD per clase session
│   │   ├── autores/               # 25 author files
│   │   ├── temas/                 # 8 cross-cutting theme files
│   │   ├── referencia/            # Glosario, author table, text table
│   │   └── ensayos/               # 3 essays
│   └── filosofia-ciudad/
│       ├── clases/                # 5 clase MDs (one per session folder)
│       ├── lecturas/              # Flattened as <Autor>__<file>.md
│       └── trabajos/              # Ponencia Yuk Hui + other papers
└── _sources/                      # Raw clones (not deployed)
```

## Experiencia inmersiva (portada y cromo)

La portada es una galería inmersiva construida sobre los cinco sólidos platónicos del
*Timeo*: cada obra de `app/trabajos/works.ts` tiene un `elemento` (fuego, aire, agua,
tierra, cosmos) y la escena 3D se transforma en el sólido correspondiente al hacer scroll.

```
lib/solids.ts            geometría pura de los 5 sólidos (vértices, aristas, caras, wireframes SVG)
lib/elements.ts          los 5 elementos del Timeo: griego, sólido, tema, colores
lib/experience.ts        estado mutable compartido DOM ↔ escena (pesos, layout, puntero, velocidad)
components/three/        escena WebGL (React Three Fiber + drei), cargada solo en cliente
  CrystalCanvas.tsx      cristal morfable (MeshTransmissionMaterial), esfera armilar, estrellas, fondo shader
  morphGeometry.ts       icoesfera con 5 morph targets + sólidos exactos para el reposo
  MiniCrystal*.tsx       cristal pequeño de las cabeceras internas (se pausa fuera de pantalla)
components/home/         secciones de la portada; useSceneSection.ts coordina la escena por sección
components/site/         cromo global: Lenis + GSAP ScrollTrigger, revelados, cursor, preloader, cabecera
app/styles/*.css         chrome.css (global), home.css (portada), pages.css (páginas internas)
```

- **Revelados**: cualquier elemento con `data-reveal="up|fade|clip|split|card"` se anima al
  entrar en pantalla (`RevealManager`). Los estados iniciales solo aplican bajo `html.js`, así
  que sin JavaScript todo queda visible.
- **Rendimiento**: three.js se carga con import dinámico (no está en el bundle inicial); la
  escena baja de calidad con `PerformanceMonitor` y deja de renderizar (`frameloop="never"`)
  en las secciones que no la muestran.
- **Accesibilidad**: con `prefers-reduced-motion` no hay preloader, scroll suave ni animaciones
  de entrada, y la escena se pinta estática (`frameloop="demand"`). Sin WebGL2 se muestra un
  wireframe SVG del sólido.

## Tech choices

- **Next.js 15** App Router, TypeScript, Tailwind CSS v4
- **three.js + @react-three/fiber + drei** for the WebGL scenes; **GSAP ScrollTrigger + Lenis** for scroll choreography
- **marked** for MD to HTML (no MDX build overhead; content is render-only)
- **gray-matter** for frontmatter parsing
- **No auth, no DB, no API routes** — 100% static

## Module color system

| Module | Accent |
|---|---|
| Griego Clasico | amber |
| Neurofilosofia | violet |
| Filosofia de la Ciudad | teal |

## Bilingual strategy

Landing page and module descriptions are written in Spanish (primary) with English
translations inline in italic. Article content remains in the source language (Spanish).

## Search

Client-side only: the search page passes all items (slug, title, section, module, excerpt)
as a JSON prop to `SearchClient.tsx`. No server roundtrip. Full-content search would
require shipping the full MD corpus to the client; excerpt-based search covers the main
use case at minimal bundle cost.

## Adding content

1. Drop `.md` files into the relevant `content/<module>/<section>/` folder.
2. Run `npm run build` — `generateStaticParams` picks them up automatically.
3. No code changes needed.
