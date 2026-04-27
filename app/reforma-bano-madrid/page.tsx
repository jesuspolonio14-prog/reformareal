import type { Metadata } from 'next'
import Image from 'next/image'
import FaqAccordion from '@/app/components/FaqAccordion'
import FadeIn from '@/app/components/FadeIn'

export const metadata: Metadata = {
  title: 'Reforma de Baño en Madrid — Precio y Presupuesto 2026',
  description: 'Precio de reforma de baño en Madrid: desde 3.500 €. Compara hasta 3 presupuestos de reformistas verificados. Estimación gratuita en 2 minutos.',
  alternates: { canonical: 'https://reformareal.com/reforma-bano-madrid' },
  openGraph: {
    title: 'Reforma de Baño en Madrid — Precio 2026',
    description: 'Desde 3.500 €. Compara presupuestos de reformistas de baño verificados en Madrid.',
    url: 'https://reformareal.com/reforma-bano-madrid',
  },
}

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://reformareal.com' },
      { '@type': 'ListItem', position: 2, name: 'Reforma baño Madrid', item: 'https://reformareal.com/reforma-bano-madrid' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Cuánto cuesta reformar un baño en Madrid?', acceptedAnswer: { '@type': 'Answer', text: 'El precio de una reforma de baño en Madrid oscila entre 3.500 € para una reforma básica y más de 24.000 € para un baño de alta gama. La media para un baño estándar de 5-7 m² está entre 6.000 € y 10.500 €.' } },
      { '@type': 'Question', name: '¿Qué incluye una reforma de baño completa?', acceptedAnswer: { '@type': 'Answer', text: 'Una reforma de baño completa incluye: demolición del baño antiguo, nueva instalación de fontanería y desagüe, electricidad, alicatados y suelo nuevo, sanitarios nuevos (inodoro, lavabo, bañera o plato de ducha), grifería, mueble de baño y espejo.' } },
      { '@type': 'Question', name: '¿Cuánto tiempo tarda una reforma de baño?', acceptedAnswer: { '@type': 'Answer', text: 'Una reforma de baño completa en Madrid tarda entre 2 y 4 semanas. Si es un baño pequeño sin cambios estructurales, puede terminarse en 10-15 días hábiles.' } },
    ],
  },
]

const faqs = [
  { q: '¿Cuánto cuesta reformar un baño en Madrid?', a: 'El precio de una reforma de baño en Madrid oscila entre 3.500 € para una reforma básica y más de 24.000 € para un baño de alta gama. La media para un baño estándar de 5-7 m² está entre 6.000 € y 10.500 €, incluyendo alicatados, sanitarios, grifería, fontanería y electricidad.' },
  { q: '¿Qué incluye una reforma de baño completa?', a: 'Una reforma de baño completa incluye: demolición del baño antiguo, nueva instalación de fontanería y desagüe, electricidad con punto de luz y enchufes, alicatados y suelo nuevo, sanitarios nuevos (inodoro, lavabo, bañera o plato de ducha), grifería, mueble de baño y espejo.' },
  { q: '¿Cuánto tiempo tarda una reforma de baño?', a: 'Una reforma de baño completa en Madrid tarda entre 2 y 4 semanas. Si es un baño pequeño sin cambios estructurales, puede terminarse en 10-15 días hábiles. Los plazos se alargan si hay que mover tuberías o cambiar la distribución.' },
  { q: '¿Bañera o plato de ducha? ¿Qué es mejor para reformar el baño?', a: 'Sustituir la bañera por un plato de ducha es la opción más popular en las reformas de baño en Madrid. El plato de ducha ocupa menos espacio, es más accesible y moderno. Sin embargo, si tienes familia con niños pequeños o prefieres bañarte, mantener la bañera puede ser más práctico. El precio de ambas opciones es similar.' },
  { q: '¿Se puede reformar el baño sin obras de fontanería?', a: 'Sí. Si mantienes la misma distribución de sanitarios y no cambias la ubicación de tuberías, puedes reformar el baño sin tocar la fontanería. Solo se cambian los revestimientos, el suelo, los sanitarios y los accesorios. Esto abarata considerablemente el coste y reduce el plazo de la obra.' },
]

