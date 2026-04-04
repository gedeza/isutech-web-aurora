import React, { useEffect, useState } from 'react';
import { Building2, Bot, Code2, Laptop2 } from 'lucide-react';
import { servicesApi, Service } from '../utils/api';
import { motion } from 'framer-motion';

const FALLBACK_SERVICES: any[] = [
  {
    _id: "srv-1",
    name: "AI-Powered Compliance Systems",
    category: "Compliance",
    shortDescription: "Predictive algorithms for compliance tracking",
    description: "Build intelligent platforms that track, predict, and optimize compliance for professional development, training, and certification programs. Used by SACE to manage 445,000+ educators.",
    features: ["Predictive ML Models", "Real-time Tracking", "Automated Reporting", "Scale to 400k+ Users"],
    status: "Published" as const
  },
  {
    _id: "srv-2",
    name: "Predictive Analytics Platforms",
    category: "AI & ML",
    shortDescription: "Machine learning for intelligent foresight",
    description: "Develop machine learning models that predict learner success, identify at-risk individuals, and recommend interventions before problems occur. Achieving 78% prediction accuracy.",
    features: ["Risk Identification", "Intervention Logic", "78% Prediction Accuracy", "Success Modeling"],
    status: "Published" as const
  },
  {
    _id: "srv-3",
    name: "Training Management Systems",
    category: "EdTech",
    shortDescription: "End-to-end training and skills management",
    description: "Create comprehensive platforms for training providers, educational institutions, and government departments to manage courses, track enrollments, and measure outcomes.",
    features: ["Enrollment Tracking", "Outcome Measurement", "Course Management"],
    status: "Published" as const
  },
  {
    _id: "srv-4",
    name: "B2B2G SaaS Products",
    category: "GovTech",
    shortDescription: "Connecting business to government ecosystems",
    description: "Design and build Software-as-a-Service products that connect businesses with government programs and large-scale training initiatives using POPIA-compliant architectures.",
    features: ["Security Clearances", "POPIA Compliance", "Multi-tenant", "Government Grade Security"],
    status: "Published" as const
  },
  {
    _id: "srv-5",
    name: "Small Business Automation",
    category: "Automation",
    shortDescription: "WhatsApp-based SMB optimization",
    description: "Develop WhatsApp-based automation tools that save time and money for small businesses across construction, hospitality, and retail sectors.",
    features: ["WhatsApp Integration", "98% OCR Accuracy", "95% Time Savings"],
    status: "Published" as const
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Timeout the fetch so it doesn't block UI if DB is offline
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        const data = await servicesApi.getAll();
        clearTimeout(timeoutId);
        setServices(data.filter(service => service.status === 'Published').slice(0, 3));
      } catch (err: any) {
        setServices(FALLBACK_SERVICES);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const stats = [
    { title: "24/7 Support", value: "Always available" },
    { title: "Clients Worldwide", value: "100+" },
    { title: "Team Members", value: "50+" },
    { title: "Success Rate", value: "99.9%" }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background transition-colors duration-300" id="services">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-foreground/5 to-background pointer-events-none" />
      
      <div className="container relative z-10 px-6">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Comprehensive Solutions
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Empowering your business with cutting-edge technology solutions designed for scale.
          </p>
        </motion.div>

        {/* Services grid */}
        {!loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform">
                  {service.category === 'Government Solutions' && <Building2 className="w-5 h-5" />}
                  {service.category === 'AI & Automation' && <Bot className="w-5 h-5" />}
                  {service.category === 'Custom Development' && <Code2 className="w-5 h-5" />}
                  {service.category === 'Digital Transformation' && <Laptop2 className="w-5 h-5" />}
                  {/* Default fallback */}
                  {!['Government Solutions', 'AI & Automation', 'Custom Development', 'Digital Transformation'].includes(service.category || '') && <Laptop2 className="w-5 h-5" />}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm font-light">{service.shortDescription}</p>
                <ul className="space-y-3">
                  {service.features?.slice(0, 3).map((feature: string) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground/80">
                      <span className="text-foreground/30">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {/* Features grid */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-foreground/[0.02] border border-border p-6 text-center rounded-2xl hover:bg-foreground/[0.04] transition-colors"
            >
              <div className="text-3xl font-bold mb-2 text-foreground">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;