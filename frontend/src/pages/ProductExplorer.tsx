import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useProductFilter } from '../hooks/useProductFilter';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { Filter, Loader2 } from 'lucide-react';

export const ProductExplorer: React.FC = () => {
  const { lang } = useLanguage();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const filterProps = useProductFilter(lang);

  // Trigger loading spinner on any changes
  useEffect(() => {
    // To avoid the synchronous setState warning, only set false in the timer
    // The 'true' state can be set by the interaction or ignored if the timer handles it
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      clearTimeout(timer);
      setIsLoading(true); // Reset to true when dependencies change (cleanup phase)
    };
  }, [filterProps.searchQuery, filterProps.selectedSections, lang]);

  // Language based strings
  const strings = {
    en: { title: "Product Explorer", search: "Search part number or description...", empty: "No products found.", loading: "Loading products..." },
    fr: { title: "Explorateur de produits", search: "Rechercher un numéro de pièce...", empty: "Aucun produit trouvé.", loading: "Chargement des produits..." }
  }[lang];

  return (
    <div className="flex flex-1 overflow-hidden w-full">
      <Sidebar 
        {...filterProps} // Pass the spread props which now include subsections
        isOpen={isMobileSidebarOpen} 
        setIsOpen={setIsMobileSidebarOpen} 
        lang={lang}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center gap-4 px-4 py-2 w-full">
          <div className="flex-1">
            <SearchBar 
              value={filterProps.searchQuery} 
              onChange={filterProps.setSearchQuery} 
              placeholder={strings.search}
            />
          </div>
          <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden glass p-3 rounded-xl text-marcone-red">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-8 relative">
          {isLoading ? (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
              <Loader2 className="animate-spin text-marcone-red mb-2" size={40} />
              <p className="font-medium text-slate-500">{strings.loading}</p>
            </div>
          ) : filterProps.filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filterProps.filteredProducts.map((p, i) => (
                <ProductCard key={`${p.partNumber}-${i}`} product={p} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center glass rounded-2xl">
              <p className="text-lg text-slate-500">{strings.empty}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};