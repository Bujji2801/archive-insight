/**
 * Document Content Parser
 * 
 * Extracts structured information from document text content.
 * This module provides utilities for parsing technologies, keywords,
 * and other structured data from uploaded document text.
 */

import { ExtractedDocumentInfo } from "./types";

// Common technology patterns with variations
const TECHNOLOGY_PATTERNS: { pattern: RegExp; normalized: string }[] = [
  // Deep Learning / ML frameworks
  { pattern: /\b(tensorflow|tensor\s*flow)\b/gi, normalized: "TensorFlow" },
  { pattern: /\b(pytorch|py\s*torch)\b/gi, normalized: "PyTorch" },
  { pattern: /\bkeras\b/gi, normalized: "Keras" },
  { pattern: /\b(scikit[- ]learn|sklearn)\b/gi, normalized: "scikit-learn" },

  // Programming languages
  { pattern: /\bpython\b/gi, normalized: "Python" },
  { pattern: /\b(javascript|js)\b/gi, normalized: "JavaScript" },
  { pattern: /\b(typescript|ts)\b/gi, normalized: "TypeScript" },
  { pattern: /\bjava\b(?!\s*script)/gi, normalized: "Java" },
  { pattern: /\b(c\+\+|cpp)\b/gi, normalized: "C++" },
  { pattern: /\brust\b/gi, normalized: "Rust" },
  { pattern: /\bsolidity\b/gi, normalized: "Solidity" },

  // Frameworks
  { pattern: /\breact\b/gi, normalized: "React" },
  { pattern: /\bangular\b/gi, normalized: "Angular" },
  { pattern: /\bvue(\.js)?\b/gi, normalized: "Vue.js" },
  { pattern: /\bflask\b/gi, normalized: "Flask" },
  { pattern: /\bdjango\b/gi, normalized: "Django" },
  { pattern: /\bfast\s*api\b/gi, normalized: "FastAPI" },
  { pattern: /\bnode(\.js)?\b/gi, normalized: "Node.js" },
  { pattern: /\bspring\s*boot\b/gi, normalized: "Spring Boot" },

  // Computer Vision
  { pattern: /\b(opencv|open\s*cv)\b/gi, normalized: "OpenCV" },
  { pattern: /\byolo\b/gi, normalized: "YOLO" },

  // Databases
  { pattern: /\b(postgresql|postgres)\b/gi, normalized: "PostgreSQL" },
  { pattern: /\bmongodb\b/gi, normalized: "MongoDB" },
  { pattern: /\bmysql\b/gi, normalized: "MySQL" },
  { pattern: /\bredis\b/gi, normalized: "Redis" },
  { pattern: /\binfluxdb\b/gi, normalized: "InfluxDB" },

  // Cloud/DevOps
  { pattern: /\b(kubernetes|k8s)\b/gi, normalized: "Kubernetes" },
  { pattern: /\bdocker\b/gi, normalized: "Docker" },
  { pattern: /\baws\b/gi, normalized: "AWS" },
  { pattern: /\baws\s*iot\b/gi, normalized: "AWS IoT" },
  { pattern: /\bazure\b/gi, normalized: "Azure" },
  { pattern: /\bgcp\b/gi, normalized: "Google Cloud Platform" },

  // Blockchain
  { pattern: /\bethereum\b/gi, normalized: "Ethereum" },
  { pattern: /\bweb3(\.js)?\b/gi, normalized: "Web3.js" },
  { pattern: /\bipfs\b/gi, normalized: "IPFS" },
  { pattern: /\bsmart\s*contracts?\b/gi, normalized: "Smart Contracts" },

  // Hardware/IoT
  { pattern: /\barduino\b/gi, normalized: "Arduino" },
  { pattern: /\braspberry\s*pi\b/gi, normalized: "Raspberry Pi" },

  // AI/ML Concepts (also treated as technologies)
  { pattern: /\b(cnn|convolutional\s*neural\s*network)\b/gi, normalized: "CNN" },
  { pattern: /\b(rnn|recurrent\s*neural\s*network)\b/gi, normalized: "RNN" },
  { pattern: /\blstm\b/gi, normalized: "LSTM" },
  { pattern: /\bbert\b/gi, normalized: "BERT" },
  { pattern: /\b(gan|generative\s*adversarial\s*network)\b/gi, normalized: "GAN" },
  { pattern: /\bdeep\s*learning\b/gi, normalized: "Deep Learning" },
  { pattern: /\bmachine\s*learning\b/gi, normalized: "Machine Learning" },
  { pattern: /\b(nlp|natural\s*language\s*processing)\b/gi, normalized: "NLP" },
  { pattern: /\bcomputer\s*vision\b/gi, normalized: "Computer Vision" },
  { pattern: /\b(ar|augmented\s*reality)\b/gi, normalized: "Augmented Reality" },
  { pattern: /\b(vr|virtual\s*reality)\b/gi, normalized: "Virtual Reality" },
  { pattern: /\bfederated\s*learning\b/gi, normalized: "Federated Learning" },

  // Other
  { pattern: /\bunity\b/gi, normalized: "Unity" },
  { pattern: /\b(arcore|ar\s*core)\b/gi, normalized: "ARCore" },
  { pattern: /\bfirebase\b/gi, normalized: "Firebase" },
  { pattern: /\bgrpc\b/gi, normalized: "gRPC" },
  { pattern: /\bkafka\b/gi, normalized: "Apache Kafka" },
  { pattern: /\bros\b/gi, normalized: "ROS" },
];

