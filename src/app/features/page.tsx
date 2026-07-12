import { createClient } from '@/lib/supabase/server'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import Features from '@/components/marketing/Features'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default async function FeaturesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <MarketingNavbar userEmail={user?.email} />
      
      <main className="flex-grow">
        <Features userEmail={user?.email} />
      </main>

      <MarketingFooter />
    </div>
  )
}
