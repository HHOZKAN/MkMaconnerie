
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";

export const Contact = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Demander un Devis
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Contactez-nous pour discuter de votre projet
          </p>
          <Button 
            onClick={() => setIsQuoteFormOpen(true)}
            className="bg-amber-700 hover:bg-amber-800 text-lg px-8 py-3"
          >
            Demander un Devis Détaillé
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Rapide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Nom" />
                <Input placeholder="Prénom" />
              </div>
              <Input placeholder="Téléphone" type="tel" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Type de projet" />
              <Input placeholder="Budget estimé" />
              <Textarea placeholder="Décrivez votre projet..." rows={4} />
              <Button className="w-full bg-amber-700 hover:bg-amber-800">
                Envoyer la demande
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      25 rue des Lavandières<br />
                      01000 Bourg-en-Bresse
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-amber-700 hover:underline">
                      06 12 34 56 78
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:contact@mk-maconnerie.fr" className="text-amber-700 hover:underline">
                      contact@mk-maconnerie.fr
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-amber-700 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi : 8h - 18h<br />
                      Samedi : 8h - 12h
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <QuoteForm 
        open={isQuoteFormOpen} 
        onOpenChange={setIsQuoteFormOpen} 
      />
    </section>
  );
};
