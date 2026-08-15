# UMKM Naik Kelas — Demo

Ringkasan: web app "onboarding assistant" untuk UMKM: upload foto produk + informasi sederhana → AI generate deskripsi, saran harga, dan tagline → panduan setup toko.

## Requirement
- Node 18+ (disarankan) dan npm
- Kunci API Generative Language (opsional jika ingin panggil Google): set `GEMINI_API_KEY` atau untuk dev `VITE_GEMINI_API_KEY`.

## Instalasi & jalankan lokal

1. Install dependencies

```bash
npm install
```

2. Jalankan proxy server (Express)

```bash
# optional: export GEMINI_API_KEY or set MOCK_AI=1 for offline testing
# Windows PowerShell example (temporary for session):
$env:MOCK_AI = "1"
npm run start:server
```

3. Jalankan frontend (Vite)

```bash
npm run dev
```

4. Buka aplikasi di browser: `http://localhost:5175/`

## Mode Mock (tanpa API key)
Untuk pengujian cepat tanpa kunci API, jalankan server dengan variabel `MOCK_AI=1` (lihat contoh PowerShell di atas). Server akan mengembalikan respons contoh sehingga alur frontend dapat diuji end-to-end.

## Test End-to-end (lokal)
Jika server proxy sudah berjalan (dan `MOCK_AI=1` bila tidak punya API key), jalankan:

```bash
npm run test:e2e
```

Script ini akan mengirimkan request POST ke `http://localhost:5174/api/generateContent` dan menampilkan respons.

## File penting
- `src/components/UploadForm.jsx` — form upload foto + input produk
- `src/lib/aiClient.js` — panggil endpoint lokal `/api/generateContent`
- `server/ai-proxy.js` — proxy ke Google Generative API (atau mock)
- `src/components/PlatformGuide.jsx` — panduan setup toko
- `src/components/ProgressDashboard.jsx` — simpan dan lihat produk (localStorage)

## Next steps (opsional)
- Integrasi storage (Firebase) untuk simpan produk per pengguna
- Otentikasi & halaman profil
- Menyempurnakan prompt AI dan handling edge-case

---

Kalau mau, saya bisa: menjalankan `npm run test:e2e` sekarang (butuh server berjalan), atau bantu isi `README` dengan instruksi deploy. Pilih: `run-test` atau `tulis-deploy`.
