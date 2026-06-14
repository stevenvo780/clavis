# Plan de presentación — Hinton (1992): Redes Neuronales que Aprenden de la Experiencia
## Formato: Aplicación web interactiva · Duración: 20 minutos

---

## Principio rector

**El foco es el texto de Hinton y las representaciones gráficas.** Los archivos ST son herramienta de apoyo puntual: aparecen solo donde agregan algo concreto y verificable — una definición, una prueba formal, un panel de tensión filosófica. El modelo Ollama en la torre alimenta el chat lateral de IA en tiempo real durante la presentación.

---

## Resultados de validación ST (ejecutados con `st`, versión 2.6.0)

Antes de describir la presentación, estos son los resultados reales de correr los ST. Se usan directamente como contenido visual en los momentos filosóficos.

### `01_Ontologia_Base.st` — Lógica de primer orden (FOL)
Todos los checks: **◎ SATISFACIBLE**. Las cuatro derivaciones producidas por tableau de primer orden:

```
✓ GoodRepresentation(rep_alpha) → EconomicalDescription(rep_alpha)
   vía: ont_08 + ont_30 · UI: ∀xφ(x) ⊢ φ(a)

✓ GoodRepresentation(rep_alpha) → ReconstructiveCapacity(rep_alpha)
   vía: ont_09 + ont_30 · UI: ∀xφ(x) ⊢ φ(a)

✓ PopulationCode(pop_code) → DistributedCode(pop_code)
   vía: ont_10 + ont_25 · UI: ∀xφ(x) ⊢ φ(a)

✓ PopulationCode(pop_code) → RobustToLocalLoss(pop_code)
   vía: ont_11 + ont_25 · UI: ∀xφ(x) ⊢ φ(a)
```

**Lectura:** "representación" y "código poblacional" no son metáforas vagas. El ST los trata como entidades con propiedades derivables. Si algo cuenta como buena representación, debe satisfacer economía y reconstrucción — por necesidad lógica dentro del marco.

### `02_Argumento_Global.st` — Lógica proposicional
Tres cadenas inferenciales validadas sin falacias. Dos fórmulas analizadas como contingentes:

```
✓ BRAIN → INFO → REPR          (silogismo hipotético + modus ponens)
✓ BACK → MODEL → IDEAL → EPI   (modus ponens encadenado)
✓ BACK → LIMIT → UNSUP         (silogismo hipotético + modus ponens)
✓ HIER → DEEP → CONV           (silogismo hipotético + modus ponens)

GOOD → (ECON ∧ RECON)          contingente: 5 de 8 valuaciones verdaderas
(BACK→LIMIT) → (LIMIT→UNSUP)   contingente: 6 de 8 valuaciones verdaderas
```

**Lectura:** La columna vertebral del argumento de Hinton es lógicamente válida. Pero el criterio de buena representación (GOOD → ECON ∧ RECON) no es una verdad lógica — es un compromiso empírico del marco. Esto es filosóficamente importante: Hinton apuesta, no demuestra.

### `05_Presupuestos_Expandidos.st` — Proposicional + Epistémica S5 + Modal K
`INTERNAL_REPR` se deriva por **cinco caminos independientes**:

```
✓ BRAIN_COMP → INFO_REAL → INTERNAL_REPR
✓ GOOD_METRIC → GOOD_ECON ∧ GOOD_RECON → INTERNAL_REPR
✓ ROBUST_REAL → INTERNAL_REPR
✓ SPATIAL_COMP → INTERNAL_REPR
✓ UNSUP_NEC → INTERNAL_REPR

✓ K(P) → P válida en S5   (Axioma T: reflexividad del conocimiento)
◎ ◇(CONV_POSS) satisfacible en Modal K
◎ ◇(INTERNAL_REPR) satisfacible en Modal K
```

**Lectura clave:** La centralidad de las representaciones internas está sostenida desde cinco ángulos distintos — computacional, métrico, de robustez, espacial y de autoorganización. No es un capricho del texto. Además, la convergencia final es posible (◇), no necesaria (□) — Hinton no afirma una verdad eterna, sino que abre un programa de investigación.

