// src/lib/sanity.ts
import {createClient, type ClientConfig} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

// Remplacez ces valeurs par celles de votre projet Sanity !
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-08' // Utilisez une date récente

if (!projectId || projectId === 'YOUR_PROJECT_ID') {
  console.warn('Sanity projectId is not set. Please update src/lib/sanity.ts or set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment variables.');
}
if (!dataset) {
  console.warn('Sanity dataset is not set. Please update src/lib/sanity.ts or set NEXT_PUBLIC_SANITY_DATASET in your environment variables.');
}

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: typeof document !== 'undefined', // server-side is statically generated, client-side uses CDN
  // perspective: 'published', // par défaut à 'raw', mais 'published' est souvent ce que l'on veut pour les sites live
}

export const sanityClient = createClient(config)

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  if (!source) {
    // Retourner une URL de fallback ou undefined si aucune source n'est fournie
    // Cela évite les erreurs si une image n'est pas définie dans Sanity
    return undefined;
  }
  return builder.image(source)
}
