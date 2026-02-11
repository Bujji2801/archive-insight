from typing import List, Dict
import re
from collections import Counter
# We will use scikit-learn for basic similarity if needed, 
# but for now let's implement the core logic for keywords & intent.

def calculate_keyword_density(text: str, top_n: int = 10) -> List[Dict[str, int]]:
    """
    Extracts top keywords and their frequency from the text.
    Ignores common stop words.
    """
    # Quick stop words list (expand as needed or use nltk/spacy)
    stop_words = set([
        "the", "and", "a", "an", "of", "to", "in", "is", "for", "on", "with", "as", "by", 
        "at", "from", "it", "that", "this", "be", "was", "are", "or", "which", "project", 
        "system", "using", "based", "proposed", "paper", "implementation", "design", "development"
    ])
    
    # Normalize text
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    filtered_words = [w for w in words if w not in stop_words]
    
    # Count frequency
    counts = Counter(filtered_words)
    most_common = counts.most_common(top_n)
    
    return [{"text": word, "value": count} for word, count in most_common]

def determine_intent(text: str) -> str:
    """
    Heuristic-based intent classification for academic projects.
    """
    text_lower = text.lower()
    
    if any(k in text_lower for k in ["dataset", "survey", "review", "analysis", "study", "comparison"]):
        return "Research & Analysis"
    elif any(k in text_lower for k in ["implementation", "application", "tool", "system", "platform", "software"]):
        return "Software Development"
    elif any(k in text_lower for k in ["model", "algorithm", "neural network", "machine learning", "deep learning"]):
        return "AI/ML Modeling"
    elif any(k in text_lower for k in ["architecture", "framework", "schema", "design"]):
        return "System Design"
    
    return "General Implementation"

import math

def calculate_similarity(text1: str, text2: str) -> float:
    """
    Calculates Cosine Similarity between two texts using Bag-of-Words.
    """
    # Tokenize and filter
    stop_words = set([
        "the", "and", "a", "an", "of", "to", "in", "is", "for", "on", "with", "as", "by", 
        "at", "from", "it", "that", "this", "be", "was", "are", "or", "which", "project", 
        "system", "using", "based", "proposed", "paper", "implementation", "design", "development"
    ])
    
    def tokenize(text):
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        return [w for w in words if w not in stop_words]

    tokens1 = tokenize(text1)
    tokens2 = tokenize(text2)
    
    if not tokens1 or not tokens2:
        return 0.0

    vec1 = Counter(tokens1)
    vec2 = Counter(tokens2)
    
    intersection = set(vec1.keys()) & set(vec2.keys())
    
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    
    denominator = math.sqrt(sum1) * math.sqrt(sum2)
    
    if not denominator:
        return 0.0
        
    return float(numerator) / denominator
