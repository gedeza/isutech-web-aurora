import { useEffect, useRef } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';

const Services = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const services = [
    {
      title: "Government Solutions",
      description: "Specialized solutions for government departments and municipalities. From tender management to service delivery tracking, we help streamline public sector operations.",
      icon: Building2,
      features: [
        "Tender Management Systems",
        "Service Delivery Tracking",
        "Public Sector Compliance",
        "Municipal Solutions"
      ]
    },
    {
      title: "AI & Automation",
      description: "Leverage cutting-edge AI and automation technologies to transform your business processes and boost efficiency.",
      icon: Bot,
      features: [
        "Process Automation",
        "AI Integration",
        "Workflow Optimization",
        "Smart Analytics"
      ]
    },
    {
      title: "Custom Development",
      description: "Tailored software solutions designed to meet your specific business requirements and challenges.",
      icon: Code2,
      features: [
        "Web Applications",
        "Mobile Solutions",
        "System Integration",
        "Legacy Modernization"
      ]
    },
    {
      title: "Digital Transformation",
      description: "End-to-end digital transformation services to help organizations adapt and thrive in the digital age.",
      icon: Laptop2,
      features: [
        "Digital Strategy",
        "Process Digitization",
        "Change Management",
        "Technology Adoption"
      ]
    }
  ];

  const stats = [
    { title: "24/7 Support", value: "Always available", delay: "200ms" },
    { title: "Clients Worldwide", value: "100+", delay: "400ms" },
    { title: "Team Members", value: "50+", delay: "600ms" },
    { title: "Success Rate", value: "99.9%", delay: "800ms" }
  ];

  return (
    <section className="section relative overflow-hidden" id="services">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container relative">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animation">
            <span className="gradient-text">Comprehensive Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground scroll-animation" style={{ transitionDelay: '200ms' }}>
            Empowering your business with cutting-edge technology solutions
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-card p-6 rounded-lg shadow-sm scroll-animation"
            >
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <span>•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="mt-24 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="glass-card p-6 text-center rounded-lg scroll-animation hover:bg-accent/5"
              style={{ transitionDelay: stat.delay }}
            >
              <div className="text-3xl font-bold mb-2 gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;