// Section header patterns to identify document structure
const SECTION_PATTERNS = {
  title: /^(?:title|project\s*title|name)\s*[:—]?\s*(.+)/im,
  problemStatement: /(?:problem\s*statement|problem|issue|challenge)\s*[:—]?\s*([\s\S]*?)(?=(?:objective|approach|methodology|expected|conclusion|$))/im,
  objective: /(?:objective|aim|goal|purpose)\s*[:—]?\s*([\s\S]*?)(?=(?:approach|methodology|problem|expected|conclusion|$))/im,
  approach: /(?:approach|methodology|method|proposed\s*(?:solution|system|method))\s*[:—]?\s*([\s\S]*?)(?=(?:objective|problem|expected|conclusion|result|$))/im,
  expectedOutcome: /(?:expected\s*(?:outcome|result)|outcome|result|expected)\s*[:—]?\s*([\s\S]*?)(?=(?:objective|problem|approach|conclusion|$))/im,
  conclusion: /(?:conclusion|summary|future\s*work)\s*[:—]?\s*([\s\S]*?)$/im,
  keywords: /(?:keywords?|tags?|key\s*terms?)\s*[:—]?\s*(.+)/im,
  technologies: /(?:technologies?\s*used|tech\s*stack|tools?\s*(?:and\s*technologies?)?|software\s*used)\s*[:—]?\s*(.+)/im,
};

/**
 * Extract technologies from document text content
 */
export function extractTechnologies(text: string): string[] {
  const foundTechnologies = new Set<string>();

  for (const { pattern, normalized } of TECHNOLOGY_PATTERNS) {
    if (pattern.test(text)) {
      foundTechnologies.add(normalized);
    }
  }

  // Also check for explicitly listed technologies section
  const techMatch = text.match(SECTION_PATTERNS.technologies);
  if (techMatch) {
    const techList = techMatch[1].split(/[,;|•\n]+/).map(t => t.trim()).filter(Boolean);
    for (const tech of techList) {
      // Try to match each listed tech against our patterns
      for (const { pattern, normalized } of TECHNOLOGY_PATTERNS) {
        if (pattern.test(tech)) {
          foundTechnologies.add(normalized);
          break;
        }
      }
    }
  }

  return Array.from(foundTechnologies);
}

/**
 * Extract keywords from document text
 */
