#!/bin/bash

# Ensure gunicorn binds to the correct port (set by Railway) and uses the Flask app object
# Set worker timeout to 300 seconds (5 minutes) for long transcription jobs.
# Set max-requests to 1 to recycle the worker after every request. This prevents
# memory leaks/fragmentation from Whisper models which can lead to OOM errors.

gunicorn --workers 2 \
         --threads 4 \
         --bind 0.0.0.0:$PORT \
         --timeout 300 \
         --max-requests 1 \
         'app:app'
