#!/bin/bash

# Start the Gunicorn WSGI server. 
# This command tells Gunicorn to look inside 'app.py' for a Flask instance named 'app'.
# The --bind 0.0.0.0:$PORT ensures it listens on the correct address and port provided by the hosting environment.
# The --workers parameter should be adjusted based on the available CPU cores.
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 app:app