export interface SectionComparison {
  status: "matched" | "different" | "semantically similar";
  yourContent: string;
  matchedContent: string;
}

export interface KeywordComparison {
  percentage: number;
  yourKeywords: string[];
  matchedKeywords: string[];
  overlappingKeywords: string[];
}

export interface ComparisonResult {
  projectId: string;
  projectTitle: string;
  userId: string;
  technology: SectionComparison;
  abstractIntent: SectionComparison;
  methodology: SectionComparison;
  keywords: KeywordComparison;
  title: SectionComparison;
  passedTechCheck: boolean;
  passedAbstractCheck: boolean;
  passedMethodologyCheck: boolean;
  passedKeywordCheck: boolean;
  isFullMatch: boolean;
}

export interface MatchReport {
  uploadedProjectInfo: {
    title: string;
    technologies: string[];
    abstract: string;
    methodology: string;
    keywords: string[];
  };
  comparisons: ComparisonResult[];
  finalResult: "unique" | "exists";
  matchedWith: ComparisonResult | null;
  explanation: string;
}

// Simulated extracted document info (in real app, this would come from document parsing)
export interface ExtractedDocumentInfo {
  title: string;
  technologies: string[];
  problemStatement: string;
  objective: string;
  approach: string;
  expectedOutcome: string;
  methodology: string;
  keywords: string[];
}
