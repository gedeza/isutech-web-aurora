import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-12 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Driving Innovation Through Technology Excellence
            </h2>
            <p className="text-base md:text-lg text-foreground/70 mb-8">
              At iSuTech, we combine cutting-edge technology with deep industry expertise to deliver transformative solutions that drive business growth and innovation.
            </p>
            
            <div className="space-y-4">
              {[
                "Industry-leading AI and machine learning solutions",
                "Proven track record of successful implementations",
                "Dedicated team of technology experts",
                "Customized solutions for your unique needs",
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <Card className="p-4 sm:p-5 md:p-6 animate-float">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-xs sm:text-sm text-foreground/70">Projects Completed</div>
            </Card>
            <Card className="p-4 sm:p-5 md:p-6 animate-float [animation-delay:200ms]">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-xs sm:text-sm text-foreground/70">Client Satisfaction</div>
            </Card>
            <Card className="p-4 sm:p-5 md:p-6 animate-float [animation-delay:400ms]">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-xs sm:text-sm text-foreground/70">Years Experience</div>
            </Card>
            <Card className="p-4 sm:p-5 md:p-6 animate-float [animation-delay:600ms]">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-foreground/70">Support Available</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;