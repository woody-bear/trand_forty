import { db } from "@/lib/db";
import { trends, collectionLogs } from "@/lib/db/schema";
import { eq, and, gte } from "drizzle-orm";
import { CATEGORIES } from "@/lib/constants/categories";
import { fetchNaverDatalab } from "./naver-datalab";
import { fetchNaverNews } from "./naver-news";
import { calculateCombinedScore } from "@/lib/utils/scoring";
import { generateTrendExplanation } from "@/lib/ai/claude";

export async function runCollection(): Promise<{
  status: string;
  collected: number;
  message: string;
}> {
  const today = new Date().toISOString().split("T")[0];

  // 1. Check for duplicate run
  const existingLogs = await db
    .select()
    .from(collectionLogs)
    .where(
      and(eq(collectionLogs.runDate, today), eq(collectionLogs.status, "success"))
    )
    .limit(1);

  if (existingLogs.length > 0) {
    return { status: "skipped", collected: 0, message: "Already collected today" };
  }

  let totalCollected = 0;
  const errors: string[] = [];

  try {
    for (const category of CATEGORIES) {
      try {
        // 2. Fetch Naver DataLab scores
        const datalabResults = await fetchNaverDatalab(category.seedKeywords);

        // 3. Get top keywords by score
        const topKeywords = datalabResults
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        // 4. Fetch news for top keywords
        const newsResults = await fetchNaverNews(
          topKeywords.map((k) => k.keyword)
        );

        // 5. Check for duplicates in last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentTrends = await db
          .select()
          .from(trends)
          .where(
            and(
              eq(trends.category, category.slug),
              gte(trends.displayDate, sevenDaysAgo.toISOString().split("T")[0])
            )
          );

        const existingKeywords = new Set(recentTrends.map((t) => t.keyword));

        for (const kw of topKeywords) {
          if (existingKeywords.has(kw.keyword)) continue;

          const newsData = newsResults.find((n) => n.keyword === kw.keyword);
          const newsCount = newsData?.newsCount || 0;
          const score = calculateCombinedScore(kw.score, newsCount);

          // 6. Generate AI explanation
          const explanation = await generateTrendExplanation(
            kw.keyword,
            category.nameKo,
            newsData?.headlines || []
          );

          if (explanation) {
            await db.insert(trends).values({
              keyword: kw.keyword,
              title: explanation.title,
              explanation: explanation.explanation,
              usageExample: explanation.usageExample,
              usageWrong: explanation.usageWrong,
              category: category.slug,
              dangerLevel: explanation.dangerLevel,
              emoji: explanation.emoji,
              naverScore: kw.score,
              newsCount,
              combinedScore: score,
              featured: false,
              active: true,
              displayDate: today,
              createdAt: new Date().toISOString(),
            });
            totalCollected++;
          }
        }
      } catch (catErr) {
        errors.push(`${category.slug}: ${catErr}`);
      }
    }

    // 7. Set featured (highest score today)
    if (totalCollected > 0) {
      const todayTrends = await db
        .select()
        .from(trends)
        .where(eq(trends.displayDate, today))
        .orderBy(trends.combinedScore)
        .limit(1);

      if (todayTrends.length > 0) {
        await db
          .update(trends)
          .set({ featured: true })
          .where(eq(trends.id, todayTrends[0].id));
      }
    }

    // 8. Log collection
    const status = errors.length > 0 ? "partial" : "success";
    await db.insert(collectionLogs).values({
      runDate: today,
      status,
      trendsCollected: totalCollected,
      errorMessage: errors.length > 0 ? errors.join("; ") : null,
      createdAt: new Date().toISOString(),
    });

    return {
      status,
      collected: totalCollected,
      message:
        errors.length > 0
          ? `Collected ${totalCollected} with errors: ${errors.join("; ")}`
          : `Successfully collected ${totalCollected} trends`,
    };
  } catch (err) {
    await db.insert(collectionLogs).values({
      runDate: today,
      status: "failed",
      trendsCollected: 0,
      errorMessage: String(err),
      createdAt: new Date().toISOString(),
    });

    return { status: "failed", collected: 0, message: String(err) };
  }
}
