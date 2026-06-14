# Notas de las redes neuronales que aprenden de la experiencia — Hinton (1992)

***

## 1. "Representar información compleja" — énfasis ontológico

Quisiera hacer énfasis en el término **"representar información compleja"**, dado que el texto abre con esta afirmación: las redes de neuronas artificiales pueden aprender a representar información compleja. Esto no es trivial: implica que el sistema adquiere estructuras internas que no le fueron dadas explícitamente. En sistemas de muchos cuerpos, como el cerebro, la epistemología para conocer el sistema no es puramente determinista, sino que se usan marcos interpretativos para dar cuenta de las irreductibilidades presentes.

Hay que remarcar también que cuando Hinton dice **"el cerebro es una computadora notable"**, esta definición demarca la ontología que guía toda la investigación: asumir la información como sustrato ontológico ya implica un compromiso filosófico considerable. Cosas como el procesamiento, los pesos y los patrones de actividad solo tienen sentido dentro de ese marco. Vale la pena señalar esto al inicio de la presentación para que la audiencia entienda desde qué perspectiva se habla.

***

## 2. Cómo funcionan las neuronas naturales — mostrar gráficamente

Conviene explicar con detalle cómo funciona la neurona biológica real y dónde "habita" la información. Según el texto:

* Una neurona recibe señales a través de las **dendritas**.
* Emite impulsos eléctricos a lo largo del **axón**, que se ramifica en miles de terminales.
* En cada extremidad hay una **sinapsis**, que convierte la actividad del axón en efectos eléctricos que inhiben o excitan a las neuronas conectadas.
* Cuando las señales excitadoras superan a las inhibidoras, la neurona dispara un breve impulso a lo largo de su axón.
* El **aprendizaje** ocurre por variación de la efectividad de las sinapsis: la influencia de una neurona sobre otra cambia.

Propongo dibujar esto en una visualización web interactiva que muestre gráfica y matemáticamente dónde se encuentra la información. El mecanismo retroactivo de ajuste de pesos puede interpretarse como una forma de simular que el cambio en la carga del axón es multivariable en muchas moléculas, lo que distribuye la información en el espacio.

***

## 3. La neurona artificial — analogía con la dendrita

El texto establece el siguiente análogo formal:

| Neurona biológica             | Red neuronal artificial                                     |
| ----------------------------- | ----------------------------------------------------------- |
| Dendrita (entrada de señales) | Unidad con entradas ponderadas                              |
| Sinapsis                      | Peso (coeficiente de ponderación) modificable               |
| Disparo del axón              | Actividad de salida (un solo número: frecuencia de disparo) |
| Aprendizaje sináptico         | Ajuste de pesos                                             |

Cada unidad artificial convierte el patrón de actividades entrantes en una sola actividad de salida mediante **dos etapas**:

1. Multiplica cada actividad entrante por su peso y suma todos los productos: obtiene la **"entrada total"**.
2. Aplica una **función de transferencia** (lineal, de umbral o sigmoide) para producir la salida.

Las unidades sigmoides son las que más se asemejan a las neuronas reales, aunque todas son idealizaciones burdas. Representar esto visualmente en la presentación es fundamental para que la audiencia no se pierda con las matemáticas.

***

## 4. Arquitectura de tres capas — representar gráficamente

El tipo más común de red neuronal organiza sus elementos en tres niveles:

* **Capa de entrada**: representa la información bruta (por ejemplo, 256 sensores de píxeles).
* **Capa oculta**: las unidades tienen libertad para construir sus propias representaciones internas. Modificando los pesos entre entrada y capa oculta, cada unidad oculta puede "decidir el papel que representa".
* **Capa de salida**: produce el resultado final (por ejemplo, qué dígito se reconoció).

Hacer una animación de cómo se pondera una matriz de neuronas es clave para que la audiencia entienda qué ocurre sin perderse en las matemáticas. Las tres capas son fáciles de ilustrar; incluso podríamos ejecutar un modelo vía API y representar sus activaciones en tiempo real desde la presentación.

***

## 5. Entrenamiento supervisado — los 4 pasos del algoritmo

El texto explica el procedimiento de entrenamiento de la siguiente manera:

