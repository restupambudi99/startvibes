# StartVibes - MVP Scope

## Tujuan MVP

Membuktikan bahwa pengguna dapat mengubah ide SaaS menjadi paket dokumen dan prompt yang lebih siap dieksekusi daripada prompt bebas.

## Fitur termasuk

### 1. Project workspace

- Membuat proyek.
- Mengubah nama proyek.
- Melihat status proyek.
- Membuka kembali proyek.

### 2. Discovery wizard

- Masalah dan target pengguna.
- Nilai produk dan pembeda.
- Peran pengguna.
- Fitur inti dan non-goal.
- Alur pengguna.
- Integrasi dan data.
- Risiko dan batasan.

### 3. Document generator

Menghasilkan tujuh file Markdown dari jawaban discovery. Generator harus mempertahankan hubungan antar-dokumen dan menandai asumsi yang belum dikonfirmasi.

### 4. Review dan editing

- Preview Markdown.
- Editor teks.
- Regenerate satu dokumen.
- Menandai dokumen sebagai reviewed.
- Menampilkan sumber keputusan dan asumsi.

### 5. Handoff

- Copy isi prompt.
- Download seluruh dokumen sebagai ZIP.

### 6. Optional build paths

- Memilih template codebase berdasarkan kebutuhan proyek.
- Memilih alur desain AI atau membuka workspace Penpot.
- Menghasilkan prompt untuk agent AI dari konteks proyek yang sama.

### 7. AI provider

- Request AI diproses melalui backend StartVibes.
- API key platform menggunakan 9routers.
- Secret tidak pernah dikirim ke client atau ditulis ke dokumen proyek.
- Model dan kuota harus dapat dibatasi per paket pengguna.
- Menampilkan instruksi penggunaan pada agent AI.

### 8. Bahasa

- Indonesia.
- Inggris.
- Mandarin.
- Arab.
- Melayu.

## Fitur di luar MVP

- Menjalankan build codebase otomatis.
- Sinkronisasi GitHub.
- Penyimpanan API key pengguna.
- Kolaborasi real-time.
- Billing kompleks.
- Integrasi Penpot penuh.
- Marketplace template.

## Acceptance criteria

- Pengguna dapat menyelesaikan alur tanpa bantuan manual.
- Tidak ada tombol utama yang tidak memiliki aksi.
- Semua dokumen dapat diedit dan diunduh.
- Empty, loading, dan error state tersedia.
- Alur dapat digunakan dengan keyboard.
- Output tidak mengandung data fiktif yang terlihat seperti data nyata.
- Bahasa output konsisten pada seluruh dokumen.
