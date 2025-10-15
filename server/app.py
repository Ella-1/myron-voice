from flask import Flask, request, jsonify, send_file
from transcriber import transcribe_audio_and_save_doc # The new function name
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import time # To help ensure unique filenames

app = Flask(__name__)
# ... (CORS and UPLOAD_FOLDER setup as before) ...
CORS(app) 
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# ...

@app.route('/api/transcribe', methods=['POST'])
def transcribe_and_download_endpoint():
    # 1. Input validation (check for file part)
    if 'audio_file' not in request.files or request.files['audio_file'].filename == '':
        return jsonify({'error': 'No file selected'}), 400

    audio_file = request.files['audio_file']
    
    # Securely save the uploaded audio file
    audio_filename = secure_filename(audio_file.filename)
    audio_filepath = os.path.join(app.config['UPLOAD_FOLDER'], audio_filename)
    audio_file.save(audio_filepath)
    
    # 2. Define the output path for the DOCX file
    # Use a unique name to avoid conflicts if multiple people use the server
    base_name = os.path.splitext(audio_filename)[0]
    docx_filename = f"{base_name}_transcription_{int(time.time())}.docx"
    docx_filepath = os.path.join(app.config['UPLOAD_FOLDER'], docx_filename)

    try:
        # 3. Call the modified transcription function
        # This function must now create and save the DOCX file
        transcribe_audio_and_save_doc(audio_filepath, docx_filepath)
        
        # 4. Send the file for download
        # as_attachment=True forces the browser to download the file
        response = send_file(
            docx_filepath,
            as_attachment=True,
            download_name=docx_filename, # This is the name the user sees
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        
        # 5. Clean up the files after the response is sent
        # Use an after_request hook or a cleaner solution for production
        # For simplicity in development, we'll try cleanup immediately (though this is risky)
        # A more robust solution involves response callbacks.
        
        # For a simple local dev setup, this simple cleanup after sending the response works:
        @response.call_on_close
        def cleanup():
            if os.path.exists(audio_filepath):
                os.remove(audio_filepath)
            if os.path.exists(docx_filepath):
                os.remove(docx_filepath)
                
        return response
        
    except Exception as e:
        # 6. Handle errors and ensure cleanup of any partially created files
        if os.path.exists(audio_filepath):
            os.remove(audio_filepath)
        if os.path.exists(docx_filepath):
            os.remove(docx_filepath)
            
        return jsonify({'status': 'error', 'message': f'Transcription failed: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)