'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Settings, LogOut, User, ChevronDown, Plus, Sparkles } from 'lucide-react'
import { signout } from '@/app/auth/actions'
import { useTransition, useState, useEffect, useRef } from 'react'
import { BrandItem } from '@/lib/utils'

interface NavbarProps {
  userEmail?: string
  brands?: BrandItem[]
  currentBrandId?: string
}

export default function Navbar({ userEmail, brands = [], currentBrandId }: NavbarProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignout = () => {
    startTransition(async () => {
      await signout()
    })
  }

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentBrand = brands.find(
    (b) => b.id === currentBrandId || b.slug === currentBrandId
  )

  const getStatusColorClass = (color?: 'green' | 'yellow' | 'red') => {
    if (color === 'green') return 'bg-emerald-500 shadow-emerald-500/50'
    if (color === 'red') return 'bg-rose-500 shadow-rose-500/50'
    return 'bg-amber-500 shadow-amber-500/50'
  }

  return (
    <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity">
          <Sparkles className="h-6 w-6 text-emerald-400" />
          <span>Reputation Pulse</span>
        </Link>

        {/* Brand Switcher Selector */}
        {brands.length > 0 && (
          <div className="relative flex items-center gap-2" ref={dropdownRef}>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">Brand</span>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800/80 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-850 hover:border-slate-700/80 transition-all cursor-pointer shadow-sm"
            >
              {currentBrand ? (
                <>
                  <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)] ${getStatusColorClass(currentBrand.statusColor)}`} />
                  <span>{currentBrand.keyword}</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="h-3 w-3 text-slate-400" />
                  <span>Overview</span>
                </>
              )}
              <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            {isDropdownOpen && (
              <div 
                role="listbox"
                className="absolute top-full left-0 mt-2 w-64 bg-slate-950/95 backdrop-blur-2xl border border-slate-900 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden divide-y divide-slate-900/60"
              >
                {/* Overview Option */}
                <div className="pb-1.5">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      router.push('/dashboard')
                    }}
                    className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-xl transition-all cursor-pointer text-xs ${
                      !currentBrand
                        ? 'bg-slate-900 text-emerald-400 font-semibold'
                        : 'text-slate-350 hover:bg-slate-900/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-3.5 w-3.5 text-slate-400" />
                      <span>All Brands (Overview)</span>
                    </div>
                  </button>
                </div>

                {/* Brands List */}
                <div className="py-1.5 max-h-[220px] overflow-y-auto space-y-1">
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setIsDropdownOpen(false)
                        router.push(`/dashboard/${b.slug}`)
                      }}
                      className={`flex items-center justify-between w-full px-3 py-2 text-left rounded-xl transition-all cursor-pointer ${
                        currentBrand?.id === b.id
                          ? 'bg-slate-900 text-emerald-400 font-semibold'
                          : 'text-slate-350 hover:bg-slate-900/50 hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${getStatusColorClass(b.statusColor)}`} />
                        <span className="text-xs truncate font-medium">{b.keyword}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 text-right shrink-0">
                        <div>Score {b.reputationScore}</div>
                        <div>{b.mentionCount} mentions</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Footers */}
                <div className="pt-1.5 space-y-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      router.push('/settings')
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-900/40 rounded-xl transition-all cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Brand</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      router.push('/settings')
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 rounded-xl transition-all cursor-pointer"
                  >
                    <Settings className="h-3.5 w-3.5" />
                    <span>Manage Brands</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {userEmail && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-800 bg-slate-900/40 rounded-xl text-xs text-slate-400">
            <User className="h-3.5 w-3.5 text-slate-500" />
            <span>{userEmail}</span>
          </div>
        )}
        <button
          onClick={handleSignout}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-slate-800 hover:border-red-500/20 hover:bg-red-500/5 text-slate-400 hover:text-red-400 rounded-xl transition-all cursor-pointer disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>{isPending ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    </header>
  )
}
