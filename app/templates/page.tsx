"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "../templates.css";

const templates = [
  { name: "SaaS Starter", stack: "Next.js · TypeScript · SQLite", type: "SaaS", color: "#d7eddf", description: "Fondasi ringan untuk dashboard, workspace, dan alur akun." },
  { name: "AI Workspace", stack: "Next.js · TypeScript · AI SDK", type: "AI", color: "#ddd7f4", description: "Struktur untuk chat sadar konteks, dokumen, dan provider AI." },
  { name: "Client Portal", stack: "Next.js · TypeScript · Drizzle", type: "Portal", color: "#f5dbd2", description: "Ruang kerja terpisah untuk agency dan proyek klien." },
  { name: "Simple Landing", stack: "Next.js · Tailwind · MDX", type: "Marketing", color: "#e7e0cf", description: "Halaman publik cepat dengan konten yang mudah dirawat." },
];

export default function TemplatesPage() {
  const [filter, setFilter] = useState("Semua");
  const [notice, setNotice] = useState("");
  const visible = useMemo(() => filter === "Semua" ? templates : templates.filter((item) => item.type === filter), [filter]);
  return <main className="workspace-shell"><aside className="workspace-side"><Link className="brand" href="/projects"><span className="brand-dot" />start<span>vibes</span></Link><p className="side-label">WORKSPACE</p><nav className="side-nav"><Link href="/projects"><span>▦</span> Projects</Link><Link className="side-active" href="/templates"><span>⌘</span> Templates</Link></nav><div className="side-bottom"><p className="side-label">ACCOUNT</p><button onClick={() => setNotice("Pengaturan akun belum aktif pada MVP ini.")}><span>◌</span> Settings</button><button onClick={() => setNotice("Bantuan akan terhubung ke dokumentasi StartVibes.")}><span>?</span> Help</button></div></aside><section className="workspace-main templates-main"><header className="workspace-header"><div><p className="eyebrow">STARTVIBES / CODEBASE LIBRARY</p><h1>Mulai dari fondasi.</h1></div><span className="muted-count">{templates.length} templates</span></header>{notice && <div className="notice" role="status">{notice}</div>}<section className="template-intro"><div><h2>Lebih sedikit setup.<br /><em>Lebih banyak membuat.</em></h2><p>Kerangka yang dipilih berdasarkan jenis pekerjaan, supaya agent mendapat konteks yang konsisten sejak awal.</p></div><div className="filter-bar">{["Semua", "SaaS", "AI", "Portal", "Marketing"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></section><div className="template-grid">{visible.map((template) => <article className="template-card" key={template.name}><div className="template-preview" style={{ background: template.color }}><span>{template.type}</span><div className="folder-shape"><i /><i /><i /></div></div><div className="template-info"><div><h3>{template.name}</h3><p>{template.description}</p></div><small>{template.stack}</small><div className="template-actions"><button onClick={() => setNotice(`${template.name}: preview struktur akan tersedia pada tahap berikutnya.`)}>Lihat struktur</button><button className="download-action" onClick={() => setNotice(`${template.name} siap dipakai sebagai opsi template.`)}>Pilih template <span>↗</span></button></div></div></article>)}</div>{visible.length === 0 && <div className="empty-projects"><div className="empty-symbol">○</div><div><h3>Belum ada template untuk filter ini.</h3><p>Pilih kategori lain untuk melihat fondasi yang tersedia.</p></div></div>}</section></main>;
}
