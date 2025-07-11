import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const quoteFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  address: z.string().optional(),
  projectType: z.string().optional(),
  startDate: z.string().optional(),
  services: z.array(z.string()).optional(),
  description: z.string().min(10, "Veuillez décrire votre projet (minimum 10 caractères)"),
  consent: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter le traitement de vos données personnelles"
  })
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const services = [
  { id: "fondation", label: "Fondations" },
  { id: "mur", label: "Murs" },
  { id: "terrasse", label: "Terrasses et dallages" },
  { id: "escalier", label: "Escaliers" },
  { id: "crepis", label: "Crépis et enduits" },
  { id: "renovation", label: "Rénovation" },
  { id: "muret", label: "Murets et clôtures" },
  { id: "autre", label: "Autre" }
];

export const QuoteForm = ({ open, onOpenChange }: QuoteFormProps) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      projectType: "",
      startDate: "",
      services: [],
      description: "",
      consent: false
    }
  });

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      const templateParams = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        address: data.address || "Non spécifiée",
        projectType: data.projectType || "Non spécifié",
        startDate: data.startDate || "Non spécifiée",
        services: data.services?.join(', ') || "Non spécifiés",
        description: data.description,
        consent: data.consent ? "Accepté" : "Refusé",
        fileName: "Aucun fichier joint"
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      form.reset();
      onOpenChange(false);
      setShowSuccessDialog(true);
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Demander un Devis</DialogTitle>
            <DialogDescription>
              Remplissez ce formulaire pour recevoir un devis personnalisé pour vos travaux de maçonnerie.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Informations personnelles */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre prénom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre nom" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input placeholder="06 12 34 56 78" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="votre@email.fr" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Informations du projet */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse du chantier</FormLabel>
                    <FormControl>
                      <Input placeholder="Adresse complète du projet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de projet</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="neuf">Construction neuve</SelectItem>
                          <SelectItem value="renovation">Rénovation</SelectItem>
                          <SelectItem value="extension">Extension</SelectItem>
                          <SelectItem value="reparation">Réparation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date souhaitée de début</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Services */}
              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <FormLabel>Services demandés</FormLabel>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {services.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), service.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== service.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {service.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du projet *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Décrivez votre projet en détail : dimensions, matériaux souhaités, contraintes particulières..."
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Consentement RGPD */}
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        J'accepte que mes données personnelles soient traitées pour me recontacter concernant ma demande de devis *
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        Vos données sont uniquement utilisées pour traiter votre demande et ne seront jamais partagées avec des tiers.
                      </p>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Annuler
                </Button>
                <Button type="submit" className="bg-amber-700 hover:bg-amber-800">
                  Envoyer la demande
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Pop-up de succès avec information sur l'envoi de documents */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Demande envoyée avec succès !</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>Nous vous recontacterons dans les plus brefs délais pour établir votre devis.</p>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <p className="font-medium text-amber-800 mb-2">📎 Avez-vous des documents à nous envoyer ?</p>
                <p className="text-sm text-amber-700">
                  Si vous souhaitez nous faire parvenir des photos, plans ou autres documents concernant votre projet, 
                  vous pouvez les envoyer directement par email à :
                </p>
                <p className="font-mono text-sm bg-white p-2 rounded mt-2 border">
                  mkmaconnerie01@gmail.com
                </p>
                <p className="text-xs text-amber-600 mt-2">
                  N'oubliez pas de mentionner votre nom dans l'objet de l'email.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              Compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
