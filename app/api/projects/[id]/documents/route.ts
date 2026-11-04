import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { documentVersions, documents, projects } from "../../../../../db/schema";

export const runtime = "nodejs";

const allowedTypes = ["PRD", "AGENTS", "PLAN", "TASK", "DESIGN", "SPEC"] as const;

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const project = await db.select({ id: projects.id }).from(projects).where(eq(projects.id, id)).get();
  if (!project) return NextResponse.json({ error: "Proyek tidak ditemukan." }, { status: 404 });
  const rows = await db.select().from(documents).where(eq(documents.projectId, id)).orderBy(asc(documents.type));
  return NextResponse.json({ documents: rows });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const project = await db.select({ id: projects.id }).from(projects).where(eq(projects.id, id)).get();
  if (!project) return NextResponse.json({ error: "Proyek tidak ditemukan." }, { status: 404 });
  const body = await request.json().catch(() => null) as { type?: unknown; title?: unknown; contentMd?: unknown } | null;
  const type = typeof body?.type === "string" ? body.type.trim().toUpperCase() : "";
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const contentMd = typeof body?.contentMd === "string" ? body.contentMd : "";
  if (!allowedTypes.includes(type as (typeof allowedTypes)[number])) return NextResponse.json({ error: "Tipe dokumen tidak valid." }, { status: 400 });
  if (!title) return NextResponse.json({ error: "Judul dokumen wajib diisi." }, { status: 400 });
  const now = Date.now();
  const document = { id: crypto.randomUUID(), projectId: id, type, title, contentMd, status: "draft", currentVersion: 1, createdAt: now, updatedAt: now };
  db.transaction((tx) => {
    tx.insert(documents).values(document).run();
    tx.insert(documentVersions).values({ id: crypto.randomUUID(), documentId: document.id, version: 1, contentMd, changeNote: "Initial draft", createdAt: now }).run();
  });
  return NextResponse.json({ document }, { status: 201 });
}
