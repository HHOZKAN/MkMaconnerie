// src/app/conseils/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Conseil } from '@/types/sanity';
import type { Metadata } from 'next'; // Import Metadata

// Add metadata for this page
export const metadata: Metadata = {
  title: 'Conseils en Maçonnerie | MKM Maçonnerie', // Adaptez
  description: 'Retrouvez nos conseils d\'experts pour vos projets de construction, rénovation et travaux de maçonnerie. Astuces et guides pratiques.',
  openGraph: {
    title: 'Nos Conseils d\'Experts en Maçonnerie | MKM Maçonnerie',
    description: 'Guides et astuces pour réussir vos travaux de maçonnerie.',
    // images: [{ url: '/images/og-conseils.jpg', width: 1200, height: 630, alt: 'Conseils MKM Maçonnerie' }], // Assurez-vous que cette image existe
  },
};

async function getConseils(): Promise<Conseil[]> {
  const query = `*[_type == "conseil"] | order(_createdAt desc) {
    _id,
    titre,
    slug,
    imagePrincipale { // Ensure full image object is fetched
      asset->{
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt
    },
    "extraitContenu": pt::text(contenu[0..1]),
    _createdAt
  }`;
  const conseils = await sanityClient.fetch<Conseil[]>(query);
  return conseils;
}

export default async function ConseilsPage() {
  const conseils = await getConseils();

  return (
    <main className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-12 text-center text-gray-800">Nos Conseils</h1>
      {conseils && conseils.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {conseils.map((conseil) => (
            <Link
              key={conseil._id}
              href={`/conseils/${conseil.slug?.current}`}
              className="group block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {conseil.imagePrincipale && conseil.imagePrincipale.asset && (
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={urlFor(conseil.imagePrincipale)!.width(600).height(400).url()}
                    alt={conseil.imagePrincipale.alt || conseil.titre || 'Image du conseil'}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                    placeholder={conseil.imagePrincipale.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={conseil.imagePrincipale.asset.metadata?.lqip}
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{conseil.titre}</h3>
                {conseil.extraitContenu && (
                  <p className="text-gray-600 line-clamp-3 mb-3">{conseil.extraitContenu}</p>
                )}
                <span className="inline-block text-blue-500 group-hover:text-blue-700 font-medium">
                  Lire le conseil &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun conseil à afficher pour le moment.</p>
      )}
    </main>
  );
}

// export const revalidate = 60; // Optionnel: ISR