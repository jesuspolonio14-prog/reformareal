import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Reformas Integrales en Madrid — Precio y Presupuesto 2026',
  description:
    'Precio de una reforma integral en Madrid: desde 420 €/m². Compara hasta 3 presupuestos de reformistas verificados. Estimación gratuita en 2 minutos.',
  alternates: { canonical: 'https://reformareal.com/reformas-integrales-madrid' },
  openGraph: {
    title: 'Reformas Integrales en Madrid — Precio 2026',
    description: 'Desde 420 €/m². Compara presupuestos de reformistas verificados en Madrid.',
    url: 'https://reformareal.com/reformas-integrales-madrid',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reforma Integral Madrid',
  description: 'Servicio de reforma integral de viviendas en Madrid. Presupuesto gratuito y comparación de reformistas verificados.',
  provider: { '@type': 'Organization', name: 'ReformaReal', url: 'https://reformareal.com' },
  areaServed: { '@type': 'City', name: 'Madrid' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Precios reforma integral Madrid',
    itemListElement: [
      { '@type': 'Offer', name: 'Reforma integral básica Madrid', price: '420', priceCurrency: 'EUR', description: 'Precio por m² — calidad básica' },
      { '@type': 'Offer', name: 'Reforma integral estándar Madrid', price: '630', priceCurrency: 'EUR', description: 'Precio por m² — calidad media' },
      { '@type': 'Offer', name: 'Reforma integral premium Madrid', price: '920', priceCurrency: 'EUR', description: 'Precio por m² — calidad premium' },
    ],
  },
}

const faqs = [
  { q: '¿Cuánto cuesta una reforma integral en Madrid?', a: 'El precio de una reforma integral en Madrid oscila entre 420 €/m² para acabados básicos y 1.380 €/m² para acabados premium. Para un piso de 80 m², el coste total suele estar entre 33.600 € y 110.400 €, dependiendo de la calidad de los materiales y el estado previo de la vivienda.' },
  { q: '¿Qué incluye una reforma integral de vivienda?', a: 'Una reforma integral incluye demolición, albañilería y tabiquería, instalación eléctrica completa, fontanería y saneamiento, solados y alicatados, carpintería (puertas y armarios), pintura y acabados finales. También suele incluir la gestión de residuos y los honorarios de dirección de obra.' },
  { q: '¿Cuánto tiempo tarda una reforma integral en Madrid?', a: 'El plazo habitual para una reforma integral en Madrid es de 8 a 16 semanas, dependiendo del tamaño de la vivienda y la complejidad de los trabajos. Reformas de pisos de menos de 60 m² pueden completarse en 6-8 semanas.' },
  { q: '¿Cuándo es mejor hacer una reforma integral?', a: 'Lo ideal es acometer una reforma integral cuando vas a comprar la vivienda (antes de mudarte), cuando la instalación eléctrica o de fontanería tiene más de 30 años, o cuando quieres cambiar completamente la distribución del piso.' },
  { q: '¿Necesito licencia para una reforma integral en Madrid?', a: 'En Madrid, las obras que afectan a la estructura o cambian el uso de espacios requieren licencia de obras mayor. Las reformas integrales que solo modifican el interior sin tocar la estructura necesitan comunicación previa o licencia de obras menores. Tu reformista debe gestionar los permisos necesarios.' },
]

