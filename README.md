# Predictive Lead Scoring for Banking Sales Frontend

## � Deskripsi Proyek

**PRISM** adalah aplikasi web untuk sistem penilaian leads berbasis AI yang dirancang khusus untuk industri perbankan. Aplikasi ini membantu tim sales mengidentifikasi dan memprioritaskan leads berkualitas tinggi menggunakan algoritma machine learning. 

Frontend ini menyediakan dashboard interaktif untuk visualisasi data, manajemen leads, import file CSV/Excel, dan analisis performa dengan role-based access control (Admin & Sales).

---

## �📋 Quick Start

### Persyaratan
```bash
Node.js v16+ dan npm v8+
```

### Instalasi
```bash
# Clone repository
git clone https://github.com/Capstone-A25-CS063/fe.git
cd fe

# Install dependencies
npm install

# Buat file .env
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### Development
```bash
npm run dev
# Buka di http://localhost:5173
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Struktur Proyek

```
src/
├── pages/              # Halaman: Login, Dashboard, Data Input, Profile
├── components/         # Komponen UI yang dapat digunakan ulang
├── context/            # State global (Auth & Theme)
├── hooks/              # Custom hooks (useAuth, useLocalStorage)
├── services/           # Konfigurasi API & endpoints
└── utils/              # Fungsi helper & logika filter
```

---

## 🛠️ Tech Stack

- **React 18** - Library UI
- **Vite 5** - Build tool & dev server
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Framework styling
- **Axios** - HTTP client
- **Framer Motion** - Animasi smooth
- **Recharts** - Charts & grafik
- **Lucide React** - Icon library

---

## ✨ Fitur Frontend

### 🔐 **Halaman Login**
- Form login yang elegan dengan validasi
- Opsi "Remember Me" untuk menyimpan email
- Tema light/dark mode
- Logo PRISM dan tagline profesional
- Responsive design mobile-friendly

### 📊 **Dashboard**
- **Statistik Leads**: Tampil jumlah total leads, conversion rate, dll
- **Bar Chart**: Visualisasi data leads per kategori
- **Pie Chart**: Persentase distribusi leads
- **Filter Advanced**: Filter leads berdasarkan berbagai kriteria
- **Tabel Customer**: List leads dengan pagination
- **Role-based View**: Admin dan Sales melihat data berbeda

### 📤 **Data Input**
- **Upload File**: Import leads dari CSV/Excel
- **Single Lead Form**: Tambah lead satu per satu
- **Hasil Prediksi**: Tampilkan score lead setelah upload
- **Progress Indicator**: Feedback untuk user saat upload
- **Error Handling**: Pesan error yang jelas untuk file invalid

### 👥 **Manage Profile** (Admin Only)
- **Tabel User**: List semua sales account
- **Manage Role**: Ubah role user
- **User Status**: Aktif/non-aktif
- **Responsif**: Tabel yang friendly di mobile

### 🎨 **UI/UX Features**
- **Dark Mode Toggle**: Tombol untuk switch tema
- **Sidebar Navigation**: Menu navigasi yang dapat dikurapi
- **Header**: Info user dan logout button
- **Loading State**: Animasi loading saat fetch data
- **Error Alerts**: Notifikasi error yang informatif
- **Smooth Animations**: Transisi halaman dengan Framer Motion
- **Responsive Design**: Mobile, tablet, desktop support

### 🔐 **Keamanan & Autentikasi**
- **Token-based Auth**: JWT token di localStorage
- **Protected Routes**: Halaman yang hanya bisa diakses user login
- **Role-based Access**: Admin dapat akses semua, Sales terbatas
- **401 Handler**: Auto logout jika token expired
- **403 Page**: Halaman "Unauthorized" untuk akses ditolak

---

## 📝 Script yang Tersedia

```bash
npm run dev      # Jalankan dev server dengan hot reload
npm run build    # Build untuk production
npm run preview  # Preview build di local
npm run lint     # Check code dengan ESLint
```

---

## 🌐 Deployment

**Platform:** Netlify (Auto-deploy saat push ke branch main)

**Konfigurasi:** File `_redirects` untuk SPA routing

**Build Settings:**
- Build Command: `npm run build`
- Publish Directory: `dist`

---

## 🔧 Komponen Utama

### Context API
- **AuthContext**: Manage user login, role, token
- **ThemeContext**: Toggle dark mode

### Custom Hooks
- **useAuth()**: Akses user data & login/logout
- **useLocalStorage()**: Simpan data ke localStorage

### Protected Routes
- **ProtectedRoute**: Cek user login
- **RoleProtectedRoute**: Cek role user (admin/sales)

### Common Components
- **Alert**: Notifikasi success/error
- **Modal**: Dialog popup
- **Loading**: Spinner loading
- **Pagination**: Paging untuk tabel

---

## 📚 Dokumentasi Lengkap

Untuk penjelasan lebih detail, lihat file `DOKUMENTASI.md`

---

## 🚀 Environment Variables

Buat file `.env` di root folder:

```env
VITE_API_URL=http://localhost:3000/api
```

**Catatan:** Hanya variable dengan prefix `VITE_` yang bisa diakses frontend

---

## 🎯 Alur Autentikasi

1. User input email & password di login page
2. API validasi & return JWT token
3. Token simpan di localStorage
4. Token otomatis ditambah ke setiap API request
5. User redirect ke dashboard

**Auto Logout:**
- Token expired → logout otomatis
- localStorage dihapus
- Redirect ke login page

---

**Last Updated:** Desember 12, 2025


