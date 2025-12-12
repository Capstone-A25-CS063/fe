# PRISM - Predictive Lead Scoring System
## Dokumentasi Frontend

---

## 📋 Daftar Isi
1. [Pengenalan Proyek](#pengenalan-proyek)
2. [Teknologi & Stack](#teknologi--stack)
3. [Struktur Proyek](#struktur-proyek)
4. [Setup & Instalasi](#setup--instalasi)
5. [Konfigurasi Environment](#konfigurasi-environment)
6. [Routing & Pages](#routing--pages)
7. [Komponen](#komponen)
8. [Context & State Management](#context--state-management)
9. [Services & API](#services--api)
10. [Styling & Design](#styling--design)
11. [Deployment](#deployment)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Pengenalan Proyek

**PRISM** adalah aplikasi web frontend yang dirancang untuk **Lead Scoring System** - sistem scoring untuk leads berbasis AI yang membantu sales team dalam mengidentifikasi dan prioritas leads yang paling potensial.

### Fitur Utama:
- 📊 **Dashboard Analytics** - Visualisasi data dengan charts dan statistik
- 📤 **Data Input** - Upload file leads dan input data secara manual
- 👥 **Manage Profile** - Kelola profil sales dan konfigurasi
- 🔐 **Authentication** - Login dengan role-based access control (Admin & Sales)
- 🌓 **Dark Mode** - Support light dan dark theme

---

## 🛠️ Teknologi & Stack

### Frontend Framework
| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **React** | 18.2.0 | UI Library |
| **Vite** | 5.0.8 | Build tool & dev server |
| **React Router** | 6.20.0 | Client-side routing |
| **Tailwind CSS** | 3.3.6 | Utility-first CSS framework |

### Libraries Utama
| Paket | Versi | Fungsi |
|-------|-------|--------|
| **Axios** | 1.6.2 | HTTP client untuk API calls |
| **Framer Motion** | 12.23.24 | Animation library |
| **Recharts** | 2.10.3 | React charts library |
| **Lucide React** | 0.294.0 | Icon library |
| **XLSX** | 0.18.5 | Excel file handling |
| **clsx** | 2.0.0 | Conditional class names |

### Dev Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Struktur Proyek

```
fe/
├── src/
│   ├── components/
│   │   ├── Common/              # Reusable components
│   │   │   ├── Alert.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RoleProtectedRoute.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── ThemeToggle.jsx
│   │   │   └── ElegantStatCard.jsx
│   │   ├── Dashboard/           # Dashboard-specific components
│   │   │   ├── BarChart.jsx
│   │   │   ├── PieChart.jsx
│   │   │   ├── Statistic.jsx
│   │   │   ├── CustomerTable.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── AdvancedFilterModal.jsx
│   │   │   └── ActiveFilterBadges.jsx
│   │   ├── DataInput/           # Data input components
│   │   │   ├── FileUpload.jsx
│   │   │   ├── SingleCustomerForm.jsx
│   │   │   └── PredictionResultModal.jsx
│   │   └── Layout/              # Layout components
│   │       ├── MainLayout.jsx
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── pages/                   # Page components (routes)
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── DataInputPage.jsx
│   │   ├── ManageProfilePage.jsx
│   │   └── UnauthorizedPage.jsx
│   ├── context/                 # Context API for state
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.jsx
│   │   └── useLocalStorage.jsx
│   ├── services/                # API services
│   │   ├── api.js              # Axios instance + interceptors
│   │   └── index.js            # Service exports
│   ├── utils/                   # Utility functions
│   │   ├── helpers.js
│   │   ├── filterMappings.js
│   │   └── advancedFilterLogic.js
│   │ 
│   ├── assets/
│   │   ├── icons/              # SVG icons
│   │   └── images/             # Images & logos
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── public/                      # Static assets
│   ├── LogoPRISM.png           # Logo
│   └── _redirects              # Netlify routing config
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── jsconfig.json               # JavaScript config
├── package.json                # Dependencies
├── index.html                  # HTML template
└── vercel.json                 # Vercel deployment config
```

---

## 🚀 Setup & Instalasi

### Prerequisites
- Node.js v16+ (gunakan nvm untuk manage versi)
- npm atau yarn

### Langkah-langkah Instalasi

1. **Clone Repository**
```bash
git clone https://github.com/Capstone-A25-CS063/fe.git
cd fe
```

2. **Install Dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
Buat file `.env` atau `.env.local` di root project:
```env
VITE_API_URL=http://localhost:5000
# Atau untuk production:
# VITE_API_URL=https://api.yourdomain.com
```

4. **Run Development Server**
```bash
npm run dev
```
Server akan berjalan di `http://localhost:5173`

5. **Build untuk Production**
```bash
npm run build
```
Output akan ada di folder `dist/`

6. **Preview Production Build**
```bash
npm run preview
```

---

## 🔧 Konfigurasi Environment

### Environment Variables
| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `VITE_API_URL` | Base URL untuk API backend | `http://localhost:5000` |

### Akses Environment di Kode
```javascript
// Import di file mana saja
const apiUrl = import.meta.env.VITE_API_URL;
```

### File Konfigurasi Penting

**vite.config.js**
- Port development: 5173
- Path alias: `@` → `./src`
- Code splitting untuk vendor libraries
- ESBuild minification

**tailwind.config.js**
- Custom colors dan theme
- Dark mode support via class strategy

**jsconfig.json**
- Path aliases
- Automatic JSX transform

---

## 🛣️ Routing & Pages

### Route Structure
```
/                    → Redirect to /dashboard atau /login
/login               → Login page (public)
/dashboard           → Dashboard (protected, both admin & sales)
/data-input          → Data input (protected, admin only)
/manage-profile      → Profile management (protected, admin only)
/unauthorized        → 403 Forbidden page (protected)
```

### Routing Configuration (`App.jsx`)
```jsx
<Routes>
  {/* Public Routes */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/unauthorized" element={<UnauthorizedPage />} />
  
  {/* Protected Routes */}
  <Route 
    path="/dashboard" 
    element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
  />
  
  {/* Role-based Protected Routes */}
  <Route 
    path="/data-input" 
    element={<RoleProtectedRoute requiredRole="admin"><DataInputPage /></RoleProtectedRoute>} 
  />
  
  {/* Root redirect */}
  <Route path="/" element={<RootRedirect />} />
</Routes>
```

### Pages

#### **LoginPage.jsx**
- Form login dengan email & password
- Remember me functionality
- Error handling
- Responsive layout (2-column untuk desktop)
- Dark mode support

#### **DashboardPage.jsx**
- Main dashboard untuk semua authenticated users
- Charts & statistics
- Customer table dengan filtering
- Advanced filter modal
- Role-based content visibility

#### **DataInputPage.jsx** (Admin Only)
- File upload untuk bulk input
- Single customer form
- Prediction results display
- Error handling & validation

#### **ManageProfilePage.jsx** (Admin Only)
- Sales account management
- User profile editing
- Settings management

#### **UnauthorizedPage.jsx**
- Custom 403 page
- Untuk akses yang tidak authorized
- Button redirect ke dashboard atau logout

---

## 🧩 Komponen

### Common Components

#### **ProtectedRoute.jsx**
Proteksi route berdasarkan authentication status
```jsx
<ProtectedRoute>
  <ProtectedPage />
</ProtectedRoute>
```

#### **RoleProtectedRoute.jsx**
Proteksi route berdasarkan user role
```jsx
<RoleProtectedRoute requiredRole="admin">
  <AdminPage />
</RoleProtectedRoute>
```

#### **ThemeToggle.jsx**
Button untuk switch dark/light mode

#### **LanguageToggle.jsx**
Button untuk switch bahasa

#### **Modal.jsx**
Reusable modal component
```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Title">
  Content here
</Modal>
```

#### **Alert.jsx**
Notification component untuk success/error/warning

#### **Loading.jsx**
Loading spinner & skeleton loaders

#### **Pagination.jsx**
Pagination untuk data tables

#### **StatusBadge.jsx**
Badge untuk status indication

#### **ElegantStatCard.jsx**
Card untuk display statistics

### Dashboard Components

#### **BarChart.jsx** & **PieChart.jsx**
Charts menggunakan Recharts library

#### **CustomerTable.jsx**
Tabel data customer dengan pagination & actions

#### **FilterBar.jsx**
Simple filter controls

#### **AdvancedFilterModal.jsx**
Advanced filtering dengan multiple criteria

#### **Statistic.jsx**
Display key metrics & KPIs

### Layout Components

#### **MainLayout.jsx**
Layout wrapper dengan Sidebar + Header

#### **Sidebar.jsx**
Navigation sidebar dengan:
- Collapse/expand functionality
- Menu items based on user role
- Branding (PRISM logo)

#### **Header.jsx**
Top header dengan:
- User info & profile
- Logout button
- Settings

---

## 🎭 Context & State Management

### AuthContext.jsx
Mengelola authentication state
```javascript
const { user, token, login, logout, loading } = useAuth();
```

**Features:**
- Login/logout
- Token management
- User role & permissions
- SSR-safe (localStorage checks)

### ThemeContext.jsx
Mengelola dark/light mode
```javascript
const { darkMode, toggleTheme } = useTheme();
```

### Custom Hooks

#### **useAuth()**
```javascript
const { user, token, login, logout } = useAuth();
```

#### **useLocalStorage(key, initialValue)**
```javascript
const [value, setValue] = useLocalStorage('key', 'initial');
```

---

## 🔌 Services & API

### API Service (`services/api.js`)

**Axios Instance Configuration:**
- Base URL dari `VITE_API_URL`
- Default headers: `Content-Type: application/json`
- Request interceptor untuk token injection
- Response interceptor untuk error handling

**Interceptors:**
1. Request Interceptor - Tambah Authorization header dengan token
2. Response Interceptor - Handle error responses, logout jika token invalid

### Endpoints yang Digunakan

#### **Authentication**
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `POST /auth/register` - Register (jika ada)

#### **Dashboard**
- `GET /api/leads` - Get leads data
- `GET /api/leads/stats` - Get statistics
- `POST /api/leads/filter` - Filter leads

#### **Data Input**
- `POST /api/leads/upload` - Upload file
- `POST /api/leads/single` - Add single lead

#### **Profile**
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

---

## 🎨 Styling & Design

### Tailwind CSS
- Custom color palette (primary: blue, secondary: purple)
- Dark mode support via class strategy
- Responsive design (mobile-first approach)
- Utility classes untuk rapid development

### Color Scheme
```css
primary: #3B82F6 (Blue)
secondary: #A855F7 (Purple)
success: #10B981 (Green)
danger: #EF4444 (Red)
warning: #F59E0B (Amber)
```

### Typography
- Sans-serif font (system fonts)
- Font weights: 300 (light), 400 (normal), 600 (semibold), 700 (bold)

### Design System
- Border radius: 2xl, lg, md (rounded)
- Shadows: sm, md, lg, xl
- Spacing: 4px base unit
- Transitions: 300ms easing

---

## 📤 Deployment

### Deployment ke Netlify

1. **Push ke GitHub**
```bash
git add .
git commit -m "message"
git push
```

2. **Connect dengan Netlify**
- Sign up di Netlify
- Connect GitHub repository
- Netlify akan auto-detect settings

3. **Build Configuration**
- Build command: `npm run build`
- Publish directory: `dist`

4. **Environment Variables**
Di Netlify dashboard:
- `VITE_API_URL` = Production API URL

5. **SPA Routing**
File `_redirects` sudah ada:
```
/* /index.html 200
```

### Deployment ke Vercel

1. **Connect GitHub**
- Sign up di Vercel
- Import GitHub repo

2. **Framework Detection**
Vercel akan auto-detect Vite

3. **Environment Variables**
Tambah di Vercel dashboard:
- `VITE_API_URL`

4. **Auto Deployment**
- Auto deploy on push to main branch

---

## 🐛 Troubleshooting

### Common Issues

#### **"Cannot read properties of undefined (reading 'createContext')"**
**Penyebab:** Multiple `import React` statements (dengan automatic JSX transform)
**Solusi:** Remove semua `import React` dari file JSX

#### **404 Page not found saat refresh di non-root routes**
**Penyebab:** Server-side routing tidak configured
**Solusi:** Pastikan `_redirects` file ada di public folder (untuk Netlify)

#### **CORS Error saat API call**
**Penyebab:** Backend tidak allow frontend origin
**Solusi:** Configure CORS di backend atau gunakan proxy

#### **Logo/Favicon tidak muncul**
**Penyebab:** Path asset salah atau cache
**Solusi:** Copy assets ke public folder, clear browser cache

#### **Dark mode tidak switching**
**Penyebab:** ThemeContext tidak initialized
**Solusi:** Pastikan ThemeProvider wrapping App component

#### **Sidebar icons overlap**
**Penyebab:** Flex layout issue atau sizing problem
**Solusi:** Check flex-shrink-0, gap, dan width properties

### Debug Mode
Tambah di browser console:
```javascript
// Check auth context
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));

// Check API
fetch('http://localhost:5000/health').then(r => r.json()).then(console.log);
```

---

## 📝 Development Guidelines

### File Naming
- Components: `PascalCase.jsx`
- Pages: `PascalCase.jsx` (dalam pages folder)
- Utils/hooks: `camelCase.js`
- Styles: dengan Tailwind utilities (inline className)

### Code Structure
```jsx
// Imports
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Component from '@/components/...';

// Component
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState();
  
  const handleClick = () => {
    // Logic
  };
  
  return (
    <div>...</div>
  );
};

export default MyComponent;
```

### Best Practices
1. Use absolute imports dengan `@` alias
2. SSR-safe checks: `if (typeof window !== 'undefined')`
3. Proper error handling di API calls
4. Responsive design testing (mobile, tablet, desktop)
5. Accessibility considerations
6. Performance optimization (code splitting, lazy loading)

---

## 📚 Resources & References

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Recharts Documentation](https://recharts.org)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

## 👥 Contributors

- Frontend Team - Capstone A25 CS063

## 📄 License
Private Repository

---

**Last Updated:** December 12, 2025
