import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Área de reformistas — ReformaReal',
  description: 'Accede a tu panel o regístrate para recibir leads cualificados de clientes que ya conocen el precio de su reforma.',
}

const planes = [
  { nombre: 'Básico',  precio: '49 €/mes',  desc: 'Ficha verificada + presupuesto PDF' },
  { nombre: 'Pro',     precio: '99 €/mes',  desc: 'Posición destacada + leads directos', popular: true },
  { nombre: 'Elite',   precio: '199 €/mes', desc: 'Primero en tu provincia + panel completo' },
]

const PROMO_ACTIVA = true

export default function Reformistas() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
          ← Inicio
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-xl mx-auto px-5 pt-14 pb-6 text-center">
        <div className="inline-block bg-[#1C1208]/10 text-[#1C1208] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
          Para profesionales
        </div>
        <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
          Clientes que ya saben<br />
          <span className="text-[#C4531A]">cuánto vale su obra</span>
        </h1>
        <p className="text-[#6B5B4E] leading-relaxed mb-10">
          Recibe solicitudes de clientes con estimación hecha. Sin visitas perdidas, sin negociaciones imposibles.
        </p>

        {/* ACCESO / REGISTRO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {/* LOGIN */}
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

          {/* REGISTRO */}
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
              <p className="text-sm text-white/80 mt-1">Crea tu perfil y empieza a recibir leads</p>
            </div>
            <span className="text-sm font-semibold text-white">Crear cuenta →</span>
          </a>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '🎯', title: 'Leads cualificados', desc: 'El cliente ya tiene estimación. Sabe lo que cuesta.' },
              { icon: '📄', title: 'Presupuesto PDF', desc: 'Herramienta para generar presupuestos profesionales.' },
              { icon: '✅', title: 'Perfil verificado', desc: 'Genera confianza desde el primer contacto.' },
              { icon: '📊', title: 'Panel de gestión', desc: 'Gestiona tus leads y obras desde un panel propio.' },
            ].map((v) => (
              <div key={v.title} className="bg-[#2A1E10] rounded-2xl p-5">
                <div className="text-2xl mb-2">{v.icon}</div>
                <h3 className="font-bold mb-1">{v.title}</h3>
                <p className="text-[#B5A090] text-sm leading-relaxed">{v.desc}</p>
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
            Solo necesitas introducir tu tarjeta. No se realiza ningún cargo hasta pasado el mes de prueba.
          </p>
        )}
        <p className="text-center mt-6">
          <a href="/registro" className="inline-block bg-[#C4531A] text-white px-8 py-4 rounded-full font-bold hover:bg-[#A84414] transition-colors">
            {PROMO_ACTIVA ? 'Empezar gratis →' : 'Empezar ahora →'}
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
          <p className="text-sm text-[#6B5B4E]">© 2026 ReformaReal · Madrid</p>
          <a href="mailto:reformarealsoporte@gmail.com" className="text-sm text-[#6B5B4E] hover:text-[#1C1208]">Contacto</a>
        </div>
      </footer>

    </main>
  )
}
