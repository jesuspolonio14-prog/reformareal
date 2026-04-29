import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solicitud recibida | ReformaReal',
  description: 'Hemos recibido tu solicitud. Recibirás hasta 3 presupuestos de reformistas verificados en breve.',
  robots: { index: false, follow: false },
}

const pasos = [
  {
    n: '01',
    titulo: 'Reformistas de tu zona reciben tu solicitud',
    desc: 'Los reformistas verificados de tu ciudad ya tienen los detalles de tu obra.',
  },
  {
    n: '02',
    titulo: 'Preparan su presupuesto',
    desc: 'Cada reformista elabora un presupuesto desglosado por capítulos en el mismo formato.',
  },
  {
    n: '03',
    titulo: 'Los comparas y eliges',
    desc: 'Recibirás hasta 3 presupuestos comparables. Tú decides con quién hablar.',
  },
]

export default function Gracias() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208] flex flex-col">
      {/* NAV */}
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto w-full border-b border-[#E8DFD8]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-16 text-center">

        {/* Icono */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
          ¡Solicitud recibida!
        </h1>
        <p className="text-lg text-[#6B5B4E] max-w-lg mb-4 leading-relaxed">
          Hemos enviado tu solicitud a los reformistas verificados de tu zona.
        </p>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-full px-5 py-2.5 mb-16">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recibirás los presupuestos en las próximas 24–48 horas
        </div>

        {/* Qué pasa ahora */}
        <div className="w-full max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6B5B4E] mb-8">¿Qué pasa ahora?</p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {pasos.map((p) => (
              <div key={p.n} className="bg-white rounded-2xl p-6 border border-[#E8DFD8]">
                <div className="text-4xl font-black text-[#E8DFD8] leading-none mb-3">{p.n}</div>
                <h3 className="font-bold mb-2 text-sm leading-snug">{p.titulo}</h3>
                <p className="text-xs text-[#6B5B4E] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="bg-[#C4531A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A84414] transition-colors"
          >
            Volver al inicio
          </Link>
          <a
            href="https://wa.me/?text=Acabo%20de%20pedir%20presupuestos%20de%20reforma%20en%20ReformaReal%20%F0%9F%94%A8%20reformareal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full hover:border-[#1C1208] hover:text-[#1C1208] transition-colors font-medium"
          >
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir en WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}
