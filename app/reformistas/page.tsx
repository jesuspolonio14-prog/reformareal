import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Consigue clientes para tu empresa de reformas — ReformaReal',
  description: 'Recibe solicitudes de obra cada semana. Electricistas, fontaneros, albañiles, pintores y carpinteros verificados en ReformaReal. Primer mes gratis.',
  alternates: { canonical: 'https://reformareal.com/reformistas' },
}

const oficios = [
  { icon: '⚡', nombre: 'Electricistas' },
  { icon: '🔧', nombre: 'Fontaneros' },
  { icon: '🧱', nombre: 'Albañiles' },
  { icon: '🎨', nombre: 'Pintores' },
  { icon: '🪚', nombre: 'Carpinteros' },
  { icon: '🏗️', nombre: 'Reformistas' },
]

const problemas = [
  { titulo: 'Publicidad cara, pocos resultados', desc: 'Pagas Google Ads o páginas de terceros y los leads que llegan no tienen presupuesto o ni responden.' },
  { titulo: 'Clientes que regatean sin saber', desc: 'Llegan sin idea del precio real. Pierdes horas explicando por qué no puedes hacer una reforma entera por 3.000€.' },
  { titulo: 'Semanas sin obra nueva', desc: 'Los trabajos de cartera se acaban y no tienes embudo de clientes nuevos. La incertidumbre es constante.' },
  { titulo: 'No sabes en qué invertir', desc: 'Redes, Google, Habitissimo, Milanuncios... probar sin datos es tirar el dinero.' },
]

const pasos = [
  { n: '01', titulo: 'El cliente calcula el precio', desc: 'Entra en reformareal.com, describe su obra y obtiene una estimación desglosada. Sabe lo que vale antes de contactar.' },
  { n: '02', titulo: 'Tú recibes la solicitud', desc: 'Los datos de la obra llegan directamente a tu panel: metros, tipo de reforma, ciudad y rango de precio esperado.' },
  { n: '03', titulo: 'Contactas y presupuestas', desc: 'Sin intermediarios. Tú decides si quieres la obra y envías tu presupuesto en formato profesional desde el panel.' },
]

const ventajas = [
  { icon: '🎯', titulo: 'Leads con expectativa de precio', desc: 'El cliente ya sabe que reformar un baño cuesta entre 4.000 y 9.000€. No negocias desde cero.' },
  { icon: '📄', titulo: 'Herramienta de presupuesto PDF', desc: 'Genera presupuestos profesionales desglosados por capítulos desde tu panel. Sin Excel ni Word.' },
  { icon: '✅', titulo: 'Perfil verificado', desc: 'Licencia y seguro RC comprobados. Los clientes ven que eres un profesional de confianza.' },
  { icon: '📊', titulo: 'Panel de gestión de leads', desc: 'Revisa cada solicitud, marca el estado de la obra y gestiona todo desde un sitio.' },
]

const planes = [
  { key: 'basico',  nombre: 'Básico',  precio: '19 €/mes', desc: 'Ficha verificada + herramienta presupuesto PDF' },
  { key: 'pro',     nombre: 'Pro',     precio: '49 €/mes', desc: 'Posición destacada + leads directos + badge verificado', popular: true },
  { key: 'elite',   nombre: 'Elite',   precio: '99 €/mes', desc: 'Primero en tu provincia + panel completo + analíticas' },
]

const faqs = [
  { q: '¿Qué tipo de obras llegan?', a: 'Reformas integrales, de cocina, baño, electricidad, fontanería, pintura, carpintería y suelos. Principalmente en Madrid, con expansión a otras ciudades.' },
  { q: '¿Cuántos leads recibiré al mes?', a: 'Depende del plan y de tu ciudad. Los reformistas del plan Pro en Madrid reciben entre 3 y 8 solicitudes mensuales. El volumen crece con el número de clientes activos en la plataforma.' },
  { q: '¿Hay permanencia o contrato?', a: 'No. Puedes cancelar en cualquier momento. El primer mes es completamente gratis, sin cargos.' },
  { q: '¿Necesito obra de reforma integral o sirve mi oficio específico?', a: 'Sirve cualquier oficio relacionado con la reforma: electricidad, fontanería, pintura, carpintería, albañilería. Los clientes buscan tanto reformas integrales como trabajos específicos.' },
  { q: '¿Cuándo empieza el cobro?', a: 'Solo al terminar el mes de prueba gratuita. Necesitas introducir tarjeta para reservar tu plan, pero no se realiza ningún cargo hasta pasado el primer mes.' },
]

