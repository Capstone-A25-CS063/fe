import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "@/context/AuthContext.jsx";
import Loading from './Loading';

const RoleProtectedRoute = ({ children, allowedRoles = ['admin'] }) => {
  const { token, user, loading, isInitialized } = useContext(AuthContext);

  // Tunggu hingga loading selesai cek localStorage
  if (!isInitialized || loading) {
    return <Loading fullScreen={true} />;
  }

  // Jika tidak ada token, redirect ke login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Cek role user (normalize to lowercase)
  const userRole = user?.role?.toLowerCase() || 'sales';
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());
  const hasAccess = normalizedAllowedRoles.includes(userRole);

  // Jika tidak punya role yang diperlukan, redirect ke unauthorized page
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
