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
    <div
      className={`mb-4 rounded-2xl bg-gradient-to-r ${weather.bgGradient} ${weather.darkBgGradient} border border-[var(--border-color)] p-4`}
    >
      {/* Header: Icon + Label + Description */}
      <div className="flex items-center gap-3">
        <WeatherIcon level={weather.level} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">
              트렌드 날씨
            </span>
            <span className={`text-base font-bold ${weather.colorClass}`}>
              {weather.label}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
            {weather.description}
          </p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-[var(--border-color)]">
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

      {/* Legend */}
      <div className="mt-2 flex gap-4 text-xs text-[var(--text-secondary)]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          안심 {safeCount}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
          주의 {cautionCount}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
          위험 {dangerCount}
        </span>
      </div>
    </div>
  );
}
