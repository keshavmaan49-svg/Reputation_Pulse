import { createClient } from '@/lib/supabase/server'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import About from '@/components/marketing/About'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      {/* Atmospheric Background Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary-container/10 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]"></div>
      </div>

      <MarketingNavbar userEmail={user?.email} />
      
      <About />

      <MarketingFooter />
    </div>
  )
}
