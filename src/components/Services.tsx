import { Card } from "@/components/ui/card";
import { Brain, Cog, Code, Database } from "lucide-react";

const services = [
  {
    title: "Generative AI & Data Solutions",
    description: "Harness the power of AI to transform your data into actionable insights and innovative solutions.",
    icon: Brain,
  },
  {
    title: "Business Process Optimization",
    description: "Streamline your operations with intelligent automation and data-driven process improvements.",
    icon: Cog,
  },
  {
    title: "Custom Application Development",
    description: "Build scalable, custom applications tailored to your unique business needs and objectives.",
    icon: Code,
  },
  {
    title: "AI & Advanced Technology Integration",
    description: "Seamlessly integrate cutting-edge AI and technology solutions into your existing infrastructure.",
    icon: Database,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Comprehensive solutions to drive your digital transformation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-foreground/70">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;