const PROMO_ACTIVA = true

export default function Reformistas() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#F7F3EE]/90 backdrop-blur-md border-b border-[#E8DFD8]/70">
        <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
            <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/login" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors font-medium hidden sm:block">
              Ya tengo cuenta →
            </a>
            <a href="/registro" className="bg-[#C4531A] text-white text-sm px-5 py-2.5 rounded-full hover:bg-[#A84414] transition-colors font-semibold">
              {PROMO_ACTIVA ? 'Empezar gratis' : 'Registrarme'}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-5 pt-14 pb-16 text-center">
        {/* Oficios badge */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {oficios.map((o) => (
            <span key={o.nombre} className="inline-flex items-center gap-1.5 bg-white border border-[#E8DFD8] rounded-full px-3 py-1.5 text-sm text-[#3D3228] shadow-sm">
              <span>{o.icon}</span>
              <span className="font-medium">{o.nombre}</span>
            </span>
          ))}
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-5 tracking-tight">
          Regístrate y empieza<br />
          <span className="text-[#C4531A]">a llevarte obras.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-8 leading-relaxed">
          Recibe solicitudes de clientes que ya saben cuánto cuesta su reforma. Sin publicidad cara, sin llamadas en frío, sin regateo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a href="/registro" className="bg-[#C4531A] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-all shadow-lg shadow-[#C4531A]/25 hover:-translate-y-0.5">
            {PROMO_ACTIVA ? 'Empezar gratis — 1er mes sin cargo →' : 'Registrarme ahora →'}
          </a>
          <a href="/login" className="border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full text-base hover:border-[#1C1208] hover:text-[#1C1208] transition-colors font-medium">
            Ya tengo cuenta
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { n: '3–8', label: 'leads/mes en Madrid' },
            { n: '0€', label: PROMO_ACTIVA ? 'el primer mes' : 'de comisión por obra' },
            { n: '100%', label: 'sin permanencia' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-[#C4531A]">{s.n}</div>
              <div className="text-xs text-[#6B5B4E] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EL PROBLEMA */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-20">
        <div className="max-w-5xl mx-auto px-5">
          <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">El problema</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 max-w-2xl leading-tight">
            Conseguir clientes consume más tiempo del que te gustaría
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {problemas.map((p) => (
              <div key={p.titulo} className="bg-[#2A1E10] rounded-2xl p-6 border border-white/5">
                <h3 className="font-bold text-lg mb-2">{p.titulo}</h3>
                <p className="text-[#B5A090] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 max-w-5xl mx-auto px-5">
        <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">Cómo funciona</p>
        <h2 className="text-3xl font-black mb-14 max-w-2xl leading-tight">
          De cero a tener la solicitud en tu panel
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {pasos.map((s) => (
            <div key={s.n} className="relative">
              <div className="text-6xl font-black text-[#E8DFD8] leading-none mb-4 select-none">{s.n}</div>
              <h3 className="font-bold text-xl mb-2">{s.titulo}</h3>
              <p className="text-[#6B5B4E] text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-black mb-10">Todo lo que incluye tu suscripción</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {ventajas.map((v) => (
              <div key={v.titulo} className="bg-[#F7F3EE] rounded-2xl p-5 border border-[#E8DFD8]">
                <div className="text-2xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2">{v.titulo}</h3>
                <p className="text-[#6B5B4E] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESO / REGISTRO */}
      <section className="py-20 max-w-xl mx-auto px-5 text-center">
        <h2 className="text-2xl font-black mb-2">Empieza a recibir leads esta semana</h2>
        {PROMO_ACTIVA && (
          <p className="text-[#C4531A] font-bold mb-8">Primer mes completamente gratis · Sin cargo hasta pasado el mes de prueba</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            className="flex flex-col items-center gap-3 bg-[#C4531A] rounded-2xl p-8 hover:bg-[#A84414] transition-colors"
          >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="text-white">
              <p className="font-black text-lg">{PROMO_ACTIVA ? 'Empezar gratis' : 'Registrarse'}</p>
              <p className="text-sm text-white/80 mt-1">{PROMO_ACTIVA ? '1er mes sin cargo · Cancela cuando quieras' : 'Crea tu perfil y empieza a recibir leads'}</p>
            </div>
            <span className="text-sm font-semibold text-white">Crear cuenta →</span>
          </a>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-16 bg-[#F7F3EE] border-t border-[#E8DFD8]">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-2xl font-black text-center mb-2">Elige tu plan</h2>
          <p className="text-center text-[#6B5B4E] mb-8 text-sm">Sin permanencia · Cancela cuando quieras</p>
          {PROMO_ACTIVA && (
            <p className="text-center text-[#C4531A] font-bold mb-6">Primer mes completamente gratis</p>
          )}
          <div className="grid sm:grid-cols-3 gap-5">
            {planes.map((p) => (
              <div
                key={p.nombre}
                className={`rounded-2xl p-6 border relative ${p.popular ? 'border-[#C4531A] bg-[#FDF0EB] shadow-lg shadow-[#C4531A]/10' : 'border-[#E8DFD8] bg-white'}`}
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
                    {PROMO_ACTIVA && <span className="block text-xs text-[#6B5B4E] line-through">{p.precio}</span>}
                    <span className={`font-black text-xl ${PROMO_ACTIVA ? 'text-green-600' : 'text-[#C4531A]'}`}>
                      {PROMO_ACTIVA ? '0 €' : p.precio}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[#6B5B4E]">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8">
            <a href="/registro" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#A84414] transition-colors shadow-md">
              {PROMO_ACTIVA ? 'Empezar gratis →' : 'Registrarme ahora →'}
            </a>
          </p>
          {PROMO_ACTIVA && (
            <p className="text-center text-xs text-[#6B5B4E] mt-3">
              Solo necesitas introducir tu tarjeta. No se realiza ningún cargo hasta pasado el mes de prueba.
            </p>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-5">
        <h2 className="text-2xl font-black mb-10">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
              <p className="font-bold mb-2">{f.q}</p>
              <p className="text-[#6B5B4E] text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-[#C4531A] py-16 text-center px-5">
        <h2 className="text-3xl font-black text-white mb-3">
          {PROMO_ACTIVA ? 'El primer mes es gratis. Sin excusas.' : '¿Listo para recibir más obras?'}
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Regístrate en 2 minutos. Empieza a recibir solicitudes de obra en tu zona esta misma semana.
        </p>
        <a href="/registro" className="inline-block bg-white text-[#C4531A] px-8 py-4 rounded-full font-bold hover:bg-[#F7F3EE] transition-colors shadow-lg">
          {PROMO_ACTIVA ? 'Empezar mi mes gratis →' : 'Registrarme ahora →'}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFD8] py-8 px-5 bg-[#F7F3EE]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={28} height={25} />
            <span className="font-bold">reforma<span className="text-[#C4531A]">real</span></span>
          </a>
          <p className="text-sm text-[#6B5B4E]">© 2026 ReformaReal · Madrid</p>
          <div className="flex gap-4 text-sm text-[#6B5B4E]">
            <a href="/privacidad" className="hover:text-[#1C1208] transition-colors">Privacidad</a>
            <a href="/terminos" className="hover:text-[#1C1208] transition-colors">Términos</a>
            <a href="mailto:reformarealsoporte@gmail.com" className="hover:text-[#1C1208] transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
