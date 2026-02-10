import { useState, useCallback } from "react";
import { Brain, Upload, FileText, CheckCircle, XCircle, ChevronDown, ChevronUp, Sparkles, AlertCircle } from "lucide-react";
import { HeizenButton } from "./ui/heizen-button";
import { cn } from "@/lib/utils";
import { analyzeDocument } from "./ai-assistance/similarityEngine";
import MatchReportDisplay from "./ai-assistance/MatchReportDisplay";
import { MatchReport } from "./ai-assistance/types";

interface AIAssistancePanelProps {
  className?: string;
  mode?: "scanner" | "default";
  context?: "scanning" | "results" | "idle";
}

const AIAssistancePanel = ({ className, mode = "default", context = "idle" }: AIAssistancePanelProps) => {
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

  if (mode === "scanner") {
    // Context-aware help for Scanner page
    return (
      <div className={cn("bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm", className)}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-indigo-600" />
          </div>
          <h3 className="font-editorial text-lg font-bold text-slate-900">AI Technician</h3>
        </div>

        <div className="space-y-4 text-sm text-slate-600">
          {context === "idle" && (
            <>
              <p>I'm ready to analyze your document. I will check for:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Semantic Structure</li>
                <li>Keyword Density</li>
                <li>Originality Score</li>
                <li>Citation Quality</li>
              </ul>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500 mt-4">
                <p className="font-semibold text-slate-700 mb-1">Tip:</p>
                PDFs with clear headings yield the best results.
              </div>
            </>
          )}
          {context === "scanning" && (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              <p className="text-xs text-indigo-600 font-medium">Processing semantic layers...</p>
            </div>
          )}
          {context === "results" && (
            <>
              <p>Analysis complete. Focus on the <strong>Upgrade Suggestions</strong> to improve your project's impact.</p>
              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-700 mt-4">
                Need a deeper dive? <br />
                <span className="underline cursor-pointer">Generate Full PDF Report</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden transition-all duration-300", className)}>
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <Brain className="h-4 w-4 text-indigo-600" />
            </div>
            <h3 className="font-editorial text-lg font-bold text-slate-900">Quick Check</h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden p-1 hover:bg-slate-100 rounded-md transition-colors"
          >
            {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className={cn("p-4 space-y-4", isCollapsed && "hidden lg:block")}>
        {/* Upload Zone */}
        <div
          className={cn(
            "relative rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200 group cursor-pointer",
            isDragging
              ? "border-indigo-500 bg-indigo-50/30"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50",
            uploadedFile && "border-solid border-indigo-200 bg-indigo-50/10"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!uploadedFile ? (
            <>
              <div className="mx-auto h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <p className="text-sm font-medium text-slate-900">
                Check for duplicates
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Drag PDF/DOCX here
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
              <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-slate-500">
                  {(uploadedFile.size / 1024).toFixed(0)} KB
                </p>
              </div>
              {!isAnalyzing && (
                <button onClick={resetAnalysis} className="p-1 hover:bg-slate-100 rounded-full">
                  <XCircle className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Analysis Status */}
        {isAnalyzing && (
          <div className="rounded-xl bg-slate-50 p-4 text-center border border-slate-100">
            <div className="mx-auto mb-3 h-8 w-8 relative">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-100 border-t-indigo-500 animate-spin" />
            </div>
            <p className="text-sm font-medium text-slate-900">
              Scanning Archive...
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Comparing against 1.2M+ projects
            </p>
          </div>
        )}

        {/* Quick Result Display */}
        {analysisResult && !isAnalyzing && (
          <div
            className={cn(
              "rounded-xl p-4 border",
              analysisResult === "unique"
                ? "bg-green-50 border-green-100"
                : "bg-red-50 border-red-100"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {analysisResult === "unique" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span
                className={cn(
                  "font-bold font-editorial text-sm",
                  analysisResult === "unique" ? "text-green-800" : "text-red-800"
                )}
              >
                {analysisResult === "unique"
                  ? "UNIQUE CONTRIBUTION"
                  : "SIMILARITY DETECTED"}
              </span>
            </div>
            <p className={cn("text-xs leading-relaxed", analysisResult === "unique" ? "text-green-700" : "text-red-700")}>
              {analysisResult === "unique"
                ? "No direct matches found. This topic appears to be original."
                : "This project has significant overlap with existing entries."}
            </p>
          </div>
        )}

        {/* Detailed Match Report */}
        {matchReport && !isAnalyzing && (
          <MatchReportDisplay report={matchReport} />
        )}
      </div>
    </div>
  );
};

export default AIAssistancePanel;
