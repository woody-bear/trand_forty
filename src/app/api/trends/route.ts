import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { trends } from "@/lib/db/schema";
import { eq, desc, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const conditions = [eq(trends.active, true)];
  if (category) {
    conditions.push(eq(trends.category, category));
  }

  const result = await db
    .select()
    .from(trends)
    .where(and(...conditions))
    .orderBy(desc(trends.combinedScore))
    .limit(50);

  return NextResponse.json({ trends: result });
}
