import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLang: Language;
  toggleLanguage: () => void;
  t: (key: { en: string; ko: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<Language>('ko');

  const toggleLanguage = useCallback(() => {
    setCurrentLang(prev => prev === 'en' ? 'ko' : 'en');
  }, []);

  const t = useCallback((key: { en: string; ko: string }): string => {
    return key[currentLang];
  }, [currentLang]);

  const value = {
    currentLang,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage는 LanguageProvider 내에서 사용되어야 합니다');
  }
  return context;
};