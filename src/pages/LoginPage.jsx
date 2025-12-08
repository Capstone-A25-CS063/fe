import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth.jsx';
import { authService } from '@/services/index.js';
import Alert from '@/components/Common/Alert';
import ThemeToggle from '@/components/Common/ThemeToggle.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoadingState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  // Remember me functionality (SSR-safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem('rememberEmail');
      if (savedEmail) {
        setFormData(prev => ({ ...prev, email: savedEmail }));
        setRememberMe(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoadingState(true);
      const response = await authService.login(
        formData.email,
        formData.password
      );

      // Save email if remember me is checked (SSR-safe)
      if (typeof window !== 'undefined') {
        if (rememberMe) {
          localStorage.setItem('rememberEmail', formData.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }
      }

      login(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || 'Login failed, please try again';
      setError(errorMsg);
    } finally {
      setLoadingState(false);
    }
  };

  return (
    <section className={`min-h-screen flex items-center justify-center px-4 py-10 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      
      {/* Dark Mode Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        <div className={`rounded-2xl overflow-hidden lg:flex border transition-colors duration-300 ${
          darkMode 
            ? 'bg-gray-800 border-gray-700 shadow-2xl' 
            : 'bg-white border-gray-100 shadow-2xl'
        }`}>
          
          {/* LEFT SIDE — Branding Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900' 
                : 'bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600'
            }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-12 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2">
                    <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      <defs>
                        <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#0891B2', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#0369A1', stopOpacity: 1}} />
                        </linearGradient>
                        <linearGradient id="gradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#06B6D4', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#0891B2', stopOpacity: 1}} />
                        </linearGradient>
                        <linearGradient id="gradientCenter" x1="50%" y1="0%" x2="50%" y2="100%">
                          <stop offset="0%" style={{stopColor: '#14B8A6', stopOpacity: 1}} />
                          <stop offset="100%" style={{stopColor: '#0891B2', stopOpacity: 1}} />
                        </linearGradient>
                      </defs>
                      <polygon points="340,180 340,540 550,540" fill="url(#gradientLeft)" opacity="0.9"/>
                      <polygon points="550,180 550,540 760,540" fill="url(#gradientRight)" opacity="0.85"/>
                      <polygon points="550,180 445,360 550,360" fill="url(#gradientCenter)" opacity="0.95"/>
                      <polygon points="445,180 550,180 497.5,280" fill="#06B6D4" opacity="0.7"/>
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-white">PRISM</h1>
                </div>
                <h2 className="text-5xl font-bold text-white leading-tight">
                  Lead Scoring<br />Simplified
                </h2>
              </div>

              <div className="space-y-3">
                <p className="text-blue-100 text-lg font-light">
                  AI-powered lead scoring<br />for data-driven decisions
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`w-full lg:w-1/2 p-8 lg:p-12 transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-800' 
                : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className="mb-10">
              <h1 className={`text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Welcome Back
              </h1>
              <p className={`mt-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-sm font-medium ${
                    darkMode
                      ? 'bg-red-900/30 border border-red-700 text-red-200'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {error}
                </motion.div>
              )}

              {/* Email Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className={`absolute left-4 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`block w-full py-3 pl-12 pr-4 rounded-lg text-sm transition-all duration-200 outline-none ${
                      darkMode
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className={`absolute left-4 ${
                    darkMode ? 'text-gray-600' : 'text-gray-400'
                  }`} size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`block w-full py-3 pl-12 pr-12 rounded-lg text-sm transition-all duration-200 outline-none ${
                      darkMode
                        ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 transition-colors ${
                      darkMode ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={`w-4 h-4 rounded transition-colors ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 accent-blue-500'
                        : 'bg-gray-50 border-gray-300 accent-blue-600'
                    }`}
                  />
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Remember me
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-sm font-semibold tracking-wide text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <LogIn size={18} />
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className={`absolute inset-0 flex items-center ${
                darkMode ? '' : ''
              }`}>
                <div className={`w-full h-px ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              </div>
            </div>

            {/* Demo Info */}
            <div className={`p-3 rounded-lg text-xs text-center ${
              darkMode
                ? 'bg-gray-700/50 border border-gray-600'
                : 'bg-gray-50 border border-gray-200'
            }`}>
              <p className={`${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Demo: <span className={`font-mono ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>admin@gmail.com</span> / <span className={`font-mono ${
                  darkMode ? 'text-blue-300' : 'text-blue-600'
                }`}>password123</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LoginPage;
