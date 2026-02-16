export interface Product {
  sectionENG: string;
  sectionFRE: string;
  subsectionENG: string;
  subsectionFRE: string;
  partNumber: string;
  descriptionENG: string;
  descriptionFRE: string;
  image: string | null;
}

export type Language = 'en' | 'fr';