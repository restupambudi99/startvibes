# StartVibes - Technical Specification

## Tujuan teknis

MVP harus menjadi aplikasi web yang memandu discovery, menyimpan jawaban proyek, menghasilkan dokumen Markdown, menyediakan editor/preview, dan mengekspor ZIP.

## Rekomendasi stack

- Next.js dengan TypeScript.
- Tailwind CSS hanya untuk utilitas layout yang diperlukan.
- Editor Markdown berbasis textarea terlebih dahulu.
- Parser Markdown untuk preview yang aman.
- Database PostgreSQL melalui ORM yang ringan.
- Object storage belum diperlukan untuk MVP.
- Provider AI dibungkus di balik interface internal agar dapat diganti.

## Batasan MVP

- Tidak menjalankan kode hasil generasi.
- Tidak menyimpan API key provider milik pengguna.
- Tidak membuat repository GitHub otomatis.
- Tidak mengklaim output sebagai jaminan keamanan atau production-readiness.

## Entitas data

### User

- `id`
- `email`
- `locale`
- `createdAt`

### Project

- `id`
- `userId`
- `name`
- `problemStatement`
- `targetUsers`
- `language`
- `status`
- `createdAt`
- `updatedAt`

### DiscoveryAnswer

- `id`
- `projectId`
- `questionKey`
- `answer`
- `source`: `user` atau `inferred`
- `confirmed`: boolean

### ProjectDocument

- `id`
- `projectId`
- `kind`: `prd`, `agents`, `plan`, `task`, `design`, `spec`, `handoff`
- `content`
- `version`
- `reviewedAt`
- `updatedAt`

## Alur route

- `/` landing dan entry point.
- `/projects` daftar proyek.
- `/projects/new` membuat proyek.
- `/projects/:id/discovery` wizard discovery.
- `/projects/:id/review` review keputusan dan asumsi.
- `/projects/:id/documents` daftar dokumen.
- `/projects/:id/documents/:kind` editor dan preview dokumen.
- `/projects/:id/export` copy prompt dan download ZIP.

## Kontrak generator

Input generator harus berupa `ProjectContext` yang berisi identitas proyek, jawaban discovery, keputusan terkonfirmasi, asumsi, bahasa output, dan preferensi template.

Output generator adalah map deterministik dari `DocumentKind` ke Markdown. Setiap dokumen harus memuat:

- tujuan dokumen;
- status `confirmed`, `assumption`, atau `open`;
- referensi ke keputusan terkait;
- acceptance criteria jika relevan;
- larangan mengarang pengguna, statistik, testimonial, atau integrasi.

## State wajib

- Empty: belum ada proyek atau dokumen.
- Loading: discovery atau generasi sedang berjalan.
- Error: generasi gagal, dengan opsi retry.
- Unsaved: editor memiliki perubahan lokal.
- Reviewed: dokumen telah ditinjau pengguna.

## Keamanan minimum

- Validasi input di server.
- Escape dan sanitasi preview Markdown.
- Authorization berdasarkan `userId` pada setiap query proyek.
- Rate limit generator.
- Jangan mencatat API key atau isi sensitif ke log.
- Ekspor ZIP hanya berisi file proyek yang diminta pengguna.

## Aksesibilitas

- Semua aksi dapat dijalankan melalui keyboard.
- Focus-visible wajib terlihat.
- Label form eksplisit.
- Error disampaikan melalui teks, bukan warna saja.
- Layout tidak boleh memerlukan horizontal scroll pada mobile.
