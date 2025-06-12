// src/app/chantiers/[slug]/page.tsx
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Chantier } from '@/types/sanity';
// import { PortableText } from '@portabletext/react'; // Décommentez si description devient du rich text
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

interface ChantierDetailsPageProps {
  params: {
    slug: string;
  };
}

async function getChantier(slug: string): Promise<Chantier | null> {
  const query = `*[_type == "chantier" && slug.current == $slug][0] {
    _id,
    titre,
    slug,
    description, // Si c'est du rich text, assurez-vous que le type Chantier le reflète
    images[]{
      _key, // Important pour les listes React
      asset->{
        _id,
        url,
        metadata {
          lqip // Low Quality Image Placeholder
        }
      },
      alt // Champ 'alt' défini dans le schéma Sanity pour chaque image de la liste
    },
    date,
    localisation
  }`;
  const chantier = await sanityClient.fetch<Chantier | null>(query, { slug });
  return chantier;
}

export async function generateStaticParams() {
  const query = `*[_type == "chantier" && defined(slug.current)]{ "slug": slug.current }`;
  // Type assertion pour s'assurer que slugs est bien un tableau d'objets avec une propriété slug de type string
  const slugs = await sanityClient.fetch<{slug: string}[]>(query) || [];
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: ChantierDetailsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const chantier = await getChantier(params.slug);

  if (!chantier) {
    return {
      title: 'Chantier non trouvé',
    };
  }

  const pageTitle = chantier.titre ? `${chantier.titre} | Chantiers` : 'Détails du Chantier';
  const pageDescription = chantier.description?.substring(0, 160) || 'Découvrez les détails de ce chantier.';

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      images: chantier.images?.filter(image => image.asset).map(image => ({
        url: urlFor(image)!.width(1200).height(630).fit('crop').url(),
        width: 1200,
        height: 630,
        alt: image.alt || chantier.titre || 'Image du chantier',
      })) || [],
    },
  };
}

export default async function ChantierDetailsPage({ params }: ChantierDetailsPageProps) {
  const chantier = await getChantier(params.slug);

  if (!chantier) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/chantiers" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 ease-in-out inline-flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          Retour aux chantiers
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{chantier.titre}</h1>
        <div className="mt-4 text-sm text-gray-500 space-y-1">
          {chantier.date && (
            <p>
              <strong>Date du chantier:</strong> {new Date(chantier.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          )}
          {chantier.localisation && (
            <p>
              <strong>Localisation:</strong> {chantier.localisation}
            </p>
          )}
        </div>
      </header>

      {chantier.images && chantier.images.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Galerie d'images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chantier.images.filter(image => image.asset).map((image) => (
              <div key={image._key || image.asset._id} className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src={urlFor(image)!.quality(80).fit('crop').url()}
                  alt={image.alt || chantier.titre || `Image du chantier`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
                  blurDataURL={image.asset.metadata?.lqip}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {chantier.description && (
        <section className="prose prose-lg max-w-none text-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Description du projet</h2>
          {/* Pour du texte simple: */}
          <p>{chantier.description.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
          {/*
          Pour du Portable Text (Rich Text) depuis Sanity:
          1. Assurez-vous que 'description' dans votre schéma Sanity est de type 'array' of 'block'.
          2. Mettez à jour le type 'Chantier' dans src/types/sanity.ts : description?: PortableTextBlock[];
          3. Décommentez l'import de PortableText en haut du fichier.
          4. Utilisez le composant PortableText ici :
             <PortableText value={chantier.description} components={/* vos composants personnalisés si besoin * /} />
          */}
        </section>
      )}
    </article>
  );
}

// Optionnel: Configuration pour la revalidation ISR (Incremental Static Regeneration)
// export const revalidate = 3600; // Revalide la page toutes les heures
