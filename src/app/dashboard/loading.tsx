export default function OverviewLoading() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Skeleton Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="h-6 w-36 bg-slate-900 rounded-lg animate-pulse" />
          <div className="h-8 w-24 bg-slate-900 rounded-xl animate-pulse hidden sm:block" />
        </div>
        <div className="h-8 w-24 bg-slate-900 rounded-xl animate-pulse" />
      </header>

      {/* Main Skeleton Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 space-y-10">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-slate-900 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-slate-900/60 rounded-lg animate-pulse" />
        </div>

        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-3 shadow-xl">
              <div className="h-4 w-20 bg-slate-900 rounded animate-pulse" />
              <div className="h-8 w-16 bg-slate-900 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>

        {/* Brand Grid Skeleton */}
        <div className="space-y-6">
          <div className="h-6 w-32 bg-slate-900 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-6 shadow-xl">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-24 bg-slate-900 rounded animate-pulse" />
                  <div className="h-6 w-12 bg-slate-900 rounded-full animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-900/60 rounded animate-pulse" />
                  <div className="h-3 w-4/5 bg-slate-900/60 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-slate-900 rounded-xl animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
