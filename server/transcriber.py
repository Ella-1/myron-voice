import whisper
import os
from docx import Document
from dotenv import load_dotenv

# Load environment variables from .env file (as suggested previously)
load_dotenv() 

# --- Configuration ---
# NOTE: For better translation quality, consider using a larger model 
# like "small" or "medium" (requires more VRAM/CPU).
WHISPER_MODEL_NAME = os.getenv('WHISPER_MODEL', 'base')
INPUT_FILE_NAME = "WhatsApp Audio 2025-10-15 at 5.22.10 PM.opus"
OUTPUT_FILE_NAME = "transcription_in_english.docx"
# ---------------------

try:
    # Load Whisper model
    print(f"Loading Whisper model: {WHISPER_MODEL_NAME}...")
    model = whisper.load_model(WHISPER_MODEL_NAME)
    print("Model loaded successfully.")

    # --- KEY CHANGE FOR TRANSLATION ---
    # Transcribe and translate to English in one step.
    # 1. task="translate": Instructs Whisper to output the text in English.
    # 2. language=None: Allows the model to auto-detect the source language 
    #    before performing the translation.
    print(f"Transcribing and translating {INPUT_FILE_NAME} to English...")
    result = model.transcribe(
        INPUT_FILE_NAME, 
        task="translate",
        language=None 
    )
    
    # The result['text'] now contains the English translation
    transcript = result["text"]
    
    # You can also get the auto-detected source language:
    source_language = result.get('language', 'Unknown')

    # Create a Word document
    doc = Document()
    doc.add_heading("Audio Transcription (Translated to English)", level=1)
    doc.add_paragraph(f"Source File: {INPUT_FILE_NAME}")
    doc.add_paragraph(f"Source Language Detected: {source_language.capitalize()}")
    doc.add_paragraph("")
    doc.add_paragraph(transcript)

    # Save as Word file
    doc.save(OUTPUT_FILE_NAME)

    print(f"✅ Transcription saved to {OUTPUT_FILE_NAME}")
    print(f"Transcript snippet: \"{transcript[:100]}...\"")

except FileNotFoundError:
    print(f"Error: The input file '{INPUT_FILE_NAME}' was not found.")
except Exception as e:
    print(f"An unexpected error occurred during transcription: {e}")
