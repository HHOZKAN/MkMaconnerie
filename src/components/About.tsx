
import { Button } from "@/components/ui/button";

export const About = () => {
  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop"
              alt="Mehmet OZKAN, artisan maçon"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              À propos de MK Maçonnerie
            </h2>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                Dirigée par <strong>Mehmet OZKAN</strong>, MK Maçonnerie est une entreprise artisanale spécialisée en maçonnerie générale depuis plus de 10 ans. Basée à Bourg-en-Bresse, nous intervenons dans tout le département de l'Ain.
              </p>
              
              <p>
                Notre expertise couvre tous les travaux de gros œuvre : fondations, murs porteurs, dallages, escaliers béton, mais aussi la rénovation complète de bâtiments anciens.
              </p>
              
              <p>
                Nous nous engageons à fournir un travail de qualité, dans le respect des délais et avec une garantie décennale pour votre tranquillité d'esprit.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-2xl font-bold text-amber-700">150+</div>
                <div className="text-sm text-gray-600">Chantiers réalisés</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow">
                <div className="text-2xl font-bold text-amber-700">100%</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
              </div>
            </div>

            <Button className="bg-amber-700 hover:bg-amber-800">
              Demander un devis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
