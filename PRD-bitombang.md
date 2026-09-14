# PRD — bitombang.com
**Portfolio Website untuk Fotografer**
Versi 1.0 — 14 September 2026

---

## 1. Latar Belakang & Tujuan

Klien adalah seorang fotografer yang membutuhkan website portofolio pribadi dengan domain **bitombang.com**. Referensi visual yang diberikan:

- **jamespopsys.com** — homepage berupa *fullscreen photo grid/masonry* yang langsung menampilkan karya foto tanpa banyak teks, kesan minimalis dan foto-sentris.
- **jittraponkaicome.com/biography** — struktur navigasi berbentuk **sidebar tetap di kiri** (bukan navbar horizontal di atas), berisi kelompok menu, judul nama fotografer + tagline di atas sidebar, ikon sosial media di bawah sidebar, dan halaman "About/Bio" dengan foto profil + narasi panjang + daftar penghargaan/pameran dalam bentuk list bertahun.

**Tujuan produk:**
1. Menampilkan portofolio foto secara visual, cepat, dan enak dilihat di mobile maupun desktop.
2. Memberi identitas personal fotografer (About/Biodata) yang membangun kepercayaan calon klien.
3. Memudahkan calon klien menghubungi fotografer (Contact).
4. Infrastruktur **hosting/tools gratis 100%** — biaya hanya untuk domain `bitombang.com`.

---

## 2. Target Pengguna

| Persona | Kebutuhan |
|---|---|
| Calon klien (personal/brand) | Melihat portofolio & gaya foto, cek kontak, booking sesi |
| Pengunjung kasual / follower sosmed | Melihat karya terbaru, kenal profil fotografer |
| Fotografer (admin/klien saya) | Upload/atur foto & project baru tanpa perlu coding |

---

## 3. Informasi Arsitektur (Sitemap & Navigasi)

Mengikuti pola **sidebar navigasi tetap** ala referensi kedua, dengan 4 menu utama:

```
┌─────────────────────┐
│  BITOMBANG           │  <- Nama/logo + tagline singkat
│  Fotografer           │
├─────────────────────┤
│  ● Collection         │  -> Landing page / grid foto utama (gaya jamespopsys)
│  ● Project            │  -> Daftar karya dikelompokkan per-project/series
│  ● About              │  -> Biodata, foto profil, penghargaan, cerita
│  ● Contact             │  -> Form kontak / info kontak person
├─────────────────────┤
│  [IG] [WA] [Email]    │  <- Ikon sosial media, sticky di bawah sidebar
└─────────────────────┘
```

Perilaku sidebar:
- Desktop: sidebar fixed di kiri (~260–300px), konten scroll di kanan.
- Mobile: sidebar collapse jadi hamburger menu / bottom-sheet, full-width saat dibuka.

### 3.1 Halaman **Collection** (Landing Page)
- Ini adalah homepage (`/`).
- Grid foto full-bleed (masonry atau justified-grid) berisi foto pilihan (curated highlight), *bukan* semua foto per-project.
- Klik foto → buka lightbox (preview besar, swipe next/prev) — **tanpa pindah halaman**, agar user tetap "flow" seperti jamespopsys.
- Infinite scroll atau "load more" untuk foto tambahan.
- Optional: tag/filter ringan (mis. "Portrait", "Landscape", "Wedding") tapi tetap minimalis — referensi jamespopsys sengaja tanpa filter berat.

### 3.2 Halaman **Project**
- Berbeda dari Collection: di sini foto dikelompokkan **per-project/series** (mis. "Prewedding Andi & Sari", "Journey to Bromo", "Editorial Batik").
- Struktur 2 level:
  - `/project` → grid **cover project** (1 foto cover + judul + tahun/lokasi singkat)
  - `/project/[slug]` → halaman detail: judul project, deskripsi singkat, galeri foto project tsb, tombol kembali.
- Cocok untuk storytelling ala jittraponkaicome (per-series seperti "In The Shadow of War").

### 3.3 Halaman **About**
- Foto profil fotografer.
- Biodata: nama, lokasi, spesialisasi, cerita singkat/statement fotografi (seperti bagian "About my photography" di referensi).
- Opsional: list penghargaan / pengalaman kerja / klien pernah ditangani / peralatan (gear) — bentuk bullet per tahun seperti referensi.
- Tombol CTA ke Contact.

