# 💻 Sistem Inventaris Laboratorium Komputer

Sistem ini adalah aplikasi berbasis web yang dirancang untuk mengelola inventaris barang laboratorium komputer secara efisien dan modern.

## 🚀 Fitur Utama

- ✅ Login khusus Admin
- 📦 Manajemen data barang
- 📋 Sistem peminjaman dan pengembalian barang
- 🕓 Riwayat transaksi dan peminjaman
- 📊 Tampilan responsif untuk desktop & mobile
- 🔐 Autentikasi JWT dan koneksi database aman

## 🛠️ Teknologi yang Digunakan

### 🔹 Frontend
- HTML, CSS, JavaScript
- Hosted on [Vercel](https://vercel.com)

### 🔸 Backend
- Node.js + Express.js
- MongoDB (MongoDB Atlas)
- Hosted on [Replit](https://replit.com)

## 🌐 URL Aplikasi

- Frontend: [https://inventaris-lab.vercel.app]
- Backend API: [https://a23574fb-af99-48a5-8d7b-97a78c64d5d5-00-em7l7qe775ni.pike.replit.dev/]

## 📁 Struktur Folder

inventaris-lab/
├── backend/ # Kode backend (Express, MongoDB)
├── frontend/ # Kode frontend (HTML/CSS/JS)
├── .gitignore
├── README.md
└── vercel.json


## ⚙️ Cara Menjalankan Secara Lokal

### 1. Clone Repo

git clone https://github.com/Zulkifli2000/inventaris-lab.git
cd inventaris-lab

### 2. Setup Backend

cd backend
npm install
node server.js

Pastikan sudah membuat file .env dengan isi:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

### 3. Jalankan Frontend 

Cukup buka frontend/index.html di browser, atau deploy via Vercel.

## 📸 Tampilan Antarmuka

Berikut beberapa tampilan aplikasi:
-Halaman login admin
-Dashboard data barang
-Form peminjaman
-Riwayat transaksi

## 🙌 Kontribusi & Lisensi
Project ini dikembangkan oleh Zulkifli2000.