export default function ReformasIntegralesMadrid() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.png" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/#calcular" className="bg-[#C4531A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#A84414] transition-colors">
          Calcular precio
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 pt-14 pb-12 text-center">
        <div className="inline-block bg-[#C4531A]/10 text-[#C4531A] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          Madrid · Reformistas verificados
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
          Reformas integrales<br />
          <span className="text-[#C4531A]">en Madrid</span>
        </h1>
        <p className="text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Compara hasta 3 presupuestos desglosados de reformistas verificados. Estimación de precio gratuita en 2 minutos.
        </p>
        <a href="/#calcular" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#A84414] transition-colors">
          Calcular precio de mi reforma →
        </a>
      </section>

      {/* PRECIOS */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cuánto cuesta una reforma integral en Madrid?</h2>
          <p className="text-[#B5A090] mb-10 max-w-2xl">Precios orientativos para 2026. El coste final depende del estado previo de la vivienda, los materiales elegidos y la empresa reformista.</p>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { calidad: 'Básica', rango: '420 – 580 €/m²', ejemplo: '33.600 – 46.400 € para 80 m²', color: '#65A30D' },
              { calidad: 'Estándar', rango: '630 – 880 €/m²', ejemplo: '50.400 – 70.400 € para 80 m²', color: '#C4531A' },
              { calidad: 'Premium', rango: '920 – 1.380 €/m²', ejemplo: '73.600 – 110.400 € para 80 m²', color: '#CA8A04' },
            ].map((p) => (
              <div key={p.calidad} className="bg-[#2A1E10] rounded-2xl p-6">
                <p className="text-sm text-[#B5A090] mb-1">Calidad {p.calidad}</p>
                <p className="text-2xl font-black mb-2" style={{ color: p.color }}>{p.rango}</p>
                <p className="text-xs text-[#B5A090]">{p.ejemplo}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#B5A090]">* Precios sin IVA. Pueden variar según el estado actual de la vivienda y los acabados elegidos.</p>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="py-16 max-w-5xl mx-auto px-5">
        <h2 className="text-3xl font-black mb-10">¿Qué incluye una reforma integral?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🔨', titulo: 'Demolición', desc: 'Retirada de revestimientos, tabiques y elementos a eliminar.' },
            { icon: '🧱', titulo: 'Albañilería', desc: 'Nueva distribución, tabiques y trabajos de obra.' },
            { icon: '⚡', titulo: 'Electricidad', desc: 'Instalación eléctrica completa según normativa vigente.' },
            { icon: '🚿', titulo: 'Fontanería', desc: 'Renovación completa de tuberías y saneamiento.' },
            { icon: '🪟', titulo: 'Carpintería', desc: 'Puertas, armarios y carpintería a medida.' },
            { icon: '🪴', titulo: 'Solados', desc: 'Pavimento, alicatados y revestimientos.' },
            { icon: '🎨', titulo: 'Pintura', desc: 'Pintura y acabados finales en toda la vivienda.' },
            { icon: '📋', titulo: 'Gestión', desc: 'Licencias, gestión de residuos y dirección de obra.' },
          ].map((c) => (
            <div key={c.titulo} className="bg-white rounded-2xl p-5 border border-[#E8DFD8]">
              <div className="text-2xl mb-2">{c.icon}</div>
              <h3 className="font-bold mb-1">{c.titulo}</h3>
              <p className="text-xs text-[#6B5B4E] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#C4531A] py-16 text-center px-5">
        <h2 className="text-3xl font-black text-white mb-4">¿Cuánto cuesta tu reforma integral?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Obtén una estimación personalizada por capítulos en 2 minutos. Gratis y sin registrarte.</p>
        <a href="/#calcular" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors">
          Calcular precio de mi reforma →
        </a>
      </section>

      {/* FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-5">
        <h2 className="text-3xl font-black mb-10">Preguntas frecuentes sobre reformas integrales en Madrid</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[#E8DFD8] pb-6">
              <h3 className="font-bold text-lg mb-2">{f.q}</h3>
              <p className="text-[#6B5B4E] leading-relaxed text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LINKS INTERNOS */}
      <section className="bg-white py-12 border-t border-[#E8DFD8]">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-sm font-semibold text-[#6B5B4E] uppercase tracking-wide mb-4">Otros tipos de reforma en Madrid</p>
          <div className="flex flex-wrap gap-3">
            <a href="/reforma-cocina-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de cocina en Madrid →</a>
            <a href="/reforma-bano-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de baño en Madrid →</a>
            <a href="/" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Calculadora de reforma →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFD8] py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-[#6B5B4E]">
          <a href="/" className="font-bold text-[#1C1208]">reforma<span className="text-[#C4531A]">real</span></a>
          <p>© 2026 ReformaReal · Madrid</p>
          <a href="mailto:reformarealsoporte@gmail.com">Contacto</a>
        </div>
      </footer>
    </main>
  )
}
