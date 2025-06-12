// src/components/sections/AvisClientsSection.tsx
import { sanityClient, urlFor } from '@/lib/sanity';
import type { AvisClient } from '@/types/sanity';
import Image from 'next/image';

// Helper pour afficher les étoiles
const StarRating = ({ note }: { note: number }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={index}
            className={`w-5 h-5 ${starValue <= note ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
      <span className="ml-2 text-sm text-gray-600">{note} / 5</span>
    </div>
  );
};

async function getAvisClients(): Promise<AvisClient[]> {
  const query = `*[_type == "avisClient"] | order(_createdAt desc) {
    _id,
    nom,
    temoignage,
    note,
    photo {
      asset->{
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt
    },
    _createdAt
  }`;
  const avis = await sanityClient.fetch<AvisClient[]>(query);
  return avis;
}

export default async function AvisClientsSection({ title = "Ce que nos clients disent de nous" }: { title?: string }) {
  const avisClients = await getAvisClients();

  if (!avisClients || avisClients.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">{title}</h2>
          <p className="text-center text-gray-500">Aucun avis client à afficher pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {avisClients.map((avis) => (
            <div key={avis._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <div className="flex-grow mb-4">
                {avis.note && <StarRating note={avis.note} />}
                <blockquote className="mt-4">
                  <p className="text-gray-700 leading-relaxed italic">"{avis.temoignage}"</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-auto">
                {avis.photo?.asset && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                    <Image
                      src={urlFor(avis.photo)!.width(100).height(100).fit('crop').url()}
                      alt={avis.photo.alt || `Photo de ${avis.nom}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                      placeholder={avis.photo.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={avis.photo.asset.metadata?.lqip}
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{avis.nom}</p>
                  <p className="text-sm text-gray-500">Client vérifié</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
