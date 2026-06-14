# Guion Completo de Presentacion — Hinton (1992)

## Uso recomendado

Este guion esta pensado para la presentacion web actual sobre Geoffrey Hinton y su texto:

> Hinton, G. E. (1992). "How Neural Networks Learn from Experience." *Scientific American*, 267(3), 144-151.

No esta escrito para leerlo palabra por palabra como libreto teatral. La idea es que te sirva como base oral clara, segura y flexible.

### Tesis central de la presentacion

La idea que debe quedar al final es esta:

**La red neuronal artificial no es una descripcion del cerebro, sino una apuesta en un programa de investigacion cuyo valor epistemico es mas funcional como emergencia continua que como reduccion acabada. La ambiguedad ontologica de Hinton no es un defecto: es lo que permite construir un modelo con menos compromisos metafisicos y mas capacidad predictiva — la posicion mas pragmatica disponible.**

### Modo recomendado al presentar

- Usa el **modo publico** como modo principal.
- Usa el **modo profesor** solo si quieres mostrar una formula o responder una pregunta tecnica.
- No dependas del panel de IA en vivo.
- Si ves que el tiempo se aprieta, recorta primero las secciones S02, S09 y S12b.

---

## Apertura general antes de empezar

Hola. Hoy voy a presentar el texto de Geoffrey Hinton de 1992 sobre como aprenden las redes neuronales a partir de la experiencia.

Mi interes no es solo explicar como funciona tecnicamente una red, sino mostrar por que este texto fue importante para la filosofia de las neurociencias.

La pregunta de fondo que atraviesa toda la presentacion es esta:

**cuando Hinton dice que el cerebro aprende formando representaciones internas, esta describiendo realmente el cerebro o esta proponiendo un modelo muy poderoso para investigarlo?**

Con esa pregunta en mente, empiezo.

---

## Slide S00 — Intro (animacion cerebro + QR)

### Que mostrar

- Animacion 3D de nodos neuronales flotantes con pulsos de luz.
- Boton de acceso movil con codigo QR (hinton.stevenvallejo.com).

### Que decir

Mientras el publico entra, esta pantalla puede estar corriendo. No hay que decir nada si la presentacion todavia no empezo.

Si quieres abrir formalmente puedes decir:

> "Pueden escanear el QR para seguir la presentacion desde su movil. La aplicacion es interactiva — en cualquier momento pueden explorar los diagramas desde su pantalla."

`[Click → Boton QR / "Acceso movil"]`

Al hacer clic aparece el modal con el codigo QR y el enlace directo. Deja unos segundos para que el publico escanee. Cierra el modal con Escape o volviendo a hacer clic, y luego avanzas al slide siguiente.

Luego avanzas al slide siguiente y arranca el guion propiamente dicho.

### Nota practica

S00 no necesita dialogo sustantivo. Su funcion es crear ambiente y dar acceso movil al publico. Avanza rapido.

---

## Slide S01 — Apertura filosofica

### Que mostrar

- Animacion tipografica: "La maquina... que aprende... a ser... cerebro."
- Pregunta: descripcion o apuesta.
- Mapa argumental: CEREBRO → INFORMACION → REPRESENTACION → MODELO → CONVERGENCIA.
- Contexto en el curso: Daugman — Hinton — Bechtel.
- Cita bibliografica.

### Que decir

Quiero empezar con la frase que organiza todo el texto: La maquina que aprende a ser cerebro.

Esa frase suena fuerte, y precisamente por eso me interesa. Yo no la voy a tomar como una verdad obvia, sino como una apuesta. Hinton esta proponiendo una forma de investigar la mente y el cerebro desde el aprendizaje, la representacion y la computacion.

En ese sentido, este texto no solo habla de redes neuronales artificiales. Tambien propone una imagen de la cognicion: la idea de que aprender consiste en construir representaciones internas utiles del mundo.

Por eso este texto dialoga muy bien con dos autores del curso. Con Daugman, porque nos obliga a preguntar si "el cerebro como computadora" es una descripcion o una metafora historicamente poderosa. Y con Bechtel, porque si Hinton habla de representaciones, entonces tenemos que preguntar que cuenta realmente como representacion.

Mi punto de partida va a ser este: Hinton abre un programa de investigacion potente, pero eso no significa que todo lo que el modelo hace explique directamente como funciona el cerebro biologico.

### Frase puente

Para entender esa apuesta, primero hay que mirar que es lo que Hinton esta simplificando.

---

## Slide S02 — La neurona real

### Que mostrar

- Modelo 3D interactivo: dendrita, soma, axon, sinapsis (botones con info al hacer clic).
- Leyenda de flujo de senal: dendritica → integracion soma → potencial de accion → liberacion sinaptica.
- Comparativa: cerebro humano vs red de Hinton (1992).

### Que decir

Antes de llegar a la neurona artificial, vale la pena detenernos un momento en la neurona biologica. Lo primero que se ve aqui es complejidad material: geometria, ramificaciones, procesos electroquimicos, sinapsis y plasticidad.

Voy a ir haciendo clic en cada parte para que veamos que hace cada una.

**Al hacer clic en Dendrita:**

Las dendritas reciben senales de otras neuronas. Cada senal llega ponderada: unas excitan, otras inhiben. La suma de todas esas entradas es lo que determina si la neurona va a disparar. En la red artificial, esto corresponde al vector de entrada.

**Al hacer clic en Soma:**

El soma es el cuerpo de la neurona, donde se integran todas las senales que llegaron. Si la suma total supera un umbral, la neurona dispara un potencial de accion. En la red artificial, esto corresponde a la funcion de activacion que decide si la unidad "se enciende".

**Al hacer clic en Axon:**

El axon conduce el potencial de accion desde el soma hasta los terminales sinapticos. La mielina que lo recubre acelera esa conduccion. En la red artificial, esto corresponde a la salida numerica de la unidad.

**Al hacer clic en Sinapsis:**

La sinapsis es la zona de contacto entre dos neuronas, donde se liberan neurotransmisores. Lo clave es esto: la eficacia sinaptica puede cambiar con la experiencia. Eso es lo que Hinton va a conservar como el corazon de su modelo. En la red artificial, la sinapsis corresponde al peso.

Lo importante aqui: la informacion no esta guardada en ningun lugar concreto. Esta distribuida en la eficacia de miles de conexiones. Aprender, en este nivel, significa cambiar esa eficacia.

Fijense en la comparativa: un cerebro humano tiene ochenta y seis mil millones de neuronas y cien billones de sinapsis. La red de Hinton tiene cien a mil unidades. La brecha es enorme. Pero Andersen y Zipser demostraron que a pesar de esa diferencia de ocho ordenes de magnitud, pueden emerger representaciones funcionalmente similares. Eso es exactamente lo que vamos a ver mas adelante.

### Frase puente

Entonces la pregunta deja de ser "como copiar una neurona" y pasa a ser "que es lo minimo que necesito conservar para modelar aprendizaje".

---

## Slide S03 — La neurona artificial

### Que mostrar

- Diagrama animado McCulloch-Pitts: entradas x1-x5 → pesos (lineas violeta/rojo por signo) → suma ponderada Σ → caja f(·) → salida y. Pulsos animados que fluyen de izquierda a derecha.
- Sliders de pesos interactivos (arrastrar cambia el diagrama en tiempo real).
- Tres botones de funcion de activacion: Sigmoide σ / ReLU / Umbral — con grafica lateral actualizada.
- Cinco tarjetas de analogia biologica clicables (desbloqueo secuencial): Dendrita / Sinapsis / Colina axonica / Umbral de disparo / Tasa de disparo.

