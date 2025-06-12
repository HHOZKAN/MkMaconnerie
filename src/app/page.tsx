// src/app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MKM Maçonnerie - Artisan maçon expert (Page d\'accueil)', // Adaptez le nom de l'entreprise
  description: 'Services professionnels de maçonnerie pour construction neuve, rénovation, et projets sur mesure. Obtenez votre devis gratuit dès aujourd\'hui.',
  // Vous pouvez ajouter d'autres métadonnées Open Graph spécifiques à l'accueil ici
  openGraph: {
    title: 'MKM Maçonnerie - Artisan maçon expert',
    description: 'Expert en travaux de maçonnerie générale, construction de maisons, extensions, et rénovations.',
    // images: [{ url: '/images/og-accueil.jpg', width: 1200, height: 630, alt: 'MKM Maçonnerie Accueil' }], // Assurez-vous que cette image existe
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[80vh] relative">
        <Image 
          src="/images/hero-construction.jpg" // Assurez-vous que cette image existe dans public/images
          alt="Chantier de maçonnerie et construction"
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            MKM Maçonnerie de Qualité
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
            Votre expert en construction et rénovation.
          </p>
          <Link 
            href="/contact" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-md transition-colors"
          >
            Demander un devis
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Nos services</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Example Service Items - Replace with actual content */}
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Construction Neuve</h3>
            <p>Réalisation de maisons individuelles, fondations, et structures en béton.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Rénovation</h3>
            <p>Restauration de bâtiments anciens, extensions, et améliorations énergétiques.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Petite Maçonnerie</h3>
            <p>Murets, terrasses, ouvertures, et autres travaux de maçonnerie paysagère.</p>
          </div>
        </div>
      </section>

      {/* Derniers chantiers - Placeholder for potential dynamic component */}
      <section className="py-16 px-4 bg-gray-100 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos derniers chantiers</h2>
          {/* Ici, vous pourriez intégrer un composant qui affiche dynamiquement quelques chantiers */}
          <p className="text-center text-gray-600 mb-8">Découvrez nos réalisations récentes et la qualité de notre travail.</p>
          <div className="text-center mt-8">
            <Link 
              href="/chantiers" 
              className="text-blue-600 hover:underline font-semibold"
            >
              Voir tous nos chantiers
            </Link>
          </div>
        </div>
      </section>

      {/* Conseils de construction - Placeholder for potential dynamic component */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Conseils de construction</h2>
        {/* Ici, vous pourriez intégrer un composant qui affiche dynamiquement quelques conseils */}
        <p className="text-center text-gray-600 mb-8">Retrouvez nos astuces et guides pour vos projets de maçonnerie.</p>
        <div className="text-center mt-8">
          <Link 
            href="/conseils" 
            className="text-blue-600 hover:underline font-semibold"
          >
            Découvrir tous nos conseils
          </Link>
        </div>
      </section>
    </main>
  );
}