"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Trend, DangerLevel } from "@/types/trend";
import { DangerBadge } from "@/components/trend/DangerBadge";
import { CategoryBadge } from "@/components/trend/CategoryBadge";
import { UsageExample } from "@/components/trend/UsageExample";

export default function TrendDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [trend, setTrend] = useState<Trend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trends/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrend(data.trend || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 rounded bg-[var(--border-color)]" />
          <div className="h-10 w-64 rounded bg-[var(--border-color)]" />
          <div className="h-24 rounded bg-[var(--border-color)]" />
        </div>
      </div>
    );
  }

  if (!trend) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="text-5xl">😢</span>
        <h1 className="mt-4 text-xl font-bold">트렌드를 찾을 수 없습니다</h1>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full bg-[var(--color-primary-500)] px-6 py-2 text-sm text-white"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        ← 돌아가기
      </Link>

      <article>
        <div className="mb-4 flex items-center gap-2">
          <CategoryBadge slug={trend.category} />
          <DangerBadge level={trend.dangerLevel as DangerLevel} />
        </div>

        <div className="mb-4">
          <span className="mr-2 text-4xl">{trend.emoji}</span>
          <h1 className="inline text-3xl font-bold">{trend.title}</h1>
        </div>

        <div className="mb-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            {trend.explanation}
          </p>
        </div>

        {trend.usageExample && (
          <div className="mb-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
            <h2 className="mb-3 text-lg font-semibold">💬 이렇게 쓰세요</h2>
            <UsageExample text={trend.usageExample} type="correct" />
          </div>
        )}

        {trend.usageWrong && (
          <div className="mb-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
            <h2 className="mb-3 text-lg font-semibold">❌ 이렇게 쓰면 안 돼요</h2>
            <UsageExample text={trend.usageWrong} type="wrong" />
          </div>
        )}

        <div className="mt-6 text-xs text-[var(--text-muted)]">
          📅 {trend.displayDate} 등록
        </div>
      </article>
    </div>
  );
}
