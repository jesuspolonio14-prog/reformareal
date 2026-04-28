import type { Metadata } from "next";
import Image from "next/image";
import Calculadora from "@/app/components/Calculadora";
import FadeIn from "@/app/components/FadeIn";
import { createClient } from "@/lib/supabase-server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "ReformaReal · Comparador de reformas en tu ciudad",
  description: "Estimación de precio en 2 minutos. Presupuestos comparables. Reformistas verificados.",
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      name: 'ReformaReal',
      description: 'Plataforma de comparación de presupuestos de reformas en España. Estimación de precio en 2 minutos y hasta 3 presupuestos de reformistas verificados.',
      url: 'https://reformareal.com',
      telephone: '',
      address: { '@type': 'PostalAddress', addressCountry: 'ES' },
      areaServed: ['España'],
      priceRange: '€€',
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      url: 'https://reformareal.com',
      name: 'ReformaReal',
      description: 'Presupuesto de reforma online gratis en España',
      potentialAction: { '@type': 'SearchAction', target: 'https://reformareal.com/#calcular' },
    },
  ],
}

const problemasIcons = [
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M3 12h18M3 16.5h9" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
]

const pasosIcons = [
  <svg key="1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>,
  <svg key="2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  <svg key="3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>,
]

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let nombrePerfil: string | null = null
  if (user) {
    const { data } = await getSupabase()
      .from('reformistas_perfiles')
      .select('nombre')
      .eq('id', user.id)
      .single()
    nombrePerfil = data?.nombre ?? null
  }

  const inicial = nombrePerfil
    ? nombrePerfil[0].toUpperCase()
    : user?.email?.[0].toUpperCase() ?? '?'

  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#F7F3EE]/90 backdrop-blur-md border-b border-[#E8DFD8]/70">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              reforma<span className="text-[#C4531A]">real</span>
            </span>
          </a>
          <div className="flex gap-2 sm:gap-4 items-center">
            {user ? (
              <a href="/panel" className="hidden sm:flex items-center gap-2 text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors font-medium group">
                <span className="w-8 h-8 bg-[#C4531A] rounded-full flex items-center justify-center text-white text-sm font-black group-hover:bg-[#A84414] transition-colors">
                  {inicial}
                </span>
                <span>{nombrePerfil ?? 'Mi panel'}</span>
              </a>
            ) : (
              <a href="/reformistas" className="hidden sm:block text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors font-medium">
                Soy reformista
              </a>
            )}
            <a href="#calcular" className="bg-[#C4531A] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#A84414] transition-colors font-semibold shadow-sm shadow-[#C4531A]/20">
              Calcular precio
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-16 pb-20 text-center">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C4531A]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#C4531A]/6 rounded-full blur-3xl pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-[#E8DFD8] rounded-full px-4 py-1.5 text-sm text-[#6B5B4E] mb-6 shadow-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Gratis
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.02] mb-6 tracking-tight">
            El precio primero,<br />
            <span className="text-[#C4531A]">el reformista después</span>
          </h1>
          <p className="text-base sm:text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-10 leading-relaxed">
            Estimación real en 2 minutos. Tres presupuestos comparables. Reformistas verificados en tu ciudad.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#calcular"
              className="bg-[#C4531A] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-all shadow-lg shadow-[#C4531A]/25 hover:shadow-[#C4531A]/40 hover:-translate-y-0.5"
            >
              Calcular precio gratis →
            </a>
            <a
              href="/reformistas"
              className="sm:hidden border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full text-base hover:border-[#1C1208] hover:text-[#1C1208] transition-colors font-medium"
            >
              Unirme como reformista
            </a>
            <a
              href="#como-funciona"
              className="hidden sm:block border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full text-base hover:border-[#1C1208] hover:text-[#1C1208] transition-colors font-medium"
            >
              Cómo funciona
            </a>
          </div>

          {/* STATS */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { n: "2 min", label: "Estimación de precio" },
              { n: "3", label: "Presupuestos comparables" },
              { n: "100%", label: "Reformistas verificados" },
            ].map((s) => (
              <div key={s.label} className="bg-white/70 backdrop-blur-sm border border-[#E8DFD8] rounded-2xl p-4 text-center shadow-sm">
                <div className="text-xl sm:text-2xl font-black text-[#C4531A]">{s.n}</div>
                <div className="text-xs text-[#6B5B4E] mt-1 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">El problema</p>
            <h2 className="text-3xl md:text-5xl font-black mb-14 max-w-3xl leading-tight">
              Pedir presupuestos de reforma<br className="hidden md:block" /> es una tortura
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Presupuestos incomparables", desc: "Cada reformista usa su formato. Imposible saber quién es más barato realmente." },
              { title: "Sin referencias de precio", desc: "No sabes si 45.000€ por tu reforma es caro o barato sin preguntar a todo el mundo." },
              { title: "Semanas para reunir 3 ofertas", desc: "Visitas, esperas, llamadas sin respuesta. El proceso consume tu tiempo." },
              { title: "Desconfianza total", desc: "Sin verificación real, no sabes si el reformista tiene licencia o seguro de responsabilidad civil." },
            ].map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <div className="group bg-[#2A1E10] hover:bg-[#321F0E] rounded-2xl p-7 border border-white/5 hover:border-[#C4531A]/30 transition-all duration-300 h-full">
                  <div className="w-11 h-11 bg-[#C4531A]/15 rounded-xl flex items-center justify-center text-[#C4531A] mb-5 group-hover:bg-[#C4531A]/25 transition-colors">
                    {problemasIcons[i]}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-[#B5A090] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-28 max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">Cómo funciona</p>
          <h2 className="text-3xl md:text-5xl font-black mb-20 max-w-2xl leading-tight">
            De cero a tres presupuestos<br className="hidden md:block" /> comparables
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-[#E8DFD8] via-[#C4531A]/30 to-[#E8DFD8]" />
          {[
            { n: "01", title: "Describe tu reforma", desc: "Metros cuadrados, ciudad, tipo de reforma y calidad deseada. Dos minutos." },
            { n: "02", title: "Recibe la estimación", desc: "Rango de precio desglosado por capítulos: albañilería, fontanería, electricidad, carpintería..." },
            { n: "03", title: "Compara presupuestos reales", desc: "Tres reformistas verificados te envían presupuesto en el mismo formato. Comparables en tabla." },
          ].map((s, i) => (
            <FadeIn key={s.n} delay={i * 120}>
              <div className="relative text-center md:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-[#E8DFD8] rounded-2xl text-[#C4531A] mb-6 shadow-sm">
                  {pasosIcons[i]}
                </div>
                <div className="absolute -top-2 -left-1 md:-left-2 text-[#E8DFD8] text-5xl font-black leading-none select-none">{s.n}</div>
                <h3 className="font-bold text-xl mb-3 mt-2">{s.title}</h3>
                <p className="text-[#6B5B4E] leading-relaxed text-sm sm:text-base">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Calculadora />

      {/* PARA REFORMISTAS */}
      <section id="reformistas" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">Para reformistas</p>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                Clientes que ya saben lo que vale una obra
              </h2>
              <p className="text-[#6B5B4E] text-lg mb-8 leading-relaxed">
                El cliente ya conoce el rango de precio antes de contactarte. Sin visitas perdidas. Sin negociaciones imposibles. Solo obras reales.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Leads cualificados con expectativa de precio realista",
                  "Herramienta de presupuesto PDF profesional incluida",
                  "Perfil verificado con fotos antes/después de obras",
                  "Panel de gestión de leads y estado de obras",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start">
                    <div className="w-5 h-5 bg-[#C4531A]/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#C4531A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-[#3D3228]">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/reformistas" className="inline-flex items-center gap-2 bg-[#1C1208] text-white px-7 py-4 rounded-full font-semibold hover:bg-[#C4531A] transition-colors shadow-md">
                Unirme como reformista →
              </a>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { plan: "Básico", price: "19€", desc: "Ficha verificada + herramienta de presupuesto PDF" },
                  { plan: "Pro", price: "49€", desc: "Posición destacada + badge verificado + leads directos", destacado: true },
                  { plan: "Elite", price: "99€", desc: "Primero en tu provincia + panel de obra + analíticas" },
                ].map((p) => (
                  <div
                    key={p.plan}
                    className={`rounded-2xl p-6 border transition-all ${
                      p.destacado
                        ? "border-[#C4531A] bg-[#FDF0EB] shadow-lg shadow-[#C4531A]/10"
                        : "border-[#E8DFD8] bg-[#F7F3EE] hover:border-[#C4B8AE]"
                    }`}
                  >
                    {p.destacado && (
                      <span className="text-xs bg-[#C4531A] text-white px-3 py-1 rounded-full font-semibold mb-3 inline-block">
                        Más elegido · 1er mes gratis
                      </span>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{p.plan}</span>
                      <span className="text-2xl font-black text-[#C4531A]">{p.price}<span className="text-sm font-normal text-[#6B5B4E]">/mes</span></span>
                    </div>
                    <p className="text-sm text-[#6B5B4E] mt-2">{p.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1C1208] text-[#F7F3EE] pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
            {/* Brand */}
            <div className="md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} />
                <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
              </a>
              <p className="text-[#B5A090] text-sm leading-relaxed max-w-xs">
                Estima el precio de tu reforma en 2 minutos y compara hasta 3 presupuestos de reformistas verificados en tu ciudad.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B5B4E] mb-4">Para clientes</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Reformas integrales Madrid", href: "/reformas-integrales-madrid" },
                  { label: "Reforma cocina Madrid", href: "/reforma-cocina-madrid" },
                  { label: "Reforma baño Madrid", href: "/reforma-bano-madrid" },
                  { label: "Calcular precio", href: "#calcular" },
                ].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-[#B5A090] hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6B5B4E] mb-4">Para reformistas</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Unirme como reformista", href: "/reformistas" },
                  { label: "Acceder al panel", href: "/login" },
                  { label: "Contacto", href: "mailto:reformarealsoporte@gmail.com" },
                  { label: "Privacidad", href: "/privacidad" },
                  { label: "Términos", href: "/terminos" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-[#B5A090] hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-[#6B5B4E]">
            <p>© 2026 ReformaReal · España</p>
            <p className="text-xs">Hecho con cuidado para que reformar no sea una pesadilla</p>
          </div>
        </div>
      </footer>

    </main>
  );
}
