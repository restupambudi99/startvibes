import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  idea: text("idea").notNull().default(""),
  locale: text("locale").notNull().default("id"),
  status: text("status").notNull().default("draft"),
  currentPhase: integer("current_phase").notNull().default(1),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull().references(() => projects.id),
  type: text("type").notNull(),
  title: text("title").notNull(),
  contentMd: text("content_md").notNull().default(""),
  status: text("status").notNull().default("draft"),
  currentVersion: integer("current_version").notNull().default(1),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export const documentVersions = sqliteTable("document_versions", {
  id: text("id").primaryKey(),
  documentId: text("document_id").notNull().references(() => documents.id),
  version: integer("version").notNull(),
  contentMd: text("content_md").notNull(),
  changeNote: text("change_note").notNull().default("Initial draft"),
  createdAt: integer("created_at").notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
