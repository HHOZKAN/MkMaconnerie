// src/app/chantiers/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Chantier } from '@/types/sanity';
import type { Metadata } from 'next'; // Import Metadata

// Add metadata for this page
export const metadata: Metadata = {
  title: 'Nos Chantiers de Maçonnerie | MKM Maçonnerie', // Adaptez
  description: 'Découvrez nos réalisations et chantiers de maçonnerie. Qualité et savoir-faire pour tous vos projets de construction et rénovation.',
  openGraph: {
    title: 'Portfolio Chantiers | MKM Maçonnerie',
    description: 'Parcourez nos projets de maçonnerie : maisons neuves, rénovations, extensions, etc.',
    // images: [{ url: '/images/og-chantiers.jpg', width: 1200, height: 630, alt: 'Nos Chantiers MKM Maçonnerie' }], // Assurez-vous que cette image existe
  },
};

async function getChantiers(): Promise<Chantier[]> {
  const query = `*[_type == "chantier"] | order(date desc, _createdAt desc) {
    _id,
    titre,
    slug,
    description,
    images, // Changed to get the full image object for urlFor
    localisation,
    date
  }`;
  // Note: La projection "imageUrl" et "imageAlt" a été retirée ici car nous allons utiliser
  // urlFor directement avec l'objet image complet et nous allons chercher l'alt autrement si nécessaire.
  // Si vous aviez un champ 'alt' spécifique par image dans Sanity, vous le garderiez dans la projection.
  const chantiers = await sanityClient.fetch<Chantier[]>(query);
  return chantiers;
}

export default async function ChantiersPage() {
  const chantiers = await getChantiers();

  return (
    <main className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-12 text-center text-gray-800">Nos Chantiers</h1>
      {chantiers && chantiers.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {chantiers.map((chantier) => {
            // S'assurer que 'images' existe et n'est pas vide avant d'essayer d'y accéder
            const firstImage = chantier.images && chantier.images.length > 0 ? chantier.images[0] : null;

            return (
              <Link
                key={chantier._id}
                href={`/chantiers/${chantier.slug?.current}`}
                className="group block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
              {/* Ensure chantier.images is not empty and chantier.images[0] exists */}
              {chantier.images && chantier.images.length > 0 && chantier.images[0].asset && (
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={urlFor(chantier.images[0])!.width(600).height(400).url()}
                    alt={chantier.images[0].alt || chantier.titre || 'Image du chantier'}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    placeholder={chantier.images[0].asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={chantier.images[0].asset.metadata?.lqip}
                  />
                </div>
              )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">{chantier.titre}</h3>
                  {chantier.localisation && (
                    <p className="text-sm text-blue-600 mb-1">Localisation: {chantier.localisation}</p>
                  )}
                  {chantier.date && (
                    <p className="text-sm text-gray-500 mb-3">
                      Date: {new Date(chantier.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                    </p>
                  )}
                  <p className="mt-2 text-gray-600 line-clamp-3">{chantier.description}</p>
                  <span className="inline-block mt-4 text-blue-500 group-hover:text-blue-700 font-medium">
                    Voir le chantier &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun chantier à afficher pour le moment.</p>
      )}
    </main>
  );
}

// Optionnel: Configuration pour la revalidation si vous utilisez ISR avec l'App Router
// export const revalidate = 60; // Revalide la page toutes les 60 secondes