
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">MK Maçonnerie</h3>
                <p className="text-gray-400">Mehmet OZKAN</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Entreprise de maçonnerie générale à Bourg-en-Bresse. 
              Plus de 10 ans d'expérience dans le gros œuvre et la rénovation.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Fondations</li>
              <li>Murs porteurs</li>
              <li>Dallage béton</li>
              <li>Escaliers</li>
              <li>Rénovation</li>
              <li>Crépis et enduits</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-700" />
                <span className="text-gray-400">25 rue des Lavandières, 01000 Bourg-en-Bresse</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-700" />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-white">
                  06 12 34 56 78
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-700" />
                <a href="mailto:contact@mk-maconnerie.fr" className="text-gray-400 hover:text-white">
                  contact@mk-maconnerie.fr
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MK Maçonnerie - Tous droits réservés | SIRET: 123 456 789 00012
          </p>
        </div>
      </div>
    </footer>
  );
};
