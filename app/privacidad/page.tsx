import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Política de Privacidad | ReformaReal',
  description: 'Política de privacidad de ReformaReal. Información sobre el tratamiento de tus datos personales.',
  alternates: { canonical: 'https://reformareal.com/privacidad' },
  robots: { index: false, follow: false },
}

export default function Privacidad() {
  return (
    <main className="min-h-screen bg-[#F7F3EE] text-[#1C1208]">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={32} height={28} priority />
          <span className="text-xl font-bold">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16 prose prose-stone">
        <h1 className="text-4xl font-black mb-2">Política de Privacidad</h1>
        <p className="text-[#6B5B4E] text-sm mb-12">Última actualización: abril de 2026</p>

        <Section title="1. Responsable del tratamiento">
          <p>El responsable del tratamiento de los datos personales recogidos en este sitio web es <strong>ReformaReal</strong>, con correo electrónico de contacto <a href="mailto:reformarealsoporte@gmail.com" className="text-[#C4531A]">reformarealsoporte@gmail.com</a>.</p>
        </Section>

        <Section title="2. Datos que recogemos">
          <p>Recogemos los siguientes datos personales según el servicio utilizado:</p>
          <ul>
            <li><strong>Clientes que solicitan presupuesto:</strong> nombre, teléfono, correo electrónico, dirección del inmueble y datos de la reforma.</li>
            <li><strong>Reformistas registrados:</strong> nombre, empresa, teléfono, correo electrónico, ciudad, tipos de obra, experiencia y datos de pago (gestionados por Stripe).</li>
          </ul>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Poner en contacto a clientes con reformistas verificados de su zona.</li>
            <li>Enviar estimaciones de precio y presupuestos.</li>
            <li>Gestionar el acceso al panel de reformistas y las suscripciones.</li>
            <li>Enviarte comunicaciones relacionadas con el servicio.</li>
          </ul>
        </Section>

        <Section title="4. Base legal">
          <p>El tratamiento de tus datos se basa en:</p>
          <ul>
            <li>La ejecución del contrato o prestación del servicio solicitado.</li>
            <li>Tu consentimiento cuando nos proporcionas voluntariamente tus datos.</li>
            <li>El interés legítimo para el correcto funcionamiento del servicio.</li>
          </ul>
        </Section>

        <Section title="5. Conservación de los datos">
          <p>Conservamos tus datos mientras exista una relación activa contigo. Una vez finalizada, los eliminaremos en un plazo máximo de <strong>2 años</strong>, salvo que la ley exija un periodo diferente.</p>
        </Section>

        <Section title="6. Comunicación a terceros">
          <p>Tus datos pueden compartirse con:</p>
          <ul>
            <li><strong>Reformistas verificados</strong> de tu zona para que puedan enviarte presupuestos.</li>
            <li><strong>Stripe</strong> para la gestión de pagos (suscripciones de reformistas).</li>
            <li><strong>Supabase</strong> como proveedor de base de datos y autenticación.</li>
            <li><strong>Resend</strong> para el envío de correos transaccionales.</li>
          </ul>
          <p>No vendemos ni cedemos tus datos a terceros con fines comerciales.</p>
        </Section>

        <Section title="7. Tus derechos">
          <p>Puedes ejercer en cualquier momento los siguientes derechos escribiendo a <a href="mailto:reformarealsoporte@gmail.com" className="text-[#C4531A]">reformarealsoporte@gmail.com</a>:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento en determinadas circunstancias.</li>
          </ul>
          <p>También tienes derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong>.</p>
        </Section>

        <Section title="8. Cookies">
          <p>Este sitio usa cookies técnicas estrictamente necesarias para el funcionamiento del servicio (sesión de usuario). No usamos cookies de seguimiento ni publicidad.</p>
        </Section>

        <Section title="9. Cambios en esta política">
          <p>Podemos actualizar esta política ocasionalmente. Te notificaremos por correo si los cambios son significativos. La fecha de última actualización aparece al inicio de este documento.</p>
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
      <div className="text-[#3D3228] leading-relaxed space-y-3 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#C4531A]">
        {children}
      </div>
    </section>
  )
}
