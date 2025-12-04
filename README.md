# 📁 Struktur Folder Frontend React

## Penjelasan Lengkap Struktur Direktori

```
fe/
├── node_modules/                # Dependencies (auto-generated)
├── public/                       # Static files
│   └── favicon.svg
│
├── src/
│   ├── assets/                   # Static assets
│   │   ├── images/              # Gambar dan ilustrasi
│   │   └── icons/               # SVG icons
│   │
│   ├── components/              # React components reusable
│   │   ├── Layout/              # Layout components
│   │   │   ├── Sidebar.jsx      # Sidebar navigation
│   │   │   ├── Header.jsx       # Top header
│   │   │   └── MainLayout.jsx   # Main layout wrapper
│   │   │
│   │   ├── Common/              # Common/shared components
│   │   │   ├── Modal.jsx        # Modal reusable
│   │   │   ├── Alert.jsx        # Alert notifications
│   │   │   ├── Loading.jsx      # Loading spinner
│   │   │   ├── StatusBadge.jsx  # Status badge dengan colors
│   │   │   └── ProtectedRoute.jsx # Route protection
│   │   │
│   │   ├── Dashboard/           # Dashboard-specific components
│   │   │   ├── PieChart.jsx     # Pie chart component
│   │   │   ├── FilterBar.jsx    # Filter for table
│   │   │   └── CustomerTable.jsx # Main customer table
│   │   │
│   │   ├── ManageProfile/       # Manage Profile components
│   │   │   └── SalesAccountTable.jsx # Sales account CRUD
│   │   │
│   │   └── DataInput/           # Data Input components
│   │       └── FileUpload.jsx   # CSV file upload with drag & drop
│   │
│   ├── pages/                   # Page components
│   │   ├── LoginPage.jsx        # Login page
│   │   ├── DashboardPage.jsx    # Dashboard page
│   │   ├── ManageProfilePage.jsx # Manage profile page
│   │   └── DataInputPage.jsx    # Data input page
│   │
│   ├── services/                # API services
│   │   ├── api.js               # Axios instance dengan interceptors
│   │   └── index.js             # Service functions (auth, customer, import, user)
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.js           # Auth context hook
│   │   └── useLocalStorage.js   # Local storage hook
│   │
│   ├── context/                 # Context API
│   │   └── AuthContext.jsx      # Authentication context
│   │
│   ├── utils/                   # Utility functions
│   │   ├── helpers.js           # Helper functions (format, colors, etc)
│   │   └── i18n.js              # Internationalization (Indo/English)
│   │
│   ├── App.jsx                  # Main App component dengan routing
│   ├── main.jsx                 # Entry point React
│   └── index.css                # Global styles (Tailwind CSS)
│
├── index.html                    # HTML template
├── package.json                  # NPM dependencies & scripts
├── .env                         # Environment variables (local)
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # Frontend documentation
```

---

## Penjelasan Setiap Folder

### 1. **src/assets/**
Menyimpan file static seperti gambar, SVG icons, dan aset lainnya.

```
assets/
├── images/
│   └── logo.png
└── icons/
    ├── dashboard.svg
    ├── users.svg
    └── upload.svg
```

### 2. **src/components/**
Komponen React yang reusable dan dapat digunakan di berbagai page.

#### **Layout/** - Komponen Layout Utama
- `Sidebar.jsx` - Navigation sidebar yang bisa dibuka/tutup
- `Header.jsx` - Top header dengan brand name
- `MainLayout.jsx` - Wrapper layout untuk semua pages

#### **Common/** - Komponen Shared
- `Modal.jsx` - Modal dialog reusable
- `Alert.jsx` - Alert notification (info, success, warning, error)
- `Loading.jsx` - Loading spinner
- `StatusBadge.jsx` - Status badge dengan berbagai warna
- `ProtectedRoute.jsx` - Route protection untuk authenticated users

#### **Dashboard/** - Dashboard Components
- `PieChart.jsx` - Pie chart component (Recharts)
- `FilterBar.jsx` - Filter section untuk filter table
- `CustomerTable.jsx` - Tabel nasabah dengan modal detail

#### **ManageProfile/** - Profile Management
- `SalesAccountTable.jsx` - Tabel & form untuk manage sales accounts

#### **DataInput/** - Data Upload
- `FileUpload.jsx` - Drag & drop file upload dengan preview

### 3. **src/pages/**
Page-level components yang mewakili route utama.

