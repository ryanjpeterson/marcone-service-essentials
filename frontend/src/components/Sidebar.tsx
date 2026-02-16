import React, { useState } from 'react';
import { X, LayoutGrid, ChevronDown, ChevronRight } from 'lucide-react';
import type { Language } from '../types/product'; // Fixed type-only import

interface SidebarProps {
  categories: { sections: string[], subBySection: Record<string, string[]> };
  selectedSections: string[];
  setSelectedSections: (val: string[]) => void;
  selectedSubsections: string[];
  setSelectedSubsections: (val: string[]) => void;
  clearFilters: () => void;
  isFiltered: boolean;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  categories, selectedSections, setSelectedSections, 
  selectedSubsections, setSelectedSubsections,
  clearFilters, isFiltered, isOpen, setIsOpen, lang 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleExpand = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleSection = (section: string) => {
    const isSelected = selectedSections.includes(section);
    const subs = categories.subBySection[section] || [];

    if (isSelected) {
      setSelectedSections(selectedSections.filter(s => s !== section));
      setSelectedSubsections(selectedSubsections.filter(sub => !subs.includes(sub)));
    } else {
      setSelectedSections([...selectedSections, section]);
      setSelectedSubsections([...new Set([...selectedSubsections, ...subs])]);
    }
  };

  const toggleSub = (sub: string) => {
    setSelectedSubsections(
      selectedSubsections.includes(sub) 
        ? selectedSubsections.filter(s => s !== sub) 
        : [...selectedSubsections, sub]
    );
  };

  const content = (
    <div className="flex flex-col h-full p-6 glass border-r overflow-y-auto">
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

      <div className="space-y-2">
        {categories.sections.map((section) => {
          const isExpanded = expandedSections.includes(section);
          const isChecked = selectedSections.includes(section);

          return (
            <div key={section} className="flex flex-col">
              <div className="flex items-center group">
                <button 
                  onClick={() => toggleExpand(section)}
                  className="p-1 hover:bg-gray-100 rounded transition text-gray-400"
                >
                  {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                <label className="flex items-center gap-3 cursor-pointer flex-1 py-1">
                  <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={() => toggleSection(section)}
                    className="w-4 h-4 rounded border-gray-300 accent-marcone-red"
                  />
                  <span className={`text-sm font-medium transition ${isChecked ? 'text-marcone-red' : 'text-slate-600'}`}>
                    {section}
                  </span>
                </label>
              </div>

              {isExpanded && (
                <div className="ml-9 mt-1 space-y-1 border-l border-gray-200 pl-4">
                  {categories.subBySection[section]?.map((sub) => (
                    <label key={sub} className="flex items-center gap-3 cursor-pointer py-1 group">
                      <input 
                        type="checkbox" 
                        checked={selectedSubsections.includes(sub)}
                        onChange={() => toggleSub(sub)}
                        className="w-3.5 h-3.5 rounded border-gray-300 accent-marcone-red/70"
                      />
                      <span className={`text-xs transition ${selectedSubsections.includes(sub) ? 'text-marcone-red' : 'text-slate-500'}`}>
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-72 h-full flex-shrink-0">{content}</aside>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute left-0 h-full w-80 bg-white shadow-2xl">
            <div className="p-4 flex justify-end"><button onClick={() => setIsOpen(false)}><X /></button></div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};