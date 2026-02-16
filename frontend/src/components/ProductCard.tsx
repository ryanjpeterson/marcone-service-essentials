import React from 'react';
import type { Product, Language } from '../types/product';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang }) => {
  // Logic to select description based on language
  const description = lang === 'en' ? product.descriptionENG : product.descriptionFRE;
  const imageSrc = product.image ? `/parts/${product.image}` : '/placeholder.png';

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
      {/* Image Container: Max 250px x 250px Square */}
      <div className="aspect-square w-full max-w-[250px] mx-auto p-6 flex items-center justify-center bg-white/50 group-hover:bg-white transition-colors">
        <img 
          src={imageSrc} 
          alt={product.partNumber}
          className="max-w-full max-h-full object-contain drop-shadow-sm"
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
  );
};