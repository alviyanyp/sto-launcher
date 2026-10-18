# STO Harian — Launcher

Launcher mini untuk aplikasi **Stock Opname (STO) WIP**. Bisa di-*install* di **HP (Android/iPhone)** dan **PC (Chrome/Edge)** seperti aplikasi biasa.

```
GitHub Pages (launcher ini)          Google Drive (Apps Script)
┌─────────────────────────┐          ┌────────────────────────────┐
│ Ikon di HP / PC          │  buka →  │ Input STO   (Index.html)    │
│ Menu: Input / Dashboard  │          │ Dashboard   (Dashboard.html)│
│ Cek versi & update       │ ← versi  │ Code.gs  → Sheet + Foto     │
└─────────────────────────┘          └────────────────────────────┘
```

- **Tampilan & logika aplikasi** ada di **Google Drive (Apps Script)**. Diubah di sana, semua HP/PC langsung ikut berubah tanpa install ulang.
- **Launcher** (repo ini) hanya berisi ikon, menu, dan alamat aplikasi.

## Isi repo

| File | Fungsi |
|---|---|
| `index.html` | Halaman launcher (menu, viewer, pengaturan, info versi, tombol install) |
| `config.js` | **Satu-satunya file yang wajib diubah**: URL Apps Script, link Sheet & Folder |
| `version.json` | Nomor versi & catatan perubahan launcher |
| `sw.js` | Service worker: membuat launcher bisa di-install & mendeteksi update |
| `manifest.webmanifest` | Nama, ikon, warna, shortcut aplikasi |
| `icons/` | Ikon aplikasi |

## Pasang pertama kali

1. **Siapkan aplikasi di Google Drive** (Apps Script: `Code.gs`, `Index.html`, `Dashboard.html`), jalankan `setup()`, lalu **Deploy → New deployment → Web app**:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone** (disarankan untuk launcher) atau *Anyone with Google account*
   - Salin **URL Web app** (berakhiran `/exec`).
2. **Buat repo GitHub** baru, misalnya `sto-launcher`, lalu upload semua file di folder ini (termasuk folder `icons` dan file `.nojekyll`).
3. Edit **`config.js`** di GitHub → ganti `APPS_SCRIPT_URL` dengan URL dari langkah 1. Isi juga `SHEET_URL` dan `FOLDER_URL` jika ingin tombol pintasnya muncul.
4. **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, Branch **main** / **(root)** → Save.
5. Tunggu 1–2 menit, buka `https://USERNAME.github.io/sto-launcher/`.

## Install di perangkat

| Perangkat | Cara |
|---|---|
| **Android** (Chrome) | Buka link → tombol **Install Aplikasi**, atau menu ⋮ → **Instal aplikasi** |
| **iPhone/iPad** (Safari) | Tombol **Bagikan** → **Tambah ke Layar Utama** |
| **PC** (Chrome/Edge) | Ikon **Instal** ⊕ di kolom alamat, atau menu ⋮ → *Instal halaman sebagai aplikasi* |

Tekan lama ikon di Android/PC untuk shortcut langsung ke **Input STO** atau **Dashboard STO**.

## Cara update

### A. Ubah tampilan/fitur aplikasi (Google Drive)
1. Edit file di Apps Script.
2. Di `Code.gs`, naikkan `APP_VERSION`, `APP_UPDATED`, dan tambahkan baris baru di atas `CHANGELOG`.
3. **Deploy → Manage deployments → ✏ Edit → Version: New version → Deploy.** URL tetap sama.
4. Jalankan `setup()` sekali, supaya versi tercatat di sheet **Versi** dan migrasi data (jika ada) dijalankan.
5. Semua HP/PC otomatis memakai versi baru. Di launcher muncul label **BARU** di samping nomor versi.

### B. Ubah launcher (GitHub)
1. Edit file di repo.
2. Naikkan `version` di `version.json` **dan** `CACHE_VERSION` di `sw.js` (samakan).
3. Commit. Di HP/PC muncul banner **"Versi launcher baru tersedia → Update"**.

> Mengganti URL Apps Script cukup lewat `config.js`, tidak perlu menaikkan versi. Bisa juga per perangkat lewat **⚙ Pengaturan**.

## Catatan

- Jika aplikasi terus meminta login Google di dalam launcher, browser memblokir cookie pihak ketiga. Buka **⚙ Pengaturan → Cara membuka aplikasi → Jendela / tab baru**, atau tekan tombol **↗** di bilah atas.
- Info **"Versi aplikasi"** di launcher hanya bisa dibaca jika akses web app = **Anyone**.
- Dengan akses **Anyone**, siapa pun yang punya URL `/exec` bisa membuka aplikasi. Bagikan link hanya ke tim.
- Aplikasi STO butuh koneksi internet; launcher sendiri tetap bisa dibuka offline.
