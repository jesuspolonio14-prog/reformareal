import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208] flex flex-col">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto w-full border-b border-[#E8DFD8]">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-[160px] font-black leading-none text-[#E8DFD8] select-none">404</div>
        <h1 className="text-3xl font-black mt-2 mb-3">Página no encontrada</h1>
        <p className="text-[#6B5B4E] max-w-sm mb-10 leading-relaxed">
          Esta URL no existe o ha sido movida. Vuelve al inicio para calcular el precio de tu reforma.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="bg-[#C4531A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#A84414] transition-colors"
          >
            Volver al inicio →
          </Link>
          <Link
            href="/#calcular"
            className="border border-[#C4B8AE] text-[#6B5B4E] px-8 py-4 rounded-full hover:border-[#1C1208] hover:text-[#1C1208] transition-colors font-medium"
          >
            Calcular precio
          </Link>
        </div>
      </div>
    </main>
  )
}
