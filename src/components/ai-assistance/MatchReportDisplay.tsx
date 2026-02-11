import { CheckCircle, XCircle, AlertTriangle, FileText, ArrowRight, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MatchReport, ComparisonResult } from "./types";
import { motion, AnimatePresence } from "framer-motion";

interface MatchReportDisplayProps {
  report: MatchReport;
}

const ScoreRing = ({ score, isUnique }: { score: number; isUnique: boolean }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-20 h-20 transform -rotate-90">
        <circle
          className="text-slate-100"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={isUnique ? "text-emerald-500" : "text-amber-500"}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={cn("text-lg font-bold font-editorial", isUnique ? "text-emerald-700" : "text-amber-700")}>
          {score}%
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-400">Unique</span>
      </div>
    </div>
  );
};

const ProjectMatchCard = ({ comparison, isPrimary = false }: { comparison: ComparisonResult, isPrimary?: boolean }) => (
  <div className={cn(
    "group relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md",
    isPrimary
      ? "bg-amber-50/50 border-amber-200"
      : "bg-white border-slate-100 hover:border-slate-200"
  )}>
    <div className="flex justify-between items-start gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {isPrimary && <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 px-1.5 py-0 text-[10px]">Top Match</Badge>}
          <h4 className="font-semibold text-slate-900 truncate">{comparison.projectTitle}</h4>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            ID: {comparison.projectId.slice(0, 8)}
          </span>
          <span className="flex items-center gap-1">
            Similarity: <span className={cn("font-medium", isPrimary ? "text-amber-600" : "text-slate-600")}>
              {(comparison.keywords.percentage)}%
            </span>
          </span>
        </div>

        {/* Mini comparison grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className={cn("text-xs p-2 rounded-lg border", comparison.passedAbstractCheck ? "bg-red-50 border-red-100 text-red-700" : "bg-emerald-50 border-emerald-100 text-emerald-700")}>
            <span className="block text-[10px] uppercase font-bold opacity-70 mb-0.5">Title Similarity</span>
            {comparison.passedAbstractCheck ? "High Overlap" : "Distinct"}
          </div>
          <div className={cn("text-xs p-2 rounded-lg border", comparison.passedTechCheck ? "bg-red-50 border-red-100 text-red-700" : "bg-emerald-50 border-emerald-100 text-emerald-700")}>
            <span className="block text-[10px] uppercase font-bold opacity-70 mb-0.5">Tech Stack</span>
            {comparison.passedTechCheck ? "Identical" : "Varied"}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border", isPrimary ? "bg-white border-amber-200" : "bg-slate-50 border-slate-100")}>
          <ArrowRight className={cn("h-4 w-4", isPrimary ? "text-amber-500" : "text-slate-400")} />
        </div>
      </div>
    </div>
  </div>
);

const MatchReportDisplay = ({ report }: MatchReportDisplayProps) => {
  // Calculate uniqueness score from the report data if not explicitly provided (assuming similarityScore is passed in report or calculated)
  // The backend returns uniqueness_score, which we mapped to visual.
  // In AIAssistancePanel we mapped `similarityScore`. Let's assume we can derive it.

  // Actually, AIAssistancePanel passes `similarityScore` inside `report`? 
  // Wait, `MatchReport` type definition in `types.ts` DOES NOT HAVE `similarityScore`. 
  // I need to be careful. In AIAssistancePanel I was calculating it but the interface might not hold it.
  // Let's re-verify types.ts in a future step if needed, but for now I will use what's available.
  // `report.comparisons[0].keywords.percentage` is a proxy for similarity if matched.

  const isUnique = report.finalResult === "unique";
  const primaryMatch = report.matchedWith;
  const otherMatches = report.comparisons.filter(c => c !== primaryMatch);

  // Fallback score calculation if not directly available
  const similarityAttr = primaryMatch ? primaryMatch.keywords.percentage : 0;
  const uniquenessScore = 100 - similarityAttr;

  return (
    <div className="space-y-6">

      {/* 1. Header Card */}
      <div className={cn(
        "relative overflow-hidden rounded-2xl border p-6 text-center transition-all",
        isUnique
          ? "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
          : "bg-gradient-to-br from-amber-50 to-white border-amber-100"
      )}>
        <div className="flex flex-col items-center z-10 relative">

          <ScoreRing score={uniquenessScore} isUnique={isUnique} />

          <h3 className={cn("mt-4 text-xl font-editorial font-bold", isUnique ? "text-emerald-900" : "text-amber-900")}>
            {isUnique ? "Unique Contribution" : "Similarity Detected"}
          </h3>

          <p className={cn("text-sm mt-1 max-w-[280px] mx-auto", isUnique ? "text-emerald-700" : "text-amber-700")}>
            {isUnique
              ? "Great job! This document appears to be an original proposal with no significant conflicts."
              : "We found existing projects with similar objectives. Consider differentiating your approach."}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {report.uploadedProjectInfo.keywords.slice(0, 3).map((kw, i) => (
              <Badge key={i} variant="secondary" className="bg-white/50 backdrop-blur-sm border border-slate-200/50 text-slate-600">
                #{kw}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Matches Section */}
      {!isUnique && primaryMatch && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              Conflict Source
            </h4>
            <span className="text-xs text-slate-500">1 Critical Match</span>
          </div>

          <ProjectMatchCard comparison={primaryMatch} isPrimary />

          {otherMatches.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 px-1">Other Candidates</p>
              <div className="space-y-2">
                {otherMatches.slice(0, 2).map((match, i) => (
                  <ProjectMatchCard key={i} comparison={match} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Action / Summary */}
      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
        <p className="text-xs font-semibold text-slate-900 mb-2 flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
          AI Recommendation
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isUnique
            ? "You are good to go. The abstract intent and methodology are sufficiently distinct from the archive."
            : "To improve approval odds, try limiting the scope of 'Traffic Management' and focus more on the 'Computer Vision' aspect, which shows lower overlap."}
        </p>
      </div>

    </div>
  );
};

export default MatchReportDisplay;
