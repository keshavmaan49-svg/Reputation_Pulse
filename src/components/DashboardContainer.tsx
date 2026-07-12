'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  Search,
  RefreshCw,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
  Calendar,
  Filter,
  ShieldAlert,
  Award,
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Link from 'next/link'

interface TrackedKeyword {
  id: string
  keyword: string
}

interface Mention {
  id: string
  keyword_id: string
  title: string
  source: string
  snippet: string
  url: string
  published_at: string
  sentiment: 'positive' | 'neutral' | 'negative'
  summary: string
  ai_metadata?: {
    confidence: number
    category: 'Product Launch' | 'Funding' | 'Security' | 'Partnership' | 'Legal' | 'Review' | 'Competition' | 'Hiring' | 'Other'
    topics: string[]
    analysis_model: string
    analyzed_at: string
  }
  tracked_keywords?: {
    keyword: string
  }
}

interface DashboardContainerProps {
  initialKeywords: TrackedKeyword[]
  initialMentions: Mention[]
  currentBrandId?: string
  brandName?: string
}

export default function DashboardContainer({
  initialKeywords,
  initialMentions,
  currentBrandId = 'all',
  brandName,
}: DashboardContainerProps) {
  const [mounted, setMounted] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshError, setRefreshError] = useState<string | null>(null)

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all')
  const [keywordFilter, setKeywordFilter] = useState<string>(currentBrandId)
  const [dateFilter, setDateFilter] = useState<'all' | '24h' | '7d' | '30d'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [confidenceFilter, setConfidenceFilter] = useState<number>(0)
  const [isFiltersExpanded, setIsFiltersExpanded] = useState<boolean>(false)

  // Line Chart Selected Keyword
  const [chartKeywordId, setChartKeywordId] = useState<string>('all')

  // Selected Mention for Drawer
  const [selectedMention, setSelectedMention] = useState<Mention | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMention(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Trigger API Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    setRefreshError(null)
    try {
      const res = await fetch('/api/mentions/fetch', { method: 'POST' })
      const data = await res.json()
      if (data.error) {
        setRefreshError(data.error)
      } else {
        // Refresh the Server Component page data
        window.location.reload()
      }
    } catch {
      setRefreshError('Network error refreshing mentions. Please check your connection.')
    } finally {
      setIsRefreshing(false)
    }
  }

  // For Date filtering, keep a stable rendering timestamp to keep filtering pure
  const [referenceTime, setReferenceTime] = useState<number>(0)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReferenceTime(Date.now())
  }, [dateFilter])

  // Unique Categories dynamically populated from live mentions
  const uniqueCategories = useMemo(() => {
    const cats = new Set<string>()
    initialMentions.forEach((m) => {
      const cat = m.ai_metadata?.category
      if (cat) cats.add(cat)
    })
    return Array.from(cats).sort()
  }, [initialMentions])

  // Unique Sources dynamically populated from live mentions
  const uniqueSources = useMemo(() => {
    const src = new Set<string>()
    initialMentions.forEach((m) => {
      if (m.source) src.add(m.source)
    })
    return Array.from(src).sort()
  }, [initialMentions])

  // Filter Mentions
  const filteredMentions = useMemo(() => {
    return initialMentions.filter((mention) => {
      // 1. Search Query filter (matches title, source, snippet, summary, and topics)
      const query = searchQuery.toLowerCase().trim()
      if (query) {
        const matchesTitle = mention.title.toLowerCase().includes(query)
        const matchesSnippet = mention.snippet?.toLowerCase().includes(query)
        const matchesSource = mention.source.toLowerCase().includes(query)
        const matchesSummary = mention.summary?.toLowerCase().includes(query)
        
        // Topics match
        const topics = mention.ai_metadata?.topics || []
        const matchesTopics = topics.some(t => t.toLowerCase().includes(query))

        if (!matchesTitle && !matchesSnippet && !matchesSource && !matchesSummary && !matchesTopics) {
          return false
        }
      }

      // 2. Sentiment filter
      if (sentimentFilter !== 'all' && mention.sentiment !== sentimentFilter) {
        return false
      }

      // 3. Keyword filter
      if (keywordFilter !== 'all' && mention.keyword_id !== keywordFilter) {
        return false
      }

      // 4. Date filter
      if (dateFilter !== 'all' && referenceTime > 0) {
        const publishedDate = new Date(mention.published_at).getTime()
        const diffMs = referenceTime - publishedDate
        if (dateFilter === '24h' && diffMs > 24 * 60 * 60 * 1000) return false
        if (dateFilter === '7d' && diffMs > 7 * 24 * 60 * 60 * 1000) return false
        if (dateFilter === '30d' && diffMs > 30 * 24 * 60 * 60 * 1000) return false
      }

      // 5. Category filter
      if (categoryFilter !== 'all') {
        const cat = mention.ai_metadata?.category || 'Other'
        if (cat !== categoryFilter) return false
      }

      // 6. Source filter
      if (sourceFilter !== 'all' && mention.source !== sourceFilter) {
        return false
      }

      // 7. Confidence filter
      const confidence = mention.ai_metadata?.confidence ?? 75 // Heuristic default
      if (confidence < confidenceFilter) {
        return false
      }

      return true
    })
  }, [
    initialMentions,
    searchQuery,
    sentimentFilter,
    keywordFilter,
    dateFilter,
    categoryFilter,
    sourceFilter,
    confidenceFilter,
    referenceTime,
  ])

  // Active Filter Chips
  const activeChips = useMemo(() => {
    const chips = []
    if (searchQuery) {
      chips.push({ id: 'search', label: `Search: "${searchQuery}"`, reset: () => setSearchQuery('') })
    }
    if (keywordFilter !== 'all') {
      const kw = initialKeywords.find(k => k.id === keywordFilter)?.keyword || 'Keyword'
      chips.push({ id: 'keyword', label: `Keyword: ${kw}`, reset: () => setKeywordFilter('all') })
    }
    if (sentimentFilter !== 'all') {
      chips.push({ id: 'sentiment', label: `Sentiment: ${sentimentFilter.toUpperCase()}`, reset: () => setSentimentFilter('all') })
    }
    if (dateFilter !== 'all') {
      chips.push({ id: 'date', label: dateFilter === '24h' ? 'Last 24h' : dateFilter === '7d' ? 'Last 7d' : 'Last 30d', reset: () => setDateFilter('all') })
    }
    if (categoryFilter !== 'all') {
      chips.push({ id: 'category', label: `Category: ${categoryFilter}`, reset: () => setCategoryFilter('all') })
    }
    if (sourceFilter !== 'all') {
      chips.push({ id: 'source', label: `Source: ${sourceFilter}`, reset: () => setSourceFilter('all') })
    }
    if (confidenceFilter > 0) {
      chips.push({ id: 'confidence', label: `Confidence: ${confidenceFilter}%+`, reset: () => setConfidenceFilter(0) })
    }
    return chips
  }, [searchQuery, keywordFilter, sentimentFilter, dateFilter, categoryFilter, sourceFilter, confidenceFilter, initialKeywords])

  const handleClearAllFilters = () => {
    setSearchQuery('')
    setKeywordFilter('all')
    setSentimentFilter('all')
    setDateFilter('all')
    setCategoryFilter('all')
    setSourceFilter('all')
    setConfidenceFilter(0)
  }

  // Metrics Calculations
  const metrics = useMemo(() => {
    const total = filteredMentions.length
    if (total === 0) {
      return { total: 0, positivePct: 0, neutralPct: 0, negativePct: 0, healthScore: 0 }
    }

    const pos = filteredMentions.filter((m) => m.sentiment === 'positive').length
    const neu = filteredMentions.filter((m) => m.sentiment === 'neutral').length
    const neg = filteredMentions.filter((m) => m.sentiment === 'negative').length

    const positivePct = Math.round((pos / total) * 100)
    const neutralPct = Math.round((neu / total) * 100)
    const negativePct = Math.round((neg / total) * 100)

    // Health Score formula: positive mentions contribute 100%, neutral 50%, negative 0%
    const healthScore = Math.round(((pos + neu * 0.5) / total) * 100)

    return { total, positivePct, neutralPct, negativePct, healthScore }
  }, [filteredMentions])

  // Reputation Score (0–100) calculated from weighted sentiment and confidence
  const reputationScore = useMemo(() => {
    let totalWeightedSentiment = 0
    let totalConfidence = 0
    filteredMentions.forEach((m) => {
      let sentimentValue = 50 // neutral fallback
      if (m.sentiment === 'positive') sentimentValue = 100
      else if (m.sentiment === 'negative') sentimentValue = 0

      const confidence = m.ai_metadata?.confidence ?? 75
      totalWeightedSentiment += sentimentValue * confidence
      totalConfidence += confidence
    })
    return totalConfidence > 0 ? Math.round(totalWeightedSentiment / totalConfidence) : 50
  }, [filteredMentions])

  // AI Executive Summary
  const aiSummary = useMemo(() => {
    if (filteredMentions.length === 0) {
      return 'No data available to analyze. Please add keywords or refresh mentions to pull brand news.'
    }

    const posCount = filteredMentions.filter(m => m.sentiment === 'positive').length
    const negCount = filteredMentions.filter(m => m.sentiment === 'negative').length
    const neuCount = filteredMentions.filter(m => m.sentiment === 'neutral').length
    
    // Calculate top categories
    const categories: Record<string, { pos: number; neg: number; total: number }> = {}
    filteredMentions.forEach(m => {
      const cat = m.ai_metadata?.category || 'Other'
      if (!categories[cat]) {
        categories[cat] = { pos: 0, neg: 0, total: 0 }
      }
      categories[cat].total++
      if (m.sentiment === 'positive') categories[cat].pos++
      if (m.sentiment === 'negative') categories[cat].neg++
    })

    const sortedCategories = Object.entries(categories).sort((a, b) => b[1].total - a[1].total)
    const topCategory = sortedCategories[0]?.[0] || 'Other'
    
    // Calculate top topics
    const topicCounts: Record<string, number> = {}
    filteredMentions.forEach(m => {
      const topics = m.ai_metadata?.topics || []
      topics.forEach(t => {
        topicCounts[t] = (topicCounts[t] || 0) + 1
      })
    })
    
    const sortedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0])

    // Determine overall sentiment trend
    let tone = 'neutral'
    if (posCount > negCount && posCount > neuCount) tone = 'predominantly positive'
    else if (negCount > posCount && negCount > neuCount) tone = 'predominantly negative'
    else if (posCount > 0 || negCount > 0) tone = 'mixed'

    let summaryText = `Brand perception is currently **${tone}** with a calculated Reputation Score of **${reputationScore}%** across **${filteredMentions.length}** analyzed mentions. `
    
    if (sortedTopics.length > 0) {
      summaryText += `Conversations are heavily focused on topics like **${sortedTopics.join(', ')}**, with most coverage falling under the **${topCategory}** category. `
    }

    // Highlight positive drivers
    const positiveDrivers = Object.entries(categories)
      .filter(([, stats]) => stats.pos > 0)
      .sort((a, b) => b[1].pos - a[1].pos)
      .map(entry => entry[0])

    if (positiveDrivers.length > 0) {
      summaryText += `Positive sentiment is primarily driven by updates in **${positiveDrivers.slice(0, 2).join(' and ')}**. `
    }

    // Highlight critical alerts
    const criticalAlerts = filteredMentions.filter(m => m.sentiment === 'negative' && (m.ai_metadata?.confidence ?? 75) >= 80)
    if (criticalAlerts.length > 0) {
      summaryText += `**Attention Required:** There are **${criticalAlerts.length}** high-confidence negative alerts, particularly in the **${criticalAlerts[0].ai_metadata?.category || 'Other'}** space (e.g., "${criticalAlerts[0].title}"), which require immediate reputation management or PR response.`
    } else if (negCount > 0) {
      summaryText += `A few negative mentions exist, but they lack high-confidence urgency at this time.`
    }

    return summaryText
  }, [filteredMentions, reputationScore])

  // Trending Topics
  const trendingTopics = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredMentions.forEach(m => {
      const topics = m.ai_metadata?.topics || []
      topics.forEach(t => {
        counts[t] = (counts[t] || 0) + 1
      })
    })
    
    const total = filteredMentions.length
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic, count]) => ({
        topic,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
  }, [filteredMentions])

  // Top Sources
  const topSources = useMemo(() => {
    const counts: Record<string, number> = {}
    filteredMentions.forEach(m => {
      counts[m.source] = (counts[m.source] || 0) + 1
    })
    
    const total = filteredMentions.length
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([source, count]) => ({
        source,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }))
  }, [filteredMentions])

  // Category Sentiment Breakdown Grid
  const categoryBreakdown = useMemo(() => {
    const cats: Record<string, { pos: number; neg: number; neu: number; total: number }> = {}
    filteredMentions.forEach(m => {
      const cat = m.ai_metadata?.category || 'Other'
      if (!cats[cat]) {
        cats[cat] = { pos: 0, neg: 0, neu: 0, total: 0 }
      }
      cats[cat].total++
      if (m.sentiment === 'positive') cats[cat].pos++
      if (m.sentiment === 'negative') cats[cat].neg++
      if (m.sentiment === 'neutral') cats[cat].neu++
    })
    return Object.entries(cats).sort((a, b) => b[1].total - a[1].total)
  }, [filteredMentions])

  // Recent Alerts: highly negative or high-confidence negative mentions
  const recentAlerts = useMemo(() => {
    return filteredMentions
      .filter(m => m.sentiment === 'negative')
      .sort((a, b) => (b.ai_metadata?.confidence ?? 75) - (a.ai_metadata?.confidence ?? 75))
      .slice(0, 3)
  }, [filteredMentions])


  // Donut Chart Data
  const donutData = useMemo(() => {
    const pos = filteredMentions.filter((m) => m.sentiment === 'positive').length
    const neu = filteredMentions.filter((m) => m.sentiment === 'neutral').length
    const neg = filteredMentions.filter((m) => m.sentiment === 'negative').length

    return [
      { name: 'Positive', value: pos, color: '#10b981' }, // Emerald
      { name: 'Neutral', value: neu, color: '#64748b' },  // Slate
      { name: 'Negative', value: neg, color: '#f43f5e' },  // Rose
    ].filter((item) => item.value > 0)
  }, [filteredMentions])

  // Trend Chart Data (grouped by date)
  const trendData = useMemo(() => {
    // Filter mentions by the selected line chart keyword
    const chartMentions = initialMentions.filter((m) => {
      if (chartKeywordId !== 'all' && m.keyword_id !== chartKeywordId) return false
      return true
    })

    // Group mentions by date (YYYY-MM-DD)
    const groups: { [key: string]: { positive: number; neutral: number; negative: number } } = {}

    // Initialize past 7 days to ensure chart has continuous dates
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      groups[dateStr] = { positive: 0, neutral: 0, negative: 0 }
    }

    chartMentions.forEach((m) => {
      const dateStr = m.published_at.split('T')[0]
      if (groups[dateStr]) {
        groups[dateStr][m.sentiment]++
      } else {
        // Fallback for dates older than 7 days if they exist in mentions
        groups[dateStr] = { positive: 0, neutral: 0, negative: 0 }
        groups[dateStr][m.sentiment]++
      }
    })

    // Format for Recharts
    return Object.entries(groups)
      .map(([date, counts]) => {
        // Format date string for displaying (e.g. "Jul 12")
        const parsedDate = new Date(date)
        const displayDate = parsedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })
        return {
          date: displayDate,
          rawDate: date,
          Positive: counts.positive,
          Neutral: counts.neutral,
          Negative: counts.negative,
        }
      })
      .sort((a, b) => a.rawDate.localeCompare(b.rawDate))
  }, [initialMentions, chartKeywordId])

  return (
    <div className="space-y-8">
      {refreshError && (
        <div className="bg-red-950/40 border border-red-500/30 text-red-200 p-4 rounded-xl text-sm flex items-center justify-between">
          <span>{refreshError}</span>
          <button onClick={() => setRefreshError(null)} className="text-red-400 hover:text-red-300 text-xs font-bold px-2 py-1">Dismiss</button>
        </div>
      )}

      {/* Overview Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            {brandName ? `${brandName} Executive Dashboard` : 'Dashboard'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {brandName 
              ? 'Real-time brand perception, category sentiment drivers, and topic analysis.' 
              : 'Real-time brand perception metrics and aggregated web media feeds.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || initialKeywords.length === 0}
            className="inline-flex items-center gap-2 px-5 py-3 border border-slate-800 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-sm font-semibold text-slate-200 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Scanning Web...' : 'Refresh Mentions'}
          </button>

          <Link
            href="/settings"
            className="inline-flex items-center gap-1.5 px-5 py-3 border border-transparent font-semibold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-350 hover:to-teal-450 hover:shadow-lg hover:shadow-emerald-500/10 text-sm transition-all"
          >
            {brandName ? 'Manage Brands' : 'Manage Keywords'}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {initialKeywords.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl max-w-2xl mx-auto animate-fade-in">
          <Layers className="h-12 w-12 mx-auto text-slate-700 mb-4" />
          <h3 className="text-lg font-bold text-slate-200">No Tracked Brands</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">
            You need to track a brand before we can gather online sentiment insights.
          </p>
          <Link
            href="/settings"
            className="inline-flex items-center gap-1.5 mt-6 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-350 hover:to-teal-450 transition-all"
          >
            Add Your First Brand
            <Plus className="h-4 w-4" />
          </Link>
        </div>
      ) : initialMentions.length === 0 ? (
        <div className="text-center py-20 border border-slate-900 bg-slate-900/10 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-xl backdrop-blur-xl animate-fade-in">
          <MessageSquare className="h-16 w-16 mx-auto text-slate-700 animate-pulse" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-200">No mentions collected yet</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              We haven&apos;t gathered any news mentions for this brand yet. Pull the latest GNews articles to run LLM analysis.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-5 py-3 border border-slate-800 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-sm font-semibold text-slate-200 hover:text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Scanning GNews...' : 'Refresh Mentions'}
            </button>
            <Link
              href="/settings"
              className="inline-flex items-center gap-1.5 px-5 py-3 border border-transparent font-semibold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-450 to-teal-550 hover:from-emerald-350 hover:to-teal-450 hover:shadow-lg text-sm transition-all"
            >
              Manage Brands
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in space-y-8">
          {/* Executive Intelligence Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reputation score Circular Gauge */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-24 w-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl group-hover:from-emerald-500/10 transition-all duration-500" />
              
              <div className="relative flex items-center justify-center shrink-0">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="45" className="stroke-slate-800/60 fill-none stroke-[8]" />
                  <circle 
                    cx="56" 
                    cy="56" 
                    r="45" 
                    className={`fill-none stroke-[8] transition-all duration-1000 ease-out ${
                      reputationScore >= 75 ? 'stroke-emerald-400' : reputationScore >= 50 ? 'stroke-amber-400' : 'stroke-rose-500'
                    }`}
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 - (reputationScore / 100) * (2 * Math.PI * 45)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-100">{reputationScore}%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Reputation</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Award className={`h-4 w-4 ${reputationScore >= 75 ? 'text-emerald-400 animate-pulse' : reputationScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`} />
                  Reputation Index
                </div>
                <p className="text-[10px] text-slate-500">
                  Weighted sentiment & confidence
                </p>
              </div>
            </div>

            {/* AI Executive Summary Card */}
            <div className="md:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-500" />
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 mt-0.5 shrink-0">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="font-bold text-slate-200 text-base flex items-center gap-2">
                    AI Executive Summary
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed pr-2">
                    {aiSummary.split('**').map((part, index) => {
                      if (index % 2 === 1) {
                        return <strong key={index} className="text-emerald-400 font-semibold">{part}</strong>
                      }
                      return part
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Core KPI Side Panel */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Volume</span>
                  <div className="text-xl font-extrabold text-slate-200">{metrics.total}</div>
                </div>
                <MessageSquare className="h-5 w-5 text-indigo-400" />
              </div>
              
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Positive Ratio</span>
                  <div className="text-xl font-extrabold text-emerald-400">{metrics.positivePct}%</div>
                </div>
                <Sparkles className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tracked Keywords</span>
                  <div className="text-xl font-extrabold text-teal-400">{initialKeywords.length}</div>
                </div>
                <Layers className="h-5 w-5 text-teal-400" />
              </div>
            </div>
          </div>

          {/* Recent Alerts (Pulsing and conditional) */}
          {recentAlerts.length > 0 && (
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-rose-500 animate-pulse" />
                Critical Reputation Alerts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentAlerts.map((m) => (
                  <div key={m.id} className="bg-rose-950/10 border border-rose-500/20 rounded-xl p-4 space-y-2 hover:border-rose-500/40 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all duration-500" />
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/25 text-rose-400 font-bold uppercase tracking-wider">Alert</span>
                      <span className="text-slate-500 font-semibold">{m.source}</span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-200 line-clamp-1 group-hover:text-rose-400 transition-colors">{m.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{m.snippet}</p>
                    <div className="pt-2 flex items-center justify-between text-[9px] text-slate-500 border-t border-slate-800/60">
                      <span>Confidence: <span className="font-semibold text-rose-400">{(m.ai_metadata?.confidence ?? 75)}%</span></span>
                      <span>Category: <span className="font-semibold text-slate-400">{m.ai_metadata?.category ?? 'Other'}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Topics & Top Sources Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trending Topics Widget */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <h3 className="font-bold text-slate-200 text-base">Trending Topics</h3>
                <p className="text-xs text-slate-500">Aggregated conversation topics from brand mentions.</p>
              </div>
              <div className="space-y-3.5">
                {trendingTopics.length === 0 ? (
                  <div className="text-xs text-slate-500 text-center py-6">No topics parsed yet.</div>
                ) : (
                  trendingTopics.map((item) => (
                    <div key={item.topic} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {item.topic}
                        </span>
                        <span className="text-slate-400 text-[10px]">{item.count} {item.count === 1 ? 'mention' : 'mentions'} ({item.percentage}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top Sources Widget */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div>
                <h3 className="font-bold text-slate-200 text-base">Top Media Sources</h3>
                <p className="text-xs text-slate-500">Outlets and platforms generating the most coverage.</p>
              </div>
              <div className="space-y-3.5">
                {topSources.length === 0 ? (
                  <div className="text-xs text-slate-500 text-center py-6">No sources identified yet.</div>
                ) : (
                  topSources.map((item) => (
                    <div key={item.source} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          {item.source}
                        </span>
                        <span className="text-slate-400 text-[10px]">{item.count} {item.count === 1 ? 'mention' : 'mentions'} ({item.percentage}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                        <div className="bg-indigo-400 h-full rounded-full transition-all duration-1000" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Positive vs Negative Category Sentiment Breakdown */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-slate-200 text-base">Category Sentiment Breakdown</h3>
              <p className="text-xs text-slate-500">Distribution of brand perception by article category.</p>
            </div>
            {categoryBreakdown.length === 0 ? (
              <div className="text-xs text-slate-500 text-center py-6">No categories mapped yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryBreakdown.map(([cat, counts]) => (
                  <div key={cat} className="bg-slate-950/30 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 text-sm">{cat}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">{counts.total} {counts.total === 1 ? 'mention' : 'mentions'}</span>
                    </div>
                    
                    {/* Mini bar showing positive vs negative vs neutral ratio */}
                    <div className="mt-3.5 h-1.5 w-full bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full rounded-l-full" style={{ width: `${(counts.pos / counts.total) * 100}%` }} />
                      <div className="bg-slate-500 h-full" style={{ width: `${(counts.neu / counts.total) * 100}%` }} />
                      <div className="bg-rose-500 h-full rounded-r-full" style={{ width: `${(counts.neg / counts.total) * 100}%` }} />
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span className="text-emerald-400">{counts.pos} Pos</span>
                      <span className="text-slate-500">{counts.neu} Neu</span>
                      <span className="text-rose-400">{counts.neg} Neg</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sentiment Over Time Line Chart */}
            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-100">Sentiment Trend</h2>
                  <p className="text-xs text-slate-500">Track positive/negative mentions count over the last 7 days.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Keyword:</span>
                  <select
                    value={chartKeywordId}
                    onChange={(e) => setChartKeywordId(e.target.value)}
                    className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Keywords</option>
                    {initialKeywords.map((kw) => (
                      <option key={kw.id} value={kw.id}>{kw.keyword}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 w-full min-h-0">
                {!mounted ? (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                    Loading trend chart...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ left: -20, right: 10, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#1e293b',
                          borderRadius: '8px',
                          color: '#f8fafc',
                        }}
                      />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                      <Line type="monotone" dataKey="Positive" stroke="#10b981" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="Neutral" stroke="#64748b" strokeWidth={1.5} dot={false} />
                      <Line type="monotone" dataKey="Negative" stroke="#f43f5e" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Sentiment Breakdown Donut Chart */}
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col h-[400px]">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Sentiment Breakdown</h2>
                <p className="text-xs text-slate-500">Distribution of mention categories under current filters.</p>
              </div>

              <div className="flex-1 w-full min-h-0 flex items-center justify-center relative">
                {!mounted ? (
                  <div className="text-slate-500 text-xs">Loading breakdown chart...</div>
                ) : donutData.length === 0 ? (
                  <div className="text-slate-500 text-xs">No mentions under filters</div>
                ) : (
                  <>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={donutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {donutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: '#1e293b',
                            borderRadius: '8px',
                            color: '#f8fafc',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Overlay inside donut hole */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Total</span>
                      <span className="text-2xl font-black text-slate-100">{filteredMentions.length}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Legends list */}
              <div className="mt-4 flex justify-around gap-2 text-xs border-t border-slate-800/60 pt-4 shrink-0">
                {donutData.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-400">{d.name}</span>
                    <span className="font-semibold text-slate-200">({d.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentions Feed Filter Bar & Feed List */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60 pb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-emerald-400" />
                  Mentions Feed
                </h2>
                <p className="text-xs text-slate-550 mt-0.5">
                  Showing {filteredMentions.length} of {initialMentions.length} records matched.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative w-full md:w-80 shrink-0">
                  <label htmlFor="search-filter-input" className="sr-only">Search</label>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <input
                    id="search-filter-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search title, summary, source, topic..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl placeholder-slate-600 text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Collapsible Trigger */}
                <button
                  aria-expanded={isFiltersExpanded}
                  aria-controls="advanced-filters-panel"
                  onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl text-xs font-semibold text-slate-300 transition-all cursor-pointer w-full md:w-auto"
                >
                  <Filter className="h-3.5 w-3.5 text-emerald-400" />
                  Filter Options
                  {isFiltersExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Collapsible Advanced Filters Panel */}
            {isFiltersExpanded && (
              <div 
                id="advanced-filters-panel"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs pt-4 border-b border-slate-800/40 pb-6"
              >

                {/* Sentiment filter */}
                <div className="space-y-1.5">
                  <label htmlFor="sentiment-filter-select" className="text-slate-500 font-semibold uppercase tracking-wider block text-[10px]">Sentiment</label>
                  <select
                    id="sentiment-filter-select"
                    value={sentimentFilter}
                    onChange={(e) => setSentimentFilter(e.target.value as 'all' | 'positive' | 'neutral' | 'negative')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Sentiments</option>
                    <option value="positive">Positive</option>
                    <option value="neutral">Neutral</option>
                    <option value="negative">Negative</option>
                  </select>
                </div>

                {/* Category filter */}
                <div className="space-y-1.5">
                  <label htmlFor="category-filter-select" className="text-slate-500 font-semibold uppercase tracking-wider block text-[10px]">Category</label>
                  <select
                    id="category-filter-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Source filter */}
                <div className="space-y-1.5">
                  <label htmlFor="source-filter-select" className="text-slate-500 font-semibold uppercase tracking-wider block text-[10px]">Source</label>
                  <select
                    id="source-filter-select"
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Sources</option>
                    {uniqueSources.map((src) => (
                      <option key={src} value={src}>{src}</option>
                    ))}
                  </select>
                </div>

                {/* Time filter */}
                <div className="space-y-1.5">
                  <label htmlFor="date-filter-select" className="text-slate-500 font-semibold uppercase tracking-wider block text-[10px]">Date Range</label>
                  <select
                    id="date-filter-select"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value as 'all' | '24h' | '7d' | '30d')}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="all">All Time</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                </div>

                {/* Confidence Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <label htmlFor="confidence-filter-slider">Min Confidence</label>
                    <span className="text-emerald-400 font-bold">{confidenceFilter}%+</span>
                  </div>
                  <input
                    id="confidence-filter-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={confidenceFilter}
                    onChange={(e) => setConfidenceFilter(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Active Filter Chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Active Filters:</span>
                {activeChips.map((chip) => (
                  <span 
                    key={chip.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-850 rounded-xl text-slate-300 font-medium"
                  >
                    {chip.label}
                    <button 
                      onClick={chip.reset}
                      className="text-slate-500 hover:text-rose-450 transition-colors p-0.5 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={handleClearAllFilters}
                  className="text-[10px] text-rose-400 hover:text-rose-350 font-bold uppercase tracking-wider hover:underline ml-2 transition-all cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Mentions List */}
            {filteredMentions.length === 0 ? (
              <div className="text-center py-16 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                <Search className="h-8 w-8 mx-auto text-slate-700 mb-2" />
                <p className="text-sm">No mentions match your search filter criteria.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 divide-y divide-slate-800/40">
                {filteredMentions.map((mention) => {
                  const keywordLabel = mention.tracked_keywords?.keyword || 'Brand'
                  
                  return (
                    <div 
                      key={mention.id} 
                      onClick={() => setSelectedMention(mention)}
                      className="pt-4 first:pt-0 flex flex-col md:flex-row md:items-start gap-4 justify-between group cursor-pointer hover:bg-slate-900/20 p-4 -mx-4 rounded-xl transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        {/* Title and Badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            mention.sentiment === 'positive'
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : mention.sentiment === 'negative'
                              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}>
                            {mention.sentiment.toUpperCase()}
                          </span>

                          <span className="text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                            {keywordLabel}
                          </span>

                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(mention.published_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-slate-200 text-base leading-snug group-hover:text-emerald-400 transition-colors">
                          {mention.title}
                        </h3>

                        {/* Snippet */}
                        {mention.snippet && (
                          <p className="text-sm text-slate-400 leading-relaxed max-w-4xl">
                            {mention.snippet}
                          </p>
                        )}

                        {/* AI Summary Banner */}
                        {mention.summary && (
                          <div className="flex items-start gap-2 bg-slate-950/80 border border-slate-900 p-3 rounded-xl text-xs text-slate-300">
                            <span className="text-emerald-400 font-semibold shrink-0 uppercase tracking-widest text-[9px] mt-0.5 border border-emerald-500/20 px-1 rounded bg-emerald-500/5">AI Summary</span>
                            <span className="italic">&quot;{mention.summary}&quot;</span>
                          </div>
                        )}
                      </div>

                      {/* Right Link details */}
                      <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 shrink-0 md:pt-4">
                        <span className="text-xs font-semibold text-slate-500 bg-slate-900 px-2 py-1 rounded-md">
                          {mention.source}
                        </span>
                        
                        {mention.url && (
                          <a
                            href={mention.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 hover:underline transition-all"
                          >
                            Visit Source
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mention Details Drawer Overlay & Panel */}
      <div 
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          selectedMention ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSelectedMention(null)}
      />

      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Mention Details"
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-slate-950/95 backdrop-blur-2xl border-l border-slate-900/80 z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          selectedMention ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-900/40 shrink-0">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mention Details</span>
          <button 
            onClick={() => setSelectedMention(null)}
            className="text-slate-400 hover:text-slate-100 transition-colors p-1.5 hover:bg-slate-900 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {selectedMention && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-100 leading-snug">
                {selectedMention.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                <span className="px-2 py-0.5 bg-slate-900 border border-slate-800/85 text-slate-300 rounded font-semibold">
                  {selectedMention.source}
                </span>
                <span>•</span>
                <span>
                  {new Date(selectedMention.published_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Sentiment</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    selectedMention.sentiment === 'positive'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : selectedMention.sentiment === 'negative'
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {selectedMention.sentiment.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    ({selectedMention.ai_metadata?.confidence ?? 75}% confidence)
                  </span>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Category</span>
                <span className="text-sm font-semibold text-slate-200 block mt-1">
                  {selectedMention.ai_metadata?.category || 'Other'}
                </span>
              </div>
            </div>

            {selectedMention.summary && (
              <div className="bg-slate-900/20 border border-emerald-500/10 rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 rounded-full blur-2xl" />
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">AI Executive Summary</span>
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;{selectedMention.summary}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedMention.ai_metadata?.topics && selectedMention.ai_metadata.topics.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Parsed Topics</span>
                <div className="flex flex-wrap gap-2">
                  {selectedMention.ai_metadata.topics.map((t) => (
                    <span 
                      key={t}
                      className="px-3 py-1 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Content Preview</span>
              <p className="text-sm text-slate-400 leading-relaxed bg-slate-900/20 border border-slate-900/65 p-4 rounded-xl">
                {selectedMention.snippet || 'No preview available.'}
              </p>
            </div>

            {selectedMention.url && (
              <div className="pt-4 border-t border-slate-900/80">
                <a
                  href={selectedMention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-350 hover:to-teal-450 text-slate-950 font-bold rounded-xl text-sm transition-all transform hover:scale-[1.01] shadow-lg shadow-emerald-500/5 cursor-pointer"
                >
                  Open Source Article
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Helpers
import { Plus } from 'lucide-react'
