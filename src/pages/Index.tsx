import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DemoSection } from "@/components/DemoSection";
import { WhyMyron } from "@/components/WhyMyron";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Features />
      <DemoSection />
      <WhyMyron />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
