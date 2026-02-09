"use client";

import { useEffect, useState } from "react";
import type { Trend } from "@/types/trend";
import { HeroSection } from "@/components/home/HeroSection";
import { TrendingNowBar } from "@/components/home/TrendingNowBar";
import { CategoryTabs } from "@/components/home/CategoryTabs";
import { TrendGrid } from "@/components/trend/TrendGrid";
import { TrendCardSkeleton } from "@/components/trend/TrendCardSkeleton";

export default function HomePage() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/trends")
      .then((res) => res.json())
      .then((data) => {
        setTrends(data.trends || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = trends.find((t) => t.featured);
  const filtered =
    activeCategory === "all"
      ? trends
      : trends.filter((t) => t.category === activeCategory);

  return (
    <>
      <TrendingNowBar trends={trends.slice(0, 8)} />
      <div className="mx-auto max-w-5xl px-4 py-6">
        <HeroSection trend={featured || null} trends={trends} />

        <section>
          <div className="mb-4">
            <CategoryTabs
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <TrendCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <TrendGrid trends={filtered} />
          )}
        </section>
      </div>
    </>
  );
}
