import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useProductFilter } from '../hooks/useProductFilter';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { Filter } from 'lucide-react';

export const ProductExplorer: React.FC = () => {
  const { lang } = useLanguage();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const {
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedSections,
    setSelectedSections,
    clearFilters,
    isFiltered
  } = useProductFilter(lang);

  return (
    <div className="flex flex-1 overflow-hidden w-full">
      {/* Sidebar - Desktop and Mobile version */}
      <Sidebar 
        categories={categories}
        selectedSections={selectedSections}
        setSelectedSections={setSelectedSections}
        clearFilters={clearFilters}
        isFiltered={isFiltered}
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
      />

      {/* Main Grid Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-marcone-lightGrey">
        <div className="flex items-center gap-2 pr-4 lg:pr-0">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          {/* Mobile Filter Trigger */}
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-3 bg-white border border-marcone-darkGrey/30 rounded-lg text-marcone-red"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Scrollable Card Container */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={`${product.partNumber}-${index}`} 
                  product={product} 
                  lang={lang} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-marcone-darkGrey">
              <p className="text-lg">No products found matching your criteria.</p>
              <button onClick={clearFilters} className="text-marcone-red underline mt-2">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};