### `06_Critica_Ontologica.st` — Proposicional + Epistémica S5 + Modal K
Las ocho objeciones se derivan correctamente. Las contradicciones son insatisfacibles:

```
✓ METAPHOR_ONLY → ¬BRAIN_COMP
✓ REPR_INSTR → ¬INTERNAL_REPR
✓ BACK_IMPL → ¬BACK_BIO
✓ METRIC_UNSTABLE → ¬GOOD_METRIC
✓ CONV_WEAK → ¬CONV_STRONG

⊘ BRAIN_COMP ∧ ¬BRAIN_COMP  → INSATISFACIBLE (contradicción real)
⊘ INTERNAL_REPR ∧ ¬INTERNAL_REPR → INSATISFACIBLE (contradicción real)

◎ ◇(¬BRAIN_COMP) satisfacible en Modal K
◎ ◇(¬INTERNAL_REPR) satisfacible en Modal K
◎ ◇(¬IDEAL_OK) satisfacible en Modal K
```

**Lectura:** La crítica no es retórica — es formalmente incompatible con el marco de Hinton. Pero tampoco es necesariamente cierta: es lógicamente posible que el cerebro no sea computacionalmente inteligible (◇¬BRAIN_COMP), que las representaciones no sean reales (◇¬INTERNAL_REPR), y que la idealización pierda lo decisivo (◇¬IDEAL_OK). Estas posibilidades están abiertas.

---

## Integración ST en la web — via npm `@stevenvo780/st-lang`

El paquete `@stevenvo780/st-lang@3.0.0` se importa en el proyecto React y se usa para correr los ST en build time (no en el navegador). Los outputs se renderizan como componentes React:

```js
// build-time script: parse_st_results.js
import { STRunner } from '@stevenvo780/st-lang'

const results = await STRunner.run('./ST_Hinton_Ontologia/01_Hinton_Ontologia_Base.st')
// results contiene: derives[], checks[], axioms[], errors[]
// Se exportan como JSON estático y se importan en los componentes
```

**En la presentación, el ST aparece como:**
- **`STDeriveCard`** — tarjeta que muestra una derivación con su prueba en lenguaje natural (pasos numerados, patron de razonamiento, premisas usadas). Toggle para ver la versión formal vs. traducida.
- **`STTensionPanel`** — panel verde/rojo con el presupuesto a la izquierda y su negación crítica a la derecha, ambos con el resultado del check.
- **`STTooltip`** — definición del `04_Diccionario.st` al hacer hover sobre términos técnicos.
- **`STModalBadge`** — insignia pequeña que muestra ◇ o □ junto a tesis que tienen validación modal.

---

## Concepto general de la web

```
Stack:  React · Three.js · D3.js · TensorFlow.js · GSAP · KaTeX · Framer Motion
API IA: Ollama qwen2.5-coder:14b en https://ollama.humanizar-dev.cloud
ST:     @stevenvo780/st-lang (build time) → JSON estático → componentes React
```

Cada sección es un componente independiente. Navegación con teclado. Modo **profesor** (fórmulas + pruebas ST visibles) / modo **público** (solo animaciones). Panel lateral de IA conectado al modelo Ollama responde preguntas del público usando el texto de Hinton y las notas filosóficas como contexto de sistema.

---

## Timing completo — 20 minutos

| # | Sección | Tiempo |
|---|---|---|
| 1 | Apertura filosófica | 1 min |
| 2 | La neurona real | 1.5 min |
| 3 | La neurona artificial | 1.5 min |
| 4 | Arquitectura de tres capas | 2 min |
| 5 | Entrenamiento: los 4 pasos | 2 min |
| 6 | Retropropagación | 2 min |
| 7 | Alcances + primera crítica | 1.5 min |
| 8 | Límites (breve) | 1 min |
| 9 | Aprendizaje no supervisado | 3 min |
| 10 | Repr. distribuidas/locales/sparse + recurrentes | 1 min |
| 11 | Códigos demográficos | 1.5 min |
| 12 | De 1992 a hoy + cierre filosófico | 2 min |
| **Total** | | **20 min** |

---

## Sección 1 — Apertura filosófica (1 min)

