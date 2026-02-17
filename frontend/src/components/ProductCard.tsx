import React, { useState } from 'react';
import type { Product, Language } from '../types/product';
import { X } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Logic to select description based on language
  const description = lang === 'en' ? product.descriptionENG : product.descriptionFRE;
  const imageSrc = product.image ? `/parts/${product.image}` : '/placeholder.png';

  const toggleModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="glass rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 h-full">
        {/* Image Container: White background to contrast with the grey card background */}
        <div 
          className="aspect-square w-full flex items-center justify-center bg-white p-6 transition-colors cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={imageSrc} 
            alt={product.partNumber}
            className="max-w-[250px] max-h-[250px] object-contain drop-shadow-sm"
            onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
          />
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {lang === 'en' ? product.sectionENG : product.sectionFRE}
          </span>
          <h3 className="font-bold text-marcone-red text-lg mb-2">
            {product.partNumber}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Full Size Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
          onClick={toggleModal}
        >
          {/* Close Button: Fixed in the top right, with inverted states (red background, white icon) */}
          <button 
            onClick={toggleModal}
            className="fixed top-6 right-6 z-[60] p-2 rounded-full bg-marcone-red shadow-lg text-white hover:bg-white hover:text-marcone-red transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={32} />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Container */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl overflow-hidden">
              <img 
                src={imageSrc} 
                alt={product.partNumber}
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};