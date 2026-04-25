import type { Metadata } from "next";
import Image from "next/image";
import Calculadora from "@/app/components/Calculadora";

export const metadata: Metadata = {
  title: "ReformaReal — Sabe cuánto cuesta tu reforma antes de llamar a nadie",
  description: "Estimación de precio en 2 minutos. Presupuestos comparables. Reformistas verificados.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-lg sm:text-xl font-bold tracking-tight">
            reforma<span className="text-[#C4531A]">real</span>
          </span>
        </a>
        <div className="flex gap-2 sm:gap-4 items-center">
          <a href="/reformistas" className="hidden sm:block text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
            Soy reformista
          </a>
          <a href="#calcular" className="bg-[#C4531A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#A84414] transition-colors">
            Calcular precio
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-5 pt-14 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] mb-5 tracking-tight">
          El precio primero,<br />
          <span className="text-[#C4531A]">el reformista después</span>
        </h1>
        <p className="text-base sm:text-lg text-[#6B5B4E] max-w-xl mx-auto mb-8 leading-relaxed">
          Estimación real en 2 minutos. Tres presupuestos comparables. Reformistas verificados.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
          <a
            href="#calcular"
            className="bg-[#C4531A] text-white px-7 py-4 rounded-full text-base font-semibold hover:bg-[#A84414] transition-colors"
          >
            Calcular precio gratis →
          </a>
          {/* Móvil: Unirme como reformista */}
          <a
            href="/reformistas"
            className="sm:hidden border border-[#C4B8AE] text-[#6B5B4E] px-7 py-4 rounded-full text-base hover:border-[#1C1208] hover:text-[#1C1208] transition-colors"
          >
            Unirme como reformista
          </a>
          {/* Desktop: Cómo funciona */}
          <a
            href="#como-funciona"
            className="hidden sm:block border border-[#C4B8AE] text-[#6B5B4E] px-7 py-4 rounded-full text-base hover:border-[#1C1208] hover:text-[#1C1208] transition-colors"
          >
            Cómo funciona
          </a>
        </div>

        {/* STATS */}
        <div className="mt-12 grid grid-cols-3 gap-3 max-w-xs sm:max-w-lg mx-auto">
          {[
            { n: "2 min", label: "Estimación de precio" },
            { n: "3", label: "Presupuestos comparables" },
            { n: "100%", label: "Reformistas verificados" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl sm:text-2xl font-black text-[#C4531A]">{s.n}</div>
              <div className="text-xs text-[#6B5B4E] mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="bg-[#1C1208] text-[#F7F3EE] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">El problema</p>
          <h2 className="text-3xl md:text-5xl font-black mb-12 max-w-3xl leading-tight">
            Pedir presupuestos de reforma es una tortura
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Presupuestos incomparables", desc: "Cada reformista usa su formato. Imposible saber quién es más barato realmente." },
              { title: "Sin referencias de precio", desc: "No sabes si 45.000€ por tu reforma es caro o barato sin preguntar a todo el mundo." },
              { title: "Semanas para reunir 3 ofertas", desc: "Visitas, esperas, llamadas sin respuesta. El proceso consume tu tiempo." },
              { title: "Desconfianza total", desc: "Sin verificación real, no sabes si el reformista tiene licencia o seguro de responsabilidad civil." },
            ].map((p) => (
              <div key={p.title} className="bg-[#2A1E10] rounded-2xl p-6">
                <div className="w-2 h-2 bg-[#C4531A] rounded-full mb-4" />
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-[#B5A090] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="py-24 max-w-6xl mx-auto px-6">
        <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">Cómo funciona</p>
        <h2 className="text-3xl md:text-5xl font-black mb-16 max-w-2xl leading-tight">
          De cero a tres presupuestos comparables
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "01", title: "Describe tu reforma", desc: "Metros cuadrados, ciudad, tipo de reforma y calidad deseada. Dos minutos." },
            { n: "02", title: "Recibe la estimación", desc: "Rango de precio desglosado por capítulos: albañilería, fontanería, electricidad, carpintería..." },
            { n: "03", title: "Compara presupuestos reales", desc: "Tres reformistas verificados te envían presupuesto en el mismo formato. Comparables en tabla." },
          ].map((s) => (
            <div key={s.n} className="relative">
              <div className="text-[#E8DFD8] text-7xl font-black leading-none mb-4">{s.n}</div>
              <h3 className="font-bold text-xl mb-3">{s.title}</h3>
              <p className="text-[#6B5B4E] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Calculadora />

      {/* PARA REFORMISTAS */}
      <section id="reformistas" className="py-24 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C4531A] text-sm font-semibold uppercase tracking-widest mb-4">Para reformistas</p>
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Clientes que ya saben lo que vale una obra
            </h2>
            <p className="text-[#6B5B4E] text-lg mb-8 leading-relaxed">
              El cliente ya conoce el rango de precio antes de contactarte. Sin visitas perdidas.
              Sin negociaciones imposibles. Solo obras reales.
            </p>
            <ul className="space-y-4">
              {[
                "Leads cualificados con expectativa de precio realista",
                "Herramienta de presupuesto PDF profesional incluida",
                "Perfil verificado con fotos antes/después de obras",
                "Panel de gestión de leads y estado de obras",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-[#C4531A] mt-1 text-lg">✓</span>
                  <span className="text-[#3D3228]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-4">
              <a href="/reformistas" className="bg-[#1C1208] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2A1E10] transition-colors">
                Unirme como reformista →
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              { plan: "Básico", price: "49€", desc: "Ficha verificada + herramienta de presupuesto PDF" },
              { plan: "Pro", price: "99€", desc: "Posición destacada + badge verificado + leads directos", destacado: true },
              { plan: "Elite", price: "199€", desc: "Primero en tu provincia + panel de obra + analíticas" },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-2xl p-6 border ${
                  p.destacado
                    ? "border-[#C4531A] bg-[#FDF0EB]"
                    : "border-[#E8DFD8] bg-white"
                }`}
              >
                {p.destacado && (
                  <span className="text-xs bg-[#C4531A] text-white px-2 py-0.5 rounded-full font-semibold mb-3 inline-block">
                    Más elegido
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
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8DFD8] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo-rr.svg" alt="ReformaReal" width={28} height={25} />
            <span className="text-xl font-bold">
              reforma<span className="text-[#C4531A]">real</span>
            </span>
          </a>
          <p className="text-sm text-[#6B5B4E]">© 2026 ReformaReal · Madrid</p>
          <div className="flex gap-6 text-sm text-[#6B5B4E]">
            <a href="#" className="hover:text-[#1C1208] transition-colors">Privacidad</a>
            <a href="#" className="hover:text-[#1C1208] transition-colors">Términos</a>
            <a href="mailto:hola@reformareal.com" className="hover:text-[#1C1208] transition-colors">Contacto</a>
          </div>
        </div>
      </footer>

    </main>
  );
}