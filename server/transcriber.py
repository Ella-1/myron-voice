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

# NEW: Set the source language explicitly (e.g., 'sw' for Swahili, 'fr' for French).
# If you leave this empty (or not defined in .env), it reverts to auto-detect (None).
# Use two-letter ISO-639-1 language codes.
SOURCE_LANGUAGE = os.getenv('SOURCE_LANGUAGE', None) 
# ---------------------

try:
    # Load Whisper model
    print(f"Loading Whisper model: {WHISPER_MODEL_NAME}...")
    model = whisper.load_model(WHISPER_MODEL_NAME)
    print("Model loaded successfully.")

    # --- KEY CHANGE FOR TRANSLATION ---
    # Transcribe and translate to English in one step.
    # 1. task="translate": Instructs Whisper to output the text in English.
    # 2. language: Uses the explicitly defined source language or None for auto-detect.
    print(f"Transcribing and translating {INPUT_FILE_NAME} to English...")
    
    # Convert 'sw' (or any provided code) to the format Whisper expects, or keep it as None
    lang_param = SOURCE_LANGUAGE.lower() if SOURCE_LANGUAGE else None

    # Handle the special case where we might pass an empty string from the environment
    if lang_param == "":
        lang_param = None
    
    result = model.transcribe(
        INPUT_FILE_NAME, 
        task="translate",
        language=lang_param 
    )
    
    # The result['text'] now contains the English translation
    transcript = result["text"]
    
    # Get the language that Whisper actually used for processing
    source_language_used = result.get('language', 'Unknown')

    # Create a Word document
    doc = Document()
    doc.add_heading("Audio Transcription (Translated to English)", level=1)
    doc.add_paragraph(f"Source File: {INPUT_FILE_NAME}")
    
    # Report the language that was used (either explicitly set or auto-detected)
    doc.add_paragraph(f"Source Language Detected/Hinted: {source_language_used.capitalize()}")
    
    if SOURCE_LANGUAGE:
         doc.add_paragraph(f"Note: Explicit language hint '{SOURCE_LANGUAGE}' was provided.")

    doc.add_paragraph("")
    doc.add_paragraph(transcript)

    # Save as Word file
    doc.save(OUTPUT_FILE_NAME)

    print(f"✅ Transcription saved to {OUTPUT_FILE_NAME}")
    print(f"Transcript snippet: \"{transcript[:100]}...\"")
    print(f"Whisper determined the source language was: {source_language_used.capitalize()}")

except FileNotFoundError:
    print(f"Error: The input file '{INPUT_FILE_NAME}' was not found.")
except Exception as e:
    print(f"An unexpected error occurred during transcription: {e}")
