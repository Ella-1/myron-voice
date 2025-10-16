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
    
    # --- FIX 1: Python quoting fix implemented ---
    # Uses single quotes (') to enclose the script and double quotes (") internally.
    /usr/local/bin/python3 -c '
import whisper
import os
try:
    # Use double quotes inside the f-string now
    print(f"Attempting to download model {os.environ.get("WHISPER_MODEL", "base")}...")
    # Pass download_root to the function. Note the use of the shell variable '$MODEL_ROOT'.
    whisper.load_model(os.environ.get("WHISPER_MODEL", "base"), download_root="'$MODEL_ROOT'")
    print("Model download complete.")
except Exception as e:
    print(f"Error during pre-download: {e}")
    # Exit the shell script if the download fails
    exit(1)
'
    echo "--- Model ready ---"
else
    echo "--- Whisper model already exists in $MODEL_ROOT. Skipping download. ---"
fi

# --- 3. Start the Uvicorn Server ---
echo "--- Starting Uvicorn on port $PORT ---"
# --- FIX 2: Using python3 -m uvicorn for guaranteed execution ---
/usr/local/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port "$PORT"
