import { login } from '@/app/auth/actions'
import Login from '@/components/marketing/Login'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import MarketingFooter from '@/components/marketing/MarketingFooter'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

interface PageProps {
  searchParams: SearchParams
}

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error as string | undefined
  const message = resolvedSearchParams?.message as string | undefined

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <MarketingNavbar />
      
      <main className="flex-grow flex items-center justify-center">
        <Login 
          action={login} 
          error={error ? decodeURIComponent(error) : undefined} 
          message={message ? decodeURIComponent(message) : undefined} 
        />
      </main>

      <MarketingFooter />
    </div>
  )
}
