import React from 'react';
import { X } from 'lucide-react';

interface SidebarProps {
  categories: { sections: string[], subBySection: Record<string, string[]> };
  selectedSections: string[];
  setSelectedSections: (val: string[]) => void;
  clearFilters: () => void;
  isFiltered: boolean;
  isOpen: boolean; // For mobile modal state
  setIsOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  categories, selectedSections, setSelectedSections, clearFilters, isFiltered, isOpen, setIsOpen 
}) => {
  const toggleSection = (section: string) => {
    setSelectedSections(
      selectedSections.includes(section) 
        ? selectedSections.filter(s => s !== section) 
        : [...selectedSections, section]
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full p-4 bg-white border-r border-marcone-lightGrey overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg">Filters</h2>
        <button 
          onClick={clearFilters}
          disabled={!isFiltered}
          className={`text-sm font-medium transition ${isFiltered ? 'text-marcone-red hover:underline' : 'text-marcone-darkGrey opacity-50 cursor-not-allowed'}`}
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {categories.sections.map(section => (
          <div key={section}>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedSections.includes(section)}
                onChange={() => toggleSection(section)}
                className="w-4 h-4 accent-marcone-red"
              />
              <span className="font-medium group-hover:text-marcone-red transition">{section}</span>
            </label>
            {/* Subsections could be mapped here nested if preferred */}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile/Tablet Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl flex flex-col">
            <div className="p-4 border-b flex justify-end">
              <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-hidden">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};