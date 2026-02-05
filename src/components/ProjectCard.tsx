import { Calendar, GitBranch } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  animationDelay?: number;
}

const ProjectCard = ({ project, onViewDetails, animationDelay = 0 }: ProjectCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-sentinel-lg opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <CardHeader className="pb-3">
        <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 pt-2">
          <Badge variant="secondary" className="gap-1 text-xs">
            <Calendar className="h-3 w-3" />
            {project.year}
          </Badge>
          <Badge variant="outline" className="gap-1 text-xs">
            <GitBranch className="h-3 w-3" />
            {project.branch}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.hashtags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          variant="accent"
          size="sm"
          className="w-full"
          onClick={() => onViewDetails(project)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
