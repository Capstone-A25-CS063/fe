import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

const Modal = ({ isOpen, title, children, onClose, size = 'md' }) => {
  const { darkMode } = useTheme();
  
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'w-96',
    md: 'w-2/3',
    lg: 'w-4/5',
    xl: 'w-11/12',
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`rounded-xl border shadow-lg ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col animate-slideIn transition-colors ${
          darkMode
            ? 'bg-gray-800 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex-shrink-0 flex items-center justify-between px-6 py-4 border-b rounded-t-xl transition-colors ${
          darkMode
            ? 'bg-gray-700 border-gray-600'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h2 className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h2>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-600 hover:text-white'
                : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-700'
            }`}
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto px-6 py-5 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
