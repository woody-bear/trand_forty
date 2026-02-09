import type { Trend } from "@/types/trend";

export function TrendingNowBar({ trends }: { trends: Trend[] }) {
  if (trends.length === 0) return null;

  const items = trends.map((t) => `${t.emoji} ${t.keyword}`);
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] py-2">
      <div className="ticker-scroll flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-4 text-sm font-medium text-[var(--text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