### 3.4 Halaman **Contact**
- Info kontak langsung: nomor WhatsApp (klik-to-chat), email, lokasi/kota domisili, jam operasional (jika relevan untuk booking sesi foto).
- Form kontak sederhana (nama, email, pesan, jenis layanan yang diminati) yang mengirim ke email fotografer.
- Link sosial media (Instagram jadi prioritas karena portofolio foto).
- Opsional: peta lokasi (embed Google Maps gratis) jika ada studio fisik.

---

## 4. Kebutuhan Fungsional

| # | Fitur | Prioritas |
|---|---|---|
| F1 | Landing "Collection" — grid foto + lightbox | Must |
| F2 | Halaman "Project" list + detail per-project | Must |
| F3 | Halaman "About" statis | Must |
| F4 | Halaman "Contact" + form kirim email | Must |
| F5 | Sidebar navigasi responsif (desktop & mobile) | Must |
| F6 | Optimasi gambar otomatis (lazy load, compress, responsive size) | Must |
| F7 | SEO dasar (meta title/desc, Open Graph, sitemap.xml) | Must |
| F8 | Admin/CMS ringan untuk klien upload foto & project baru tanpa coding | Should |
| F9 | Analytics pengunjung | Should |
| F10 | Dark/light mode toggle | Could |
| F11 | Multi-bahasa (ID/EN) | Could |

---

## 5. Kebutuhan Non-Fungsional

- **Biaya**: Rp 0 untuk hosting, build, CMS, form, email, analytics, SSL — hanya bayar domain `bitombang.com` per tahun.
- **Performa**: Skor Lighthouse ≥ 90 (foto adalah aset berat → wajib pakai CDN + image optimization).
- **Skalabilitas ringan**: cukup untuk ratusan foto/puluhan project, tanpa perlu server backend berat.
- **Kemudahan update konten**: klien (bukan developer) bisa tambah foto/project sendiri.
- **Keamanan**: HTTPS wajib (gratis via provider hosting), form contact anti-spam.

---

## 6. Rekomendasi Tech Stack (100% Gratis, kecuali domain)

Karena kebutuhan intinya adalah **portofolio visual + CMS ringan tanpa server backend**, pendekatan **JAMstack (Static Site + Headless CMS gratis)** paling pas — cepat, gratis selamanya (di tier free), dan mudah dirawat.

### 6.1 Pilihan Utama (Direkomendasikan)

| Layer | Tools | Kenapa | Biaya |
|---|---|---|---|
| Framework | **Next.js** (App Router, static export) atau **Astro** | Astro lebih ringan utk situs foto-statis + island untuk lightbox interaktif; Next.js lebih fleksibel kalau nanti mau tambah fitur dinamis | Gratis (open source) |
| Styling | Tailwind CSS | Cepat bikin layout sidebar + grid responsif | Gratis |
| Hosting + CDN | **Cloudflare Pages** (atau Vercel/Netlify free tier) | Unlimited bandwidth (Cloudflare), auto SSL, auto-deploy dari GitHub, global CDN cepat untuk foto | Gratis |
| Version control / CI-CD | **GitHub** (repo) + GitHub Actions/auto-deploy bawaan Cloudflare Pages | Setiap push otomatis build & deploy | Gratis |
| CMS (agar klien bisa upload foto/project sendiri) | **Decap CMS** (dulu Netlify CMS) — Git-based CMS, editor via UI mirip WordPress, commit langsung ke GitHub | Tidak perlu database, tidak perlu server, gratis penuh | Gratis |
| Image hosting & optimization | **Cloudinary** free tier (25 GB storage/bandwidth) *atau* simpan di repo + Cloudflare Images/Next.js Image (resize otomatis) | Auto-resize, format WebP/AVIF, lazy load | Gratis (tier awal) |
| Lightbox/gallery | **PhotoSwipe** atau **yet-another-react-lightbox** (open source) | Ringan, swipe gesture, zoom | Gratis |
| Form Contact | **Web3Forms** atau **Formspree** free tier (kirim ke email tanpa backend) | Tidak perlu server untuk handle form | Gratis (limit submission cukup untuk portofolio kecil) |
| Analytics | **Cloudflare Web Analytics** (privacy-friendly, tanpa cookie) atau Google Analytics 4 | Tahu jumlah pengunjung tanpa biaya | Gratis |
| Email domain (opsional) | **Cloudflare Email Routing** (forward email@bitombang.com ke Gmail pribadi) | Biar kontak terlihat profesional tanpa beli hosting email | Gratis |
| Domain & DNS | **Registrar apapun** (Niagahoster/Namecheap/dsb) untuk beli `bitombang.com`, DNS diarahkan ke Cloudflare | Satu-satunya biaya di seluruh proyek | **Berbayar** (±Rp150–250rb/tahun tergantung TLD .com) |

