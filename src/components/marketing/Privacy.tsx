'use client'

import { useEffect, useState } from 'react'

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('collection')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { rootMargin: '-20% 0px -80% 0px' })

    sections.forEach(section => observer.observe(section))
    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  const getLinkClass = (id: string) => {
    return activeSection === id
      ? 'text-primary font-label-md text-label-md transition-colors flex items-center gap-2'
      : 'text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors pl-3'
  }

  return (
    <main className="flex-grow pt-32 pb-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full flex flex-col md:flex-row gap-12 animate-fade-in">
      {/* Sidebar Navigation */}
      <aside className="md:w-1/4 hidden md:block">
        <div className="sticky top-32 glass-panel rounded-xl p-6">
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">Contents</h3>
          <nav className="flex flex-col gap-4">
            <a className={getLinkClass('collection')} href="#collection">
              {activeSection === 'collection' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Data Collection
            </a>
            <a className={getLinkClass('use')} href="#use">
              {activeSection === 'use' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Data Usage
            </a>
            <a className={getLinkClass('sharing')} href="#sharing">
              {activeSection === 'sharing' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Data Sharing
            </a>
            <a className={getLinkClass('security')} href="#security">
              {activeSection === 'security' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Data Security
            </a>
          </nav>
        </div>
      </aside>
      {/* Legal Content Document */}
      <article className="md:w-3/4 glass-panel rounded-xl p-8 md:p-12">
        <header className="mb-12">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">Privacy Policy</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-normal">Last updated: October 24, 2024</p>
        </header>
        <div className="space-y-12 font-normal">
          <section id="collection">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">1. Data Collection</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              We collect information you provide directly to us when creating or modifying your account, requesting support, or communicating with us. This information may include email address, name, password, billing credentials, and company details.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="use">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">2. Data Usage</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              We use the collected data to provide, maintain, and improve our services, including running sentiment algorithms and custom brand tracking dashboards.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="sharing">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">3. Data Sharing</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We do not sell your personal data. We only share information with trusted third-party subprocessors essential to operating the platform (e.g. database hosting, payment processing, or email delivery), always strictly conforming to privacy guidelines.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="security">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">4. Data Security</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We employ strict technical and organizational safeguards to secure your personal data and brand tracking histories. However, no transmission over the internet can be guaranteed as 100% secure.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
