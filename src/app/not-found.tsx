import NotFound from '@/components/marketing/NotFound'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-surface font-body-lg overflow-x-hidden antialiased">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <NotFound />

      {/* Footer from the 404 page prototype */}
      <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest w-full py-section-gap border-t border-outline-variant/10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-4">
            <span className="font-display-lg text-headline-sm font-bold text-primary">Lumina Intelligence</span>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">© 2024 Lumina AI Brand Intelligence. All rights reserved.</p>
          </div>
          <div className="flex flex-col space-y-3">
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/">Product</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/features">Features</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/about">Security</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/about">Company</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/about">About</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/about">Careers</Link>
            <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="/about">Press</Link>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-body-md text-body-md text-on-surface-variant font-bold">Social</span>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="#">LinkedIn</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform duration-200 ease-in-out" href="#">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
