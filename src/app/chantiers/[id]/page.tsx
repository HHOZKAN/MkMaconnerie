import { useRouter } from 'next/router';

const chantierDetails = {
  1: { title: 'Rénovation de maison', description: 'Détails complets sur le chantier de rénovation de maison.' },
  2: { title: 'Construction de piscine', description: 'Détails complets sur la construction de piscine.' },
  // Ajoutez plus de détails pour chaque chantier ici
};

export default function ChantierDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Vérifie que l'id est une chaîne de caractères et peut être converti en nombre
  const chantierId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id || '', 10);

  const chantier = chantierDetails[chantierId as keyof typeof chantierDetails];

  if (!chantier) return <p>Chargement...</p>;

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{chantier.title}</h1>
      <p>{chantier.description}</p>
    </main>
  );
}