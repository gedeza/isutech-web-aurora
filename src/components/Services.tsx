import React, { useEffect, useRef, useState } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';
import { servicesApi, Service } from '../utils/api';
import { FALLBACK_SERVICES } from '../data/services';

const Services = () => {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES as any);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        const published = data.filter(service => service.status === 'Published');
        setServices(published.length ? published : (FALLBACK_SERVICES as any));
      } catch (err: any) {
        // Use fallback data instead of showing error
        console.log('Using fallback services data:', err.message);
        setServices(FALLBACK_SERVICES as any);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  const stats = [
    { title: "Built in", value: "South Africa", delay: "200ms" },
    { title: "Data residency", value: "South Africa", delay: "400ms" },
    { title: "Privacy", value: "POPIA by design", delay: "600ms" },
    { title: "Focus", value: "Public sector & compliance", delay: "800ms" }
  ];

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  return (
    <section className="py-12 relative overflow-hidden" id="services">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container relative">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 scroll-animation">
            <span className="gradient-text">Comprehensive Solutions</span>
          </h2>
          <p className="text-lg text-muted-foreground scroll-animation" style={{ transitionDelay: '200ms' }}>
            Empowering your business with cutting-edge technology solutions
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-card p-4 sm:p-5 md:p-6 rounded-lg shadow-sm scroll-animation"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4">
                {service.category === 'Government Solutions' && <Building2 className="w-full h-full" />}
                {service.category === 'AI & Automation' && <Bot className="w-full h-full" />}
                {service.category === 'Custom Development' && <Code2 className="w-full h-full" />}
                {service.category === 'Digital Transformation' && <Laptop2 className="w-full h-full" />}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">{service.name}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">{service.shortDescription}</p>
              <ul className="space-y-2">
                {service.features.slice(0, 4).map(feature => (
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
              className="glass-card p-4 sm:p-5 md:p-6 text-center rounded-lg scroll-animation hover:bg-accent/5"
              style={{ transitionDelay: stat.delay }}
            >
              <div className="text-2xl sm:text-3xl font-bold mb-2 gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
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