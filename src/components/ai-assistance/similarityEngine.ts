import { projects, Project } from "@/data/projects";
import { 
  ExtractedDocumentInfo, 
  ComparisonResult, 
  MatchReport,
  SectionComparison,
  KeywordComparison
} from "./types";
import { parseDocumentContent, simulateDocumentParsing } from "./documentParser";

// Technology name normalization map - extended for better matching
const techNormalization: Record<string, string> = {
  // Abbreviations
  "dl": "deep learning",
  "ml": "machine learning",
  "ai": "artificial intelligence",
  "cv": "computer vision",
  "nlp": "natural language processing",
  "cnn": "convolutional neural network",
  "rnn": "recurrent neural network",
  "lstm": "long short-term memory",
  "gan": "generative adversarial network",
  "js": "javascript",
  "ts": "typescript",
  "py": "python",
  "tf": "tensorflow",
  "k8s": "kubernetes",
  "aws": "amazon web services",
  "gcp": "google cloud platform",
  "iot": "internet of things",
  "ar": "augmented reality",
  "vr": "virtual reality",
  // Full names to lowercase versions
  "tensorflow": "tensorflow",
  "pytorch": "pytorch",
  "opencv": "opencv",
  "open cv": "opencv",
  "yolo": "yolo",
  "postgresql": "postgresql",
  "postgres": "postgresql",
  "flask": "flask",
  "react": "react",
  "node.js": "nodejs",
  "nodejs": "nodejs",
  "python": "python",
  "deep learning": "deep learning",
  "machine learning": "machine learning",
  "convolutional neural network": "cnn",
  "computer vision": "computer vision",
};

function normalizeTechnology(tech: string): string {
  const lower = tech.toLowerCase().trim();
  // First check exact match in normalization map
  if (techNormalization[lower]) {
    return techNormalization[lower];
  }
  // Return lowercase version
  return lower;
}

function normalizeKeyword(keyword: string): string {
  return keyword.toLowerCase().trim().replace(/s$/, ''); // singular form
}

// STEP 1: Technology Check
function compareTechnologies(
  uploadedTechs: string[],
  dbTechs: string[]
): { matched: boolean; comparison: SectionComparison } {
  const normalizedUploaded = uploadedTechs.map(normalizeTechnology);
  const normalizedDb = dbTechs.map(normalizeTechnology);
  
  console.log("[TechCheck] Uploaded technologies:", uploadedTechs);
  console.log("[TechCheck] Normalized uploaded:", normalizedUploaded);
  console.log("[TechCheck] DB technologies:", dbTechs);
  console.log("[TechCheck] Normalized DB:", normalizedDb);
  
  // Check if at least 60% of uploaded technologies are found in DB
  const matchingTechs: string[] = [];
  
  for (const uploadedTech of normalizedUploaded) {
    const found = normalizedDb.some(dbTech => {
      // Check for exact match, substring match, or semantic equivalence
      const isMatch = dbTech === uploadedTech || 
        dbTech.includes(uploadedTech) || 
        uploadedTech.includes(dbTech) ||
        // Handle special cases
        (uploadedTech === "deep learning" && (dbTech.includes("tensorflow") || dbTech.includes("pytorch") || dbTech.includes("cnn"))) ||
        (uploadedTech === "cnn" && dbTech.includes("deep learning")) ||
        (uploadedTech === "computer vision" && dbTech.includes("opencv"));
      
      if (isMatch) {
        console.log(`[TechCheck] ✓ Match: "${uploadedTech}" matches "${dbTech}"`);
      }
      return isMatch;
    });
    
    if (found) {
      matchingTechs.push(uploadedTech);
    } else {
      console.log(`[TechCheck] ✗ No match for: "${uploadedTech}"`);
    }
  }
  
  const overlapPercentage = (matchingTechs.length / normalizedUploaded.length) * 100;
  const matched = overlapPercentage >= 60;
  
  console.log(`[TechCheck] Result: ${matchingTechs.length}/${normalizedUploaded.length} = ${overlapPercentage.toFixed(1)}% (threshold: 60%)`);
  console.log(`[TechCheck] Status: ${matched ? "MATCHED" : "DIFFERENT"}`);
  
  return {
    matched,
    comparison: {
      status: matched ? "matched" : "different",
      yourContent: uploadedTechs.join(", "),
      matchedContent: dbTechs.join(", ")
    }
  };
}

