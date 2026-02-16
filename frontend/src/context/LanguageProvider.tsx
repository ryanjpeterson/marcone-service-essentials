import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Language } from '../types/product';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lang: Language = (pathSegments[0] === 'fr') ? 'fr' : 'en';

  const setLanguage = (newLang: Language) => {
    localStorage.setItem('marconeServiceEssentialsLanguage', newLang);
    const newSegments = [...pathSegments];
    newSegments[0] = newLang;
    navigate(`/${newSegments.join('/')}`);
  };

  useEffect(() => {
    localStorage.setItem('marconeServiceEssentialsLanguage', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};