"use client";

import { CATEGORIES } from "@/lib/constants/categories";

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onChange("all")}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active === "all"
            ? "bg-[var(--color-primary-500)] text-white"
            : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
        }`}
      >
        전체
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === cat.slug
              ? "text-white"
              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)]"
          }`}
          style={
            active === cat.slug ? { backgroundColor: cat.color } : undefined
          }
        >
          {cat.emoji} {cat.nameKo}
        </button>
      ))}
    </div>
  );
}
