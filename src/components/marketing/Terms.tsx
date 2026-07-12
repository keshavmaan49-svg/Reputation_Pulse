'use client'

import { useEffect, useState } from 'react'

export default function Terms() {
  const [activeSection, setActiveSection] = useState('acceptance')

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
            <a className={getLinkClass('acceptance')} href="#acceptance">
              {activeSection === 'acceptance' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Acceptance of Terms
            </a>
            <a className={getLinkClass('obligations')} href="#obligations">
              {activeSection === 'obligations' && <span className="w-1 h-4 bg-primary rounded-full"></span>} User Obligations
            </a>
            <a className={getLinkClass('limitations')} href="#limitations">
              {activeSection === 'limitations' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Service Limitations
            </a>
            <a className={getLinkClass('ip')} href="#ip">
              {activeSection === 'ip' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Intellectual Property
            </a>
            <a className={getLinkClass('termination')} href="#termination">
              {activeSection === 'termination' && <span className="w-1 h-4 bg-primary rounded-full"></span>} Termination
            </a>
          </nav>
        </div>
      </aside>
      {/* Legal Content Document */}
      <article className="md:w-3/4 glass-panel rounded-xl p-8 md:p-12">
        <header className="mb-12">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-4">Terms of Service</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-normal">Last updated: October 24, 2024</p>
        </header>
        <div className="space-y-12 font-normal">
          <section id="acceptance">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">1. Acceptance of Terms</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              By accessing or using the Lumina Intelligence platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms constitute a legally binding agreement between you and Lumina AI Brand Intelligence.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of this document and, in some cases, providing additional notice through the platform interface.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="obligations">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">2. User Obligations</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              Users must provide accurate, complete, and current information when registering for an account. You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
            </p>
            <ul className="list-disc list-inside space-y-2 font-body-md text-body-md text-on-surface-variant ml-4">
              <li>Maintain the security of your account credentials.</li>
              <li>Do not use the service for any illegal or unauthorized purpose.</li>
              <li>Do not attempt to disrupt or compromise the integrity of our systems.</li>
              <li>Ensure all data ingested into the platform complies with applicable privacy laws.</li>
            </ul>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="limitations">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">3. Service Limitations</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Lumina Intelligence is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. While we strive for maximum uptime and analytical accuracy, we do not guarantee that the service will be uninterrupted, secure, or error-free. The insights generated by the platform are algorithmic interpretations and should not be the sole basis for critical business decisions.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="ip">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">4. Intellectual Property</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              The service and its original content, features, and functionality are and will remain the exclusive property of Lumina AI Brand Intelligence and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Lumina AI.
            </p>
          </section>
          <div className="glow-divider w-full"></div>
          <section id="termination">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">5. Termination</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              If you wish to terminate your account, you may simply discontinue using the Service or contact support to request data deletion in accordance with our Privacy Policy.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
