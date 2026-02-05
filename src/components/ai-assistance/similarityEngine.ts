import { projects, Project } from "@/data/projects";
import { 
  ExtractedDocumentInfo, 
  ComparisonResult, 
  MatchReport,
  SectionComparison,
  KeywordComparison
} from "./types";

// Technology name normalization map
const techNormalization: Record<string, string> = {
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
};

function normalizeTechnology(tech: string): string {
  const lower = tech.toLowerCase().trim();
  return techNormalization[lower] || lower;
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
  
  // Check if at least 60% of technologies overlap
  const matchingTechs = normalizedUploaded.filter(tech => 
    normalizedDb.some(dbTech => 
      dbTech.includes(tech) || tech.includes(dbTech) || dbTech === tech
    )
  );
  
  const overlapPercentage = (matchingTechs.length / normalizedUploaded.length) * 100;
  const matched = overlapPercentage >= 60;
  
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
    : { matched: false, comparison: { status: "different" as const, yourContent: "Skipped", matchedContent: "Skipped" } };
  
  // Step 3: Methodology Check (Hard Stop - only if abstract passed)
  const methodologyResult = (techResult.matched && abstractResult.matched)
    ? compareMethodology(uploaded.methodology, dbProject.approach)
    : { matched: false, comparison: { status: "different" as const, yourContent: "Skipped", matchedContent: "Skipped" } };
  
  // Step 4: Keyword Check (Supporting)
  const keywordResult = compareKeywords(uploaded.keywords, dbProject.keywords);
  const passedKeywordCheck = keywordResult.percentage >= 70;
  
  // Step 5: Title Check (Low weight)
  const titleResult = compareTitle(uploaded.title, dbProject.title);
  
  // Final decision: ALL mandatory conditions must be met
  const isFullMatch = 
    techResult.matched && 
    abstractResult.matched && 
    methodologyResult.matched && 
    passedKeywordCheck;
  
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
    passedMethodologyCheck: methodologyResult.matched,
    passedKeywordCheck,
    isFullMatch
  };
}

// Simulate document extraction from filename (demo purposes)
export function extractDocumentInfo(filename: string): ExtractedDocumentInfo {
  const name = filename.toLowerCase().replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  
  // Define project templates based on keywords in filename
  const projectTemplates: { keywords: string[]; info: Partial<ExtractedDocumentInfo> }[] = [
    {
      keywords: ["traffic", "smart", "deep", "learning", "cnn", "vehicle", "detection"],
      info: {
        title: "Traffic Management Using Deep Learning",
        technologies: ["Python", "TensorFlow", "OpenCV", "CNN", "Deep Learning"],
        problemStatement: "Urban traffic congestion leads to economic losses and pollution",
        objective: "Develop intelligent traffic management using deep learning for real-time analysis",
        approach: "CNN-based vehicle detection with real-time processing",
        expectedOutcome: "30% reduction in wait times and improved traffic flow",
        methodology: "Convolutional neural networks for vehicle detection and traffic optimization",
        keywords: ["traffic", "deep learning", "CNN", "vehicle detection", "optimization", "real-time"]
      }
    },
    {
      keywords: ["blockchain", "credential", "verification", "academic", "certificate"],
      info: {
        title: "Blockchain Academic Credential System",
        technologies: ["Solidity", "Ethereum", "React", "Blockchain", "Smart Contracts"],
        problemStatement: "Academic credential fraud is a growing problem worldwide",
        objective: "Create tamper-proof decentralized credential verification system",
        approach: "Smart contracts store cryptographic hashes of credentials",
        expectedOutcome: "Instant verification and elimination of forgery",
        methodology: "Blockchain-based storage with smart contract verification",
        keywords: ["blockchain", "credentials", "verification", "smart contracts", "Ethereum"]
      }
    },
    {
      keywords: ["mental", "health", "nlp", "chatbot", "sentiment"],
      info: {
        title: "NLP Mental Health Support Chatbot",
        technologies: ["Python", "BERT", "NLP", "FastAPI", "Sentiment Analysis"],
        problemStatement: "Mental health services are overwhelmed with long wait times",
        objective: "Develop NLP chatbot for 24/7 mental health support",
        approach: "BERT models analyze messages for emotional content and distress",
        expectedOutcome: "Improved accessibility to mental health support",
        methodology: "Natural language processing with sentiment analysis and empathetic response generation",
        keywords: ["NLP", "mental health", "chatbot", "BERT", "sentiment analysis"]
      }
    },
    {
      keywords: ["iot", "agriculture", "sensor", "farm", "precision"],
      info: {
        title: "IoT Precision Agriculture System",
        technologies: ["Arduino", "Raspberry Pi", "Python", "AWS IoT", "Sensors"],
        problemStatement: "Traditional farming leads to inefficient resource usage",
        objective: "Implement IoT monitoring for data-driven crop management",
        approach: "Distributed sensor nodes collect soil and weather data",
        expectedOutcome: "20% reduction in water usage and improved yields",
        methodology: "IoT sensor network with edge computing and cloud analytics",
        keywords: ["IoT", "agriculture", "sensors", "monitoring", "precision farming"]
      }
    }
  ];
  
  // Find matching template based on filename keywords
  for (const template of projectTemplates) {
    const matchCount = template.keywords.filter(k => name.includes(k)).length;
    if (matchCount >= 2) {
      return template.info as ExtractedDocumentInfo;
    }
  }
  
  // Default: completely new/unique project
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
      `• Technologies: ${matchedProject.passedTechCheck ? "✓ Matched" : "✗ Different"}\n` +
      `• Abstract Intent: ${matchedProject.passedAbstractCheck ? "✓ Matched" : "✗ Different"}\n` +
      `• Methodology: ${matchedProject.passedMethodologyCheck ? "✓ Matched" : "✗ Different"}\n` +
      `• Keywords: ${matchedProject.keywords.percentage}% overlap ${matchedProject.passedKeywordCheck ? "✓" : "✗"}\n\n` +
      `All mandatory conditions are met. This project cannot be registered as it closely matches an existing submission.`;
  } else {
    const closestMatch = comparisons.reduce((prev, curr) => {
      const prevScore = (prev.passedTechCheck ? 1 : 0) + (prev.passedAbstractCheck ? 1 : 0) + (prev.passedMethodologyCheck ? 1 : 0);
      const currScore = (curr.passedTechCheck ? 1 : 0) + (curr.passedAbstractCheck ? 1 : 0) + (curr.passedMethodologyCheck ? 1 : 0);
      return currScore > prevScore ? curr : prev;
    });
    
    explanation = `Your project is UNIQUE and does not match any existing submissions.\n\n` +
      `Closest comparison was with "${closestMatch.projectTitle}":\n` +
      `• Technologies: ${closestMatch.passedTechCheck ? "Matched" : "Different"}\n` +
      `• Abstract Intent: ${closestMatch.passedAbstractCheck ? "Matched" : "Different"}\n` +
      `• Methodology: ${closestMatch.passedMethodologyCheck ? "Matched" : "Different"}\n` +
      `• Keywords: ${closestMatch.keywords.percentage}% overlap\n\n` +
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
