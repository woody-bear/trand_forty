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
    <div className="mb-3 flex items-center gap-3">
      {/* Weather icon + label inline */}
      <div className="flex items-center gap-1.5">
        <WeatherIcon level={weather.level} size={28} />
        <span className={`text-sm font-semibold ${weather.colorClass}`}>
          {weather.label}
        </span>
      </div>

      {/* Compact bar + counts */}
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border-color)]">
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
        <span className="shrink-0 text-[11px] text-[var(--text-muted)]">
          {safeCount}·{cautionCount}·{dangerCount}
        </span>
      </div>
    </div>
  );
}
