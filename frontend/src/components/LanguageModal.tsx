import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageModal: React.FC = () => {
  const { setLanguage } = useLanguage();
  
  // Initialize state synchronously during the first render
  const [isOpen, setIsOpen] = useState(() => {
    const savedLang = localStorage.getItem('marconeServiceEssentialsLanguage');
    return !savedLang; // if no saved lang, modal is open (true)
  });

  // We can remove the useEffect entirely now

  if (!isOpen) return null;

  const handleSelect = (lang: 'en' | 'fr') => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Select Language / Choisir la langue</h2>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => handleSelect('en')}
            className="bg-marcone-red text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            English
          </button>
          <button 
            onClick={() => handleSelect('fr')}
            className="bg-marcone-red text-white py-3 rounded font-semibold hover:bg-red-700 transition"
          >
            Français
          </button>
        </div>
      </div>
    </div>
  );
};