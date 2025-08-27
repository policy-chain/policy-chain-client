import React, { createContext, useContext } from 'react';

interface LanguageContextType {
  t: (key: { en: string; ko: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = (key: { en: string; ko: string }): string => {
    return key.ko; // Always return Korean
  };

  const value = {
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