---

### Que decir — APERTURA (antes de tocar nada)

Aqui aparece la neurona artificial. Lo primero que conviene decir con claridad es esto: Hinton no copia la neurona biologica, la idealiza. Y esa idealizacion burda, como el mismo la llama, es lo que hace el modelo tratable.

El diagrama que ven muestra el computo completo de una sola unidad. Cinco entradas entran por la izquierda. Cada una viene multiplicada por un peso: si el peso es violeta, es excitador; si es rojo, es inhibidor. El nodo Σ suma todo eso mas un sesgo. Luego la caja f(·) aplica una funcion de activacion. Y a la derecha sale el valor y.

Pueden mover los sliders para ver como cambia la salida en tiempo real. Eso es todo el computo de una neurona artificial: suma ponderada mas funcion de activacion.

> **[Siguiente → clic en boton "Sigmoide σ"]**

---

### Paso 1 — Funcion Sigmoide σ

**Que se ve en pantalla:**
Boton "Sigmoide σ" activo en violeta. La grafica lateral muestra una curva en S que va de 0 a 1 pasando por 0.5 en el origen. Un punto coloreado marca donde cae el valor actual de la entrada neta.

**Que decir:**

La sigmoide produce una salida continua entre cero y uno. Lo importante no es la formula: es que es diferenciable en todo punto. Y eso es exactamente lo que necesita la retropropagacion para calcular gradientes. Sin diferenciabilidad, no hay aprendizaje por gradiente descendente.

Historicamente, la sigmoide fue la funcion que hizo posible entrenar redes multicapa en los ochenta. Tiene un problema: cuando la entrada es muy grande o muy pequena, la derivada se aplana casi a cero — lo que se llama saturacion del gradiente.

> **[Siguiente → clic en boton "ReLU"]**

---

### Paso 2 — Funcion ReLU

**Que se ve en pantalla:**
Boton "ReLU" activo en verde. La grafica muestra una recta plana en cero para valores negativos y una recta ascendente para valores positivos.

**Que decir:**

ReLU, Rectified Linear Unit: si la entrada es negativa, la salida es cero. Si es positiva, la salida es la entrada misma. Eso es todo.

Parece demasiado simple, pero tiene dos ventajas enormes. Es rapidisima de calcular. Y no satura para valores positivos grandes — la derivada siempre es 1 en esa zona, lo que mantiene el gradiente vivo durante el entrenamiento. Por eso la mayoria de las redes profundas modernas usan ReLU o alguna variante.

> **[Siguiente → clic en boton "Umbral"]**

---

### Paso 3 — Funcion Umbral

**Que se ve en pantalla:**
Boton "Umbral" activo en amarillo. La grafica muestra un escalon: cero antes del origen, uno despues. Un salto discontinuo.

**Que decir:**

El umbral es la version mas biologica de las tres. Todo o nada. Si la suma supera un umbral, la unidad dispara con valor 1. Si no, permanece inactiva con valor 0. Exactamente como el potencial de accion de la neurona biologica.

Esta es la funcion de McCulloch y Pitts de 1943. Es la mas antigua. Su problema: no es diferenciable en el punto de disparo, asi que no puede usarse con retropropagacion. Sirve para analisis logico, no para aprendizaje por gradiente.

La progresion que vimos en estas tres funciones refleja exactamente el trade-off que Hinton nombra: la sigmoide y la ReLU sacrifican realismo biologico para ganar trainabilidad matematica.

> **[Siguiente → clic en tarjeta "Dendrita"]**

---

### Paso 4 — Analogia biologica: Dendrita → Entrada xᵢ

**Que se ve en pantalla:**
Tarjeta "Dendrita" expandida mostrando: bio_sub "recibe senales" → art "Entrada xᵢ" / art_sub "valor numerico".

**Que decir:**

Ahora veamos que conserva y que pierde esta idealizacion respecto a la biologia. Las dendritas son las ramificaciones que reciben senales de otras neuronas. En el modelo artificial, eso se convierte en el vector de entradas: valores numericos que llegan desde otras unidades o desde el mundo.

Lo que se pierde: la geometria de las dendritas importa en la neurona real. Sinapsis en diferentes partes del arbol dendritico tienen efectos distintos. Eso el modelo lo ignora completamente.

> **[Siguiente → clic en tarjeta "Sinapsis"]**

---

### Paso 5 — Analogia biologica: Sinapsis → Peso wᵢ

**Que se ve en pantalla:**
Tarjeta "Sinapsis" expandida: bio_sub "fuerza de conexion" → art "Peso wᵢ" / art_sub "+excitador / −inhibidor".

**Que decir:**

La sinapsis es la zona de contacto donde se liberan neurotransmisores. Lo que Hinton conserva de esto es la eficacia sinaptica: la fuerza de esa conexion. En el modelo, eso es el peso.

Un peso positivo = sinapsis excitatoria. Un peso negativo = sinapsis inhibitoria. El aprendizaje consiste en cambiar esa eficacia, igual que la plasticidad sinaptica en el cerebro.

Este es el corazon de la analogia de Hinton. Todo lo demas es simplificacion. Esto es lo que el conserva.

> **[Siguiente → clic en tarjeta "Colina axonica"]**

---

### Paso 6 — Analogia biologica: Colina axonica → Suma Σ xᵢwᵢ + b

**Que se ve en pantalla:**
Tarjeta "Colina axonica" expandida: bio_sub "integra entradas" → art "Suma Σ xᵢwᵢ+b" / art_sub "integracion lineal".

**Que decir:**

La colina axonica es la region donde se integran todas las senales que llegaron por las dendritas. Si la suma supera el umbral, dispara. En el modelo, esta integracion es la suma ponderada mas el sesgo: Σ xᵢwᵢ + b. Completamente lineal.

Lo que se pierde: la integracion real es no lineal, dependiente del tiempo, sensible a la morfologia. El modelo convierte todo eso en una suma escalar instantanea.

> **[Siguiente → clic en tarjeta "Umbral de disparo"]**

---

### Paso 7 — Analogia biologica: Umbral de disparo → Activacion f(·)

**Que se ve en pantalla:**
Tarjeta "Umbral de disparo" expandida: bio_sub "~−55 mV" → art "Activacion f(·)" / art_sub "sigmoide / ReLU / umbral".

**Que decir:**

El umbral de disparo de la neurona biologica esta alrededor de −55 milivolts. Si el potencial de membrana supera ese valor, hay potencial de accion. Si no, silencio.

En el modelo, eso es la funcion de activacion que acabamos de ver. El umbral biologico exacto desaparece — en su lugar tenemos tres opciones matematicas con diferentes propiedades de entrenabilidad. Lo que se conserva: la idea de un mecanismo no lineal de decision.

> **[Siguiente → clic en tarjeta "Tasa de disparo"]**

---

### Paso 8 — Analogia biologica: Tasa de disparo → Salida y

**Que se ve en pantalla:**
Tarjeta "Tasa de disparo" expandida: bio_sub "Hz de potenciales" → art "Salida y" / art_sub "valor 0→1".

**Que decir:**

La neurona biologica no manda un numero. Manda pulsos discretos, y la informacion esta en la frecuencia de esos pulsos: Hz. En la neurona real, mas excitacion = mas Hz.

En el modelo artificial, todo eso se colapsa en un solo numero entre 0 y 1. La tasa de disparo se convierte en una magnitud continua. Se pierde la temporalidad, los spikes individuales, la variabilidad. Se gana: diferenciabilidad y tratabilidad matematica.

