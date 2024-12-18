import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-isutech-blue via-isutech-purple/20 to-isutech-blue pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight animate-fade-in">
            Transforming Business Through
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-isutech-purple to-isutech-accent block mt-2">
              Advanced Technology
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in">
            Empowering businesses with cutting-edge AI solutions, custom applications, and process optimization to drive growth and innovation.
          </p>
          
          <div className="mt-10 flex justify-center gap-4 animate-fade-in">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;