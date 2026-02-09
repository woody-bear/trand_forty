"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Trend } from "@/types/trend";
import { TrendGrid } from "@/components/trend/TrendGrid";
import { TrendCardSkeleton } from "@/components/trend/TrendCardSkeleton";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";

  const [query, setQuery] = useState(q);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (q) {
      setLoading(true);
      fetch(`/api/trends/search?q=${encodeURIComponent(q)}`)
        .then((res) => res.json())
        .then((data) => {
          setTrends(data.trends || []);
          setLoading(false);
          setSearched(true);
        })
        .catch(() => setLoading(false));
    }
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">🔍 트렌드 검색</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="궁금한 트렌드를 검색해보세요"
            className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--color-primary-400)]"
          />
          <button
            type="submit"
            className="rounded-xl bg-[var(--color-primary-500)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-primary-600)]"
          >
            검색
          </button>
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <TrendCardSkeleton key={i} />
          ))}
        </div>
      ) : searched ? (
        <>
          <p className="mb-4 text-sm text-[var(--text-muted)]">
            &ldquo;{q}&rdquo; 검색 결과 {trends.length}개
          </p>
          <TrendGrid trends={trends} />
        </>
      ) : (
        <div className="py-12 text-center">
          <span className="text-5xl">🔎</span>
          <p className="mt-4 text-[var(--text-muted)]">
            궁금한 트렌드 키워드를 검색해 보세요
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="animate-pulse h-8 w-48 rounded bg-[var(--border-color)]" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