---

### Resumen del trade-off filosofico

Lo que se pierde con esta idealizacion: geometria del arbol dendritico, quimica sinaptica, temporalidad de los spikes, morfologia, neuromodulacion, plasticidad intrinseca.

Lo que se gana: un modelo matematicamente tratable que puede entrenarse por gradiente descendente, que escala a millones de unidades, y que genera predicciones corroborables sobre representacion y aprendizaje.

Y ahi esta uno de los puntos filosoficos mas importantes del texto: una idealizacion puede ser cientificamente util sin ser una copia literal de su objeto. El problema — que Hinton deja abierto — es decidir hasta que punto esa idealizacion sigue explicando algo real y hasta que punto solo sirve como herramienta.

### Frase puente

Una sola neurona artificial todavia no hace mucho. Lo interesante empieza cuando estas unidades se organizan en capas.

---

## Slide S04 — Arquitectura de tres capas

### Que mostrar

- Red con capas (entrada, ocultas, salida).
- Forward pass animado con boton "Propagacion Forward" → fases Capa 1/4, 2/4, 3/4, 4/4.
- Activaciones y pesos coloreados: purpura = positivo, rojo = negativo, amarillo = señal activa.
- Leyenda de colores y grosor de lineas = magnitud del peso.

### Que decir

En esta parte aparece una de las contribuciones mas influyentes del texto: la arquitectura multicapa con unidades ocultas.

La idea es sencilla pero muy poderosa. Hay una capa de entrada, una o mas capas ocultas y una capa de salida. Miren el diagrama: cuatro columnas de nodos conectados entre si por lineas. El color y el grosor de cada linea indica el peso de esa conexion.

`[Click → Propagacion Forward]`

Voy a activar el forward pass para que vean como fluye la informacion.

`[Siguiente → Capa 1/4: Entrada]`

La capa de entrada recibe las coordenadas (x, y) de un punto del espacio. Son solo dos neuronas. No saben nada aun: simplemente transmiten los valores numericos hacia adelante.

`[Siguiente → Capa 2/4: Oculta 1]`

En la primera capa oculta hay ocho unidades. Cada una recibe señal de las dos neuronas de entrada, ponderada por los pesos de las conexiones. Estas unidades empiezan a detectar patrones no lineales que la capa de entrada no puede ver por si sola. Nadie les dijo que detectar: lo aprendieron del entrenamiento.

`[Siguiente → Capa 3/4: Oculta 2]`

La segunda capa oculta tambien tiene ocho unidades. Recibe la salida de la primera capa oculta y refina las representaciones. Las capas ocultas son el corazon del conexionismo de Hinton: las representaciones no estan puestas desde afuera como simbolos ya definidos, emergen del proceso de aprendizaje mismo.

`[Siguiente → Capa 4/4: Salida]`

Finalmente, la capa de salida tiene una sola neurona: produce un numero entre 0 y 1 que representa la clasificacion. Por encima de 0.5, un punto es de una clase. Por debajo, de la otra. La frontera de decision que ven en el grafico derecho es exactamente el umbral que esta neurona aprendio a trazar.

Por eso este modelo se opone, al menos parcialmente, a la idea clasica de que pensar consiste en manipular simbolos explicitamente codificados. Aqui lo que tenemos son patrones distribuidos de activacion que van aprendiendo regularidades del mundo.

### Frase puente

Pero para que esas capas aprendan algo, tiene que haber un proceso de entrenamiento.

---

## Slide S05 — Entrenamiento supervisado

### Que mostrar

- Ciclo animado de 4 fases: PRESENTAR (verde) / EVALUAR (rojo) / CALCULAR EP (amarillo) / ACTUALIZAR (violeta).
- Frontera de decision en tiempo real sobre espiral 2D.
- Curva de error cayendo.
- Control de velocidad (pausa, frame a frame, acelerar).

### Que decir

En esta slide se ve muy bien que aprender no es magia. El entrenamiento es un ciclo de cuatro pasos que se repite miles de veces. Vamos fase por fase con la animacion.

`[Siguiente → PRESENTAR]`

La fase verde: se presenta un punto del espacio bidimensional. Tiene coordenadas (x, y) y una etiqueta correcta, clase 0 o clase 1. La red lo recibe como entrada y ejecuta un forward pass: produce una prediccion numerica. Todavia no sabe si se equivoco.

`[Siguiente → EVALUAR]`

La fase roja: se mide el error. Se compara la prediccion de la red con la etiqueta real. Si la red dijo 0.8 pero la respuesta correcta era 0, el error es grande. Si dijo 0.85 y la respuesta era 1, el error es pequeno. Cuantificar el error es lo que hace posible mejorarlo.

`[Siguiente → CALCULAR EP]`

La fase amarilla: se calcula el error por peso, la contribucion de cada conexion individual al error total. Esto es lo que hace la retropropagacion, que veremos en detalle en la siguiente slide. Lo importante aqui es que no es arbitrario: cada peso recibe una senal precisa de cuanto contribuyo al error y en que direccion hay que corregirlo.

`[Siguiente → ACTUALIZAR]`

La fase violeta: se actualizan los pesos en la direccion que reduce el error. Cada conexion se ajusta un pequeño paso. El conocimiento no queda guardado en una instruccion concreta, sino en la reorganizacion progresiva de todos los pesos de la red.

Fijense en la frontera de decision: con cada epoca de entrenamiento, la red aprende a separar mejor las dos clases de la espiral. La curva de error abajo cae monotonamente. Eso es aprendizaje supervisado: la red no descubre sola si acerto, necesita una señal externa que le diga cual era la salida correcta.

Por eso Hinton fue tan influyente: convierte el aprendizaje en un proceso gradual, cuantificable y visible. La red no aplica una regla ya dada: se transforma a si misma mediante entrenamiento.

### Frase puente

Ahora bien, el mecanismo que hace posible ese ajuste eficiente de pesos es precisamente la retropropagacion.

---

## Slide S06 — Retropropagacion

### Que mostrar

- Linea de tiempo: Werbos 1974 (ignorado) → redescubierto 1982 × 2 → Hinton 1986 (publicado).
- Flujo forward (verde) y backward (rojo).
- Los 4 pasos del algoritmo con formulas KaTeX en modo profesor.

### Que decir

La retropropagacion del error es el centro tecnico del texto. La idea es calcular como contribuye cada peso al error final para corregirlo de manera eficiente.

Historicamente esto es interesante. En 1974 Werbos lo descubrio en su tesis doctoral, nadie lo escucho. En 1982 dos grupos independientes lo redescubrieron. En 1986 Hinton, Rumelhart y Williams lo publicaron en Nature. Costo doce anos que el campo lo adoptara.

`[Click → Boton "Forward"]`

Primero el pase hacia adelante: la señal entra a la izquierda en verde y avanza hacia la salida. La red genera una prediccion. Hasta aqui no hay aprendizaje.

`[Click → Boton "Backprop"]`

Ahora activamos la retropropagacion. Las particulas rojas fluyen de derecha a izquierda: el error sale de la capa de salida y viaja hacia atras a traves de toda la red. Fijense en el color de las conexiones: las mas rojas son las que cargaron mas responsabilidad en el error.

Ahora vamos paso por paso con los cuatro cuadros de abajo.

`[Click → Paso 1: Error de activacion]`

El primer paso es calcular la diferencia entre lo que la red produjo y lo que debia producir. Ese numero es el error de activacion de la neurona de salida. Sin este numero, nada de lo que sigue es posible.

`[Click → Paso 2: Error de entrada]`

