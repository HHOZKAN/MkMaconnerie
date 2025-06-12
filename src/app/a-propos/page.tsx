// src/app/a-propos/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image'; // Optionnel: si vous ajoutez une image

export const metadata: Metadata = {
  title: 'À Propos de MKM Maçonnerie', // Adaptez
  description: 'Découvrez l\'histoire, les valeurs et l\'équipe de MKM Maçonnerie, votre partenaire de confiance pour tous travaux de maçonnerie.',
  openGraph: {
    title: 'À Propos de MKM Maçonnerie',
    description: 'En savoir plus sur notre expertise et notre engagement qualité.',
    // images: [{ url: '/images/og-a-propos.jpg', width: 1200, height: 630, alt: 'À Propos de MKM Maçonnerie' }],
  },
};

export default function AProposPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">À Propos de Nous</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Notre Histoire</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Fondée en [Année de fondation], MKM Maçonnerie s'est engagée à fournir des services de maçonnerie exceptionnels
          dans la région de [Votre Région]. Notre passion pour le métier et notre souci du détail nous ont permis de bâtir
          une solide réputation auprès de nos clients.
        </p>
        {/* Optionnel: Ajouter une image représentative */}
        {/* <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md my-6">
          <Image
            src="/images/equipe-maconnerie.jpg" // Assurez-vous que cette image existe
            alt="L'équipe MKM Maçonnerie"
            fill
            className="object-cover"
          />
        </div> */}
        <p className="text-gray-600 leading-relaxed">
          Au fil des ans, nous avons élargi nos compétences pour couvrir un large éventail de projets, allant de la
          construction de maisons neuves à la rénovation de bâtiments anciens, en passant par des travaux de petite
          maçonnerie et d'aménagement extérieur.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Nos Valeurs</h2>
        <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-2">
          <li><strong>Qualité :</strong> Nous utilisons des matériaux de premier choix et respectons les normes les plus strictes.</li>
          <li><strong>Savoir-faire :</strong> Notre équipe d'artisans qualifiés met son expertise à votre service.</li>
          <li><strong>Confiance :</strong> Nous établissons une relation transparente avec nos clients, basée sur l'écoute et le conseil.</li>
          <li><strong>Respect des délais :</strong> Nous nous engageons à livrer vos projets dans les temps convenus.</li>
          <li><strong>Satisfaction client :</strong> Votre satisfaction est notre priorité absolue.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Notre Engagement</h2>
        <p className="text-gray-600 leading-relaxed">
          Chez MKM Maçonnerie, nous sommes fiers de contribuer à la réalisation de vos projets de vie.
          Que vous soyez un particulier ou un professionnel, nous vous accompagnons à chaque étape,
          de la conception à la livraison, en vous garantissant un travail soigné et durable.
        </p>
      </section>
    </main>
  );
}
