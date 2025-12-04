import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useTheme } from '@/context/ThemeContext.jsx';

const LanguageToggle = ({ className = '' }) => {
  const { language, changeLanguage, languages } = useLanguage();
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 ${
          darkMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        title="Change Language"
      >
        <Globe size={20} />
        <span className="text-sm font-semibold">{language.toUpperCase()}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 py-2 rounded-lg shadow-xl z-50 min-w-[160px] ${
          darkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        }`}>
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                changeLanguage(code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 transition-colors ${
                language === code
                  ? darkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{name}</div>
              <div className="text-xs opacity-75">{code.toUpperCase()}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
