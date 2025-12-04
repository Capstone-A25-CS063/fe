import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '@/context/AuthContext.jsx';
import { ThemeProvider } from '@/context/ThemeContext.jsx';
import { setAuthContext } from '@/services/api.js';
import ProtectedRoute from './components/Common/ProtectedRoute';
import RoleProtectedRoute from './components/Common/RoleProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ManageProfilePage from './pages/ManageProfilePage';
import DataInputPage from './pages/DataInputPage';

// Styles
import './index.css';

// Root redirect component
function RootRedirect() {
  const { token, loading, isInitialized } = useContext(AuthContext);
  
  // Still loading auth state
  if (!isInitialized || loading) {
    return <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>;
  }
  
  // Redirect based on token
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

// Inner app component that has access to AuthContext
function AppInner() {
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    // Initialize auth context reference in API service
    setAuthContext(authContext);
  }, [authContext]);
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-profile"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['admin']}>
              <ManageProfilePage />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/data-input"
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['admin']}>
              <DataInputPage />
            </RoleProtectedRoute>
          </ProtectedRoute>
        }
      />

      {/* Default Route - Smart redirect */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppInner />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
