import { Brain, Globe, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Accuracy",
    description: "Advanced speech recognition with smart punctuation and natural language formatting.",
  },
  {
    icon: Zap,
    title: "Multiple Formats",
    description: "Download your transcripts as Word, PDF, or plain text with one click.",
  },
  {
    icon: Globe,
    title: "Multilingual Transcription",
    description: "Supports English, French, Hausa, Yoruba, Arabic, and 50+ more languages.",
  },
  {
    icon: Users,
    title: "Voice Intelligence",
    description: "Automatically detects different speakers and structures paragraphs intelligently.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Why Choose <span className="gradient-text">Myron</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that make transcription effortless
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-6 hover:glow-effect transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 animate-float">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
