import React from 'react';
import { X, LayoutGrid } from 'lucide-react';
import type { Language } from '../types/product';

interface SidebarProps {
  categories: { sections: string[], subBySection: Record<string, string[]> };
  selectedSections: string[];
  setSelectedSections: (val: string[]) => void;
  clearFilters: () => void;
  isFiltered: boolean;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  categories, selectedSections, setSelectedSections, clearFilters, isFiltered, isOpen, setIsOpen, lang 
}) => {
  const toggleSection = (section: string) => {
    setSelectedSections(
      selectedSections.includes(section) 
        ? selectedSections.filter(s => s !== section) 
        : [...selectedSections, section]
    );
  };

  const content = (
    <div className="flex flex-col h-full p-6 glass border-r">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <LayoutGrid size={20} className="text-marcone-red" />
          {lang === 'en' ? 'Categories' : 'Catégories'}
        </h2>
        {isFiltered && (
          <button onClick={clearFilters} className="text-xs font-bold text-marcone-red hover:underline">
            {lang === 'en' ? 'CLEAR' : 'EFFACER'}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {categories.sections.map((section: string) => (
          <div key={section} className="group">
            <label className="flex items-center gap-3 cursor-pointer py-1">
              <input 
                type="checkbox" 
                checked={selectedSections.includes(section)}
                onChange={() => toggleSection(section)}
                className="w-5 h-5 rounded border-gray-300 text-marcone-red focus:ring-marcone-red accent-marcone-red"
              />
              <span className={`font-medium transition ${selectedSections.includes(section) ? 'text-marcone-red' : 'text-slate-600'}`}>
                {section}
              </span>
            </label>
            {/* Display relevant subsections if parent is active */}
            {selectedSections.includes(section) && (
              <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                {categories.subBySection[section]?.map((sub: string) => (
                  <p key={sub} className="text-xs text-slate-400 italic">{sub}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 h-full flex-shrink-0">{content}</aside>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute left-0 h-full w-80 bg-white shadow-2xl animate-in slide-in-from-left">
            <div className="p-4 flex justify-end"><button onClick={() => setIsOpen(false)}><X /></button></div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};