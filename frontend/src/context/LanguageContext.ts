import { createContext } from 'react';
import type { Language } from '../types/product';

export interface LanguageContextType {
  lang: Language;
  setLanguage: (newLang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);