1. **Presentar** a la red un ejemplo de entrenamiento (patrón de entrada + salida deseada).
2. **Calcular el error**: suma de los cuadrados de las discrepancias entre la salida real y la deseada.
3. **Modificar los pesos** para reducir el error, en proporción a la derivada del error respecto a cada peso (llamada EP, "error de peso").
4. **Repetir** con muchos ejemplos hasta que la red clasifique correctamente.

El algoritmo que hace esto eficientemente es la **retropropagación** (backpropagation), desarrollado inicialmente por Paul Werbos (1974) y popularizado por Rumelhart, Williams y Hinton en 1986. Hacer una animación amigable de estos 4 pasos e ilustrar dónde ocurren los eventos de retropropagación, con la matemática que los produce, es esencial.

Aquí quiero remarcar filosóficamente la importancia de la **complejidad como posicionalidad en el espacio y el tiempo**, y el rol fundamental de las neuronas frente a otros tipos de células por ese carácter de persistir el aprendizaje y también poder modificarlo.

***

## 6. El algoritmo de retropropagación — matemática ilustrada

El algoritmo opera en cuatro pasos para calcular los EP de forma eficiente:

1. **EA (error de actividad) en la salida**: diferencia entre actividad real y deseada — `EA_j = y_j - d_j`.
2. **EI (error de ingreso)**: tasa de cambio del error al variar la entrada total de una unidad de salida — `EI_j = EA_j * y_j * (1 - y_j)` (derivada de la función sigmoide).
3. **EP (error de peso)**: variación del error al modificar un peso entrante — `EP_ij = EI_j * y_i`.
4. **Retropropagación al nivel inferior**: el EA de una unidad oculta se calcula multiplicando los EI de las unidades de salida a las que está conectada por los pesos correspondientes y sumando. Este es el paso crucial que permite aplicar el algoritmo a redes profundas.

***

## 7. Alcances y límites del modelo — demostración en tiempo real

Mostrar en tiempo real los alcances del modelo: reconocimiento de dígitos manuscritos, predicción de tasas cambiarias, identificación de células precancerosas, ajuste de espejos de telescopios. Aquí surge la pregunta filosófica: las dinámicas fenomenológicas o racionales frente a las materiales, y la pregunta por el sustrato. ¿Esto es posible, pero a qué costo?

**Límites del modelo:**

* Requiere un instructor que proporcione la salida deseada (aprendizaje supervisado).
* El tiempo de aprendizaje crece mucho más rápidamente que el tamaño de la red.
* Riesgo de converger a mínimos locales en lugar de la solución globalmente óptima.
* La retropropagación no es biológicamente plausible tal como está formulada: requiere que el sistema conozca exactamente cuál debería ser la salida.

No quiero detenerme demasiado en los límites del modelo de 1992, sino señalarlos brevemente para pasar a lo que sabemos hoy: transformers, modelos de mundo, arquitecturas multicapa con escalamiento en chips especializados. Hay que criticar la ontología de base —ya bastante presuntuosa al hablar de "información"— pero siguiéndole el juego al marco se puede mostrar hasta dónde ha llegado la investigación.

***

## 8. Aprendizaje no supervisado — ilustrar con gráficos

Cuando la red recibe muchos patrones de entrada sin que se le diga qué hacer con ellos, los procedimientos no supervisados ajustan los pesos buscando **representaciones económicas**. El texto identifica dos estrategias principales:

### Componentes principales

* Un pequeño número de unidades ocultas **coopera** para representar el patrón.
* Se extraen las componentes de variación compartidas por muchas entradas.
* Si las actividades de pares de unidades de entrada guardan correlación, es un desperdicio describir cada una por separado; mejor extraer y describir las componentes principales.

### Aprendizaje competitivo

* Un gran número de unidades ocultas **compiten** entre sí.
* Solo una unidad oculta "gana" y representa cada patrón de entrada.
* La unidad ganadora es aquella cuyos pesos incidentes más se asemejan al patrón de entrada; sus pesos se ajustan para acercarse aún más.

### Algoritmo de Kohonen

Teuvo Kohonen (Universidad de Helsinki) introdujo una modificación importante: no solo adapta los pesos de la unidad ganadora, sino también los de las **unidades vecinas** físicamente adyacentes. Esto hace que unidades cercanas aprendan a representar patrones similares, sugiriendo que el cerebro podría usar un procedimiento similar para crear los **mapas topográficos** hallados en la corteza visual.

