import type { WeatherLevel } from "@/lib/constants/weather";

interface WeatherIconProps {
  level: WeatherLevel;
  size?: number;
}

function SunnyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun rays */}
      <g stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round">
        <line x1="32" y1="4" x2="32" y2="12" />
        <line x1="32" y1="52" x2="32" y2="60" />
        <line x1="4" y1="32" x2="12" y2="32" />
        <line x1="52" y1="32" x2="60" y2="32" />
        <line x1="12.2" y1="12.2" x2="17.9" y2="17.9" />
        <line x1="46.1" y1="46.1" x2="51.8" y2="51.8" />
        <line x1="12.2" y1="51.8" x2="17.9" y2="46.1" />
        <line x1="46.1" y1="17.9" x2="51.8" y2="12.2" />
      </g>
      {/* Sun body */}
      <circle cx="32" cy="32" r="14" fill="#FBBF24" />
      <circle cx="32" cy="32" r="10" fill="#FCD34D" />
      <circle cx="27" cy="28" r="3" fill="#FDE68A" opacity="0.6" />
    </svg>
  );
}

function PartlyCloudyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sun behind */}
      <g stroke="#FBBF24" strokeWidth="2" strokeLinecap="round">
        <line x1="40" y1="6" x2="40" y2="12" />
        <line x1="54" y1="12" x2="50" y2="16" />
        <line x1="58" y1="24" x2="52" y2="24" />
      </g>
      <circle cx="40" cy="24" r="11" fill="#FBBF24" />
      <circle cx="40" cy="24" r="8" fill="#FCD34D" />
      {/* Cloud */}
      <path
        d="M16 44c-4.4 0-8-3.6-8-8 0-3.9 2.8-7.1 6.5-7.8C15.5 23.4 19.8 20 25 20c5.5 0 10.1 3.8 11.3 9 .6-.1 1.1-.2 1.7-.2 4.4 0 8 3.6 8 8s-3.6 8-8 8H16z"
        fill="#E2E8F0"
      />
      <path
        d="M20 44c-3.3 0-6-2.7-6-6 0-2.9 2.1-5.3 4.9-5.8C19.6 28 23.3 25 28 25c4.1 0 7.6 2.8 8.5 6.7.4-.1.9-.2 1.3-.2 3.3 0 6 2.7 6 6"
        fill="#F1F5F9"
      />
    </svg>
  );
}

function CloudyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back cloud */}
      <path
        d="M22 28c-3.3 0-6-2.7-6-6s2.7-6 6-6c.4 0 .8 0 1.1.1C24.5 12.8 27.9 10 32 10c4.4 0 8 3.2 8.7 7.4.4-.1.9-.1 1.3-.1 3.9 0 7 3.1 7 7s-3.1 7-7 7H22z"
        fill="#CBD5E1"
      />
      {/* Front cloud */}
      <path
        d="M16 48c-4.4 0-8-3.6-8-8 0-3.9 2.8-7.1 6.5-7.8C15.5 27.4 19.8 24 25 24c5.5 0 10.1 3.8 11.3 9 .6-.1 1.1-.2 1.7-.2 4.4 0 8 3.6 8 8s-3.6 8-8 8H16z"
        fill="#E2E8F0"
      />
      <path
        d="M20 48c-3.3 0-6-2.7-6-6 0-2.9 2.1-5.3 4.9-5.8C19.6 32 23.3 29 28 29c4.1 0 7.6 2.8 8.5 6.7.4-.1.9-.2 1.3-.2 3.3 0 6 2.7 6 6"
        fill="#F1F5F9"
      />
    </svg>
  );
}

function RainyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cloud */}
      <path
        d="M16 36c-4.4 0-8-3.6-8-8 0-3.9 2.8-7.1 6.5-7.8C15.5 15.4 19.8 12 25 12c5.5 0 10.1 3.8 11.3 9 .6-.1 1.1-.2 1.7-.2 4.4 0 8 3.6 8 8s-3.6 8-8 8H16z"
        fill="#94A3B8"
      />
      <path
        d="M20 36c-3.3 0-6-2.7-6-6 0-2.9 2.1-5.3 4.9-5.8C19.6 20 23.3 17 28 17c4.1 0 7.6 2.8 8.5 6.7.4-.1.9-.2 1.3-.2 3.3 0 6 2.7 6 6"
        fill="#B0BEC5"
      />
      {/* Rain drops */}
      <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="40" x2="15" y2="48" />
        <line x1="26" y1="40" x2="23" y2="50" />
        <line x1="34" y1="40" x2="31" y2="48" />
        <line x1="22" y1="50" x2="20" y2="55" />
        <line x1="30" y1="49" x2="28" y2="55" />
      </g>
    </svg>
  );
}

function StormyIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dark cloud */}
      <path
        d="M16 34c-4.4 0-8-3.6-8-8 0-3.9 2.8-7.1 6.5-7.8C15.5 13.4 19.8 10 25 10c5.5 0 10.1 3.8 11.3 9 .6-.1 1.1-.2 1.7-.2 4.4 0 8 3.6 8 8s-3.6 8-8 8H16z"
        fill="#64748B"
      />
      <path
        d="M20 34c-3.3 0-6-2.7-6-6 0-2.9 2.1-5.3 4.9-5.8C19.6 18 23.3 15 28 15c4.1 0 7.6 2.8 8.5 6.7.4-.1.9-.2 1.3-.2 3.3 0 6 2.7 6 6"
        fill="#7C8EA3"
      />
      {/* Lightning bolt */}
      <polygon points="30,36 24,47 29,47 26,58 38,44 32,44 36,36" fill="#FBBF24" />
      {/* Rain drops */}
      <g stroke="#60A5FA" strokeWidth="2" strokeLinecap="round">
        <line x1="14" y1="38" x2="12" y2="44" />
        <line x1="20" y1="40" x2="18" y2="46" />
        <line x1="40" y1="38" x2="38" y2="44" />
        <line x1="44" y1="40" x2="42" y2="46" />
      </g>
    </svg>
  );
}

const ICON_MAP: Record<WeatherLevel, React.FC<{ size: number }>> = {
  sunny: SunnyIcon,
  partlyCloudy: PartlyCloudyIcon,
  cloudy: CloudyIcon,
  rainy: RainyIcon,
  stormy: StormyIcon,
};

export function WeatherIcon({ level, size = 56 }: WeatherIconProps) {
  const Icon = ICON_MAP[level];
  return (
    <div
      className="inline-flex shrink-0"
      style={{ animation: "weather-float 3s ease-in-out infinite" }}
    >
      <Icon size={size} />
    </div>
  );
}
