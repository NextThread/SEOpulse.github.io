import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex items-center justify-between h-16">
        <button
          onClick={() => handleNavClick("#home")}
          className="font-display text-xl font-bold text-primary"
          aria-label="Go to top"
        >
          SEOPulse AI
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button variant="ghost" size="sm">Login</Button>
          <Button size="sm">Sign Up</Button>
        </div>

        {/* Mobile right */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="p-2 text-muted-foreground"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-2xl font-display font-semibold text-foreground"
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-3 mt-4">
            <Button variant="ghost">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
