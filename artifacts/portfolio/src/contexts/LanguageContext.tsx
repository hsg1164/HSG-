import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  translations,
  StringTranslationKey,
  ArrayTranslationKey,
} from '../lib/translations';

type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  /** يجلب نصاً (String) */
  t: (key: StringTranslationKey) => string;
  /** يجلب قائمة نصوص (Array) */
  tList: (key: ArrayTranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    if (lang === 'en') {
      document.documentElement.classList.add('lang-en');
      document.documentElement.classList.remove('lang-ar');
    } else {
      document.documentElement.classList.add('lang-ar');
      document.documentElement.classList.remove('lang-en');
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: StringTranslationKey): string => {
    const value = translations[lang][key];
    return typeof value === 'string' ? value : key;
  };

  const tList = (key: ArrayTranslationKey): string[] => {
    const value = translations[lang][key];
    return Array.isArray(value) ? [...value] : [];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, tList }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
