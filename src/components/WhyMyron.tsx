import { Zap, Target, Shield, Sparkles } from "lucide-react";

const benefits = [
  { icon: Zap, label: "Fast" },
  { icon: Target, label: "Accurate" },
  { icon: Shield, label: "Private" },
  { icon: Sparkles, label: "Smart" },
];

export const WhyMyron = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Because Your Voice <span className="gradient-text">Deserves Clarity</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From students taking notes to journalists recording interviews — Myron makes transcription effortless for everyone.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-8 text-center hover:glow-effect transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-xl gradient-primary mx-auto flex items-center justify-center mb-4 animate-float">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground">
                {benefit.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