// STEP 2: Abstract Intent Check
function compareAbstractIntent(
  uploaded: { problemStatement: string; objective: string; approach: string; expectedOutcome: string },
  db: Project
): { matched: boolean; comparison: SectionComparison } {
  // Combine abstract components for semantic comparison
  const uploadedAbstract = `${uploaded.problemStatement} ${uploaded.objective} ${uploaded.approach} ${uploaded.expectedOutcome}`.toLowerCase();
  const dbAbstract = `${db.problemStatement} ${db.objective} ${db.approach} ${db.expectedOutcome}`.toLowerCase();
  
  // Extract key concepts (remove stop words and get meaningful terms)
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'and', 'but', 'or', 'nor', 'so', 'yet', 'both', 'either', 'neither', 'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'that', 'this', 'these', 'those', 'such', 'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how']);
  
  const extractConcepts = (text: string): Set<string> => {
    const words = text.match(/\b[a-z]{3,}\b/g) || [];
    return new Set(words.filter(w => !stopWords.has(w)));
  };
  
  const uploadedConcepts = extractConcepts(uploadedAbstract);
  const dbConcepts = extractConcepts(dbAbstract);
  
  // Calculate concept overlap
  const intersection = new Set([...uploadedConcepts].filter(x => dbConcepts.has(x)));
  const overlapPercentage = (intersection.size / uploadedConcepts.size) * 100;
  
  const matched = overlapPercentage >= 50;
  
  return {
    matched,
    comparison: {
      status: matched ? "matched" : "different",
      yourContent: `Problem: ${uploaded.problemStatement.substring(0, 100)}... | Objective: ${uploaded.objective.substring(0, 100)}...`,
      matchedContent: `Problem: ${db.problemStatement.substring(0, 100)}... | Objective: ${db.objective.substring(0, 100)}...`
    }
  };
}

// STEP 3: Methodology Check
function compareMethodology(
  uploadedMethodology: string,
  dbApproach: string
): { matched: boolean; comparison: SectionComparison } {
  const uploadedLower = uploadedMethodology.toLowerCase();
  const dbLower = dbApproach.toLowerCase();
  
  // Extract methodology-specific terms
  const methodologyTerms = ['neural network', 'cnn', 'deep learning', 'machine learning', 'detection', 'classification', 'training', 'model', 'algorithm', 'analysis', 'processing', 'optimization', 'framework', 'architecture', 'pipeline', 'workflow', 'implementation', 'validation', 'testing'];
  
  const getMethodologyTerms = (text: string): string[] => {
    return methodologyTerms.filter(term => text.includes(term));
  };
  
  const uploadedTerms = getMethodologyTerms(uploadedLower);
  const dbTerms = getMethodologyTerms(dbLower);
  
  const matchingTerms = uploadedTerms.filter(t => dbTerms.includes(t));
  const overlapPercentage = uploadedTerms.length > 0 
    ? (matchingTerms.length / uploadedTerms.length) * 100 
    : 0;
  
  const matched = overlapPercentage >= 50;
  
  return {
    matched,
    comparison: {
      status: matched ? "matched" : "different",
      yourContent: uploadedMethodology.substring(0, 150) + "...",
      matchedContent: dbApproach.substring(0, 150) + "..."
    }
  };
}

