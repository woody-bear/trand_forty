import type { Trend } from "@/types/trend";
import { calculateDangerRatio, getWeatherLevel } from "@/lib/constants/weather";
import { WeatherIcon } from "./WeatherIcon";

interface TrendWeatherForecastProps {
  trends: Trend[];
}

export function TrendWeatherForecast({ trends }: TrendWeatherForecastProps) {
  if (trends.length === 0) return null;

  const ratio = calculateDangerRatio(trends);
  const weather = getWeatherLevel(ratio);

  const safeCount = trends.filter((t) => t.dangerLevel === "safe").length;
  const cautionCount = trends.filter((t) => t.dangerLevel === "caution").length;
  const dangerCount = trends.filter((t) => t.dangerLevel === "danger").length;
  const total = trends.length;

  const safePct = (safeCount / total) * 100;
  const cautionPct = (cautionCount / total) * 100;
  const dangerPct = (dangerCount / total) * 100;

  return (
    <div className="mb-4 rounded-xl border border-[var(--border-color)] px-4 py-3">
      {/* Row 1: label + weather */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[var(--text-muted)]">
          오늘의 위험도
        </span>
        <WeatherIcon level={weather.level} size={24} />
        <span className={`text-sm font-bold ${weather.colorClass}`}>
          {weather.label}
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          · {weather.description}
        </span>
      </div>

      {/* Row 2: bar + legend */}
      <div className="mt-2 flex items-center gap-3">
        <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[var(--border-color)]">
          {safePct > 0 && (
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${safePct}%` }}
            />
          )}
          {cautionPct > 0 && (
            <div
              className="bg-amber-500 transition-all duration-500"
              style={{ width: `${cautionPct}%` }}
            />
          )}
          {dangerPct > 0 && (
            <div
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${dangerPct}%` }}
            />
          )}
        </div>
        <div className="flex shrink-0 gap-2 text-[11px] text-[var(--text-muted)]">
          <span className="flex items-center gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            안심{safeCount}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            주의{cautionCount}
          </span>
          <span className="flex items-center gap-0.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
            위험{dangerCount}
          </span>
        </div>
      </div>
    </div>
  );
}
