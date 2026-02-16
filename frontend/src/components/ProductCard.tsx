import React from 'react';
import type { Product, Language } from '../types/product';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang }) => {
  const description = lang === 'en' ? product.descriptionENG : product.descriptionFRE;
  
  // Use placeholder.png if image is null or empty string
  const imageSrc = product.image ? `/parts/${product.image}` : '/placeholder.png';

  return (
    <div className="bg-white rounded-lg border border-marcone-lightGrey shadow-sm overflow-hidden flex flex-col hover:border-marcone-red/50 transition-colors">
      <div className="aspect-square w-full bg-white p-4 flex items-center justify-center">
        <img 
          src={imageSrc} 
          alt={product.partNumber}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.png';
          }}
        />
      </div>
      
      <div className="p-4 border-t border-marcone-lightGrey bg-gray-50 flex-1">
        <h3 className="font-bold text-marcone-red text-lg mb-1">
          {product.partNumber}
        </h3>
        <p className="text-marcone-darkGrey text-sm leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
};