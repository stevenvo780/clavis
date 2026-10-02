import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { createElement, Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

// Usa el compilador del proyecto, sin otro ejecutor ni artefactos en el repositorio.
const source = await readFile(new URL('../lib/search.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2017 },
})
const { foldSearchText: fold, getSearchParts } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

function checkParts(text, query, expectedMatches) {
  const parts = getSearchParts(text, query)
  assert.equal(parts.map((part) => part.text).join(''), text, 'Conservar el original exacto')
  assert.deepEqual(parts.filter((part) => part.matched).map((part) => part.text), expectedMatches)
  const markup = renderToStaticMarkup(createElement(Fragment, null, ...parts.map((part, index) =>
    part.matched ? createElement('mark', { key: index }, part.text) : part.text,
  )))
  assert.equal(markup.replaceAll(/<\/?mark>/g, ''), renderToStaticMarkup(text), 'Quitar <mark> conserva el texto y su escape HTML')
}

for (const [word, plain] of [['Platón', 'platon'], ['λόγος', 'λογος'], ['ἄνθρωπος', 'ανθρωπος']]) {
  test(`${word}: texto y consulta NFC/NFD, sin acentos y en mayúsculas`, () => {
    for (const text of [word, word.normalize('NFD')]) {
      assert.equal(fold(text), plain)
      for (const query of [word, word.normalize('NFD'), plain, word[0].toUpperCase() + word.slice(1)]) {
        assert.ok(fold(`Antes ${text} después`).includes(fold(query)))
        checkParts(`Antes ${text} después`, query, [text])
      }
    }
  })
}

test('Coincidencias repetidas con composición mixta y offsets anteriores al término', () => {
  const decomposed = 'Platón'.normalize('NFD')
  const text = `α\u0301 😀 Platón / ${decomposed} / PLATÓN!`
  checkParts(text, decomposed, ['Platón', decomposed, 'PLATÓN'])
  checkParts('λόγος λο\u0301γος λόγος', 'λο\u0301γος', ['λόγος', 'λο\u0301γος', 'λόγος'])
  checkParts('ἄνθρωπος α\u0313\u0301νθρωπος ἄνθρωπος', 'ανθρωπος', ['ἄνθρωπος', 'α\u0313\u0301νθρωπος', 'ἄνθρωπος'])
})

test('Los acentos al final de una coincidencia pertenecen al resaltado', () => {
  checkParts('cafe\u0301, cafe\u0301', 'café', ['cafe\u0301', 'cafe\u0301'])
  checkParts('α\u0313\u0301νθρωπος', 'ἄν', ['α\u0313\u0301ν'])
  checkParts('o\u0301\u0323 / o\u0323\u0301', 'ó', ['o\u0301\u0323', 'o\u0323\u0301'])
})

test('Marcas sueltas, incluidas las ajenas al bloque diacrítico básico', () => {
  assert.equal(fold('\u0301\u1ab0\u1dc0\u20d0\ufe20'), '')
  checkParts('\u0301Platón\u1ab0!', 'platon', ['Platón\u1ab0'])
  checkParts('cafe\u1ab0', 'cafe', ['cafe\u1ab0'])
})

test('Pares sustitutos y descomposiciones de varias letras no pierden texto', () => {
  assert.equal(fold('😀'), '😀')
  checkParts('😀 Platón 😀 Plato\u0301n 😀', '😀', ['😀', '😀', '😀'])
  // U+AC00 se descompone en dos jamos; las coincidencias no duplican el original.
  checkParts('각가', '\u1100', ['각', '가'])
  checkParts('각가', '\u1161', ['각', '가'])
  checkParts('가가가', '\u1161\u1100', ['가가가'])
})

test('Consultas vacías, sin coincidencias y coincidencias adyacentes', () => {
  for (const query of ['', '\u0301', 'ausente']) checkParts('Platón & <λόγος> 😀', query, [])
  checkParts('', 'platon', [])
  checkParts('aaaaa', 'aa', ['aa', 'aa'])
  checkParts('Plató\u0301nPlatón', 'platon', ['Plató\u0301n', 'Platón'])
  checkParts('<λόγος> & λόγος', 'λογος', ['λόγος', 'λόγος'])
})
