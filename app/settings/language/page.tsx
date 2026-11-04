"use client";

import Link from "next/link";
import { useState } from "react";
import "../../language.css";

const languages = [
  { code: "ID", name: "Bahasa Indonesia", native: "Bahasa Indonesia", region: "Indonesia" },
  { code: "EN", name: "English", native: "English", region: "Global" },
  { code: "中文", name: "Mandarin", native: "简体中文", region: "中国" },
  { code: "عربي", name: "Arabic", native: "العربية", region: "الشرق الأوسط" },
  { code: "MS", name: "Bahasa Melayu", native: "Bahasa Melayu", region: "Malaysia" },
];

export default function LanguagePage() {
  const [selected, setSelected] = useState(languages[0]);
  const [region, setRegion] = useState("Gunakan pilihan bahasa saya");
  const [notice, setNotice] = useState("");
  const isRtl = selected.code === "عربي";
  return <main className="workspace-shell"><aside className="workspace-side"><Link className="brand" href="/projects"><span className="brand-dot" />start<span>vibes</span></Link><p className="side-label">WORKSPACE</p><nav className="side-nav"><Link href="/projects"><span>▦</span> Projects</Link><Link className="side-active" href="/settings/language"><span>文</span> Bahasa</Link></nav><div className="side-bottom"><p className="side-label">ACCOUNT</p><button onClick={() => setNotice("Pengaturan akun lain belum aktif pada MVP ini.")}><span>◌</span> Settings</button><button onClick={() => setNotice("Bantuan akan terhubung ke dokumentasi StartVibes.")}><span>?</span> Help</button></div></aside><section className="workspace-main language-main"><header className="workspace-header"><div><p className="eyebrow">SETTINGS / LANGUAGE & REGION</p><h1>Berbicara dengan caramu.</h1></div><button className="primary" onClick={() => setNotice(`Preferensi ${selected.name} disimpan sebagai mock lokal.`)}>Simpan perubahan <span>↗</span></button></header>{notice && <div className="notice" role="status">{notice}</div>}<section className="language-content"><div className="language-copy"><p className="eyebrow">01 / BAHASA TAMPILAN</p><h2>Pilih bahasa<br /><em>yang terasa dekat.</em></h2><p>Bahasa ini akan digunakan pada antarmuka dan menjadi saran awal untuk dokumen proyek baru.</p></div><div className="language-options">{languages.map((language) => <button className={`language-option ${selected.code === language.code ? "selected" : ""}`} key={language.code} onClick={() => setSelected(language)}><span className="language-code">{language.code}</span><span><strong>{language.name}</strong><small>{language.native} · {language.region}</small></span><b>↗</b></button>)}</div></section><section className="region-section"><div><p className="eyebrow">02 / WILAYAH</p><h2>Bagaimana kami<br /><em>memilih default?</em></h2><p className="region-note">Lokasi hanya digunakan sebagai saran. Kamu selalu punya kontrol untuk menggantinya.</p></div><div className="region-options"><label className={region === "Gunakan pilihan bahasa saya" ? "checked" : ""}><input type="radio" name="region" value="Gunakan pilihan bahasa saya" checked={region === "Gunakan pilihan bahasa saya"} onChange={(event) => setRegion(event.target.value)} /> Gunakan pilihan bahasa saya</label><label className={region === "Sarankan dari negara saya" ? "checked" : ""}><input type="radio" name="region" value="Sarankan dari negara saya" checked={region === "Sarankan dari negara saya"} onChange={(event) => setRegion(event.target.value)} /> Sarankan dari negara saya <small>tidak mengunci pilihan</small></label></div></section><section className="language-preview" dir={isRtl ? "rtl" : "ltr"}><div><p className="eyebrow">PREVIEW</p><h2>{isRtl ? "مساحة أفكارك تبدأ هنا." : selected.code === "ID" ? "Ruang idemu dimulai di sini." : selected.code === "中文" ? "你的想法，从这里开始。" : selected.code === "MS" ? "Ruang idea anda bermula di sini." : "Your idea starts here."}</h2><p>{selected.native} · preview copy</p></div><span className="preview-code">{selected.code}</span></section></section></main>;
}
