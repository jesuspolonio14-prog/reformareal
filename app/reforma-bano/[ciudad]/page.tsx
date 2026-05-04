import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import FaqAccordion from '@/app/components/FaqAccordion'
import FadeIn from '@/app/components/FadeIn'
import { getCiudad, getSlugs, fmt } from '@/lib/ciudades-seo'

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ ciudad: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params
  const d = getCiudad(ciudad)
  if (!d) return {}
  const base = 'https://reformareal.com'
  return {
    title: `Reforma de Baño en ${d.nombre} — Precio y Presupuesto 2026`,
    description: `¿Cuánto cuesta reformar un baño en ${d.nombre}? Desde ${fmt(d.bano.basico[0])} €. Compara hasta 3 presupuestos de reformistas verificados. Estimación gratuita en 2 minutos.`,
    alternates: { canonical: `${base}/reforma-bano/${ciudad}` },
    openGraph: {
      title: `Reforma de Baño en ${d.nombre} — Precio 2026`,
      description: `Desde ${fmt(d.bano.basico[0])} €. Presupuestos de reformistas verificados en ${d.nombre}.`,
      url: `${base}/reforma-bano/${ciudad}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const d = getCiudad(ciudad)
  if (!d) notFound()

  const base = 'https://reformareal.com'
  const url = `${base}/reforma-bano/${ciudad}`

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: base },
        { '@type': 'ListItem', position: 2, name: `Reforma baño ${d.nombre}`, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `¿Cuánto cuesta reformar un baño en ${d.nombre}?`,
          acceptedAnswer: { '@type': 'Answer', text: `El precio de una reforma de baño en ${d.nombre} oscila entre ${fmt(d.bano.basico[0])} € para una reforma básica y ${fmt(d.bano.premium[1])} € para un baño de alta gama con materiales premium.` },
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye una reforma de baño completa?',
          acceptedAnswer: { '@type': 'Answer', text: 'Una reforma completa de baño incluye desmontaje de los elementos existentes, renovación de fontanería, alicatado y pavimento, sanitarios (inodoro, lavabo, plato de ducha o bañera), mueble de baño, instalación eléctrica y pintura final.' },
        },
        {
          '@type': 'Question',
          name: `¿Cuánto tiempo tarda una reforma de baño en ${d.nombre}?`,
          acceptedAnswer: { '@type': 'Answer', text: `Una reforma de baño en ${d.nombre} suele tardar entre 1 y 3 semanas, dependiendo del tamaño y de si se cambia la distribución de la fontanería.` },
        },
      ],
    },
  ]

  const faqs = [
    { q: `¿Cuánto cuesta reformar un baño en ${d.nombre}?`, a: `El precio de una reforma de baño en ${d.nombre} oscila entre ${fmt(d.bano.basico[0])} € para una reforma básica y ${fmt(d.bano.premium[1])} € para un baño de alta gama. Una reforma estándar suele estar entre ${fmt(d.bano.estandar[0])} € y ${fmt(d.bano.estandar[1])} €, incluyendo alicatado, sanitarios y mueble.` },
    { q: '¿Qué incluye una reforma de baño completa?', a: 'Una reforma completa de baño incluye: desmontaje de los elementos existentes, actualización de la fontanería (tuberías de agua y desagüe), alicatado de paredes y pavimento, sanitarios nuevos (inodoro, lavabo, plato de ducha o bañera), mueble de baño con espejo, instalación eléctrica (puntos de luz y ventilación) y pintura final.' },
    { q: `¿Cuánto tiempo tarda una reforma de baño en ${d.nombre}?`, a: `Una reforma de baño en ${d.nombre} suele tardar entre 1 y 3 semanas. Si hay cambios importantes en la distribución de la fontanería o en la instalación eléctrica, puede extenderse hasta 4 semanas.` },
    { q: '¿Es mejor cambiar la bañera por plato de ducha?', a: 'Cambiar la bañera por un plato de ducha suele ser más económico y funcional, especialmente en baños pequeños. El coste de este cambio específico suele estar entre 500 € y 1.500 €, dependiendo de si se modifican las tomas de agua y el alicatado.' },
    { q: '¿Cuánto cuesta solo cambiar los azulejos del baño?', a: 'El cambio de azulejos en un baño estándar (5-8 m²) suele costar entre 800 € y 2.500 €, incluyendo retirada de los azulejos antiguos, materiales y mano de obra. El precio varía según el tipo de azulejo elegido.' },
  ]

  const calidades = [
    { calidad: 'Básico',   rango: `${fmt(d.bano.basico[0])} – ${fmt(d.bano.basico[1])} €`,   desc: 'Sanitarios básicos, azulejo económico, mueble de baño sencillo', color: '#65A30D' },
    { calidad: 'Estándar', rango: `${fmt(d.bano.estandar[0])} – ${fmt(d.bano.estandar[1])} €`, desc: 'Sanitarios de marca, gres porcelánico, mueble con encimera', color: '#C4531A' },
    { calidad: 'Premium',  rango: `${fmt(d.bano.premium[0])} – ${fmt(d.bano.premium[1])} €`,  desc: 'Sanitarios de alta gama, microcemento o mármol, mueble a medida', color: '#CA8A04' },
  ]

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* NAV */}
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

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 pt-16 pb-14 text-center">
        <div className="inline-block bg-[#C4531A]/10 text-[#C4531A] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          {d.nombre} · Reformistas verificados
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
          Reforma de baño<br />
          <span className="text-[#C4531A]">en {d.nombre}</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Compara hasta 3 presupuestos desglosados de reformistas verificados en {d.nombre}. Estimación de precio gratuita en 2 minutos.
        </p>
        <a href="/#calcular" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-all shadow-lg shadow-[#C4531A]/25 hover:-translate-y-0.5">
          Calcular precio de mi reforma →
        </a>
      </section>

      {/* PRECIOS POR CALIDAD */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-20">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black mb-3">¿Cuánto cuesta reformar un baño en {d.nombre}?</h2>
            <p className="text-[#B5A090] mb-10 max-w-2xl">Precios orientativos para 2026 para un baño estándar de 4-6 m², incluyendo alicatado, sanitarios e instalaciones.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {calidades.map((c, i) => (
              <FadeIn key={c.calidad} delay={i * 80}>
                <div className="bg-[#2A1E10] rounded-2xl p-6 h-full">
                  <p className="text-sm text-[#B5A090] mb-1">Acabado {c.calidad}</p>
                  <p className="text-2xl font-black mb-2" style={{ color: c.color }}>{c.rango}</p>
                  <p className="text-xs text-[#B5A090]">{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="text-xs text-[#B5A090]">* Precios sin IVA para baño de 4-6 m². Pueden variar según el tamaño y los materiales elegidos.</p>
        </div>
      </section>

      {/* QUÉ INCLUYE */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <FadeIn>
            <h2 className="text-3xl font-black mb-10">¿Qué incluye una reforma de baño completa?</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔨', titulo: 'Desmontaje',    desc: 'Retirada de sanitarios, muebles, azulejos y pavimento existente.' },
              { icon: '🚿', titulo: 'Fontanería',    desc: 'Renovación de tuberías de agua fría, caliente y desagüe.' },
              { icon: '🪵', titulo: 'Alicatado',     desc: 'Azulejos de pared y pavimento nuevo hasta techo.' },
              { icon: '🚽', titulo: 'Sanitarios',    desc: 'Inodoro, lavabo, plato de ducha o bañera nueva.' },
              { icon: '🪞', titulo: 'Mueble de baño', desc: 'Mueble con lavabo integrado, espejo y almacenaje.' },
              { icon: '⚡', titulo: 'Electricidad',  desc: 'Puntos de luz, ventilación y toma de corriente.' },
              { icon: '🔧', titulo: 'Accesorios',    desc: 'Toalleros, portarrollos, mamparas y barras.' },
              { icon: '🎨', titulo: 'Pintura',       desc: 'Pintura de techo y zonas sin alicatar.' },
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

      {/* CTA */}
      <section className="bg-[#C4531A] py-20 text-center px-5">
        <h2 className="text-3xl font-black text-white mb-4">¿Cuánto cuesta tu reforma de baño en {d.nombre}?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">Obtén una estimación personalizada en 2 minutos. Gratis y sin registrarte.</p>
        <a href="/#calcular" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors shadow-lg">
          Calcular precio de mi baño →
        </a>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-5">
        <FadeIn>
          <h2 className="text-3xl font-black mb-10">Preguntas frecuentes sobre reforma de baño en {d.nombre}</h2>
        </FadeIn>
        <FaqAccordion faqs={faqs} />
      </section>

      {/* LINKS INTERNOS */}
      <section className="bg-white py-12 border-t border-[#E8DFD8]">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-sm font-semibold text-[#6B5B4E] uppercase tracking-wide mb-4">Otras reformas en {d.nombre}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`/reformas-integrales/${ciudad}`} className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma integral en {d.nombre} →</a>
            <a href={`/reforma-cocina/${ciudad}`} className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Reforma de cocina en {d.nombre} →</a>
            <a href="/" className="border border-[#E8DFD8] rounded-full px-4 py-2 text-sm hover:border-[#C4531A] hover:text-[#C4531A] transition-colors">Calculadora de reforma →</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C1208] text-[#F7F3EE] py-10 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#B5A090]">
          <a href="/" className="font-bold text-white">reforma<span className="text-[#C4531A]">real</span></a>
          <p>© 2026 ReformaReal · España</p>
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