**Gancho narrativo:** La frase llega sola, lenta, palabra por palabra: *"El cerebro... es una computadora... notable."* Cada pausa deja que la audiencia sienta el peso de lo que se está afirmando. Luego la pregunta: ¿es eso una descripción o una apuesta?

**Qué mostrar:**
- Animación tipográfica de la frase de apertura con pausa dramática.
- Mapa de ubicación del texto en el curso: nodo "Hinton 1992" conectado a "Daugman — metáforas del cerebro" y a "Bechtel — representaciones". El texto no está solo; dialoga.
- Enunciado de la apuesta: este texto instala un marco computacional-representacional con compromisos ontológicos fuertes. Los veremos funcionar. Al final los cuestionaremos.

**ST puntual — `02_Argumento_Global`:**
Grafo animado de 5 nodos: `CEREBRO → INFORMACIÓN → REPRESENTACIÓN → MODELO → CONVERGENCIA`. Colapsable. Sin explicar la sintaxis ST — se lee como mapa del argumento.

**Librería:** GSAP para la animación tipográfica, D3.js force-graph para el mapa argumental.

---

## Sección 2 — La neurona real: ¿dónde vive la información? (1.5 min)

**Gancho narrativo:** *"Antes de hablar de neuronas artificiales, tenemos que entender qué estamos imitando — y cuánto se pierde en la imitación."*

**Qué mostrar:**
- Modelo 3D interactivo: dendrita → soma → axón → terminal sináptica. Hover ilumina cada parte con nombre y función.
- Animación del potencial de acción: pulso eléctrico viajando por el axón, llegando a la sinapsis, liberando neurotransmisores.
- Heatmap de intensidades sinápticas: la información no está en ningún lugar — está distribuida en la eficacia de miles de sinapsis.
- Aprendizaje = cambio en eficacia sináptica: animación de una sinapsis fortaleciéndose.

**ST puntual — `04_Diccionario`:** Tooltips al hacer clic en `dendrita`, `axón`, `sinapsis`, `aprendizaje`. Definiciones precisas del diccionario ST.

**Librería:** Three.js para el modelo 3D, GSAP para el potencial de acción, D3.js para el heatmap.

---

## Sección 3 — La neurona artificial: el análogo formal (1.5 min)

**Gancho narrativo:** *"Hinton no copia la neurona — la idealiza. Y esa idealización, aunque burda, es poderosa. ¿Qué se gana? ¿Qué se pierde?"*

**Qué mostrar:**
- Diagrama lado a lado: neurona real (sección anterior) ↔ unidad artificial.
- Animación de las dos etapas: suma ponderada → entrada total → función de transferencia → salida.
- Deslizadores en tiempo real: el usuario mueve pesos y ve cómo cambia la salida instantáneamente.
- Las tres funciones de transferencia animadas y comparadas: lineal, umbral, sigmoide.
- Nota filosófica: se perdió la geometría del axón, la química sináptica, la temporalidad. Idealización deliberada — el texto lo dice explícitamente (*"idealización burda"* son sus palabras).

**Librería:** D3.js para los gráficos de funciones, React sliders, Canvas para señales.

---

## Sección 4 — Arquitectura de tres capas: el flujo de la información (2 min)

**Gancho narrativo:** *"Las unidades ocultas son el corazón filosófico del modelo. Nadie les dijo qué representar. Lo descubren solas."*

**Qué mostrar:**
- Red de tres capas con nodos y conexiones coloreadas por valor de peso (rojo = positivo fuerte, azul = negativo fuerte, gris ≈ 0).
- Animación del flujo de actividad: entrada → oculta → salida, al presentar un dígito.
- Ejemplo concreto del texto: 256 entradas, 9 unidades ocultas, 10 salidas. Los 9 paneles de pesos de cada unidad oculta, tal como aparecen en el artículo original.
- Punto clave animado: modificar pesos entre entrada y capa oculta cambia qué rasgos detecta cada unidad — sin instrucciones externas sobre qué rasgo detectar.
- Demo en vivo: API al modelo en la torre, activaciones en pantalla.

**Librería:** Three.js o D3.js para la red, TensorFlow.js para ejecución local, API Ollama para demo.

---

## Sección 5 — Entrenamiento supervisado: los 4 pasos en vivo (2 min)

