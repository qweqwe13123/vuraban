import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import GreenlandLogo from "./GreenlandLogo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Floor Plans", path: "/floor-plans" },
  { name: "Amenities", path: "/amenities" },
  { name: "Gallery", path: "/gallery" },
  { name: "Neighborhood", path: "/neighborhood" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <GreenlandLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  <span className="flex flex-col items-center gap-1">
                    {isActive && (
                      <span className="h-0.5 w-10 bg-primary rounded-full" />
                    )}
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="h-0.5 w-10 bg-primary rounded-full" />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Apply Now Button */}
          <div className="hidden md:block">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/floor-plans">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link py-2 ${isActive ? "nav-link-active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex flex-col items-center gap-1">
                      {isActive && (
                        <span className="h-0.5 w-10 bg-primary rounded-full" />
                      )}
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="h-0.5 w-10 bg-primary rounded-full" />
                      )}
                    </span>
                  </Link>
                );
              })}
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2">
                <Link to="/floor-plans" onClick={() => setIsOpen(false)}>
                  Apply Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
