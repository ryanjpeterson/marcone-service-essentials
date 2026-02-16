/**
 * Strips all non-alphanumeric characters and converts to lowercase
 */

import type { Language, Product } from "../types/product";

/**
 * Strips all non-alphanumeric characters and converts to lowercase.
 * Safely handles null or undefined values.
 */
export const sanitizeString = (str: string | null | undefined): string => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  return str.replace(/[^a-z0-9]/gi, '').toLowerCase();
};

/**
 * Validates if a product matches the search query based on partNumber or description
 */
export const matchesSearch = (product: Product, query: string, lang: Language): boolean => {
  const cleanQuery = sanitizeString(query);
  if (!cleanQuery) return true;

  const cleanPart = sanitizeString(product.partNumber);
  const cleanDesc = sanitizeString(lang === 'en' ? product.descriptionENG : product.descriptionFRE);

  return cleanPart.includes(cleanQuery) || cleanDesc.includes(cleanQuery);
};