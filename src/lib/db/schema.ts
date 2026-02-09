import {
  pgTable,
  serial,
  text,
  real,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
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
  featured: boolean("featured").notNull().default(false),
  active: boolean("active").notNull().default(true),
  displayDate: text("display_date").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameKo: text("name_ko").notNull(),
  emoji: text("emoji").notNull(),
  color: text("color").notNull(),
});

export const seedKeywords = pgTable("seed_keywords", {
  id: serial("id").primaryKey(),
  categorySlug: text("category_slug").notNull(),
  keyword: text("keyword").notNull(),
});

export const collectionLogs = pgTable("collection_logs", {
  id: serial("id").primaryKey(),
  runDate: text("run_date").notNull(),
  status: text("status").notNull().default("success"),
  trendsCollected: integer("trends_collected").notNull().default(0),
  errorMessage: text("error_message"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
