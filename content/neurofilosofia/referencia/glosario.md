# Glosario completo — Filosofia de las Neurociencias

> Glosario exhaustivo (~95 entradas) construido a partir del corpus del curso
> (`Curso/`, `Contenidos/Explicaciones/Temas/`) y enriquecido con conocimiento
> estandar de undergrad en filosofia de la mente, neurofilosofia y ciencia
> cognitiva. Cada entrada incluye definicion, autor o tradicion asociada,
> archivo del backup donde el tema se trabaja, cross-refs internas y formula
> LaTeX cuando aplica.

## Como usar este glosario

- Las entradas estan en **orden alfabetico**.
- Los cross-refs (Ver tambien) apuntan a otras entradas del mismo doc.
- La ruta de `Doc` es relativa al backup `/home/dev/backup-neuro/repo/`.
- Para mapas de relaciones conceptuales ver `01_mapa_conceptual.md`.

---

## Tabla comparativa rapida — Teorias de la conciencia

| Teoria | Autor(es) | Tesis central | Mecanismo propuesto | Critica clasica |
|---|---|---|---|---|
| **IIT** (Integrated Information Theory) | Tononi | La conciencia es informacion integrada $\phi$ | Cualquier sistema con $\phi>0$ es minimamente consciente | Panpsiquismo computacional encubierto |
| **GWT** (Global Workspace Theory) | Baars, Dehaene | Contenido consciente = lo difundido globalmente | "Ignition" cortical y broadcasting | No explica el `caracter cualitativo` |
| **HOT** (Higher-Order Thought) | Rosenthal | Estado mental consciente = acompañado de un pensamiento de orden superior | Representacion de la representacion | Regreso al infinito; circularidad |
| **NCC** (correlatos neurales) | Crick, Koch | Buscar el conjunto minimo de neuronas suficiente para el contenido consciente | Correlacion empirica sin compromiso ontologico | Correlacion no es explicacion |
| **Predictive / Active Inference** | Friston, Clark | La conciencia emerge de modelos generativos jerarquicos que minimizan free energy | Inferencia bayesiana en el cerebro | Demasiado general; falsabilidad limitada |
| **Biological Naturalism** | Searle | La conciencia es un fenomeno biologico causado por procesos neuronales | Causalidad bottom-up + emergencia | Acusado de dualismo de propiedades velado |
| **Panpsiquismo (constitutivo)** | Goff, Strawson | La conciencia (microexperiencia) es fundamental y ubicua | Combinacion de protofenomenos | Problema de combinacion |
| **Eliminativismo** | P.M. Churchland, P.S. Churchland | Los `qualia` y la psicologia popular no existen; son reemplazables | Madurez de la neurociencia y sustitucion conceptual | Auto-refutante; contraintuitivo |

---

## A

### Access consciousness

