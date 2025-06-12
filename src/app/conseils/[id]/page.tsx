import { useRouter } from 'next/router';

const conseilDetails = {
  1: { title: 'Choisir les bons matériaux', description: 'Détails complets sur le choix des matériaux.' },
  2: { title: 'Planification de travaux', description: 'Détails complets sur la planification de travaux.' },
  // Ajoutez plus de détails pour chaque conseil ici
};

export default function ConseilDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const conseilId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id || '', 10);

  const conseil = conseilDetails[conseilId as keyof typeof conseilDetails];

  if (!conseil) return <p>Chargement...</p>;

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{conseil.title}</h1>
      <p>{conseil.description}</p>
    </main>
  );
}