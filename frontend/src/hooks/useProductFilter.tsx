import { useState, useMemo } from 'react';
import productsData from '../data/data.json'; 
import type { Product, Language } from '../types/product';
import { sanitizeString } from '../utils/search';

export const useProductFilter = (lang: Language) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedSubsections, setSelectedSubsections] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return (productsData as Product[]).filter((product) => {
      const section = lang === 'en' ? product.sectionENG : product.sectionFRE;
      const subsection = lang === 'en' ? product.subsectionENG : product.subsectionFRE;
      
      const sectionMatch = selectedSections.length === 0 || selectedSections.includes(section);
      const subsectionMatch = selectedSubsections.length === 0 || selectedSubsections.includes(subsection);

      const cleanQuery = sanitizeString(searchQuery);
      // FIX: Ensure partNumber is a string before calling toLowerCase/sanitize
      const cleanPart = sanitizeString(product.partNumber?.toString() || '');

      const rawDescription = lang === 'en' ? product.descriptionENG : product.descriptionFRE;
      const cleanDesc = sanitizeString(rawDescription || '');

      const searchMatch = !cleanQuery || cleanPart.includes(cleanQuery) || cleanDesc.includes(cleanQuery);
      
      return sectionMatch && subsectionMatch && searchMatch;
    });
  }, [lang, searchQuery, selectedSections, selectedSubsections]);

  const categories = useMemo(() => {
    const sections = new Set<string>();
    const subBySection: Record<string, Set<string>> = {};

    (productsData as Product[]).forEach(p => {
      const s = lang === 'en' ? p.sectionENG : p.sectionFRE;
      const sub = lang === 'en' ? p.subsectionENG : p.subsectionFRE;
      if (s) {
        sections.add(s);
        if (!subBySection[s]) subBySection[s] = new Set();
        if (sub) subBySection[s].add(sub);
      }
    });

    return { 
      sections: Array.from(sections).sort(), 
      subBySection: Object.fromEntries(
        Object.entries(subBySection).map(([k, v]) => [k, Array.from(v).sort()])
      )
    };
  }, [lang]);

  const clearFilters = () => {
    setSelectedSections([]);
    setSelectedSubsections([]);
    setSearchQuery('');
  };

  return {
    filteredProducts,
    categories,
    searchQuery,
    setSearchQuery,
    selectedSections,
    setSelectedSections,
    selectedSubsections,
    setSelectedSubsections,
    clearFilters,
    isFiltered: selectedSections.length > 0 || selectedSubsections.length > 0 || searchQuery !== ''
  };
};