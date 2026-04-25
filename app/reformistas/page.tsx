import type { Metadata } from 'next'
import Image from 'next/image'
import FormReformista from './FormReformista'

export const metadata: Metadata = {
  title: 'Únete como reformista — ReformaReal',
  description: 'Accede a clientes que ya conocen el precio de su reforma. Perfil verificado, leads cualificados, herramienta de presupuesto incluida.',
}

export default function Reformistas() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold tracking-tight">
            reforma<span className="text-[#C4531A]">real</span>
          </span>
        </a>
        <a href="/" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
          ← Volver
        </a>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <div className="inline-block bg-[#1C1208]/10 text-[#1C1208] text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          Para profesionales
        </div>
        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6 tracking-tight">
          Clientes que ya saben<br />
          <span className="text-[#C4531A]">cuánto vale su obra</span>
        </h1>
        <p className="text-xl text-[#6B5B4E] max-w-2xl mx-auto leading-relaxed">
          El cliente llega con la estimación hecha. Sin visitas perdidas, sin negociaciones imposibles.
          Solo obras reales con presupuestos comparables.
        </p>
      </section>

      {/* VENTAJAS */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Leads cualificados', desc: 'El cliente ya tiene una estimación real. Sabe lo que cuesta.' },
              { icon: '📄', title: 'Presupuesto PDF', desc: 'Herramienta para generar presupuestos profesionales incluida.' },
              { icon: '✅', title: 'Badge verificado', desc: 'Licencia y seguro comprobados. Genera confianza desde el primer momento.' },
              { icon: '📊', title: 'Panel de gestión', desc: 'Gestiona tus leads y el estado de tus obras desde un panel propio.' },
            ].map((v) => (
              <div key={v.title} className="bg-[#2A1E10] rounded-2xl p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-[#B5A090] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4 text-center">Planes</p>
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Sin permanencia, sin letra pequeña</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { plan: 'Básico', price: '49€', desc: 'Ficha verificada + herramienta de presupuesto PDF', destacado: false },
            { plan: 'Pro', price: '99€', desc: 'Posición destacada + badge verificado + leads directos', destacado: true },
            { plan: 'Elite', price: '199€', desc: 'Primero en tu provincia + panel de obra + analíticas', destacado: false },
          ].map((p) => (
            <div
              key={p.plan}
              className={`rounded-2xl p-6 border ${p.destacado ? 'border-[#C4531A] bg-[#FDF0EB]' : 'border-[#E8DFD8] bg-white'}`}
            >
              {p.destacado && (
                <span className="text-xs bg-[#C4531A] text-white px-2 py-0.5 rounded-full font-semibold mb-3 inline-block">
                  Más elegido
                </span>
              )}
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg">{p.plan}</span>
                <span className="text-2xl font-black text-[#C4531A]">
                  {p.price}<span className="text-sm font-normal text-[#6B5B4E]">/mes</span>
                </span>
              </div>
              <p className="text-sm text-[#6B5B4E]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="bg-[#C4531A] py-20 px-6">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Solicita tu verificación
          </h2>
          <p className="text-white/80">
            Rellena el formulario y te contactamos en menos de 48 horas para revisar tu perfil y activar tu cuenta.
          </p>
        </div>
        <FormReformista />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFD8] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={28} height={25} />
            <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
          </a>
          <p className="text-sm text-[#6B5B4E]">© 2026 ReformaReal · Madrid</p>
          <div className="flex gap-6 text-sm text-[#6B5B4E]">
            <a href="#" className="hover:text-[#1C1208] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#1C1208] transition-colors">Términos</a>
            <a href="mailto:reformarealsoporte@gmail.com" className="hover:text-[#1C1208] transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

    </main>
  )
}
