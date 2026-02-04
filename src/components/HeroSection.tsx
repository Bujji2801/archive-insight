import { Search } from "lucide-react";
import { Input } from "./ui/input";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="gradient-hero py-16 text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            Archive Discovery
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/80">
            Explore academic projects and verify originality with AI-powered similarity detection
          </p>
          
          {/* Search Bar */}
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects by title, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-14 rounded-xl border-0 bg-card pl-12 pr-4 text-foreground shadow-sentinel-lg placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
