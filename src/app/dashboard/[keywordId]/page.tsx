import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import DashboardContainer from '@/components/DashboardContainer'
import { calculateBrandsList, slugifyKeyword } from '@/lib/utils'

interface PageProps {
  params: Promise<{ keywordId: string }>
}

export default async function BrandDashboardPage({ params }: PageProps) {
  const resolvedParams = await params
  const { keywordId } = resolvedParams

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch all tracked keywords for user
  const { data: keywords = [] } = await supabase
    .from('tracked_keywords')
    .select('id, keyword, created_at')
    .order('created_at', { ascending: false })

  // Find current brand by UUID matching or slug matching
  const currentKeyword = (keywords || []).find(
    (k) => k.id === keywordId || slugifyKeyword(k.keyword) === keywordId
  )

  if (!currentKeyword) {
    redirect('/dashboard')
  }

  // 2. Fetch lightweight mentions for Brand Switcher stats
  const { data: lightweightMentions = [] } = await supabase
    .from('mentions')
    .select('keyword_id, sentiment, ai_metadata')

  // Calculate stats for all brands for the navbar selector
  const brandsList = calculateBrandsList(keywords || [], lightweightMentions || [])

  // 3. Fetch heavy mentions ONLY for the selected brand
  const { data: brandMentions = [] } = await supabase
    .from('mentions')
    .select('id, keyword_id, title, source, snippet, url, published_at, sentiment, summary, ai_metadata, tracked_keywords(keyword)')
    .eq('keyword_id', currentKeyword.id)
    .order('published_at', { ascending: false })

  interface RawMention {
    id: string
    keyword_id: string
    title: string
    source: string
    snippet: string | null
    url: string | null
    published_at: string
    sentiment: string | null
    summary: string | null
    ai_metadata: {
      confidence: number
      category: 'Product Launch' | 'Funding' | 'Security' | 'Partnership' | 'Legal' | 'Review' | 'Competition' | 'Hiring' | 'Other'
      topics: string[]
      analysis_model: string
      analyzed_at: string
    } | null
    tracked_keywords: { keyword: string }[] | { keyword: string } | null
  }

  const rawMentions = (brandMentions as unknown) as RawMention[]
  const formattedMentions = (rawMentions || []).map((m) => {
    let tk: { keyword: string } | undefined = undefined
    if (m.tracked_keywords) {
      if (Array.isArray(m.tracked_keywords)) {
        tk = m.tracked_keywords[0]
      } else {
        tk = m.tracked_keywords
      }
    }

    return {
      id: m.id,
      keyword_id: m.keyword_id,
      title: m.title,
      source: m.source,
      snippet: m.snippet || '',
      url: m.url || '',
      published_at: m.published_at,
      sentiment: (m.sentiment || 'neutral') as 'positive' | 'neutral' | 'negative',
      summary: m.summary || '',
      ai_metadata: m.ai_metadata || undefined,
      tracked_keywords: tk,
    }
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar 
        userEmail={user.email} 
        brands={brandsList} 
        currentBrandId={currentKeyword.id} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10">
        <DashboardContainer
          initialKeywords={keywords || []}
          initialMentions={formattedMentions}
          currentBrandId={currentKeyword.id}
          brandName={currentKeyword.keyword}
        />
      </main>
    </div>
  )
}
