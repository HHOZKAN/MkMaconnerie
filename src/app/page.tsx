import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full h-[80vh] relative">
        <Image 
          src="/images/hero-construction.jpg" 
          alt="Travaux de maçonnerie" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Maçonnerie de qualité
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center">
            Expertise et savoir-faire pour tous vos projets de construction
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
        {/* Ajoutez ici vos services */}
      </section>

      {/* Derniers chantiers */}
      <section className="py-16 px-4 bg-gray-100 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos derniers chantiers</h2>
          {/* Ajoutez ici vos derniers chantiers */}
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

      {/* Conseils de construction */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Conseils de construction</h2>
        {/* Ajoutez ici vos conseils de construction */}
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