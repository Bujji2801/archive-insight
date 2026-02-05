import { useState, useCallback } from "react";
import { Brain, Upload, FileText, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { analyzeDocument } from "./ai-assistance/similarityEngine";
import MatchReportDisplay from "./ai-assistance/MatchReportDisplay";
import { MatchReport } from "./ai-assistance/types";

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

    // Simulate document parsing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Run deterministic similarity analysis
    const report = analyzeDocument(file.name);
    setAnalysisResult(report.finalResult);
    setMatchReport(report);

    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setMatchReport(null);
  };

  return (
    <Card className={cn("border-border bg-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-accent" />
            AI Similarity Detection
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
        <p className="text-xs text-muted-foreground">
          Upload your project document to check for duplicates
        </p>
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
            <p className="text-xs text-muted-foreground mt-1">
              Running 5-step semantic comparison
            </p>
            <div className="mt-3 text-xs text-muted-foreground space-y-1">
              <p>Step 1: Technology Check</p>
              <p>Step 2: Abstract Intent Check</p>
              <p>Step 3: Methodology Check</p>
              <p>Step 4: Keyword Check</p>
              <p>Step 5: Title Check</p>
            </div>
          </div>
        )}

        {/* Quick Result Display */}
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
                  ? "PROJECT IS UNIQUE"
                  : "PROJECT ALREADY EXISTS"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {analysisResult === "unique"
                ? "No matching project found in the database. All mandatory checks failed for existing projects."
                : "This project matches an existing submission. See detailed report below."}
            </p>
          </div>
        )}

        {/* Detailed Match Report */}
        {matchReport && !isAnalyzing && (
          <MatchReportDisplay report={matchReport} />
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistancePanel;
