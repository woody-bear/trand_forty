import type { DangerLevel } from "@/types/trend";

const config: Record<DangerLevel, { icon: string; label: string; className: string }> = {
  safe: {
    icon: "🟢",
    label: "안심",
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  caution: {
    icon: "🟡",
    label: "주의",
    className: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  danger: {
    icon: "🔴",
    label: "위험",
    className: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function DangerBadge({ level }: { level: DangerLevel }) {
  const { icon, label, className } = config[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {icon} {label}
    </span>
  );
}
