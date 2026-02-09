import type { Trend } from "@/types/trend";
import { TrendCard } from "./TrendCard";

export function TrendGrid({ trends }: { trends: Trend[] }) {
  if (trends.length === 0) {
    return (
      <div className="py-16 text-center">
        <span className="text-4xl">🔍</span>
        <p className="mt-4 text-[var(--text-muted)]">
          트렌드가 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {trends.map((trend) => (
        <TrendCard key={trend.id} trend={trend} />
      ))}
    </div>
  );
}
