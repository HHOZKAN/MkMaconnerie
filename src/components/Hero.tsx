
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { Link } from "react-router-dom";

export const Hero = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  return (
    <>
      <section id="accueil" className="relative bg-gradient-to-br from-gray-50 to-amber-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Maçonnerie solide, <br />
                <span className="text-amber-700">confiance garantie</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Entreprise locale à Bourg-en-Bresse, spécialisée en maçonnerie générale depuis plus de 10 ans
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Expertise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Garantie décennale</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 font-medium">Devis gratuit</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setIsQuoteFormOpen(true)}
                  className="bg-amber-700 hover:bg-amber-800"
                >
                  Demander un devis
                </Button>
                <Button asChild size="lg" variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-50">
                  <Link to="/realisations">Nos réalisations</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/images/david-ballew-0BnukiMgSK4-unsplash.jpg"
                alt="Chantier de maçonnerie"

                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-700">10+</div>
                  <div className="text-sm text-gray-600">années d'expérience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuoteForm 
        open={isQuoteFormOpen} 
        onOpenChange={setIsQuoteFormOpen} 
      />
    </>
  );
};