// STEP 4: Keyword Check
function compareKeywords(
  uploadedKeywords: string[],
  dbKeywords: string[]
): KeywordComparison {
  const normalizedUploaded = uploadedKeywords.map(normalizeKeyword);
  const normalizedDb = dbKeywords.map(normalizeKeyword);
  
  const overlapping = normalizedUploaded.filter(k => 
    normalizedDb.some(dbK => dbK.includes(k) || k.includes(dbK) || dbK === k)
  );
  
  const percentage = Math.round((overlapping.length / normalizedUploaded.length) * 100);
  
  return {
    percentage,
    yourKeywords: uploadedKeywords,
    matchedKeywords: dbKeywords,
    overlappingKeywords: overlapping
  };
}

// STEP 5: Title Check
function compareTitle(
  uploadedTitle: string,
  dbTitle: string
): SectionComparison {
  const uploadedLower = uploadedTitle.toLowerCase();
  const dbLower = dbTitle.toLowerCase();
  
  // Extract meaningful words from titles
  const stopWords = new Set(['the', 'a', 'an', 'for', 'of', 'in', 'on', 'with', 'using', 'based', 'and', 'to']);
  const extractWords = (title: string): string[] => {
    return title.match(/\b[a-z]{3,}\b/g)?.filter(w => !stopWords.has(w)) || [];
  };
  
  const uploadedWords = extractWords(uploadedLower);
  const dbWords = extractWords(dbLower);
  
  const matchingWords = uploadedWords.filter(w => dbWords.includes(w));
  const overlapPercentage = (matchingWords.length / uploadedWords.length) * 100;
  
  let status: "matched" | "semantically similar" | "different";
  if (overlapPercentage >= 70) {
    status = "matched";
  } else if (overlapPercentage >= 40) {
    status = "semantically similar";
  } else {
    status = "different";
  }
  
  return {
    status,
    yourContent: uploadedTitle,
    matchedContent: dbTitle
  };
}

// Main comparison function
function compareWithProject(
  uploaded: ExtractedDocumentInfo,
  dbProject: Project
): ComparisonResult {
  // Step 1: Technology Check (Hard Stop)
  const techResult = compareTechnologies(uploaded.technologies, dbProject.technologies);
  
  // Step 2: Abstract Intent Check (Hard Stop - only if tech passed)
  const abstractResult = techResult.matched 
    ? compareAbstractIntent(
        {
          problemStatement: uploaded.problemStatement,
          objective: uploaded.objective,
          approach: uploaded.approach,
          expectedOutcome: uploaded.expectedOutcome
        },
        dbProject
      )
    : { matched: false, comparison: { status: "different" as const, yourContent: "Skipped - Technology check failed", matchedContent: "Skipped" } };
  
  // Step 3: Keyword Check (Supporting - not a hard stop)
  const keywordResult = compareKeywords(uploaded.keywords, dbProject.keywords);
  
  // Step 4: Title Check (Low weight - supporting only)
  const titleResult = compareTitle(uploaded.title, dbProject.title);
  
  // Methodology comparison for display purposes only (not a deciding factor)
  const methodologyResult = compareMethodology(uploaded.methodology, dbProject.approach);
  
  // FINAL DECISION: Only Technology + Abstract Intent are mandatory
  // A project is "EXISTS" ONLY if BOTH conditions are met
  const isFullMatch = techResult.matched && abstractResult.matched;
  
  return {
    projectId: dbProject.id,
    projectTitle: dbProject.title,
    userId: dbProject.userId,
    technology: techResult.comparison,
    abstractIntent: abstractResult.comparison,
    methodology: methodologyResult.comparison,
    keywords: keywordResult,
    title: titleResult,
    passedTechCheck: techResult.matched,
    passedAbstractCheck: abstractResult.matched,
    passedMethodologyCheck: methodologyResult.matched, // For display only
    passedKeywordCheck: keywordResult.percentage >= 70, // For display only
    isFullMatch
  };
}

