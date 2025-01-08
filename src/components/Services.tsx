import { useEffect, useRef } from 'react';

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
      title: "Custom Software Development",
      description: "Tailored solutions built to address your unique business challenges and opportunities.",
      features: ["Web Applications", "Mobile Apps", "Enterprise Software", "API Integration"],
      delay: "200ms"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure designed for modern business needs.",
      features: ["Cloud Migration", "DevOps", "Serverless Architecture", "Cloud Security"],
      delay: "400ms"
    },
    {
      title: "AI & Machine Learning",
      description: "Leverage the power of AI to automate processes and gain valuable insights.",
      features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Data Mining"],
      delay: "600ms"
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
              className="floating-card rounded-lg p-6 scroll-animation hover:bg-accent/5"
              style={{ transitionDelay: service.delay }}
            >
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm group">
                    <svg
                      className="h-5 w-5 text-primary mr-2 transform transition-transform group-hover:scale-110 group-hover:rotate-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="group-hover:text-primary transition-colors">
                      {feature}
                    </span>
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