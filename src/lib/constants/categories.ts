import type { CategorySlug } from "@/types/trend";

export interface CategoryDef {
  slug: CategorySlug;
  nameKo: string;
  emoji: string;
  color: string;
  seedKeywords: string[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "slang",
    nameKo: "신조어/밈",
    emoji: "💬",
    color: "#6366f1",
    seedKeywords: [
      "신조어",
      "유행어",
      "밈",
      "줄임말",
      "MZ세대 용어",
      "인터넷 밈",
      "틱톡 유행어",
    ],
  },
  {
    slug: "hotissue",
    nameKo: "핫이슈",
    emoji: "🔥",
    color: "#ef4444",
    seedKeywords: [
      "화제",
      "논란",
      "이슈",
      "실검",
      "핫이슈",
      "속보",
      "화제의 인물",
    ],
  },
  {
    slug: "culture",
    nameKo: "문화/콘텐츠",
    emoji: "🎬",
    color: "#f59e0b",
    seedKeywords: [
      "넷플릭스 인기",
      "드라마 추천",
      "유튜브 화제",
      "영화 흥행",
      "웹툰 인기",
      "예능 화제",
    ],
  },
  {
    slug: "food",
    nameKo: "맛집/카페",
    emoji: "🍽️",
    color: "#10b981",
    seedKeywords: [
      "맛집",
      "카페 트렌드",
      "디저트",
      "음식 트렌드",
      "핫플레이스",
      "먹방",
    ],
  },
  {
    slug: "fashion",
    nameKo: "패션/뷰티",
    emoji: "👗",
    color: "#ec4899",
    seedKeywords: [
      "패션 트렌드",
      "뷰티 트렌드",
      "스타일",
      "코디",
      "화장품 추천",
      "헤어 트렌드",
    ],
  },
  {
    slug: "tech",
    nameKo: "IT/테크",
    emoji: "📱",
    color: "#3b82f6",
    seedKeywords: [
      "AI",
      "앱 추천",
      "가젯",
      "스마트폰",
      "테크 트렌드",
      "IT 서비스",
    ],
  },
  {
    slug: "lifestyle",
    nameKo: "라이프",
    emoji: "🏡",
    color: "#8b5cf6",
    seedKeywords: [
      "라이프스타일",
      "취미",
      "여가",
      "건강",
      "운동 트렌드",
      "자기계발",
    ],
  },
];

export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug);
