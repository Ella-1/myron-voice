import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DemoSection = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = () => {
    setIsUploading(true);
    
    // Simulate conversion
    setTimeout(() => {
      setIsUploading(false);
      setIsConverted(true);
      toast({
        title: "Conversion Complete!",
        description: "Your audio has been transcribed successfully.",
      });
    }, 3000);
  };

  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Try It <span className="gradient-text">Now</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your audio file and see the magic happen
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-glass rounded-3xl p-8 md:p-12 text-center animate-fade-in">
            {!isUploading && !isConverted && (
              <div className="space-y-6">
                <div className="w-24 h-24 rounded-2xl gradient-primary mx-auto flex items-center justify-center animate-pulse-glow">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Drag & Drop Your Audio File
                </h3>
                <p className="text-muted-foreground">
                  Supports MP3, WAV, M4A, and more
                </p>
                <Button 
                  size="lg" 
                  className="gradient-primary hover:opacity-90 transition-opacity"
                  onClick={handleFileUpload}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                </Button>
              </div>
            )}

            {isUploading && (
              <div className="space-y-6">
                <div className="w-24 h-24 rounded-2xl gradient-primary mx-auto flex items-center justify-center animate-pulse">
                  <Upload className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Converting Your Voice to Text...
                </h3>
                <div className="w-full max-w-md mx-auto bg-muted rounded-full h-2 overflow-hidden">
                  <div className="h-full gradient-primary animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            )}

            {isConverted && (
              <div className="space-y-6 animate-fade-in">
                <div className="w-24 h-24 rounded-2xl gradient-primary mx-auto flex items-center justify-center glow-effect">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-semibold">
                  Transcription Complete!
                </h3>
                <div className="card-glass rounded-xl p-6 text-left max-w-xl mx-auto">
                  <div className="flex items-start gap-3 mb-4">
                    <FileText className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-2">Preview:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        "This is a sample transcription of your audio file. Myron has automatically formatted the text with proper punctuation and paragraph breaks..."
                      </p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="gradient-primary hover:opacity-90 transition-opacity"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Download Word File
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
