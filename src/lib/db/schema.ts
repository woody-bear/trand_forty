import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const trends = sqliteTable("trends", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  keyword: text("keyword").notNull(),
  title: text("title").notNull(),
  explanation: text("explanation").notNull(),
  usageExample: text("usage_example"),
  usageWrong: text("usage_wrong"),
  category: text("category").notNull(),
  dangerLevel: text("danger_level").notNull().default("safe"),
  emoji: text("emoji").notNull().default("📌"),
  naverScore: real("naver_score"),
  newsCount: integer("news_count"),
  combinedScore: real("combined_score"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  displayDate: text("display_date").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  nameKo: text("name_ko").notNull(),
  emoji: text("emoji").notNull(),
  color: text("color").notNull(),
});

export const seedKeywords = sqliteTable("seed_keywords", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categorySlug: text("category_slug").notNull(),
  keyword: text("keyword").notNull(),
});

export const collectionLogs = sqliteTable("collection_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  runDate: text("run_date").notNull(),
  status: text("status").notNull().default("success"),
  trendsCollected: integer("trends_collected").notNull().default(0),
  errorMessage: text("error_message"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
