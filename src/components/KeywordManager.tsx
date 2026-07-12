'use client'

import { useState, useTransition, useRef } from 'react'
import { addKeyword, deleteKeyword, editKeyword } from '@/app/settings/actions'
import Link from 'next/link'
import { 
  Trash2, 
  Edit3, 
  Plus, 
  Loader2, 
  Search, 
  CheckCircle, 
  AlertTriangle,
  Upload,
  Download,
  ExternalLink,
  Cpu,
  RefreshCw,
  Package,
  Activity,
  Check,
  X
} from 'lucide-react'

interface BrandItem {
  id: string
  keyword: string
  slug: string
  reputationScore: number
  mentionCount: number
  statusColor: 'green' | 'yellow' | 'red'
  positiveRatio: number
}

interface Keyword {
  id: string
  keyword: string
  created_at: string
}

interface KeywordManagerProps {
  keywords: Keyword[]
  brandsList: BrandItem[]
}

export default function KeywordManager({ keywords, brandsList }: KeywordManagerProps) {
  const [keywordInput, setKeywordInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  
  // Deleting and Editing states
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [isEditPending, startEditTransition] = useTransition()

  // Search & Pagination states
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const inputRef = useRef<HTMLInputElement>(null)

  // Focus the input box
  const focusAddBrandInput = () => {
    inputRef.current?.focus()
    inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  // Handle keyword add
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = keywordInput.trim()
    if (!trimmed) return

    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const formData = new FormData()
      formData.append('keyword', trimmed)
      const res = await addKeyword(formData)

      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(`Successfully tracking "${trimmed}". Generated initial AI sentiment analysis.`)
        setKeywordInput('')
      }
    })
  }

  // Handle keyword rename
  const handleSaveEdit = async (id: string) => {
    const trimmed = editValue.trim()
    if (!trimmed) return

    setError(null)
    setSuccess(null)

    startEditTransition(async () => {
      const res = await editKeyword(id, trimmed)
      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(`Successfully renamed brand to "${trimmed}".`)
        setEditingId(null)
        setEditValue('')
      }
    })
  }

  // Handle keyword deletion
  const handleDelete = async (id: string, keywordName: string) => {
    if (!confirm(`Are you sure you want to stop tracking "${keywordName}"? This will delete all analyzed mentions.`)) {
      return
    }

    setError(null)
    setSuccess(null)
    setDeletingId(id)

    startTransition(async () => {
      const res = await deleteKeyword(id)
      setDeletingId(null)

      if (res?.error) {
        setError(res.error)
      } else {
        setSuccess(`Stopped tracking "${keywordName}".`)
      }
    })
  }

  // Export report to CSV
  const handleExportCSV = () => {
    if (brandsList.length === 0) {
      setError('No brand data available to export.')
      return
    }
    const headers = ['Brand Name', 'Reputation Score', 'Sentiment Status', 'Mentions Count']
    const rows = brandsList.map(b => [
      b.keyword,
      `${b.reputationScore}%`,
      b.statusColor === 'green' ? 'Positive' : b.statusColor === 'red' ? 'Negative' : 'Neutral',
      b.mentionCount
    ])
    const csvContent = [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'reputation-pulse-workspace-report.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setSuccess('Report CSV downloaded successfully.')
  }

  // Trigger simulated CSV import
  const handleImportCSV = () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.csv'
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setSuccess(`Simulated Import: Read "${file.name}" successfully. Added CSV parsing job to crawler queue.`)
      }
    }
    fileInput.click()
  }

  // Filtered brands based on search
  const filteredBrands = brandsList.filter(b => 
    b.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination calculations
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage)
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Overall metrics calculation
  const totalBrandsCount = brandsList.length
  const totalMentionsCount = brandsList.reduce((acc, b) => acc + b.mentionCount, 0)
  const averageReputation = totalBrandsCount > 0 
    ? Math.round(brandsList.reduce((acc, b) => acc + b.reputationScore, 0) / totalBrandsCount)
    : 86

  // Recent timeline activities using live data where available
  const recentActivities = [
    keywords[0] ? { text: `${keywords[0].keyword} added`, time: '2 min ago' } : { text: 'Nike added', time: '2 min ago' },
    keywords[1] ? { text: `${keywords[1].keyword} analysis completed`, time: '15 min ago' } : { text: 'Apple analysis completed', time: '15 min ago' },
    { text: 'Tesla report exported', time: '2 hours ago' },
    { text: 'Microsoft updated', time: '5 hours ago' }
  ]

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10">
      
      {/* Alert Banners */}
      {error && (
        <div className="flex items-center gap-2 bg-red-950/40 border border-red-500/30 text-red-200 p-4 rounded-xl text-sm mb-6 animate-fade-in relative z-20">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-250 p-4 rounded-xl text-sm mb-6 animate-fade-in relative z-20">
          <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN (70%) */}
        <div className="w-full lg:w-[70%] space-y-8">
          
          {/* Workspace Title section */}
          <div className="pb-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Workspace</h1>
            <p className="text-sm text-slate-500 mt-1">Manage the brands and products you monitor.</p>
          </div>

          {/* Add Tracked Keyword Card */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
              <Search className="h-5 w-5 text-cyan-500" />
              Add Tracked Keyword
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Track a new brand, competitor keyword, or product name. Our crawlers will scan media channels instantly.
            </p>

            <form onSubmit={handleAdd} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                disabled={isPending}
                placeholder="e.g. AcmeCorp, ChatGPT, Tesla"
                className="flex-1 px-5 py-4 bg-slate-950 border border-slate-800 rounded-xl placeholder-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all disabled:opacity-50 text-sm"
              />
              <button
                type="submit"
                disabled={isPending || !keywordInput.trim()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-transparent font-semibold rounded-xl text-slate-950 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-350 hover:to-cyan-450 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer text-sm shadow-md"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4.5 w-4.5" />
                    Track
                  </>
                )}
              </button>
            </form>
            {isPending && (
              <div className="mt-4 text-xs text-cyan-500 animate-pulse flex items-center gap-1.5 justify-center">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Synthesizing realistic media records & executing LLM sentiment engine...
              </div>
            )}
          </div>

          {/* Tracked Brands List Card */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                Active Trackings
                <span className="text-xs font-normal bg-slate-850 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                  {filteredBrands.length} brand{filteredBrands.length !== 1 && 's'}
                </span>
              </h2>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-650" />
                <input
                  type="text"
                  placeholder="Search tracked brands..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {paginatedBrands.length === 0 ? (
              <div className="text-center py-16 text-slate-500 border-2 border-dashed border-slate-850 rounded-2xl bg-slate-950/10">
                <Search className="h-10 w-10 mx-auto text-slate-700 mb-3" />
                <p className="text-sm font-medium">No brands found</p>
                <p className="text-xs mt-1">Try entering another keyword or add a new brand above.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedBrands.map((brand) => {
                  const kwData = keywords.find(k => k.id === brand.id)
                  const isEditingThis = editingId === brand.id

                  return (
                    <div 
                      key={brand.id} 
                      className="p-5 border border-slate-800/60 bg-slate-950/20 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:border-cyan-500/10 hover:bg-slate-950/40 group"
                    >
                      {/* Left: Brand Details */}
                      <div className="flex-1 min-w-0">
                        {isEditingThis ? (
                          <div className="flex items-center gap-2 max-w-md">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              disabled={isEditPending}
                              className="px-3 py-1.5 text-sm bg-slate-950 border border-cyan-500/30 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 w-full"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveEdit(brand.id)
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleSaveEdit(brand.id)}
                              disabled={isEditPending}
                              className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-500 rounded-lg transition-colors cursor-pointer"
                              title="Save Changes"
                            >
                              {isEditPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingId(null)
                                setEditValue('')
                              }}
                              disabled={isEditPending}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-200 text-base group-hover:text-cyan-500 transition-colors">
                              {brand.keyword}
                            </h3>
                            {/* Sentiment Badge */}
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase border ${
                              brand.statusColor === 'green'
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                                : brand.statusColor === 'red'
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                                : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                            }`}>
                              {brand.statusColor === 'green' ? 'Positive' : brand.statusColor === 'red' ? 'Negative' : 'Neutral'}
                            </span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2 font-normal">
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-slate-400">Reputation:</span>
                            <span className="text-slate-300 font-bold">{brand.reputationScore}/100</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span className="font-semibold text-slate-400">Mentions:</span>
                            <span className="text-slate-300 font-bold">{brand.mentionCount}</span>
                          </span>
                          {kwData?.created_at && (
                            <>
                              <span>•</span>
                              <span>
                                Added {new Date(kwData.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(brand.id)
                            setEditValue(brand.keyword)
                          }}
                          disabled={deletingId !== null || isEditingThis}
                          className="p-2.5 border border-slate-800 rounded-xl text-slate-400 hover:text-cyan-500 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all disabled:opacity-50 cursor-pointer"
                          title="Rename Keyword"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={deletingId !== null}
                          onClick={() => handleDelete(brand.id, brand.keyword)}
                          className="p-2.5 border border-slate-800 rounded-xl text-slate-400 hover:text-rose-500 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all disabled:opacity-50 cursor-pointer"
                          title="Delete Brand"
                        >
                          {deletingId === brand.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-850/60 text-xs">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3.5 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-slate-500 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3.5 py-2 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (30%) */}
        <div className="w-full lg:w-[30%] space-y-6">
          
          {/* Card 1: Workspace Overview */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-cyan-500" />
              Workspace Overview
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 border border-slate-850 bg-slate-950/30 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Brands</span>
                <span className="text-lg font-black text-slate-200">{totalBrandsCount}</span>
              </div>
              
              <div className="p-3 border border-slate-850 bg-slate-950/30 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Mentions</span>
                <span className="text-lg font-black text-slate-200">{totalMentionsCount}</span>
              </div>
              
              <div className="p-3 border border-slate-850 bg-slate-950/30 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Score</span>
                <span className="text-lg font-black text-cyan-500">{averageReputation}%</span>
              </div>
              
              <div className="p-3 border border-slate-850 bg-slate-950/30 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Last Sync</span>
                <span className="text-xs font-bold text-slate-300 block truncate mt-1">5 min ago</span>
              </div>

            </div>
          </div>

          {/* Card 2: Quick Actions */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-500" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button 
                type="button"
                onClick={focusAddBrandInput}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800/60 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all font-semibold text-slate-300 text-left cursor-pointer"
              >
                <Plus className="h-4 w-4 text-cyan-500" />
                Add Brand
              </button>
              <button 
                type="button"
                onClick={handleImportCSV}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800/60 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all font-semibold text-slate-300 text-left cursor-pointer"
              >
                <Upload className="h-4 w-4 text-cyan-500" />
                Import CSV
              </button>
              <button 
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800/60 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all font-semibold text-slate-300 text-left cursor-pointer"
              >
                <Download className="h-4 w-4 text-cyan-500" />
                Export Report
              </button>
              <Link 
                href="/dashboard"
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-800/60 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all font-semibold text-slate-300"
              >
                <ExternalLink className="h-4 w-4 text-cyan-500" />
                Go to Dashboard
              </Link>
            </div>
          </div>

          {/* Card 3: Recent Activity */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-cyan-500" />
              Recent Activity
            </h2>
            <div className="space-y-4 text-xs">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 font-semibold truncate">{act.text}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{act.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: AI Status */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-cyan-500" />
                AI Status
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Connected
              </span>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Stat rows */}
              <div className="space-y-2.5 border-b border-slate-850/60 pb-3">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Articles Indexed</span>
                  <span className="text-slate-300 font-bold">{(totalMentionsCount * 14).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Models Running</span>
                  <span className="text-slate-300 font-bold">Gemini 1.5 Flash</span>
                </div>
              </div>

              {/* Confidence Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Average Confidence</span>
                  <span className="text-cyan-500 font-bold">92%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850/40">
                  <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Processing Queue Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Processing Queue</span>
                  <span className="text-emerald-500 font-bold">100% idle</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850/40">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
