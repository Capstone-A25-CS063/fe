import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize auth state - check if token exists in localStorage (SSR-safe)
    const initializeAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedToken = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          
          if (storedToken && storedUser) {
            // Token exists - set it but don't automatically trust it
            // Let API calls validate it; if 401 occurs, we'll clear it
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          }
          // If no token, user stays null - will redirect to login
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted storage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // Clear auth when token becomes invalid (401 error)
  const clearAuth = () => {
    logout();
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        loading,
        isInitialized,
        setLoading, 
        login, 
        logout,
        clearAuth 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