El segundo paso pondera ese error por la derivada de la funcion de activacion. La sigmoide tiene una pendiente que varia segun donde este la neurona. Una pendiente cercana a cero significa que ese peso contribuyo poco al error aunque tuviese un valor grande. La derivada distribuye la culpa de forma proporcional.

`[Click → Paso 3: Error del peso]`

El tercer paso calcula el error por peso individual: cuanto debe cambiar exactamente cada conexion para reducir el error. Es el gradiente concreto de la funcion de perdida respecto a ese peso.

`[Click → Paso 4: Propagar atras]`

El cuarto paso propaga ese error hacia la capa anterior para repetir el proceso. El mismo ciclo se aplica a cada capa hasta llegar a la entrada. Al final todos los pesos tienen su señal de correccion.

Eso hizo posible entrenar redes multicapa de forma efectiva. Sin retropropagacion, el conexionismo habria sido mucho menos convincente como programa de investigacion.

Pero aqui aparece una dificultad que no hay que esconder: este algoritmo funciona extraordinariamente bien, aunque no parezca biologicamente plausible en sentido estricto. El cerebro no tiene un canal de error que fluya hacia atras por las mismas sinapsis.

### Frase puente

Y justo por eso la siguiente pregunta es inevitable: si funciona tan bien, eso significa que explica el cerebro?

---

## Slide S07 — Alcances y primera critica

### Que mostrar

- Demo interactivo: clasificador de animales en tiempo real (gato, aguila, pez, serpiente, rana, murcielago).
- La red aprende a clasificar a partir de rasgos: pelaje, plumas, escamas, patas, vuela, nada, sangre caliente, nocturno.
- Panel de tension filosofica (verde = presupuesto / rojo = objecion critica).

### Que decir

En esta parte Hinton muestra el poder del modelo. Las redes pueden clasificar, reconocer patrones y resolver tareas que antes parecian mucho mas dificiles.

La demo que ven es un clasificador de animales entrenado en el navegador con TensorFlow.js. La red recibe como entrada un vector de rasgos biologicos (si el animal tiene pelaje, si vuela, si es nocturno) y aprende a distinguir entre seis especies. Lo hace en tiempo real frente a ustedes, sin que nadie haya programado explicitamente las reglas de clasificacion.

Ese es el punto que Hinton quiere demostrar: la red no tiene una regla que diga "si tiene plumas es un aguila". Aprende la clasificacion reorganizando sus pesos a partir de ejemplos. El conocimiento emerge de la estructura interna, no de instrucciones explicitas.

Pero aqui aparece la primera critica filosofica importante. Que un modelo funcione no significa automaticamente que describa el mecanismo real del cerebro.

Fijense en el panel de tension: el presupuesto de Hinton es que el cerebro es computacionalmente inteligible. La objecion critica es que eso es logicamente posible que sea falso. Funcionamiento no es lo mismo que explicacion.

En otras palabras, Hinton ofrece una herramienta potentisima y una hipotesis ambiciosa. Lo que sigue abierto es si ambas cosas coinciden por completo.

### Frase puente

Y lo interesante es que Hinton mismo no oculta los problemas de su enfoque.

---

## Slide S08 — Limites de la retropropagacion

### Que mostrar

- Superficie de error 3D con minimos locales (interactiva, rotar con mouse).
- Cuatro tarjetas de limites animadas.
- Comparacion con la regla de Hebb como alternativa biologicamente plausible.

### Que decir

Una gran virtud del texto es que Hinton reconoce limites reales de la retropropagacion.

Primero: requiere supervision. Alguien tiene que proveer la respuesta correcta para cada ejemplo.

Segundo: el tiempo de entrenamiento crece mas rapido que el tamano de la red. No escala sin problemas.

Tercero: puede quedar atrapada en minimos locales. La superficie de error que ven aqui tiene valles que no son el minimo global. La red puede converger a una solucion local aceptable pero no optima.

Cuarto, y el mas importante filosoficamente: la retropropagacion envia una senal de error simetrica hacia atras por las mismas conexiones que usaron la informacion hacia adelante. Ningun mecanismo biologico conocido hace exactamente eso. El cerebro no tiene un canal de error que fluya en sentido inverso por las mismas sinapsis.

Por eso la comparacion con Hebb es tan importante. El aprendizaje hebbiano, "las neuronas que disparan juntas se conectan juntas", es mas local, mas biologicamente razonable, aunque menos potente y menos preciso. Aqui Hinton sacrifica realismo biologico por poder computacional.

Yo diria que este es uno de los mejores puntos del texto, porque muestra que el conexionismo no es ingenuo: sabe que su fuerza tecnica viene acompanada de un costo explicativo.

### Frase puente

Y precisamente por esas limitaciones, Hinton abre la puerta al aprendizaje no supervisado.

---

## Slide S09 — Aprendizaje no supervisado

### Que mostrar

- Cita de apertura y tarjeta del criterio universal (Eficiencia Ontologica / Fidelidad Generativa).
- Tabs en orden: 9a PCA — 9b Competitivo — 9c Kohonen — 9d Hebb.
- Cada tab activa una animacion distinta con descripcion al pie.
- Tabla comparativa de seis paradigmas visible al final del slide.
- STDeriveCard FOL del criterio de buena representacion (solo modo profesor).

---

### Que decir — APERTURA (antes de tocar los tabs)

Esta parte es de las mas filosoficamente ricas del texto. Hasta ahora hemos hablado de una red que aprende porque alguien le dice cuando se equivoca. Pero eso tiene un costo enorme: necesitas un maestro, necesitas etiquetas, necesitas supervision para cada dato. El cerebro no tiene eso. El mundo no viene etiquetado.

Entonces Hinton pregunta: como puede una red aprender sola a organizar lo que recibe?

Lean la cita en pantalla: "Como logra un sistema desarrollar una representacion isomorfica del mundo, sin que un instructor omnisciente asigne etiquetas externas sobre que es lo que observa?"

Esa es la pregunta central de la segunda mitad del texto.

Y la respuesta de Hinton esta en la tarjeta que ven justo debajo. Cualquier modelo representacional autonomo tiene que resolver una tension entre dos fuerzas opuestas:

La primera es la **eficiencia ontologica**: reducir dimensionalidad exprimiendo redundancias. El mundo tiene estructura repetitiva. Una imagen de una cara tiene millones de pixeles, pero la mayoria son altamente predecibles a partir de los demas. Esa redundancia tiene un costo computacional real: si la procesas entera, gastas recursos en informacion que no agrega nada nuevo. Una buena representacion elimina esa redundancia.

La segunda es la **fidelidad generativa**: que la entrada pueda ser reconstruida aproximadamente a partir del codigo comprimido. Si comprimes demasiado, pierdes la sennal. Si comprimes bien, conservas lo que importa.

Comprimir sin destruir. Eso es el criterio de buena representacion, y los cuatro paradigmas que voy a mostrar son cuatro formas distintas de resolver esa tension.

> **[Siguiente → hacer clic en tab 9a]**

---

### Paso 1 — Tab 9a: PCA

**Que se ve en pantalla:**
Nube de puntos animada drifteando lentamente. Un eje diagonal PC1 atraviesa la mayor extension de la nube. Al pie: *"Cara de elipses: 1M pixeles → 5 parametros"*.

**Que decir:**

El primer paradigma es el calculo de componentes principales, PCA.

El problema de partida es el costo computacional de la redundancia. Imaginen una imagen de una cara hecha de elipses: tiene un millon de pixeles. Pero esos pixeles no son independientes. Si sabes donde esta el centro de la elipse, puedes predecir mucho de lo que hay alrededor. La mayoria de los pixeles son redundantes respecto a los demas.

