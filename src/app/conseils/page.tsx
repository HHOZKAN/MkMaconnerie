import Link from 'next/link';

const conseils = [
  { id: 1, title: 'Choisir les bons matériaux', description: 'Conseils pour choisir les matériaux.' },
  { id: 2, title: 'Planification de travaux', description: 'Conseils pour bien planifier vos travaux.' },
  // Ajoutez plus de conseils ici
];

export default function ConseilsPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Conseils de Construction</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {conseils.map((conseil) => (
          <Link key={conseil.id} href={`/conseils/${conseil.id}`} className="block p-4 border rounded-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold">{conseil.title}</h3>
            <p className="mt-2 text-gray-600">{conseil.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}