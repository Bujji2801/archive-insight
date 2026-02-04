import { FileText, Lightbulb, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              SentinelFlow
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Base Paper Fetching
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Lightbulb className="h-4 w-4" />
              Suggestions
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SentinelFlow. Academic integrity matters.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
