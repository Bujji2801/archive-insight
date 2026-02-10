import { X, Calendar, GitBranch, Tag, Code, Target, Lightbulb, Route, CheckCircle, FileText, BookOpen, Quote } from "lucide-react";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const Section = ({
  icon: Icon,
  title,
  children,
  className
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("space-y-3", className)}>
    <div className="flex items-center gap-2 text-slate-900">
      <div className="h-6 w-6 rounded-md bg-indigo-50 flex items-center justify-center">
        <Icon className="h-3.5 w-3.5 text-indigo-600" />
      </div>
      <h4 className="font-editorial font-bold text-lg">{title}</h4>
    </div>
    <div className="text-slate-600 leading-relaxed text-sm md:text-base">
      {children}
    </div>
  </div>
);

const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 bg-white gap-0 border-none shadow-2xl rounded-[2.5rem] overflow-hidden">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex flex-col">
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-wider uppercase">
                    {project.id}
                  </span>
                  <Badge variant="secondary" className="gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100 rounded-full px-3">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </Badge>
                  <Badge variant="outline" className="gap-1 rounded-full px-3 border-slate-200 text-slate-600">
                    <GitBranch className="h-3 w-3" />
                    {project.branch}
                  </Badge>
                </div>
                <DialogTitle className="font-editorial text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                  {project.title}
                </DialogTitle>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-140px)]">
          <div className="p-6 pt-2 space-y-8">

            {/* Quick Summary / Abstract-ish */}
            <div className="p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 relative">
              <Quote className="absolute top-4 left-4 h-6 w-6 text-slate-200 -z-10" />
              <p className="font-editorial text-lg text-slate-700 italic leading-relaxed">
                "{project.problemStatement.substring(0, 150)}..."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem Statement */}
              <Section icon={Target} title="Problem Statement">
                {project.problemStatement}
              </Section>

              {/* Objective */}
              <Section icon={Lightbulb} title="Objective">
                {project.objective}
              </Section>
            </div>

            <Separator className="bg-slate-100" />

            {/* Approach & Methodology */}
            <Section icon={Route} title="Approach & Methodology">
              {project.approach}
            </Section>

            <Separator className="bg-slate-100" />

            {/* Expected Outcome */}
            <Section icon={CheckCircle} title="Key Outcomes">
              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100/50 text-slate-700">
                {project.expectedOutcome}
              </div>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Keywords */}
              <Section icon={Tag} title="Keywords">
                <div className="flex flex-wrap gap-2">
                  {project.keywords.map((keyword) => (
                    <span key={keyword} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                      {keyword}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Technologies Used */}
              <Section icon={Code} title="Tech Stack">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </Section>
            </div>

            <Section icon={BookOpen} title="Conclusion">
              <p className="text-slate-600">{project.conclusion}</p>
            </Section>

            {/* Footer Metadata */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono uppercase tracking-wider">
              <span>ID: {project.id}</span>
              <span>User: {project.userId}</span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
