# Express VPS App

Aplikasi Express sederhana dengan endpoint utama dan health check. Workflow GitHub Actions menjalankan test lalu mengirim source terbaru ke VPS melalui SSH ketika ada push ke branch `main`.

## Menjalankan secara lokal

Membutuhkan Node.js 20 atau lebih baru.

```bash
npm install
npm start
```

Buka `http://localhost:3000` atau `http://localhost:3000/health`.

Jalankan test dengan `npm test`.

## Persiapan VPS

Contoh berikut untuk VPS Linux berbasis Debian/Ubuntu. Siapkan Node.js 22, npm, PM2, serta SSH server. Buat user deploy yang memiliki akses SSH dan izin menulis ke direktori aplikasi, lalu pasang public key yang cocok dengan private key GitHub Actions.

```bash
npm install --global pm2
mkdir -p /home/deploy/express-vps-app
```

Port aplikasi default adalah `3000`. Atur reverse proxy (misalnya Nginx) dan firewall VPS sesuai kebutuhan sebelum membuka aplikasi ke publik. Agar aplikasi otomatis hidup kembali setelah VPS reboot, jalankan `pm2 startup` sebagai petunjuk user deploy, lalu `pm2 save` setelah deploy pertama berhasil.

## Secrets GitHub

Tambahkan secrets berikut di **Settings → Secrets and variables → Actions**:

| Secret | Isi |
| --- | --- |
| `VPS_HOST` | IP atau hostname VPS |
| `VPS_USER` | User SSH, misalnya `deploy` |
| `VPS_PORT` | Port SSH; boleh tidak diisi untuk port `22` |
| `VPS_SSH_KEY` | Private key SSH untuk user deploy |
| `VPS_KNOWN_HOSTS` | Baris host key VPS dari `ssh-keyscan -p <port> <host>`, diverifikasi terhadap fingerprint host VPS |
| `VPS_APP_DIR` | Direktori absolut tanpa spasi, misalnya `/home/deploy/express-vps-app` |

Pastikan direktori tersebut dapat ditulis oleh user SSH. Workflow membuat direktori `releases` dan symlink `current` di dalamnya; workflow tidak memerlukan clone repository dari VPS.

Setelah workflow sukses, aplikasi dijalankan oleh PM2 dengan nama `express-vps-app`. Workflow berjalan otomatis saat push ke `main`, atau dapat dijalankan manual dari tab **Actions**.
