import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    /* Removed p-4 and bg-marcone-lightGrey to get rid of the grey overlay */
    <div className="sticky top-0 z-10 p-4">
      {/* max-w-none: allows it to take full space, flex-1: grows to available space */}
      <div className="relative flex items-center w-full max-w-none">
        <Search className="absolute left-3 text-marcone-darkGrey" size={18} />
        <input 
          type="text"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          /* grow: ensures the input expands horizontally */
          /* glass: custom utility from your CSS for consistency */
          className="grow w-full pl-10 pr-12 py-3 rounded-xl border border-white/20 glass outline-none shadow-md transition-all focus:ring-2 focus:ring-marcone-red/50"
        />
        {value && (
          <button 
            onClick={() => onChange('')}
            className="absolute right-3 p-1 text-marcone-darkGrey hover:text-marcone-red"
          >
            <RotateCcw size={18} />
          </button>
        )}
      </div>
    </div>
  );
};