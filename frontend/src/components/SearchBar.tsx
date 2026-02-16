import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="sticky top-0 z-10 bg-marcone-lightGrey p-4">
      <div className="relative flex items-center max-w-2xl mx-auto">
        <Search className="absolute left-3 text-marcone-darkGrey" size={18} />
        <input 
          type="text"
          placeholder="Search part number or description..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-12 py-3 rounded-lg border border-marcone-darkGrey/30 focus:border-marcone-red focus:ring-1 focus:ring-marcone-red outline-none shadow-sm"
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