PCA detecta exactamente eso. Encuentra las direcciones del espacio de datos que concentran la mayor varianza — el eje PC1 que ven aqui es la primera de esas direcciones. Y lo que descubre Hinton es que para una cara de elipses, cinco parametros bastan: orientacion, posicion x, posicion y, longitud del eje mayor y anchura del eje menor. De un millon de numeros a cinco. Eso es reducir el costo computacional de la redundancia en cinco ordenes de magnitud.

La clave filosofica es esta: la red no sabe de antemano que esos cinco parametros existen. Los descubre sola analizando correlaciones en los datos. No necesita maestro.

Y dos algoritmos, Linsker y Oja, demostraron que PCA puede hacerse con reglas de aprendizaje local, sin retropropagacion. Eso los hace biologicamente plausibles: el cerebro podria hacer algo equivalente.

> **[Siguiente → hacer clic en tab 9b]**

---

### Paso 2 — Tab 9b: Aprendizaje competitivo

**Que se ve en pantalla:**
Dos nubes de puntos, verde para osos pardos y cyan para osos polares. Dos vectores "W" que empiezan en el centro del canvas y migran lentamente hacia cada racimo. Al pie: *"una unidad gana → sus pesos migran al patron"*.

**Que decir:**

PCA comprime manteniendo la varianza global. Pero hay otro problema: a veces lo que queremos no es comprimir la varianza, sino **categorizar**. Descubrir que hay dos tipos de cosas, no solo una dimension de variacion.

Eso es lo que hace el aprendizaje competitivo. Cada vez que llega un patron de entrada, todas las unidades calculan su similitud con ese patron. Gana la que mas se parece — winner-takes-all. Solo esa unidad actualiza sus pesos, moviendose un poco hacia el patron. Las demas no hacen nada.

Fijense en los vectores W en la animacion: empiezan los dos en el centro, sin especializacion. Pero poco a poco uno migra hacia la nube de puntos verdes y el otro hacia la nube cyan. Con el tiempo cada unidad queda especializada en un tipo de patron sin que nadie le haya dicho que categorias existen.

El ejemplo del texto es exactamente este: una red entrenada con datos de osos desarrolla una unidad para osos pardos y otra para osos polares. La distincion emerge sola.

El costo computacional aqui es diferente al de PCA: en lugar de reducir dimensiones, se reduce el numero de comparaciones necesarias. Una vez entrenado, reconocer un patron nuevo es solo buscar la unidad ganadora — una operacion mucho mas barata que procesar la entrada completa.

Contraste con PCA: alla las unidades cooperan para capturar varianza global. Aqui compiten para capturar categorias locales. Dos filosofias distintas de como reducir la redundancia del mundo.

> **[Siguiente → hacer clic en tab 9c]**

---

### Paso 3 — Tab 9c: Kohonen

**Que se ve en pantalla:**
Grilla de 8×8 nodos conectados por lineas violetas. Un nodo verde (el ganador, Best Matching Unit) se mueve de posicion en posicion a medida que llegan nuevos patrones. Contador al pie: *"epoca X/300 — nodo ganador (verde) arrastra vecinos"*. La grilla pasa de caotica a ordenada progresivamente.

**Que decir:**

El mapa de Kohonen lleva el aprendizaje competitivo un paso mas alla. Y es donde la relacion con el cerebro biologico se vuelve mas directa.

La diferencia clave frente al competitivo puro es esta: cuando gana una unidad, no solo actualiza sus propios pesos. Tambien arrastran sus vecinas fisicas en la grilla, aunque en menor medida segun la distancia. El nodo verde que ven es la Best Matching Unit — la que mas se parecio al patron de entrada. Pero las que estan al lado de ella tambien se mueven un poco en esa misma direccion.

Fijense en el contador: al inicio de las 300 epocas la grilla es caotica. A medida que avanza el entrenamiento, la grilla se organiza. Al final, unidades cercanas en la grilla codifican patrones similares. La proximidad en la red corresponde a similitud en el espacio de entrada.

Eso es exactamente lo que tienen los mapas topograficos de la corteza visual: neuronas fisicamente cercanas responden a estimulos similares. La corteza visual tiene una organizacion retinotopica, la corteza auditiva una organizacion topotopica. Hinton senala que el cerebro podria usar un procedimiento parecido al de Kohonen para organizar esos mapas.

No es una prueba. Pero si muestra que el tipo de estructura que emerge del entrenamiento es compatible con la organizacion real del cerebro. Y eso vuelve al modelo mucho mas interesante que si solo funcionara en silicio.

El costo computacional que resuelve Kohonen es el de la busqueda: si la similitud esta organizada espacialmente, buscar el patron mas cercano es mucho mas rapido que comparar contra todas las unidades.

> **[Siguiente → hacer clic en tab 9d]**

---

### Paso 4 — Tab 9d: Hebb

**Que se ve en pantalla:**
Dos neuronas: PRE en azul a la izquierda, POST en verde a la derecha. Una linea de sinapsis las conecta. El ciclo tiene cuatro fases: (1) PRE inactivo, POST inactivo — linea delgada. (2) PRE se activa — se ilumina en azul. (3) PRE y POST co-activos — la linea pulsa y se engrosa. (4) Reposo. El valor "w = X.XX" sobre la sinapsis crece con cada co-activacion. Contador de co-activaciones en la esquina inferior derecha. Al pie: *"neuronas que se disparan juntas, se conectan juntas — Hebb 1949"*.

**Que decir:**

El cuarto paradigma es el mas importante filosoficamente porque es el mas biologicamente plausible: la regla de Hebb.

La idea es extremadamente minimalista. Si la neurona presináptica y la postsináptica se activan juntas, la conexion entre ellas se fortalece. Eso es todo. No hay senal de error global. No hay calculo de gradiente. No hay nada que viaje hacia atras por la red.

Fijense en la animacion: cada vez que PRE dispara y POST lo sigue, el peso w sube un poco. La linea de la sinapsis se va haciendo mas gruesa. El cambio es local, dependiente solo de lo que pasa en esa sinapsis particular.

Esto es biologicamente realista porque el cerebro tiene LTP — potenciacion a largo plazo — que es exactamente esto: sinapsis que se fortalecen cuando hay co-activacion repetida. No necesita un maestro. No necesita error global.

Ahora, el problema de Hebb puro es que es inestable: los pesos crecen sin limite si hay correlacion continua. Oja en 1982 propuso una variante normalizada que resuelve eso, y demostro que esa variante implementa el primer componente principal de los datos. Lo que PCA hace con algebra matricial costosa, Hebb con normalizacion lo hace con biologia local.

Aqui esta el punto mas importante del slide completo: el costo computacional de PCA es alto — requiere operaciones matriciales globales sobre todos los datos. El costo de Hebb es minimo — cada sinapsis solo necesita saber que hacen sus dos neuronas adyacentes. La misma representacion eficiente, con un costo computacional radicalmente menor, y con un mecanismo que el cerebro realmente tiene.

La tension que deja Hinton abierta es esta: la retropropagacion es mas potente pero biologicamente implausible y computacionalmente costosa en terminos de senales globales. Hebb es biologicamente plausible y computacionalmente local, pero menos potente. Esa tension no esta resuelta en 1992 y sigue siendo una de las preguntas abiertas de la neurociencia computacional hoy.

---

### Despues de los 4 tabs — Tabla comparativa

**[La tabla queda visible en pantalla debajo de los tabs]**

