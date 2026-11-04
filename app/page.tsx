"use client";

import { useState } from "react";
import Link from "next/link";

const tracks = [
  { key: "plan", label: "Bikin Plan", detail: "Dari ide jadi PRD, spec, dan task yang bisa langsung dipakai agent.", tone: "coral", mark: "01" },
  { key: "design", label: "DesainPakeAI", detail: "Rancang alur dan UI produk tanpa tersesat di layar kosong.", tone: "violet", mark: "02" },
  { key: "chat", label: "AndalAI", detail: "Diskusikan ide dan rapikan PRD dengan model AI pilihanmu.", tone: "blue", mark: "03" },
  { key: "template", label: "Template", detail: "Mulai dari struktur codebase yang hemat token dan mudah dirawat.", tone: "mint", mark: "04" },
];

export default function Home() {
  const [language, setLanguage] = useState("ID");
  const [selected, setSelected] = useState("plan");
  const [toast, setToast] = useState("");

  function start() {
    setToast("Workspace baru siap dimulai. Discovery pertama menunggu jawabanmu.");
  }

  return (
    <main className="shell">
      <nav className="nav">
        <Link className="brand" href="/" aria-label="StartVibes home"><span className="brand-dot" />start<span>vibes</span></Link>
        <div className="nav-links"><a href="#cara-kerja">Cara kerja</a><a href="#output">Output</a><a href="#templates">Templates</a></div>
        <div className="nav-actions"><label className="language"><span className="sr-only">Bahasa</span><select value={language} onChange={(event) => setLanguage(event.target.value)}><option>ID</option><option>EN</option><option>中文</option><option>عربي</option><option>MS</option></select></label><button className="login" onClick={() => setToast("Login akan tersedia setelah workspace auth siap.")}>Masuk</button><Link className="nav-cta" href="/projects">Mulai proyek <span>↗</span></Link></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> SaaS, tapi langkahnya jelas</p>
          <h1>Ide yang berani.<br /><em>Alur yang siap.</em></h1>
          <p className="lede">StartVibes membantu kamu mengubah ide SaaS menjadi keputusan, dokumen, dan handoff yang bisa langsung dipahami agent AI.</p>
          <div className="hero-actions"><button className="primary" onClick={start}>Mulai dari ide <span>↗</span></button><a className="text-link" href="#cara-kerja">Lihat cara kerja <span>↓</span></a></div>
          {toast && <p className="toast" role="status">{toast}</p>}
        </div>
        <div className="hero-visual" aria-label="Pratinjau workspace StartVibes">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="document-card"><div className="doc-top"><span className="doc-icon">SV</span><span>STARTVIBES / PROJECT 001</span><span className="doc-status">draft</span></div><div className="doc-content"><span className="doc-kicker">DISCOVERY NOTE</span><h2>Temukan bentuk<br />produkmu.</h2><p>Jawaban yang tepat hari ini<br />menghemat banyak putaran<br />saat build besok.</p><div className="doc-line" /><div className="doc-footer"><span>01 — 06</span><span>→</span></div></div></div>
          <div className="scribble">from<br />thought<br /><strong>to build</strong></div>
        </div>
      </section>

      <section className="proof-row"><p>Output yang ikut berjalan bersama proyekmu</p><div><span>PRD</span><span>AGENTS</span><span>PLAN</span><span>TASK</span><span>DESIGN</span><span>SPEC</span></div></section>

      <section className="tracks" id="cara-kerja"><div className="section-intro"><p className="eyebrow">SATU WORKSPACE, TIGA ARAH</p><h2>Pilih titik mulai.<br /><em>Kami rapikan sisanya.</em></h2></div><div className="track-list">{tracks.map((track) => <button key={track.key} className={`track ${track.tone} ${selected === track.key ? "active" : ""}`} onClick={() => setSelected(track.key)}><span className="track-mark">{track.mark}</span><span className="track-body"><strong>{track.label}</strong><span>{track.detail}</span></span><span className="track-arrow">↗</span></button>)}</div></section>

      <section className="output-section" id="output"><div><p className="eyebrow">BUKAN CUMA PROMPT</p><h2>Semua keputusan,<br /><em>tersimpan rapi.</em></h2></div><p className="output-note">Setiap proyek punya konteksnya sendiri. StartVibes menjaga konteks itu tetap utuh saat berpindah dari ide, ke desain, ke agent pilihanmu.</p><div className="file-stack"><div className="file file-one"><span>01</span><strong>PRD.md</strong><small>product requirements</small></div><div className="file file-two"><span>02</span><strong>AGENTS.md</strong><small>rules for your agent</small></div><div className="file file-three"><span>03</span><strong>HANDOFF_PROMPT.md</strong><small>ready to copy</small></div></div></section>

      <section className="final-cta" id="templates"><p className="eyebrow">START WITH CLARITY</p><h2>Besok kamu bisa<br /><em>mulai membangun.</em></h2><button className="primary" onClick={start}>Buat workspace pertama <span>↗</span></button></section>
      <footer><span>© 2026 StartVibes</span><span>Made for clearer beginnings.</span><span>Indonesia · English · 中文 · عربي · Melayu</span></footer>
    </main>
  );
}
