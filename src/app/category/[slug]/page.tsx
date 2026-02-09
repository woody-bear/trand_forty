"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Trend } from "@/types/trend";
import { getCategoryBySlug, CATEGORIES } from "@/lib/constants/categories";
import { TrendGrid } from "@/components/trend/TrendGrid";
import { TrendCardSkeleton } from "@/components/trend/TrendCardSkeleton";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = getCategoryBySlug(slug);

  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/trends?category=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setTrends(data.trends || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                cat.slug === slug
                  ? "text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
              }`}
              style={
                cat.slug === slug
                  ? { backgroundColor: cat.color }
                  : undefined
              }
            >
              {cat.emoji} {cat.nameKo}
            </Link>
          ))}
        </div>

        {category && (
          <h1 className="text-2xl font-bold">
            {category.emoji} {category.nameKo}
          </h1>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <TrendCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <TrendGrid trends={trends} />
      )}
    </div>
  );
}