**Gancho narrativo:** *"El aprendizaje no es magia — es una curva de error cayendo. Y vamos a verla caer."*

**Qué mostrar:**
- Ciclo animado pausable con cuatro fases diferenciadas por color:
  1. **PRESENTAR** — imagen entra, capa de entrada se ilumina (verde).
  2. **EVALUAR** — salida generada vs. salida deseada, error aparece en rojo.
  3. **CALCULAR EP** — flechas de gradiente sobre cada conexión.
  4. **ACTUALIZAR** — pesos se mueven, el error baja.
- Control de velocidad: pausa, frame a frame, acelerar.
- Gráfica de curva de aprendizaje en tiempo real: el error cae. Visualmente satisfactorio.
- Punto filosófico: la complejidad como posicionalidad — el aprendizaje persiste y puede modificarse. Las neuronas no son el único tipo de célula que cambia, pero son las que persisten el cambio funcionalmente.

**Librería:** Canvas API para la animación, Chart.js para la curva, React para los controles.

---

## Sección 6 — Retropropagación: la matemática hecha visible (2 min)

**Gancho narrativo:** *"En 1974 Werbos lo descubrió. Nadie lo escuchó. En 1982 dos grupos lo redescubrieron de forma independiente. En 1986 Hinton lo popularizó. ¿Por qué costó 12 años que el mundo lo viera?"*

**Historia contada visualmente:** línea de tiempo animada — Werbos 1974 (punto aislado, olvidado), Rumelhart + Parker 1982 (redescubierto), Hinton + Williams + Rumelhart 1986 (publicado y aceptado).

**Qué mostrar:**
- Controles de estado secuencial: botones interactivos para ejecutar paso a paso el `→ Forward Pass` y el `← Backprop Pass`. Esta vista permite desglosar el flujo completo como un paso de detalle esencial de la arquitectura.
- La red muestra primero flujo hacia adelante (flechas verdes →), calculando activaciones capa por capa.
- Luego, en el Backprop Pass, el flujo de error hacia atrás (flechas rojas ←). El contraste es inmediato e intuitivo.
- Los 4 pasos detallados del algoritmo animados uno por uno en la etapa de retropropagación, con sus fórmulas sincronizadas en KaTeX:
  1. `EA_j = y_j − d_j`
  2. `EI_j = EA_j · y_j · (1 − y_j)`
  3. `EW_ij = EI_j · y_i`
  4. `EA_i = Σ_j EI_j · w_ij`
- Escala de color en tiempo real sobre los pesos: los que más cambian se iluminan.
- Modo público: solo flechas animadas + descripción en lenguaje natural. Modo profesor: fórmulas completas.
- Punto clave del texto: Andersen y Zipser demostraron que redes entrenadas con retropropagación desarrollaban unidades ocultas cuyas respuestas se parecían a neuronas reales de la corteza visual. La idealización produce algo biológicamente relevante.

**Librería:** Three.js para la red, KaTeX para fórmulas, GSAP para sincronización.

---

## Sección 7 — Alcances en tiempo real + primera crítica filosófica (1.5 min)

**Gancho narrativo:** *"Funciona. Reconoce dígitos, predice tasas cambiarias, detecta células precancerosas. Pero ¿está explicando cómo aprende el cerebro, o simplemente funciona?"*

**Qué mostrar:**
- Demo interactivo: el usuario dibuja un dígito a mano → la red lo clasifica en tiempo real.
- Galería visual de aplicaciones históricas del texto: dígitos, tasas cambiarias, frotis de Pap, espejos de telescopio.
- Punto de quiebre: la pregunta por el sustrato. ¿Importa si es silicio o carbono?

**ST puntual — `06_Critica_Ontologica` (STTensionPanel):**
Panel de dos columnas:

| Presupuesto (verde) | Objeción (rojo) |
|---|---|
| `BRAIN_COMP` — el cerebro es computacionalmente inteligible | `◇(¬BRAIN_COMP)` satisfacible en Modal K |
| `INTERNAL_REPR` — las representaciones son reales | `REPR_INSTR → ¬INTERNAL_REPR` válida |
| `BACK_BIO` — retropropagación es plausible biológicamente | `BACK_IMPL → ¬BACK_BIO` válida |

