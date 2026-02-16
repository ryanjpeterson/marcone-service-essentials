import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLanguage } = useLanguage();

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-marcone-lightGrey h-16">
      <a href="https://www.marcone.com" target="_blank" rel="noopener noreferrer">
        <img src="/marcone.svg" alt="Marcone" className="h-8" />
      </a>
      
      <button 
        onClick={() => setLanguage(lang === 'en' ? 'fr' : 'en')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-marcone-darkGrey text-sm font-medium hover:bg-marcone-lightGrey transition-colors"
      >
        <Globe size={16} />
        {lang === 'en' ? 'Français' : 'English'}
      </button>
    </nav>
  );
};