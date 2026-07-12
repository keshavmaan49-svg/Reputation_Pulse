'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MarketingNavbarProps {
  userEmail?: string | null
}

export default function MarketingNavbar({ userEmail }: MarketingNavbarProps) {
  const pathname = usePathname()

  return (
    <header className="bg-surface/80 backdrop-blur-md font-headline-sm text-headline-sm flex justify-between items-center w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto h-20 z-50 docked full-width top-0 sticky border-b border-outline-variant/20 flat with 1px inner glow">
      <Link href="/" className="font-headline-md text-headline-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-90 transition-opacity">
        Reputation Pulse
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link 
          className={
            pathname === '/' 
              ? 'text-primary font-bold border-b-2 border-primary pb-1 px-2 py-1 text-label-md font-label-md' 
              : 'text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-white/5 duration-300 rounded px-2 py-1 text-label-md font-label-md'
          } 
          href="/"
        >
          Home
        </Link>
        <Link 
          className={
            pathname === '/features' 
              ? 'text-primary font-bold border-b-2 border-primary pb-1 px-2 py-1 text-label-md font-label-md' 
              : 'text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-white/5 duration-300 rounded px-2 py-1 text-label-md font-label-md'
          } 
          href="/features"
        >
          Features
        </Link>
        <Link 
          className={
            pathname === '/about' 
              ? 'text-primary font-bold border-b-2 border-primary pb-1 px-2 py-1 text-label-md font-label-md' 
              : 'text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-white/5 duration-300 rounded px-2 py-1 text-label-md font-label-md'
          } 
          href="/about"
        >
          About
        </Link>
        <Link 
          className={
            pathname === '/contact' 
              ? 'text-primary font-bold border-b-2 border-primary pb-1 px-2 py-1 text-label-md font-label-md' 
              : 'text-on-surface-variant font-medium hover:text-primary transition-colors hover:bg-white/5 duration-300 rounded px-2 py-1 text-label-md font-label-md'
          } 
          href="/contact"
        >
          Contact
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        {userEmail ? (
          <Link 
            className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-primary-container/80 transition-colors shadow-[0_2px_0_rgba(0,108,73,1)] block text-center" 
            href="/dashboard"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link 
              className="text-on-surface-variant font-medium hover:text-primary transition-colors hidden md:block text-label-md font-label-md" 
              href="/login"
            >
              Login
            </Link>
            <Link 
              className="bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-primary-container/80 transition-colors shadow-[0_2px_0_rgba(0,108,73,1)] block text-center" 
              href="/signup"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
