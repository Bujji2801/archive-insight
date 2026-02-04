import { X, Calendar, GitBranch, Tag, Code, Target, Lightbulb, Route, CheckCircle, FileText, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Project } from "@/data/projects";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-foreground">
      <Icon className="h-4 w-4 text-accent" />
      <h4 className="font-semibold">{title}</h4>
    </div>
    <div className="pl-6 text-sm text-muted-foreground leading-relaxed">
      {children}
    </div>
  </div>
);

const ProjectDetailsModal = ({ project, isOpen, onClose }: ProjectDetailsModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-card">
        <DialogHeader className="sticky top-0 z-10 bg-card px-6 py-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold leading-tight text-foreground">
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.year}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <GitBranch className="h-3 w-3" />
                  {project.branch}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 px-6 py-4">
            {/* Problem Statement */}
            <Section icon={Target} title="Problem Statement">
              {project.problemStatement}
            </Section>

            <Separator />

            {/* Objective */}
            <Section icon={Lightbulb} title="Objective">
              {project.objective}
            </Section>

            <Separator />

            {/* Approach */}
            <Section icon={Route} title="Approach">
              {project.approach}
            </Section>

            <Separator />

            {/* Expected Outcome */}
            <Section icon={CheckCircle} title="Expected Outcome">
              {project.expectedOutcome}
            </Section>

            <Separator />

            {/* Keywords */}
            <Section icon={Tag} title="Keywords">
              <div className="flex flex-wrap gap-2">
                {project.keywords.map((keyword) => (
                  <Badge key={keyword} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Section>

            <Separator />

            {/* Technologies Used */}
            <Section icon={Code} title="Technologies Used">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} className="bg-accent/10 text-accent text-xs border-accent/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Section>

            <Separator />

            {/* Conclusion */}
            <Section icon={BookOpen} title="Conclusion">
              {project.conclusion}
            </Section>

            {/* Project ID */}
            <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
              <span className="font-medium">Project ID:</span> {project.id} | 
              <span className="font-medium ml-2">User ID:</span> {project.userId}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
