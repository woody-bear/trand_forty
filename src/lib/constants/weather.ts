import type { Trend } from "@/types/trend";

export type WeatherLevel =
  | "sunny"
  | "partlyCloudy"
  | "cloudy"
  | "rainy"
  | "stormy";

export interface WeatherConfig {
  level: WeatherLevel;
  label: string;
  description: string;
  colorClass: string;
  bgGradient: string;
  darkBgGradient: string;
  threshold: number;
}

export const WEATHER_CONFIGS: WeatherConfig[] = [
  {
    level: "stormy",
    label: "폭풍",
    description: "매우 위험",
    colorClass: "text-red-500",
    bgGradient: "from-red-50 to-orange-50",
    darkBgGradient: "dark:from-red-950/40 dark:to-orange-950/40",
    threshold: 71,
  },
  {
    level: "rainy",
    label: "비",
    description: "다수 위험",
    colorClass: "text-blue-500",
    bgGradient: "from-blue-50 to-slate-100",
    darkBgGradient: "dark:from-blue-950/40 dark:to-slate-900/40",
    threshold: 51,
  },
  {
    level: "cloudy",
    label: "흐림",
    description: "주의 필요",
    colorClass: "text-gray-500",
    bgGradient: "from-gray-50 to-slate-100",
    darkBgGradient: "dark:from-gray-900/40 dark:to-slate-900/40",
    threshold: 31,
  },
  {
    level: "partlyCloudy",
    label: "구름 조금",
    description: "대체로 안전",
    colorClass: "text-amber-500",
    bgGradient: "from-amber-50 to-sky-50",
    darkBgGradient: "dark:from-amber-950/40 dark:to-sky-950/40",
    threshold: 16,
  },
  {
    level: "sunny",
    label: "맑음",
    description: "안전",
    colorClass: "text-emerald-500",
    bgGradient: "from-sky-50 to-emerald-50",
    darkBgGradient: "dark:from-sky-950/40 dark:to-emerald-950/40",
    threshold: 0,
  },
];

export function calculateDangerRatio(trends: Trend[]): number {
  if (trends.length === 0) return 0;

  const dangerCount = trends.filter((t) => t.dangerLevel === "danger").length;
  const cautionCount = trends.filter(
    (t) => t.dangerLevel === "caution"
  ).length;

  return ((dangerCount * 1.0 + cautionCount * 0.5) / trends.length) * 100;
}

export function getWeatherLevel(ratio: number): WeatherConfig {
  return (
    WEATHER_CONFIGS.find((config) => ratio >= config.threshold) ??
    WEATHER_CONFIGS[WEATHER_CONFIGS.length - 1]
  );
}
