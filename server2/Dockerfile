# --- STAGE 1: Build & Dependencies ---
# Using a specific slim image for stability and a small footprint
FROM python:3.11-slim as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory for all subsequent commands
WORKDIR /app

# Copy the requirements file
COPY requirements.txt .

# Install dependencies. This includes uvicorn, fastapi, whisper, etc.
RUN pip install --no-cache-dir -r requirements.txt


# --- STAGE 2: Final Runtime Image ---
# Use a clean, minimal runtime image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Define the persistent directory for the Whisper model downloads
ENV PERSISTENT_MODEL_ROOT=/app/.whisper_models
RUN mkdir -p $PERSISTENT_MODEL_ROOT

# --- CRITICAL FIX: Copy the Python packages AND the executables (like 'uvicorn') ---
# Copy the installed Python packages (libraries)
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
# NEW: Copy the executables (like uvicorn, which live in the bin directory)
COPY --from=builder /usr/local/bin /usr/local/bin

# Copy application files (The FastAPI code and environment variables)
COPY main.py .
COPY .env .

# Expose the port the application will listen on
EXPOSE 80

# The main command to start the application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