**Definicion**: Distinta de la conciencia fenomenica, refiere al contenido que esta disponible para uso racional, reporte verbal y control de la accion. Un estado mental tiene `access consciousness` si su contenido es accesible a procesos cognitivos globales (Block, 1995).
**Autor/Tradicion**: Ned Block (distincion P/A consciousness).
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [Phenomenal consciousness](#phenomenal-consciousness), [GWT](#gwt-global-workspace-theory), [NCC](#ncc-neural-correlates-of-consciousness).

### Agencia

**Definicion**: Capacidad de un sujeto para actuar de modo controlado, intencional o al menos organizado en relacion con metas. En las neurociencias se opera con tres componentes: iniciacion, sentido-de-agencia (judgement of authorship) y monitoreo. Tradicion experimental: Libet (1983), Haggard.
**Autor/Tradicion**: Suchy; Obhi y Haggard.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/04_obhi_haggard_libre_albedrio.md`
**Ver tambien**: [Funcion ejecutiva](#funcion-ejecutiva), [Libre albedrio](#libre-albedrio), [Veto consciente](#veto-consciente).

### Amigdala

**Definicion**: Nucleo del lobulo temporal medial central en aprendizaje del miedo, valoracion emocional y modulacion de la memoria. LeDoux distingue dos rutas: "low road" subcortical rapida (talamo-amigdala) y "high road" cortical lenta (talamo-corteza-amigdala).
**Autor/Tradicion**: LeDoux.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/01_ledoux_emocion_memoria_y_cerebro.md`
**Ver tambien**: [Emocion](#emocion), [Memoria emocional](#memoria-emocional), [Interocepcion](#interocepcion).

### Aprendizaje hebbiano

**Definicion**: Regla "neurons that fire together, wire together": las sinapsis se fortalecen cuando neurona presinaptica y postsinaptica se activan conjuntamente. Formalizacion: $\Delta w_{ij} = \eta \cdot x_i \cdot y_j$, donde $w_{ij}$ es el peso entre neuronas $i$ y $j$, $\eta$ es la tasa de aprendizaje.
**Autor/Tradicion**: Donald Hebb (1949); base biofisica: LTP de Bliss & Lomo (1973).
**Doc**: `Curso/Presenacion/ExplicacionesExtra_ConexionNeuronalYSinapsis.md`; `Curso/TerceraClase/16_aprendizaje_plasticidad_e_ideas_previas_del_cerebro.md`
**Ver tambien**: [LTP](#ltp-long-term-potentiation), [Plasticidad sinaptica](#plasticidad-sinaptica), [Conexionismo](#conexionismo).

### Artefacto (experimental)

**Definicion**: Patron en los datos producido por la tecnica o el procedimiento mismo y no por el fenomeno medido. En neuroimagen los artefactos clasicos son: movimiento del sujeto, ruido fisiologico (latido, respiracion), drift del scanner, regiones con baja relacion senal/ruido (orbitofrontal por susceptibilidad).
**Autor/Tradicion**: Bechtel (epistemologia de la evidencia).
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`
**Ver tambien**: [Epistemologia de la evidencia](#epistemologia-de-la-evidencia), [Neuroimagen funcional](#neuroimagen-funcional), [Localizacion](#localizacion).

### Astrocitos

**Definicion**: Celulas de la glia con forma estrellada que dan soporte metabolico a las neuronas, mantienen la barrera hematoencefalica, recaptan glutamato y modulan la sinapsis tripartita. Ya no se las considera meramente pasivas: participan en LTP y en el acople neurovascular que la fMRI mide.
**Autor/Tradicion**: Neuroanatomia funcional contemporanea.
**Doc**: `Curso/TerceraClase/02_astrocitos.md`
**Ver tambien**: [Sinapsis](#sinapsis), [Barrera hematoencefalica](#barrera-hematoencefalica), [fMRI](#fmri).

### Atencion

**Definicion**: Conjunto de procesos selectivos que priorizan ciertos contenidos sensoriales o cognitivos sobre otros. Posner distinguio redes de alerta, orientacion y control ejecutivo. La atencion se modela como ganancia ($gain$) sobre representaciones: $r_i = g_i \cdot s_i$.
**Autor/Tradicion**: Posner, Petersen; Suchy.
**Doc**: `Contenidos/Explicaciones/Temas/FuncionesEjecutivasYLobulosFrontales/01_suchy_funciones_ejecutivas.md`
**Ver tambien**: [Funcion ejecutiva](#funcion-ejecutiva), [Red de saliencia](#red-de-saliencia), [Conciencia](#conciencia).

## B

### Backpropagation

**Definicion**: Algoritmo de aprendizaje supervisado para redes neuronales multicapa que propaga el error desde la salida hacia las capas ocultas via regla de la cadena, ajustando pesos por descenso del gradiente. Formalmente: $\Delta w_{ji} = -\eta \, \partial E / \partial w_{ji}$. Rumelhart, Hinton y Williams (1986) lo popularizaron; Hinton lo discute como mecanismo (no necesariamente biologico).
**Autor/Tradicion**: Rumelhart, Hinton, Williams; Hinton (1992).
**Doc**: `Curso/Presenacion/2b - Hinton - Redes Neuronales que Aprenden de la Experiencia.md`
**Ver tambien**: [Conexionismo](#conexionismo), [Perceptron](#perceptron), [Deep learning](#deep-learning).

### Barrera hematoencefalica

**Definicion**: Barrera selectiva formada por uniones estrechas entre celulas endoteliales de capilares cerebrales, regulada por astrocitos y pericitos. Filtra el paso de moleculas entre sangre y parenquima cerebral. Relevante para farmacologia y para patologias neuroinflamatorias.
**Autor/Tradicion**: Neuroanatomia clinica.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/07_neuroanatomy_through_clinical_cases.md`
**Ver tambien**: [Astrocitos](#astrocitos), [Microglia](#microglia).

### Biological naturalism

**Definicion**: Tesis de Searle: la conciencia es un fenomeno biologico real, causado por procesos neuronales y realizado en la estructura del cerebro, sin reducirse a computacion ni implicar dualismo. La consciousness es a la actividad neuronal lo que la digestion es al estomago.
**Autor/Tradicion**: John Searle.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Chinese Room](#chinese-room), [Hard Problem](#hard-problem), [Funcionalismo](#funcionalismo).

### Blindsight

**Definicion**: Capacidad residual de pacientes con lesion de V1 para responder a estimulos visuales en el "campo ciego" sin reporte consciente. Argumento empirico clave contra identidad simple entre vision y conciencia, y a favor de distinguir conciencia fenomenica de procesamiento.
**Autor/Tradicion**: Weiskrantz (1986).
**Doc**: `Contenidos/Explicaciones/Temas/PercepcionYVision/02_zeki_imagen_visual_mente_y_cerebro.md`
**Ver tambien**: [V1](#v1-corteza-visual-primaria), [Phenomenal consciousness](#phenomenal-consciousness), [NCC](#ncc-neural-correlates-of-consciousness).

### Broadcasting (en GWT)

**Definicion**: Mecanismo central de la Global Workspace Theory: un contenido se vuelve consciente cuando es difundido (broadcast) por una red cortical fronto-parietal que lo hace disponible a otros modulos cerebrales. Dehaene operacionaliza el "ignition" como aumento abrupto y no lineal de actividad cortical alrededor de los 300 ms.
**Autor/Tradicion**: Baars; Dehaene y Naccache.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [GWT](#gwt-global-workspace-theory), [P300](#p300), [Atencion](#atencion).

## C

### Cerebelo

**Definicion**: Estructura del rombencefalo con citoarquitectura repetitiva (celulas de Purkinje, granulares, fibras paralelas) implicada en coordinacion motora, aprendizaje motor (timing fino) y funciones cognitivas. Marr (1969) propuso un modelo de aprendizaje supervisado del cerebelo que anticipa ideas de ML.
**Autor/Tradicion**: Marr; neuroanatomia clinica.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/07_neuroanatomy_through_clinical_cases.md`
**Ver tambien**: [Marr levels](#marr-levels-of-analysis), [Aprendizaje hebbiano](#aprendizaje-hebbiano).

### Chinese Room

**Definicion**: Experimento mental de Searle (1980): un agente que manipula simbolos chinos siguiendo un manual sintactico puede pasar el test de Turing sin entender chino. Argumento contra el funcionalismo computacional fuerte: la sintaxis no basta para la semantica.
**Autor/Tradicion**: John Searle (1980).
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Funcionalismo](#funcionalismo), [Biological naturalism](#biological-naturalism), [Intencionalidad](#intencionalidad).

### Conciencia

**Definicion**: Termino polisemico que el corpus desagrega en al menos: (i) **vigilia** (arousal), (ii) **awareness** o contenido, (iii) **conciencia fenomenica** (qualia), (iv) **conciencia de acceso**. Laureys insiste en que vigilia y awareness son disociables: estados vegetativos muestran vigilia preservada sin awareness.
**Autor/Tradicion**: Laureys; Block; Tononi; Dehaene.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [Phenomenal consciousness](#phenomenal-consciousness), [Access consciousness](#access-consciousness), [Vigilia](#vigilia), [Hard Problem](#hard-problem).

### Conexionismo

**Definicion**: Enfoque cognitivo segun el cual procesos mentales son patrones de activacion distribuida en redes de unidades simples conectadas. Hinton, McClelland y los Churchland defendieron su plausibilidad neural. Contraste: simbolismo clasico (Fodor, Pylyshyn). Critica de Fodor & Pylyshyn (1988): sistematicidad y productividad del pensamiento.
**Autor/Tradicion**: Rumelhart, Hinton, McClelland; P.M. Churchland.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/03_hinton_redes_neuronales.md`; `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Backpropagation](#backpropagation), [Distributed representations](#distributed-representations), [Eliminativismo](#eliminativismo).

### Constructo neuropsiquiatrico

**Definicion**: Categoria-puente que articula un patron psicopatologico con uno neuropatologico, validada por convergencia clinica, anatomica, funcional y respuesta a tratamiento. Ramirez-Bermudez et al. critican constructos que solo cumplen un nivel y proponen criterios de validacion multinivel.
**Autor/Tradicion**: Ramirez-Bermudez, Perez-Gay y Aliseda.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/04_ramirez_bermudez_constructos_neuropsiquiatricos.md`
**Ver tambien**: [Mecanismo](#mecanismo), [Reduccion](#reduccion), [DSM](#dsm-y-clasificacion-psiquiatrica).

### Corteza prefrontal (PFC)

**Definicion**: Region anterior del lobulo frontal asociada a planificacion, memoria de trabajo, inhibicion, control cognitivo y conducta dirigida a metas. Suchy y Miller-Cummings la presentan como sustrato critico de las funciones ejecutivas. Subdivisiones funcionales: dorsolateral, medial, orbitofrontal, ventromedial.
**Autor/Tradicion**: Suchy; Miller y Cummings.
**Doc**: `Contenidos/Explicaciones/Temas/FuncionesEjecutivasYLobulosFrontales/02_miller_cummings_lobulos_frontales.md`
**Ver tambien**: [Funcion ejecutiva](#funcion-ejecutiva), [Lobulos frontales](#lobulos-frontales), [Marcador somatico](#marcador-somatico).

## D

### Deep learning

**Definicion**: Subcampo del aprendizaje automatico basado en redes neuronales con multiples capas ocultas que aprenden representaciones jerarquicas de los datos. Su raiz historica esta en Hinton (backprop, restricted Boltzmann machines, deep belief nets). Relevante para discusiones sobre modelos del cerebro y plausibilidad biologica.
**Autor/Tradicion**: Hinton, LeCun, Bengio.
**Doc**: `Curso/Presenacion/2b - Hinton - Redes Neuronales que Aprenden de la Experiencia.md`
**Ver tambien**: [Backpropagation](#backpropagation), [Conexionismo](#conexionismo), [Distributed representations](#distributed-representations).

### Descomposicion funcional

**Definicion**: Estrategia de explicacion mecanicista: identificar las operaciones componentes que, organizadas en una arquitectura, producen el fenomeno. Bechtel: explicar es localizar (donde) y descomponer (en que partes y operaciones). Riesgo: descomposicion en partes que no son entidades reales del sistema (reificacion).
**Autor/Tradicion**: Bechtel; Cummins.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/02_bechtel_mental_mechanisms.md`
**Ver tambien**: [Mecanismo](#mecanismo), [Localizacion](#localizacion), [Niveles de explicacion](#niveles-de-explicacion).

### Distributed representations

**Definicion**: Representaciones en las que un concepto se codifica como patron de actividad sobre muchas unidades, en oposicion a la representacion local "una neurona, un concepto". Ventajas: generalizacion, robustez ante ruido, capacidad de interpolar. Hinton es su defensor canonico.
**Autor/Tradicion**: Hinton, Rumelhart.
**Doc**: `Curso/Presenacion/2b - Hinton - Redes Neuronales que Aprenden de la Experiencia.md`
**Ver tambien**: [Cell de la abuela](#celula-de-la-abuela), [Conexionismo](#conexionismo), [Backpropagation](#backpropagation).

### Downward causation

**Definicion**: Tesis segun la cual propiedades de niveles superiores (mental, sistemico) ejercen causalidad sobre niveles inferiores (neural, fisico-quimico). Disputada: Kim sostiene que viola la cerradura causal del fisico. Aceptada en formas "no problematicas" (suplencia mecanistica de Craver). Relevante para emergentismo y psicologia popular.
**Autor/Tradicion**: Kim (critico); Campbell, Craver (defensores moderados).
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Reduccion](#reduccion), [Supervenencia](#supervenencia), [Emergencia](#emergencia).

### DSM y clasificacion psiquiatrica

**Definicion**: Manual diagnostico de trastornos mentales (DSM-5/5-TR de la APA). Ramirez-Bermudez et al. lo discuten como sistema descriptivo-fenomenologico cuya validez de constructo es polemica: alto kappa de confiabilidad, validez biologica limitada. Alternativa: RDoC (NIMH) basada en dimensiones neurobiologicas.
**Autor/Tradicion**: APA; critica desde Ramirez-Bermudez, Aliseda.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/04_ramirez_bermudez_constructos_neuropsiquiatricos.md`
**Ver tambien**: [Constructo neuropsiquiatrico](#constructo-neuropsiquiatrico), [RDoC](#rdoc).

### Dualismo de propiedades

**Definicion**: Tesis ontologica segun la cual existe una sola sustancia (fisica) pero dos tipos irreducibles de propiedades: fisicas y mentales/fenomenicas. Chalmers la defiende a partir del Hard Problem. Compatible con supervenencia natural pero no con reduccion logica.
**Autor/Tradicion**: David Chalmers.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Hard Problem](#hard-problem), [Qualia](#qualia), [Supervenencia](#supervenencia), [Dualismo sustancial](#dualismo-sustancial).

### Dualismo sustancial

**Definicion**: Tesis cartesiana segun la cual mente (res cogitans) y cuerpo (res extensa) son sustancias distintas que interactuan causalmente. Casi universalmente rechazado en filosofia de la mente contemporanea por problemas de interaccion causal (paradoja del Princess Elisabeth) e incompatibilidad con la cerradura causal del fisico.
**Autor/Tradicion**: Descartes.
**Doc**: `Curso/QuintaClase/Charla1.md`; `Curso/QuintaClase/Charla2.md`
**Ver tambien**: [Dualismo de propiedades](#dualismo-de-propiedades), [Materialismo](#materialismo), [Problema mente-cuerpo](#problema-mente-cuerpo).

## E

### Easy problems of consciousness

**Definicion**: Conjunto de problemas que, segun Chalmers, son "faciles" en tanto admiten en principio explicacion funcional/mecanistica: discriminacion perceptiva, reporte verbal, control de la atencion, integracion de informacion, diferencia entre vigilia y sueno. Contraste con el Hard Problem.
**Autor/Tradicion**: David Chalmers (1995).
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/00_indice.md`
**Ver tambien**: [Hard Problem](#hard-problem), [Funcionalismo](#funcionalismo), [NCC](#ncc-neural-correlates-of-consciousness).

### Eliminativismo (materialismo eliminativo)

**Definicion**: Tesis de los Churchland: los conceptos de la psicologia popular (creencias, deseos, qualia) no se reduciran a la neurociencia sino que seran reemplazados, como lo fueron flogisto o calorico. Una neurociencia madura prescindira de "mente" como vocabulario teorico.
**Autor/Tradicion**: P.M. Churchland, P.S. Churchland.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Reduccion](#reduccion), [Psicologia popular](#psicologia-popular-folk-psychology), [Identidad psico-neural](#identidad-psico-neural).

### Embodied cognition (cognicion corporizada)

**Definicion**: Familia de enfoques segun los cuales la cognicion no es solo procesamiento simbolico desencarnado sino que esta constitutivamente involucrada con cuerpo, accion y entorno. Variantes: enactivismo, cognicion situada, 4E (embodied, embedded, enacted, extended).
**Autor/Tradicion**: Varela, Thompson, Rosch; Clark; Gallagher.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`
**Ver tambien**: [Enactivismo](#enactivismo), [Neurofenomenologia](#neurofenomenologia), [Inferencia activa](#inferencia-activa).

### Emergencia

**Definicion**: Propiedad de un sistema compuesto que no esta presente en sus partes aisladas. Se distingue emergencia debil (predecible desde las partes) de fuerte (con causalidad descendente irreducible). Searle y Bechtel la usan en sentidos distintos: Searle para defender el biological naturalism; Bechtel para articular mecanismos.
**Autor/Tradicion**: Broad; Searle; Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/02_bechtel_mental_mechanisms.md`
**Ver tambien**: [Downward causation](#downward-causation), [Mecanismo](#mecanismo), [Supervenencia](#supervenencia).

### Emocion

**Definicion**: LeDoux la separa de la "sensacion subjetiva" (feeling): la emocion es un mecanismo cerebral de evaluacion y respuesta a estimulos relevantes; el feeling es su conciencia. Barrett propone la teoria construida: las emociones no son categorias naturales fijas, sino conceptualizaciones del estado afectivo.
**Autor/Tradicion**: LeDoux; Barrett.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/01_ledoux_emocion_memoria_y_cerebro.md`; `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/03_barrett_emocion_y_enfermedad.md`
**Ver tambien**: [Amigdala](#amigdala), [Interocepcion](#interocepcion), [Marcador somatico](#marcador-somatico).

### Enactivismo

**Definicion**: Tradicion fundada por Varela, Thompson y Rosch en *The Embodied Mind* (1991). La cognicion no representa un mundo dado: lo "hace emerger" (enacts) en la interaccion sensoriomotora. Critica al representacionalismo computacional clasico.
**Autor/Tradicion**: Varela, Thompson, Rosch.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`
**Ver tambien**: [Embodied cognition](#embodied-cognition-cognicion-corporizada), [Neurofenomenologia](#neurofenomenologia), [Representacion](#representacion).

### Engrama (huella mnestica)

**Definicion**: Sustrato fisico que almacena un recuerdo. Termino propuesto por Semon (1904), refundado por Lashley, hoy operacionalizado en optogenetica (Tonegawa et al.) como conjunto de neuronas (engram cells) cuya reactivacion suficiente recupera el recuerdo.
**Autor/Tradicion**: Semon; Lashley; Tonegawa.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`
**Ver tambien**: [Memoria episodica](#memoria-episodica), [LTP](#ltp-long-term-potentiation), [Engrama distribuido](#engrama-distribuido).

### Engrama distribuido

**Definicion**: Tesis segun la cual un recuerdo no esta localizado en una sola neurona o sinapsis sino en un patron distribuido de cambios sinapticos a traves de multiples regiones. Coherente con la "ley de equipotencialidad" de Lashley y con la representacion distribuida de Hinton.
**Autor/Tradicion**: Lashley; conexionismo.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/03_bechtel_representaciones.md`
**Ver tambien**: [Distributed representations](#distributed-representations), [Engrama](#engrama-huella-mnestica), [Hipocampo](#hipocampo).

### Epistemologia de la evidencia

**Definicion**: Rama del analisis filosofico de la ciencia que estudia bajo que condiciones un dato cuenta como evidencia. En neurociencia: como articular medidas indirectas (BOLD, EEG, registros unicelulares) con afirmaciones sobre procesos cognitivos. Bechtel insiste en la triangulacion entre tecnicas.
**Autor/Tradicion**: Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`
**Ver tambien**: [Artefacto](#artefacto-experimental), [Inferencia inversa](#inferencia-inversa), [Neuroimagen funcional](#neuroimagen-funcional).

### Especializacion funcional

**Definicion**: Idea de que distintas regiones cerebrales realizan o privilegian funciones diferentes. Zeki (vision): areas V1, V2, V4, V5/MT con sensibilidades distintas (color, forma, movimiento). Critica: la especializacion convive con interaccion en red y reentrada.
**Autor/Tradicion**: Zeki; Hubel y Wiesel.
**Doc**: `Contenidos/Explicaciones/Temas/PercepcionYVision/02_zeki_imagen_visual_mente_y_cerebro.md`
**Ver tambien**: [V1](#v1-corteza-visual-primaria), [Localizacion](#localizacion), [Integracion multimodal](#integracion-multimodal).

## F

### fMRI (resonancia magnetica funcional)

**Definicion**: Tecnica que mide el contraste BOLD (Blood Oxygen Level Dependent), una senal indirecta de actividad neuronal mediada por el acople neurovascular. Resolucion espacial ~1-3 mm, temporal ~2 s. Limitaciones: indirecta, sensible a artefactos de movimiento, requiere disenos contrastivos.
**Autor/Tradicion**: Ogawa (1990); Raichle.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/02_raichle_visualizando_la_mente.md`
**Ver tambien**: [Neuroimagen funcional](#neuroimagen-funcional), [Inferencia inversa](#inferencia-inversa), [Acople neurovascular](#acople-neurovascular).

### Free energy principle

**Definicion**: Principio variacional de Friston: todo sistema autoorganizado que mantiene su homeostasis minimiza una cantidad llamada free energy variacional, $F$, que acota superiormente la sorpresa (surprise) del organismo. Formalmente, $F = E_{q(\theta)}[\ln q(\theta) - \ln p(o,\theta)] \geq -\ln p(o)$. Minimizar $F$ equivale a hacer inferencia bayesiana aproximada sobre causas ocultas.
**Autor/Tradicion**: Karl Friston.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`; `Contenidos/Explicaciones/Temas/VisualizacionesYModelos/08_cerebro_predictivo_y_formalizacion.md`
**Ver tambien**: [Predictive coding](#predictive-coding), [Inferencia activa](#inferencia-activa), [Bayesianismo](#bayesianismo).

### Funcion ejecutiva

**Definicion**: Conjunto de procesos de control que organizan conducta y cognicion: planificacion, memoria de trabajo, flexibilidad, inhibicion, monitoreo. Suchy enfatiza que no es una sola funcion sino una familia. Sustrato: corteza prefrontal y sus circuitos con ganglios basales y talamo.
**Autor/Tradicion**: Suchy; Miyake et al. (modelo unity/diversity).
**Doc**: `Contenidos/Explicaciones/Temas/FuncionesEjecutivasYLobulosFrontales/01_suchy_funciones_ejecutivas.md`
**Ver tambien**: [Corteza prefrontal](#corteza-prefrontal-pfc), [Memoria de trabajo](#memoria-de-trabajo), [Agencia](#agencia).

### Funcionalismo

**Definicion**: Tesis filosofica segun la cual los estados mentales se individuan por sus roles causales (entradas, estados internos, salidas) y no por su sustrato fisico. Implica multiple realizability: el mismo estado mental podria realizarse en silicio o en biologia humana. Variantes: maquinico (Putnam), psicofuncionalismo, teleofuncionalismo.
**Autor/Tradicion**: Putnam, Fodor, Block.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Multiple realizability](#multiple-realizability), [Identidad psico-neural](#identidad-psico-neural), [Chinese Room](#chinese-room).

## G

### Ganglios basales

**Definicion**: Conjunto de nucleos subcorticales (caudado, putamen, globo palido, sustancia negra, nucleo subtalamico) implicados en seleccion de accion, aprendizaje por refuerzo y modulacion del tono motor. Disfuncion en Parkinson, Huntington, TOC, Tourette.
**Autor/Tradicion**: Neuroanatomia clinica.
**Doc**: `Curso/TerceraClase/15_ganglios_basales_talamo_e_insula.md`
**Ver tambien**: [Reinforcement learning](#reinforcement-learning), [Dopamina](#dopamina), [Corteza prefrontal](#corteza-prefrontal-pfc).

### GPS del cerebro (place y grid cells)

**Definicion**: Sistema de representacion espacial descubierto por O'Keefe (place cells del hipocampo, 1971) y los Moser (grid cells de la corteza entorrinal, 2005). Modelo de cognicion mapificada y de representacion no propositional.
**Autor/Tradicion**: O'Keefe; Moser y Moser (Nobel 2014).
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/04_moser_moser_gps_del_cerebro.md`
**Ver tambien**: [Hipocampo](#hipocampo), [Representacion](#representacion), [Memoria episodica](#memoria-episodica).

### GWT (Global Workspace Theory)

**Definicion**: Teoria de Baars (1988) refinada por Dehaene y Changeux: la conciencia surge cuando un contenido es "encendido" (ignited) y difundido por una red fronto-parietal de neuronas con axones largos. Operacionalizable: marca el P300 y aumentos sostenidos de gamma. $\phi$ no es lo central; si el broadcasting.
**Autor/Tradicion**: Baars; Dehaene, Changeux.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Broadcasting](#broadcasting-en-gwt), [Access consciousness](#access-consciousness), [IIT](#iit-integrated-information-theory), [P300](#p300).

## H

### Hard Problem

**Definicion**: Acuñado por Chalmers (1995): explicar por que y como los procesos fisicos del cerebro dan lugar a la experiencia subjetiva (qualia). Distinto de los "easy problems" porque incluso una explicacion funcional completa parece dejar una "explanatory gap". $$\text{Explicar } P \to \text{Q} \text{ donde Q tiene 'algo que es ser'}$$
**Autor/Tradicion**: David Chalmers (1995).
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Easy problems](#easy-problems-of-consciousness), [Qualia](#qualia), [Explanatory gap](#explanatory-gap), [Mary's room](#marys-room).

### Hipocampo

**Definicion**: Estructura del lobulo temporal medial (formacion hipocampal: hipocampo propiamente, giro dentado, subiculo) critica para memoria episodica, consolidacion y navegacion espacial. El caso H.M. (Scoville & Milner, 1957) establecio su rol mnesico.
**Autor/Tradicion**: Scoville y Milner; O'Keefe; Squire.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`; `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/04_moser_moser_gps_del_cerebro.md`
**Ver tambien**: [Memoria episodica](#memoria-episodica), [GPS del cerebro](#gps-del-cerebro-place-y-grid-cells), [Engrama](#engrama-huella-mnestica).

### Homunculo motor y somatosensorial

**Definicion**: Mapa topografico (cortical) de la representacion del cuerpo en M1 (Penfield-Boldrey) y S1 (Penfield-Rasmussen). Su distorsion (manos y cara sobrerrepresentadas) refleja densidad de inervacion, no tamano corporal.
**Autor/Tradicion**: Penfield.
**Doc**: `Curso/TerceraClase/13_homunculo_motor_y_somatosensorial.md`
**Ver tambien**: [M1](#m1-corteza-motora-primaria), [Plasticidad sinaptica](#plasticidad-sinaptica), [Representacion](#representacion).

## I

### Identidad psico-neural (type/token)

**Definicion**: Tesis de la teoria de la identidad mente-cerebro. **Type identity** (Smart, Place): cada tipo de estado mental es identico a un tipo de estado cerebral (dolor = activacion fibras-C). **Token identity** (Davidson): cada ocurrencia particular de un estado mental es identica a alguna ocurrencia neural, pero no hay correspondencia tipo-tipo.
**Autor/Tradicion**: Smart, Place (type); Davidson (token, monismo anomalo).
**Doc**: `Curso/QuintaClase/Charla1.md`; `Curso/QuintaClase/Charla2.md`
**Ver tambien**: [Multiple realizability](#multiple-realizability), [Funcionalismo](#funcionalismo), [Supervenencia](#supervenencia).

### IIT (Integrated Information Theory)

**Definicion**: Teoria de Tononi: la conciencia es informacion integrada generada por un sistema fisico, medida por $\phi$ (phi), la cantidad de informacion que el sistema-como-todo genera sobre si mismo y que no puede reducirse a la suma de sus partes. Postulados (axiomas fenomenologicos a postulados fisicos): intrinseca, estructurada, integrada, especifica, definida.
**Autor/Tradicion**: Giulio Tononi; Christof Koch.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Phi](#phi-φ), [GWT](#gwt-global-workspace-theory), [Panpsiquismo](#panpsiquismo), [NCC](#ncc-neural-correlates-of-consciousness).

### Inferencia activa

**Definicion**: Dentro del Free Energy Principle, la accion como herramienta para minimizar prediction error: en lugar de actualizar el modelo, el agente modifica el mundo (o su acoplamiento sensorial) para que confirme sus predicciones. Friston la formaliza como gradiente sobre $F$ respecto a la accion.
**Autor/Tradicion**: Friston.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`
**Ver tambien**: [Free energy principle](#free-energy-principle), [Predictive coding](#predictive-coding), [Enactivismo](#enactivismo).

### Inferencia inversa

**Definicion**: Falacia metodologica frecuente en neuroimagen: concluir que una funcion cognitiva $C$ esta presente porque se activa una region $R$ asociada a $C$. Poldrack: $P(C \mid R)$ no es alta sin priors fuertes; requiere modelar $P(R)$ y la selectividad de $R$ para $C$.
**Autor/Tradicion**: Russell Poldrack; Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`
**Ver tambien**: [fMRI](#fmri-resonancia-magnetica-funcional), [Epistemologia de la evidencia](#epistemologia-de-la-evidencia), [Bayesianismo](#bayesianismo).

### Integracion multimodal

**Definicion**: Capacidad del cerebro de combinar informacion de modalidades sensoriales distintas (visual, auditiva, somatica) en una representacion coherente. Areas: surco temporal superior, insula, corteza parietal posterior. Modelo formal: integracion bayesiana ponderada por confiabilidad ($w_i \propto 1/\sigma_i^2$).
**Autor/Tradicion**: Ernst y Banks; Stein y Meredith.
**Doc**: `Curso/TerceraClase/14_representaciones_multimodalidad_y_flujo.md`
**Ver tambien**: [Bayesianismo](#bayesianismo), [Predictive coding](#predictive-coding), [Insula](#insula).

### Intencionalidad

**Definicion**: Propiedad de los estados mentales de ser "acerca de" algo (Brentano: el rasgo distintivo de lo mental). En filosofia analitica contemporanea, problema central de la semantica naturalizada: como dar cuenta de la intencionalidad en terminos fisicos. Soluciones: causal-informacional (Dretske), teleologica (Millikan), interpretacionista (Dennett).
**Autor/Tradicion**: Brentano; Dretske, Millikan, Dennett.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/03_bechtel_representaciones.md`
**Ver tambien**: [Representacion](#representacion), [Intentional stance](#intentional-stance), [Chinese Room](#chinese-room).

### Intentional stance

**Definicion**: Estrategia interpretativa de Dennett: tratar a un sistema como si tuviera creencias y deseos racionales para predecir su conducta, sin compromiso ontologico fuerte sobre estados mentales internos. Tres niveles: physical stance, design stance, intentional stance.
**Autor/Tradicion**: Daniel Dennett.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Intencionalidad](#intencionalidad), [Funcionalismo](#funcionalismo), [Psicologia popular](#psicologia-popular-folk-psychology).

### Interocepcion

**Definicion**: Procesos por los que el organismo detecta, integra y regula senales internas del cuerpo (fisiologicas, viscerales, homeostaticas). Sustrato: insula, corteza cingulada anterior, hipotalamo. Chen et al. la presentan como dimension transversal a emocion, conciencia y enfermedad.
**Autor/Tradicion**: Craig; Chen et al.; Barrett.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/02_chen_interocepcion.md`
**Ver tambien**: [Emocion](#emocion), [Insula](#insula), [Marcador somatico](#marcador-somatico), [Red de saliencia](#red-de-saliencia).

### Insula

**Definicion**: Lobulo cortical "oculto" en el surco lateral, central para interocepcion, gusto, percepcion del dolor, asco, conciencia corporal y red de saliencia. Subdivisiones: posterior (sensorial primaria), media, anterior (afectiva-cognitiva).
**Autor/Tradicion**: Craig.
**Doc**: `Curso/TerceraClase/15_ganglios_basales_talamo_e_insula.md`
**Ver tambien**: [Interocepcion](#interocepcion), [Red de saliencia](#red-de-saliencia), [Emocion](#emocion).

## L

### Lateralizacion

**Definicion**: Especializacion hemisferica de funciones. Clasica: lenguaje en el hemisferio izquierdo (areas de Broca y Wernicke en ~95% de diestros, ~70% de zurdos), procesamiento espacial en derecho. Hickok et al. muestran que la lengua de signos tambien lateraliza a izquierda, mostrando que lo crucial es la funcion linguistica, no la modalidad.
**Autor/Tradicion**: Broca, Wernicke; Hickok, Bellugi y Klima.
**Doc**: `Contenidos/Explicaciones/Temas/Lenguaje/02_hickok_bellugi_klima_lenguaje_de_senas.md`
**Ver tambien**: [Lenguaje](#lenguaje), [Area de Broca](#area-de-broca).

### Lenguaje

**Definicion**: Sistema simbolico-comunicativo. La neurolinguistica investiga su sustrato cerebral con afasias, fMRI, MEG. Baggio organiza el campo en niveles (fonologia, morfologia, sintaxis, semantica, pragmatica) y modelos (clasicos modulares vs distribuidos).
**Autor/Tradicion**: Baggio; Hickok et al.
**Doc**: `Contenidos/Explicaciones/Temas/Lenguaje/01_baggio_neurolinguistica.md`
**Ver tambien**: [Lateralizacion](#lateralizacion), [Area de Broca](#area-de-broca), [Afasia](#afasia).

### Area de Broca / Wernicke / Afasia

**Definicion**: **Broca** (giro frontal inferior izquierdo): afasia no fluente, articulacion preservada de sintaxis pobre. **Wernicke** (giro temporal superior posterior): afasia fluente, sintaxis preservada de comprension pobre y parafasias semanticas. Modelo clasico Wernicke-Lichtheim-Geschwind hoy superado por modelos de dos rutas (dorsal/ventral) de Hickok y Poeppel.
**Autor/Tradicion**: Broca (1861); Wernicke (1874); Hickok-Poeppel.
**Doc**: `Contenidos/Explicaciones/Temas/Lenguaje/01_baggio_neurolinguistica.md`
**Ver tambien**: [Lenguaje](#lenguaje), [Lateralizacion](#lateralizacion).

### Lesion (metodo lesional)

**Definicion**: Inferencia de la funcion de una region a partir de los deficits causados por su dano. Logica clasica: si lesion en $R$ produce deficit en $C$, entonces $R$ es necesaria para $C$. Limites: redes compensatorias, plasticidad, dificultad de aislar lesiones puras.
**Autor/Tradicion**: Broca; Bechtel.
**Doc**: `Curso/CuartaClase/03_lesiones_y_deficits.md`; `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`
**Ver tambien**: [Doble disociacion](#doble-disociacion), [Localizacion](#localizacion), [Epistemologia de la evidencia](#epistemologia-de-la-evidencia).

### Libre albedrio

**Definicion**: Capacidad de iniciar conducta no determinada por factores externos al agente. Libet (1983) mostro el potencial de preparacion (readiness potential) anterior a la conciencia de la decision (~300-500 ms antes), planteando un desafio empirico. Obhi y Haggard distinguen "free will" (iniciacion) de "free wont" (veto), argumentando que el veto conserva un rol agentivo.
**Autor/Tradicion**: Libet; Obhi y Haggard.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/04_obhi_haggard_libre_albedrio.md`
**Ver tambien**: [Veto consciente](#veto-consciente), [Agencia](#agencia), [Potencial de preparacion](#potencial-de-preparacion).

### Localizacion

**Definicion**: Asignacion de una operacion o funcion cognitiva a una region, circuito o sistema cerebral. Util como heuristica, problematica cuando se reifica ("el area X hace Y"). Bechtel propone localizacion como hipotesis de trabajo de la descomposicion mecanistica.
**Autor/Tradicion**: Bechtel; Mundale.
**Doc**: `Curso/CuartaClase/06_localizacion_mecanismos_y_limites.md`
**Ver tambien**: [Mecanismo](#mecanismo), [Descomposicion funcional](#descomposicion-funcional), [Especializacion funcional](#especializacion-funcional).

### LTP (Long-Term Potentiation)

**Definicion**: Aumento duradero (horas-dias) de la eficacia sinaptica tras estimulacion de alta frecuencia. Descubierto por Bliss & Lomo (1973) en hipocampo. Sustrato celular candidato del aprendizaje y la memoria. Mecanismo: receptores NMDA, entrada de $Ca^{2+}$, insercion de receptores AMPA. Formula esquematica: $\text{NMDA}_{open} \to Ca^{2+} \uparrow \to \text{LTP}$.
**Autor/Tradicion**: Bliss y Lomo; Kandel.
**Doc**: `Curso/TerceraClase/05_sinapsis_y_neurotransmisores.md`; `Curso/TerceraClase/16_aprendizaje_plasticidad_e_ideas_previas_del_cerebro.md`
**Ver tambien**: [Aprendizaje hebbiano](#aprendizaje-hebbiano), [Plasticidad sinaptica](#plasticidad-sinaptica), [Hipocampo](#hipocampo).

## M

### M1 (corteza motora primaria)

**Definicion**: Giro precentral, area 4 de Brodmann. Genera comandos motores especificos hacia la medula via tracto corticoespinal. Contiene el homunculo motor. Estimulacion electrica directa (Penfield) reproduce movimientos contralaterales.
**Autor/Tradicion**: Penfield; neuroanatomia clinica.
**Doc**: `Curso/TerceraClase/13_homunculo_motor_y_somatosensorial.md`
**Ver tambien**: [Homunculo](#homunculo-motor-y-somatosensorial), [Corteza prefrontal](#corteza-prefrontal-pfc).

### Marcador somatico

**Definicion**: Hipotesis de Damasio: senales corporales (viscerales, neuroquimicas) marcadas afectivamente acompanan opciones de decision y sesgan la eleccion antes de que la deliberacion racional explicita la procese. Sustrato: corteza prefrontal ventromedial. Evidencia: Iowa Gambling Task.
**Autor/Tradicion**: Antonio Damasio.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/03_barrett_emocion_y_enfermedad.md`
**Ver tambien**: [Interocepcion](#interocepcion), [Emocion](#emocion), [Funcion ejecutiva](#funcion-ejecutiva).

### Marr levels of analysis

**Definicion**: David Marr (1982) propuso tres niveles de explicacion para sistemas de procesamiento de informacion: (1) **Computacional**: que problema resuelve y por que; (2) **Algoritmico/representacional**: que representaciones y procedimientos usa; (3) **Implementacional**: como esta fisicamente realizado. Las explicaciones completas integran los tres.
**Autor/Tradicion**: David Marr.
**Doc**: `Contenidos/Explicaciones/Temas/PercepcionYVision/01_trivino_mosquera_vision.md`; `Contenidos/Explicaciones/Temas/MaterialComplementario/02_bechtel_mental_mechanisms.md`
**Ver tambien**: [Niveles de explicacion](#niveles-de-explicacion), [Mecanismo](#mecanismo), [Funcionalismo](#funcionalismo).

### Mary's room (Knowledge Argument)

**Definicion**: Experimento mental de Jackson (1982): Mary es una cientifica que sabe todo lo fisico sobre la vision del color pero ha vivido en una habitacion en blanco y negro. Cuando ve rojo por primera vez aprende algo nuevo (el "que es" del rojo). Conclusion: el conocimiento fisico no agota el conocimiento de la experiencia => physicalism falla.
**Autor/Tradicion**: Frank Jackson.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/00_indice.md`
**Ver tambien**: [Qualia](#qualia), [Hard Problem](#hard-problem), [Explanatory gap](#explanatory-gap).

### Materialismo (fisicalismo)

**Definicion**: Tesis ontologica segun la cual todo lo existente es fisico o supervene de lo fisico. Variantes: reductivo (todo mental se reduce a fisico), no-reductivo (con propiedades emergentes), eliminativo (algunos conceptos mentales son falsos).
**Autor/Tradicion**: Smart, Armstrong, P.M. Churchland.
**Doc**: `Curso/QuintaClase/Charla1.md`
**Ver tambien**: [Identidad psico-neural](#identidad-psico-neural-typetoken), [Supervenencia](#supervenencia), [Eliminativismo](#eliminativismo).

### Mecanismo

**Definicion**: Sistema organizado de partes y operaciones (actividades) cuya coordinacion en condiciones contextuales produce regularmente el fenomeno a explicar. Definicion canonica: Machamer, Darden, Craver (MDC, 2000). Bechtel anade enfasis en descomposicion y reconstitucion.
**Autor/Tradicion**: MDC (2000); Bechtel y Richardson; Glennan.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/02_bechtel_mental_mechanisms.md`
**Ver tambien**: [Descomposicion funcional](#descomposicion-funcional), [Localizacion](#localizacion), [Reduccion](#reduccion).

### Memoria de trabajo

**Definicion**: Sistema de mantenimiento activo y manipulacion de informacion en escala de segundos. Modelo de Baddeley: bucle fonologico, agenda visoespacial, episodic buffer, ejecutivo central. Sustrato: dorsolateral prefrontal y parietal.
**Autor/Tradicion**: Baddeley y Hitch (1974); Goldman-Rakic.
**Doc**: `Contenidos/Explicaciones/Temas/FuncionesEjecutivasYLobulosFrontales/01_suchy_funciones_ejecutivas.md`
**Ver tambien**: [Funcion ejecutiva](#funcion-ejecutiva), [Corteza prefrontal](#corteza-prefrontal-pfc).

### Memoria emocional

**Definicion**: Modulacion de la consolidacion mnesica por estados emocionales (especialmente miedo). LeDoux la trabaja como sistema implicito subcortical (amigdala) parcialmente disociado de la memoria explicita hipocampal. Caso clasico: paciente con lesion amigdalina retiene memoria declarativa pero no condicionamiento de miedo.
**Autor/Tradicion**: LeDoux; McGaugh.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/01_ledoux_emocion_memoria_y_cerebro.md`
**Ver tambien**: [Amigdala](#amigdala), [Memoria episodica](#memoria-episodica), [Engrama](#engrama-huella-mnestica).

### Memoria episodica

**Definicion**: Memoria de eventos especificos vividos en un tiempo y lugar, con contenido autobiografico y sensacion de "viaje mental en el tiempo". Distinta de la memoria semantica (Tulving, 1972). Sustrato: hipocampo + corteza temporal medial + corteza prefrontal medial.
**Autor/Tradicion**: Tulving; de Brigard y Robins.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`
**Ver tambien**: [Memoria semantica](#memoria-semantica), [Hipocampo](#hipocampo), [Engrama](#engrama-huella-mnestica).

### Memoria semantica

**Definicion**: Memoria de hechos, conceptos y conocimientos generales no atados a un episodio especifico. Sustrato distribuido en areas corticales con hub en lobulo temporal anterior.
**Autor/Tradicion**: Tulving.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`
**Ver tambien**: [Memoria episodica](#memoria-episodica), [Distributed representations](#distributed-representations).

### Metafora del cerebro

**Definicion**: Modelo cultural-historico que conceptualiza el cerebro con imagenes contemporaneas: hidraulica (Descartes), reloj, telefono, computadora, red, ahora "predictivo". Daugman muestra que cada metafora ilumina y oculta: cargar la metafora computacional ha bloqueado pensar al cerebro como sistema dinamico embebido.
**Autor/Tradicion**: Daugman; Cobb.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/02_daugman_metaforas_del_cerebro.md`; `Contenidos/Explicaciones/Temas/MaterialComplementario/05_cobb_idea_of_the_brain.md`
**Ver tambien**: [Conexionismo](#conexionismo), [Predictive coding](#predictive-coding), [Modelo](#modelo).

### Microglia

**Definicion**: Celulas inmunes residentes del SNC. Vigilan, fagocitan detritus, podan sinapsis durante el desarrollo (synaptic pruning). Cuando se activan en forma cronica contribuyen a neuroinflamacion y a procesos neurodegenerativos.
**Autor/Tradicion**: Neuroanatomia funcional.
**Doc**: `Curso/TerceraClase/04_microglia.md`
**Ver tambien**: [Astrocitos](#astrocitos), [Sinapsis](#sinapsis).

### Modelo

**Definicion**: Representacion simplificada de un sistema o fenomeno usada para explicar, predecir o intervenir. En neurociencia incluye: modelos animales, modelos computacionales, modelos formales (Hodgkin-Huxley), modelos de poblacion. Chirimuuta enfatiza que toda abstraccion es trade-off entre tractabilidad y realismo.
**Autor/Tradicion**: Chirimuuta; Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/04_chirimuuta_brain_abstracted.md`
**Ver tambien**: [Mecanismo](#mecanismo), [Metafora del cerebro](#metafora-del-cerebro), [Marr levels](#marr-levels-of-analysis).

### Multiple realizability

**Definicion**: Tesis (Putnam, Fodor) segun la cual un mismo tipo de estado mental puede realizarse en sustratos fisicos diferentes (cerebro humano, cerebro de pulpo, silicio). Argumento clasico contra la teoria de la identidad tipo-tipo y a favor del funcionalismo. Critica: Bechtel y Mundale defienden que en la practica las diferencias de implementacion importan ("mind same/brain different" se exagera).
**Autor/Tradicion**: Putnam, Fodor; critica de Bechtel y Mundale.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Funcionalismo](#funcionalismo), [Identidad psico-neural](#identidad-psico-neural-typetoken), [Reduccion](#reduccion).

## N

### NCC (Neural Correlates of Consciousness)

**Definicion**: Conjunto minimo de eventos neurales conjuntamente suficientes para un contenido consciente especifico. Programa de Crick y Koch: el primer paso de la ciencia de la conciencia es encontrar los NCC empiricamente, dejando el problema metafisico para despues. Critica: correlacion no es explicacion (no resuelve el Hard Problem).
**Autor/Tradicion**: Crick y Koch (1990).
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [Conciencia](#conciencia), [Hard Problem](#hard-problem), [IIT](#iit-integrated-information-theory), [GWT](#gwt-global-workspace-theory).

### Neuron Doctrine

**Definicion**: Tesis fundadora de la neurociencia (Ramon y Cajal): el sistema nervioso esta compuesto por celulas discretas (neuronas) que se comunican por contacto (sinapsis), no por continuidad (reticulares de Golgi). Confirmada por microscopia electronica en los 50.
**Autor/Tradicion**: Ramon y Cajal; vs Golgi.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/05_cobb_idea_of_the_brain.md`
**Ver tambien**: [Sinapsis](#sinapsis), [Astrocitos](#astrocitos).

### Neurofenomenologia

**Definicion**: Programa de Varela (1996): combinar fenomenologia rigurosa de la experiencia en primera persona (a la Husserl/Merleau-Ponty) con neurociencia en tercera persona, mediante "restricciones reciprocas". Intento de superar la brecha experiencia-cerebro sin reduccionismo.
**Autor/Tradicion**: Francisco Varela.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`
**Ver tambien**: [Enactivismo](#enactivismo), [Embodied cognition](#embodied-cognition-cognicion-corporizada), [Hard Problem](#hard-problem).

### Neuroimagen funcional

**Definicion**: Conjunto de tecnicas que mapean actividad cerebral asociada a tareas o estados: PET, fMRI, MEG, fNIRS. Cada una con trade-offs de resolucion espacial-temporal e invasividad. Raichle: la neuroimagen abrio la posibilidad de mapear procesos cognitivos en vivo, pero requiere disenos contrastivos cuidadosos.
**Autor/Tradicion**: Raichle; Posner.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/02_raichle_visualizando_la_mente.md`
**Ver tambien**: [fMRI](#fmri-resonancia-magnetica-funcional), [Inferencia inversa](#inferencia-inversa), [Artefacto](#artefacto-experimental).

### Niveles de explicacion

**Definicion**: Distincion entre diferentes escalas o tipos de explicacion para un mismo fenomeno: molecular, celular, sistemico, conductual, cognitivo, social. Marr (3 niveles), Craver (mosaico de niveles mecanisticos), Bechtel (descomposicion jerarquica). Discusion: autonomia vs reduccion entre niveles.
**Autor/Tradicion**: Marr; Craver; Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/ArchivoGuiasGenerales/00_mapa_de_conceptos_transversales.md`
**Ver tambien**: [Marr levels](#marr-levels-of-analysis), [Reduccion](#reduccion), [Mecanismo](#mecanismo).

## O

### Oligodendrocitos y mielina

**Definicion**: **Oligodendrocitos** son las celulas gliales del SNC que producen mielina (en SNP lo hacen las celulas de Schwann). La mielina envuelve axones y permite conduccion saltatoria entre nodulos de Ranvier, multiplicando la velocidad de transmision por ~50x. Su perdida (esclerosis multiple) afecta cognicion y motricidad.
**Autor/Tradicion**: Neuroanatomia clinica.
**Doc**: `Curso/TerceraClase/03_oligodendrocitos_y_mielina.md`
**Ver tambien**: [Astrocitos](#astrocitos), [Sinapsis](#sinapsis), [Sustancia blanca](#sustancia-blanca).

## P

### P300

**Definicion**: Componente positivo del ERP que aparece ~300 ms despues de un estimulo poco frecuente o relevante (oddball paradigm). Marcador electrofisiologico del acceso consciente segun GWT (Dehaene). Util en el diagnostico de pacientes vegetativos: presencia de P300 sugiere procesamiento consciente residual.
**Autor/Tradicion**: Sutton; Dehaene; Laureys.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [GWT](#gwt-global-workspace-theory), [Broadcasting](#broadcasting-en-gwt), [Estado vegetativo](#estado-vegetativo).

### Panpsiquismo

**Definicion**: Tesis ontologica segun la cual la conciencia (o algo proto-experiencial) es propiedad fundamental y ubicua de la realidad fisica, no emergente. Variantes contemporaneas: constitutivo (Goff, Strawson), cosmopsiquismo. IIT de Tononi tiene compromisos panpsiquistas implicitos ($\phi > 0$ basta para experiencia minima).
**Autor/Tradicion**: Goff, Strawson; Tononi (implicitamente).
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [IIT](#iit-integrated-information-theory), [Hard Problem](#hard-problem), [Dualismo de propiedades](#dualismo-de-propiedades).

### Perceptron

**Definicion**: Modelo de Rosenblatt (1958) de una neurona artificial: clasifica entradas $x$ aplicando $y = \text{sign}(\mathbf{w} \cdot \mathbf{x} + b)$. Minsky y Papert (1969) mostraron sus limites (no resuelve XOR), congelando el conexionismo hasta el redescubrimiento de backpropagation. Hinton lo presenta como precursor de los MLP.
**Autor/Tradicion**: Rosenblatt; critica de Minsky y Papert.
**Doc**: `Curso/Presenacion/2b - Hinton - Redes Neuronales que Aprenden de la Experiencia.md`
**Ver tambien**: [Backpropagation](#backpropagation), [Conexionismo](#conexionismo), [Deep learning](#deep-learning).

### Phenomenal consciousness

**Definicion**: Aspecto cualitativo y subjetivo de la experiencia: el "que se siente" ser un sujeto en un estado (Nagel). Distinguida por Block del access consciousness. Foco del Hard Problem. Realismo fenomenico se opone a teorias higher-order y representacionales fuertes.
**Autor/Tradicion**: Nagel; Block.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Qualia](#qualia), [Hard Problem](#hard-problem), [Access consciousness](#access-consciousness), [What it's like](#what-its-like).

### Phi ($\phi$)

**Definicion**: Cantidad central en IIT: mide la informacion integrada que un sistema genera por encima de sus partes. Formalmente, $\phi$ se calcula como la distancia (earth mover's o equivalente) entre el repertorio causal-efectivo del sistema entero y el de su particion minima. $\phi > 0$ implica experiencia minima en IIT.
**Autor/Tradicion**: Tononi.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [IIT](#iit-integrated-information-theory), [Panpsiquismo](#panpsiquismo), [NCC](#ncc-neural-correlates-of-consciousness).

### Philosophical zombie (p-zombie)

**Definicion**: Experimento mental de Chalmers: ser fisica y funcionalmente identico a un humano pero sin experiencia interna. Si los zombies son concebibles entonces el fisicalismo es falso (argumento de la concebibilidad). Critica: la concebibilidad no implica posibilidad metafisica.
**Autor/Tradicion**: David Chalmers.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/00_indice.md`
**Ver tambien**: [Hard Problem](#hard-problem), [Funcionalismo](#funcionalismo), [Qualia](#qualia), [Mary's room](#marys-room).

### Plasticidad sinaptica

**Definicion**: Cambio duradero en la fuerza, numero o geometria de las sinapsis. Mecanismos: LTP, LTD (long-term depression), spike-timing-dependent plasticity (STDP), poda. Base biofisica del aprendizaje y de la reorganizacion tras lesion.
**Autor/Tradicion**: Kandel; Markram (STDP).
**Doc**: `Curso/TerceraClase/16_aprendizaje_plasticidad_e_ideas_previas_del_cerebro.md`
**Ver tambien**: [LTP](#ltp-long-term-potentiation), [Aprendizaje hebbiano](#aprendizaje-hebbiano), [Sinapsis](#sinapsis).

### Potencial de preparacion (readiness potential, RP)

**Definicion**: Onda lenta negativa que precede en ~500-1000 ms a la decision consciente de mover en los experimentos de Libet. Se interpreta como signo de preparacion motora subconsciente, planteando preguntas sobre el momento real del "inicio" de la accion voluntaria.
**Autor/Tradicion**: Kornhuber y Deecke (1965); Libet (1983).
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/04_obhi_haggard_libre_albedrio.md`
**Ver tambien**: [Libre albedrio](#libre-albedrio), [Veto consciente](#veto-consciente), [Agencia](#agencia).

### Predictive coding (procesamiento predictivo)

**Definicion**: Marco teorico segun el cual el cerebro es un sistema jerarquico bayesiano que constantemente genera predicciones top-down sobre las entradas sensoriales y solo procesa el error de prediccion bottom-up. Andy Clark sintetiza: "el cerebro como motor de prediccion". Implementacion: $\text{error}_l = \text{senal}_l - \text{prediccion}_{l+1}(x)$.
**Autor/Tradicion**: Rao y Ballard (1999); Friston; Andy Clark.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`; `Contenidos/Explicaciones/Temas/VisualizacionesYModelos/08_cerebro_predictivo_y_formalizacion.md`
**Ver tambien**: [Free energy principle](#free-energy-principle), [Inferencia activa](#inferencia-activa), [Bayesianismo](#bayesianismo).

### Problema mente-cuerpo

**Definicion**: Pregunta filosofica clasica: que tipo de relacion existe entre lo mental (creencias, sensaciones, conciencia) y lo fisico (cerebro, conducta). Posiciones: dualismo (sustancial/propiedades), monismo (fisicalismo, idealismo, neutro), funcionalismo, panpsiquismo, eliminativismo.
**Autor/Tradicion**: Descartes en adelante.
**Doc**: `Curso/QuintaClase/Charla1.md`; `Curso/QuintaClase/Charla2.md`
**Ver tambien**: [Hard Problem](#hard-problem), [Dualismo de propiedades](#dualismo-de-propiedades), [Materialismo](#materialismo), [Supervenencia](#supervenencia).

### Psicologia popular (folk psychology)

**Definicion**: Conjunto de conceptos cotidianos para explicar y predecir conducta humana en terminos de creencias, deseos, intenciones, emociones. Centro del debate entre eliminativistas (Churchland: es proto-teoria falsa) y realistas (Dennett: es un patron real interpretativamente capturado).
**Autor/Tradicion**: Stich; P.M. Churchland; Dennett.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Eliminativismo](#eliminativismo), [Intentional stance](#intentional-stance), [Intencionalidad](#intencionalidad).

## Q

### Qualia

**Definicion**: Propiedades cualitativas, intrinsecas, accesibles introspectivamente y privadas de los estados mentales conscientes (el rojo del rojo, el dolor del dolor). Dennett las niega (Quining Qualia); Chalmers las usa como argumento para el dualismo de propiedades; Block las pone en el centro del Hard Problem.
**Autor/Tradicion**: C.I. Lewis (acunacion); Dennett (critico); Chalmers, Block (defensores).
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Phenomenal consciousness](#phenomenal-consciousness), [Hard Problem](#hard-problem), [Inverted spectrum](#inverted-spectrum), [Mary's room](#marys-room).

### Inverted spectrum

**Definicion**: Experimento mental: dos sujetos podrian tener la misma conducta y los mismos procesos funcionales asociados al color pero experimentar qualia invertidos (uno ve rojo donde el otro ve verde). Argumento contra el funcionalismo: la identidad funcional no agota la identidad fenomenica.
**Autor/Tradicion**: Locke; Block.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/00_indice.md`
**Ver tambien**: [Qualia](#qualia), [Funcionalismo](#funcionalismo), [Hard Problem](#hard-problem).

## R

### RDoC (Research Domain Criteria)

**Definicion**: Marco propuesto por el NIMH (Insel, 2010) para investigar psicopatologia con base en dimensiones neurobiologicas (valencia positiva, valencia negativa, cognicion, sistemas sociales, arousal) en lugar de categorias diagnosticas DSM. Mas ambicioso epistemologicamente, menos util clinicamente hasta ahora.
**Autor/Tradicion**: Insel; NIMH.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/04_ramirez_bermudez_constructos_neuropsiquiatricos.md`
**Ver tambien**: [Constructo neuropsiquiatrico](#constructo-neuropsiquiatrico), [DSM](#dsm-y-clasificacion-psiquiatrica).

### Red de saliencia

**Definicion**: Red cerebral central que detecta y prioriza estimulos relevantes (Seeley et al., 2007). Nodos principales: insula anterior, corteza cingulada anterior. Modula switching entre la red por defecto (DMN) y la red ejecutiva central.
**Autor/Tradicion**: Seeley; Menon.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/02_chen_interocepcion.md`
**Ver tambien**: [Interocepcion](#interocepcion), [Insula](#insula), [Atencion](#atencion).

### Reduccion

**Definicion**: Relacion epistemica/ontologica entre teorias o niveles segun la cual lo del nivel superior se explica desde lo del nivel inferior. Reduccion Nagel clasica: derivacion via leyes-puente. Reduccion Bickle (ruthless): de programas de investigacion. Bechtel propone integracion interteorica mecanistica como alternativa.
**Autor/Tradicion**: Nagel; Bickle; Bechtel.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Eliminativismo](#eliminativismo), [Multiple realizability](#multiple-realizability), [Mecanismo](#mecanismo).

### Reinforcement learning

**Definicion**: Marco de aprendizaje en el que un agente actualiza una politica $\pi(a \mid s)$ basandose en recompensas $r$. Algoritmo central: TD-learning. Sutton y Barto formalizaron; el descubrimiento de la senal de error de prediccion de recompensa en neuronas dopaminergicas (Schultz) la conecto con el cerebro.
**Autor/Tradicion**: Sutton y Barto; Schultz.
**Doc**: `Curso/TerceraClase/15_ganglios_basales_talamo_e_insula.md`
**Ver tambien**: [Dopamina](#dopamina), [Ganglios basales](#ganglios-basales), [Predictive coding](#predictive-coding).

### Representacion

**Definicion**: Estado interno que porta informacion sobre algo (referente) y es utilizable por un sistema para guiar pensamiento o conducta. Bechtel defiende un sentido moderado: vehiculo + contenido + uso. Anti-representacionalistas (Brooks, Chemero) niegan que muchas conductas inteligentes requieran representaciones internas.
**Autor/Tradicion**: Dretske, Millikan; Bechtel; criticos: Brooks, Chemero.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/03_bechtel_representaciones.md`
**Ver tambien**: [Distributed representations](#distributed-representations), [Intencionalidad](#intencionalidad), [Enactivismo](#enactivismo).

### Realizabilidad multiple (= multiple realizability)

**Definicion**: Ver [Multiple realizability](#multiple-realizability).

## S

### Sinapsis

**Definicion**: Punto de contacto especializado entre neuronas (o entre neurona y celula efectora) que permite transmision de senal. Tipos: quimica (mayoria, mediada por neurotransmisores en hendidura) y electrica (uniones gap). La sinapsis quimica permite computacion: integracion temporal, ganancia, plasticidad.
**Autor/Tradicion**: Sherrington (acuño el termino); Kandel.
**Doc**: `Curso/TerceraClase/05_sinapsis_y_neurotransmisores.md`; `Curso/Presenacion/ExplicacionesExtra_ConexionNeuronalYSinapsis.md`
**Ver tambien**: [Neuron Doctrine](#neuron-doctrine), [Plasticidad sinaptica](#plasticidad-sinaptica), [LTP](#ltp-long-term-potentiation).

### Sistema nervioso central y periferico

**Definicion**: **SNC**: encefalo + medula espinal. **SNP**: nervios espinales y craneales, ganglios. Subdivisiones funcionales del SNP: somatico (voluntario) y autonomo (involuntario: simpatico, parasimpatico, enterico).
**Autor/Tradicion**: Neuroanatomia clasica.
**Doc**: `Curso/TerceraClase/07_sistema_nervioso_central_y_periferico.md`
**Ver tambien**: [Barrera hematoencefalica](#barrera-hematoencefalica), [Interocepcion](#interocepcion).

### Supervenencia

**Definicion**: Relacion de dependencia sin reduccion: $A$ supervene de $B$ sii no puede haber diferencia en $A$ sin diferencia en $B$. Supervenencia psicofisica: lo mental supervene de lo fisico. Aceptado por la mayoria de fisicalistas no-reductivos (Davidson). Critica: Kim, supervenencia sin reduccion es inestable.
**Autor/Tradicion**: Davidson; Kim.
**Doc**: `Curso/QuintaClase/Charla1.md`
**Ver tambien**: [Identidad psico-neural](#identidad-psico-neural-typetoken), [Funcionalismo](#funcionalismo), [Materialismo](#materialismo), [Downward causation](#downward-causation).

### Sustancia gris

**Definicion**: Tejido cerebral compuesto principalmente de cuerpos neuronales, dendritas y sinapsis. Forma la corteza cerebral, los nucleos subcorticales y la sustancia gris central de la medula. Es donde ocurre la mayor parte del procesamiento.
**Autor/Tradicion**: Neuroanatomia.
**Doc**: `Curso/TerceraClase/10_sustancia_gris_y_sustancia_blanca.md`
**Ver tambien**: [Sustancia blanca](#sustancia-blanca), [Sinapsis](#sinapsis), [Lobulos cerebrales](#lobulos-cerebrales).

### Sustancia blanca

**Definicion**: Tejido formado por axones mielinizados que conecta regiones de la sustancia gris. Su organizacion en tractos (corpus callosum, capsula interna, fasciculo arcuato) es estudiada con DTI (diffusion tensor imaging). Su dano impacta la integracion entre regiones.
**Autor/Tradicion**: Neuroanatomia; DTI (Basser et al.).
**Doc**: `Curso/TerceraClase/10_sustancia_gris_y_sustancia_blanca.md`
**Ver tambien**: [Oligodendrocitos y mielina](#oligodendrocitos-y-mielina), [Sustancia gris](#sustancia-gris).

## T

### Test de Turing

**Definicion**: Criterio operacional de Turing (1950) para inteligencia: una maquina pasa si en una conversacion textual no puede distinguirse de un humano. Searle (Chinese Room) lo critica como criterio de comprension/consciencia: pasarlo es sintaxis, no semantica.
**Autor/Tradicion**: Alan Turing.
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/05_cobb_idea_of_the_brain.md`
**Ver tambien**: [Chinese Room](#chinese-room), [Funcionalismo](#funcionalismo), [Intentional stance](#intentional-stance).

### Talamo

**Definicion**: "Estacion de relevo" diencefalica: practicamente toda la informacion sensorial (excepto el olfato) pasa por nucleos especificos del talamo antes de llegar a la corteza. Modulacion del estado de vigilia (con el ARAS) y de la atencion via nucleo reticular.
**Autor/Tradicion**: Neuroanatomia funcional.
**Doc**: `Curso/TerceraClase/15_ganglios_basales_talamo_e_insula.md`
**Ver tambien**: [Conciencia](#conciencia), [Vigilia](#vigilia), [Atencion](#atencion).

## V

### V1 (corteza visual primaria)

**Definicion**: Area 17 de Brodmann en el lobulo occipital, primera region cortical en recibir entradas visuales (via talamo-NGL). Hubel y Wiesel describieron celulas simples, complejas e hipercomplejas con campos receptivos selectivos a orientacion. Lesion en V1 produce escotomas y, paradojicamente, blindsight.
**Autor/Tradicion**: Hubel y Wiesel; Zeki.
**Doc**: `Contenidos/Explicaciones/Temas/PercepcionYVision/02_zeki_imagen_visual_mente_y_cerebro.md`
**Ver tambien**: [Blindsight](#blindsight), [Especializacion funcional](#especializacion-funcional), [Predictive coding](#predictive-coding).

### Veto consciente

**Definicion**: En Libet/Obhi y Haggard, capacidad de inhibir una accion ya iniciada subconscientemente. Defendido como espacio residual para la agencia consciente aun aceptando el potencial de preparacion: "free won't" en lugar de "free will".
**Autor/Tradicion**: Libet; Obhi y Haggard.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/04_obhi_haggard_libre_albedrio.md`
**Ver tambien**: [Libre albedrio](#libre-albedrio), [Potencial de preparacion](#potencial-de-preparacion), [Agencia](#agencia).

### Vigilia (arousal)

**Definicion**: Nivel de activacion del sistema nervioso, mediado por el sistema activador reticular ascendente (SARA/ARAS), talamo y nucleos basales del prosencefalo. Disociable de la conciencia con contenido (awareness): un paciente vegetativo tiene vigilia sin awareness; un paciente en sueño REM tiene awareness sin vigilia conductual plena.
**Autor/Tradicion**: Moruzzi y Magoun; Laureys.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [Conciencia](#conciencia), [Estado vegetativo](#estado-vegetativo), [Talamo](#talamo).

### Estado vegetativo

**Definicion**: Sindrome clinico en el que el paciente preserva vigilia (ciclos sueño-vigilia, apertura ocular) pero carece de signos conductuales de awareness. Laureys distingue estado vegetativo (Unresponsive Wakefulness Syndrome) de estado minimamente consciente. Tecnicas (fMRI con tareas de imagineria) revelan que algunos pacientes "vegetativos" tienen conciencia preservada no expresable conductualmente.
**Autor/Tradicion**: Laureys; Owen.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/01_laureys_estado_vegetativo.md`
**Ver tambien**: [Vigilia](#vigilia-arousal), [Conciencia](#conciencia), [P300](#p300).

## W

### What it's like (Nagel)

**Definicion**: Frase canonica de Nagel ("What is it like to be a bat?", 1974): "un organismo tiene estados mentales conscientes si y solo si hay algo que es ser ese organismo". Anclaje fenomenologico de la conciencia. Argumento contra reduccionismos que dejan fuera el caracter subjetivo de la experiencia.
**Autor/Tradicion**: Thomas Nagel (1974).
**Doc**: `Contenidos/Explicaciones/Temas/MaterialComplementario/06_dehaene_seeing_the_mind.md`
**Ver tambien**: [Phenomenal consciousness](#phenomenal-consciousness), [Qualia](#qualia), [Hard Problem](#hard-problem).

## Z

### Celula de la abuela

**Definicion**: Metafora atribuida a Lettvin (anos 60) sobre la representacion local extrema: una neurona dedicada a un concepto (la abuela). Quian Quiroga et al. encontraron en hipocampo humano neuronas con disparo selectivo a personas/conceptos especificos ("neurona de Jennifer Aniston", 2005). Debate: representacion verdaderamente local o "esparsa pero distribuida".
**Autor/Tradicion**: Lettvin (metafora); Quian Quiroga, Fried y Koch (evidencia).
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/02_quian_quiroga_celulas_de_la_abuela.md`
**Ver tambien**: [Distributed representations](#distributed-representations), [Hipocampo](#hipocampo), [Representacion](#representacion).

## Otras entradas relevantes (no listadas alfabeticamente arriba pero referenciadas)

### Bayesianismo

**Definicion**: Aproximacion estadistica que actualiza creencias por la regla de Bayes: $P(\theta \mid x) = \frac{P(x \mid \theta) P(\theta)}{P(x)}$. Central para el cerebro predictivo, integracion sensorial bayesiana, percepcion como inferencia inconsciente (Helmholtz refundado).
**Autor/Tradicion**: Helmholtz; Friston; Knill y Pouget.
**Doc**: `Contenidos/Explicaciones/Temas/VisualizacionesYModelos/08_cerebro_predictivo_y_formalizacion.md`
**Ver tambien**: [Predictive coding](#predictive-coding), [Free energy principle](#free-energy-principle), [Inferencia activa](#inferencia-activa).

### Lobulos cerebrales

**Definicion**: Divisiones macroanatomicas de la corteza: frontal (planificacion, motor, lenguaje), parietal (somatosensorial, espacial), temporal (auditivo, memoria, lenguaje), occipital (vision), insular (interocepcion), limbico (emocion-memoria). Distincion descriptiva con limites no siempre funcionales.
**Autor/Tradicion**: Neuroanatomia clasica.
**Doc**: `Curso/TerceraClase/11_lobulos_cerebrales.md`
**Ver tambien**: [Lobulos frontales](#lobulos-frontales), [V1](#v1-corteza-visual-primaria), [Insula](#insula).

### Lobulos frontales

**Definicion**: Mayor lobulo cerebral humano (~30% de la corteza). Subregiones: motor primario (M1), premotor, suplementaria motora, prefrontal (dorsolateral, medial, orbitofrontal, ventromedial). Disfuncion: sindromes disejecutivos, cambios de personalidad (Phineas Gage como caso historico).
**Autor/Tradicion**: Miller y Cummings.
**Doc**: `Contenidos/Explicaciones/Temas/FuncionesEjecutivasYLobulosFrontales/02_miller_cummings_lobulos_frontales.md`
**Ver tambien**: [Corteza prefrontal](#corteza-prefrontal-pfc), [Funcion ejecutiva](#funcion-ejecutiva), [Marcador somatico](#marcador-somatico).

### Acople neurovascular

**Definicion**: Mecanismo por el cual la actividad neuronal produce cambios locales en flujo sanguineo cerebral (hyperemia funcional). Es la base biofisica del contraste BOLD en fMRI: mas actividad neural → mas flujo → mas oxihemoglobina → senal aumentada. Mediado por astrocitos y oxido nitrico.
**Autor/Tradicion**: Iadecola.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/02_raichle_visualizando_la_mente.md`
**Ver tambien**: [fMRI](#fmri-resonancia-magnetica-funcional), [Astrocitos](#astrocitos), [Neuroimagen funcional](#neuroimagen-funcional).

### Dopamina

**Definicion**: Neurotransmisor catecolaminergico producido principalmente en sustancia negra (parte compacta) y area tegmental ventral. Funciones: motivacion, aprendizaje por refuerzo, control motor. La hipotesis de senal de error de prediccion de recompensa (Schultz) la articula con TD-learning.
**Autor/Tradicion**: Schultz; Wise.
**Doc**: `Curso/TerceraClase/15_ganglios_basales_talamo_e_insula.md`
**Ver tambien**: [Reinforcement learning](#reinforcement-learning), [Ganglios basales](#ganglios-basales).

### Doble disociacion

**Definicion**: Patron metodologico fuerte para inferir modularidad funcional: paciente A tiene lesion en region X y deficit en funcion 1 pero no en 2; paciente B tiene lesion en region Y y deficit en funcion 2 pero no en 1. Implica que funciones 1 y 2 son disociables y reposan en sustratos distintos. Famoso en neuropsicologia: amnesia de Korsakoff, prosopagnosia, agnosia.
**Autor/Tradicion**: Teuber; neuropsicologia clinica.
**Doc**: `Curso/CuartaClase/03_lesiones_y_deficits.md`
**Ver tambien**: [Lesion](#lesion-metodo-lesional), [Localizacion](#localizacion), [Modulo](#modularidad).

### Modularidad

**Definicion**: Tesis de Fodor (1983): la mente esta parcialmente compuesta por modulos perceptivos y linguisticos con propiedades como: especificidad de dominio, encapsulamiento informacional, mandatoriedad, acceso central limitado. Critica de Karmiloff-Smith: el desarrollo modulariza, no preforma modulos.
**Autor/Tradicion**: Fodor; Karmiloff-Smith.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Doble disociacion](#doble-disociacion), [Funcionalismo](#funcionalismo), [Especializacion funcional](#especializacion-funcional).

### Explanatory gap

**Definicion**: Acuñado por Levine (1983): aun una explicacion fisica completa de un proceso cerebral deja una "brecha" respecto al caracter cualitativo de la experiencia (por que ese proceso se siente asi). Version epistemica (no necesariamente ontologica) del Hard Problem.
**Autor/Tradicion**: Joseph Levine (1983).
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/00_indice.md`
**Ver tambien**: [Hard Problem](#hard-problem), [Qualia](#qualia), [Mary's room](#marys-room).

### Optogenetica

**Definicion**: Tecnica de Deisseroth et al. (2005) que combina expresion transgenica de opsinas (channelrhodopsin, halorhodopsin) con estimulacion luminica para activar/inhibir neuronas especificas con resolucion de milisegundos. Revoluciono el estudio causal de circuitos. Permite, por ejemplo, "reactivar" engramas memoria.
**Autor/Tradicion**: Deisseroth; Tonegawa.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`
**Ver tambien**: [Engrama](#engrama-huella-mnestica), [Lesion](#lesion-metodo-lesional), [Causalidad](#causalidad).

### Causalidad

**Definicion**: En neurociencia operativa, capacidad de intervenir (Woodward) sobre una variable y observar cambio sistematico en otra. Tecnicas causales: lesion, TMS, optogenetica, farmacologia. La correlacion (NCC) no basta. Bechtel insiste en el rol de la triangulacion entre tecnicas correlacionales y causales.
**Autor/Tradicion**: Woodward; Craver; Bechtel.
**Doc**: `Curso/CuartaClase/02_instrumentos_intervencion_y_artefactos.md`
**Ver tambien**: [Lesion](#lesion-metodo-lesional), [NCC](#ncc-neural-correlates-of-consciousness), [Mecanismo](#mecanismo).

### Cerebro predictivo

**Definicion**: Marco que sintetiza predictive coding + active inference + free energy principle. El cerebro no es un receptor pasivo de informacion sino un sistema activo que constantemente predice estados sensoriales y propios, minimizando error. Reorienta la percepcion como inferencia y la accion como prediccion autocumplida.
**Autor/Tradicion**: Friston; Andy Clark; Hohwy.
**Doc**: `Contenidos/Explicaciones/Temas/ConcienciaAgenciaYModelos/02_nave_cerebro_predictivo.md`; `Contenidos/Explicaciones/Temas/VisualizacionesYModelos/08_cerebro_predictivo_y_formalizacion.md`
**Ver tambien**: [Predictive coding](#predictive-coding), [Free energy principle](#free-energy-principle), [Inferencia activa](#inferencia-activa), [Bayesianismo](#bayesianismo).

### Encoding / storage / retrieval

**Definicion**: Modelo clasico de la memoria (Tulving): codificacion (transformacion del estimulo en huella), almacenamiento (mantenimiento) y recuperacion (acceso). de Brigard y Robins lo discuten como herramienta heuristica con limites: las tres fases interactuan (e.g., reconsolidacion).
**Autor/Tradicion**: Tulving; de Brigard y Robins.
**Doc**: `Contenidos/Explicaciones/Temas/MemoriaYRepresentacion/01_de_brigard_robins_memoria.md`
**Ver tambien**: [Memoria episodica](#memoria-episodica), [Engrama](#engrama-huella-mnestica), [Reconsolidacion](#reconsolidacion).

### Reconsolidacion

**Definicion**: Proceso por el cual una memoria recuperada se vuelve lābil y requiere ser reconsolidada para persistir. Descubierto por Nader, Schafe y LeDoux (2000) en amigdala. Tiene implicaciones clinicas (PTSD: bloquear reconsolidacion con propranolol).
**Autor/Tradicion**: Nader y LeDoux.
**Doc**: `Contenidos/Explicaciones/Temas/EmocionInterocepcionYNeuropsiquiatria/01_ledoux_emocion_memoria_y_cerebro.md`
**Ver tambien**: [Memoria emocional](#memoria-emocional), [Amigdala](#amigdala), [Engrama](#engrama-huella-mnestica).

### Naturalizacion

**Definicion**: Proyecto filosofico de tratar problemas tradicionales (mente, conocimiento, semantica) con metodos y conceptos de las ciencias empiricas. P.S. Churchland (1986) populariza "neurofilosofia" como filosofia naturalizada via neurociencia. Critica: riesgo de cientificismo y deflacion de problemas geniunamente filosoficos.
**Autor/Tradicion**: Quine; P.S. Churchland.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Eliminativismo](#eliminativismo), [Reduccion](#reduccion).

### Diagrama del flujo de la informacion visual (dorsal/ventral)

**Definicion**: Ungerleider y Mishkin (1982): dos vias visuales corticales. **Dorsal** ("where/how", parietal): localizacion y accion. **Ventral** ("what", temporal): identificacion y reconocimiento. Disociacion clinica: agnosia visual (lesion ventral, ataxia optica (lesion dorsal). Milner y Goodale refinaron: dorsal = vision-para-accion vs ventral = vision-para-percepcion.
**Autor/Tradicion**: Ungerleider y Mishkin; Milner y Goodale.
**Doc**: `Contenidos/Explicaciones/Temas/PercepcionYVision/01_trivino_mosquera_vision.md`
**Ver tambien**: [V1](#v1-corteza-visual-primaria), [Doble disociacion](#doble-disociacion), [Especializacion funcional](#especializacion-funcional).

---

## Terminos adicionales (desde glosarios de clase y fuentes secundarias)

### Antropomorfismo

**Definicion**: Atribuir indebidamente a sistemas no humanos (cerebros, neuronas, redes) propiedades propias de agentes humanos completos. Riesgo recurrente en neurociencia cuando se dice que "una neurona detecta" o "el hipocampo decide". Relevante en discusiones sobre representacion, intencionalidad y lenguaje cientifico.
**Autor/Tradicion**: Bechtel (representaciones); discusion en Bechtel-Mandik-Mundale.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Intentional stance](#intentional-stance), [Representacion](#representacion), [Mecanismo](#mecanismo).

### Default Mode Network (DMN)

**Definicion**: Red de regiones cerebrales (corteza prefrontal medial, cingulada posterior, precuneo, lobulo temporal medial) mas activa en reposo que durante tareas dirigidas externamente. Descubierta por Raichle al observar la "actividad de linea base". Implicada en mentalizacion, memoria autobiografica, vagar de la mente (mind-wandering) y proyeccion temporal.
**Autor/Tradicion**: Raichle; Buckner.
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/02_raichle_visualizando_la_mente.md`
**Ver tambien**: [fMRI](#fmri-resonancia-magnetica-funcional), [Memoria episodica](#memoria-episodica), [Neuroimagen funcional](#neuroimagen-funcional).

### Naturalismo (filosofico)

**Definicion**: Postura meta-filosofica segun la cual la filosofia no se situa por encima de la ciencia; dialoga con ella y se deja informar por resultados empiricos. En la filosofia de la neurociencia implica que los problemas clasicos (mente-cuerpo, conciencia, intencionalidad) se estudian en conjunto con la evidencia neurocientifica, no solo desde el sillon.
**Autor/Tradicion**: Quine; Bechtel-Mandik-Mundale; P.S. Churchland.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Eliminativismo](#eliminativismo-materialismo-eliminativo), [Reduccion](#reduccion), [Naturalizacion](#naturalizacion).

### Neurofilosofia

**Definicion**: Programa fundado por Patricia S. Churchland (1986): la filosofia de la mente y la neurociencia deben coevolucionar mutuamente. La filosofia de la mente revisa sus conceptos a la luz de la neurociencia; la neurociencia gana claridad conceptual con el analisis filosofico. Promueve revision de conceptos folk-psicologicos a la luz del avance neurocientífico.
**Autor/Tradicion**: P.S. Churchland (*Neurophilosophy*, 1986); Bickle.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/05_bickle_churchland_y_neurofilosofias.md`
**Ver tambien**: [Eliminativismo](#eliminativismo-materialismo-eliminativo), [Naturalismo](#naturalismo-filosofico), [Psicologia popular](#psicologia-popular-folk-psychology).

### Evidencia (en neurociencia)

**Definicion**: Para Bechtel, los datos neurocientificos nunca son "datos brutos": siempre estan mediados por instrumentos, supuestos de calibracion, y eleccion de paradigma. La tecnica no es transparente al fenomeno; cada metodo tiene artefactos potenciales especificos. La validacion requiere convergencia entre tecnicas independientes.
**Autor/Tradicion**: Bechtel (2004).
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`
**Ver tambien**: [Artefacto](#artefacto-experimental), [Epistemologia de la evidencia](#epistemologia-de-la-evidencia), [Neuroimagen funcional](#neuroimagen-funcional).

### Neurociencia cognitiva

**Definicion**: Campo interdisciplinar que integra el estudio de procesos cognitivos (percepcion, memoria, atencion, lenguaje, emocion, conciencia) con tecnicas para examinar la actividad cerebral que los sustenta (lesion, registro, neuroimagen). Su consolidacion institucional en los anos 90 es el contexto del texto de Bechtel-Mandik-Mundale (2001).
**Autor/Tradicion**: Gazzaniga (acuna el termino); Bechtel-Mandik-Mundale.
**Doc**: `Contenidos/Explicaciones/Temas/FundamentosYMarco/01_bechtel_mandik_mundale_filosofia_y_neurociencias.md`
**Ver tambien**: [Mecanismo](#mecanismo), [Epistemologia de la evidencia](#epistemologia-de-la-evidencia), [Localizacion](#localizacion).

### Trazos / instrumentacion

**Definicion**: La evidencia neurocientifica consiste en trazos (BOLD, EEG, spikes, conducta), no en acceso directo al fenomeno mental. Cada tecnica produce un tipo de trazo con su propio perfil de artefactos, resolucion espacial/temporal y supuestos de interpretacion. Bechtel insiste en que entender el instrumento es condicion de validez de la evidencia que produce.
**Autor/Tradicion**: Bechtel (2004).
**Doc**: `Contenidos/Explicaciones/Temas/MetodosYEvidencia/01_bechtel_epistemologia_de_la_evidencia.md`; `Contenidos/Explicaciones/Temas/MetodosYEvidencia/02_raichle_visualizando_la_mente.md`
**Ver tambien**: [fMRI](#fmri-resonancia-magnetica-funcional), [Artefacto](#artefacto-experimental), [Epistemologia de la evidencia](#epistemologia-de-la-evidencia).

---

> **Notas finales**: este glosario unificado integra cuatro fuentes: (1) el glosario completo de 95 entradas de `_organizacion_2026-05-28/glosario/00_glosario_completo.md` (base canonica); (2) terminos adicionales de `_organizacion_2026-05-28/01_GLOSARIO_CONCEPTOS.md`; (3) terminos de `FilosofiaDeLasNeurociencias/Explicaciones/Temas/ArchivoGuiasGenerales/00_glosario_conceptos_clave.md`; (4) glosarios de clase `Curso/TerceraClase/06_glosario_basico.md` y `Curso/CuartaClase/07_glosario_basico.md`. Los terminos anatomicos basicos de los glosarios de clase (neurona, glia, axon, sinapsis, etc.) ya tienen entradas completas en el cuerpo del glosario. Para mapas de relaciones conceptuales, ver `05_Visualizaciones/`.
