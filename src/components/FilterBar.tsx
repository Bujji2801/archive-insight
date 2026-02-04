import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { years, branches, techStacks } from "@/data/projects";

interface FilterBarProps {
  yearFilter: string;
  branchFilter: string;
  techFilter: string;
  onYearChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onTechChange: (value: string) => void;
}

const FilterBar = ({
  yearFilter,
  branchFilter,
  techFilter,
  onYearChange,
  onBranchChange,
  onTechChange,
}: FilterBarProps) => {
  return (
    <section className="border-b border-border bg-muted/50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Filter by:
          </span>

          {/* Year Filter */}
          <Select value={yearFilter} onValueChange={onYearChange}>
            <SelectTrigger className="w-[140px] border-border bg-card">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Branch Filter */}
          <Select value={branchFilter} onValueChange={onBranchChange}>
            <SelectTrigger className="w-[180px] border-border bg-card">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch} value={branch}>
                  {branch}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tech Stack Filter */}
          <Select value={techFilter} onValueChange={onTechChange}>
            <SelectTrigger className="w-[160px] border-border bg-card">
              <SelectValue placeholder="Tech Stack" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tech</SelectItem>
              {techStacks.map((tech) => (
                <SelectItem key={tech} value={tech}>
                  {tech}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
