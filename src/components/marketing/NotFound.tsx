/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center relative w-full pt-20 pb-section-gap px-margin-mobile md:px-gutter z-10 animate-fade-in">
      {/* Atmospheric Background Element */}
      <div className="absolute inset-0 radial-gradient-bg pointer-events-none"></div>
      <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        {/* Illustration / Visual Anchor */}
        <div className="md:col-span-6 flex justify-center md:justify-end relative order-2 md:order-1 mt-12 md:mt-0">
          <div className="relative w-full max-w-[400px] aspect-square">
            <img 
              className="object-cover w-full h-full rounded-2xl glass-panel p-4" 
              alt="A high-end, premium abstract 3D illustration of a futuristic, glowing data pulse or lost satellite slowly fading into a deep, dark navy space void." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9Aa3P9nbFSVYDRVRIVBwM0WNL1dGtL_2CXdfNenwVGSpN_3bwNlzMs9y7eEHvC78Lp5GDX3UcxfYvLYwXOvFqRIPVwl-zC2pGKnWeGtR8SKgVwdzWBxv9e4Kv-GcBMT1gGSufiY507MrLFYDi_rz9qMx6SyO2wNXKZTqEI73WpeivhsiLWACdGuBj1JPpJnq63cJxG83Cs5_kWupQQARUGidDb4BahQUvuSQbFzGASE-wFKKvPCfa8ca_yQgl0yFFvH4HMkEIvQ8Z" 
            />
            {/* Floating decorative elements */}
            <div className="absolute top-10 -left-6 w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center animate-[bounce_4s_ease-in-out_infinite]">
              <span className="material-symbols-outlined text-primary/50" style={{ fontVariationSettings: "'FILL' 0" }}>satellite_alt</span>
            </div>
            <div className="absolute bottom-20 -right-4 w-8 h-8 rounded-full border border-secondary/20 flex items-center justify-center animate-[bounce_5s_ease-in-out_infinite_reverse]">
              <span className="material-symbols-outlined text-secondary/40 text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>data_loss_prevention</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 space-y-6">
          <h1 className="font-display-xl text-display-xl text-primary drop-shadow-[0_0_15px_rgba(78,222,163,0.3)]">404</h1>
          <h2 className="font-headline-md text-headline-md text-on-surface">Signal Lost</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md font-normal">
            The pulse has faded. We couldn&apos;t find the data trajectory you&apos;re looking for. It may have been relocated or completely absorbed by the void.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link 
              className="inline-flex items-center justify-center px-6 py-3 rounded bg-primary-container text-on-primary-container font-label-md text-label-md shadow-[0_2px_0_rgba(0,56,36,0.5)] hover:bg-primary transition-colors active:scale-95 duration-200" 
              href="/"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0" }}>home</span>
              Return Home
            </Link>
            <Link 
              className="inline-flex items-center justify-center px-6 py-3 rounded border border-white/10 text-on-surface font-label-md text-label-md hover:border-secondary hover:text-secondary transition-colors glass-panel active:scale-95 duration-200" 
              href="/dashboard"
            >
              <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
