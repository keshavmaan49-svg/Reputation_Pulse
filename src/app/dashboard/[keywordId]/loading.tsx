export default function BrandLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header Skeleton */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="h-6 w-36 bg-slate-900 rounded-lg animate-pulse" />
          <div className="h-8 w-28 bg-slate-900 rounded-xl animate-pulse" />
        </div>
        <div className="h-8 w-24 bg-slate-900 rounded-xl animate-pulse" />
      </header>

      {/* Main Skeleton Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 space-y-8">
        {/* Title skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-8 w-64 bg-slate-900 rounded-lg animate-pulse" />
            <div className="h-4 w-40 bg-slate-900/60 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-24 bg-slate-900 rounded-xl animate-pulse" />
        </div>

        {/* Layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Reputation Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[250px] bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse" />
              <div className="h-[250px] bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse" />
            </div>
            {/* Chart */}
            <div className="h-[350px] bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse" />
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="h-[120px] bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse" />
            <div className="h-[380px] bg-slate-900/20 border border-slate-900 rounded-2xl animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  )
}
