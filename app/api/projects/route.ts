import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "../../../db";
import { projects } from "../../../db/schema";

export const runtime = "nodejs";

export async function GET() {
  const rows = await db.select().from(projects).orderBy(desc(projects.updatedAt));
  return NextResponse.json({ projects: rows });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { name?: unknown; idea?: unknown; locale?: unknown } | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const idea = typeof body?.idea === "string" ? body.idea.trim() : "";
  const locale = typeof body?.locale === "string" ? body.locale.trim() : "id";

  if (!name) return NextResponse.json({ error: "Nama proyek wajib diisi." }, { status: 400 });
  if (name.length > 120) return NextResponse.json({ error: "Nama proyek terlalu panjang." }, { status: 400 });
  if (idea.length > 5000) return NextResponse.json({ error: "Ide proyek terlalu panjang." }, { status: 400 });

  const now = Date.now();
  const project = { id: crypto.randomUUID(), name, idea, locale, status: "draft", currentPhase: 1, createdAt: now, updatedAt: now };
  await db.insert(projects).values(project);
  return NextResponse.json({ project }, { status: 201 });
}
