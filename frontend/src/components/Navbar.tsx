import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Navbar: React.FC = () => {
  const { lang, setLanguage } = useLanguage();

  return (
    <nav className="sticky top-0 z-30 w-full glass h-20 px-6 flex items-center justify-between border-b shadow-sm">
      {/* Left side: External Link */}
      <div className="flex-1">
        <a href="https://www.marcone.com" target="_blank" rel="noopener noreferrer">
          <img src="/marcone.svg" alt="Marcone" className="h-6 opacity-70 hover:opacity-100 transition" />
        </a>
      </div>

      {/* Center: Main Logo */}
      <div className="flex-none">
        <img 
          src={lang === 'en' ? '/logo-eng.png' : '/logo-fre.png'} 
          alt="Marcone Service Essentials" 
          className="h-12 md:h-14 object-contain"
        />
      </div>

      {/* Right side: Language Toggle */}
      <div className="flex-1 flex justify-end">
        <button 
          onClick={() => setLanguage(lang === 'en' ? 'fr' : 'en')}
          className="relative flex items-center bg-gray-200/50 rounded-full p-1 w-16 h-8 transition-colors hover:bg-gray-300/50"
        >
          <div className={`absolute w-6 h-6 bg-marcone-red rounded-full shadow-md transform transition-transform duration-300 ${lang === 'fr' ? 'translate-x-8' : 'translate-x-0'}`} />
          <span className="sr-only">Switch Language</span>
          <span className={`absolute left-2 text-[10px] font-bold ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
          <span className={`absolute right-2 text-[10px] font-bold ${lang === 'fr' ? 'text-white' : 'text-gray-500'}`}>FR</span>
        </button>
      </div>
    </nav>
  );
};