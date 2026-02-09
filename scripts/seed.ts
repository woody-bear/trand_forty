import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { categories, trends, seedKeywords } from "../src/lib/db/schema";
import { CATEGORIES } from "../src/lib/constants/categories";

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./data/local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken });
const db = drizzle(client);

const today = new Date().toISOString().split("T")[0];

async function seed() {
  console.log("📦 Creating tables...");

  await client.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      name_ko TEXT NOT NULL,
      emoji TEXT NOT NULL,
      color TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS trends (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      keyword TEXT NOT NULL,
      title TEXT NOT NULL,
      explanation TEXT NOT NULL,
      usage_example TEXT,
      usage_wrong TEXT,
      category TEXT NOT NULL,
      danger_level TEXT NOT NULL DEFAULT 'safe',
      emoji TEXT NOT NULL DEFAULT '📌',
      naver_score REAL,
      news_count INTEGER,
      combined_score REAL,
      featured INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      display_date TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS seed_keywords (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_slug TEXT NOT NULL,
      keyword TEXT NOT NULL
    )
  `);

  await client.execute(`
    CREATE TABLE IF NOT EXISTS collection_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      run_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'success',
      trends_collected INTEGER NOT NULL DEFAULT 0,
      error_message TEXT,
      created_at TEXT NOT NULL
    )
  `);

  console.log("🏷️ Seeding categories...");
  for (const cat of CATEGORIES) {
    await db
      .insert(categories)
      .values({
        slug: cat.slug,
        nameKo: cat.nameKo,
        emoji: cat.emoji,
        color: cat.color,
      })
      .onConflictDoNothing();
  }

  console.log("🔑 Seeding keywords...");
  for (const cat of CATEGORIES) {
    for (const kw of cat.seedKeywords) {
      await db
        .insert(seedKeywords)
        .values({ categorySlug: cat.slug, keyword: kw })
        .onConflictDoNothing();
    }
  }

  console.log("📝 Seeding sample trends...");
  const sampleTrends = [
    {
      keyword: "두쫀크",
      title: "두쫀크가 뭐야? 🧀",
      explanation:
        "두부 + 쫀득 + 크림치즈의 줄임말이에요. 성수동에서 시작해서 전국으로 퍼진 디저트 트렌드인데, 두부처럼 부드러우면서 쫀득한 식감에 크림치즈 맛이 나는 디저트를 말해요.",
      usageExample: "요즘 두쫀크 먹어봤어? 성수동 가면 줄 서서 사더라!",
      usageWrong: null,
      category: "food",
      dangerLevel: "safe",
      emoji: "🧀",
      combinedScore: 92,
      featured: true,
    },
    {
      keyword: "영포티",
      title: "영포티... 쓰면 안 돼요 🙅",
      explanation:
        "Young + Forty의 합성어로 '젊은 40대'라는 뜻이에요. 하지만 실제로 40대가 스스로 '나 영포티야~'라고 하면 오히려 나이를 의식하는 것처럼 보여서 민망할 수 있어요. 주로 마케팅 용어로 사용돼요.",
      usageExample: "영포티 타겟 마케팅이 요즘 핫하더라.",
      usageWrong:
        "나 영포티니까 아직 젊지~ (👈 이러면 오히려 나이 강조하는 느낌)",
      category: "slang",
      dangerLevel: "danger",
      emoji: "🙅",
      combinedScore: 88,
      featured: false,
    },
    {
      keyword: "갓생",
      title: "갓생 살고 계신가요?",
      explanation:
        "God + 인생의 합성어로, 부지런하고 알찬 하루를 보내는 것을 말해요. 새벽 운동, 독서, 자기계발 등 하루를 알차게 보내는 라이프스타일이에요. 40대에게도 자연스러운 표현이에요.",
      usageExample: "요즘 매일 아침 6시에 일어나서 갓생 살고 있어.",
      usageWrong: null,
      category: "lifestyle",
      dangerLevel: "safe",
      emoji: "✨",
      combinedScore: 85,
      featured: false,
    },
    {
      keyword: "스우파3",
      title: "스우파3 보고 계세요?",
      explanation:
        "Mnet 댄스 서바이벌 '스트릿 우먼 파이터 시즌3'의 줄임말이에요. 크루별 배틀이 화제인데, 특히 이번 시즌은 글로벌 크루가 참가해서 더 뜨거워요.",
      usageExample: "스우파3 어제 방송 봤어? 배틀 대박이었어.",
      usageWrong: null,
      category: "culture",
      dangerLevel: "safe",
      emoji: "💃",
      combinedScore: 90,
      featured: false,
    },
    {
      keyword: "중꺾그",
      title: "중꺾그 - 아직도 쓸까요?",
      explanation:
        "'중요한 건 꺾이지 않는 그것'의 줄임말. 2022년 월드컵 때 유행했지만, 지금은 약간 식은 표현이에요. 가끔 쓰는 건 괜찮지만 너무 자주 쓰면 유행 늦은 느낌이 날 수 있어요.",
      usageExample: "프로젝트 힘들었는데 중꺾그 마인드로 버텼지.",
      usageWrong: null,
      category: "slang",
      dangerLevel: "caution",
      emoji: "💪",
      combinedScore: 65,
      featured: false,
    },
    {
      keyword: "ChatGPT 5",
      title: "GPT-5 나온다는데?",
      explanation:
        "OpenAI에서 곧 출시 예정인 차세대 AI 모델이에요. GPT-4보다 훨씬 똑똑해질 거라고 하는데, 직장에서 AI 활용 이야기가 많이 나올 때 알아두면 좋아요.",
      usageExample: "GPT-5 나오면 업무 자동화가 더 쉬워질 것 같아.",
      usageWrong: null,
      category: "tech",
      dangerLevel: "safe",
      emoji: "🤖",
      combinedScore: 91,
      featured: false,
    },
    {
      keyword: "올드머니룩",
      title: "올드머니룩이 뭐야?",
      explanation:
        "오래된 부유층의 우아하고 절제된 패션 스타일을 말해요. 로고 없는 고급 소재, 베이지-네이비-화이트 중심의 깔끔한 코디가 특징이에요. 40대가 입으면 딱 자연스러운 스타일!",
      usageExample: "올드머니룩 느낌으로 카시미어 니트에 슬랙스 입었어.",
      usageWrong: null,
      category: "fashion",
      dangerLevel: "safe",
      emoji: "🧥",
      combinedScore: 82,
      featured: false,
    },
    {
      keyword: "어쩔티비",
      title: "어쩔티비는 쓰면 안 돼요 ❌",
      explanation:
        "'어쩌라고, TV나 봐'라는 뜻의 신조어인데, 초등학생들 사이에서 유행한 표현이에요. 40대가 쓰면 정말 민망하니까 절대 쓰지 마세요. 자녀가 쓰더라도 따라하지 마세요!",
      usageExample: null,
      usageWrong:
        "회의에서 반대 의견에 '어쩔티비~' (👈 절대 금지!)",
      category: "slang",
      dangerLevel: "danger",
      emoji: "📺",
      combinedScore: 70,
      featured: false,
    },
    {
      keyword: "하이볼",
      title: "하이볼 열풍, 아직도 핫해요 🥃",
      explanation:
        "위스키에 탄산수를 섞은 칵테일이에요. 편의점 캔하이볼부터 직접 만드는 홈하이볼까지, 소맥 대신 하이볼을 마시는 문화가 자리잡았어요. 술자리에서 자연스럽게 주문해보세요.",
      usageExample: "오늘 소맥 대신 하이볼 한잔 어때?",
      usageWrong: null,
      category: "food",
      dangerLevel: "safe",
      emoji: "🥃",
      combinedScore: 78,
      featured: false,
    },
    {
      keyword: "러닝크루",
      title: "러닝크루 들어봤어요?",
      explanation:
        "함께 달리는 러닝 모임을 말해요. 혼자 운동하기 힘들 때 러닝크루에 가입하면 동기부여도 되고 새로운 사람도 만날 수 있어요. 40대 직장인 러닝크루도 많아졌어요.",
      usageExample: "나 요즘 러닝크루 들어가서 주 3회 달려. 완전 좋아!",
      usageWrong: null,
      category: "lifestyle",
      dangerLevel: "safe",
      emoji: "🏃",
      combinedScore: 75,
      featured: false,
    },
  ];

  for (const t of sampleTrends) {
    await db
      .insert(trends)
      .values({
        keyword: t.keyword,
        title: t.title,
        explanation: t.explanation,
        usageExample: t.usageExample,
        usageWrong: t.usageWrong,
        category: t.category,
        dangerLevel: t.dangerLevel,
        emoji: t.emoji,
        naverScore: Math.random() * 100,
        newsCount: Math.floor(Math.random() * 50),
        combinedScore: t.combinedScore,
        featured: t.featured,
        active: true,
        displayDate: today,
        createdAt: new Date().toISOString(),
      })
      .onConflictDoNothing();
  }

  console.log(`✅ Seeded ${sampleTrends.length} trends, ${CATEGORIES.length} categories`);
  process.exit(0);
}

seed().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
