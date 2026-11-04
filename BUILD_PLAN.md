# StartVibes - Build Plan

## Phase 1 - Foundation

- Buat aplikasi Next.js TypeScript.
- Tambahkan lint, format, dan test runner.
- Tambahkan layout dasar dan token desain.
- Buat halaman landing, projects, dan empty states.

## Phase 2 - Project flow

- Buat model project dan discovery answer.
- Implementasikan create project.
- Implementasikan wizard dengan validasi per langkah.
- Simpan progress secara bertahap.

## Phase 3 - Documents

- Buat generator berbasis `ProjectContext`.
- Tambahkan dokumen Markdown awal.
- Tambahkan editor, preview, status reviewed, dan unsaved state.

## Phase 4 - Handoff

- Buat prompt handoff.
- Tambahkan copy dengan feedback yang terlihat.
- Tambahkan export ZIP.
- Tambahkan pilihan bahasa.

## Phase 5 - Quality

- Unit test generator.
- Integration test project flow.
- Keyboard walkthrough.
- Responsive test.
- Error, loading, dan empty state test.
- Review anti-slop dan security.

## Urutan implementasi yang disarankan

Mulai dari shell dan project flow, bukan integrasi model AI. Generator dapat menggunakan adapter mock selama kontrak output dan UI diuji. Provider AI baru dipasang setelah alur pengguna stabil.
