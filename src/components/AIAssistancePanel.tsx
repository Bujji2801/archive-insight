import { useState, useCallback } from "react";
import { Brain, Upload, FileText, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface MatchedSection {
  status: "matched" | "different" | "semantically similar";
  yourContent: string;
  matchedContent: string;
}

interface MatchReport {
  existingProjectTitle: string;
  matchedProjectId: string;
  matchedUserName: string;
  matchedUserEmail: string;
  submissionDate: string;
  sections: {
    technology: MatchedSection;
    abstractIntent: MatchedSection;
    methodology: MatchedSection;
    keywords: { percentage: number; yourKeywords: string[]; matchedKeywords: string[] };
    title: MatchedSection;
  };
  overallSimilarity: number;
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

  // Simulate detection based on filename patterns (for demo purposes)
  const detectSimilarity = (filename: string): { exists: boolean; report: MatchReport | null } => {
    const lowerName = filename.toLowerCase();
    
    // Keywords that indicate existing/duplicate projects
    const duplicateKeywords = ["traffic", "smart", "deep", "learning", "cnn", "vehicle", "detection"];
    const matchCount = duplicateKeywords.filter(k => lowerName.includes(k)).length;
    
    // If filename contains 2+ matching keywords, consider it a duplicate
    const exists = matchCount >= 2;
    
    if (!exists) {
      return { exists: false, report: null };
    }

    return {
      exists: true,
      report: {
        existingProjectTitle: "Smart Traffic Management System Using Deep Learning",
        matchedProjectId: "PROJ-2024-CS-0147",
        matchedUserName: "Rahul Sharma",
        matchedUserEmail: "rahul.sharma@university.edu",
        submissionDate: "March 15, 2024",
        sections: {
          technology: {
            status: "matched",
            yourContent: "Python, TensorFlow, OpenCV, CNN",
            matchedContent: "Python, TensorFlow, OpenCV, CNN"
          },
          abstractIntent: {
            status: "matched",
            yourContent: "Optimize urban traffic flow using AI-based vehicle detection",
            matchedContent: "Real-time traffic optimization through intelligent vehicle detection"
          },
          methodology: {
            status: "matched",
            yourContent: "CNN-based vehicle detection with real-time processing",
            matchedContent: "Convolutional Neural Network for vehicle classification and counting"
          },
          keywords: {
            percentage: 87,
            yourKeywords: ["traffic", "deep learning", "CNN", "vehicle detection", "optimization", "real-time", "urban"],
            matchedKeywords: ["traffic", "deep learning", "CNN", "vehicle detection", "smart city", "real-time", "optimization"]
          },
          title: {
            status: "semantically similar",
            yourContent: filename.replace(/\.[^/.]+$/, ""),
            matchedContent: "Smart Traffic Management System Using Deep Learning"
          }
        },
        overallSimilarity: 87,
        explanation:
          "Your project demonstrates significant overlap with an existing archived project submitted by Rahul Sharma on March 15, 2024. The comparison reveals:\n\n• Technologies: Identical stack (Python, TensorFlow, OpenCV)\n• Problem Statement: Both address urban traffic optimization\n• Methodology: Similar CNN-based vehicle detection approach\n• Keywords: 87% overlap in core technical terms\n\nThis project cannot be registered as it closely matches an existing submission."
      }
    };
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

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Detect based on filename (demo simulation)
    const { exists, report } = detectSimilarity(file.name);
    setAnalysisResult(exists ? "exists" : "unique");
    setMatchReport(report);

    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setMatchReport(null);
  };

  const SectionMatchDetail = ({
    label,
    section,
  }: {
    label: string;
    section: MatchedSection;
  }) => (
    <div className="rounded-lg border border-border bg-muted/30 p-3 mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <Badge
          variant={section.status === "different" ? "outline" : "secondary"}
          className={cn(
            "text-xs",
            section.status === "matched" && "bg-destructive/10 text-destructive border-destructive/20",
            section.status === "semantically similar" && "bg-warning/10 text-warning border-warning/20"
          )}
        >
          {section.status === "matched" ? "Matched" : section.status === "semantically similar" ? "Similar" : "Different"}
        </Badge>
      </div>
      <div className="grid gap-2 text-xs">
        <div className="rounded bg-background p-2">
          <span className="text-muted-foreground block mb-1">Your Content:</span>
          <span className="text-foreground">{section.yourContent}</span>
        </div>
        <div className="rounded bg-destructive/5 p-2 border border-destructive/10">
          <span className="text-muted-foreground block mb-1">Matched With:</span>
          <span className="text-destructive">{section.matchedContent}</span>
        </div>
      </div>
    </div>
  );

  const KeywordMatchDetail = ({
    keywords,
  }: {
    keywords: { percentage: number; yourKeywords: string[]; matchedKeywords: string[] };
  }) => (
    <div className="rounded-lg border border-border bg-muted/30 p-3 mb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">Keywords</span>
        <div className="flex items-center gap-2">
          <Progress value={keywords.percentage} className="w-16 h-2" />
          <span className="text-sm font-medium text-destructive">{keywords.percentage}%</span>
        </div>
      </div>
      <div className="grid gap-2 text-xs">
        <div className="rounded bg-background p-2">
          <span className="text-muted-foreground block mb-1">Your Keywords:</span>
          <div className="flex flex-wrap gap-1">
            {keywords.yourKeywords.map((kw, i) => (
              <Badge key={i} variant="outline" className="text-xs">{kw}</Badge>
            ))}
          </div>
        </div>
        <div className="rounded bg-destructive/5 p-2 border border-destructive/10">
          <span className="text-muted-foreground block mb-1">Matched Keywords:</span>
          <div className="flex flex-wrap gap-1">
            {keywords.matchedKeywords.map((kw, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20">{kw}</Badge>
            ))}
          </div>
        </div>
      </div>
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
                Duplicate Detection Report
              </h4>

              {/* Overall Similarity Score */}
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-destructive">Overall Similarity</span>
                  <span className="text-2xl font-bold text-destructive">{matchReport.overallSimilarity}%</span>
                </div>
                <Progress value={matchReport.overallSimilarity} className="mt-2 h-2" />
              </div>

              {/* Matched With - User Details */}
              <div className="rounded-lg bg-muted/50 p-3 mb-4 border border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Matched With Existing Project
                </p>
                <p className="text-sm font-semibold text-foreground mb-1">
                  {matchReport.existingProjectTitle}
                </p>
                <div className="grid gap-1 text-xs text-muted-foreground mt-2">
                  <p><span className="font-medium">Project ID:</span> {matchReport.matchedProjectId}</p>
                  <p><span className="font-medium">Submitted By:</span> {matchReport.matchedUserName}</p>
                  <p><span className="font-medium">Email:</span> {matchReport.matchedUserEmail}</p>
                  <p><span className="font-medium">Submission Date:</span> {matchReport.submissionDate}</p>
                </div>
              </div>

              {/* Section-wise Detailed Comparison */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Section-wise Comparison
                </p>
                
                <SectionMatchDetail
                  label="Technology Stack"
                  section={matchReport.sections.technology}
                />
                <SectionMatchDetail
                  label="Abstract / Problem Intent"
                  section={matchReport.sections.abstractIntent}
                />
                <SectionMatchDetail
                  label="Methodology"
                  section={matchReport.sections.methodology}
                />
                <KeywordMatchDetail keywords={matchReport.sections.keywords} />
                <SectionMatchDetail
                  label="Title"
                  section={matchReport.sections.title}
                />
              </div>

              <Separator className="my-3" />

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Analysis Summary
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
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
