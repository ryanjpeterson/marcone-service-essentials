import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <header className="w-full bg-white flex justify-center items-center py-4 border-b border-marcone-lightGrey">
      <div className="max-w-4xl w-full px-4">
        <img 
          src={lang === 'en' ? '/logo-eng.png' : '/logo-fre.png'} 
          alt="Marcone Service Essentials" 
          className="w-full h-auto max-h-[8rem] object-contain"
        />
      </div>
    </header>
  );
};