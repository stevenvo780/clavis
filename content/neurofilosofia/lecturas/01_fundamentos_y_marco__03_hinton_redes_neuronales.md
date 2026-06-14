# 2b - Hinton - How Neural Networks Learn from Experience

## Identificacion de la fuente

Hinton, G.E. (1992). "How neural networks learn from experience." *Scientific American*, 267(3), 144–151.

Es un articulo de divulgacion cientifica, no un paper tecnico ni un texto filosofico en sentido estricto. Esto importa epistemologicamente: su estatus es el de una propuesta programatica dirigida a un publico amplio, no una demostracion formal. Se usa en el curso porque sintetiza con claridad una posicion influyente sobre aprendizaje, representacion y cognicion que tuvo impacto real en neurofilosofia.

## Idea principal

Una red puede aprender a partir de ejemplos modificando pesos entre unidades simples. Eso permite reconocimiento, clasificacion y ajuste sin suponer reglas simbolicas explicitas. Lo mas importante no es la forma de la neurona aislada, sino que el conocimiento queda distribuido en toda la red, no localizado en un punto.

## Explicacion detallada

### La neurona artificial y su comparacion biologica

Hinton presenta neuronas artificiales como unidades que reciben entradas ponderadas, las suman y pasan el resultado por una funcion de activacion (sigmoidal o umbral). La comparacion con la neurona biologica es parcial: la dendrita suma inputs, el soma integra, el axon transmite la salida. La diferencia critica es que la neurona biologica usa potenciales de accion discretos (spikes) mientras que la artificial usa valores continuos. Esta idealizacion es util pero no es descripcion literal.

### Arquitectura de capas

Una red multicapa (perceptron multicapa) combina neuronas en capa de entrada, capas ocultas y capa de salida. Las capas ocultas extraen representaciones intermedias que no estan especificadas por el disenador. Esto es lo que hace al sistema interesante filosoficamente: las representaciones emergen del entrenamiento, no del diseno.

### Aprendizaje por retropropagacion

El algoritmo central es la retropropagacion del error (backpropagation). Tiene cuatro fases:
1. Presentar un ejemplo de entrada a la red
2. Evaluar el error entre la salida obtenida y la salida correcta
3. Calcular el gradiente del error respecto a cada peso mediante la regla de la cadena
4. Actualizar los pesos en la direccion que reduce el error (descenso por gradiente)

Esto requiere un "instructor" que suministre la respuesta correcta en cada ejemplo. Es aprendizaje supervisado.

### Los cuatro limites reconocidos por el propio Hinton

1. **Requiere instructor**: necesita la salida correcta en cada ejemplo. Insostenible en entornos autonomos.
2. **Escalabilidad O(n³)**: el tiempo de calculo crece mas rapido que el tamano de la red.
3. **Minimos locales**: el espacio de error no es convexo. El gradiente estocastico puede quedar atrapado en valles suboptimos.
4. **Implausibilidad biologica**: la retropropagacion requiere simetria de pesos bidireccional y una senal de error global. Ningun mecanismo neurologico conocido soporta esto estructuralmente. Las sinapsis reales no envian senales simetricas hacia atras.

### La alternativa biologicamente plausible: aprendizaje hebbiano

La regla de Hebb (1949) propone que las conexiones se fortalecen cuando las neuronas pre y post sinaptica se activan simultaneamente: "neuronas que se disparan juntas, se conectan juntas." No requiere senal de error externa ni simetria de pesos. Oja (1982) demostro que el Analisis de Componentes Principales (PCA) puede implementarse con reglas hebbianas locales. Es mas lento y menos preciso que la retropropagacion, pero biologicamente plausible. La retropropagacion sacrifico fidelidad biologica por eficiencia computacional.

### Aprendizaje no supervisado: tres paradigmas

Hinton dedica atencion a las alternativas no supervisadas, que no requieren instructor externo:

- **PCA (Analisis de Componentes Principales)**: extrae correlaciones estadisticas dominantes del input. Reduce dimensionalidad. Implementable con reglas hebbianas. Alta plausibilidad biologica.
- **Aprendizaje competitivo (Winner-Takes-All)**: las neuronas compiten entre si. La que mas se parece al input gana y actualiza sus pesos. Produce representaciones locales (una neurona por categoria). Ejemplo: redes de Kohonen o mapas autoorganizados (SOM), que obligan a neuronas vecinas a codificar inputs similares, imitando organizacion topografica de la corteza.
- **Sparse coding (Barlow)**: cada representacion usa un subconjunto pequeno de neuronas activas. Combina economica cognitiva con decodificabilidad. Para Hinton, "los casos mas interesantes ocurren en la frontera entre el localismo extremo y la densidad extrema."

