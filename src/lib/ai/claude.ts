import Anthropic from "@anthropic-ai/sdk";
import { buildTrendPrompt } from "./prompts";

interface TrendExplanation {
  title: string;
  explanation: string;
  usageExample: string | null;
  usageWrong: string | null;
  dangerLevel: "safe" | "caution" | "danger";
  emoji: string;
}

export async function generateTrendExplanation(
  keyword: string,
  category: string,
  newsHeadlines: string[]
): Promise<TrendExplanation | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn("ANTHROPIC_API_KEY not set, skipping AI generation");
    return null;
  }

  const client = new Anthropic({ apiKey });
  const prompt = buildTrendPrompt(keyword, category, newsHeadlines);

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      title: parsed.title || `${keyword}이(가) 뭐야?`,
      explanation: parsed.explanation || "",
      usageExample: parsed.usageExample || null,
      usageWrong: parsed.usageWrong || null,
      dangerLevel: parsed.dangerLevel || "safe",
      emoji: parsed.emoji || "📌",
    };
  } catch (err) {
    console.error("Claude API error:", err);
    return null;
  }
}
