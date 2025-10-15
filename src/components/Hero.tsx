import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Upload } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm mb-4">
            <Mic className="w-4 h-4 text-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">AI-Powered Voice Transcription</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
            Speak. Convert.{" "}
            <span className="gradient-text">Create.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Turn your voice into beautiful, formatted Word documents — instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/upload">
              <Button size="lg" className="gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 glow-effect">
                <Upload className="w-5 h-5 mr-2" />
                Upload Audio
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-card">
                Try Myron Free
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-4">
            No credit card required • 10 minutes free
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
