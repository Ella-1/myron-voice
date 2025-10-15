#!/bin/bash

# Ensure gunicorn is found by running it as a Python module.
# This prevents 'gunicorn: not found' errors in deployment environments.

# WHISPER_MODEL and SOURCE_LANGUAGE are assumed to be set in Railway environment variables.

# Gunicorn setup:
# - 'app:app' means run the Flask app instance named 'app' located in the 'app.py' file.
# - '-w 2' sets the number of worker processes (2 is a good starting point).
# - '-b 0.0.0.0:$PORT' binds the server to the IP 0.0.0.0 and the port provided by Railway.
exec python -m gunicorn app:app -w 2 -b 0.0.0.0:$PORT