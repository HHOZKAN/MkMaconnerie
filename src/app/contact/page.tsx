export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" name="name" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
        </div>
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-md">
          Envoyer
        </button>
      </form>
    </main>
  );
}