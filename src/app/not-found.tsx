import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-20 text-center">
      <span className="text-6xl">🤷</span>
      <h1 className="mt-6 text-2xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        찾으시는 페이지가 없습니다. 주소를 확인해 주세요.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[var(--color-primary-500)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-600)]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
