#!/bin/bash

# --- 1. Set Environment Variables & Defaults ---
# Ensure we are using the port defined by the deployment platform,
# defaulting to 8080 if not set.
PORT=${PORT:-8080}

# Define the model path consistently with the Dockerfile's ENV.
MODEL_ROOT="/app/.whisper_models"

# DEFENSIVE CODING: Set a default value for WHISPER_MODEL if the environment 
# variable is not explicitly set (this fixes the "Whisper model: ---" log issue).
WHISPER_MODEL=${WHISPER_MODEL:-base}

# --- 2. Pre-download the Whisper Model (Critical for Fast Startup) ---
# Check if the model files already exist in the persistent path.
if [ ! -d "$MODEL_ROOT/$WHISPER_MODEL" ]; then
    echo "--- Starting initial download of Whisper model: $WHISPER_MODEL ---"
    
    # --- FIX 1: Python quoting fixed using standard string concatenation ---
    # We remove the problematic f-string and use standard string concatenation.
    # This guarantees no conflicts between the shell and Python syntax.
    /usr/local/bin/python3 -c '
import whisper
import os
try:
    # Changed to standard string concatenation to fix the SyntaxError
    print("Attempting to download model " + os.environ.get("WHISPER_MODEL", "base") + "...")
    
    # Pass download_root to the function. The shell variable substitution must 
    # be outside the Python string and surrounded by the existing single quotes.
    whisper.load_model(os.environ.get("WHISPER_MODEL", "base"), download_root="'$MODEL_ROOT'")
    print("Model download complete.")
except Exception as e:
    # Use standard string concatenation for error messages as well
    print("Error during pre-download: " + str(e))
    # Exit the shell script if the download fails
    exit(1)
'
    echo "--- Model ready ---"
else
    echo "--- Whisper model already exists in $MODEL_ROOT. Skipping download. ---"
fi

# --- 3. Start the Uvicorn Server ---
echo "--- Starting Uvicorn on port $PORT ---"
# --- FIX 2: Using the absolute executable path ---
# This is the most reliable way. Since the Python download script above now runs 
# cleanly, this explicit path should resolve the "not found" errors once and for all.
/usr/local/bin/uvicorn main:app --host 0.0.0.0 --port "$PORT"
