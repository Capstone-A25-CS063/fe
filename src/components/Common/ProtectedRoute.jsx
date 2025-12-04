import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from "@/context/AuthContext.jsx";
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  const { token, user, loading, isInitialized } = useContext(AuthContext);

  // Tunggu hingga loading selesai cek localStorage
  if (!isInitialized || loading) {
    return <Loading fullScreen={true} />;
  }

  // Jika tidak ada token, redirect ke login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
