
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">L</span>
            </div>
            <span className="font-bold text-xl">LinkBase</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm font-medium hover:text-blue-600 transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Success Stories
          </a>
          <a href="#universities" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Universities
          </a>
          <Button variant="outline" className="mr-2">
            Sign Up
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Login
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-b animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#testimonials" 
              className="text-sm font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Success Stories
            </a>
            <a 
              href="#universities" 
              className="text-sm font-medium py-2 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Universities
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline">
                Sign Up
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Login
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
