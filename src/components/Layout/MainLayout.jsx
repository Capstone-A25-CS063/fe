import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from '../Common/ThemeToggle';
import { useTheme } from '@/context/ThemeContext.jsx';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });
  const { darkMode } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
    }
  }, [sidebarOpen]);

  return (
    <div className={`flex h-screen min-w-0 transition-all duration-500 ease-in-out ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      
      <Sidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />

      <div
        className={`
          flex-1 flex flex-col min-w-0 transition-all duration-500 ease-in-out   
          ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
        `}
      >
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-40">
          <ThemeToggle />
        </div>

        <main className={`flex-1 min-w-0 overflow-auto pt-6 lg:pt-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="px-4 lg:px-8 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
