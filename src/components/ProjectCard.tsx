import { motion } from "framer-motion";
import { Calendar, GitBranch, ArrowUpRight } from "lucide-react";
import { HeizenButton } from "./ui/heizen-button";
import { Badge } from "./ui/badge";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  animationDelay?: number;
  viewMode?: "grid" | "list";
}

const ProjectCard = ({
  project,
  onViewDetails,
  animationDelay = 0,
  viewMode = "grid",
}: ProjectCardProps) => {
  const isList = viewMode === "list";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className={cn(
        "group relative overflow-hidden bg-white border border-slate-200 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200",
        isList ? "flex flex-col md:flex-row md:items-center p-6 gap-6 rounded-2xl" : "flex flex-col p-6 rounded-3xl h-full"
      )}
    >
      <div className={cn("flex flex-col gap-4 flex-1", isList && "md:flex-row md:items-start md:gap-8")}>

        {/* Header Section */}
        <div className={cn("flex-1 min-w-0", isList && "md:flex-[2]")}>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-xl font-editorial font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {project.title}
            </h3>
            {!isList && (
              <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors transform group-hover:rotate-45 duration-300">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100/50 hover:bg-slate-100 gap-1.5 px-3 py-1 font-medium text-xs rounded-md uppercase tracking-wider">
              <Calendar className="h-3 w-3" />
              {project.year}
            </Badge>
            <Badge variant="outline" className="border-slate-200 text-slate-500 gap-1.5 px-3 py-1 font-medium text-xs rounded-md uppercase tracking-wider">
              <GitBranch className="h-3 w-3" />
              {project.branch}
            </Badge>
          </div>

          <p className={cn("text-sm text-slate-500 leading-relaxed", isList ? "line-clamp-2" : "line-clamp-3")}>
            {project.description}
          </p>
        </div>

        {/* Footer / Meta Section */}
        <div className={cn("flex flex-col gap-4", isList ? "md:items-end md:justify-between md:self-stretch md:w-48" : "mt-auto pt-4")}>
          <div className="flex flex-wrap gap-2">
            {project.hashtags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                #{tag.replace(/^#/, "")}
              </span>
            ))}
          </div>

          <HeizenButton
            variant="editorial"
            size="sm"
            className="w-full justify-between group/btn"
            onClick={() => onViewDetails(project)}
          >
            Entry Details
            <ArrowUpRight className="h-3 w-3 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
          </HeizenButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

