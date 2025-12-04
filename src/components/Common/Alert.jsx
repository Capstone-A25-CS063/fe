import React from 'react';
import { AlertCircle } from 'lucide-react';

const Alert = ({ type = 'info', message, onClose }) => {
  const typeClasses = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    error: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className={`border rounded-lg p-4 flex items-center gap-3 ${typeClasses[type]}`}>
      <AlertCircle size={20} />
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
