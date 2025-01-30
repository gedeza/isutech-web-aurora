import React, { useEffect, useState } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';
import { servicesApi, Service } from '../utils/api';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import ProgressSection from '../components/ProgressSection';

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data.filter(service => service.status === 'Published'));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>;
  }

  const stats = [
    { value: "100+", label: "Successful Projects" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Expert Team Members" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Comprehensive Technology Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Empower your business with our suite of innovative services designed for the modern digital landscape.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Schedule Consultation
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-accent/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <ProgressSection />

      {/* Main Services Section */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Our Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive technology solutions tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-card p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 text-primary mb-6">
                  {service.category === 'Government Solutions' && <Building2 className="w-full h-full" />}
                  {service.category === 'AI & Automation' && <Bot className="w-full h-full" />}
                  {service.category === 'Custom Development' && <Code2 className="w-full h-full" />}
                  {service.category === 'Digital Transformation' && <Laptop2 className="w-full h-full" />}
                </div>
                <h2 className="text-2xl font-semibold mb-4">{service.name}</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-center gap-2">
                        <span>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Link to="/contact">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-accent/5">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="gradient-text">Why Choose Our Services?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Access to skilled professionals with years of industry experience"
              },
              {
                title: "Custom Solutions",
                description: "Tailored approaches to meet your specific business needs"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance and maintenance services"
              },
              {
                title: "Scalable Solutions",
                description: "Grow your technology infrastructure as your business expands"
              },
              {
                title: "Latest Technology",
                description: "Access to cutting-edge tools and frameworks"
              },
              {
                title: "Cost-Effective",
                description: "Competitive pricing with maximum value delivery"
              }
            ].map((feature) => (
              <div key={feature.title} className="p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-background" />
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage; 