- `LoginPage.jsx` - Halaman login
- `DashboardPage.jsx` - Halaman dashboard utama
- `ManageProfilePage.jsx` - Halaman kelola profil
- `DataInputPage.jsx` - Halaman input data CSV

### 4. **src/services/**
Layer untuk komunikasi dengan backend API.

- `api.js` - Axios instance dengan interceptor untuk token
- `index.js` - Service functions (authService, customerService, dll)

### 5. **src/hooks/**
Custom React hooks untuk logic yang reusable.

- `useAuth.js` - Hook untuk akses auth context
- `useLocalStorage.js` - Hook untuk local storage management

### 6. **src/context/**
Context API untuk state management.

- `AuthContext.jsx` - Authentication context (user, token, login, logout)

### 7. **src/utils/**
Utility functions dan constants.

- `helpers.js` - Helper functions (format date, currency, colors, labels)
- `i18n.js` - Translation untuk Indo/English

---

## File Penting

### **App.jsx**
Main component yang handle routing dan AuthProvider wrapper.

```javascript
// Routing setup
- /login → LoginPage
- /dashboard → DashboardPage (protected)
- /manage-profile → ManageProfilePage (protected)
- /data-input → DataInputPage (protected)
```

### **main.jsx**
Entry point React yang merender App ke DOM.

### **index.css**
Global styles menggunakan Tailwind CSS dengan custom layers:
- Button styles (.btn-primary, .btn-secondary, .btn-danger)
- Card styles (.card)
- Input styles (.input-field)
- Modal styles (.modal-overlay)
- Animations (.animate-fadeIn, .animate-slideIn)

---

## Konfigurasi Penting

### **package.json** - Scripts

```json
{
  "dev": "vite",              // Jalankan dev server
  "build": "vite build",      // Build untuk production
  "preview": "vite preview",  // Preview build result
}
```

### **.env** - Environment Variables

```env
VITE_API_URL=http://localhost:3000
VITE_ML_API_URL=http://localhost:5000
```

### **vite.config.js** - Vite Configuration

```javascript
// Port dev server
port: 5173

// Auto open browser
open: true
```

### **tailwind.config.js** - Tailwind Customization

```javascript
// Custom colors (primary, secondary)
// Custom fonts
// Custom animations
```

---

## Component Usage Examples

### Menggunakan Layout

```javascript
import MainLayout from '../components/Layout/MainLayout';

function MyPage() {
  return (
    <MainLayout>
      {/* Content di sini */}
    </MainLayout>
  );
}
```

### Menggunakan Modal

```javascript
import Modal from '../components/Common/Modal';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        title="My Modal"
        onClose={() => setIsOpen(false)}
        size="md"
      >
        Modal content here
      </Modal>
    </>
  );
}
```

### Menggunakan API Service

```javascript
import { customerService } from '../services';

async function getCustomers() {
  try {
    const data = await customerService.getAllCustomers();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Menggunakan Auth Hook

```javascript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, token, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
```

---

## Best Practices

1. **Components** - Gunakan components di `components/` untuk reusable UI
2. **Pages** - Gunakan pages untuk route-level components
3. **Services** - Semua API calls melalui `services/`
4. **Hooks** - Extract logic ke custom hooks untuk reusability
5. **Utils** - Helper functions di utils untuk functions yang reusable
6. **Naming** - PascalCase untuk components, camelCase untuk functions/variables

---

## Menambahkan Feature Baru

### 1. Membuat Component Baru

```
src/components/MyFeature/
├── MyComponent.jsx
├── MySubComponent.jsx
└── MyFeature.module.css (optional)
```

### 2. Membuat Page Baru

```
src/pages/
└── MyNewPage.jsx
```

Lalu tambahkan route di `src/App.jsx`:

```javascript
<Route path="/my-route" element={<MyNewPage />} />
```

### 3. Menambahkan Service

Edit `src/services/index.js` dan tambahkan service functions baru.

### 4. Menambahkan Hook Baru

Buat file baru di `src/hooks/useMyHook.js`

---

## Dependency Utama

- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **recharts** - Chart library (Pie chart, Line chart, dll)
- **lucide-react** - Icon library
- **tailwindcss** - CSS framework
- **vite** - Build tool

---

## Tips Debugging

1. **Browser DevTools** - Inspect Elements, Network, Console
2. **React DevTools** - Extension untuk inspect React components
3. **Network Tab** - Check API requests & responses
4. **Local Storage** - Check token & user data di Application tab
5. **Console Logs** - Jangan lupa tambahkan console.log untuk debug

---

Untuk info lebih lanjut, lihat dokumentasi utama di root project folder.
