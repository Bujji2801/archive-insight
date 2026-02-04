import { useState, useCallback } from "react";
import { Brain, Upload, FileText, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface MatchReport {
  existingProjectTitle: string;
  matchedProjectId: string;
  matchedUserId: string;
  sections: {
    technology: "matched" | "different";
    abstractIntent: "matched" | "different";
    methodology: "matched" | "different";
    keywords: number; // percentage
    title: "matched" | "semantically similar" | "different";
  };
  explanation: string;
}

interface AIAssistancePanelProps {
  className?: string;
}

const AIAssistancePanel = ({ className }: AIAssistancePanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<"unique" | "exists" | null>(null);
  const [matchReport, setMatchReport] = useState<MatchReport | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];
    
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document (.pdf, .docx)");
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setMatchReport(null);

    // Simulate AI analysis (in production, this would call your backend)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Simulate result - randomly determine if project exists
    const exists = Math.random() > 0.5;
    setAnalysisResult(exists ? "exists" : "unique");

    if (exists) {
      setMatchReport({
        existingProjectTitle: "Smart Traffic Management System Using Deep Learning",
        matchedProjectId: "proj-001",
        matchedUserId: "user-101",
        sections: {
          technology: "matched",
          abstractIntent: "matched",
          methodology: "matched",
          keywords: 87,
          title: "semantically similar",
        },
        explanation:
          "The uploaded project demonstrates significant overlap with an existing archived project. The core technologies (Python, TensorFlow, OpenCV) are identical. The problem statement addresses the same urban traffic optimization challenge, and the proposed methodology follows a similar CNN-based vehicle detection approach. The keyword overlap of 87% further supports this classification.",
      });
    }

    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setMatchReport(null);
  };

  const SectionMatch = ({
    label,
    status,
  }: {
    label: string;
    status: "matched" | "different" | "semantically similar" | number;
  }) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      {typeof status === "number" ? (
        <div className="flex items-center gap-2">
          <Progress value={status} className="w-16 h-2" />
          <span className="text-sm font-medium text-foreground">{status}%</span>
        </div>
      ) : (
        <Badge
          variant={status === "different" ? "outline" : "secondary"}
          className={cn(
            "text-xs",
            status === "matched" && "bg-destructive/10 text-destructive border-destructive/20",
            status === "semantically similar" && "bg-warning/10 text-warning border-warning/20"
          )}
        >
          {status === "matched" ? "Matched" : status === "semantically similar" ? "Similar" : "Different"}
        </Badge>
      )}
    </div>
  );

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-accent" />
            AI Assistance
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-4", isCollapsed && "hidden lg:block")}>
        {/* Upload Zone */}
        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed p-6 text-center transition-colors",
            isDragging
              ? "border-accent bg-accent/5"
              : "border-border hover:border-muted-foreground/50",
            uploadedFile && "border-solid border-accent/50 bg-accent/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <>
              <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium text-foreground">
                Upload your project document
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag and drop or click to browse
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                (.pdf, .docx)
              </p>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileSelect}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-accent" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              {!isAnalyzing && (
                <Button variant="ghost" size="sm" onClick={resetAnalysis}>
                  Change
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Analysis Status */}
        {isAnalyzing && (
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p className="text-sm font-medium text-foreground">
              Analyzing document...
            </p>
            <p className="text-xs text-muted-foreground">
              Performing semantic comparison
            </p>
          </div>
        )}

        {/* Result Display */}
        {analysisResult && !isAnalyzing && (
          <div
            className={cn(
              "rounded-lg p-4",
              analysisResult === "unique"
                ? "bg-success/10 border border-success/20"
                : "bg-destructive/10 border border-destructive/20"
            )}
          >
            <div className="flex items-center gap-2">
              {analysisResult === "unique" ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive" />
              )}
              <span
                className={cn(
                  "font-semibold",
                  analysisResult === "unique" ? "text-success" : "text-destructive"
                )}
              >
                {analysisResult === "unique"
                  ? "Project is unique"
                  : "Project already exists"}
              </span>
            </div>
          </div>
        )}

        {/* Match Report */}
        {matchReport && analysisResult === "exists" && (
          <div className="space-y-4">
            <Separator />
            
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <AlertTriangle className="h-4 w-4 text-warning" />
                Match Report
              </h4>

              <div className="rounded-lg bg-muted/50 p-3 mb-3">
                <p className="text-xs text-muted-foreground mb-1">
                  Existing Project
                </p>
                <p className="text-sm font-medium text-foreground">
                  {matchReport.existingProjectTitle}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ID: {matchReport.matchedProjectId} | User: {matchReport.matchedUserId}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Section-wise Match Summary
                </p>
                <SectionMatch
                  label="Technology"
                  status={matchReport.sections.technology}
                />
                <SectionMatch
                  label="Abstract Intent"
                  status={matchReport.sections.abstractIntent}
                />
                <SectionMatch
                  label="Methodology"
                  status={matchReport.sections.methodology}
                />
                <SectionMatch
                  label="Keywords"
                  status={matchReport.sections.keywords}
                />
                <SectionMatch
                  label="Title"
                  status={matchReport.sections.title}
                />
              </div>

              <Separator className="my-3" />

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Explanation
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {matchReport.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistancePanel;
