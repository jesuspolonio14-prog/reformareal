import type { Metadata } from 'next'
import Image from 'next/image'
import FaqAccordion from '@/app/components/FaqAccordion'
import FadeIn from '@/app/components/FadeIn'

export const metadata: Metadata = {
  title: 'Reforma de Cocina en Madrid — Precio y Presupuesto 2026',
  description: 'Precio de reforma de cocina en Madrid: desde 4.500 €. Compara hasta 3 presupuestos de reformistas verificados. Estimación gratuita en 2 minutos.',
  alternates: { canonical: 'https://reformareal.com/reforma-cocina-madrid' },
  openGraph: {
    title: 'Reforma de Cocina en Madrid — Precio 2026',
    description: 'Desde 4.500 €. Compara presupuestos de reformistas de cocina verificados en Madrid.',
    url: 'https://reformareal.com/reforma-cocina-madrid',
  },
}

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://reformareal.com' },
      { '@type': 'ListItem', position: 2, name: 'Reforma cocina Madrid', item: 'https://reformareal.com/reforma-cocina-madrid' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Cuánto cuesta reformar una cocina en Madrid?', acceptedAnswer: { '@type': 'Answer', text: 'El precio de una reforma de cocina en Madrid oscila entre 4.500 € para una reforma básica y más de 25.000 € para una cocina de alta gama. La media para una cocina estándar de 8-12 m² está entre 8.000 € y 15.000 €.' } },
      { '@type': 'Question', name: '¿Qué incluye una reforma de cocina completa?', acceptedAnswer: { '@type': 'Answer', text: 'Una reforma de cocina completa incluye: demolición de la cocina antigua, fontanería y electricidad adaptadas, nuevos muebles de cocina, encimera, fregadero y grifo, alicatados y pavimento, extractor, y pintura.' } },
      { '@type': 'Question', name: '¿Cuánto tiempo tarda una reforma de cocina?', acceptedAnswer: { '@type': 'Answer', text: 'Una reforma de cocina en Madrid suele tardar entre 2 y 5 semanas. Si hay cambios en fontanería o distribución puede alargarse a 6-8 semanas.' } },
    ],
  },
]

const faqs = [
  { q: '¿Cuánto cuesta reformar una cocina en Madrid?', a: 'El precio de una reforma de cocina en Madrid oscila entre 4.500 € para una reforma básica y más de 25.000 € para una cocina de alta gama. La media para una cocina estándar de 8-12 m² está entre 8.000 € y 15.000 €, incluyendo muebles, electrodomésticos básicos, solado y alicatados.' },
  { q: '¿Qué incluye una reforma de cocina completa?', a: 'Una reforma de cocina completa incluye: demolición de la cocina antigua, fontanería y electricidad adaptadas, nuevos muebles de cocina, encimera, fregadero y grifo, alicatados y pavimento, extractor, y pintura.' },
  { q: '¿Cuánto tiempo tarda una reforma de cocina?', a: 'Una reforma de cocina en Madrid suele tardar entre 2 y 5 semanas. Si hay cambios en fontanería o distribución puede alargarse a 6-8 semanas.' },
  { q: '¿Es mejor abrir o cerrar la cocina al salón?', a: 'Abrir la cocina al salón (cocina americana) es la tendencia más habitual en reformas de Madrid. Aporta amplitud y luminosidad, aunque requiere un buen sistema de extracción. Si cocinas frecuentemente con preparaciones que generan olores intensos, una cocina cerrada o con puerta corredera puede ser mejor opción.' },
  { q: '¿Qué electrodomésticos incluye una reforma de cocina?', a: 'Una reforma de cocina básica en Madrid no incluye electrodomésticos: solo la instalación de los puntos necesarios. Las reformas integrales de cocina de gama media y alta sí suelen incluir horno, placa de inducción, campana, lavavajillas y en algunos casos frigorífico integrado.' },
]

const zonas = [
  { zona: 'Salamanca / Chamberí', nivel: 'Premium', rango: '12.000 – 25.000 €' },
  { zona: 'Retiro / Chamartín', nivel: 'Medio-alto', rango: '9.000 – 18.000 €' },
  { zona: 'Centro / Malasaña', nivel: 'Medio', rango: '7.500 – 15.000 €' },
  { zona: 'Moncloa / Arganzuela', nivel: 'Medio', rango: '7.000 – 13.000 €' },
  { zona: 'Carabanchel / Usera', nivel: 'Básico-medio', rango: '4.500 – 10.000 €' },
  { zona: 'Vallecas / Villaverde', nivel: 'Básico', rango: '4.500 – 8.500 €' },
]

