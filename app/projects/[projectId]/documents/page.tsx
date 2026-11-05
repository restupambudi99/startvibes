"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../documents.css";

type DocumentItem = { id: string; type: string; title: string; contentMd: string; status: string; currentVersion: number; updatedAt: number };
const tones: Record<string, string> = { PRD: "coral", AGENTS: "violet", PLAN: "mint", TASK: "blue", DESIGN: "sand", SPEC: "rose" };

export default function DocumentsPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selected, setSelected] = useState<DocumentItem | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/projects/${projectId}/documents`).then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.error || "Dokumen gagal dimuat."); return payload.documents as DocumentItem[]; }).then((items) => { if (cancelled) return; setDocuments(items); setSelected(items[0] ?? null); setState(items.length ? "ready" : "empty"); }).catch(() => { if (!cancelled) setState("error"); });
    return () => { cancelled = true; };
  }, [projectId]);

  return <main className="workspace-shell"><aside className="workspace-side"><Link className="brand" href="/projects"><span className="brand-dot" />start<span>vibes</span></Link><p className="side-label">PROJECT</p><nav className="side-nav"><Link href="/projects"><span>←</span> Semua proyek</Link><Link className="side-active" href={`/projects/${projectId}/documents`}><span>▤</span> Dokumen</Link><button onClick={() => setNotice("Rencana akan tersedia setelah PRD disetujui.")}><span>≡</span> Rencana & task</button></nav><div className="side-bottom"><p className="side-label">PROJECT</p><p className="project-name">{projectId}<small>Project database</small></p></div></aside><section className="workspace-main documents-main"><header className="workspace-header"><div><p className="eyebrow">PROJECT / DOCUMENT LIBRARY</p><h1>Pustaka dokumen.</h1></div><div className="header-actions"><button className="icon-button" onClick={() => setNotice("Pencarian dokumen akan tersedia setelah isi dokumen bertambah.")} aria-label="Cari dokumen">⌕</button><button className="primary" onClick={() => setNotice("Generator dokumen akan memakai konteks discovery berikutnya.")}>Generate dokumen <span>↗</span></button></div></header>{notice && <div className="notice" role="status">{notice}</div>}{state === "loading" && <div className="empty-projects"><div className="empty-symbol">…</div><div><h3>Memuat dokumen.</h3><p>Mengambil dokumen dari project ini.</p></div></div>}{state === "error" && <div className="empty-projects"><div className="empty-symbol">!</div><div><h3>Dokumen gagal dimuat.</h3><p>Periksa koneksi lokal lalu coba buka halaman ini lagi.</p></div><button className="text-link" onClick={() => window.location.reload()}>Coba lagi <span>↗</span></button></div>}{state === "empty" && <div className="empty-projects"><div className="empty-symbol">○</div><div><h3>Belum ada dokumen.</h3><p>Generator akan membuat PRD, AGENTS, PLAN, TASK, DESIGN, dan SPEC dari discovery.</p></div></div>}{state === "ready" && selected && <div className="documents-layout"><section><div className="library-meta"><span>{documents.length} dokumen</span><span className="muted-count">Versi tersimpan di database</span></div><div className="document-list">{documents.map((doc) => <button className={`document-row ${selected.id === doc.id ? "selected" : ""}`} key={doc.id} onClick={() => setSelected(doc)}><span className={`doc-badge ${tones[doc.type] ?? "coral"}`}>{doc.type}</span><span className="doc-row-copy"><strong>{doc.title}</strong><small>Versi {doc.currentVersion} · {doc.status}</small></span><span className="doc-row-status">{doc.status}</span><span className="doc-row-arrow">↗</span></button>)}</div></section><aside className="document-preview"><div className="preview-top"><span>PREVIEW</span><span>{selected.type}.md</span></div><div className="preview-body"><p className="eyebrow">{selected.type} / {selected.status.toUpperCase()}</p><h2>{selected.title}</h2><div className="preview-rule" />{selected.contentMd ? <pre className="markdown-preview">{selected.contentMd}</pre> : <p className="placeholder-copy">Dokumen ini masih kosong. Selesaikan discovery untuk mengisinya.</p>}<button className="text-link" onClick={() => setNotice(`${selected.type}.md versi ${selected.currentVersion} sedang dipreview.`)}>Copy prompt <span>↗</span></button></div></aside></div>}</section></main>;
}
