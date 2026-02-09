"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          <span className="text-lg font-bold text-[var(--text-primary)]">
            트렌드포티
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden sm:block">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="트렌드 검색..."
                className="h-9 w-48 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 pr-8 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none transition-all focus:w-64 focus:border-[var(--color-primary-400)]"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              >
                🔍
              </button>
            </div>
          </form>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
