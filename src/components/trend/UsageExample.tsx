export function UsageExample({
  text,
  type = "correct",
}: {
  text: string;
  type?: "correct" | "wrong";
}) {
  const isWrong = type === "wrong";

  return (
    <div className="mt-3">
      <p className="mb-1.5 text-xs font-medium text-[var(--text-muted)]">
        {isWrong ? "❌ 이렇게 쓰면 안 돼요:" : "💬 이렇게 쓰세요:"}
      </p>
      <div
        className={`bubble text-sm ${
          isWrong
            ? "!bg-red-50 dark:!bg-red-900/20"
            : ""
        }`}
      >
        &ldquo;{text}&rdquo;
      </div>
    </div>
  );
}
