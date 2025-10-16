import { useState } from "react";
// FIX: Changed absolute import path to relative path to resolve compilation error
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Upload as UploadIcon, FileAudio, X, Download } from "lucide-react";
import { useToast } from "../hooks/use-toast";

// NOTE: Removed unused docx imports as document generation is now handled by the Flask backend.

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // The transcription state is no longer strictly needed for a file download flow,
  // but we keep it clean.
  const [transcription, setTranscription] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // NOTE: The generateWordDocument function has been removed as this task is now
  // handled by the Flask API and its 'transcriber.py' logic.

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setTranscription(""); // Clear any previous transcription state
    
    // 1. Create FormData object
    const formData = new FormData();
    // 'audio_file' MUST match the name Flask expects (request.files['audio_file'])
    formData.append('audio_file', file); 

    try {
        // 2. Send the POST request to the Flask API
        const response = await fetch('http://localhost:8000/api/transcribe', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // --- SUCCESS: Server returned the DOCX file ---
            
            // 3. Extract the filename from the Content-Disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'transcription_download.docx'; // Default fallback name
            if (contentDisposition) {
                // Regex to find the download_name="filename.docx" part
                const matches = /filename="(.+?)"/i.exec(contentDisposition);
                if (matches && matches.length > 1) {
                    filename = matches[1];
                }
            }
            
            // 4. Convert the response body to a Blob (binary data)
            const blob = await response.blob();
            
            // 5. Create a temporary URL and programmatically click a link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename; 
            
            document.body.appendChild(link);
            link.click();
            
            // 6. Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            setFile(null); // Clear the file input after successful download

            toast({
                title: "Transcription Complete! 🎉",
                description: `File '${filename}' download started.`,
            });

        } else {
            // --- FAILURE: Handle Errors from Flask (expects JSON error response) ---
            let errorMessage = `Server Error: ${response.status} ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (jsonError) {
                // If it's not JSON, use the default message
            }
            
            toast({
                title: "Transcription Failed",
                description: errorMessage,
                variant: "destructive",
            });
        }
        
    } catch (error) {
        // --- NETWORK/Client-side Error ---
        console.error("API Call Error:", error);
        toast({
            title: "Connection Error",
            description: "Could not connect to the API. Ensure your Flask backend is running on http://localhost:5000.",
            variant: "destructive",
        });
    } finally {
        setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Upload Your <span className="gradient-text">Audio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your audio or video file and we'll transcribe it for you
            </p>
          </div>

          <div className="card-glass rounded-3xl p-8 md:p-12 animate-fade-in">
            {!file ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <input
                  type="file"
                  id="file-upload"
                  accept="audio/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="w-24 h-24 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-6 animate-pulse-glow">
                    <UploadIcon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold mb-2">
                    Drag & Drop Your File
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP3, WAV, M4A, MP4, and more
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-card rounded-xl border border-primary/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                      <FileAudio className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {isProcessing ? (
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">
                      Processing your audio...
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="h-full gradient-primary animate-pulse" style={{ width: '60%' }} />
                    </div>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full gradient-primary hover:opacity-90 transition-opacity"
                    onClick={handleProcess}
                  >
                    Start Transcription
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