Abajo del panel: `⊘ BRAIN_COMP ∧ ¬BRAIN_COMP` — INSATISFACIBLE. La tensión es real, no decorativa.

**Librería:** D3.js para el panel, TensorFlow.js para la demo de dígitos.

---

## Sección 8 — Límites del modelo (1 min)

**Gancho narrativo:** *"Hinton mismo los dice. No hay que ir lejos para encontrar las grietas."*

Cuatro tarjetas animadas, una por cada límite del texto:
1. Requiere instructor con la salida correcta.
2. El tiempo de aprendizaje crece más rápido que el tamaño de la red.
3. Riesgo de mínimos locales — convergencia local, no global.
4. La retropropagación envía errores hacia atrás por las mismas conexiones: ningún mecanismo biológico conocido hace eso.

Transición: *"Si quitamos el instructor, ¿qué queda? La red aprende sola — o no aprende."*

**Librería:** Framer Motion para las tarjetas.

---

## Sección 9 — Aprendizaje no supervisado (3 min)

**Gancho narrativo:** *"La segunda mitad del texto es la más filosófica. Hinton pregunta: ¿cómo puede una red aprender a representar el mundo si nadie le dice qué es el mundo?"*

Todos los procedimientos comparten dos rasgos que el texto hace explícitos:
1. Apelan a alguna noción de **buena representación**.
2. Cambian los pesos para mejorarla.

Una buena representación: **económica** (pocos bits para describir las unidades ocultas) y **reconstructiva** (la entrada puede recuperarse aproximadamente desde las unidades ocultas).

### 9a — Componentes principales (1 min)
- Visualización: nube de puntos en alta dimensión → compresión a 2D/3D, rotable.
- Ejemplo del texto animado: cara de elipses. De un millón de píxeles a 5 parámetros (orientación, posición x, posición y, longitud, anchura). Reconstrucción perfecta desde 5 números.
- Alternativa biológicamente plausible: algoritmos de Linsker y Oja no usan retropropagación — se valen solo de correlaciones entre actividades.

### 9b — Aprendizaje competitivo (1 min)
- Animación en tiempo real: unidades compiten → una gana → sus pesos migran hacia el patrón.
- Racimos formándose: osos pardos vs. polares (ejemplo del texto).
- Contraste inmediato con PCA: allá cooperan, acá compiten. Dos filosofías de representación.

### 9c — Algoritmo de Kohonen (1 min)
- Mapa de Kohonen entrenándose en tiempo real con control de velocidad.
- Unidades físicamente cercanas aprenden patrones similares.
- Comparación directa con mapas topográficos de la corteza visual — imagen real del cerebro al lado del mapa de Kohonen.
- Punto del texto: sugiere que el cerebro usa un procedimiento similar.

**Tabla comparativa de paradigmas:**

| Paradigma | Instructor | Representación | Uso hoy |
|---|---|---|---|
| Supervisado + retropropagación | Sí | Distribuida | Clasificación, visión, voz |
| Componentes principales | No | Distribuida cooperativa | Reducción de dimensionalidad |
| Competitivo / Kohonen | No | Local (una gana) | Mapas, clustering |
| Barlow sparse coding | No | Intermedia | Codificación eficiente |
| Refuerzo (RLHF) | Señal de recompensa | Distribuida | LLMs actuales |
| Evolutivo / NAS | No | Varía | Robótica, arquitecturas |

**ST puntual — `01_Ontologia_Base` (STDeriveCard):**
Al mostrar el criterio de buena representación, aparece la derivación FOL:
- `GoodRepresentation(rep_alpha)` + `ont_08` → `EconomicalDescription(rep_alpha)` ✓ tableau
- `GoodRepresentation(rep_alpha)` + `ont_09` → `ReconstructiveCapacity(rep_alpha)` ✓ tableau

**Librería:** D3.js, TensorFlow.js para Kohonen en el navegador, Three.js para nube de puntos.

---

## Sección 10 — Representaciones distribuidas, locales, intermedias y redes recurrentes (1 min)

