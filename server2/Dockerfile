# --- Stage 1: Build Dependencies ---
FROM python:3.11-slim AS builder

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y ffmpeg libsndfile1 && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir -r requirements.txt

# --- Stage 2: Runtime ---
FROM python:3.11-slim

ENV PATH="/usr/local/bin:$PATH"
WORKDIR /app

RUN apt-get update && apt-get install -y ffmpeg libsndfile1 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

COPY main.py .
COPY start.sh .

EXPOSE 8000

CMD ["sh", "./start.sh"]
