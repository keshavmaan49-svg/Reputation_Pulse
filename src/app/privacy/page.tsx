import { createClient } from '@/lib/supabase/server'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import Privacy from '@/components/marketing/Privacy'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default async function PrivacyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <MarketingNavbar userEmail={user?.email} />
      
      <Privacy />

      <MarketingFooter />
    </div>
  )
}
