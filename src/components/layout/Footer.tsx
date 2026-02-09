export function Footer() {
  return (
    <footer className="hidden border-t border-[var(--border-color)] bg-[var(--bg-secondary)] md:block">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <span className="font-semibold text-[var(--text-primary)]">
              트렌드포티
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            40대를 위한 트렌드 사전 &middot; 매일 업데이트
          </p>
          <nav className="flex gap-4 text-sm text-[var(--text-secondary)]">
            <a href="/about" className="hover:text-[var(--text-primary)]">
              소개
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
