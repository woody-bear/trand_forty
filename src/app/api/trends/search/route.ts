import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trends } from "@/lib/db/schema";
import { like, eq, and, or, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ trends: [] });
  }

  const pattern = `%${q}%`;

  const result = await db
    .select()
    .from(trends)
    .where(
      and(
        eq(trends.active, true),
        or(
          like(trends.keyword, pattern),
          like(trends.title, pattern),
          like(trends.explanation, pattern)
        )
      )
    )
    .orderBy(desc(trends.combinedScore))
    .limit(20);

  return NextResponse.json({ trends: result });
}
