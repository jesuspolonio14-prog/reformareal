import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | ReformaReal',
  description: 'Términos y condiciones de uso de ReformaReal.',
  alternates: { canonical: 'https://reformareal.com/terminos' },
  robots: { index: false, follow: false },
}

export default function Terminos() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-2">Términos y Condiciones</h1>
        <p className="text-[#6B5B4E] text-sm mb-12">Última actualización: abril de 2026</p>

        <Section title="1. Descripción del servicio">
          <p>ReformaReal es una plataforma online que conecta a particulares que necesitan presupuestos de reforma con profesionales del sector (reformistas). El servicio permite obtener una estimación orientativa del precio de una reforma y recibir presupuestos de reformistas verificados.</p>
        </Section>

        <Section title="2. Usuarios y registro">
          <p><strong>Clientes:</strong> Pueden usar la calculadora y solicitar presupuestos sin registro. Al enviar su solicitud, aceptan que sus datos de contacto sean compartidos con reformistas de su zona.</p>
          <p><strong>Reformistas:</strong> Deben registrarse y suscribirse a uno de los planes disponibles para acceder al panel y recibir leads. Al registrarse, garantizan que la información proporcionada (licencias, seguro RC, experiencia) es veraz.</p>
        </Section>

        <Section title="3. Estimaciones de precio">
          <p>Las estimaciones de precio generadas por la calculadora son <strong>orientativas</strong> y se basan en precios medios de mercado. No constituyen un presupuesto firme ni un compromiso de precio. El precio definitivo de cualquier obra se fijará en el presupuesto acordado entre el cliente y el reformista tras la visita al inmueble.</p>
        </Section>

        <Section title="4. Suscripciones y pagos (reformistas)">
          <p>Los planes de suscripción para reformistas se facturan mensualmente a través de <strong>Stripe</strong>. El primer mes es gratuito (periodo de prueba de 30 días). A partir del segundo mes se aplica el precio del plan elegido.</p>
          <p>El reformista puede cancelar su suscripción en cualquier momento desde el panel. La cancelación no genera reembolso del periodo en curso.</p>
          <p>ReformaReal se reserva el derecho a modificar los precios de los planes con un preaviso mínimo de 30 días por correo electrónico.</p>
        </Section>

        <Section title="5. Obligaciones de los reformistas">
          <p>Los reformistas registrados se comprometen a:</p>
          <ul>
            <li>Proporcionar información veraz sobre su empresa, experiencia y credenciales.</li>
            <li>Responder a los leads recibidos en un plazo razonable.</li>
            <li>Tratar los datos de los clientes con confidencialidad y conforme al RGPD.</li>
            <li>No contactar a los clientes fuera del marco del servicio para eludir la plataforma.</li>
          </ul>
        </Section>

        <Section title="6. Limitación de responsabilidad">
          <p>ReformaReal actúa como intermediario entre clientes y reformistas. No es parte del contrato de obra que pueda firmarse entre ambos y no asume responsabilidad por:</p>
          <ul>
            <li>La calidad o resultado final de ninguna reforma.</li>
            <li>Incumplimientos contractuales entre clientes y reformistas.</li>
            <li>La exactitud de las estimaciones de precio generadas.</li>
          </ul>
        </Section>

        <Section title="7. Propiedad intelectual">
          <p>Todos los contenidos de este sitio web (textos, diseño, código, logotipos) son propiedad de ReformaReal y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.</p>
        </Section>

        <Section title="8. Modificaciones">
          <p>ReformaReal puede modificar estos términos en cualquier momento. Los cambios se comunicarán por correo electrónico a los usuarios registrados con al menos 15 días de antelación. El uso continuado del servicio tras esa fecha implica la aceptación de los nuevos términos.</p>
        </Section>

        <Section title="9. Ley aplicable">
          <p>Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales de Madrid.</p>
        </Section>

        <Section title="10. Contacto">
          <p>Para cualquier consulta sobre estos términos escríbenos a <a href="mailto:reformarealsoporte@gmail.com">reformarealsoporte@gmail.com</a>.</p>
        </Section>

        <div className="mt-12 pt-8 border-t border-[#E8DFD8]">
          <a href="/" className="text-[#C4531A] hover:underline text-sm">← Volver al inicio</a>
        </div>
      </article>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-black mb-3 text-[#1C1208]">{title}</h2>
      <div className="text-[#3D3228] leading-relaxed space-y-3 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#C4531A] [&_a]:hover:underline">
        {children}
      </div>
    </section>
  )
}
