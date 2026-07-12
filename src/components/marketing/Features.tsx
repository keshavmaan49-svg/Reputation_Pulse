/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'

interface FeaturesProps {
  userEmail?: string | null
}

export default function Features({ userEmail }: FeaturesProps) {
  return (
    <main className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden">
        <div className="absolute inset-0 radial-gradient-bg -z-10 pointer-events-none"></div>
        <div className="text-center max-w-4xl mx-auto z-10">
          <h1 className="font-display-xl text-display-xl mb-6">
            Deep Intelligence for <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Every Mention.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            Uncover hidden narratives, track sentiment shifts in real-time, and outmaneuver competitors with precision analytics built for high-performance growth teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={userEmail ? '/dashboard' : '/signup'}
              className="bg-primary-container text-on-primary-container font-label-md px-8 py-3 rounded-lg hover:opacity-90 transition-all shadow-[0_2px_0_#006c49] block text-center"
            >
              Explore Platform
            </Link>
            <Link 
              href="/contact"
              className="border border-white/10 hover:border-secondary text-on-surface font-label-md px-8 py-3 rounded-lg transition-all bg-transparent block text-center"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature 1: Real-Time News Monitoring */}
      <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-gradient-bg-cyan -z-10 opacity-50 pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-caption text-caption mb-6">
              <span className="material-symbols-outlined text-[16px]">radar</span>
              Live Tracking
            </div>
            <h2 className="font-display-lg text-display-lg mb-6">Real-Time News Monitoring</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 font-normal">
              Never miss a beat. Our global crawlers ingest millions of articles, social posts, and forums per minute. Filter the noise and get instant alerts on critical mentions.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span className="font-body-md text-on-surface">Sub-second ingestion from 100k+ sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span className="font-body-md text-on-surface">Custom entity recognition &amp; topic modeling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                <span className="font-body-md text-on-surface">Spike detection and anomaly alerts</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="glass-card rounded-xl p-4 border border-outline-variant/30">
              <div className="flex gap-2 mb-4 px-2 border-b border-outline-variant/20 pb-4">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <img 
                className="w-full rounded-lg object-cover h-[400px] border border-white/5" 
                alt="A sophisticated dark-mode dashboard interface showing a real-time news feed." 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7EVTY6Z2iPGPdtWWSo0LEBj8hPSs7_2Hsp_04CInlJSHVcLKXiKH1gxSKkiapAnkqmaKU9ATs7kkmKKFwRdn_a1KNIFMVgye1uUdVsjafzXRwoMmT4veszKOiMiqDTTlL28YRkve96yu67lMFMvzDroc2F2i397Tw3n_x_D78j48mJdz7iyjWDBPrSxJLk0T6Sy3L5zctrFKXp-GhIoJa4MgPZ3FeNfU3v81kMl6jBhUKavhUulCqLi--bgCYaZaE5uYtQbkmsYU9" 
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 glass-card glow-active rounded-lg p-4 w-64 hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <span className="font-label-md text-on-surface">Alert Triggered</span>
              </div>
              <p className="font-caption text-on-surface-variant text-caption">Mention volume spiked 340% in the last 15 minutes for &quot;Project X&quot;.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: AI-Powered Sentiment */}
      <section className="py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-gradient-bg -z-10 opacity-50 pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 relative">
            <div className="glass-card rounded-xl p-6 border border-outline-variant/30 h-[450px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-sm text-headline-sm">Sentiment Index</h3>
                <select className="bg-surface-container border border-outline-variant rounded px-3 py-1 text-sm font-label-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>
              {/* Abstract Chart Representation */}
              <div className="flex-1 relative border-l border-b border-outline-variant/30 flex items-end justify-between pt-10 px-4">
                {/* Y Axis Lines */}
                <div className="absolute w-full border-t border-outline-variant/10 top-1/4 left-0"></div>
                <div className="absolute w-full border-t border-outline-variant/10 top-2/4 left-0"></div>
                <div className="absolute w-full border-t border-outline-variant/10 top-3/4 left-0"></div>
                {/* Bars/Lines */}
                <div className="w-8 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm h-[40%] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant">+12</div>
                </div>
                <div className="w-8 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm h-[60%] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant">+28</div>
                </div>
                <div className="w-8 bg-gradient-to-t from-error/20 to-error rounded-t-sm h-[20%] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant">-5</div>
                </div>
                <div className="w-8 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm h-[80%] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant">+45</div>
                </div>
                <div className="w-8 bg-gradient-to-t from-primary/20 to-primary rounded-t-sm h-[70%] relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-on-surface-variant">+38</div>
                </div>
              </div>
            </div>
            {/* Floating Pill */}
            <div className="absolute top-10 -right-6 glass-card rounded-full px-4 py-2 flex items-center gap-2 border-primary/30 hidden md:flex">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-label-md text-primary">+8.4% Positive Shift</span>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-caption text-caption mb-6">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              Contextual AI
            </div>
            <h2 className="font-display-lg text-display-lg mb-6">AI-Powered Sentiment</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 font-normal">
              Go beyond basic keyword matching. Our proprietary LLMs understand sarcasm, context, and industry-specific jargon to deliver accurate emotional resonance scores.
            </p>
            <p className="font-body-md text-on-surface-variant mb-8 border-l-2 border-outline-variant/30 pl-4 py-1 italic">
              &quot;We finally understand the *why* behind the numbers, not just the *what*.&quot;
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
