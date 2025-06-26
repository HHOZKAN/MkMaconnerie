
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";

const quoteFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().min(10, "Veuillez entrer un numéro de téléphone valide"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  address: z.string().min(5, "Veuillez entrer l'adresse complète du chantier"),
  projectType: z.string().min(1, "Veuillez sélectionner le type de projet"),
  startDate: z.string().min(1, "Veuillez indiquer une date souhaitée"),
  services: z.array(z.string()).min(1, "Veuillez sélectionner au moins un service"),
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille du fichier (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "La taille du fichier ne doit pas dépasser 10MB",
          variant: "destructive"
        });
        return;
      }
      
      // Vérifier le type de fichier
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Type de fichier non supporté",
          description: "Veuillez sélectionner une image (JPEG, PNG, WebP) ou un PDF",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      // Simuler l'envoi du formulaire
      console.log("Données du devis:", data);
      console.log("Fichier joint:", selectedFile);
      
      // En production, ici vous feriez l'appel API pour envoyer les données
      // const formData = new FormData();
      // Object.keys(data).forEach(key => {
      //   formData.append(key, data[key]);
      // });
      // if (selectedFile) {
      //   formData.append('file', selectedFile);
      // }
      
      toast({
        title: "Demande envoyée avec succès !",
        description: "Nous vous recontacterons dans les plus brefs délais pour établir votre devis."
      });
      
      form.reset();
      setSelectedFile(null);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
        variant: "destructive"
      });
    }
  };

  return (
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
                  <FormLabel>Adresse du chantier *</FormLabel>
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
                    <FormLabel>Type de projet *</FormLabel>
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
                    <FormLabel>Date souhaitée de début *</FormLabel>
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
                  <FormLabel>Services demandés *</FormLabel>
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
                                      ? field.onChange([...field.value, service.id])
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

            {/* Upload de fichier */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pièce jointe (optionnel)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                {selectedFile ? (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{selectedFile.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Ajoutez des photos de votre projet ou un plan (PDF)
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choisir un fichier
                    </Button>
                    <p className="text-xs text-gray-500 mt-1">
                      Formats acceptés : JPEG, PNG, WebP, PDF (max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

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
  );
};
