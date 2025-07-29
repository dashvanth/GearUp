import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, Settings } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton"; // Import the AuthButton
import { useAuth } from "@/hooks/useAuth"; // Import the useAuth hook
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loading } = useAuth(); // Get the loading state from the hook

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Equipment", href: "/equipment" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold text-gradient">GearUp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-text-secondary hover:text-primary transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            {/* Show skeleton while loading, then the button */}
            {loading ? <Skeleton className="h-9 w-24" /> : <AuthButton />}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-surface border border-border rounded-lg mt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-3 py-2 text-text-secondary hover:text-primary hover:bg-surface-secondary rounded-md transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 px-3">
                {/* Also handle loading state in mobile menu */}
                {loading ? <Skeleton className="h-9 w-full" /> : <AuthButton />}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