// Extract document info using the document parser
export function extractDocumentInfo(filename: string): ExtractedDocumentInfo {
  console.log("[SimilarityEngine] Extracting document info from:", filename);
  
  // Simulate document parsing (in production, this would read actual file content)
  const { text, success } = simulateDocumentParsing(filename);
  
  if (!success) {
    console.error("[SimilarityEngine] Failed to parse document");
    // Return default unique project
    return {
      title: filename.replace(/\.[^/.]+$/, ""),
      technologies: ["React", "Node.js", "MongoDB"],
      problemStatement: "A novel problem statement not found in existing projects",
      objective: "To achieve a unique objective through innovative methods",
      approach: "A completely new approach not seen in existing submissions",
      expectedOutcome: "Novel outcomes that differ from existing work",
      methodology: "Unique methodology involving new techniques and frameworks",
      keywords: ["innovation", "novel", "unique", "new approach"]
    };
  }
  
  // Parse the document content
  const extractedInfo = parseDocumentContent(text, filename);
  
  console.log("[SimilarityEngine] Extracted info:", {
    title: extractedInfo.title,
    technologies: extractedInfo.technologies,
    keywordCount: extractedInfo.keywords.length
  });
  
  return extractedInfo;
}

// Main analysis function
export function analyzeDocument(filename: string): MatchReport {
  const uploadedInfo = extractDocumentInfo(filename);
  
  // Compare with each project in database
  const comparisons: ComparisonResult[] = projects.map(project => 
    compareWithProject(uploadedInfo, project)
  );
  
  // Find if any project is a full match
  const matchedProject = comparisons.find(c => c.isFullMatch);
  
  // Generate explanation
  let explanation: string;
  if (matchedProject) {
    explanation = `Your project matches an existing submission "${matchedProject.projectTitle}" (${matchedProject.projectId}).\n\n` +
      `MANDATORY CONDITIONS (both must match):\n` +
      `• Technologies: ${matchedProject.passedTechCheck ? "✓ MATCHED" : "✗ Different"}\n` +
      `• Abstract Intent: ${matchedProject.passedAbstractCheck ? "✓ MATCHED" : "✗ Different"}\n\n` +
      `SUPPORTING CHECKS:\n` +
      `• Keywords: ${matchedProject.keywords.percentage}% overlap\n` +
      `• Title: ${matchedProject.title.status}\n\n` +
      `Both mandatory conditions are met. This project cannot be registered as it closely matches an existing submission.`;
  } else {
    const closestMatch = comparisons.reduce((prev, curr) => {
      const prevScore = (prev.passedTechCheck ? 1 : 0) + (prev.passedAbstractCheck ? 1 : 0);
      const currScore = (curr.passedTechCheck ? 1 : 0) + (curr.passedAbstractCheck ? 1 : 0);
      return currScore > prevScore ? curr : prev;
    });
    
    explanation = `Your project is UNIQUE and does not match any existing submissions.\n\n` +
      `Closest comparison was with "${closestMatch.projectTitle}":\n` +
      `MANDATORY CONDITIONS:\n` +
      `• Technologies: ${closestMatch.passedTechCheck ? "Matched" : "✗ DIFFERENT (Hard Stop)"}\n` +
      `• Abstract Intent: ${closestMatch.passedAbstractCheck ? "Matched" : "✗ DIFFERENT (Hard Stop)"}\n\n` +
      `At least one mandatory condition failed, confirming this is a unique project.`;
  }
  
  return {
    uploadedProjectInfo: {
      title: uploadedInfo.title,
      technologies: uploadedInfo.technologies,
      abstract: `${uploadedInfo.problemStatement} ${uploadedInfo.objective}`,
      methodology: uploadedInfo.methodology,
      keywords: uploadedInfo.keywords
    },
    comparisons,
    finalResult: matchedProject ? "exists" : "unique",
    matchedWith: matchedProject || null,
    explanation
  };
}
