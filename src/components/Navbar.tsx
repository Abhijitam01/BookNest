
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search, 
  BookOpen, 
  Menu, 
  X, 
  Library, 
  BookMarked,
  LogIn, 
  List,
  BookText
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useMediaQuery } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const links = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/dashboard", label: "Library", icon: <Library className="h-5 w-5" /> },
    { href: "/search", label: "Search Books", icon: <Search className="h-5 w-5" /> },
    { href: "/lists", label: "My Lists", icon: <List className="h-5 w-5" /> },
    { href: "/blog", label: "Blog", icon: <BookText className="h-5 w-5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">KitaabGhar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={location.pathname === link.href ? "default" : "ghost"}
                className={cn(
                  "flex items-center space-x-1",
                  location.pathname === link.href && "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                asChild
              >
                <Link to={link.href}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* User Menu / Login Button */}
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link to="/dashboard">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            ) : (
              <Button variant="default" size="sm" className="hidden md:flex" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background animate-in slide-in-from-top">
          <nav className="container flex flex-col p-4">
            {links.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className={cn(
                  "justify-start mb-1 px-4 py-6 text-lg",
                  location.pathname === link.href && "bg-primary/10 text-primary"
                )}
                onClick={closeMenu}
                asChild
              >
                <Link to={link.href}>
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              </Button>
            ))}
            
            {!isAuthenticated && (
              <Button className="mt-4 py-6" onClick={closeMenu} asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;