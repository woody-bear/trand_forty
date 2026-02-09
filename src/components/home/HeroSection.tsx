import type { Trend, DangerLevel } from "@/types/trend";
import { DangerBadge } from "@/components/trend/DangerBadge";
import { CategoryBadge } from "@/components/trend/CategoryBadge";
import Link from "next/link";

export function HeroSection({ trend }: { trend: Trend | null }) {
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (!trend) {
    return (
      <section className="mb-8">
        <p className="mb-2 text-sm text-[var(--text-muted)]">📅 {today}</p>
        <h2 className="mb-4 text-xl font-bold">오늘의 필수 트렌드</h2>
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-[var(--text-muted)]">오늘의 트렌드를 준비 중이에요...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <p className="mb-2 text-sm text-[var(--text-muted)]">📅 {today}</p>
      <h2 className="mb-4 text-xl font-bold">오늘의 필수 트렌드</h2>
      <Link href={`/trend/${trend.id}`}>
        <div className="glass group rounded-2xl p-6 transition-all hover:shadow-lg">
          <div className="mb-3 flex items-center justify-between">
            <CategoryBadge slug={trend.category} />
            <DangerBadge level={trend.dangerLevel as DangerLevel} />
          </div>

          <div className="mb-3">
            <span className="mr-2 text-3xl">{trend.emoji}</span>
            <h3 className="inline text-2xl font-bold">{trend.title}</h3>
          </div>

          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            {trend.explanation}
          </p>

          {trend.usageExample && (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-medium text-[var(--text-muted)]">
                💬 이렇게 쓰세요:
              </p>
              <div className="bubble text-sm">
                &ldquo;{trend.usageExample}&rdquo;
              </div>
            </div>
          )}

          <p className="mt-4 text-right text-xs text-[var(--color-primary-400)] group-hover:text-[var(--color-primary-500)]">
            자세히 보기 →
          </p>
        </div>
      </Link>
    </section>
  );
}
