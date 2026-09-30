import puppeteer from 'puppeteer-core'

// Regresiones: contenido visible al entrar, rutas/anchors, móvil y vuelta a portada.
// Ejecutar contra un export servido por HTTP o contra la URL publicada.
const base = new URL(process.argv[2] || 'http://127.0.0.1:4370/')
const failures = []
const internal = new Map()
const mainRoutes = ['/', '/ponencias/', '/buscar/', '/griego/', '/neurofilosofia/', '/filosofia-ciudad/']
const response = await fetch(new URL('sitemap.xml', base))
if (!response.ok) throw new Error(`Sitemap: HTTP ${response.status}`)
const routes = [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => new URL(m[1].replaceAll('&amp;', '&')).pathname)
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader', '--use-gl=angle', '--use-angle=swiftshader'],
})

async function inspect(page, path, delay = 150) {
  const errors = []
  const onError = (error) => errors.push(error.message)
  page.on('pageerror', onError)
  try {
    const r = await page.goto(new URL(path, base).href, { waitUntil: 'domcontentloaded', timeout: 30000 })
    // Chrome puede conservar el cuerpo y devolver 304 al revalidar la navegación.
    if (!r?.ok() && r?.status() !== 304) failures.push({ path, error: `HTTP ${r?.status()}` })
    await new Promise((resolve) => setTimeout(resolve, delay))
    const result = await page.evaluate(() => {
      const visible = (el) => {
        for (let node = el; node instanceof HTMLElement; node = node.parentElement) {
          const s = getComputedStyle(node)
          if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < 0.05) return false
        }
        return true
      }
      const hidden = [...document.querySelectorAll('main [data-reveal]')].filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0 && !visible(el)
      }).map((el) => el.textContent.trim().slice(0, 70))
      return {
        h1: document.querySelectorAll('main h1').length,
        titleVisible: [...document.querySelectorAll('main h1')].every((h1) => visible(h1) && [...h1.querySelectorAll('.split-char')].every(visible)),
        overflow: document.documentElement.scrollWidth - innerWidth,
        hidden,
        images: [...document.querySelectorAll('main img')].filter((img) => img.complete && !img.naturalWidth).map((img) => img.src),
        links: [...document.querySelectorAll('a[href]')].map((a) => a.href),
        ids: [...document.querySelectorAll('[id]')].map((el) => el.id),
      }
    })
    if (result.h1 !== 1) failures.push({ path, error: `${result.h1} encabezados h1` })
    if (!result.titleVisible) failures.push({ path, error: 'Título de la vista oculto' })
    if (result.overflow > 1) failures.push({ path, error: `Desborde horizontal: ${result.overflow}px` })
    if (result.hidden.length) failures.push({ path, error: 'Contenido inicial oculto', details: result.hidden })
    if (result.images.length) failures.push({ path, error: 'Imágenes rotas', details: result.images })
    if (errors.length) failures.push({ path, error: 'Errores de navegador', details: errors })
    internal.set(path, { links: result.links, ids: new Set(result.ids) })
  } catch (error) {
    failures.push({ path, error: error.message })
  } finally {
    page.off('pageerror', onError)
  }
}

