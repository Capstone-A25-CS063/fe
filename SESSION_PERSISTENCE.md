# 🔐 Session Persistence Guide

## Deskripsi Fitur
Ketika user berhasil login, session akan tetap tersimpan meskipun halaman di-refresh. User hanya akan kembali ke login page saat explicitly logout.

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  1. USER LOGIN                                              │
│  Input: email, password                                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  2. BACKEND VERIFY                                          │
│  Returns: { user, token }                                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  3. FRONTEND SAVE                                           │
│  login(user, token) in useAuth:                             │
│  - Save to React State                                       │
│  - Save to localStorage                                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  4. REDIRECT TO DASHBOARD                                   │
│  navigate('/dashboard')                                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  5. USER REFRESH PAGE (F5)                                  │
│  ProtectedRoute checks:                                      │
│  - Is user loading? → Show Loading spinner                   │
│  - Is token valid? → Render dashboard                        │
│  - No token? → Redirect to login                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  6. AUTHPROVIDER RESTORE SESSION                            │
│  useEffect on mount:                                         │
│  - Read token from localStorage                              │
│  - Read user from localStorage                               │
│  - Restore to React State                                    │
│  - Set loading = false                                       │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  7. DASHBOARD RENDERS SUCCESSFULLY ✅                        │
└─────────────────────────────────────────────────────────────┘
```

## Code Architecture

### 1. AuthProvider (useAuth.js)
```javascript
// On component mount:
useEffect(() => {
  const savedToken = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  
  if (savedToken && savedUser) {
    setToken(savedToken);
    setUser(JSON.parse(savedUser));
  }
  setLoading(false);  // ← PENTING: Set false agar ProtectedRoute render
}, []);

// On login:
const login = (userData, tokenData) => {
  setUser(userData);
  setToken(tokenData);
  localStorage.setItem('token', tokenData);
  localStorage.setItem('user', JSON.stringify(userData));
};

// On logout:
const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

### 2. ProtectedRoute (ProtectedRoute.jsx)
```javascript
const ProtectedRoute = ({ children }) => {
  const { token, user, loading } = useAuth();

  // PENTING: Wait for loading selesai (localStorage check)
  if (loading) {
    return <Loading fullScreen={true} />;
  }

  // Jika tidak ada token, redirect ke login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Render protected component
  return children;
};
```

### 3. LoginPage (LoginPage.jsx)
```javascript
const handleSubmit = async (e) => {
  // ... validation ...
  
  const response = await authService.login(email, password);
  
  // Call login function - akan auto save ke localStorage
  login(response.user, response.token);
  
  // Redirect
  navigate('/dashboard');
};
```

## Storage Keys

| Key | Value | Example |
|-----|-------|---------|
| `token` | JWT/Auth token | `eyJhbGciOiJIUzI1NiIs...` |
| `user` | User JSON object | `{"id": "123", "email": "user@email.com", ...}` |

## Browser DevTools - Check Storage

**Inspect localStorage:**
```javascript
// Console (F12)
localStorage.getItem('token')    // → JWT token string
localStorage.getItem('user')     // → JSON string
```

**Or via Application tab:**
1. Press F12
2. Application tab
3. Local Storage
4. Look for domain (e.g., localhost:5174)
5. Check `token` and `user` keys

## Testing Checklist

- [ ] **Login** → Check localStorage has token & user
- [ ] **Refresh dashboard** → Should NOT redirect to login
- [ ] **Close & reopen browser** → Should still be logged in
- [ ] **Logout** → localStorage cleared, redirect to login
- [ ] **Refresh after logout** → Should be at login page
- [ ] **Clear localStorage manually** → Next refresh should go to login
- [ ] **Invalid token in storage** → Should redirect to login (optional: validate token)

## Console Logs - For Debugging

Open browser console (F12) to see:

```
// On app startup:
🔐 Checking localStorage...
✅ Auth restored from localStorage

// On login:
🔐 Attempting login...
✅ Login response received: {...}
✅ Auth context updated

// On logout:
✅ User logged out and cleared from storage

// On refresh without session:
❌ No saved auth found
```

## Troubleshooting

### Problem: Still redirected to login after refresh
**Solutions:**
1. Check localStorage via F12 → Application → Local Storage
2. Check if token/user keys exist
3. Check browser console for errors
4. Try: Clear all localStorage and login again
5. Verify backend returns correct `token` and `user` in response

### Problem: Infinite loading spinner on refresh
**Solutions:**
1. Check if `loading` state is being set to `false` in useAuth
2. Check if ProtectedRoute is checking `loading` state
3. Check browser console for errors during localStorage parse
4. Try: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: Can't logout
**Solutions:**
1. Check if logout function is called in Header component
2. Check localStorage is cleared
3. Check navigate('/login') is executed
4. Try: Manual clear localStorage in console:
   ```javascript
   localStorage.clear()
   ```

## Advanced: Token Validation (Optional)

To add extra security, validate token on app startup:

```javascript
useEffect(() => {
  const initializeAuth = async () => {
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      try {
        // Optional: Validate token with backend
        const isValid = await validateTokenWithBackend(savedToken);
        
        if (isValid) {
          // Restore session
          const savedUser = localStorage.getItem('user');
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          // Token expired, clear storage
          localStorage.clear();
        }
      } catch (err) {
        localStorage.clear();
      }
    }
    setLoading(false);
  };
  
  initializeAuth();
}, []);
```

## Files Modified

✅ `fe/src/hooks/useAuth.js` - Enhanced localStorage handling with logging
✅ `fe/src/components/Common/ProtectedRoute.jsx` - Added loading state check
✅ `fe/src/pages/LoginPage.jsx` - Cleaned up login flow, removed redundant localStorage

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Nov 13, 2025 | Initial session persistence implementation |

