// src/app/avis-clients/page.tsx
import AvisClientsSection from '@/components/sections/AvisClientsSection'; // Ajustez le chemin si nécessaire
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avis de nos Clients | MKM Maçonnerie', // Remplacez par le nom de votre entreprise
  description: 'Découvrez ce que nos clients pensent de nos services de maçonnerie.',
};

export default function AvisClientsPage() {
  return (
    <>
      {/* Vous pouvez ajouter un en-tête de page spécifique ici si besoin */}
      {/* <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Témoignages Clients</h1>
        </div>
      </header> */}
      <AvisClientsSection />
    </>
  );
}

// export const revalidate = 3600; // Optionnel: ISR
