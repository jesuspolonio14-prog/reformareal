import Image from 'next/image'
import Link from 'next/link'

export default function Gracias() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208] flex flex-col">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </Link>
      </nav>

      <section className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-black mb-3">¡Cuenta creada!</h1>
            <p className="text-[#6B5B4E] text-lg">
              Ya puedes acceder a tu panel y activar tu plan para empezar a recibir leads.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full bg-[#C4531A] text-white py-4 rounded-xl text-lg font-bold hover:bg-[#A84414] transition-colors"
          >
            Entrar a mi panel →
          </Link>

          <p className="text-xs text-[#6B5B4E]">
            ¿Tienes algún problema? Escríbenos a{' '}
            <a href="mailto:reformarealsoporte@gmail.com" className="underline hover:text-[#C4531A]">
              reformarealsoporte@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
