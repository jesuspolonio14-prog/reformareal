import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Reforma de Cocina en Madrid — Precio y Presupuesto 2026',
  description:
    'Precio de reforma de cocina en Madrid: desde 5.000 €. Compara hasta 3 presupuestos de reformistas verificados. Estimación gratuita en 2 minutos.',
  alternates: { canonical: 'https://reformareal.com/reforma-cocina-madrid' },
  openGraph: {
    title: 'Reforma de Cocina en Madrid — Precio 2026',
    description: 'Desde 5.000 €. Compara presupuestos de reformistas de cocina verificados en Madrid.',
    url: 'https://reformareal.com/reforma-cocina-madrid',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Reforma de Cocina Madrid',
  description: 'Servicio de reforma de cocinas en Madrid. Presupuesto gratuito y comparación de reformistas verificados.',
  provider: { '@type': 'Organization', name: 'ReformaReal', url: 'https://reformareal.com' },
  areaServed: { '@type': 'City', name: 'Madrid' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Precios reforma cocina Madrid',
    itemListElement: [
      { '@type': 'Offer', name: 'Reforma cocina básica Madrid', price: '5000', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Reforma cocina estándar Madrid', price: '9000', priceCurrency: 'EUR' },
      { '@type': 'Offer', name: 'Reforma cocina premium Madrid', price: '18000', priceCurrency: 'EUR' },
    ],
  },
}

const faqs = [
  { q: '¿Cuánto cuesta reformar una cocina en Madrid?', a: 'El precio de una reforma de cocina en Madrid varía entre 5.000 € para una reforma básica y más de 38.000 € para una cocina de alta gama. La media para una reforma estándar de cocina en Madrid está entre 9.000 € y 16.000 €, incluyendo muebles, electrodomésticos básicos, fontanería, electricidad y alicatados.' },
  { q: '¿Qué incluye una reforma de cocina?', a: 'Una reforma de cocina completa incluye: demolición y retirada de la cocina antigua, nueva instalación de fontanería y electricidad, alicatados y suelo nuevo, muebles de cocina a medida o de catálogo, encimera, fregadero y grifo, y pintura. Los electrodomésticos pueden incluirse o no según el presupuesto.' },
  { q: '¿Cuánto tiempo tarda una reforma de cocina en Madrid?', a: 'Una reforma de cocina estándar en Madrid tarda entre 3 y 6 semanas. Si se trata de una reforma parcial (solo cambio de muebles sin obra) puede hacerse en 1-2 semanas. Si hay cambios en fontanería o electricidad, el plazo se alarga.' },
  { q: '¿Merece la pena reformar la cocina antes de vender el piso?', a: 'Sí, una cocina reformada puede aumentar el valor de venta del piso entre un 5% y un 10%. Además, facilita y acelera la venta. No es necesario hacer una reforma de alta gama: una reforma estándar bien ejecutada ya mejora significativamente la imagen del inmueble.' },
]

export default function ReformaCocinaPage() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/#calcular" className="bg-[#C4531A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#A84414] transition-colors">
          Calcular precio
        </a>
      </nav>

      <section className="max-w-4xl mx-auto px-5 pt-14 pb-12 text-center">
        <div className="inline-block bg-[#C4531A]/10 text-[#C4531A] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          Madrid · Reformistas verificados
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
          Reforma de cocina<br />
          <span className="text-[#C4531A]">en Madrid</span>
        </h1>
        <p className="text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Compara hasta 3 presupuestos de reformistas de cocina verificados en Madrid. Estimación gratuita en 2 minutos.
        </p>
        <a href="/#calcular" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#A84414] transition-colors">
          Calcular precio de mi cocina →
        </a>
      </section>

      <section className="bg-[#1C1208] text-[#F7F3EE] py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cuánto cuesta reformar una cocina en Madrid?</h2>
          <p className="text-[#B5A090] mb-10 max-w-2xl">Precios orientativos para 2026. Incluyen muebles, encimera, fontanería y electricidad. Sin electrodomésticos.</p>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { calidad: 'Básica', rango: '5.000 – 8.500 €', desc: 'Muebles económicos, encimera laminada', color: '#65A30D' },
              { calidad: 'Estándar', rango: '9.000 – 16.000 €', desc: 'Muebles de catálogo, encimera sólida', color: '#C4531A' },
              { calidad: 'Premium', rango: '18.000 – 38.000 €', desc: 'Muebles a medida, encimera de piedra', color: '#CA8A04' },
            ].map((p) => (
              <div key={p.calidad} className="bg-[#2A1E10] rounded-2xl p-6">
                <p className="text-sm text-[#B5A090] mb-1">Calidad {p.calidad}</p>
                <p className="text-2xl font-black mb-2" style={{ color: p.color }}>{p.rango}</p>
                <p className="text-xs text-[#B5A090]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#C4531A] py-16 text-center px-5">
        <h2 className="text-3xl font-black text-white mb-4">¿Cuánto cuesta reformar tu cocina?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Obtén una estimación personalizada y compara presupuestos de reformistas verificados en Madrid.</p>
        <a href="/#calcular" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors">
          Calcular precio de mi cocina →
        </a>
      </section>

      <section className="py-16 max-w-3xl mx-auto px-5">
        <h2 className="text-3xl font-black mb-10">Preguntas frecuentes sobre reforma de cocina en Madrid</h2>
        <div className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="border-b border-[#E8DFD8] pb-6">
              <h3 className="font-bold text-lg mb-2">{f.q}</h3>
              <p className="text-[#6B5B4E] leading-relaxed text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 border-t border-[#E8DFD8]">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-sm font-semibold text-[#6B5B4E] uppercase tracking-wide mb-4">Otros tipos de reforma en Madrid</p>
          <div className="flex flex-wrap gap-3">
            <a href="/reformas-integrales-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma integral en Madrid →</a>
            <a href="/reforma-bano-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de baño en Madrid →</a>
            <a href="/" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Calculadora de reforma →</a>
          </div>
        </div>
      </section>

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
