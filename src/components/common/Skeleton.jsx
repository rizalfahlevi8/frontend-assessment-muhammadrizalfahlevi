export function TableSkeleton({ rows = 4 }) {
  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50/70 p-4">
        <div className="h-4 bg-slate-200 rounded-md w-1/4 animate-pulse" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="p-4 flex items-center justify-between gap-4 animate-pulse">
            <div className="flex items-center gap-3 w-1/3">
              <div className="w-8 h-8 rounded-lg bg-slate-200 shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3.5 bg-slate-200 rounded-md w-3/4" />
                <div className="h-2.5 bg-slate-100 rounded-md w-1/2" />
              </div>
            </div>
            <div className="h-6 bg-slate-100 rounded-full w-24" />
            <div className="h-4 bg-slate-200 rounded-md w-20" />
            <div className="h-6 bg-slate-100 rounded-full w-20" />
            <div className="h-4 bg-slate-200 rounded-md w-24" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              <div className="w-8 h-8 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