Esta sección cubre dos temas del texto que escapan en casi todas las presentaciones. Se integra en 1 minuto con visualizaciones directas.

**Gancho narrativo:** *"¿Cuántas neuronas necesitas para representar un concepto? ¿Una? ¿Mil? ¿Depende?"*

### Representaciones distribuidas vs. locales vs. intermedias (30 seg)
- Tres diagramas animados en paralelo:
  - **Distribuida:** muchas unidades activas juntas representan un patrón (PCA).
  - **Local:** una sola unidad activa representa un patrón (competitivo extremo).
  - **Intermedia (sparse, Barlow):** solo un pequeño subconjunto de unidades activas. Cada unidad raramente activa, pero juntas representan el patrón con reconstrucción de calidad y redundancia reducida.
- El texto de Hinton: los casos más interesantes están entre los dos extremos.

### Redes recurrentes (30 seg)
- Animación de flujo en bucle: la actividad no va solo hacia adelante, vuelve atrás.
- Dos comportamientos: estado estable (la red converge a un atractor) o dinámica temporal compleja (útil para procesos secuenciales).
- Vínculo con hoy: las LSTM y los transformers son descendientes directos de esta idea.

**Librería:** D3.js para los tres diagramas paralelos, Canvas para la animación de bucle recurrente.

---

## Sección 11 — Códigos demográficos: un concepto no vive en una sola neurona (1.5 min)

**Gancho narrativo:** *"Sparks y sus colegas anestesiaron neuronas del cerebro de un mono. El ojo no se quedó quieto — se movió al promedio de las que quedaban."*

**Qué mostrar:**
- Bump de actividad distribuida sobre muchas unidades. El usuario mueve el centro del bump, la población activa cambia.
- Experimento de Sparks animado e interactivo: el usuario "anestesia" células haciendo clic, el ojo se desvía al nuevo promedio.
- Ejemplo del rostro completo animado:
  - Unidades nasales → bump en posición A.
  - Unidades bucales → bump en posición B.
  - Si A y B predicen la misma posición facial → umbral superado → representación facial activa ✓
  - Si no coinciden → umbral no superado → sin representación facial ✗
  - Dos animaciones en paralelo mostrando ambos casos.
- Young y Yamane (RIKEN): códigos demográficos para rostros en corteza temporal de monos.
- Robustez: perder neuronas al azar tiene poco efecto sobre el promedio de la población.

**Punto filosófico:** Un concepto no existe en un lugar del cerebro. Existe distribuido. La localización cerebral modular estricta queda cuestionada. Emergentismo vs. reduccionismo.

**ST puntual — `01_Ontologia_Base` (STDeriveCard):**
```
PopulationCode(pop_code) → DistributedCode(pop_code)   ✓ tableau FOL
PopulationCode(pop_code) → RobustToLocalLoss(pop_code) ✓ tableau FOL
```
Dos líneas de lógica de primer orden que formalizan exactamente lo que muestra el experimento de Sparks.

**Librería:** D3.js para el bump animado, Canvas para el experimento ocular interactivo.

---

## Sección 12 — De 1992 a hoy + cierre filosófico (2 min)

**Gancho narrativo:** *"Hinton cierra con una esperanza cautelosa: computación y biología podrían converger. Treinta años después, ¿convergieron? ¿O se alejaron más?"*

**Qué mostrar:**
- Línea de tiempo animada: 1992 (Hinton) → CNNs (LeCun 1998) → Deep learning (AlexNet 2012) → Transformers (2017) → GPT-3 (2020) → LLMs → modelos de mundo.
- Demo en vivo desde la portátil: llamada a `qwen2.5-coder:14b` en la torre, respuesta en pantalla.
- Interpretabilidad mecanicista: visualizaciones reales de features en modelos grandes. ¿Qué "piensa" una red hoy?
- Leyes de escala de Kaplan: gráfico de parámetros vs. pérdida.
- Traducción inter-especie con redes neuronales: casos reales.

