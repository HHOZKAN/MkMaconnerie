
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactFormSchema = z.object({
  lastName: z.string().min(2, "Le nom est requis"),
  firstName: z.string().min(2, "Le prénom est requis"),
  phone: z.string().min(10, "Le téléphone est requis"),
  email: z.string().email("L'email est requis"),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().min(10, "Veuillez décrire votre projet"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export const Contact = () => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      phone: "",
      email: "",
      projectType: "",
      budget: "",
      description: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Using the same template for now
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Demande envoyée avec succès !",
        description: "Nous vous recontacterons bientôt.",
      });
      form.reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

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
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="lastName" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Nom" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField control={form.control} name="firstName" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Prénom" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  </div>
                  <FormField control={form.control} name="phone" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Téléphone" type="tel" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Email" type="email" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="projectType" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Type de projet (optionnel)" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="budget" render={({ field }) => ( <FormItem><FormControl><Input placeholder="Budget estimé (optionnel)" {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <FormField control={form.control} name="description" render={({ field }) => ( <FormItem><FormControl><Textarea placeholder="Décrivez votre projet..." rows={4} {...field} /></FormControl><FormMessage /></FormItem> )} />
                  <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800">
                    Envoyer la demande
                  </Button>
                </form>
              </Form>
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
                      06 99 91 86 88
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
                      mkmaconnerie01@gmail.com
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
