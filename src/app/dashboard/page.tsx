import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { calculateBrandsList } from '@/lib/utils'
import { 
  Building2, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight,
  Plus
} from 'lucide-react'

export default async function OverviewDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Fetch tracked keywords
  const { data: keywordsData } = await supabase
    .from('tracked_keywords')
    .select('id, keyword, created_at')
    .order('created_at', { ascending: false })
  const keywords = keywordsData || []

  // 2. Fetch lightweight mentions for stats
  const { data: lightweightMentionsData } = await supabase
    .from('mentions')
    .select('keyword_id, sentiment, ai_metadata, published_at')
  const lightweightMentions = lightweightMentionsData || []

  // 3. Fetch 5 latest mentions for "Latest Activity"
  const { data: latestMentionsData } = await supabase
    .from('mentions')
    .select('id, title, source, published_at, sentiment, url, tracked_keywords(keyword)')
    .order('published_at', { ascending: false })
    .limit(5)
  const latestMentions = latestMentionsData || []

  interface RawLatestMention {
    id: string
    title: string
    source: string
    published_at: string
    sentiment: string | null
    url: string | null
    tracked_keywords: { keyword: string }[] | { keyword: string } | null
  }

  const rawLatest = (latestMentions as unknown) as RawLatestMention[]
  const formattedLatestMentions = rawLatest.map((m) => {
    let keywordText = 'Brand'
    if (m.tracked_keywords) {
      if (Array.isArray(m.tracked_keywords)) {
        if (m.tracked_keywords[0]) {
          keywordText = m.tracked_keywords[0].keyword
        }
      } else {
        keywordText = m.tracked_keywords.keyword
      }
    }
    return {
      id: m.id,
      title: m.title,
      source: m.source,
      published_at: m.published_at,
      sentiment: m.sentiment,
      url: m.url,
      keyword: keywordText,
    }
  })

  // Calculate Brand stats
  const brandsList = calculateBrandsList(keywords || [], lightweightMentions || [])

  // Calculate overall metrics
  const totalBrands = brandsList.length
  const totalMentions = lightweightMentions?.length || 0

  let totalWeightedSentiment = 0
  let totalConfidence = 0
  let positiveCount = 0
  let criticalAlertsCount = 0

  lightweightMentions?.forEach((m) => {
    let sentimentValue = 50
    if (m.sentiment === 'positive') {
      sentimentValue = 100
      positiveCount++
    } else if (m.sentiment === 'negative') {
      sentimentValue = 0
      const confidence = m.ai_metadata?.confidence ?? 75
      if (confidence >= 80) {
        criticalAlertsCount++
      }
    }

    const confidence = m.ai_metadata?.confidence ?? 75
    totalWeightedSentiment += sentimentValue * confidence
    totalConfidence += confidence
  })

  const overallReputationScore = totalConfidence > 0 
    ? Math.round(totalWeightedSentiment / totalConfidence) 
    : 50

  const overallPositiveRatio = totalMentions > 0 
    ? Math.round((positiveCount / totalMentions) * 100) 
    : 0

  // eslint-disable-next-line react-hooks/purity
  const serverTime = Date.now()

  const getBrandLastUpdated = (brandId: string) => {
    const brandMentions = lightweightMentions?.filter(m => m.keyword_id === brandId) || []
    if (brandMentions.length === 0) return 'No updates'
    const latest = brandMentions.reduce((acc, m) => {
      const time = new Date(m.published_at).getTime()
      return time > acc ? time : acc
    }, 0)
    
    if (latest === 0) return 'Never'
    
    const diffMs = serverTime - latest
    const diffMin = Math.floor(diffMs / (60 * 1000))
    const diffHr = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHr / 24)

    if (diffMin < 1) return 'Just now'
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHr < 24) return `${diffHr}h ago`
    return `${diffDay}d ago`
  }

  const getScoreColorText = (score: number) => {
    if (score > 75) return 'text-emerald-400'
    if (score < 50) return 'text-rose-450'
    return 'text-amber-400'
  }

  const getStatusColorDot = (color: 'green' | 'yellow' | 'red') => {
    if (color === 'green') return 'bg-emerald-500 shadow-emerald-500/50'
    if (color === 'red') return 'bg-rose-500 shadow-rose-500/50'
    return 'bg-amber-500 shadow-amber-500/50'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar 
        userEmail={user.email} 
        brands={brandsList} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 space-y-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Executive Overview
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              High-level aggregated brand health, mentions volume, and real-time alerts.
            </p>
          </div>
          <Link
            href="/settings"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-350 hover:to-teal-450 text-slate-950 font-bold rounded-xl text-xs transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/5 cursor-pointer self-start md:self-auto"
          >
            <Plus className="h-4 w-4" />
            Add Tracked Brand
          </Link>
        </div>

        {/* Dynamic empty state for no brands */}
        {totalBrands === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-900 rounded-3xl bg-slate-950/20 max-w-2xl mx-auto space-y-6">
            <Building2 className="h-16 w-16 mx-auto text-slate-700 animate-pulse" />
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-200">No tracked brands found</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Track a brand, competitor name, or product keyword to trigger Gemini-powered AI sentiment monitoring.
              </p>
            </div>
            <Link
              href="/settings"
              className="inline-flex px-6 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold rounded-xl text-slate-200 transition-all cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <>
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Overall Reputation Score */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 p-6 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Reputation Score</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black ${getScoreColorText(overallReputationScore)}`}>
                    {overallReputationScore}%
                  </span>
                  <Award className="h-4 w-4 text-slate-650" />
                </div>
              </div>

              {/* Total Brands */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 p-6 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/5 rounded-full blur-2xl" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Brands</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-100">{totalBrands}</span>
                  <Building2 className="h-4 w-4 text-slate-600" />
                </div>
              </div>

              {/* Total Mentions */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 p-6 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Mentions</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-slate-100">{totalMentions}</span>
                  <MessageSquare className="h-4 w-4 text-slate-600" />
                </div>
              </div>

              {/* Positive Ratio */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 p-6 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Positive Ratio</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black text-emerald-400">{overallPositiveRatio}%</span>
                  <TrendingUp className="h-4 w-4 text-slate-600" />
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850 p-6 rounded-2xl space-y-2 shadow-xl relative overflow-hidden group col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Critical Alerts</span>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-3xl font-black ${criticalAlertsCount > 0 ? 'text-rose-450' : 'text-slate-400'}`}>
                    {criticalAlertsCount}
                  </span>
                  <ShieldAlert className={`h-4 w-4 ${criticalAlertsCount > 0 ? 'text-rose-550 animate-bounce' : 'text-slate-600'}`} />
                </div>
              </div>
            </div>

            {/* Layout Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Brands Cards List */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  Tracked Brands
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {brandsList.map((brand) => (
                    <div 
                      key={brand.id}
                      className="bg-slate-900/40 backdrop-blur-xl border border-slate-850/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700/60 transition-all flex flex-col justify-between h-[230px]"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="space-y-4">
                        {/* Name and color indicator */}
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-200 truncate pr-4">{brand.keyword}</h3>
                          <span className={`w-3.5 h-3.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.1)] shrink-0 ${getStatusColorDot(brand.statusColor)}`} />
                        </div>

                        {/* Reputation value & statistics */}
                        <div className="grid grid-cols-3 gap-2 border-y border-slate-900/60 py-3 text-xs">
                          <div>
                            <span className="text-[9px] text-slate-550 block uppercase tracking-wider font-semibold">Reputation</span>
                            <span className={`text-base font-black ${getScoreColorText(brand.reputationScore)}`}>
                              {brand.reputationScore}%
                            </span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-555 block uppercase tracking-wider font-semibold">Mentions</span>
                            <span className="text-base font-black text-slate-200">{brand.mentionCount}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-550 block uppercase tracking-wider font-semibold">Positive</span>
                            <span className="text-base font-black text-emerald-400">{brand.positiveRatio}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between text-xs pt-3 mt-auto border-t border-slate-900/40">
                        <span className="text-slate-500">Updated {getBrandLastUpdated(brand.id)}</span>
                        <Link
                          href={`/dashboard/${brand.slug}`}
                          className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-350 hover:underline transition-all cursor-pointer"
                        >
                          Open Dashboard
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Activity Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Latest Activity
                </h2>

                <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-850/80 rounded-2xl p-6 shadow-xl space-y-4 max-h-[500px] overflow-y-auto pr-2 divide-y divide-slate-900/40">
                  {formattedLatestMentions.length === 0 ? (
                    <div className="text-center py-10 text-slate-600 text-xs">
                      No recent activity recorded.
                    </div>
                  ) : (
                    formattedLatestMentions.map((mention, index) => (
                      <div key={mention.id} className={`space-y-2 text-xs ${index > 0 ? 'pt-4' : ''}`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2 py-0.5 bg-slate-950 border border-slate-850/80 rounded font-semibold text-[10px] text-slate-400 max-w-[120px] truncate">
                            {mention.keyword}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(mention.published_at).toLocaleDateString(undefined, { dateStyle: 'short' })}
                          </span>
                        </div>
                        <h4 className="font-semibold text-slate-350 line-clamp-2 leading-relaxed">
                          {mention.title}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] pt-1">
                          <span className="text-slate-500 font-semibold">{mention.source}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border uppercase ${
                            mention.sentiment === 'positive'
                              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                              : mention.sentiment === 'negative'
                              ? 'bg-rose-500/10 border-rose-500/25 text-rose-450'
                              : 'bg-slate-850 border-slate-800 text-slate-400'
                          }`}>
                            {mention.sentiment || 'neutral'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
