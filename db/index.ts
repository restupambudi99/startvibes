import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import * as schema from "./schema";

const databasePath = process.env.STARTVIBES_DB_PATH ?? join(process.cwd(), "data", "startvibes.db");
mkdirSync(dirname(databasePath), { recursive: true });

const sqlite = new Database(databasePath);
sqlite.pragma("journal_mode = WAL");
sqlite.exec(`CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  idea TEXT NOT NULL DEFAULT '',
  locale TEXT NOT NULL DEFAULT 'id',
  status TEXT NOT NULL DEFAULT 'draft',
  current_phase INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)`);
sqlite.exec(`CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY NOT NULL,
  project_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content_md TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  current_version INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id)
)`);
sqlite.exec(`CREATE TABLE IF NOT EXISTS document_versions (
  id TEXT PRIMARY KEY NOT NULL,
  document_id TEXT NOT NULL,
  version INTEGER NOT NULL,
  content_md TEXT NOT NULL,
  change_note TEXT NOT NULL DEFAULT 'Initial draft',
  created_at INTEGER NOT NULL,
  FOREIGN KEY (document_id) REFERENCES documents(id)
)`);

export const db = drizzle(sqlite, { schema });
