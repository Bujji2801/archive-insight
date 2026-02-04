import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import AIAssistancePanel from "@/components/AIAssistancePanel";
import FloatingActionButton from "@/components/FloatingActionButton";
import Footer from "@/components/Footer";
import { projects, Project } from "@/data/projects";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [activeSection, setActiveSection] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.keywords.some((k) => k.toLowerCase().includes(searchLower)) ||
        project.technologies.some((t) => t.toLowerCase().includes(searchLower)) ||
        project.hashtags.some((h) => h.toLowerCase().includes(searchLower));

      // Year filter
      const matchesYear =
        yearFilter === "all" || project.year.toString() === yearFilter;

      // Branch filter
      const matchesBranch =
        branchFilter === "all" || project.branch === branchFilter;

      // Tech filter
      const matchesTech =
        techFilter === "all" ||
        project.techStack.some((t) =>
          t.toLowerCase().includes(techFilter.toLowerCase())
        ) ||
        project.technologies.some((t) =>
          t.toLowerCase().includes(techFilter.toLowerCase())
        );

      return matchesSearch && matchesYear && matchesBranch && matchesTech;
    });
  }, [searchQuery, yearFilter, branchFilter, techFilter]);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />
      
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <FilterBar
        yearFilter={yearFilter}
        branchFilter={branchFilter}
        techFilter={techFilter}
        onYearChange={setYearFilter}
        onBranchChange={setBranchFilter}
        onTechChange={setTechFilter}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Project Grid */}
          <div className="flex-1">
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No projects found
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Try adjusting your search query or filters to find more projects.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 && "s"}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={handleViewDetails}
                      animationDelay={index * 100}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* AI Assistance Panel - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <AIAssistancePanel />
            </div>
          </aside>
        </div>
      </main>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mobile AI Panel */}
      <Sheet open={isAIPanelOpen} onOpenChange={setIsAIPanelOpen}>
        <SheetContent side="right" className="w-full sm:w-96 p-0">
          <div className="p-4">
            <AIAssistancePanel />
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Action Button - Mobile */}
      <FloatingActionButton onClick={() => setIsAIPanelOpen(true)} />

      <Footer />
    </div>
  );
};

export default Index;