### Representaciones: locales, distribuidas y sparse

El debate sobre donde "vive" un concepto en la red:
- **Local**: una neurona representa un concepto (celula de la abuela). Fragil ante la muerte celular, incapaz de generalizar.
- **Distribuida**: el concepto es un patron de activacion sobre muchas neuronas simultaneamente. Robusto, combinatorio, interpolable.
- **Sparse (intermedia)**: un subconjunto pequeno de neuronas activas codifica cada concepto. Equilibra robustez y eficiencia.

La evidencia biologica apoya la codificacion distribuida/sparse. El experimento de Sparks con monos anestesiados es clave: al silenciar neuronas del colículo superior que controlan movimientos oculares, el ojo no se paraliza ni falla catastroficamente — promedia los vectores de las neuronas restantes. Esto confirma un calculo poblacional (codigos demograficos). Young y Yamane (RIKEN) encontraron el mismo patron para rostros en corteza temporal de monos.

### Implicaciones para filosofia de la mente

El texto de Hinton instala una posicion conexionista que tiene tres implicaciones filosoficas importantes:

1. **Contra el simbolismo clasico**: la cognicion puede ocurrir sin manipulacion explicita de simbolos con reglas. Las representaciones son sub-simbolicas.
2. **A favor de la plausibilidad neurocientifica**: los modelos conexionistas son mas cercanos a procesos neurales que los modelos de reglas (GOFAI). Pero "mas cercano" no es "identico."
3. **Programa de investigacion, no descripcion**: Hinton no esta describiendo como funciona el cerebro — esta apostando que el formalismo conexionista captura algo real. En terminos lakatianos, es una apuesta en un programa progresivo. Su valor explicativo depende de si ese programa genera predicciones novedosas sobre cognicion biologica.

### Conexion con Daugman 1992

Daugman advirtio que cada epoca interpreta el cerebro con su tecnologia dominante: hidraulica, relojeria, telegrafo, computadora. La red neuronal funciona — pero eso no la hace diferente de las metaforas anteriores, solo mas potente. El exito predictivo no cierra la pregunta ontologica: ¿explica el cerebro o es nuestra mejor herramienta actual para describirlo?

### Conexion con Bechtel 2001

Hinton asume que las redes tienen representaciones. Pero ¿que es exactamente una representacion mental? ¿Que condiciones debe cumplir algo para contar como representacion y no solo como correlato funcional? Bechtel examina precisamente esto. La convergencia cerebro-red exige responder esa pregunta primero.

### Trayectoria historica: de 1992 a hoy

- 1992 → Hinton: conexionismo distribuido, fundaciones topologicas
- 1998 → LeCun: CNN (LeNet) para reconocimiento de digitos
- 2012 → AlexNet: deep learning gana ImageNet (+10% accuracy)
- 2017 → Transformers: "Attention is all you need"
- 2020 → GPT-3: 175B parametros, emergencia de capacidades
- 2024 → LLMs y agentes: modelos de mundo generativos, separacion terminal del bio-isomorfismo

La pregunta abierta: ¿los LLMs actuales han generado predicciones corroborables sobre cognicion biologica, o han divergido hacia ingenieria pura? Si divergieron, el programa conexionista como neurofilosofia puede estar degenerando en el sentido lakatosiano.

## Preguntas criticas que deja abiertas

- Si la retropropagacion es biologicamente implaúsible, ¿que valor tiene como modelo del cerebro?
- ¿Es el exito funcional (reconocer digitos, predecir mercados) evidencia de explicacion neurocientifica?
- ¿Cuando un modelo computacional cuenta como explicacion y no solo como herramienta?
- Realizabilidad multiple (Putnam): si un mismo estado mental puede realizarse en silicio o carbono, ¿importa el sustrato? Pero si el sustrato importa (emergencia, embodiment, termodinamica), la equivalencia se rompe.

## Lo mas importante para estudiar

- Conexionismo: aprendizaje por patrones distribuidos, sin reglas simbolicas explicitas.
- Los cuatro limites de la retropropagacion y por que importan filosoficamente.
- La diferencia entre representaciones locales, distribuidas y sparse.
- El experimento de Sparks y los codigos demograficos como evidencia biologica.
- La distincion entre modelo instrumental y modelo explicativo.
- La conexion con Daugman (metafora historicamente contingente) y con Bechtel (que es representar).
- La tesis central: la red neuronal no es descripcion del cerebro, es una apuesta en un programa de investigacion.