const zonas = [
  { zona: 'Salamanca / Chamberí', nivel: 'Premium', rango: '9.000 – 24.000 €' },
  { zona: 'Retiro / Chamartín', nivel: 'Medio-alto', rango: '7.000 – 15.000 €' },
  { zona: 'Centro / Malasaña', nivel: 'Medio', rango: '6.000 – 12.000 €' },
  { zona: 'Moncloa / Arganzuela', nivel: 'Medio', rango: '5.500 – 11.000 €' },
  { zona: 'Carabanchel / Usera', nivel: 'Básico-medio', rango: '3.500 – 8.000 €' },
  { zona: 'Vallecas / Villaverde', nivel: 'Básico', rango: '3.500 – 7.000 €' },
]

export default function ReformaBanoM() {
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
          Reforma de baño<br /><span className="text-[#C4531A]">en Madrid</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Compara hasta 3 presupuestos desglosados de reformistas verificados. Estimación gratuita en 2 minutos.
        </p>
        <a href="/#calcular" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-all shadow-lg shadow-[#C4531A]/25 hover:-translate-y-0.5">
          Calcular precio de mi baño →
        </a>
      </section>

      <section className="bg-[#1C1208] text-[#F7F3EE] py-20">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cuánto cuesta reformar un baño en Madrid?</h2>
            <p className="text-[#B5A090] mb-10 max-w-2xl">Precios orientativos para 2026 incluyendo alicatados, sanitarios, grifería, fontanería y electricidad.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { calidad: 'Básica', rango: '3.500 – 5.500 €', ejemplo: 'Sanitarios estándar, alicatados económicos', color: '#65A30D' },
              { calidad: 'Estándar', rango: '6.000 – 10.500 €', ejemplo: 'Grifería y sanitarios de gama media', color: '#C4531A' },
              { calidad: 'Premium', rango: '12.000 – 24.000+ €', ejemplo: 'Ducha italiana, grifería premium, mármol', color: '#CA8A04' },
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
          <p className="text-xs text-[#B5A090]">* Precios sin IVA para baños de 5-7 m². Pueden variar según distribución y materiales.</p>
        </div>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-5">
        <FadeIn>
          <h2 className="text-3xl font-black mb-3">Precio reforma de baño por zona de Madrid</h2>
          <p className="text-[#6B5B4E] mb-10 max-w-2xl">Los precios varían según el barrio por diferencias en coste de mano de obra y materiales disponibles.</p>
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
          <FadeIn><h2 className="text-3xl font-black mb-10">¿Qué incluye una reforma de baño completa?</h2></FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔨', titulo: 'Demolición', desc: 'Retirada de alicatados, sanitarios y solado existente.' },
              { icon: '🚿', titulo: 'Fontanería', desc: 'Nueva instalación de agua y desagüe si es necesario.' },
              { icon: '⚡', titulo: 'Electricidad', desc: 'Punto de luz, enchufes y calefacción si aplica.' },
              { icon: '🟦', titulo: 'Alicatados', desc: 'Revestimiento de paredes con azulejos o porcelánico.' },
              { icon: '🪴', titulo: 'Pavimento', desc: 'Suelo nuevo antideslizante o porcelánico.' },
              { icon: '🚽', titulo: 'Sanitarios', desc: 'Inodoro, lavabo y bañera o plato de ducha.' },
              { icon: '🪞', titulo: 'Mobiliario', desc: 'Mueble de baño, espejo y accesorios.' },
              { icon: '💧', titulo: 'Grifería', desc: 'Grifo de lavabo, ducha o bañera según diseño elegido.' },
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
        <h2 className="text-3xl font-black text-white mb-4">¿Cuánto cuesta tu reforma de baño?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Obtén una estimación personalizada en 2 minutos. Gratis y sin registrarte.</p>
        <a href="/#calcular" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors shadow-lg">
          Calcular precio de mi baño →
        </a>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-5">
        <FadeIn><h2 className="text-3xl font-black mb-10">Preguntas frecuentes sobre reforma de baño en Madrid</h2></FadeIn>
        <FaqAccordion faqs={faqs} />
      </section>

      <section className="bg-white py-12 border-t border-[#E8DFD8]">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-sm font-semibold text-[#6B5B4E] uppercase tracking-wide mb-4">Otros tipos de reforma en Madrid</p>
          <div className="flex flex-wrap gap-3">
            <a href="/reformas-integrales-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reformas integrales en Madrid →</a>
            <a href="/reforma-cocina-madrid" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de cocina en Madrid →</a>
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
