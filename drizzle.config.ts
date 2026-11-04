import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "sqlite",
  dbCredentials: { url: process.env.STARTVIBES_DB_PATH ?? "./data/startvibes.db" },
  out: "./drizzle",
} satisfies Config;
