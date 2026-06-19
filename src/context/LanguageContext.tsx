'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/i18n/translations';

type TranslationKeys = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const urlLang = new URLSearchParams(window.location.search).get('lang') as Language | null;
    if (urlLang && ['en', 'uz', 'ru', 'zh'].includes(urlLang)) {
      setLanguageState(urlLang);
      localStorage.setItem('bih-language', urlLang);
      return;
    }
    const saved = localStorage.getItem('bih-language') as Language;
    if (saved && ['en', 'uz', 'ru', 'zh'].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bih-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] as unknown as TranslationKeys }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
