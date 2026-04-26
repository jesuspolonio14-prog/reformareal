import { redirect } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-server'
import { getSupabase } from '@/lib/supabase'
import PresupuestoCliente from './PresupuestoCliente'

export default async function PresupuestoPage({
  searchParams,
}: {
  searchParams: Promise<{ lead?: string }>
}) {
  const { lead: leadId } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  if (!leadId) redirect('/panel')

  const admin = getSupabase()

  const [{ data: lead }, { data: perfil }] = await Promise.all([
    admin.from('leads').select('*').eq('id', leadId).single(),
    admin.from('reformistas_perfiles').select('*').eq('id', user.id).single(),
  ])

  if (!lead) redirect('/panel')

  return (
    <main className="min-h-screen bg-[#F7F3EE]">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-6xl mx-auto border-b border-[#E8DFD8]">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo-rr.svg" alt="ReformaReal" width={36} height={32} priority />
          <span className="text-xl font-bold text-[#1C1208]">reforma<span className="text-[#C4531A]">real</span></span>
        </a>
        <a href="/panel" className="text-sm text-[#6B5B4E] hover:text-[#1C1208] transition-colors">← Volver al panel</a>
      </nav>
      <PresupuestoCliente lead={lead} perfil={perfil ?? { nombre: '' }} />
    </main>
  )
}
