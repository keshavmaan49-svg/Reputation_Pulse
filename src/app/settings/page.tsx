import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import KeywordManager from '@/components/KeywordManager'
import { calculateBrandsList } from '@/lib/utils'

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch tracked keywords
  const { data: keywords, error } = await supabase
    .from('tracked_keywords')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch tracked keywords:', error.message)
  }

  // Fetch lightweight mentions for calculations
  const { data: rawMentions } = await supabase
    .from('mentions')
    .select('keyword_id, sentiment, ai_metadata')
  const lightweightMentions = rawMentions || []

  const brandsList = calculateBrandsList(keywords || [], lightweightMentions)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar userEmail={user.email} brands={brandsList} />
      <KeywordManager 
        keywords={keywords || []} 
        brandsList={brandsList} 
      />
    </div>
  )
}