export function extractKeywords(text: string): string[] {
  const keywordMatch = text.match(SECTION_PATTERNS.keywords);
  if (keywordMatch) {
    return keywordMatch[1]
      .split(/[,;|•]+/)
      .map(k => k.trim().replace(/^["']|["']$/g, ''))
      .filter(k => k.length > 1 && k.length < 50);
  }

  // Fallback: extract common academic keywords from the text
  const commonKeywords = [
    "machine learning", "deep learning", "artificial intelligence", "neural network",
    "blockchain", "smart contract", "iot", "sensor", "cloud computing",
    "natural language processing", "computer vision", "classification",
    "detection", "prediction", "analysis", "optimization", "monitoring",
    "automation", "security", "privacy", "healthcare", "education",
    "agriculture", "manufacturing", "traffic", "management"
  ];

  const textLower = text.toLowerCase();
  return commonKeywords.filter(kw => textLower.includes(kw));
}

/**
 * Extract a specific section from document text
 */
function extractSection(text: string, pattern: RegExp): string {
  const match = text.match(pattern);
  if (match && match[1]) {
    // Clean up the extracted text
    return match[1]
      .trim()
      .replace(/\s+/g, ' ')
      .substring(0, 500); // Limit length
  }
  return "";
}

/**
 * Extract title from document
 */
export function extractTitle(text: string, filename: string): string {
  // Try to find explicit title
  const titleMatch = text.match(SECTION_PATTERNS.title);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim().substring(0, 200);
  }

  // Try first non-empty line as title
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    // If first line looks like a title (not too long, no special chars)
    if (firstLine.length < 150 && !/[:—]/.test(firstLine)) {
      return firstLine;
    }
  }

  // Fallback to filename
  return filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
}

/**
 * Parse full document content and extract structured information
 */
export function parseDocumentContent(text: string, filename: string): ExtractedDocumentInfo {
  const title = extractTitle(text, filename);
  const technologies = extractTechnologies(text);
  const keywords = extractKeywords(text);

  const problemStatement = extractSection(text, SECTION_PATTERNS.problemStatement) ||
    "Problem statement not found in document";
  const objective = extractSection(text, SECTION_PATTERNS.objective) ||
    "Objective not found in document";
  const approach = extractSection(text, SECTION_PATTERNS.approach) ||
    "Approach/methodology not found in document";
  const expectedOutcome = extractSection(text, SECTION_PATTERNS.expectedOutcome) ||
    "Expected outcome not found in document";

  console.log("[DocumentParser] Extracted content:", {
    title,
    technologies,
    keywords: keywords.slice(0, 5),
    hasProblemStatement: !!problemStatement,
    hasObjective: !!objective,
  });

  return {
    title,
    technologies,
    problemStatement,
    objective,
    approach,
    expectedOutcome,
    methodology: approach, // Methodology is same as approach
    keywords,
  };
}

/**
 * Simulate reading file content (for demo - in production would use real file parsing)
 * This function simulates what we would get from parsing a real PDF/DOCX
 */
export function simulateDocumentParsing(filename: string): { text: string; success: boolean } {
  const name = filename.toLowerCase();

  // Simulate content based on filename keywords (for demo)
  // In production, this would be actual file content from PDF/DOCX parsing

  if (name.includes("traffic") || name.includes("deep learning") || name.includes("smart")) {
    return {
      success: true,
      text: `
        Title: Smart Traffic Management System Using Deep Learning
        
        Technologies Used: Python, TensorFlow, OpenCV, Flask, CNN, Deep Learning, YOLO, PostgreSQL
        
        Keywords: traffic management, deep learning, computer vision, smart city, CNN, real-time analysis, vehicle detection
        
        Problem Statement:
        Urban traffic congestion leads to significant economic losses, increased pollution, and reduced quality of life. 
        Traditional traffic management systems rely on fixed timing patterns that cannot adapt to real-time traffic conditions.
        
        Objective:
        To develop an intelligent traffic management system that uses deep learning to analyze real-time traffic data 
        and optimize signal timing for improved traffic flow and reduced congestion.
        
        Approach:
        The system employs convolutional neural networks trained on traffic camera feeds to detect and count vehicles, 
        estimate traffic density, and predict traffic patterns. An adaptive algorithm adjusts signal timing based on 
        current and predicted traffic conditions.
        
        Expected Outcome:
        30% reduction in average wait times at intersections, 25% improvement in traffic throughput, and 20% reduction 
        in vehicle emissions due to reduced idling time.
      `
    };
  }

  if (name.includes("blockchain") || name.includes("credential") || name.includes("certificate")) {
    return {
      success: true,
      text: `
        Title: Blockchain-Based Academic Credential Verification
        
        Technologies Used: Solidity, Ethereum, React, Node.js, IPFS, Web3.js, Smart Contracts
        
        Keywords: blockchain, credentials, verification, smart contracts, Ethereum, education, decentralized
        
        Problem Statement:
        Academic credential fraud is a growing problem worldwide, with forged degrees and certificates undermining 
        trust in educational qualifications and causing significant economic and social harm.
        
        Objective:
        To create a tamper-proof, decentralized system for academic credential verification that eliminates fraud 
        and streamlines the verification process for employers and institutions.
        
        Approach:
        Smart contracts on the Ethereum blockchain store cryptographic hashes of academic credentials. 
        Educational institutions act as verified issuers, while employers and other verifiers can instantly 
        validate credentials without intermediaries.
        
        Expected Outcome:
        Near-instant credential verification, elimination of document forgery, reduced administrative overhead 
        for institutions, and increased trust in academic qualifications.
      `
    };
  }

  if (name.includes("nlp") || name.includes("mental") || name.includes("health") || name.includes("chatbot")) {
    return {
      success: true,
      text: `
        Title: Natural Language Processing for Mental Health Support
        
        Technologies Used: Python, BERT, FastAPI, React, NLP, PostgreSQL, Redis, Sentiment Analysis
        
        Keywords: NLP, mental health, chatbot, BERT, sentiment analysis, healthcare, natural language processing
        
        Problem Statement:
        Mental health services are overwhelmed globally, with long wait times and limited accessibility preventing 
        many individuals from receiving timely support during psychological distress.
        
        Objective:
        To develop an NLP-powered chatbot that can provide 24/7 preliminary mental health support, detect signs 
        of distress, and guide users to appropriate professional resources.
        
        Approach:
        Fine-tuned BERT models analyze user messages for emotional content and distress indicators. The system 
        generates empathetic responses using a combination of retrieval and generation techniques, while 
        maintaining appropriate boundaries and escalation protocols.
        
        Expected Outcome:
        Improved accessibility to mental health support, reduced barrier to seeking help, early detection of 
        mental health crises, and better triage for professional services.
      `
    };
  }

  if (name.includes("iot") || name.includes("agriculture") || name.includes("sensor") || name.includes("farm")) {
    return {
      success: true,
      text: `
        Title: IoT-Based Precision Agriculture Monitoring System
        
        Technologies Used: Arduino, Raspberry Pi, Python, AWS IoT, TensorFlow Lite, InfluxDB, Sensors
        
        Keywords: IoT, precision agriculture, sensors, sustainability, edge computing, monitoring, smart farming
        
        Problem Statement:
        Traditional farming methods often lead to inefficient resource usage, with over-irrigation, excessive 
        fertilizer application, and delayed response to pest infestations causing economic and environmental harm.
        
        Objective:
        To implement an IoT-based monitoring system that provides real-time data on agricultural conditions, 
        enabling data-driven decisions for optimal crop management.
        
        Approach:
        Distributed sensor nodes collect data on soil moisture, temperature, humidity, and nutrient levels. 
        Edge computing devices process local data while a cloud platform aggregates information for analysis 
        and predictive modeling.
        
        Expected Outcome:
        20% reduction in water usage, 15% decrease in fertilizer costs, early pest detection, and 25% 
        improvement in crop yield through optimized growing conditions.
      `
    };
  }

  // Default: unique project with different technologies
  return {
    success: true,
    text: `
      Title: ${filename.replace(/\.[^/.]+$/, '')}
      
      Technologies Used: React, Node.js, MongoDB, Express, TypeScript
      
      Keywords: web development, full stack, modern application
      
      Problem Statement:
      A unique problem that is not related to any existing projects in the database.
      
      Objective:
      To develop a novel solution using modern web technologies.
      
      Approach:
      Implementation of a new methodology not found in existing submissions.
      
      Expected Outcome:
      Unique outcomes that differ from existing work in the database.
    `
  };
}
