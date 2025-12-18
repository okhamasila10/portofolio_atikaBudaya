# Portfolio Etika dan Budaya

Portfolio website untuk mata kuliah Etika dan Budaya.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deployment

Website ini di-deploy otomatis ke GitHub Pages menggunakan GitHub Actions.

### Setup GitHub Pages

1. Buat repository baru di GitHub dengan nama `etika-budaya-portfolio` (atau nama lain sesuai keinginan)
2. Push code ke repository:
```bash
git remote add origin https://github.com/okhamasila10/etika-budaya-portfolio.git
git branch -M main
git push -u origin main
```

3. Aktifkan GitHub Pages:
   - Buka Settings > Pages di repository GitHub
   - Source: pilih "GitHub Actions"
   - Workflow akan otomatis deploy setiap kali push ke branch main

**Catatan:** Jika nama repository berbeda, update `base` di `vite.config.js` sesuai nama repository Anda.

