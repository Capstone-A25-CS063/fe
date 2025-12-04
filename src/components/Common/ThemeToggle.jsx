import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext.jsx';

const ThemeToggle = ({ className = '' }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl ${
        darkMode 
          ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
          : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
      } ${className}`}
      title={darkMode ? 'Light Mode' : 'Dark Mode'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
