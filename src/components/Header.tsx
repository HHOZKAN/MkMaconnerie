
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Réalisations", href: "/realisations" },
    { name: "À propos", href: "/#apropos" },
    { name: "Contact", href: "/#contact" },
  ];

  const isExternalLink = (href: string) => href.startsWith("/#");

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">MK</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MK Maçonnerie</h1>
                <p className="text-sm text-gray-600">Bourg-en-Bresse</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                isExternalLink(item.href) ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-700 hover:text-amber-700 font-medium transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="tel:+33123456789" className="flex items-center space-x-2 text-amber-700">
                <Phone className="w-4 h-4" />
                <span className="font-medium">06 12 34 56 78</span>
              </a>
              <Button 
                onClick={() => setIsQuoteFormOpen(true)}
                className="bg-amber-700 hover:bg-amber-800"
              >
                Devis Gratuit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                  isExternalLink(item.href) ? (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-amber-700 font-medium py-2 border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-700 hover:text-amber-700 font-medium py-2 border-b border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="flex flex-col space-y-2 pt-3">
                  <a href="tel:+33123456789" className="flex items-center space-x-2 text-amber-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">06 12 34 56 78</span>
                  </a>
                  <Button 
                    onClick={() => setIsQuoteFormOpen(true)}
                    className="bg-amber-700 hover:bg-amber-800 w-full"
                  >
                    Devis Gratuit
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <QuoteForm 
        open={isQuoteFormOpen} 
        onOpenChange={setIsQuoteFormOpen} 
      />
    </>
  );
};
