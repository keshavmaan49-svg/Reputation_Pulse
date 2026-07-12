/* eslint-disable @next/next/no-img-element */
'use client'

export default function About() {
  return (
    <main className="relative z-10 animate-fade-in">
      {/* Hero Section */}
      <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto pt-32 pb-24 flex flex-col items-center text-center">
        <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">Corporate Identity</span>
        <h1 className="font-display-xl text-display-xl text-on-surface mb-8 max-w-4xl">
          The Team Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Pulse</span>.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto font-normal">
          We are a collective of data scientists, engineers, and strategists dedicated to architecting the most precise reputation intelligence engine on the market.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-section-gap border-y border-outline-variant/10 relative">
        <div className="absolute inset-0 bg-surface-bright/5 backdrop-blur-sm -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
          <h2 className="font-display-lg text-display-lg text-on-surface leading-tight">
            &quot;Bringing absolute clarity to the global conversation, enabling executives to navigate sentiment with mathematical precision.&quot;
          </h2>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-section-gap">
        <div className="mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Leadership Core</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Decades of combined experience in artificial intelligence and global data architecture.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="group cursor-pointer">
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-6 relative glass-panel">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                alt="Elena Rostova, Founder & CEO" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6P6m8F6z9pPDz4KDPM_ana-K4uxDNNSKswGYV-n-Cc6bvdyoCcgMMWhrMbCpeDcqaXaX8T7N_LbW2rMOOt06mqLQIYdgIc1lizontQkfjRITtRiSEy2yfMgXAxcabw0jrkLBSqHERvDe3WJKnymn-jh5p9xwmEhCCxNT1vQ8VTj36CPfglB9wMAuULBOnLzImQ2tQmIf_Y6wD69X0sZzvKw_k1tpnNyJ5MsmwJ8dbAl0fsb1O82x9yjO-sw2MbWd1WKmeQ9dr9_XF" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Elena Rostova</h3>
            <p className="font-label-md text-label-md text-primary mt-1">Founder &amp; CEO</p>
          </div>
          {/* Team Member 2 */}
          <div className="group cursor-pointer">
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-6 relative glass-panel">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                alt="Marcus Vance, Chief Technology Officer" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxxqYFvCZ45ph0pwXeFnZwT9itOZyIwoh6Nrlxncqirv32GBqDkVUaaq5R7EyML_HyKzsBVjYak0tSzJ03ugmD2P1JE-8pfXpj0Lhzkd_H3XbSIgWkKfPrAj_4_GuqdPZ8YaaJZz2IQC_doliWAkm9z_noSwV35JiAz9GUwUUNUDR37VFpweo_POV2DWWNOr2ffLSBn4EOAtesCRYc8-A_tLz6Wh7HzgroiZ1Y0nDFRREWYTmnf02O4aze8PLH_O_QBHpMuIfuBCBL" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Marcus Vance</h3>
            <p className="font-label-md text-label-md text-primary mt-1">Chief Technology Officer</p>
          </div>
          {/* Team Member 3 */}
          <div className="group cursor-pointer">
            <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-6 relative glass-panel">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0" 
                alt="Dr. Sarah Lin, Head of Artificial Intelligence" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2YI-klEpd7MlqiKm7_krgZaJy5znXvpK0lIS9T9VG37O9eHk6wWv9YdG-2yd16TJaTFZoMw89P6I51-XfbN6Prqqcs5W40yNmEALZC6ojtbmTChB__49pm-VbpXk89jqKmY-nE1Wwn0g-Qs6jk0MSHgys76UXtEHSsnuh9Djc-uC7zawFvinnnNkoBXc3fUXYFsG4wUIs6stcIm-N4TSqEXXengkw-iUoth5NZuDLwMG4MSc9dSYIqwbOjVAz5SsCiW7kqnwBrm-9" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Dr. Sarah Lin</h3>
            <p className="font-label-md text-label-md text-primary mt-1">Head of Artificial Intelligence</p>
          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-section-gap">
        <div className="mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Core Operating Principles</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">The foundations that dictate our engineering and client relations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-panel glass-panel-active rounded-xl p-8 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
              <span className="material-symbols-outlined text-primary">visibility</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Total Transparency</h3>
            <p className="font-body-md text-body-md text-on-surface-variant font-normal">
              Every data point, sentiment score, and source is traceable. We believe black-box algorithms have no place in enterprise decision-making.
            </p>
          </div>
          {/* Card 2 */}
          <div className="glass-panel glass-panel-active rounded-xl p-8 transition-all duration-300 md:-translate-y-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6 border border-secondary/20">
              <span className="material-symbols-outlined text-secondary">my_location</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Unrelenting Precision</h3>
            <p className="font-body-md text-body-md text-on-surface-variant font-normal">
              Our NLP models are continuously calibrated to eliminate noise. We deliver signal, cleanly separated from the chaos of the public web.
            </p>
          </div>
          {/* Card 3 */}
          <div className="glass-panel glass-panel-active rounded-xl p-8 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center mb-6 border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary">lightbulb</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">Rapid Innovation</h3>
            <p className="font-body-md text-body-md text-on-surface-variant font-normal">
              The conversation evolves in milliseconds. Our architecture is designed for extreme velocity, adapting to new platforms and linguistics instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="w-full px-margin-mobile md:px-gutter max-w-container-max mx-auto py-section-gap border-t border-outline-variant/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/20">
          <div className="text-center px-4">
            <div className="font-display-lg text-display-lg text-primary mb-2">12+</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Years Data Experience</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display-lg text-display-lg text-primary mb-2">45</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Global Datacenters</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display-lg text-display-lg text-primary mb-2">99.9%</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Analysis Accuracy</div>
          </div>
          <div className="text-center px-4">
            <div className="font-display-lg text-display-lg text-primary mb-2">24/7</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Live Monitoring</div>
          </div>
        </div>
      </section>
    </main>
  )
}
