export type TipoReforma = 'integral' | 'cocina' | 'bano' | 'parcial'
export type Calidad = 'basica' | 'media' | 'premium'

export interface DatosReforma {
  metros: number
  ciudad: string
  tipo: TipoReforma
  calidad: Calidad
}

export interface Capitulo {
  nombre: string
  min: number
  max: number
  porcentaje: number
}

export interface ResultadoEstimacion {
  totalMin: number
  totalMax: number
  capitulos: Capitulo[]
  precioM2Min: number
  precioM2Max: number
}

// [min, max] € por m² — integral y parcial
// [min, max] € total fijo — cocina y baño
const PRECIO_BASE: Record<TipoReforma, Record<Calidad, [number, number]>> = {
  integral: {
    basica:  [420, 580],
    media:   [630, 880],
    premium: [920, 1380],
  },
  parcial: {
    basica:  [260, 360],
    media:   [380, 550],
    premium: [580, 860],
  },
  cocina: {
    basica:  [5000,  8500],
    media:   [9000,  16000],
    premium: [18000, 38000],
  },
  bano: {
    basica:  [3500, 5500],
    media:   [6000, 10500],
    premium: [12000, 24000],
  },
}

// Índice de coste relativo por ciudad (Madrid = 1.0)
const MULTIPLICADOR: Record<string, number> = {
  madrid:          1.00,
  barcelona:       1.05,
  'san sebastian': 1.08,
  donostia:        1.08,
  bilbao:          1.03,
  pamplona:        1.00,
  zaragoza:        0.88,
  valencia:        0.87,
  alicante:        0.84,
  murcia:          0.82,
  sevilla:         0.85,
  malaga:          0.86,
  granada:         0.82,
  cordoba:         0.80,
  valladolid:      0.86,
  santander:       0.90,
  oviedo:          0.88,
  gijon:           0.87,
  vigo:            0.86,
  'a coruna':      0.86,
  palma:           0.92,
}

export const CAPITULOS_INTEGRAL = [
  { nombre: 'Demolición y gestión de residuos', porcentaje: 0.05 },
  { nombre: 'Albañilería y tabiquería',          porcentaje: 0.20 },
  { nombre: 'Fontanería y saneamiento',          porcentaje: 0.12 },
  { nombre: 'Electricidad e iluminación',        porcentaje: 0.12 },
  { nombre: 'Solados y alicatados',              porcentaje: 0.16 },
  { nombre: 'Carpintería (puertas y armarios)',  porcentaje: 0.15 },
  { nombre: 'Pintura y acabados',                porcentaje: 0.10 },
  { nombre: 'Honorarios y gestión de obra',      porcentaje: 0.10 },
]

export const CAPITULOS_PARCIAL = [
  { nombre: 'Demolición y trabajos previos',    porcentaje: 0.08 },
  { nombre: 'Albañilería',                       porcentaje: 0.22 },
  { nombre: 'Fontanería',                        porcentaje: 0.12 },
  { nombre: 'Electricidad',                      porcentaje: 0.12 },
  { nombre: 'Revestimientos y solados',          porcentaje: 0.20 },
  { nombre: 'Carpintería',                       porcentaje: 0.16 },
  { nombre: 'Pintura y acabados',                porcentaje: 0.10 },
]

export const CAPITULOS_COCINA = [
  { nombre: 'Demolición e instalación',  porcentaje: 0.10 },
  { nombre: 'Fontanería',                porcentaje: 0.18 },
  { nombre: 'Electricidad',              porcentaje: 0.14 },
  { nombre: 'Muebles y encimera',        porcentaje: 0.38 },
  { nombre: 'Suelo y alicatados',        porcentaje: 0.12 },
  { nombre: 'Pintura y acabados',        porcentaje: 0.08 },
]

export const CAPITULOS_BANO = [
  { nombre: 'Demolición',                porcentaje: 0.08 },
  { nombre: 'Fontanería y saneamiento',  porcentaje: 0.25 },
  { nombre: 'Electricidad',              porcentaje: 0.10 },
  { nombre: 'Alicatados y suelo',        porcentaje: 0.25 },
  { nombre: 'Sanitarios y grifería',     porcentaje: 0.22 },
  { nombre: 'Pintura y acabados',        porcentaje: 0.10 },
]

const CAPITULOS: Record<TipoReforma, { nombre: string; porcentaje: number }[]> = {
  integral: CAPITULOS_INTEGRAL,
  parcial:  CAPITULOS_PARCIAL,
  cocina:   CAPITULOS_COCINA,
  bano:     CAPITULOS_BANO,
}

function multiplicadorCiudad(ciudad: string): number {
  const key = ciudad.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
  return MULTIPLICADOR[key] ?? 0.89
}

export function calcularEstimacion(datos: DatosReforma): ResultadoEstimacion {
  const [baseMin, baseMax] = PRECIO_BASE[datos.tipo][datos.calidad]
  const mult = multiplicadorCiudad(datos.ciudad)
  const esFijo = datos.tipo === 'cocina' || datos.tipo === 'bano'

  const totalMin = Math.round((esFijo ? baseMin : baseMin * datos.metros) * mult)
  const totalMax = Math.round((esFijo ? baseMax : baseMax * datos.metros) * mult)

  const capitulos: Capitulo[] = CAPITULOS[datos.tipo].map((c) => ({
    nombre:     c.nombre,
    min:        Math.round(totalMin * c.porcentaje),
    max:        Math.round(totalMax * c.porcentaje),
    porcentaje: Math.round(c.porcentaje * 100),
  }))

  return {
    totalMin,
    totalMax,
    capitulos,
    precioM2Min: esFijo ? 0 : Math.round(totalMin / datos.metros),
    precioM2Max: esFijo ? 0 : Math.round(totalMax / datos.metros),
  }
}

export function formatEur(n: number): string {
  return n.toLocaleString('es-ES', {
    style:                'currency',
    currency:             'EUR',
    maximumFractionDigits: 0,
  })
}
