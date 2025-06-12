// src/types/sanity.ts
import type { PortableTextBlock, Slug, Image, Asset } from 'sanity';

// Interface de base pour les documents Sanity (avec _id, _type, _createdAt, _updatedAt)
export interface SanityBaseDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

// Interface pour les références d'images (simplifiée)
// Pour une utilisation plus complète avec @sanity/image-url,
// SanityImageSource peut être utilisé directement depuis le package.
export interface SanityImageReference extends Image {
  asset: Asset; // Asset contient les détails de l'image comme l'url
  alt?: string;
}

export interface Chantier extends SanityBaseDocument {
  _type: 'chantier';
  titre?: string;
  slug?: Slug;
  description?: string;
  images?: SanityImageReference[];
  date?: string; // Format YYYY-MM-DD
  localisation?: string;
}

export interface Conseil extends SanityBaseDocument {
  _type: 'conseil';
  titre?: string;
  slug?: Slug;
  contenu?: PortableTextBlock[]; // Pour le contenu riche de Sanity
  imagePrincipale?: SanityImageReference;
  extraitContenu?: string;
}

export interface AvisClient extends SanityBaseDocument {
  _type: 'avisClient';
  nom?: string;
  temoignage?: string;
  note?: number;
  photo?: SanityImageReference;
}

// Vous pouvez également définir des types plus spécifiques si nécessaire,
// par exemple pour les slugs ou les blocs de texte portables si vous avez des
// configurations personnalisées.
