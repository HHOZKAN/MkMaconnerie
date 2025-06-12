// src/types/sanity.ts
import type { PortableTextBlock } from '@portabletext/types';

// Interface de base pour les documents Sanity
export interface SanityBaseDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
}

// Interface pour le slug
export interface Slug {
  current: string;
}

// Interface pour les métadonnées d'asset
export interface AssetMetadata {
  lqip?: string;
  dimensions?: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

// Interface pour les assets
export interface Asset {
  _id: string;
  _ref?: string;
  url?: string;
  metadata?: AssetMetadata;
}

// Interface pour les références d'images
export interface SanityImageReference {
  _key?: string;
  _type?: string;
  asset: Asset;
  alt?: string;
  // Autres propriétés possibles pour les images Sanity
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Le reste de vos interfaces reste inchangé
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
