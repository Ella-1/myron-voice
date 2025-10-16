# --- STAGE 1: Build & Dependencies ---
# Using a specific slim image for stability and a small footprint
FROM python:3.11-slim as builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory for all subsequent commands
WORKDIR /app

# Copy the requirements file (ensures the pip cache is busted only when requirements change)
# The requirements.txt includes: fastapi, uvicorn[standard], openai-whisper, python-docx, python-dotenv
COPY requirements.txt .

# Install dependencies. The --no-cache-dir ensures the final image is smaller.
# Note: pip handles the 'uvicorn[standard]' format correctly.
RUN pip install --no-cache-dir -r requirements.txt


# --- STAGE 2: Final Runtime Image ---
# Use a clean, minimal runtime image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Define the persistent directory for the Whisper model downloads (set to /app/.whisper_models)
# This directory will be used by the Python code to save the model ONCE.
ENV PERSISTENT_MODEL_ROOT=/app/.whisper_models
RUN mkdir -p $PERSISTENT_MODEL_ROOT

# Copy only the installed Python packages (site-packages) from the builder stage
# This keeps the image smaller than copying the entire project build context.
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy application files (The FastAPI code and environment variables)
# UPDATED: We now look for main.py
COPY main.py .
COPY .env .

# Expose the port the application will listen on
EXPOSE 80

# The main command to start the application using Uvicorn
# UPDATED: Uvicorn now targets main:app
# 'main' is the file name, 'app' is the FastAPI object name inside the file.
# --host 0.0.0.0 is mandatory for Docker networking.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
