import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "../../../../db";
import { documents, documentVersions } from "../../../../db/schema";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const document = await db.select().from(documents).where(eq(documents.id, id)).get();
  if (!document) return NextResponse.json({ error: "Dokumen tidak ditemukan." }, { status: 404 });
  const versions = await db.select().from(documentVersions).where(eq(documentVersions.documentId, id)).orderBy(desc(documentVersions.version));
  return NextResponse.json({ document, versions });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const current = await db.select().from(documents).where(eq(documents.id, id)).get();
  if (!current) return NextResponse.json({ error: "Dokumen tidak ditemukan." }, { status: 404 });
  const body = await request.json().catch(() => null) as { title?: unknown; contentMd?: unknown; status?: unknown; changeNote?: unknown } | null;
  const title = typeof body?.title === "string" ? body.title.trim() : current.title;
  const contentMd = typeof body?.contentMd === "string" ? body.contentMd : current.contentMd;
  const status = body?.status === "approved" || body?.status === "final" ? body.status : current.status;
  const changeNote = typeof body?.changeNote === "string" && body.changeNote.trim() ? body.changeNote.trim() : "Document updated";
  if (!title) return NextResponse.json({ error: "Judul dokumen wajib diisi." }, { status: 400 });
  if (contentMd.length > 200000) return NextResponse.json({ error: "Isi dokumen terlalu panjang." }, { status: 400 });
  const now = Date.now();
  const nextVersion = current.currentVersion + 1;
  const updated = db.transaction((tx) => {
    tx.update(documents).set({ title, contentMd, status, currentVersion: nextVersion, updatedAt: now }).where(eq(documents.id, id)).run();
    tx.insert(documentVersions).values({ id: crypto.randomUUID(), documentId: id, version: nextVersion, contentMd, changeNote, createdAt: now }).run();
    return tx.select().from(documents).where(eq(documents.id, id)).get();
  });
  return NextResponse.json({ document: updated });
}
