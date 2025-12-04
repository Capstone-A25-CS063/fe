import { createContext, useState, useEffect, useContext } from 'react';
import { languages, getLanguageCode } from '@/utils/i18n.js';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from localStorage (SSR-safe)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') || 'en';
      const validLanguage = getLanguageCode(savedLanguage);
      setLanguage(validLanguage);
    }
    setIsLoading(false);
  }, []);

  // Change language
  const changeLanguage = (lang) => {
    const validLanguage = getLanguageCode(lang);
    setLanguage(validLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', validLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
