import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { years, branches, techStacks } from "@/data/projects";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarFiltersProps {
    yearFilter: string;
    branchFilter: string;
    techFilter: string;
    onYearChange: (value: string) => void;
    onBranchChange: (value: string) => void;
    onTechChange: (value: string) => void;
    onReset: () => void;
    className?: string;
}

export function SidebarFilters({
    yearFilter,
    branchFilter,
    techFilter,
    onYearChange,
    onBranchChange,
    onTechChange,
    onReset,
    className,
}: SidebarFiltersProps) {
    return (
        <div className={cn("h-full", className)}>
            <div className="flex items-center justify-between py-4 mb-2">
                <h3 className="font-editorial text-lg font-bold text-slate-900">Filter Projects</h3>
                {(yearFilter !== "all" || branchFilter !== "all" || techFilter !== "all") && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onReset}
                        className="h-auto p-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                        Reset
                        <X className="ml-1 h-3 w-3" />
                    </Button>
                )}
            </div>

            <div className="space-y-8">
                {/* Year Filter */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-px bg-slate-200 flex-1" />
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Academic Year
                        </Label>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex items-center space-x-3 group">
                            <Checkbox
                                id="year-all"
                                checked={yearFilter === "all"}
                                onCheckedChange={() => onYearChange("all")}
                                className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            />
                            <label
                                htmlFor="year-all"
                                className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                            >
                                All Years
                            </label>
                        </div>
                        {years.map((year) => (
                            <div key={year} className="flex items-center space-x-3 group">
                                <Checkbox
                                    id={`year-${year}`}
                                    checked={yearFilter === year.toString()}
                                    onCheckedChange={() => onYearChange(year.toString())}
                                    className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <label
                                    htmlFor={`year-${year}`}
                                    className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                                >
                                    {year}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Branch Filter */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-px bg-slate-200 flex-1" />
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Department
                        </Label>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex items-center space-x-3 group">
                            <Checkbox
                                id="branch-all"
                                checked={branchFilter === "all"}
                                onCheckedChange={() => onBranchChange("all")}
                                className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            />
                            <label
                                htmlFor="branch-all"
                                className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                            >
                                All Departments
                            </label>
                        </div>
                        {branches.map((branch) => (
                            <div key={branch} className="flex items-center space-x-3 group">
                                <Checkbox
                                    id={`branch-${branch}`}
                                    checked={branchFilter === branch}
                                    onCheckedChange={() => onBranchChange(branch)}
                                    className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <label
                                    htmlFor={`branch-${branch}`}
                                    className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                                >
                                    {branch}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Filter */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="h-px bg-slate-200 flex-1" />
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Tech Stack
                        </Label>
                        <div className="h-px bg-slate-200 flex-1" />
                    </div>
                    <ScrollArea className="h-64 pr-4 -mr-4">
                        <div className="space-y-2.5 pb-2">
                            <div className="flex items-center space-x-3 group">
                                <Checkbox
                                    id="tech-all"
                                    checked={techFilter === "all"}
                                    onCheckedChange={() => onTechChange("all")}
                                    className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                />
                                <label
                                    htmlFor="tech-all"
                                    className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                                >
                                    All Technologies
                                </label>
                            </div>
                            {techStacks.map((tech) => (
                                <div key={tech} className="flex items-center space-x-3 group">
                                    <Checkbox
                                        id={`tech-${tech}`}
                                        checked={techFilter === tech}
                                        onCheckedChange={() => onTechChange(tech)}
                                        className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                                    />
                                    <label
                                        htmlFor={`tech-${tech}`}
                                        className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-slate-900 transition-colors"
                                    >
                                        {tech}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
