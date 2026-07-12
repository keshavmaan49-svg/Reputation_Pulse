/* eslint-disable @next/next/no-img-element */
'use client'

export default function Contact() {
  return (
    <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-section-gap animate-fade-in">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-6">Get in Touch</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant font-normal">Whether you&apos;re looking to scale your monitoring operations or need technical support, our team is ready to assist.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-start">
        {/* Left Side: Contact Info & Map */}
        <div className="space-y-8">
          <div className="glass-panel p-8 rounded-xl">
            <h2 className="font-headline-sm text-headline-sm mb-6 text-primary">Direct Lines</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>headset_mic</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface mb-1">Sales &amp; Enterprise</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">sales@reputationpulse.com</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">+1 (800) 555-0199</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary/20 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface mb-1">Technical Support</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">support@reputationpulse.com</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">24/7 Priority Support available</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-tertiary group-hover:bg-tertiary/20 transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface mb-1">Global Headquarters</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">100 Tech Corridor, Suite 400</p>
                  <p className="font-body-md text-body-md text-on-surface-variant">San Francisco, CA 94107</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-panel rounded-xl overflow-hidden h-64 relative border border-outline-variant/30">
            <img 
              className="w-full h-full object-cover opacity-80 mix-blend-screen" 
              alt="A sleek, highly stylized dark-mode map of San Francisco showing the tech district." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARveyaUU1nvGxopSKAwtsCTbzH9lTrrPBvFjA8vxutRsBOjZvAOigEgE0Qj33C0zqba2M86pg5Ar1BkoD-AiwLb5HEOaQjWKQqdARQjYeJM202M7ReWr2nNnUE5TmUOy2DE0BAyvQJXaMBnc59b7L50sQQ_gvzp8CJCvnnr1PivT6RYasIEMleiyaImfyzkxAM4_CmtWcmaACtso0derEO1Fh2U5vMcTuAVV-Ddkm2SIW8QKG4a-xD1d0MHly_9nc1yvLaYKfGfAte" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
          </div>
        </div>
        {/* Right Side: Contact Form */}
        <div className="glass-panel p-8 md:p-12 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">First Name</label>
                <input className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md shadow-inner" type="text" />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Last Name</label>
                <input className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md shadow-inner" type="text" />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Work Email</label>
              <input className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md shadow-inner" type="email" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Company Size</label>
              <div className="relative">
                <select className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md shadow-inner appearance-none">
                  <option>1-50 Employees</option>
                  <option>51-200 Employees</option>
                  <option>201-1000 Employees</option>
                  <option>1000+ Employees</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">How can we help?</label>
              <textarea className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body-md text-body-md shadow-inner resize-none" rows={4}></textarea>
            </div>
            <button className="w-full bg-primary-container text-on-primary-fixed-variant hover:bg-primary transition-all duration-300 py-4 rounded-lg font-headline-sm text-headline-sm font-bold shadow-[0_4px_0_rgba(0,108,73,1)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgba(0,108,73,1)] flex justify-center items-center gap-2 cursor-pointer" type="submit">
              Send Message
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>
        </div>
      </div>
      <div className="mt-24 text-center">
        <a className="inline-flex items-center gap-3 glass-panel px-8 py-4 rounded-full text-on-surface hover:text-primary hover:border-primary/50 transition-all duration-300 font-label-md text-label-md" href="#">
          <span className="material-symbols-outlined text-primary">calendar_month</span>
          Book a direct demo with our executive team
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </a>
      </div>
    </main>
  )
}
