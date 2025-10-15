# Use a common, stable base image with Python
FROM python:3.11-slim

# 1. Install System Dependencies (Crucial: FFmpeg for audio processing)
# We use apt-get to install the necessary library on the Linux base.
RUN apt-get update && apt-get install -y \
    ffmpeg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# 2. Copy the dependencies file and install Python packages
# This is where 'requirements.txt' is used.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy the rest of your application code
COPY . .

# 4. Define the command to run the application using your start.sh script
# Railway often defaults to running the command specified in the Dockerfile
CMD ["/bin/bash", "start.sh"]
