export function TrendCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5">
      <div className="mb-3 flex justify-between">
        <div className="h-5 w-20 rounded-full bg-[var(--border-color)]" />
        <div className="h-5 w-16 rounded-full bg-[var(--border-color)]" />
      </div>
      <div className="mb-2 h-7 w-32 rounded bg-[var(--border-color)]" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-[var(--border-color)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--border-color)]" />
      </div>
      <div className="mt-4 h-10 w-full rounded-lg bg-[var(--border-color)]" />
    </div>
  );
}
