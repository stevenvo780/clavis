export type WorkType = 'ponencia' | 'ensayo' | 'tesis'

export interface Work {
  id: string
  titulo: string
  tipo: WorkType
  abstract: string
  topics: string[]
  url: string
}

export const works: Work[] = [
  {
    id: 'silicio-tejido',
    titulo: '¿Silicio o Tejido? — Límites materiales y ontológicos de la mente',
    tipo: 'ponencia',
    abstract: '¿Puede la mente emularse en silicio digital o requiere el sustrato biológico del carbono? Examina incompatibilidades arquitectónicas y termodinámicas, y la autopoiesis como rasgo constitutivo de la conciencia.',
    topics: ['neurofilosofía', 'silicio vs carbono', 'autopoiesis', 'conciencia', 'mente y materia', 'IA'],
    url: 'https://neurocarbon.stevenvallejo.com/',
  },
  {
    id: 'ciudad-asignada',
    titulo: 'La ciudad bien asignada — cartografía crítica de una Medellín posible',
    tipo: 'ponencia',
    abstract: 'Repensar y cartografiar críticamente Medellín, imaginando nuevas posibilidades urbanas y formas de asignación del espacio metropolitano.',
    topics: ['filosofía de la ciudad', 'Medellín', 'cartografía crítica', 'urbanismo', 'espacio'],
    url: 'https://autopoesis.stevenvallejo.com/',
  },
  {
    id: 'retorica-techne',
    titulo: 'La retórica como τέχνη y no ἐμπειρία',
    tipo: 'ponencia',
    abstract: 'La retórica como arte técnico (τέχνη) frente a la mera experiencia (ἐμπειρία), fundada en principios sistemáticos y metodológicos.',
    topics: ['retórica', 'téchne', 'Platón', 'Gorgias', 'filosofía', 'arte técnico'],
    url: 'https://retorica.stevenvallejo.com/',
  },
  {
    id: 'redes-neuronales-hinton',
    titulo: 'Redes Neuronales que Aprenden de la Experiencia — Hinton 1992',
    tipo: 'ponencia',
    abstract: 'Cómo las redes neuronales adquieren conocimiento por procesos experienciales, a partir del trabajo pionero de Geoffrey Hinton, y sus implicaciones filosóficas.',
    topics: ['redes neuronales', 'deep learning', 'conexionismo', 'IA', 'cognición', 'Hinton'],
    url: 'https://hinton.stevenvallejo.com/',
  },
  {
    id: 'refutacion-fedon',
    titulo: 'Refutación de Simmias y Cebes — La Teoría de las Formas (Fedón 84c–102a)',
    tipo: 'ponencia',
    abstract: 'Reconstruye el pasaje del Fedón donde Sócrates responde a Simmias y Cebes formulando la Teoría de las Formas como teoría causal; contrasta el realismo platónico con el emergentismo contemporáneo.',
    topics: ['Platón', 'Fedón', 'Teoría de las Formas', 'méthexis', 'alma', 'emergentismo', 'IIT'],
    url: 'https://fedon.stevenvallejo.com/',
  },
  {
    id: 'fenomenologia-urbana',
    titulo: 'Fenomenología urbana de Medellín',
    tipo: 'ponencia',
    abstract: 'La experiencia vivida y la construcción de significado en los espacios urbanos de Medellín desde la fenomenología: corporalidad, memoria colectiva y transformación del lugar.',
    topics: ['fenomenología', 'Medellín', 'espacio urbano', 'corporalidad', 'memoria colectiva'],
    url: 'https://fenomenologiaurbana.stevenvallejo.com/',
  },
  {
    id: 'preontologia-tesis',
    titulo: 'Estructuras Pre-Ontológicas (Tesis Doctoral)',
    tipo: 'tesis',
    abstract: 'Tesis doctoral (con Jacob Agudelo, UdeA): las estructuras pre-ontológicas como regularidades operativas previas a la objetualidad, ancladas en un sustrato dinámico y validadas con la métrica EDI y compresión multiescala.',
    topics: ['filosofía de la ciencia', 'ontología', 'complejidad', 'preontología', 'EDI', 'tesis doctoral'],
    url: 'https://preontologia.stevenvallejo.com/',
  },
  {
    id: 'ignosticismo',
    titulo: 'Ignosticismo — análisis filosófico crítico',
    tipo: 'ensayo',
    abstract: 'Análisis de la posición ignóstica: la pregunta por la existencia de Dios carece de sentido mientras no exista una definición coherente y verificable de "Dios".',
    topics: ['ignosticismo', 'filosofía de la religión', 'teología', 'semántica', 'epistemología'],
    url: 'https://medium.com/@stevenvallejo780/ignosticismo-an%C3%A1lisis-filos%C3%B3fico-cr%C3%ADtico-0cb2a411569f',
  },
  {
    id: 'gnosticismo-critica',
    titulo: 'Crítica y dialéctica del Gnosticismo',
    tipo: 'ensayo',
    abstract: 'Análisis filosófico del gnosticismo: identifica sus falencias lógicas y propone una alternativa ontológica basada en el holismo, la autopoiesis y la teoría de sistemas complejos.',
    topics: ['gnosticismo', 'autopoiesis', 'sistemas complejos', 'ontología holística', 'epistemología', 'entropía'],
    url: 'https://medium.com/@stevenvallejo780/cr%C3%ADtica-y-dial%C3%A9ctica-del-gnosticismo-6173e5768a0c',
  },
  {
    id: 'filosofia-programacion',
    titulo: 'Filosofía y Programación — paradigmas y arquitecturas',
    tipo: 'ensayo',
    abstract: 'Los paradigmas de programación y las arquitecturas de software reflejan concepciones filosóficas sobre la realidad; integra epistemología, ontología y ética en el desarrollo de sistemas.',
    topics: ['filosofía computacional', 'paradigmas', 'arquitectura de software', 'modelado basado en agentes', 'epistemología'],
    url: 'https://medium.com/@stevenvallejo780/filosof%C3%ADa-y-programaci%C3%B3n-una-exploraci%C3%B3n-profunda-de-paradigmas-y-arquitecturas-199df6786331',
  },
  {
    id: 'russell-conocimiento-directo',
    titulo: 'La arquitectura de lo ausente — conocimiento directo y conocimiento por referencia (Russell)',
    tipo: 'ponencia',
    abstract: 'Exposición interactiva del capítulo 5 de Los problemas de la filosofía: toda proposición que comprendemos se compone de elementos conocidos directamente, y las descripciones extienden ese anclaje hacia mesas físicas, personajes históricos y objetos nunca experimentados. Conocimiento directo = anclaje; conocimiento por referencia = alcance.',
    topics: ['Russell', 'filosofía del lenguaje', 'epistemología', 'conocimiento por referencia', 'descripciones', 'filosofía analítica'],
    url: 'https://russell.stevenvallejo.com/',
  },
]
