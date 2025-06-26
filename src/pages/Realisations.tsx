
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

const Realisations = () => {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filters = ["Tous", "Fondations", "Murs", "Terrasses", "Escaliers", "Rénovation", "Crépis"];

  const projects = [
    {
      id: 1,
      title: "Construction mur de soutènement",
      category: "Murs",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=800&h=600&fit=crop",
      description: "Mur de soutènement en béton armé pour stabilisation de terrain",
      location: "Bourg-en-Bresse",
      year: "2024"
    },
    {
      id: 2,
      title: "Fondations maison individuelle",
      category: "Fondations",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      description: "Fondations en béton armé pour construction neuve",
      location: "Péronnas",
      year: "2024"
    },
    {
      id: 3,
      title: "Terrasse en béton désactivé",
      category: "Terrasses",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=600&fit=crop",
      description: "Terrasse décorative avec finition béton désactivé",
      location: "Viriat",
      year: "2023"
    },
    {
      id: 4,
      title: "Escalier extérieur en béton",
      category: "Escaliers",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop",
      description: "Escalier d'accès extérieur avec rampe intégrée",
      location: "Bourg-en-Bresse",
      year: "2023"
    },
    {
      id: 5,
      title: "Rénovation façade ancienne",
      category: "Rénovation",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=600&fit=crop",
      description: "Rénovation complète de façade avec isolation",
      location: "Montrevel-en-Bresse",
      year: "2023"
    },
    {
      id: 6,
      title: "Crépis façade moderne",
      category: "Crépis",
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop",
      description: "Application crépis décoratif sur façade contemporaine",
      location: "Ceyzériat",
      year: "2024"
    }
  ];

  const filteredProjects = activeFilter === "Tous" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-amber-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Nos <span className="text-amber-700">Réalisations</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos projets de maçonnerie réalisés dans la région de Bourg-en-Bresse. 
              Plus de 10 ans d'expertise au service de vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filtrer par :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className={activeFilter === filter ? "bg-amber-700 hover:bg-amber-800" : "border-amber-700 text-amber-700 hover:bg-amber-50"}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-700 hover:bg-amber-800">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="flex items-center">
                      📍 {project.location}
                    </span>
                    <span>{project.year}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune réalisation trouvée pour ce filtre.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-amber-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Votre projet nous intéresse !
          </h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet de maçonnerie. 
            Devis gratuit et conseils personnalisés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white text-amber-700 hover:bg-gray-50">
              Demander un devis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-700">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Realisations;