try {
  // Entradas nuevas: evita que un manager ya montado esconda el retraso de arranque.
  for (const width of [320, 390, 768, 1440]) {
    for (const route of mainRoutes) {
      const context = await browser.createBrowserContext()
      const page = await context.newPage()
      await page.setViewport({ width, height: 900 })
      await inspect(page, route, 1500)
      await context.close()
    }
  }
  // Archivo completo en móvil con movimiento reducido, incluidas sus referencias.
  let next = 0
  await Promise.all(Array.from({ length: 3 }, async () => {
    const context = await browser.createBrowserContext()
    const page = await context.newPage()
    await page.setViewport({ width: 320, height: 740 })
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    while (next < routes.length) {
      const route = routes[next++]
      await inspect(page, route)
    }
    await context.close()
  }))
  // Solo comprobar references publicadas; un anchor del documento debe existir.
  for (const [path, data] of internal) {
    for (const href of new Set(data.links)) {
      const url = new URL(href)
      if (url.origin !== base.origin) continue
      const targetPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`
      const target = internal.get(targetPath)
      if (target) {
        if (url.hash && !target.ids.has(decodeURIComponent(url.hash.slice(1)))) {
          failures.push({ path, error: 'Anchor inexistente', href })
        }
      } else if (url.pathname !== '/trabajos/' && url.pathname !== '/trabajos') {
        const r = await fetch(url)
        if (!r.ok) failures.push({ path, error: `Referencia HTTP ${r.status}`, href })
      }
    }
  }
  // Reproduce el removeChild de HeroEnhance al desmontar la portada.
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })
  const navigationErrors = []
  page.on('pageerror', (error) => navigationErrors.push(error.message))
  await page.goto(base.href, { waitUntil: 'domcontentloaded' })
  await new Promise((resolve) => setTimeout(resolve, 11000))
  await page.click('.site-nav a[href^="/ponencias"]')
  await page.waitForFunction(() => location.pathname.startsWith('/ponencias'))
  await page.click('.brand-word')
  await page.waitForFunction(() => location.pathname === '/' && !!document.querySelector('#hero-title'))
  if (navigationErrors.length) failures.push({ path: 'SPA home → ponencias → home', error: navigationErrors })
  const congress = await page.$eval('.hero a[href*="congreso-filosofia"]', (a) => ({ text: a.textContent, target: a.target, rel: a.rel }))
  if (!congress.text.includes('Congreso') || congress.target !== '_blank' || !congress.rel.includes('noopener')) {
    failures.push({ path: '/', error: 'Acceso al congreso incompleto', congress })
  }
  await page.click('.site-nav a[href^="/buscar"]')
  await page.waitForSelector('input[type="search"]')
  await page.type('input[type="search"]', 'congreso')
  await page.waitForSelector('.search-hit[href*="congreso-filosofia"]')
  const searchCongress = await page.$eval('.search-hit[href*="congreso-filosofia"]', (a) => a.textContent)
  if (!searchCongress.includes('Congreso de filosofía')) failures.push({ path: '/buscar/', error: 'Congreso no reconocible en búsqueda' })
  const query = async (value) => {
    await page.$eval('input[type="search"]', (input) => input.select())
    await page.keyboard.type(value)
  }
  await query('de')
  await page.waitForSelector('.search-pager')
  const firstPage = await page.$eval('.search-hit', (a) => a.href)
  await page.click('.search-pager button:last-child')
  await page.waitForFunction((first) => document.querySelector('.search-hit')?.href !== first, {}, firstPage)
  const count = await page.$$eval('.search-hit', (links) => links.length)
  if (count > 20) failures.push({ path: '/buscar/', error: 'Paginación supera 20 resultados' })
  await page.click('.search-filters button:nth-child(2)')
  const moduleLinks = await page.$$eval('.search-hit', (links) => links.map((a) => a.href))
  if (moduleLinks.some((href) => !new URL(href).pathname.startsWith('/griego/'))) failures.push({ path: '/buscar/', error: 'Filtro de módulo incorrecto' })
  await query('zxqvnoexiste')
  await page.waitForSelector('.search-empty')
  await page.click('.search-filters button:first-child')
  await page.click('.search-clear')
  await page.waitForSelector('.search-idle')
  await page.click('.search-suggestions button')
  await page.waitForSelector('.search-hit')
  await page.setViewport({ width: 320, height: 740 })
  await page.click('.menu-toggle')
  await page.waitForSelector('.menu-toggle[aria-expanded="true"]')
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press('Tab')
    const trapped = await page.evaluate(() => !!document.activeElement?.closest('#menu-overlay, .menu-toggle'))
    if (!trapped) failures.push({ path: 'Menú móvil', error: 'El foco sale del menú abierto' })
  }
  await page.keyboard.press('Escape')
  await page.waitForSelector('.menu-toggle[aria-expanded="false"]')
  if (navigationErrors.length) failures.push({ path: 'Navegación y búsqueda', error: navigationErrors })
  await page.close()
  const noJs = await browser.newPage()
  await noJs.setJavaScriptEnabled(false)
  await noJs.setViewport({ width: 320, height: 740 })
  for (const route of ['/', '/ponencias/', '/griego/']) await inspect(noJs, route)
  await noJs.close()
} catch (error) {
  failures.push({ path: 'Prueba integrada', error: error.message })
} finally {
  await browser.close()
}

const unique = [...new Map(failures.map((failure) => [JSON.stringify(failure), failure])).values()]
console.log(JSON.stringify({ base: base.href, routes: routes.length, firstLoadChecks: mainRoutes.length * 4, failures: unique }, null, 2))
process.exitCode = unique.length ? 1 : 0
