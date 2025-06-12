import Link from 'next/link';

const chantiers = [
  { id: 1, title: 'Rénovation de maison', description: 'Description du chantier 1' },
  { id: 2, title: 'Construction de piscine', description: 'Description du chantier 2' },
  // Ajoutez plus de chantiers ici
];

export default function ChantiersPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Nos Chantiers</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {chantiers.map((chantier) => (
          <Link key={chantier.id} href={`/chantiers/${chantier.id}`} className="block p-4 border rounded-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">{chantier.title}</h3>
            <p className="mt-2 text-gray-600">{chantier.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}