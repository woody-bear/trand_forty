import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// Turso (Vercel) 우선, 없으면 로컬 SQLite (Docker)
const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./data/local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
export { client };
