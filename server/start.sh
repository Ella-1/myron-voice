    #!/bin/bash

    # ... (omitted comments)
    
    gunicorn --workers 2 \
             --threads 4 \
             --bind 0.0.0.0:$PORT \
             --timeout 3600 \
             --max-requests 1 \
             --preload \
             'app:app'
    