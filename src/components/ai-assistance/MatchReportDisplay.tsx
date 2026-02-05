import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MatchReport, ComparisonResult, SectionComparison, KeywordComparison } from "./types";

interface MatchReportDisplayProps {
  report: MatchReport;
}

const SectionMatchDetail = ({
  label,
  section,
  passed,
}: {
  label: string;
  section: SectionComparison;
  passed: boolean;
}) => (
  <div className="rounded-lg border border-border bg-muted/30 p-3 mb-2">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {passed ? (
          <CheckCircle className="h-4 w-4 text-destructive" />
        ) : (
          <XCircle className="h-4 w-4 text-success" />
        )}
        <Badge
          variant="secondary"
          className={cn(
            "text-xs",
            section.status === "matched" && "bg-destructive/10 text-destructive border-destructive/20",
            section.status === "semantically similar" && "bg-warning/10 text-warning border-warning/20",
            section.status === "different" && "bg-success/10 text-success border-success/20"
          )}
        >
          {section.status === "matched" ? "MATCHED" : section.status === "semantically similar" ? "SIMILAR" : "DIFFERENT"}
        </Badge>
      </div>
    </div>
    {section.yourContent !== "Skipped" && (
      <div className="grid gap-2 text-xs">
        <div className="rounded bg-background p-2">
          <span className="text-muted-foreground block mb-1">Your Content:</span>
          <span className="text-foreground">{section.yourContent}</span>
        </div>
        <div className={cn(
          "rounded p-2 border",
          section.status === "matched" ? "bg-destructive/5 border-destructive/10" : "bg-muted/50 border-border"
        )}>
          <span className="text-muted-foreground block mb-1">Database Content:</span>
          <span className={section.status === "matched" ? "text-destructive" : "text-foreground"}>
            {section.matchedContent}
          </span>
        </div>
      </div>
    )}
    {section.yourContent === "Skipped" && (
      <p className="text-xs text-muted-foreground italic">Comparison skipped due to prior check failure</p>
    )}
  </div>
);

const KeywordMatchDetail = ({
  keywords,
  passed,
}: {
  keywords: KeywordComparison;
  passed: boolean;
}) => (
  <div className="rounded-lg border border-border bg-muted/30 p-3 mb-2">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-foreground">Keywords</span>
      <div className="flex items-center gap-2">
        {passed ? (
          <CheckCircle className="h-4 w-4 text-destructive" />
        ) : (
          <XCircle className="h-4 w-4 text-success" />
        )}
        <Progress value={keywords.percentage} className="w-16 h-2" />
        <span className={cn(
          "text-sm font-medium",
          passed ? "text-destructive" : "text-success"
        )}>
          {keywords.percentage}%
        </span>
      </div>
    </div>
    <div className="grid gap-2 text-xs">
      <div className="rounded bg-background p-2">
        <span className="text-muted-foreground block mb-1">Your Keywords:</span>
        <div className="flex flex-wrap gap-1">
          {keywords.yourKeywords.map((kw, i) => (
            <Badge 
              key={i} 
              variant="outline" 
              className={cn(
                "text-xs",
                keywords.overlappingKeywords.includes(kw.toLowerCase().trim().replace(/s$/, '')) 
                  ? "bg-destructive/10 text-destructive border-destructive/20" 
                  : ""
              )}
            >
              {kw}
            </Badge>
          ))}
        </div>
      </div>
      <div className="rounded bg-muted/50 p-2 border border-border">
        <span className="text-muted-foreground block mb-1">Database Keywords:</span>
        <div className="flex flex-wrap gap-1">
          {keywords.matchedKeywords.map((kw, i) => (
            <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
          ))}
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground mt-2">
      {passed ? "≥70% overlap - supports duplication claim" : "<70% overlap - does not support duplication"}
    </p>
  </div>
);

