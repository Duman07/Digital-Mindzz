import { redirect }    from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardClient  from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?redirect=/dashboard')

  // Cargar perfil del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Cargar órdenes con items y pagos
  const { data: orders } = await supabase
    .from('orders')
    .select(`*, items:order_items(*, service:services(*)), payments(*)`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <DashboardClient
      user={user}
      profile={profile}
      orders={orders ?? []}
    />
  )
}
