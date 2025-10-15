import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Myron saved me hours every week transcribing interviews. The accuracy is incredible!",
    author: "Sarah Chen",
    role: "Journalist",
  },
  {
    quote: "As a podcaster, Myron is a game-changer. I can turn episodes into blog posts instantly.",
    author: "Marcus Johnson",
    role: "Content Creator",
  },
  {
    quote: "The multilingual support is fantastic. I use it for Arabic and French transcription daily.",
    author: "Amira Hassan",
    role: "Translator",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-8 hover:glow-effect transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="w-10 h-10 text-primary mb-4 opacity-50" />
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
