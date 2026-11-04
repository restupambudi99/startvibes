"use client";

import Link from "next/link";
import { useState } from "react";

const actions = [
  ["01", "Bikin Plan", "PRD, spec, dan task dari ide yang masih mentah."],
  ["02", "DesainPakeAI", "Susun arah UI sebelum satu baris kode ditulis."],
  ["03", "Template", "Pilih fondasi codebase yang sesuai kebutuhan proyek."],
];

export default function ProjectsPage() {
  const [notice, setNotice] = useState("");

  return <main className="workspace-shell">
    <aside className="workspace-side">
      <Link className="brand" href="/"><span className="brand-dot" />start<span>vibes</span></Link>
      <p className="side-label">WORKSPACE</p>
      <nav className="side-nav"><Link className="side-active" href="/projects"><span>▦</span> Projects</Link><button onClick={() => setNotice("Template library akan tersedia setelah template pertama dibuat.")}><span>⌘</span> Templates</button></nav>
      <div className="side-bottom"><p className="side-label">ACCOUNT</p><button onClick={() => setNotice("Pengaturan akun belum aktif pada MVP ini.")}><span>◌</span> Settings</button><button onClick={() => setNotice("Bantuan akan terhubung ke dokumentasi StartVibes.")}><span>?</span> Help</button><div className="account-chip"><span className="avatar">S</span><span><strong>Starter</strong><small>Free workspace</small></span></div></div>
    </aside>
    <section className="workspace-main">
      <header className="workspace-header"><div><p className="eyebrow">MY WORKSPACE / 01</p><h1>Selamat datang kembali.</h1></div><div className="header-actions"><button className="icon-button" onClick={() => setNotice("Tidak ada notifikasi baru.")} aria-label="Notifikasi">◌</button><Link className="primary" href="/projects/new">Buat proyek <span>↗</span></Link></div></header>
      {notice && <div className="notice" role="status">{notice}</div>}
      <section className="start-panel"><div><p className="eyebrow">BELUM ADA PROYEK</p><h2>Ide berikutnya<br /><em>dimulai di sini.</em></h2><p className="panel-copy">Jawab beberapa pertanyaan penting. Kami bantu merangkainya menjadi dokumen yang bisa dipahami manusia dan agent.</p><Link className="primary" href="/projects/new">Mulai dari ide <span>↗</span></Link></div><div className="panel-mark"><span>SV</span><i>your<br />next<br /><b>build</b></i></div></section>
      <section className="workspace-section"><div className="workspace-section-head"><div><p className="eyebrow">PILIH ARAH</p><h2>Mulai dari kebutuhanmu.</h2></div><span className="muted-count">0 projects</span></div><div className="action-grid">{actions.map(([number, title, description]) => <Link className="action-card" href="/projects/new" key={title}><span className="action-number">{number}</span><span className="action-title">{title}</span><span className="action-description">{description}</span><span className="action-arrow">↗</span></Link>)}</div></section>
      <section className="empty-projects"><div className="empty-symbol">○</div><div><h3>Proyekmu akan muncul di sini.</h3><p>Setelah proyek pertama dibuat, semua dokumen, keputusan, dan progres akan tersimpan di satu tempat.</p></div><Link className="text-link" href="/projects/new">Buat yang pertama <span>↗</span></Link></section>
    </section>
  </main>;
}
