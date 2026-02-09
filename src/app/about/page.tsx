import Link from "next/link";
import { CATEGORIES } from "@/lib/constants/categories";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">📈 트렌드포티란?</h1>

      <div className="space-y-6">
        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-3 text-xl font-semibold">🎯 왜 만들었나요?</h2>
          <p className="leading-relaxed text-[var(--text-secondary)]">
            40대, 대화에서 뒤처지고 싶지 않잖아요. &ldquo;두쫀크가 뭐야?&rdquo;
            &ldquo;스우파가 뭔데?&rdquo; 이런 질문을 자녀나 동료에게 하기 민망할 때,
            트렌드포티가 짧고 깔끔하게 설명해 드립니다.
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-3 text-xl font-semibold">🚦 위험도 시스템</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm dark:bg-emerald-900/30">
                🟢 안심
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                자유롭게 쓰세요! 자연스러운 표현이에요.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm dark:bg-amber-900/30">
                🟡 주의
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                상황 봐서 쓰세요. 약간 유행이 지났거나 TPO를 가려야 해요.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-red-50 px-3 py-1 text-sm dark:bg-red-900/30">
                🔴 위험
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                쓰지 마세요! 40대가 쓰면 민망해요.
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-3 text-xl font-semibold">📂 카테고리</h2>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 rounded-xl bg-[var(--bg-secondary)] px-4 py-3 text-sm transition-colors hover:bg-[var(--border-color)]"
              >
                <span>{cat.emoji}</span>
                <span className="font-medium">{cat.nameKo}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
          <h2 className="mb-3 text-xl font-semibold">⚙️ 이렇게 작동해요</h2>
          <ol className="list-inside list-decimal space-y-2 text-sm text-[var(--text-secondary)]">
            <li>매일 네이버 트렌드와 뉴스에서 화제 키워드를 수집해요</li>
            <li>AI가 40대 눈높이로 설명을 만들어요</li>
            <li>위험도를 판단해서 태그를 붙여요</li>
            <li>실제 사용 예시까지 제공해 드려요</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
