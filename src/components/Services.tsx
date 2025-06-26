
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Services = () => {
  const services = [
    {
      title: "Fondations",
      description: "Terrassement et coulage de fondations solides pour tous types de constructions",
      icon: "🏗️"
    },
    {
      title: "Murs",
      description: "Construction de murs porteurs et de cloisonnement en béton, parpaing ou brique",
      icon: "🧱"
    },
    {
      title: "Dallage",
      description: "Réalisation de dalles béton, chapes et sols industriels",
      icon: "⬜"
    },
    {
      title: "Escaliers",
      description: "Escaliers béton intérieurs et extérieurs sur mesure",
      icon: "🪜"
    },
    {
      title: "Rénovation",
      description: "Rénovation complète de bâtiments anciens et mise aux normes",
      icon: "🔨"
    },
    {
      title: "Crépis",
      description: "Enduits extérieurs et ravalement de façades",
      icon: "🎨"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nos Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une expertise complète en maçonnerie générale pour tous vos projets de construction et rénovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
