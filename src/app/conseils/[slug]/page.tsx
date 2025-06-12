// src/app/conseils/[slug]/page.tsx
import { sanityClient, urlFor } from '@/lib/sanity';
import type { Conseil } from '@/types/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next';

interface ConseilDetailsPageProps {
  params: {
    slug: string;
  };
}

// Configuration pour PortableText (optionnel, pour personnaliser le rendu)
const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref && !value?.asset?.url) { // Vérifie _ref pour les références ou url pour les assets déjà résolus
        return null;
      }
      return (
        <div className="relative my-6 aspect-video">
          <Image
            src={urlFor(value)!.fit('max').auto('format').url()}
            alt={value.alt || 'Image dans le contenu'}
            fill // Remplacera layout="fill" objectFit="contain"
            className="object-contain rounded-md" // Assurez-vous que object-contain fait ce que vous voulez avec fill
            sizes="(max-width: 768px) 100vw, 700px" // sizes est important pour l'optimisation avec fill
          />
        </div>
      );
    },
    // Vous pouvez ajouter des rendus personnalisés pour d'autres types de blocs ici
    // Par exemple, pour des blocs de code, des citations, etc.
  },
  marks: {
    link: ({children, value}: {children: React.ReactNode, value: any}) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({children}: {children: React.ReactNode}) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({children}: {children: React.ReactNode}) => <h2 className="text-3xl font-semibold my-5">{children}</h2>,
    h3: ({children}: {children: React.ReactNode}) => <h3 className="text-2xl font-semibold my-4">{children}</h3>,
    h4: ({children}: {children: React.ReactNode}) => <h4 className="text-xl font-semibold my-3">{children}</h4>,
    blockquote: ({children}: {children: React.ReactNode}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">{children}</blockquote>,
    normal: ({children}: {children: React.ReactNode}) => <p className="my-4 text-base leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({children}: {children: React.ReactNode}) => <ul className="list-disc list-inside my-4 pl-4">{children}</ul>,
    number: ({children}: {children: React.ReactNode}) => <ol className="list-decimal list-inside my-4 pl-4">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: {children: React.ReactNode}) => <li>{children}</li>,
    number: ({children}: {children: React.ReactNode}) => <li>{children}</li>,
  },
}


async function getConseil(slug: string): Promise<Conseil | null> {
  const query = `*[_type == "conseil" && slug.current == $slug][0] {
    _id,
    titre,
    slug,
    contenu[]{
      ...,
      _type == "image" => {
        "asset": asset->{ // Résolution de la référence de l'asset
          _id,
          url,
          metadata {
            lqip
          }
        },
        alt // Assurez-vous que 'alt' est défini dans votre schéma pour les images dans 'contenu'
      }
    },
    imagePrincipale{
      asset->{
        _id,
        url,
        metadata {
          lqip
        }
      },
      alt
    },
    _createdAt,
    _updatedAt
  }`;
  const conseil = await sanityClient.fetch<Conseil | null>(query, { slug });
  return conseil;
}

export async function generateStaticParams() {
  const query = `*[_type == "conseil" && defined(slug.current)]{ "slug": slug.current }`;
  const slugs = await sanityClient.fetch<{slug: string}[]>(query) || [];
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: ConseilDetailsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const conseil = await getConseil(params.slug);

  if (!conseil) {
    return {
      title: 'Conseil non trouvé',
    };
  }

  const pageTitle = conseil.titre || 'Conseil';
  // Pour la description, on pourrait prendre les premiers mots du contenu riche
  const pageDescription = conseil.contenu ?
    conseil.contenu
      .filter(block => block._type === 'block' && block.children)
      .flatMap(block => block.children!.map((child: any) => child.text))
      .join(' ')
      .substring(0, 160) + '...'
    : 'Lire notre conseil détaillé.';

  const openGraphImages = [];
  if (conseil.imagePrincipale?.asset) {
    openGraphImages.push({
      url: urlFor(conseil.imagePrincipale)!.width(1200).height(630).fit('crop').url(),
      width: 1200,
      height: 630,
      alt: conseil.imagePrincipale.alt || conseil.titre || 'Image principale du conseil',
    });
  }

  return {
    title: `${pageTitle} | Conseils`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | Conseils`,
      description: pageDescription,
      images: openGraphImages,
      type: 'article',
      publishedTime: conseil._createdAt,
      modifiedTime: conseil._updatedAt,
      // authors: ['Votre Nom/Entreprise'], // Optionnel
    },
  };
}

export default async function ConseilDetailsPage({ params }: ConseilDetailsPageProps) {
  const conseil = await getConseil(params.slug);

  if (!conseil) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/conseils" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 ease-in-out inline-flex items-center">
           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
          Retour aux conseils
        </Link>
      </div>

      <header className="mb-8 border-b pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3">{conseil.titre}</h1>
        {conseil._createdAt && (
          <p className="text-sm text-gray-500">
            Publié le {new Date(conseil._createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </header>

      {conseil.imagePrincipale && conseil.imagePrincipale.asset && (
        <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(conseil.imagePrincipale)!.fit('crop').quality(85).url()}
            alt={conseil.imagePrincipale.alt || conseil.titre || 'Image principale du conseil'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
            placeholder={conseil.imagePrincipale.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={conseil.imagePrincipale.asset.metadata?.lqip}
            priority // L'image principale est probablement "Largest Contentful Paint"
          />
        </div>
      )}

      {conseil.contenu && (
        <div className="prose prose-lg max-w-none text-gray-800">
          <PortableText value={conseil.contenu} components={portableTextComponents} />
        </div>
      )}
    </article>
  );
}

// export const revalidate = 3600; // Optionnel: ISR