Ahora pueden ver la tabla comparativa completa. Seis paradigmas. Cada uno con distinto tipo de instructor, distinto tipo de representacion y distintos usos actuales.

Fijense en el patron: los que necesitan instructor (supervisado con retropropagacion) son los mas potentes pero los menos biologicos. Los que no necesitan instructor (PCA, competitivo, Kohonen, Hebb) son mas plausibles pero menos precisos en tareas complejas. Refuerzo es un caso intermedio: no hay etiquetas pero hay una senal de recompensa.

Lo que conecta a todos los no supervisados es el mismo principio: reducir redundancia sin destruir estructura. Comprimir sin perder la capacidad de reconstruir. Todos son soluciones distintas al mismo problema de costo computacional.

En modo profesor se pueden activar las derivaciones formales de logica de primer orden que demuestran que si algo cuenta como buena representacion, necesariamente cumple las dos condiciones — economia y reconstruccion — por necesidad logica dentro del marco de Hinton.

### Frase puente

Eso nos lleva directamente al problema de donde viven las representaciones en una red.

---

## Slide S10 — Representaciones distribuidas, locales y sparse

### Que mostrar

- Tres diagramas animados en paralelo: distribuida / local / sparse (Barlow).
- Red recurrente con flujo en bucle (4 nodos A-B-C-D).

### Que decir

Aqui aparece una pregunta clasica y muy buena: donde esta realmente un concepto dentro de una red?

Una opcion extrema seria el localismo: una neurona, un concepto. La otra opcion extrema seria una distribucion demasiado difusa. Hinton busca una posicion intermedia mas fertil.

Fijense en los tres tipos. En la representacion distribuida, muchas unidades estan activas al mismo tiempo y el patron emerge del conjunto. Es robusta: si pierdes una unidad no pierdes el concepto. En la representacion local, solo una unidad activa representa un patron. Es la "neurona abuela": fragil pero interpretable. La representacion sparse, propuesta por Barlow, es el caso mas interesante: solo un subconjunto pequeno de unidades esta activo. Combina economia con calidad de reconstruccion.

Las representaciones mas interesantes del texto no suelen ser completamente locales ni completamente densas. El significado aparece como patron de actividad.

**Red recurrente:**

Las redes recurrentes empujan esto todavia mas, porque permiten que la actividad vuelva sobre si misma y se estabilice o evolucione temporalmente. La actividad no va solo hacia adelante: vuelve, forma bucles. Eso permite estados estables, ciclos, dinámica temporal. Las LSTM y los transformers son descendientes directos de esta idea.

### Frase puente

Y si esto es mas que una intuicion computacional, deberiamos encontrar algo parecido en evidencia biologica.

---

## Slide S11 — Codigos demograficos

### Que mostrar

- Bump de actividad distribuida sobre 20 unidades (mover el bump arrastrando).
- Experimento de Sparks: anestesiar neuronas haciendo clic, el ojo se desvía al promedio.
- STDeriveCard: PopulationCode → DistributedCode y PopulationCode → RobustToLocalLoss.

### Que decir

Esta slide muestra una de las conexiones biologicas mas interesantes del texto: la idea de codigo demografico o poblacional.

Lo que muestra el experimento de Sparks es que una funcion no depende de una sola neurona aislada. Sparks y sus colegas anestesiaron neuronas del cerebro de un mono. El ojo no se quedo quieto: se movio hacia el promedio ponderado de las neuronas que quedaban activas. Cuando se silencian algunas neuronas, el sistema no colapsa completamente.

Pueden probarlo aqui haciendo clic en las unidades para anestesiarlas. Van a ver como el ojo del modelo se desplaza al nuevo promedio de la poblacion restante.

Eso refuerza la tesis de Hinton de que la informacion puede estar distribuida en patrones colectivos y no encerrada en una unidad individual.

Este punto me parece importante porque le da al conexionismo algo mas que poder computacional: le da una cierta resonancia biologica. No prueba que el cerebro sea una red de Hinton, pero si vuelve mas plausible la idea general de representacion distribuida.

Young y Yamane en el RIKEN encontraron algo similar para rostros en la corteza temporal de monos: los rostros se codifican demograficamente, no en neuronas individuales especializadas.

### Frase puente

Con eso llegamos a la convergencia: que pasa cuando se comparan directamente neuronas biologicas y unidades entrenadas?

---

## Slide S12 — De 1992 a hoy

### Que mostrar

- Timeline en serpentina con 12 hitos: 3 filas de 4 nodos, cada uno clickeable para expandir detalle.
- Fila 1 (PRE-HISTORIA 1943-1969): McCulloch-Pitts / Hebb / Rosenblatt / Minsky-Papert.
- Fila 2 (RENACIMIENTO 1974-1998): Werbos / Rumelhart / Hinton ★ / LeCun.
- Fila 3 (ERA MODERNA 2012-2024): AlexNet / Transformers / GPT-3 / LLMs.
- Hinton 1992 destacado con borde violeta pulsante y etiqueta "PROTAGONISTA".
- Panel de realizabilidad multiple: Putnam / Fodor / Tension.
- Frase de cierre: "Hinton no afirma una verdad eterna — apuesta en un programa de investigacion."
- Badges: ◇CONV_POSS y ◇¬BRAIN_COMP.

### Que decir

Para entender el peso historico del texto de Hinton, hay que verlo en perspectiva. Esta timeline muestra ochenta anos de historia en un solo golpe de vista.

`[Click en McCulloch-Pitts 1943]`

Todo empieza aqui. En 1943, McCulloch y Pitts formalizan matematicamente la primera neurona artificial: un umbral logico binario. No aprendia nada, pero dio el lenguaje matematico que todo lo posterior hereda.

`[Click en Hebb 1949]`

Hebb formula la primera regla de aprendizaje: las neuronas que se activan juntas se conectan. Sin supervision, sin error calculado. Solo correlacion. Es la base de la plasticidad sinaptica computacional.

`[Click en Minsky-Papert 1969]`

En 1969 llega la crisis. Minsky y Papert demuestran que una sola capa no puede resolver XOR. El primer invierno de la IA congela el campo durante mas de una decada.

`[Click en Werbos 1974]`

La solucion al XOR ya existia en 1974: la tesis doctoral de Werbos describia la retropropagacion del error. Nadie lo escucho.

`[Click en Hinton 1992]`

Aqui esta nuestro protagonista. Hinton — junto con Rumelhart en 1986 — demuestra que backprop funciona en redes multicapa. En 1992 escribe el articulo de Scientific American que estamos analizando: representaciones distribuidas, capas ocultas, aprendizaje sin reglas explicitas. No es un dogma, es una apuesta en un programa de investigacion.

`[Click en AlexNet 2012]`

El 2012 es el punto de no retorno. AlexNet gana ImageNet con una brecha de 10 puntos porcentuales. GPUs + datos masivos + dropout. Empieza el Deep Learning como paradigma dominante.

`[Click en LLMs 2024]`

Y aqui estamos en 2024. Agentes generativos, razonamiento emergente, multimodalidad. La pregunta filosofica que Hinton dejo abierta en 1992 ahora pesa mas que nunca: estas redes explican el cerebro, o son una nueva ontologia computacional sin analogo biologico?

Miren abajo el panel de realizabilidad multiple. Putnam en 1967 dijo que lo que define un estado mental es la funcion, no el material. Fodor extendio eso: la psicologia puede ser autonoma respecto a la neurociencia. Pero hay una tension critica: si el sustrato importa, si hay algo en la biologia que no se puede capturar funcionalmente, la equivalencia se rompe. Y eso es exactamente lo que esta en disputa cuando preguntamos si las redes de Hinton explican el cerebro.