### 6.2 Alternatif Lebih Simpel (kalau klien benar-benar awam & tidak mau sentuh GitHub)

Jika Decap CMS + GitHub dirasa terlalu teknis untuk klien mengelola foto sendiri:

- Bangun dengan **framework yang sama**, tapi developer (Anda) yang meng-upload konten via commit setiap ada foto/project baru.
- Atau gunakan **Notion sebagai "CMS"** (klien tinggal isi database Notion berisi judul project + link foto), lalu situs statis fetch data dari Notion API saat build (via layanan seperti **Super.so gratis-trial** tidak disarankan karena berbayar — lebih baik pakai `next-notion` custom fetch, tetap gratis karena hanya request API, bukan hosting).

> Rekomendasi saya: tetap pakai **Decap CMS**, karena antarmukanya sudah cukup ramah non-developer (klik "New Project", isi judul, upload foto, klik "Publish" — otomatis live dalam ~1 menit).

### 6.3 Diagram Alur Sistem

```
[Klien upload foto/project]
        │  (via Decap CMS admin panel, login GitHub)
        ▼
   [GitHub Repo] ──(push)──▶ [Cloudflare Pages build]
        │                              │
        │                              ▼
        │                    [Build static site (Next.js/Astro)]
        │                              │
        │                              ▼
        │                     [Deploy ke CDN Cloudflare]
        │                              │
        ▼                              ▼
 [Sumber gambar: Cloudinary/repo]   [bitombang.com — live]
                                        │
                                        ▼
                              [Pengunjung / calon klien]
                                        │
                              (isi form) ▼
                              [Web3Forms → Email klien]
```

### 6.4 Batasan Free Tier yang Perlu Diketahui

| Layanan | Batas gratis | Cukup untuk portofolio kecil-menengah? |
|---|---|---|
| Cloudflare Pages | Unlimited request/bandwidth, 500 build/bulan | Ya, sangat cukup |
| Cloudinary free | 25 GB storage & bandwidth/bulan | Ya, kecuali traffic sangat tinggi |
| Web3Forms/Formspree | 50–250 submission/bulan (tergantung provider) | Ya untuk form kontak personal |
| Decap CMS | Tidak ada limit (hanya batas GitHub repo, sangat besar) | Ya |
| GitHub | Repo publik/privat unlimited untuk personal | Ya |

Jika traffic membesar drastis di kemudian hari, upgrade termurah biasanya cukup di sisi Cloudinary (image bandwidth) — bagian lain tetap gratis.

---

## 7. Roadmap Implementasi (Contoh)

| Fase | Deliverable | Estimasi |
|---|---|---|
| 1 | Setup repo, deploy skeleton (sidebar + routing 4 halaman) | 2–3 hari |
| 2 | Desain UI/UX (grid Collection, lightbox, halaman Project) | 3–5 hari |
| 3 | Integrasi Decap CMS + upload konten awal | 2 hari |
| 4 | Halaman About & Contact + form | 1–2 hari |
| 5 | SEO, optimasi gambar, testing responsif, connect domain | 2 hari |
| 6 | Handover + training singkat klien pakai CMS | 1 hari |

---

## 8. Catatan Tambahan

- Karena sepenuhnya static hosting, tidak ada biaya server bulanan — cocok untuk jangka panjang selama traffic wajar.
- Jika ke depan klien ingin fitur **e-commerce jual cetak foto** (seperti "Store"/"Custom Prints" di jamespopsys), itu akan butuh layer tambahan (mis. Stripe/Gumroad) — di luar cakupan free-tier murni dan bisa dibahas terpisah.
- Semua tools di atas open-source/free-tier resmi, tidak ada trial berbatas waktu yang nanti berbayar otomatis.