export default function ReformaCocinaM() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <nav className="sticky top-0 z-50 bg-[#F7F3EE]/90 backdrop-blur-md border-b border-[#E8DFD8]/70">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
            <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
          </a>
          <a href="/#calcular" className="bg-[#C4531A] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#A84414] transition-colors font-semibold">
            Calcular precio
          </a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-5 pt-16 pb-14 text-center">
        <div className="inline-block bg-[#C4531A]/10 text-[#C4531A] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          Madrid · Reformistas verificados
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
          Reforma de cocina<br /><span className="text-[#C4531A]">en Madrid</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Compara hasta 3 presupuestos desglosados de reformistas verificados. Estimación gratuita en 2 minutos.
        </p>
        <a href="/#calcular" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-all shadow-lg shadow-[#C4531A]/25 hover:-translate-y-0.5">
          Calcular precio de mi cocina →
        </a>
      </section>

      <section className="bg-[#1C1208] text-[#F7F3EE] py-20">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cuánto cuesta reformar una cocina en Madrid?</h2>
            <p className="text-[#B5A090] mb-10 max-w-2xl">Precios orientativos para 2026 incluyendo muebles, encimera, electrodomésticos básicos, solado y alicatados.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { calidad: 'Básica', rango: '4.500 – 7.500 €', ejemplo: 'Muebles estándar, sin electrodomésticos premium', color: '#65A30D' },
              { calidad: 'Estándar', rango: '8.000 – 15.000 €', ejemplo: 'Muebles de calidad media, electrodomésticos incluidos', color: '#C4531A' },
              { calidad: 'Premium', rango: '16.000 – 25.000+ €', ejemplo: 'Muebles a medida, encimera silestone, integrados', color: '#CA8A04' },
            ].map((p, i) => (
              <FadeIn key={p.calidad} delay={i * 80}>
                <div className="bg-[#2A1E10] rounded-2xl p-6 h-full">
                  <p className="text-sm text-[#B5A090] mb-1">Calidad {p.calidad}</p>
                  <p className="text-2xl font-black mb-2" style={{ color: p.color }}>{p.rango}</p>
                  <p className="text-xs text-[#B5A090]">{p.ejemplo}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-xs text-[#B5A090]">* Precios sin IVA para cocinas de 8-12 m². Pueden variar según distribución y materiales.</p>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-5">
        <FadeIn>
          <h2 className="text-3xl font-black mb-3">Precio reforma de cocina por zona de Madrid</h2>
          <p className="text-[#6B5B4E] mb-10 max-w-2xl">El coste de la mano de obra y los materiales varía según el barrio de Madrid.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {zonas.map((z, i) => (
            <FadeIn key={z.zona} delay={i * 60}>
              <div className="bg-white border border-[#E8DFD8] rounded-2xl p-5">
                <p className="font-bold mb-1">{z.zona}</p>
                <p className="text-xs text-[#6B5B4E] mb-2">{z.nivel}</p>
                <p className="text-[#C4531A] font-black">{z.rango}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn><h2 className="text-3xl font-black mb-10">¿Qué incluye una reforma de cocina completa?</h2></FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔨', titulo: 'Demolición', desc: 'Retirada de muebles, alicatados y solado existente.' },
              { icon: '🚿', titulo: 'Fontanería', desc: 'Nuevas tomas de agua, desagüe y ajuste de instalaciones.' },
              { icon: '⚡', titulo: 'Electricidad', desc: 'Circuito específico de cocina con puntos para electrodomésticos.' },
              { icon: '🪵', titulo: 'Muebles', desc: 'Muebles altos y bajos, encimera y fregadero.' },
              { icon: '🟫', titulo: 'Alicatados', desc: 'Revestimiento de paredes y zona de trabajo.' },
              { icon: '🪴', titulo: 'Pavimento', desc: 'Solado nuevo coordinado con el resto de la vivienda.' },
              { icon: '💨', titulo: 'Extracción', desc: 'Campana o extractor según la configuración de la cocina.' },
              { icon: '🎨', titulo: 'Acabados', desc: 'Pintura, rodapiés y detalles finales.' },
            ].map((c, i) => (
              <FadeIn key={c.titulo} delay={i * 50}>
                <div className="bg-[#F7F3EE] rounded-2xl p-5 border border-[#E8DFD8] h-full">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <h3 className="font-bold mb-1">{c.titulo}</h3>
                  <p className="text-xs text-[#6B5B4E] leading-relaxed">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#C4531A] py-20 text-center px-5">
        <h2 className="text-3xl font-black text-white mb-4">¿Cuánto cuesta tu reforma de cocina?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Obtén una estimación personalizada en 2 minutos. Gratis y sin registrarte.</p>
        <a href="/#calcular" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors shadow-lg">
          Calcular precio de mi cocina →
        </a>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-5">
        <FadeIn><h2 className="text-3xl font-black mb-10">Preguntas frecuentes sobre reforma de cocina en Madrid</h2></FadeIn>
        <FaqAccordion faqs={faqs} />
      </section>

      <section className="bg-white py-12 border-t border-[#E8DFD8]">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-sm font-semibold text-[#6B5B4E] uppercase tracking-wide mb-4">Otros tipos de reforma en Madrid</p>
          <div className="flex flex-wrap gap-3">
            <a href="/reformas-integrales-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reformas integrales en Madrid →</a>
            <a href="/reforma-bano-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de baño en Madrid →</a>
            <a href="/" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Calculadora de reforma →</a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1C1208] text-[#F7F3EE] py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#B5A090]">
          <a href="/" className="font-bold text-white">reforma<span className="text-[#C4531A]">real</span></a>
          <p>© 2026 ReformaReal · Madrid</p>
          <div className="flex gap-4">
            <a href="/privacidad" className="hover:text-white transition-colors">Privacidad</a>
            <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
            <a href="mailto:reformarealsoporte@gmail.com" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