const ProjectComparisonCard = ({ comparison }: { comparison: ComparisonResult }) => (
  <div className={cn(
    "rounded-lg border p-4 mb-4",
    comparison.isFullMatch 
      ? "border-destructive bg-destructive/5" 
      : "border-border bg-muted/20"
  )}>
    <div className="flex items-center justify-between mb-3">
      <div>
        <h5 className="text-sm font-semibold text-foreground">{comparison.projectTitle}</h5>
        <p className="text-xs text-muted-foreground">
          ID: {comparison.projectId} | User: {comparison.userId}
        </p>
      </div>
      <Badge className={cn(
        comparison.isFullMatch 
          ? "bg-destructive text-destructive-foreground" 
          : "bg-success/10 text-success border-success/20"
      )}>
        {comparison.isFullMatch ? "FULL MATCH" : "NOT MATCHED"}
      </Badge>
    </div>
    
    <div className="space-y-2">
      <SectionMatchDetail
        label="Step 1: Technology Check (Hard Stop)"
        section={comparison.technology}
        passed={comparison.passedTechCheck}
      />
      <SectionMatchDetail
        label="Step 2: Abstract Intent Check (Hard Stop)"
        section={comparison.abstractIntent}
        passed={comparison.passedAbstractCheck}
      />
      <SectionMatchDetail
        label="Step 3: Methodology Check (Hard Stop)"
        section={comparison.methodology}
        passed={comparison.passedMethodologyCheck}
      />
      <KeywordMatchDetail
        keywords={comparison.keywords}
        passed={comparison.passedKeywordCheck}
      />
      <SectionMatchDetail
        label="Step 5: Title Check (Low Weight)"
        section={comparison.title}
        passed={comparison.title.status === "matched"}
      />
    </div>
    
    <div className="mt-3 p-2 rounded bg-muted/50 text-xs">
      <strong>Verdict:</strong>{" "}
      {comparison.isFullMatch ? (
        <span className="text-destructive">All mandatory checks passed - Project already exists</span>
      ) : (
        <span className="text-success">
          Failed checks:{" "}
          {!comparison.passedTechCheck && "Technology, "}
          {!comparison.passedAbstractCheck && "Abstract Intent, "}
          {!comparison.passedMethodologyCheck && "Methodology, "}
          {!comparison.passedKeywordCheck && "Keywords (<70%)"}
          - Project is unique
        </span>
      )}
    </div>
  </div>
);

const MatchReportDisplay = ({ report }: MatchReportDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Uploaded Project Info */}
      <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Uploaded Project Analysis
        </p>
        <p className="text-sm font-semibold text-foreground mb-1">{report.uploadedProjectInfo.title}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {report.uploadedProjectInfo.technologies.map((tech, i) => (
            <Badge key={i} variant="outline" className="text-xs">{tech}</Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Keywords: {report.uploadedProjectInfo.keywords.join(", ")}
        </p>
      </div>
      
      <Separator />
      
      {/* Final Result */}
      <div className={cn(
        "rounded-lg p-4 text-center",
        report.finalResult === "unique"
          ? "bg-success/10 border border-success/20"
          : "bg-destructive/10 border border-destructive/20"
      )}>
        <div className="flex items-center justify-center gap-2 mb-2">
          {report.finalResult === "unique" ? (
            <CheckCircle className="h-6 w-6 text-success" />
          ) : (
            <XCircle className="h-6 w-6 text-destructive" />
          )}
          <span className={cn(
            "text-lg font-bold",
            report.finalResult === "unique" ? "text-success" : "text-destructive"
          )}>
            {report.finalResult === "unique" ? "PROJECT IS UNIQUE" : "PROJECT ALREADY EXISTS"}
          </span>
        </div>
      </div>
      
      {/* Match Details */}
      {report.matchedWith && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Matched With</span>
          </div>
          <p className="text-sm font-medium text-foreground">{report.matchedWith.projectTitle}</p>
          <p className="text-xs text-muted-foreground">
            Project ID: {report.matchedWith.projectId} | User ID: {report.matchedWith.userId}
          </p>
        </div>
      )}
      
      <Separator />
      
      {/* Detailed Comparisons */}
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Comparison with All Database Projects
        </h4>
        
        {/* Show matched project first if exists */}
        {report.matchedWith && (
          <>
            <p className="text-xs font-medium text-destructive uppercase mb-2">⚠️ Matched Project</p>
            <ProjectComparisonCard comparison={report.matchedWith} />
          </>
        )}
        
        {/* Show other comparisons */}
        <details className="mt-4">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
            View all {report.comparisons.length - (report.matchedWith ? 1 : 0)} other comparisons
          </summary>
          <div className="mt-2 space-y-2">
            {report.comparisons
              .filter(c => !c.isFullMatch)
              .map((comparison, i) => (
                <ProjectComparisonCard key={i} comparison={comparison} />
              ))}
          </div>
        </details>
      </div>
      
      <Separator />
      
      {/* Explanation */}
      <div className="rounded-lg bg-muted/50 p-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Analysis Summary
        </p>
        <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {report.explanation}
        </p>
      </div>
    </div>
  );
};

export default MatchReportDisplay;
