// components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 - À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nom du Maçon</h3>
            <p className="mb-4 text-gray-300">
              Entreprise de maçonnerie professionnelle avec plus de X années d'expérience dans le domaine de la construction.
            </p>
            <p className="text-gray-300">
              SIRET: XXXXXXXXX
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/chantiers" className="text-gray-300 hover:text-white transition-colors">
                  Nos chantiers
                </Link>
              </li>
              <li>
                <Link href="/conseils" className="text-gray-300 hover:text-white transition-colors">
                  Conseils de construction
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Rue de la Construction</p>
              <p className="mb-2">75000 Paris</p>
              <p className="mb-2">Tél: 01 23 45 67 89</p>
              <p className="mb-4">Email: contact@nomdumaçon.fr</p>
            </address>
            <div className="flex space-x-4">
              {/* Vous pouvez ajouter des icônes de réseaux sociaux ici */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Nom du Maçon. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}