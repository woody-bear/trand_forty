import Link from "next/link";
import type { Trend } from "@/types/trend";
import { DangerBadge } from "./DangerBadge";
import { CategoryBadge } from "./CategoryBadge";
import { UsageExample } from "./UsageExample";
import type { DangerLevel } from "@/types/trend";

export function TrendCard({ trend }: { trend: Trend }) {
  return (
    <Link href={`/trend/${trend.id}`}>
      <article className="group h-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="mb-3 flex items-center justify-between">
          <CategoryBadge slug={trend.category} />
          <DangerBadge level={trend.dangerLevel as DangerLevel} />
        </div>

        <div className="mb-2">
          <span className="mr-2 text-2xl">{trend.emoji}</span>
          <h3 className="inline text-lg font-bold text-[var(--text-primary)]">
            {trend.keyword}
          </h3>
        </div>

        <p className="mb-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          {trend.explanation}
        </p>

        {trend.usageExample && (
          <UsageExample text={trend.usageExample} type="correct" />
        )}

        {trend.usageWrong && (
          <UsageExample text={trend.usageWrong} type="wrong" />
        )}
      </article>
    </Link>
  );
}
