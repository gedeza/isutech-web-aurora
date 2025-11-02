import React, { useEffect, useRef, useState } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';
import { servicesApi, Service } from '../utils/api';

// Fallback static services data
const FALLBACK_SERVICES: Service[] = [
  {
    _id: '1',
    name: 'Government Solutions',
    slug: 'government-solutions',
    category: 'Government Solutions',
    description: 'Comprehensive digital solutions for government institutions',
    shortDescription: 'Streamline government operations with our tailored digital solutions',
    features: ['E-Government Platforms', 'Citizen Services', 'Data Management', 'Security & Compliance'],
    benefits: [],
    process: [],
    technologies: [],
    price: { starter: 0, professional: 0, enterprise: 0 },
    status: 'Published',
    createdBy: '',
    lastUpdated: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '2',
    name: 'AI & Automation',
    slug: 'ai-automation',
    category: 'AI & Automation',
    description: 'Intelligent automation solutions powered by AI',
    shortDescription: 'Transform your business processes with intelligent automation',
    features: ['Machine Learning', 'Process Automation', 'Predictive Analytics', 'Natural Language Processing'],
    benefits: [],
    process: [],
    technologies: [],
    price: { starter: 0, professional: 0, enterprise: 0 },
    status: 'Published',
    createdBy: '',
    lastUpdated: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: '3',
    name: 'Custom Development',
    slug: 'custom-development',
    category: 'Custom Development',
    description: 'Bespoke software solutions tailored to your needs',
    shortDescription: 'Build custom applications that perfectly fit your business requirements',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Database Design'],
    benefits: [],
    process: [],
    technologies: [],
    price: { starter: 0, professional: 0, enterprise: 0 },
    status: 'Published',
    createdBy: '',
    lastUpdated: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data.filter(service => service.status === 'Published'));
      } catch (err: any) {
        // Use fallback data instead of showing error
        console.log('Using fallback services data:', err.message);
        setServices(FALLBACK_SERVICES);
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
    { title: "24/7 Support", value: "Always available", delay: "200ms" },
    { title: "Clients Worldwide", value: "100+", delay: "400ms" },
    { title: "Team Members", value: "50+", delay: "600ms" },
    { title: "Success Rate", value: "99.9%", delay: "800ms" }
  ];

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

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
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-card p-6 rounded-lg shadow-sm scroll-animation"
            >
              <div className="w-12 h-12 text-primary mb-4">
                {service.category === 'Government Solutions' && <Building2 className="w-full h-full" />}
                {service.category === 'AI & Automation' && <Bot className="w-full h-full" />}
                {service.category === 'Custom Development' && <Code2 className="w-full h-full" />}
                {service.category === 'Digital Transformation' && <Laptop2 className="w-full h-full" />}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
              <p className="text-muted-foreground mb-6">{service.shortDescription}</p>
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