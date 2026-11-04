"use client";

import Link from "next/link";
import { useState } from "react";

const steps = ["Gagasan", "Pengguna", "Ruang lingkup", "Konfirmasi"];

export default function NewProjectPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [problem, setProblem] = useState("");
  const [notice, setNotice] = useState("");

  function next() {
    if (step === 0 && !name.trim()) { setNotice("Beri nama singkat agar proyek mudah ditemukan."); return; }
    if (step === 1 && !problem.trim()) { setNotice("Ceritakan masalah yang ingin diselesaikan."); return; }
    setNotice("");
    setStep(Math.min(3, step + 1));
  }

  return <main className="wizard-shell"><header className="wizard-header"><Link className="brand" href="/projects"><span className="brand-dot" />start<span>vibes</span></Link><span className="wizard-progress">DISCOVERY / 0{step + 1} OF 04</span><Link className="wizard-exit" href="/projects">Simpan & keluar</Link></header><div className="wizard-body"><aside className="wizard-steps"><p className="eyebrow">PROJECT DISCOVERY</p><h1>Mulai dengan<br /><em>yang penting.</em></h1><div className="step-list">{steps.map((label, index) => <div className={`step-item ${index === step ? "current" : ""} ${index < step ? "done" : ""}`} key={label}><span>{index < step ? "✓" : `0${index + 1}`}</span>{label}</div>)}</div><p className="wizard-note">Tidak perlu sempurna. Jawabanmu bisa diedit lagi setelah semua keputusan terkumpul.</p></aside><section className="wizard-form"><p className="eyebrow">STEP 0{step + 1}</p>{step === 0 && <><h2>Apa yang sedang<br /><em>ingin kamu bangun?</em></h2><label>Nama proyek<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Misalnya: ruang kerja untuk freelancer" autoFocus /></label><label>Kalimat singkat tentang idemu<textarea value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="Satu kalimat yang menjelaskan produk ini..." /></label></>}{step === 1 && <><h2>Siapa yang akan<br /><em>menggunakannya?</em></h2><label>Target pengguna<textarea value={problem} onChange={(event) => setProblem(event.target.value)} placeholder="Contoh: freelancer yang mengelola beberapa klien sekaligus" autoFocus /></label><p className="field-hint">Kita akan gunakan ini untuk menjaga fitur tetap berangkat dari kebutuhan nyata.</p></>}{step === 2 && <><h2>Jaga scope tetap<br /><em>bernapas.</em></h2><label>Fitur pertama yang paling penting<textarea placeholder="Apa satu hal yang harus bisa dilakukan pengguna di versi pertama?" autoFocus /></label><label>Yang belum perlu dibangun<textarea placeholder="Tulis hal yang sengaja belum masuk versi pertama..." /></label></>}{step === 3 && <><h2>Siap menyusun<br /><em>fondasinya?</em></h2><div className="confirm-card"><strong>{name || "Proyek tanpa nama"}</strong><p>{problem || "Belum ada ringkasan masalah."}</p><span>Discovery akan menghasilkan 7 dokumen Markdown yang bisa diedit.</span></div></>} {notice && <p className="form-notice" role="alert">{notice}</p>}<div className="wizard-actions">{step > 0 && <button className="back-button" onClick={() => setStep(step - 1)}>← Kembali</button>}<button className="primary" onClick={step === 3 ? () => setNotice("Draft proyek tersimpan. Generator dokumen segera tersedia.") : next}>{step === 3 ? "Simpan proyek" : "Lanjutkan"} <span>↗</span></button></div></section></div></main>;
}