**Cierre filosófico fuerte:**
La ontología de la que parte Hinton era ya presuntuosa en 1992. Hoy esa presunción se ha multiplicado exponencialmente. Pero la ambigüedad ontológica de Hinton resulta ser una ventaja pragmática: permite construir un modelo de investigación con menos compromisos metafísicos y más capacidad predictiva. El valor epistémico del framework es más funcional como emergencia continua que como reducción acabada. Lo que sigue sin respuesta:
- El problema difícil de la conciencia.
- La ausencia de experiencia subjetiva en cualquier modelo actual.
- La pregunta por el sustrato: ¿puede el silicio hacer lo que hace el carbono?
- Los límites frente al razonamiento causal, el embodiment, la agencia real.
- ¿Es la ambigüedad ontológica productiva indefinidamente, o Kim (1999) tiene razón en que es inestable?

**ST puntual — `05_Presupuestos_Expandidos` (STModalBadge):**
Dos insignias modales al lado de las tesis finales de Hinton:
- `◇(CONV_POSS)` — satisfacible en Modal K. La convergencia es posible, no necesaria.
- `◇(¬BRAIN_COMP)` — satisfacible en Modal K. La tesis computacional del cerebro es contingente, no lógicamente necesaria.

Mensaje final: Hinton no está afirmando una verdad eterna — está apostando en un programa de investigación cuyo valor epistémico es más funcional como emergencia continua que como reducción acabada. La ambigüedad ontológica es la posición más pragmática disponible. Los ST lo hacen visible.

**Librería:** GSAP para la línea de tiempo, API Ollama para la demo en vivo, D3.js para el gráfico de escala.

---

## Mapa de uso de los ST en la presentación

| ST | Sección | Componente React | Qué muestra |
|---|---|---|---|
| `02_Argumento_Global` | 1 | `STArgGraph` | Grafo de 5 nodos colapsable |
| `04_Diccionario` | 2, 3, 4 | `STTooltip` | Definición al hacer hover |
| `06_Critica_Ontologica` | 7 | `STTensionPanel` | Panel verde/rojo presupuesto ↔ objeción |
| `01_Ontologia_Base` (FOL) | 9, 11 | `STDeriveCard` | Prueba tableau en lenguaje natural |
| `05_Presupuestos_Expandidos` (Modal K) | 12 | `STModalBadge` | ◇ junto a tesis modales |
| `03_Text_Layer` | Todas | `STCiteBadge` | Confidence al citar pasajes de Hinton |

`00_Hinton_Total` y `2b_...md.st` sirven de referencia en desarrollo; no aparecen directamente en la web.

---

## Panel de IA — Ollama en la torre

```
Endpoint: https://ollama.humanizar-dev.cloud/api/chat/completions
Modelo:   qwen2.5-coder:14b
Auth:     Bearer sk-bac7ed4eba894e0d8f14eade1dc589fe
```

El panel lateral de chat usa el modelo con el texto completo de Hinton + las notas filosóficas como contexto de sistema. Durante la presentación el público puede preguntar en tiempo real. El modelo responde en español sobre los conceptos de la presentación sin salirse del marco del texto.

---

## Temas que no deben faltar (checklist)

- [ ] La idealización como condición de productividad teórica, no como defecto
- [ ] Las unidades ocultas forman representaciones sin instrucciones explícitas
- [ ] El criterio de buena representación: economía + reconstrucción (contingente, no necesario)
- [ ] Representaciones distribuidas vs. locales vs. intermedias (Barlow sparse coding)
- [ ] Redes recurrentes y dinámica temporal
- [ ] Experimento de Sparks: el promedio poblacional como código
- [ ] La plausibilidad biológica de la retropropagación: el texto reconoce el problema pero señala vías de salida (feedback pathways)
- [ ] Andersen y Zipser: la retropropagación produce unidades que se parecen a neuronas reales
- [ ] La convergencia final es posible (◇), no necesaria (□) — Hinton apuesta
- [ ] INTERNAL_REPR se sostiene desde 5 caminos independientes — el texto está mejor construido de lo que parece
- [ ] Emergencia continua: Hinton opera como emergentista epistémico sin declararlo — P es irreducible a sus partes pero ontológicamente ambigua
- [ ] La ambigüedad ontológica como ventaja pragmática: menos compromisos metafísicos, más capacidad predictiva
- [ ] Tesis central: el valor epistémico es más funcional como emergencia continua que como reducción acabada
