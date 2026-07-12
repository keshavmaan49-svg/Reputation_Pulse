/* eslint-disable @next/next/no-img-element */
import { signup } from '@/app/auth/actions'
import Link from 'next/link'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import MarketingFooter from '@/components/marketing/MarketingFooter'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PageProps {
  searchParams: SearchParams
}

export default async function SignupPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error as string | undefined
  const message = resolvedSearchParams?.message as string | undefined

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-surface font-body-md antialiased overflow-x-hidden">
      <MarketingNavbar />
      
      <main className="flex-grow flex items-center justify-center pt-10 pb-20 px-margin-mobile md:px-0 relative">
        <div className="radial-glow"></div>
        <div className="relative z-10 w-full max-w-md px-margin-mobile md:px-0">
          <div className="text-center mb-10 flex flex-col items-center animate-fade-in">
            <img 
              alt="Reputation Pulse Logo" 
              className="w-16 h-16 rounded-lg mb-4 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8qiNd1H21-IQVWFTNB-iB0dwJtkA7EuZPxpd7EW9u6hAxI2JzJBGOK2eX6bOIhQNoCM7TVWSntD-zhrzzE433-q_sSTWa3sg1AteBuP5rQm3QV5XivrBwWjdJM9_8Gyy9CNHh1mOQFQLj19K7-9HfJnDwDRu6hUpWKIWu-r2v8iZpy7YGnWiodcxSCKmhb3fpYpm4FkV4oIqqRPyZAjmn7woA582Qv7KJdsPh3SmE0ZufiXISU-CcMM6lsrV6hkTCRu3d8nG5Lg42" 
            />
            <h1 className="font-headline-md text-headline-md text-on-surface">Create your account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Get started tracking your online narrative.</p>
          </div>
          
          <div className="glass-card rounded-xl p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none opacity-50"></div>
            
            {error && (
              <div className="mb-4 bg-rose-950/50 border border-rose-500/30 text-rose-250 p-3 rounded-lg text-xs text-center font-medium animate-pulse relative z-20">
                {decodeURIComponent(error)}
              </div>
            )}
            {message && (
              <div className="mb-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-250 p-3 rounded-lg text-xs text-center font-medium relative z-20">
                {decodeURIComponent(message)}
              </div>
            )}

            <form action={signup} className="relative z-10 space-y-6">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                  <input 
                    autoComplete="email" 
                    className="input-inset w-full rounded-lg py-3 pl-12 pr-4 text-on-surface font-body-md placeholder-outline-variant transition-colors" 
                    id="email" 
                    name="email" 
                    placeholder="name@company.com" 
                    required 
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                  <input 
                    autoComplete="new-password" 
                    className="input-inset w-full rounded-lg py-3 pl-12 pr-4 text-on-surface font-body-md placeholder-outline-variant transition-colors" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    required 
                    type="password"
                  />
                </div>
              </div>
              <div>
                <button className="btn-primary w-full flex justify-center py-3 px-4 rounded-lg font-label-md text-label-md text-on-primary-fixed cursor-pointer font-bold" type="submit">
                  Register
                </button>
              </div>
            </form>
            <div className="mt-8 relative z-10 text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Already have an account? 
                <Link className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors ml-1 font-bold" href="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  )
}
