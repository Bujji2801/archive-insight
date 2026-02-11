from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from services.extractor import extract_text_from_file
from services.analyzer import calculate_keyword_density, determine_intent, calculate_similarity
from services.supabase_client import get_supabase_client

# Load environment variables
load_dotenv()

app = FastAPI(title="Archive Insight Backend", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Archive Insight Analysis Engine is running"}

@app.post("/analyze")
async def analyze_document(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx', '.doc')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX are supported.")
    
    # 1. Extract Text
    text = await extract_text_from_file(file)
    if not text:
        raise HTTPException(status_code=400, detail="Could not extract text from file.")
        
    # 2. Analyze Content
    keywords = calculate_keyword_density(text)
    intent = determine_intent(text)
    
    # 3. Fetch Existing Projects from Supabase
    try:
        supabase = get_supabase_client()
        response = supabase.table("projects").select("id, title, description, tech_stack").execute()
        existing_projects = response.data
    except Exception as e:
        print(f"Error fetching projects: {e}")
        existing_projects = []
        
    # 4. Calculate Similarity
    similar_projects = []
    max_similarity = 0.0
    
    for project in existing_projects:
        # Simple comparison using description + title against extracted text
        # In a real app, use vector embeddings (pgvector)
        project_text = f"{project['title']} {project['description']}"
        score = calculate_similarity(text, project_text)
        
        if score > 0.1: # Threshold for "similarity"
            similar_projects.append({
                "id": project['id'],
                "title": project['title'],
                "similarity": score
            })
            if score > max_similarity:
                max_similarity = score
                
    # Sort by similarity
    similar_projects.sort(key=lambda x: x['similarity'], reverse=True)
    
    # 5. Determine Result Status
    uniqueness_score = int((1.0 - max_similarity) * 100)
    status = "unique" if uniqueness_score > 70 else "exists"
    
    return {
        "filename": file.filename,
        "status": status,
        "uniqueness_score": uniqueness_score,
        "intent": intent,
        "keywords": [k['text'] for k in keywords[:5]],
        "similar_projects": similar_projects[:3]
    }
