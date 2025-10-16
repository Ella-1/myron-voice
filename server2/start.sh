#!/bin/bash

# --- 1. Set Environment Variables ---
# Ensure we are using the port defined by the deployment platform,
# defaulting to 8000 if not set.
PORT=${PORT:-8000}

# Define the model path consistently with the Dockerfile's ENV.
# We are using /app/.whisper_models to store the downloaded model persistently 
# within the container's volume.
MODEL_ROOT="/app/.whisper_models"

# --- 2. Pre-download the Whisper Model (Critical for Fast Startup) ---
# Check if the model files already exist in the persistent path.
# This prevents repeated downloads if the container is stopped and restarted.
if [ ! -d "$MODEL_ROOT/$WHISPER_MODEL" ]; then
    echo "--- Starting initial download of Whisper model: $WHISPER_MODEL ---"
    
    # Run a Python script to trigger the download of the required model.
    # Note: We must escape the single quotes inside the Python code (\') to fix the SyntaxError.
    /usr/local/bin/python3 -c "
import whisper
import os
try:
    print(f'Attempting to download model {os.environ.get(\'WHISPER_MODEL\', \'base\')}...')
    # Pass download_root to the function
    whisper.load_model(os.environ.get('WHISPER_MODEL', 'base'), download_root='$MODEL_ROOT')
    print('Model download complete.')
except Exception as e:
    print(f'Error during pre-download: {e}')
    # Exit the shell script if the download fails
    exit(1)
"
    echo "--- Model ready ---"
else
    echo "--- Whisper model already exists in $MODEL_ROOT. Skipping download. ---"
fi

# --- 3. Start the Uvicorn Server ---
echo "--- Starting Uvicorn on port $PORT ---"
# CRITICAL FIX: Use 'python -m uvicorn' with the absolute path to python3.
# This bypasses all PATH issues by running the module directly.
/usr/local/bin/python3 -m uvicorn main:app --host 0.0.0.0 --port "$PORT"
