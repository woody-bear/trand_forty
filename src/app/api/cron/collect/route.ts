import { NextRequest, NextResponse } from "next/server";
import { runCollection } from "@/lib/collectors/collector";

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Allow calls without auth in development
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await runCollection();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: "Collection failed", detail: String(err) },
      { status: 500 }
    );
  }
}
