'use client'

import Link from 'next/link'

export default function MarketingFooter() {
  return (
    <footer className="bg-surface-container-lowest full-width bottom border-t border-outline-variant/10 flat no shadows w-full mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-section-gap">
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <div className="font-headline-sm text-headline-sm font-bold text-on-surface">Reputation Pulse</div>
          <p className="font-caption text-caption text-on-surface-variant">© 2024 Reputation Pulse. Precision monitoring for growth teams.</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-primary mb-2">Links</span>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="/">Home</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="/features">Features</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="/about">About</Link>
          <Link className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="/terms">Terms of Service</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-md text-label-md text-primary mb-2">Social</span>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="#">Twitter</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors hover:opacity-80" href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  )
}
