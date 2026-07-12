import { createClient } from '@/lib/supabase/server'
import MarketingNavbar from '@/components/marketing/MarketingNavbar'
import MarketingFooter from '@/components/marketing/MarketingFooter'
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userEmail = user?.email || null

  return (
    <div className="flex flex-col min-h-screen w-full relative bg-background text-on-background font-body-md overflow-x-hidden antialiased">
      <MarketingNavbar userEmail={userEmail} />

      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section with WebGL Shader */}
        <section className="relative w-full min-h-[921px] flex flex-col items-center justify-center pt-20 px-margin-mobile md:px-gutter overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-0 pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8 mt-12">
            <h1 className="font-display-xl text-display-xl tracking-tight leading-tight">
              Own Your Narrative with <br />
              <span className="text-gradient">AI-Powered Brand Intelligence.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Real-time sentiment tracking and executive-level summaries for modern marketing teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link 
                href={userEmail ? '/dashboard' : '/signup'}
                className="bg-primary-container text-on-primary-container font-label-md text-label-md px-8 py-3 rounded-lg hover:bg-primary-container/90 transition-all shadow-[0_2px_0_rgba(0,108,73,1)] hover:translate-y-[-2px] block text-center"
              >
                {userEmail ? 'Go to Dashboard' : 'Get Started'}
              </Link>
              <Link 
                href="/contact"
                className="glass-panel text-on-surface font-label-md text-label-md px-8 py-3 rounded-lg hover:border-secondary transition-all hover:translate-y-[-2px] block text-center border border-outline-variant/30"
              >
                Book Demo
              </Link>
            </div>
          </div>
          {/* Floating Dashboard Preview */}
          <div className="relative z-10 w-full max-w-[1000px] mt-24 mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl blur-xl opacity-50"></div>
            <div className="glass-panel rounded-xl p-2 relative overflow-hidden aspect-video shadow-2xl">
              <div className="w-full h-full bg-surface-container/50 rounded-lg border border-outline-variant/30 flex flex-col">
                {/* Mock Header */}
                <div className="h-12 border-b border-outline-variant/20 flex items-center px-4 gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                    <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  </div>
                  <div className="h-6 w-48 bg-surface-variant rounded animate-pulse"></div>
                </div>
                {/* Mock Content */}
                <div className="flex-grow p-6 flex gap-6">
                  <div className="w-2/3 flex flex-col gap-4">
                    <div className="h-48 glass-panel rounded-lg flex items-end p-4 gap-2">
                      <div className="w-1/6 bg-primary-container/20 h-1/3 rounded-t"></div>
                      <div className="w-1/6 bg-primary-container/40 h-1/2 rounded-t"></div>
                      <div className="w-1/6 bg-primary-container/60 h-2/3 rounded-t"></div>
                      <div className="w-1/6 bg-primary-container/80 h-[80%] rounded-t"></div>
                      <div className="w-1/6 bg-primary-container h-full rounded-t relative">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent to-white/20"></div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 h-24 glass-panel rounded-lg"></div>
                      <div className="flex-1 h-24 glass-panel rounded-lg"></div>
                    </div>
                  </div>
                  <div className="w-1/3 glass-panel rounded-lg p-4 flex flex-col gap-3">
                    <div className="h-8 w-24 bg-surface-variant rounded"></div>
                    <div className="h-4 w-full bg-surface-variant/50 rounded"></div>
                    <div className="h-4 w-5/6 bg-surface-variant/50 rounded"></div>
                    <div className="h-4 w-full bg-surface-variant/50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section Placeholder */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-4">Features</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Discover how Reputation Pulse empowers your brand intelligence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Real-time Tracking</h3>
              <p className="text-on-surface-variant">Monitor your brand sentiment across the web instantly.</p>
            </div>
            <div className="glass-panel p-8 rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Executive Summaries</h3>
              <p className="text-on-surface-variant">Get concise AI-generated reports tailored for leadership.</p>
            </div>
            <div className="glass-panel p-8 rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-4">Competitor Analysis</h3>
              <p className="text-on-surface-variant">Benchmark your brand against industry leaders effortlessly.</p>
            </div>
          </div>
        </section>

        {/* AI Executive Summary Placeholder */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter bg-surface-container-low">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="font-display-lg text-display-lg text-on-surface mb-6">AI Executive Summary</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Cut through the noise with actionable insights delivered directly to your inbox. Our AI synthesizes millions of data points into clear, strategic intelligence.</p>
              <Link 
                href={userEmail ? '/dashboard' : '/signup'}
                className="bg-primary-container text-on-primary-container font-label-md text-label-md px-8 py-3 rounded-lg hover:bg-primary-container/90 transition-all shadow-[0_2px_0_rgba(0,108,73,1)] hover:translate-y-[-2px] inline-block text-center"
              >
                Get Started
              </Link>
            </div>
            <div className="flex-1 w-full glass-panel rounded-xl aspect-video p-6 flex flex-col gap-4">
              <div className="h-6 w-1/3 bg-surface-variant rounded"></div>
              <div className="h-4 w-full bg-surface-variant/50 rounded"></div>
              <div className="h-4 w-5/6 bg-surface-variant/50 rounded"></div>
              <div className="h-4 w-4/5 bg-surface-variant/50 rounded"></div>
            </div>
          </div>
        </section>

        {/* How It Works Placeholder */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-display-lg text-on-surface mb-16">How Reputation Pulse Works</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <div className="flex-1 glass-panel p-8 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary font-headline-md text-headline-md">1</div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Connect Sources</h3>
              <p className="text-on-surface-variant">Integrate your social, review, and news feeds seamlessly.</p>
            </div>
            <div className="flex-1 glass-panel p-8 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-6 text-secondary font-headline-md text-headline-md">2</div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">AI Analysis</h3>
              <p className="text-on-surface-variant">Our models process and analyze sentiment in real-time.</p>
            </div>
            <div className="flex-1 glass-panel p-8 rounded-xl flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mb-6 text-tertiary font-headline-md text-headline-md">3</div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">Actionable Insights</h3>
              <p className="text-on-surface-variant">Receive automated summaries and alerts when it matters.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter bg-surface-container-low">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-16">Trusted by Growth Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-panel p-8 rounded-xl text-left">
                <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-6">&quot;Reputation Pulse has completely transformed how we monitor our brand. The AI summaries save us hours every week.&quot;</p>
                <div className="font-headline-sm text-headline-sm text-primary">Sarah Jenkins</div>
                <div className="text-on-surface-variant text-caption font-caption">CMO, TechInnovate</div>
              </div>
              <div className="glass-panel p-8 rounded-xl text-left">
                <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-6">&quot;The real-time alerts ensure we never miss a critical conversation. Essential tool for modern marketing.&quot;</p>
                <div className="font-headline-sm text-headline-sm text-secondary">David Chen</div>
                <div className="text-on-surface-variant text-caption font-caption">VP of Marketing, GlobalReach</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">How accurate is the sentiment analysis?</h3>
              <p className="text-on-surface-variant">Our AI models are trained on billions of data points and achieve over 95% accuracy in sentiment classification.</p>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Can I export the reports?</h3>
              <p className="text-on-surface-variant">Yes, all executive summaries and data can be exported to PDF, CSV, or directly integrated into your existing dashboards via API.</p>
            </div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="w-full py-section-gap px-margin-mobile md:px-gutter relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent z-0 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel p-12 rounded-2xl border border-primary/30">
            <h2 className="font-display-lg text-display-lg text-on-surface mb-6">Ready to master your brand narrative?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">Join leading companies using Reputation Pulse to stay ahead.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={userEmail ? '/dashboard' : '/signup'}
                className="bg-primary-container text-on-primary-container font-label-md text-label-md px-8 py-4 rounded-lg hover:bg-primary-container/90 transition-all shadow-[0_2px_0_rgba(0,108,73,1)] hover:translate-y-[-2px] text-lg block text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
