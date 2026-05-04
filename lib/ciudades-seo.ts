export interface ZonaCiudad {
  zona: string
  nivel: string
  min: number
  max: number
}

export interface CiudadSEO {
  slug: string
  nombre: string
  // Reforma integral €/m²
  integral: {
    basica: [number, number]
    estandar: [number, number]
    premium: [number, number]
  }
  zonas: ZonaCiudad[]
  // Reforma cocina € total
  cocina: {
    basica: [number, number]
    estandar: [number, number]
    premium: [number, number]
  }
  // Reforma baño € total
  bano: {
    basico: [number, number]
    estandar: [number, number]
    premium: [number, number]
  }
}

export function fmt(n: number): string {
  return n.toLocaleString('es-ES')
}

export const CIUDADES: CiudadSEO[] = [
  {
    slug: 'barcelona',
    nombre: 'Barcelona',
    integral: { basica: [450, 630], estandar: [680, 960], premium: [1000, 1500] },
    zonas: [
      { zona: 'Eixample / Gràcia',       nivel: 'Premium',      min: 950, max: 1500 },
      { zona: 'Sant Gervasi / Sarrià',   nivel: 'Premium',      min: 850, max: 1280 },
      { zona: 'Poblenou / 22@',          nivel: 'Medio-alto',   min: 700, max: 980 },
      { zona: 'Sants / Esquerra',        nivel: 'Medio',        min: 580, max: 850 },
      { zona: 'Nou Barris / Horta',      nivel: 'Básico-medio', min: 450, max: 680 },
    ],
    cocina: { basica: [5500, 9500], estandar: [9500, 20000], premium: [20000, 35000] },
    bano: { basico: [3500, 5500], estandar: [5500, 10000], premium: [10000, 18000] },
  },
  {
    slug: 'valencia',
    nombre: 'Valencia',
    integral: { basica: [380, 520], estandar: [570, 800], premium: [860, 1200] },
    zonas: [
      { zona: 'Eixample / Pla del Real', nivel: 'Medio-alto',   min: 620, max: 950 },
      { zona: 'Russafa / Ruzafa',        nivel: 'Medio',        min: 540, max: 780 },
      { zona: 'Campanar / Benimaclet',   nivel: 'Medio',        min: 490, max: 720 },
      { zona: 'Patraix / Quatre Carreres', nivel: 'Básico-medio', min: 420, max: 640 },
      { zona: 'La Torre / Poble Nou',    nivel: 'Básico',       min: 380, max: 560 },
    ],
    cocina: { basica: [4500, 8000], estandar: [8000, 16000], premium: [16000, 28000] },
    bano: { basico: [2800, 4500], estandar: [4500, 8500], premium: [8500, 14000] },
  },
  {
    slug: 'sevilla',
    nombre: 'Sevilla',
    integral: { basica: [360, 500], estandar: [550, 780], premium: [840, 1180] },
    zonas: [
      { zona: 'Santa Cruz / Nervión',    nivel: 'Medio-alto',   min: 590, max: 920 },
      { zona: 'Los Remedios / Triana',   nivel: 'Medio',        min: 520, max: 760 },
      { zona: 'Macarena / Heliópolis',   nivel: 'Medio',        min: 470, max: 700 },
      { zona: 'Bellavista / Palmete',    nivel: 'Básico-medio', min: 390, max: 600 },
      { zona: 'Torreblanca / Cerro-Amate', nivel: 'Básico',    min: 360, max: 520 },
    ],
    cocina: { basica: [4000, 7500], estandar: [7500, 15000], premium: [15000, 26000] },
    bano: { basico: [2600, 4200], estandar: [4200, 8000], premium: [8000, 13000] },
  },
  {
    slug: 'bilbao',
    nombre: 'Bilbao',
    integral: { basica: [420, 580], estandar: [630, 890], premium: [950, 1350] },
    zonas: [
      { zona: 'Abando / Indautxu',       nivel: 'Medio-alto',   min: 680, max: 1050 },
      { zona: 'Txurdinaga / Begoña',     nivel: 'Medio',        min: 560, max: 830 },
      { zona: 'Basurto / Olabeaga',      nivel: 'Medio',        min: 520, max: 780 },
      { zona: 'Rekalde / Uribarri',      nivel: 'Básico-medio', min: 450, max: 680 },
      { zona: 'Deusto / Ibaiondo',       nivel: 'Básico-medio', min: 420, max: 640 },
    ],
    cocina: { basica: [5000, 9000], estandar: [9000, 19000], premium: [19000, 32000] },
    bano: { basico: [3200, 5200], estandar: [5200, 9500], premium: [9500, 16000] },
  },
  {
    slug: 'zaragoza',
    nombre: 'Zaragoza',
    integral: { basica: [350, 490], estandar: [530, 750], premium: [820, 1150] },
    zonas: [
      { zona: 'Centro / Casco Histórico', nivel: 'Medio',        min: 510, max: 750 },
      { zona: 'Universidad / Casablanca', nivel: 'Medio',        min: 470, max: 700 },
      { zona: 'Oliver / Valdefierro',     nivel: 'Básico-medio', min: 390, max: 580 },
      { zona: 'La Almozara / Las Fuentes', nivel: 'Básico',      min: 350, max: 520 },
    ],
    cocina: { basica: [4000, 7000], estandar: [7000, 14000], premium: [14000, 25000] },
    bano: { basico: [2500, 4000], estandar: [4000, 7500], premium: [7500, 12000] },
  },
  {
    slug: 'malaga',
    nombre: 'Málaga',
    integral: { basica: [370, 510], estandar: [560, 790], premium: [850, 1200] },
    zonas: [
      { zona: 'Centro / Teatinos',        nivel: 'Medio',        min: 540, max: 800 },
      { zona: 'Pedregalejo / El Palo',    nivel: 'Medio',        min: 500, max: 740 },
      { zona: 'La Paz / Portada Alta',    nivel: 'Básico-medio', min: 410, max: 620 },
      { zona: 'Campanillas / Puerto de la Torre', nivel: 'Básico', min: 370, max: 550 },
    ],
    cocina: { basica: [4500, 8000], estandar: [8000, 16000], premium: [16000, 27000] },
    bano: { basico: [2700, 4300], estandar: [4300, 8000], premium: [8000, 13000] },
  },
  {
    slug: 'murcia',
    nombre: 'Murcia',
    integral: { basica: [320, 450], estandar: [490, 700], premium: [760, 1050] },
    zonas: [
      { zona: 'La Flota / El Carmen',    nivel: 'Básico-medio', min: 420, max: 640 },
      { zona: 'Espinardo / La Ñora',     nivel: 'Básico-medio', min: 380, max: 580 },
      { zona: 'Vistabella / Vista Alegre', nivel: 'Básico',    min: 320, max: 490 },
    ],
    cocina: { basica: [3500, 6500], estandar: [6500, 13000], premium: [13000, 22000] },
    bano: { basico: [2200, 3500], estandar: [3500, 6500], premium: [6500, 10500] },
  },
  {
    slug: 'alicante',
    nombre: 'Alicante',
    integral: { basica: [340, 470], estandar: [510, 720], premium: [780, 1100] },
    zonas: [
      { zona: 'Centro / Ensanche',        nivel: 'Medio',        min: 470, max: 700 },
      { zona: 'El Pla / Carolinas',       nivel: 'Básico-medio', min: 400, max: 600 },
      { zona: 'Colonia Requena / Rabasa', nivel: 'Básico',       min: 340, max: 510 },
    ],
    cocina: { basica: [3800, 7000], estandar: [7000, 14000], premium: [14000, 23000] },
    bano: { basico: [2300, 3700], estandar: [3700, 7000], premium: [7000, 11000] },
  },
  {
    slug: 'palma',
    nombre: 'Palma',
    integral: { basica: [430, 590], estandar: [650, 920], premium: [980, 1380] },
    zonas: [
      { zona: 'Centro / La Lonja',        nivel: 'Medio-alto',   min: 680, max: 1050 },
      { zona: 'El Terreno / Son Armadans', nivel: 'Medio',       min: 580, max: 850 },
      { zona: 'Son Gotleu / Coll den Rabassa', nivel: 'Básico-medio', min: 460, max: 700 },
      { zona: 'Son Rapinya / Establiments', nivel: 'Básico-medio', min: 430, max: 660 },
    ],
    cocina: { basica: [5000, 8500], estandar: [8500, 17000], premium: [17000, 30000] },
    bano: { basico: [3000, 5000], estandar: [5000, 9000], premium: [9000, 15000] },
  },
  {
    slug: 'valladolid',
    nombre: 'Valladolid',
    integral: { basica: [330, 460], estandar: [500, 710], premium: [770, 1080] },
    zonas: [
      { zona: 'Centro / Circular',        nivel: 'Medio',        min: 490, max: 730 },
      { zona: 'Parquesol / Arturo Eyries', nivel: 'Básico-medio', min: 390, max: 580 },
      { zona: 'Delicias / Pajarillos',    nivel: 'Básico',       min: 330, max: 490 },
    ],
    cocina: { basica: [3800, 7000], estandar: [7000, 14000], premium: [14000, 23000] },
    bano: { basico: [2400, 3800], estandar: [3800, 7000], premium: [7000, 11500] },
  },
  {
    slug: 'granada',
    nombre: 'Granada',
    integral: { basica: [330, 460], estandar: [500, 710], premium: [770, 1080] },
    zonas: [
      { zona: 'Centro / Realejo',         nivel: 'Medio',        min: 490, max: 730 },
      { zona: 'Zaidín / Ronda',           nivel: 'Básico-medio', min: 390, max: 580 },
      { zona: 'Almanjáyar / Norte',       nivel: 'Básico',       min: 330, max: 490 },
    ],
    cocina: { basica: [3800, 7000], estandar: [7000, 14000], premium: [14000, 23000] },
    bano: { basico: [2400, 3800], estandar: [3800, 7000], premium: [7000, 11500] },
  },
  {
    slug: 'las-palmas',
    nombre: 'Las Palmas de Gran Canaria',
    integral: { basica: [350, 490], estandar: [530, 750], premium: [810, 1150] },
    zonas: [
      { zona: 'Triana / Vegueta',         nivel: 'Medio',        min: 510, max: 760 },
      { zona: 'El Rincón / Ciudad Jardín', nivel: 'Básico-medio', min: 400, max: 610 },
      { zona: 'La Isleta / San José',     nivel: 'Básico',       min: 350, max: 530 },
    ],
    cocina: { basica: [4000, 7500], estandar: [7500, 15000], premium: [15000, 25000] },
    bano: { basico: [2500, 4000], estandar: [4000, 7500], premium: [7500, 12000] },
  },
  {
    slug: 'santander',
    nombre: 'Santander',
    integral: { basica: [370, 510], estandar: [560, 790], premium: [850, 1200] },
    zonas: [
      { zona: 'Centro / El Sardinero',    nivel: 'Medio',        min: 530, max: 790 },
      { zona: 'Cuatro Caminos / San Román', nivel: 'Básico-medio', min: 400, max: 610 },
      { zona: 'Cazoña / Nueva Montaña',   nivel: 'Básico',       min: 370, max: 540 },
    ],
    cocina: { basica: [4500, 8000], estandar: [8000, 16000], premium: [16000, 27000] },
    bano: { basico: [2700, 4300], estandar: [4300, 8000], premium: [8000, 13000] },
  },
  {
    slug: 'vitoria',
    nombre: 'Vitoria-Gasteiz',
    integral: { basica: [400, 550], estandar: [610, 860], premium: [920, 1300] },
    zonas: [
      { zona: 'Ensanche / El Pilar',      nivel: 'Medio-alto',   min: 640, max: 980 },
      { zona: 'Aranbizkarra / Zabalgana', nivel: 'Medio',        min: 530, max: 790 },
      { zona: 'Txagorritxu / Abetxuko',   nivel: 'Básico-medio', min: 420, max: 640 },
    ],
    cocina: { basica: [5000, 8500], estandar: [8500, 17000], premium: [17000, 29000] },
    bano: { basico: [3000, 4800], estandar: [4800, 8500], premium: [8500, 14000] },
  },
  {
    slug: 'cordoba',
    nombre: 'Córdoba',
    integral: { basica: [320, 450], estandar: [490, 700], premium: [760, 1050] },
    zonas: [
      { zona: 'Centro / Ciudad Jardín',   nivel: 'Básico-medio', min: 410, max: 630 },
      { zona: 'Poniente Norte / Sur',     nivel: 'Básico',       min: 350, max: 530 },
      { zona: 'Palmeras / Moreras',       nivel: 'Básico',       min: 320, max: 480 },
    ],
    cocina: { basica: [3500, 6500], estandar: [6500, 13000], premium: [13000, 21000] },
    bano: { basico: [2200, 3500], estandar: [3500, 6500], premium: [6500, 10000] },
  },
]

export function getCiudad(slug: string): CiudadSEO | undefined {
  return CIUDADES.find((c) => c.slug === slug)
}

export function getSlugs() {
  return CIUDADES.map((c) => c.slug)
}
