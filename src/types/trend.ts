export type DangerLevel = "safe" | "caution" | "danger";

export type CategorySlug =
  | "slang"
  | "hotissue"
  | "culture"
  | "food"
  | "fashion"
  | "tech"
  | "lifestyle";

export interface Trend {
  id: number;
  keyword: string;
  title: string;
  explanation: string;
  usageExample: string | null;
  usageWrong: string | null;
  category: CategorySlug;
  dangerLevel: DangerLevel;
  emoji: string;
  naverScore: number | null;
  newsCount: number | null;
  combinedScore: number | null;
  featured: boolean;
  active: boolean;
  displayDate: string;
  createdAt: string;
}

export interface Category {
  id: number;
  slug: CategorySlug;
  nameKo: string;
  emoji: string;
  color: string;
}

export interface CollectionLog {
  id: number;
  runDate: string;
  status: "success" | "partial" | "failed";
  trendsCollected: number;
  errorMessage: string | null;
  createdAt: string;
}
