import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";
import { AuthButton } from "@/components/auth/AuthButton";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Equipment", href: "/equipment" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-gradient">GearUp</span>
          </Link>

          {/* --- DESKTOP NAVIGATION (WITH GLOWING EFFECT) --- */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className={`text-lg font-medium relative group px-4 py-2 transition-all duration-300 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                <Link to={link.href}>
                  {link.name}
                  {/* Glowing effect for active/hovered link */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary blur-md rounded-full transition-opacity duration-300 ${
                      location.pathname === link.href
                        ? "opacity-75"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </Link>
              </Button>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {loading ? <Skeleton className="h-10 w-28" /> : <AuthButton />}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-black/90 backdrop-blur-lg border-t border-border p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                size="lg"
                className="justify-start text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to={link.href}>{link.name}</Link>
              </Button>
            ))}
            <div className="border-t border-border pt-4">
              {loading ? <Skeleton className="h-12 w-full" /> : <AuthButton />}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
