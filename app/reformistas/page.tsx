import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Área de reformistas — ReformaReal',
  description: 'Accede a tu panel o regístrate para recibir leads cualificados de clientes que ya conocen el precio de su reforma.',
}

const planes = [
  { nombre: 'Básico',  precio: '19 €/mes',  desc: 'Ficha verificada + presupuesto PDF' },
  { nombre: 'Pro',     precio: '49 €/mes',  desc: 'Posición destacada + leads directos', popular: true },
  { nombre: 'Elite',   precio: '99 €/mes',  desc: 'Primero en tu provincia + panel completo' },
]

const testimonios = [
  {
    texto: 'Antes perdía días en visitas que no llegaban a nada. Aquí el cliente ya sabe que su reforma cuesta 45.000 €. Solo tengo que ganar el presupuesto, no convencer de que el precio es el justo.',
    nombre: 'Juan M.',
    ciudad: 'Madrid',
    tipo: 'Reforma integral',
  },
  {
    texto: 'Me registré el viernes y el lunes ya tenía solicitudes de reforma en mi zona. Con una obra cerrada ya tengo el plan pagado para años. La relación calidad-precio no tiene comparación.',
    nombre: 'Carmen R.',
    ciudad: 'Barcelona',
    tipo: 'Cocina y baño',
  },
  {
    texto: 'Lo que más valoro es que el cliente viene informado. Sin sorpresas de precio a mitad de obra. Mis valoraciones han mejorado porque empezamos con expectativas reales.',
    nombre: 'Roberto G.',
    ciudad: 'Valencia',
    tipo: 'Reformas integrales',
  },
]

const PROMO_ACTIVA = true