El badge ◇ que ven abajo dice que la convergencia es posible, no necesaria. En logica modal K, ◇P significa que hay un mundo posible donde P es verdadero. Que las redes y el cerebro converjan funcionalmente es coherente con los datos. Que eso implique convergencia mecanistica es una apuesta, no una prueba.

### Frase puente

Y antes del cierre argumental, hay un resultado empirico concreto que merece su propio slide.

---

## Slide S12b — Convergencia empirica: Andersen y Zipser

### Que mostrar

- Comparativa lado a lado: neurona biologica (corteza parietal, area 7a) vs unidad artificial entrenada.
- Dos columnas: lo que SI prueba la convergencia / lo que NO prueba.
- Badges: CONV_FUNC ✓ / CONV_MECH ✗.

### Que decir

Este es uno de los argumentos empiricos mas importantes del paper y vale la pena detenerlo un momento.

Andersen y Zipser entrenaron una red con retropropagacion para transformar coordenadas espaciales entre marcos de referencia. Lo que encontraron fue esto: las unidades ocultas desarrollaron por si solas propiedades similares a las neuronas reales de la corteza parietal de mono, el area 7a. La red no fue disenada para imitar esas neuronas. Simplemente emergio esa organizacion al resolver el problema.

Lo que si prueba esto: las redes entrenadas con retropropagacion pueden desarrollar representaciones funcionalmente similares a las biologicas. La organizacion jerarquica y la distribucion de campos receptivos converge en ambos sistemas. El tipo de representaciones que emergen es compatible con la arquitectura neural real.

Lo que no prueba: no prueba que el cerebro use retropropagacion, porque el mecanismo sigue siendo biologicamente implausible. No prueba que el proceso de aprendizaje sea el mismo. Y no resuelve la brecha explicativa central: convergencia funcional no es lo mismo que convergencia mecanistica.

Esta distincion es clave para la filosofia de la neurociencia. Que dos sistemas produzcan outputs similares no significa que funcionen igual por dentro. Eso es lo que Bechtel llama la pregunta por el mecanismo.

### Frase puente

Con ese resultado en mano, antes de cerrar hay una pregunta que Hinton nunca hizo — y que nosotros debemos hacer.

---

## Slide S12c — ¿Por que no se hablo de emergencia?

### Que mostrar

La slide tiene 6 pasos internos (flechas o clics avanzan uno por uno):

1. **El elefante en la sala**: La palabra "emergencia" no aparece ni una vez en Hinton 1992. Conteo: 0 menciones vs ~18 "representacion distribuida" vs ~25 "informacion". Cita provocadora sobre la decision ontologica disfrazada de ingenieria.

2. **El problema formal de P**: Formulas LaTeX:
   - $P = f(\{N_i\}_{i=1}^k, \mathbf{R})$ donde $\mathbf{R} = \{w_{ij}\}$
   - $P \neq \sum_{i=1}^k N_i \Rightarrow P$ es irreducible a sus partes
   - Las representaciones distribuidas de Hinton satisfacen exactamente esta definicion de emergencia debil.

3. **La jugada de Hinton**: Reduccion a informacion. Dos columnas: lo que Hinton evita (preguntar "que emerge") vs lo que hace (preguntar "que informacion se codifica"). La representacion distribuida *es en si misma* una propiedad emergente de los pesos — llamarla "informacion codificada" no elimina la emergencia, la renombra.

4. **Emergencia continua — la ontologia no dicha**: Formula $\partial P / \partial t \neq 0$. En cada paso de entrenamiento emergen propiedades nuevas continuamente. Tres columnas comparativas: emergencia fuerte clasica / emergencia continua (lo que realmente ocurre) / reduccion simple (donde Hinton cree estar).

5. **La bifurcacion epistemologica**: Dos niveles — Ontologico: monismo ($P \equiv g(\mathbf{R})$, todo es pesos/informacion, una sustancia) vs Epistemico: emergencia ($P \not\leftarrow \{N_i\}$ sin simular $\mathbf{R}$, irreducible en practica). **Resultado**: Hinton es un monista ontologico que opera como emergentista epistemico.

6. **ST: Reduccionismo informacional vs Emergentismo debil**: Tabla de 5 dimensiones (Ontologia, Prediccion, Explicacion, Mecanismo, Realizabilidad) comparando REDUCT_INFO con EMERG_WEAK. Score: 2-2-1. **Veredicto**: REDUCT_INFO ∥ EMERG_WEAK — ambas son logicamente compatibles. La tension no se resuelve: se habita.

### Que decir

Antes de cerrar la presentacion, quiero hacer una pregunta que Hinton nunca hace — y que la filosofia de las neurociencias deberia hacer.

La palabra "emergencia" no aparece ni una sola vez en el texto de 1992. Cero menciones. Y sin embargo, todo su argumento depende de que las representaciones distribuidas hagan algo que ninguna neurona individual puede hacer. Eso es, por definicion, emergencia debil.

Formalmente: si una propiedad P del sistema completo no puede derivarse de ninguna unidad individual Ni, entonces P es irreducible a sus partes — eso es emergencia.

Entonces, ¿por que Hinton no usa la palabra? Porque hace una jugada ontologica: reemplaza "que emerge" por "que informacion se codifica". Es una reduccion al lenguaje informacional. Pero la representacion distribuida en si misma es una propiedad emergente de la configuracion de pesos. Renombrarla no la elimina.

Lo mas interesante es que la emergencia aqui es *continua*: en cada paso de entrenamiento, los pesos cambian y la propiedad P cambia con ellos. No hay un salto cualitativo dramatico — pero la novedad esta ahi, distribuida en cada actualizacion de gradiente.

El resultado filosofico es una bifurcacion: a nivel ontologico, Hinton es un monista — todo es informacion, todo es pesos, una sola sustancia. Pero a nivel epistemico, opera como emergentista — no puedes predecir lo que la red va a representar sin correrla entera. Reducible en principio, irreducible en practica.

Kim argumentaria que esta posicion es inestable. Pero eso no la refuta — la convierte en una tension filosofica genuina, no en un error.

### Notas para profesor (modo P)

- Kim, J. (1999). "Making Sense of Emergence" — la emergencia epistemica sin emergencia ontologica es inestable: o P es real y causalmente eficaz, o es un epifenomeno.
- Las representaciones distribuidas de Hinton son causalmente eficaces (determinan el output) pero supuestamente reducibles a pesos. ¿Es P real o un artefacto descriptivo?
- Conexion con Bechtel (2001): la nocion funcional de representacion es una forma de emergencia epistemica disfrazada de funcionalismo.
- Esta slide conecta con S10 (representaciones distribuidas) y con S12b (convergencia funcional ≠ convergencia mecanistica).

### Frase puente

Con esa tension abierta — monismo ontologico con emergencia epistemica — cerramos el argumento. Y la tesis final es que esa ambiguedad ontologica no es un defecto: es la posicion mas pragmatica para investigar la cognicion.

---

## Slide S13 — Cierre argumental

### Que mostrar

- Tesis central: "La red neuronal artificial no es una descripcion del cerebro, sino una apuesta en un programa de investigacion cuyo valor epistemico es mas funcional como emergencia continua que como reduccion acabada. La ambiguedad ontologica no es un defecto: permite construir un modelo con menos compromisos metafisicos y mas capacidad predictiva."
- Arco de tres autores: Daugman / Hinton / Bechtel con sus tesis e implicaciones (Hinton actualizado: la emergencia continua opera sin compromisos ontologicos fuertes).
- Pregunta para la discusion (emergencia como tension productiva).
- Badges modales: ◇ (posible), □ (necesario), ∂ (emergencia continua pragmatica), O (brecha epistemica persistente).

