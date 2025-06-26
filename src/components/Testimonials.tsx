
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      text: "Travail impeccable pour la rénovation de notre maison. Mehmet est professionnel et respecte les délais.",
      rating: 5,
      project: "Rénovation complète"
    },
    {
      name: "Jean Martin",
      text: "Excellent maçon ! La construction de notre extension s'est parfaitement déroulée. Je recommande vivement.",
      rating: 5,
      project: "Extension maison"
    },
    {
      name: "Sophie Leclerc",
      text: "Très satisfaite du travail réalisé. Devis précis, travail soigné et prix correct. Merci !",
      rating: 5,
      project: "Terrasse et muret"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Avis Clients
          </h2>
          <p className="text-xl text-gray-600">
            La satisfaction de nos clients est notre priorité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                
                <div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.project}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
