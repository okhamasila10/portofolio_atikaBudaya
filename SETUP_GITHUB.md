# Instruksi Setup GitHub Repository dan Hosting

## Langkah 1: Buat Repository di GitHub

1. Buka https://github.com/new
2. Isi informasi repository:
   - **Repository name**: `etika-budaya-portfolio` (atau nama lain yang Anda inginkan)
   - **Description**: (opsional) Portfolio Etika dan Budaya
   - **Visibility**: Public (untuk GitHub Pages gratis)
   - **JANGAN** centang "Initialize this repository with a README" (karena kita sudah punya)
3. Klik "Create repository"

## Langkah 2: Push Code ke GitHub

Setelah repository dibuat, jalankan perintah berikut di terminal:

```bash
# Ganti NAMA_REPOSITORY dengan nama repository yang Anda buat
git remote add origin https://github.com/okhamasila10/NAMA_REPOSITORY.git
git branch -M main
git push -u origin main
```

**Contoh jika nama repository adalah `etika-budaya-portfolio`:**
```bash
git remote add origin https://github.com/okhamasila10/etika-budaya-portfolio.git
git branch -M main
git push -u origin main
```

## Langkah 3: Aktifkan GitHub Pages

1. Buka repository di GitHub: https://github.com/okhamasila10/NAMA_REPOSITORY
2. Klik tab **Settings**
3. Scroll ke bagian **Pages** di sidebar kiri
4. Di bagian **Source**, pilih **"GitHub Actions"**
5. Workflow akan otomatis berjalan dan deploy website Anda

## Langkah 4: Update Base Path (Jika Nama Repository Berbeda)

Jika nama repository Anda **BUKAN** `etika-budaya-portfolio`, edit file `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/NAMA_REPOSITORY_ANDA/',  // Ganti dengan nama repository Anda
})
```

Kemudian commit dan push perubahan:
```bash
git add vite.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

## Setelah Setup

- Website akan tersedia di: `https://okhamasila10.github.io/NAMA_REPOSITORY/`
- Setiap kali Anda push perubahan ke branch `main`, website akan otomatis di-update
- Anda bisa melihat status deployment di tab **Actions** di repository GitHub

