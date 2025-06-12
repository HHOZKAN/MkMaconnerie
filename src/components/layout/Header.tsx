"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-gray-800">
              Nom du Maçon
            </Link>
          </div>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Accueil
            </Link>
            <Link href="/chantiers" className="text-gray-600 hover:text-gray-900">
              Nos chantiers
            </Link>
            <Link href="/conseils" className="text-gray-600 hover:text-gray-900">
              Conseils
            </Link>
            <Link href="/a-propos" className="text-gray-600 hover:text-gray-900">
              À propos
            </Link>
            <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md">
              Contact
            </Link>
          </nav>
          
          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              href="/chantiers" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos chantiers
            </Link>
            <Link 
              href="/conseils" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Conseils
            </Link>
            <Link 
              href="/a-propos" 
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 bg-yellow-500 text-black rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}