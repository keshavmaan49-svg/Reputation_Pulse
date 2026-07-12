import { createClient } from '@/lib/supabase/server'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import Contact from '@/components/marketing/Contact'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="radial-glow top-0 left-[-200px] pointer-events-none"></div>
      <div className="radial-glow bottom-0 right-[-200px] bg-[radial-gradient(circle,rgba(3,181,211,0.08)_0%,rgba(13,19,34,0)_70%)] pointer-events-none"></div>

      <MarketingNavbar userEmail={user?.email} />
      
      <Contact />

      <MarketingFooter />
    </div>
  )
}
