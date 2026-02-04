import { Shield, User, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "how-to-use", label: "How to Use" },
  { id: "explore", label: "Explore Projects" },
];

const Navbar = ({ activeSection = "explore", onNavigate }: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
              <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              SentinelFlow
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate?.(link.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  activeSection === link.id
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
