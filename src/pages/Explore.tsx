import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, SlidersHorizontal, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { SidebarFilters } from "@/components/explore/SidebarFilters";
import ProjectCard from "@/components/ProjectCard";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";
import AIAssistancePanel from "@/components/AIAssistancePanel";
import FloatingActionButton from "@/components/FloatingActionButton";
import Footer from "@/components/Footer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { HeizenButton } from "@/components/ui/heizen-button";
import { FloatingOrbs } from "@/components/ui/FloatingOrbs";
import { supabase } from "@/lib/supabaseClient";

const ITEMS_PER_PAGE = 9;

export default function Explore() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [yearFilter, setYearFilter] = useState("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Pagination State
  const [page, setPage] = useState(1);

  const handleResetFilters = () => {
    setYearFilter("all");
    setBranchFilter("all");
    setTechFilter("all");
    setSearchQuery("");
    setPage(1);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['projects', searchQuery, yearFilter, branchFilter, techFilter, page],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*', { count: 'exact' });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      if (yearFilter !== "all") {
        query = query.eq('year', parseInt(yearFilter));
      }

      if (branchFilter !== "all") {
        query = query.eq('branch', branchFilter);
      }

      if (techFilter !== "all") {
        query = query.contains('tech_stack', [techFilter]);
      }

      // Pagination Range
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, count, error } = await query.range(from, to);

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      const mappedProjects = data.map(p => ({
        ...p,
        techStack: p.tech_stack, // Map back to camelCase for UI
        userId: p.user_id,
        problemStatement: p.problem_statement,
        expectedOutcome: p.expected_outcome
      })) as Project[];

      return { projects: mappedProjects, totalCount: count || 0 };
    }
  });

  const projects = data?.projects || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const filteredProjects = projects;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingOrbs />
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div className="pb-4 border-b border-slate-100">
                <h1 className="font-editorial text-3xl font-bold text-slate-900">Explore</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Discover {totalCount} academic projects
                </p>
              </div>
              <SidebarFilters
                yearFilter={yearFilter}
                branchFilter={branchFilter}
                techFilter={techFilter}
                onYearChange={(val) => { setYearFilter(val); setPage(1); }}
                onBranchChange={(val) => { setBranchFilter(val); setPage(1); }}
                onTechChange={(val) => { setTechFilter(val); setPage(1); }}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0">
            {/* Mobile Filter & Search Header */}
            <div className="lg:hidden mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="font-editorial text-3xl font-bold text-slate-900">Explore</h1>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SlidersHorizontal className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="py-6">
                      <h3 className="font-editorial text-xl font-bold mb-6">Filters</h3>
                      <SidebarFilters
                        yearFilter={yearFilter}
                        branchFilter={branchFilter}
                        techFilter={techFilter}
                        onYearChange={(val) => { setYearFilter(val); setPage(1); }}
                        onBranchChange={(val) => { setBranchFilter(val); setPage(1); }}
                        onTechChange={(val) => { setTechFilter(val); setPage(1); }}
                        onReset={handleResetFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Search & View Toggle */}
            <div className="sticky top-[72px] z-30 mb-6 bg-background/80 backdrop-blur-md py-2 -mx-2 px-2 lg:static lg:bg-transparent lg:p-0 lg:m-0 lg:mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md group">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="search"
                    placeholder="Search titles, keywords, tech..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-10 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:indigo-500 transition-all shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewMode === "grid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    )}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 rounded-lg transition-all",
                      viewMode === "list" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-900"
                    )}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div
                className={cn(
                  viewMode === "grid" ? "grid gap-6 sm:grid-cols-2" : "flex flex-col gap-4"
                )}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm",
                      viewMode === "list" ? "h-32" : "h-64"
                    )}
                  >
                    <Skeleton className="mb-4 h-6 w-3/4 rounded-lg bg-slate-100" />
                    <Skeleton className="h-4 w-1/2 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                  <Search className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">No projects found</h3>
                <p className="max-w-md text-sm text-slate-500 mb-6">
                  We couldn't find any projects matching your criteria. Try adjusting your filters or search query.
                </p>
                <HeizenButton variant="editorial" onClick={handleResetFilters}>
                  Clear All Filters
                </HeizenButton>
              </motion.div>
            ) : (
              <>
                <div className={cn(
                  viewMode === "grid" ? "grid gap-6 sm:grid-cols-2" : "flex flex-col gap-4"
                )}>
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        viewMode={viewMode}
                        onViewDetails={(p) => {
                          setSelectedProject(p);
                          setIsModalOpen(true);
                        }}
                        animationDelay={index}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1 mx-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={cn(
                            "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                            page === i + 1
                              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                              : "text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
                          )}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-xl border-slate-200 hover:bg-slate-50 hover:text-indigo-600 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Right AI Panel (Desktop) */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <AIAssistancePanel />
            </div>
          </aside>
        </div>
      </main>

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Sheet open={isAIPanelOpen} onOpenChange={setIsAIPanelOpen}>
        <SheetContent side="right" className="w-full p-0 sm:w-96">
          <div className="p-4 h-full overflow-y-auto">
            <AIAssistancePanel />
          </div>
        </SheetContent>
      </Sheet>

      <FloatingActionButton onClick={() => setIsAIPanelOpen(true)} className="xl:hidden" />
      <Footer />
    </div>
  );
}
