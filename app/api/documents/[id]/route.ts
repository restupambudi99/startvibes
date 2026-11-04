import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { documents, documentVersions } from "../../../../db/schema";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const document = await db.select().from(documents).where(eq(documents.id, id)).get();
  if (!document) return NextResponse.json({ error: "Dokumen tidak ditemukan." }, { status: 404 });
  const versions = await db.select().from(documentVersions).where(eq(documentVersions.documentId, id));
  return NextResponse.json({ document, versions });
}
