from fastapi import UploadFile
import io
import pypdf
import docx

async def extract_text_from_file(file: UploadFile) -> str:
    """
    Extracts text from an uploaded PDF or DOCX file.
    """
    content = await file.read()
    file_stream = io.BytesIO(content)
    text = ""
    
    try:
        if file.filename.endswith('.pdf'):
            reader = pypdf.PdfReader(file_stream)
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        
        elif file.filename.endswith(('.docx', '.doc')):
            doc = docx.Document(file_stream)
            for para in doc.paragraphs:
                text += para.text + "\n"
                
    except Exception as e:
        print(f"Error extracting text from {file.filename}: {e}")
        return ""
        
    return text.strip()