Propongo hacer una representación gráfica funcional de este algoritmo. También construir una tabla comparativa de todos los paradigmas de aprendizaje presentes hoy en día (supervisado, no supervisado, por refuerzo, evolutivo, etc.) con sus costos y fortalezas.

***

## 9. La idea de "buena representación" — aclarar y confrontar

Todos los procedimientos de aprendizaje no supervisado comparten dos características:

1. Apelan, implícita o explícitamente, a cierta noción de la **calidad de la representación**.
2. Funcionan cambiando los pesos para **mejorar** esa representación en las unidades ocultas.

En general, una representación de calidad admite una **descripción económica** y contiene, no obstante, información suficiente para **reconstruir** la entrada con buena aproximación. El costo de codificación y el costo de reconstrucción deben minimizarse conjuntamente.

Aquí hay que aclarar cuál es esa idea de representación mental y hacer una comparación más profunda entre aprendizaje supervisado, retropropagación y los demás paradigmas competidores.

***

## 10. Códigos demográficos o poblacionales — representación gráfica y funcional

El texto propone que el cerebro usa **códigos demográficos**: la información se representa mediante toda una **población de neuronas activas**, no en una sola célula. Esto quedó evidenciado en los experimentos de David Sparks (Universidad de Alabama): el movimiento ocular se codifica por la actividad de una población entera de células, y el movimiento resultante corresponde al **promedio** de todos los movimientos codificados por las células activas.

> "Esto permite imaginar jerarquías de representaciones cada vez más económicas. Por ejemplo, una red que recibe la imagen de un rostro podría contar con conjuntos de unidades especializadas en narices, bocas y ojos. La presencia de un rostro produciría prominencias de actividad en cada uno de esos subconjuntos. Esa descripción ya sería más económica que la imagen bruta, pero sería aún mejor si pudiera resumirse en una sola prominencia de actividad en un conjunto de unidades faciales."

Este fragmento es relevante para explicar cómo el cerebro tiene características irreductibles, y sirve de base para una comparación filosófica entre explicación reductiva y emergente a nivel filosófico y epistémico.

> "Pero los umbrales de las unidades faciales se fijan de modo que la nariz, por sí sola, no baste para activarlas. Si la boca también genera una prominencia compatible en el mismo lugar, ambas contribuciones se suman y entonces sí se activa la representación facial. De este modo, la red verifica que las partes están correctamente relacionadas porque predicen la misma estructura global."

Esto sirve para explicar la **localización múltiple de un concepto en el cerebro**: un concepto no existe en una sección específica; existe distribuido en muchas regiones al mismo tiempo. La codificación poblacional resulta además robusta ante lesiones: la pérdida de un subconjunto de neuronas tomado al azar tiene escasos efectos sobre el promedio de la población.

***

## 11. Aprendizaje jerárquico y redes profundas — extrapolación a los LLM actuales

El texto anticipa la idea de jerarquías de representaciones progresivamente más económicas. Esto es exactamente lo que ocurre en los **modelos de lenguaje de gran escala (LLM)** actuales: cada capa extrae representaciones más abstractas que la anterior.

En este punto quiero mostrar qué tan lejos puede ir el estudio del cerebro con redes neuronales de gran tamaño. Temas relevantes: la interpretabilidad mecanicista (*mechanistic interpretability*), nuevos tipos de unidades digitales, la emergencia de conceptos internos en modelos grandes, y cómo se forman representaciones que nadie programó explícitamente.

**Panorama actual:**

* Transformers y atención multi-cabeza.
* Modelos de mundo (*world models*).
* Escalamiento con chips especializados (TPUs, GPUs, NPUs).
* Aprendizaje por refuerzo con retroalimentación humana (RLHF).
* Traducción de información inter-especie con redes neuronales.

**Límites frente al problema de la mente:**

* El problema difícil de la conciencia.
* La ausencia de experiencia subjetiva.
* La pregunta por el sustrato.

Mostrar lo máximo de hoy pero también las limitantes en torno al problema de la mente. La ontología de la que parte el texto ya es bastante presuntuosa al hablar de "información": hay que criticarla con fuerza, pero siguiéndole el juego se puede mostrar cuánto más sabemos hoy en día.



La mejor forma de resolver problemas es todo con redes neuronales ? yo diria que no para hacer claculo las calculadoras siempre seran superiores y hay que desmitificar a la IA no es las mas eficiente en todo y siempre tendra mas costo que otras soluciones