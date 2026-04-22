import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReformaReal — Sabe cuánto cuesta tu reforma antes de llamar a nadie",
  description: "Estimación de precio en 2 minutos. Presupuestos comparables. Reformistas verificados.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">

      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight">
          reforma<span className="text-[#C4531A]">real</span>
        </span>
        <div className="flex gap-4 items-center">
          <a href="#reformistas" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">
            Soy reformista
          </a>
          
            href="#calcular"
            className="bg-[#C4531A] text-white text-sm px-4 py-2 rounded-full hover:bg-[#A84414] transition-colors"
          >
            Calcular precio
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-block bg-[#C4531A]/10 text-[#C4531A] text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
          Madrid · Próximamente Barcelona
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
          Sabe cuánto cuesta<br />
          tu reforma{" "}
          <span className="text-[#C4531A]">antes de llamar</span><br />
          a nadie
        </h1>
        <p className="text-xl text-[#6B5B4E] max-w-2xl mx-auto mb-10 leading-relaxed">
          Estimación por capítulos en 2 minutos. Tres presupuestos comparables, en el mismo formato.
          Reformistas con licencia, seguro y obras verificadas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          
            href="#calcular"
            className="bg-[#C4531A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#A84414] transition-colors"
          >
            Calcular precio gratis →
          </a>
          
            href="#como-funciona"
            className="border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full text-lg hover:border-[#1C1208] hover:text-[#1C1208] transition-colors"
          >
            Cómo funciona
          </a>
        </div>

        {/* STATS */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { n: "2 min", label: "Estimación de precio" },
            { n: "3", label: "Presupuestos comparables" },
            { n: "100%", label: "Reformistas verificados" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-[#C4531A]">{s.n}</div>
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

      {/* CALCULADORA CTA */}
      <section id="calcular" className="bg-[#C4531A] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            ¿Cuánto cuesta tu reforma?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Introduce los datos básicos y recibe un desglose real por capítulos. Gratis, sin registrarte.
          </p>
          <div className="bg-white rounded-2xl p-8 text-left text-[#1C1208]">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  m² de la vivienda
                </label>
                <input
                  type="number"
                  placeholder="80"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  placeholder="Madrid"
                  className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Tipo de reforma
                </label>
                <select className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A] bg-white">
                  <option>Integral</option>
                  <option>Cocina</option>
                  <option>Baño</option>
                  <option>Parcial</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B5B4E] uppercase tracking-wide block mb-2">
                  Calidad
                </label>
                <select className="w-full border border-[#E8DFD8] rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-[#C4531A] bg-white">
                  <option>Media</option>
                  <option>Básica</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors">
              Ver estimación de precio →
            </button>
            <p className="text-center text-xs text-[#6B5B4E] mt-3">Sin registro · Sin spam · Resultado inmediato</p>
          </div>
        </div>
      </section>

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
              <a href="#" className="bg-[#1C1208] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2A1E10] transition-colors">
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
          <span className="text-xl font-bold">
            reforma<span className="text-[#C4531A]">real</span>
          </span>
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