### Que decir

Para terminar, quiero dejar clara la tesis que ha organizado toda la presentacion.

La red neuronal artificial no es una descripcion del cerebro. Es una apuesta en un programa de investigacion. Y lo que vimos hoy, sobre todo en la slide de emergencia, muestra que su valor epistemico es mas funcional como emergencia continua que como reduccion acabada.

¿Que quiero decir con eso? Que la ambiguedad ontologica de Hinton — no decidir si P es una propiedad real o un artefacto descriptivo — no es un defecto. Es una ventaja pragmatica. Permite investigar sin tener que resolver primero todas las preguntas metafisicas. Menos compromisos ontologicos, mas capacidad de generar predicciones y modelos utiles.

Fijense en el arco de los tres autores.

Daugman nos dice que la computacion es el lenguaje tecnologico de nuestra epoca. Necesario tenerlo en cuenta: nos previene de confundir el lenguaje con la realidad que describe.

Hinton genera propiedades emergentes continuas sin declararlas — la cognicion se modela sin reglas simbolicas ni compromisos ontologicos fuertes. Su ambiguedad ontologica es precisamente lo que permite investigar sin decidir primero que es real. El simbolo ∂ que ven en pantalla expresa esa emergencia continua; el simbolo ◇ expresa que la convergencia cerebro-red es posible, no necesaria.

Bechtel nos deja con la pregunta que ninguno de los dos puede responder solo: que condiciones hacen que algo sea una representacion mental en sentido real? Esa pregunta sigue abierta.

La pregunta que dejo para la discusion es esta: si la emergencia continua es epistemicamente inevitable pero ontologicamente ambigua, ¿es mas honesto — y mas fertil — un modelo que asume esa tension que uno que pretende haberla resuelto?

Eso es lo que hace que el texto de Hinton siga siendo filosoficamente relevante en 2024, no solo historicamente interesante.

### Cierre final breve

En una frase:

**Hinton no demuestra que el cerebro sea una computadora; muestra que operar como emergentista epistemico desde un monismo ontologico es la posicion mas pragmatica para investigar la cognicion — y esa ambiguedad resulta ser mas productiva que cualquier compromiso metafisico fuerte.**

---

## Version final del cierre oral

Para terminar, yo diria esto casi literal:

> En conclusion, el texto de Hinton es importante porque no solo presenta una tecnica de aprendizaje, sino una forma de pensar la cognicion como emergencia continua sin compromisos ontologicos fuertes. Su propuesta es que una red puede aprender ajustando conexiones y formando representaciones internas distribuidas — propiedades que ningun componente individual contiene. Eso cambio profundamente la inteligencia artificial y la filosofia de la mente. Sin embargo, Hinton nunca declara que esto sea emergencia, y ahi esta la jugada: al no decidir si P es una propiedad real o un artefacto descriptivo, construye un modelo con menos compromisos metafisicos y mas capacidad predictiva. Esa ambiguedad ontologica no es un defecto — es la posicion mas pragmatica disponible, y es lo que hace que su programa de investigacion siga vivo treinta anos despues.

---

## Preguntas posibles del profesor y respuestas breves

### Si te preguntan: "Entonces Hinton tiene razon o no?"

Yo responderia:

No del todo en sentido descriptivo fuerte. Tiene razon en que el aprendizaje distribuido es una idea muy potente y fecunda. Pero sigue abierta la pregunta de si sus modelos describen realmente como aprende el cerebro biologico.

### Si te preguntan: "Cual es el limite mas importante?"

Yo responderia:

La implausibilidad biologica de la retropropagacion. Es el punto mas fuerte, porque separa el exito computacional del valor explicativo neurocientifico.

### Si te preguntan: "Cual es el aporte filosofico principal?"

Yo responderia:

Que desplaza la cognicion desde reglas simbolicas explicitas hacia representaciones distribuidas aprendidas, y al hacerlo opera como emergentista epistemico sin comprometerse ontologicamente. Esa ambiguedad resulta ser la posicion mas pragmatica: permite investigar sin decidir primero que es real, y genera un modelo con menos compromisos metafisicos y mas capacidad predictiva. Es emergencia continua funcionando como valor epistemico.

### Si te preguntan: "Por que lo conectas con filosofia de las neurociencias?"

Yo responderia:

Porque no es solo un texto tecnico de IA. El texto implica una imagen del cerebro, del aprendizaje y de la representacion. Y esas son justamente preguntas filosoficas centrales en neurociencia.

### Si te preguntan: "Que diferencia hay entre convergencia funcional y convergencia mecanistica?"

Yo responderia:

La convergencia funcional significa que la red y el cerebro producen representaciones similares para la misma tarea. La convergencia mecanistica significaria que ambos aprenden de la misma manera. Andersen y Zipser probaron la primera. La segunda no esta demostrada, porque la retropropagacion no es biologicamente plausible.

### Si te preguntan: "Que es el aprendizaje hebbiano?"

Yo responderia:

Es una regla de aprendizaje local: dos neuronas que se activan juntas fortalecen su conexion. Es mas biologicamente plausible que la retropropagacion porque no requiere una senal de error global. Hinton lo menciona como alternativa, aunque es menos potente computacionalmente.

---

## Recorte de emergencia si tienes poco tiempo

Si la presentacion se te esta alargando, recorta asi:

1. S00: saltar directamente, no decir nada.
2. S02: 30 segundos, mencionar solo la comparativa cerebro vs red.
3. S09: 45 segundos, solo PCA.
4. S12b: 30 segundos, mencionar Andersen-Zipser en una frase y pasar.

Y concentra mas tiempo en:

1. S01 — Apertura
2. S03 — Neurona artificial
3. S05 — Entrenamiento
4. S06 — Retropropagacion
5. S07 — Alcances + critica
6. S08 — Limites
7. S11 — Codigos demograficos
8. S12c — ¿Por que no emergencia? (picante, cierra el arco filosofico)
9. S13 — Cierre argumental

---

## Timing completo — 23.5 minutos

| Slide | Titulo | Tiempo |
|---|---|---|
| S00 | Intro / QR | 0 min (ambiente) |
| S01 | Apertura filosofica | 1 min |
| S02 | La neurona real | 1.5 min |
| S03 | La neurona artificial | 1.5 min |
| S04 | Arquitectura de tres capas | 2 min |
| S05 | Entrenamiento: 4 pasos | 2 min |
| S06 | Retropropagacion | 2 min |
| S07 | Alcances + critica | 1.5 min |
| S08 | Limites | 1 min |
| S09 | No supervisado | 3 min |
| S10 | Repr. distribuidas + recurrentes | 1 min |
| S11 | Codigos demograficos | 1.5 min |
| S12 | De 1992 a hoy | 2 min |
| S12b | Convergencia empirica | 1.5 min |
| S12c | ¿Por que no emergencia? | 2 min |
| S13 | Cierre argumental | 2 min |
| **Total** | | **~25.5 min** |

---

## Ultimo consejo

No intentes demostrar que sabes mas que Hinton, ni mas que el profesor. Te conviene mas esta posicion:

**"Entendi cual es la apuesta de Hinton, por que fue influyente, y donde estan sus limites."**

Con eso ya tienes una presentacion fuerte, clara y filosoficamente solida.
