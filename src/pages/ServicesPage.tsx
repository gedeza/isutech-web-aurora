import React, { useEffect, useState } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';
import { servicesApi, Service } from '../utils/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThreeDCard } from '../components/ui/3d-card';

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, staggerChildren: 0.15 }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data.filter(service => service.status === 'Published'));
      } catch (err: any) {
        setError(err.message || 'Failed to fetch services');
        // Fallback for UI testing if DB is down
        setServices([
          { _id: '1', name: 'AI-Powered Compliance Systems', category: 'Compliance', description: 'Predictive algorithms for compliance tracking', features: ['Predictive ML Models', 'Real-time Tracking'], status: 'Published' },
          { _id: '2', name: 'Predictive Analytics Platforms', category: 'AI & ML', description: 'Machine learning for intelligent foresight', features: ['Risk Identification', 'Success Modeling'], status: 'Published' },
          { _id: '3', name: 'Training Management Systems', category: 'EdTech', description: 'End-to-end training and skills management', features: ['Enrollment Tracking', 'Course Management'], status: 'Published' },
          { _id: '4', name: 'B2B2G SaaS Products', category: 'GovTech', description: 'Connecting business to government ecosystems', features: ['POPIA Compliance', 'Government Grade Security'], status: 'Published' },
          { _id: '5', name: 'Small Business Automation', category: 'Automation', description: 'WhatsApp-based SMB optimization', features: ['WhatsApp Integration', '95% Time Savings'], status: 'Published' }
        ] as any);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const stats = [
    { value: "100+", label: "Successful Projects" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Expert Team Members" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50 dark:opacity-30" />
      <div className="absolute top-[80%] left-0 -translate-x-1/4 w-[600px] h-[400px] bg-foreground/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={HERO_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            <motion.h3 variants={ITEM_VARIANTS} className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Comprehensive Technology Solutions
            </motion.h3>
            <motion.h1 variants={ITEM_VARIANTS} className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Engineering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">future</span><br />
              of enterprise work.
            </motion.h1>
            <motion.p variants={ITEM_VARIANTS} className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-2xl mx-auto">
              Empower your business with our suite of innovative services designed for the modern digital landscape.
            </motion.p>
            <motion.div variants={ITEM_VARIANTS} className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-md">
                Schedule Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative z-10 border-y border-border bg-foreground/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Our Services</h2>
            <p className="text-lg text-muted-foreground font-light">
              Comprehensive technology solutions tailored to scale alongside your organization's needs.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Booting services...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, idx) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <ThreeDCard className="h-full bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                    <div className="p-8 h-full flex flex-col justify-start">
                      <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground mb-8">
                        {service.category === 'Government Solutions' && <Building2 strokeWidth={1.5} className="w-6 h-6" />}
                        {service.category === 'AI & Automation' && <Bot strokeWidth={1.5} className="w-6 h-6" />}
                        {service.category === 'Custom Development' && <Code2 strokeWidth={1.5} className="w-6 h-6" />}
                        {service.category === 'Digital Transformation' && <Laptop2 strokeWidth={1.5} className="w-6 h-6" />}
                      </div>
                      <h3 className="text-2xl font-semibold mb-3 text-foreground tracking-tight">{service.name}</h3>
                      <p className="text-muted-foreground mb-8 font-light leading-relaxed">{service.description}</p>
                      
                      <div className="mt-auto">
                        <div className="mb-8">
                          <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-4">Key Features</h4>
                          <ul className="space-y-3">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                                <span className="text-foreground/30 mt-0.5">•</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
                          Get Started
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </ThreeDCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">Ready to Transform?</h2>
            <p className="text-xl text-muted-foreground mb-10 font-light">
              Let's engineer the perfect software infrastructure to achieve your specific business goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-md">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;