export default function Reformistas() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#F7F3EE]/80 backdrop-blur-xl border-b border-[#E8DFD8]/60 flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-black">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
          ← Inicio
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-full px-5 pt-16 pb-12 text-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 90% 70% at 60% -5%, #f5d5c0 0%, transparent 55%), radial-gradient(ellipse 60% 50% at -5% 90%, #f0cbb5 0%, transparent 50%), #F7F3EE' }}>
        <div className="max-w-2xl mx-auto relative">
        <div className="inline-block bg-white/80 backdrop-blur-sm border border-[#E8DFD8] text-[#6B5B4E] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase shadow-sm">
          Para profesionales
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
          Clientes que ya saben<br />
          <span style={{ background: 'linear-gradient(135deg, #C4531A 0%, #E8702A 50%, #C4531A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            cuánto vale su obra
          </span>
        </h1>
        <p className="text-[#6B5B4E] leading-relaxed mb-3">
          Recibe solicitudes de clientes con estimación hecha. Sin visitas perdidas, sin negociaciones imposibles.
        </p>
        <p className="text-sm font-semibold text-[#1C1208] mb-10">
          El cliente medio llega con una obra estimada entre <span className="text-[#C4531A]">20.000 € y 80.000 €</span>.
        </p>

        {/* ACCESO / REGISTRO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <a
            href="/login"
            className="flex flex-col items-center gap-3 bg-white border-2 border-[#E8DFD8] rounded-2xl p-8 hover:border-[#1C1208] transition-colors group"
          >
            <div className="w-14 h-14 bg-[#1C1208] rounded-full flex items-center justify-center group-hover:bg-[#C4531A] transition-colors">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="font-black text-lg">Iniciar sesión</p>
              <p className="text-sm text-[#6B5B4E] mt-1">Accede a tu panel y gestiona tus leads</p>
            </div>
            <span className="text-sm font-semibold text-[#C4531A]">Entrar →</span>
          </a>

          <a
            href="/registro"
            className="flex flex-col items-center gap-3 bg-[#C4531A] rounded-2xl p-8 hover:bg-[#A84414] transition-colors group"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="text-white">
              <p className="font-black text-lg">Registrarse</p>
              <p className="text-sm text-white/80 mt-1">1er mes gratis · Elige plan desde el panel</p>
            </div>
            <span className="text-sm font-semibold text-white">Crear cuenta →</span>
          </a>
        </div>

        <p className="text-xs text-[#6B5B4E]">
          Sé de los primeros reformistas verificados en tu ciudad. Plazas limitadas por provincia.
        </p>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <h2 className="text-2xl font-black text-center mb-12">Cómo funciona para ti</h2>
        <div className="grid sm:grid-cols-3 gap-8 relative">
          <div className="hidden sm:block absolute top-8 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-[#E8DFD8] via-[#C4531A]/30 to-[#E8DFD8]" />
          {[
            {
              n: '01',
              titulo: 'Crea tu cuenta',
              desc: 'Solo nombre, ciudad y email. Sin tarjeta. En menos de un minuto ya estás dentro.',
            },
            {
              n: '02',
              titulo: 'Recibe solicitudes',
              desc: 'Clientes de tu zona con estimación de precio ya hecha te contactan directamente en tu panel.',
            },
            {
              n: '03',
              titulo: 'Presenta y gana',
              desc: 'Genera presupuestos en PDF con tu marca. El cliente ya espera el precio correcto.',
            },
          ].map((paso, i) => (
            <div key={paso.n} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-[#E8DFD8] rounded-2xl text-[#C4531A] font-black text-xl mb-4 shadow-sm relative z-10">
                {paso.n}
              </div>
              <h3 className="font-bold text-lg mb-2">{paso.titulo}</h3>
              <p className="text-sm text-[#6B5B4E] leading-relaxed">{paso.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="text-[#F7F3EE] py-14 relative overflow-hidden" style={{ background: 'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(196,83,26,0.18) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(196,83,26,0.12) 0%, transparent 50%), #1C1208' }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '🎯', title: 'Leads cualificados', desc: 'El cliente ya tiene estimación. Sabe lo que cuesta su obra.' },
              { icon: '📄', title: 'Presupuesto PDF',    desc: 'Herramienta para generar presupuestos profesionales con tu marca.' },
              { icon: '✅', title: 'Perfil verificado',  desc: 'Badge de verificado que genera confianza desde el primer contacto.' },
              { icon: '📊', title: 'Panel de gestión',   desc: 'Gestiona tus leads y el estado de tus obras desde un panel propio.' },
            ].map((v) => (
              <div key={v.title} className="bg-white/6 hover:bg-white/10 rounded-2xl p-5 border border-white/8 hover:border-[#C4531A]/30 transition-all duration-200 backdrop-blur-sm">
                <div className="text-2xl mb-2">{v.icon}</div>
                <h3 className="font-bold mb-1">{v.title}</h3>
                <p className="text-[#B5A090] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-16 max-w-3xl mx-auto px-5 text-center">
        <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-3">El cálculo es simple</p>
        <h2 className="text-2xl sm:text-3xl font-black mb-6 leading-tight">
          Con 1 obra conseguida,<br />tienes el plan pagado durante años
        </h2>
        <div className="bg-white border border-[#E8DFD8] rounded-2xl p-6 sm:p-8 text-left">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { label: 'Coste del plan Pro', valor: '49 €/mes', sub: '588 € al año' },
              { label: 'Obra media cerrada', valor: '35.000 €', sub: 'margen habitual del 15-25%' },
              { label: 'ROI de 1 obra', valor: '×59', sub: 'el plan se paga solo en días' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-[#6B5B4E] uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-3xl font-black text-[#C4531A]">{item.valor}</p>
                <p className="text-xs text-[#6B5B4E] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#6B5B4E] text-center mt-6 border-t border-[#E8DFD8] pt-4">
            Cálculo orientativo. El resultado depende de tu tasa de cierre y del tamaño de las obras.
          </p>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-2xl font-black text-center mb-10">Lo que dicen los reformistas</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonios.map((t) => (
              <div key={t.nombre} className="bg-[#F7F3EE] rounded-2xl p-6 border border-[#E8DFD8] flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-[#C4531A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#3D3228] leading-relaxed flex-1">"{t.texto}"</p>
                <div className="mt-5 pt-4 border-t border-[#E8DFD8]">
                  <p className="font-bold text-sm">{t.nombre}</p>
                  <p className="text-xs text-[#6B5B4E]">{t.tipo} · {t.ciudad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <h2 className="text-2xl font-black text-center mb-2">Planes sin permanencia</h2>
        {PROMO_ACTIVA && (
          <p className="text-center text-[#C4531A] font-bold mb-8">
            🎉 Oferta de lanzamiento — primer mes completamente gratis
          </p>
        )}
        <div className="grid sm:grid-cols-3 gap-5">
          {planes.map((p) => (
            <div
              key={p.nombre}
              className={`rounded-2xl p-6 border relative ${p.popular ? 'border-[#C4531A] bg-[#FDF0EB]' : 'border-[#E8DFD8] bg-white'}`}
            >
              {PROMO_ACTIVA && (
                <span className="absolute -top-3 right-3 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                  1er mes GRATIS
                </span>
              )}
              {p.popular && (
                <span className="text-xs bg-[#C4531A] text-white px-2 py-0.5 rounded-full font-semibold mb-3 inline-block">
                  Más elegido
                </span>
              )}
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg">{p.nombre}</span>
                <div className="text-right">
                  {PROMO_ACTIVA && (
                    <span className="block text-xs text-[#6B5B4E] line-through">{p.precio}</span>
                  )}
                  <span className={`font-black ${PROMO_ACTIVA ? 'text-green-600' : 'text-[#C4531A]'}`}>
                    {PROMO_ACTIVA ? '0 €' : p.precio}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#6B5B4E]">{p.desc}</p>
            </div>
          ))}
        </div>
        {PROMO_ACTIVA && (
          <p className="text-center text-xs text-[#6B5B4E] mt-4">
            Crea tu cuenta gratis y elige tu plan desde el panel. Primer mes sin cargo, cancela cuando quieras.
          </p>
        )}
        <p className="text-center mt-6">
          <a
            href="/registro"
            className="inline-block text-white px-8 py-4 rounded-full font-bold transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #D4631A 0%, #B84515 100%)', boxShadow: '0 4px 24px -4px rgba(196,83,26,0.5)' }}
          >
            {PROMO_ACTIVA ? 'Crear cuenta gratis →' : 'Empezar ahora →'}
          </a>
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFD8] py-8 px-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={28} height={25} />
            <span className="font-bold">reforma<span className="text-[#C4531A]">real</span></span>
          </a>
          <p className="text-sm text-[#6B5B4E]">© 2026 ReformaReal · España</p>
          <a href="mailto:reformarealsoporte@gmail.com" className="text-sm text-[#6B5B4E] hover:text-[#1C1208]">Contacto</a>
        </div>
      </footer>

    </main>
  )
}
