import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SecurityPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const securityFeatures = [
    {
      title: "Data Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard encryption protocols.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "Access Control",
      description: "Role-based access control ensures users can only access authorized resources.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Regular Audits",
      description: "We conduct regular security audits and penetration testing to identify vulnerabilities.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  const complianceStandards = [
    {
      name: "ISO 27001",
      description: "Information security management system certification",
      status: "Certified"
    },
    {
      name: "GDPR",
      description: "European data protection regulation compliance",
      status: "Compliant"
    },
    {
      name: "POPIA",
      description: "South African Protection of Personal Information Act",
      status: "Compliant"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Security & Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Your security is our top priority. Learn about our comprehensive security measures and compliance standards.
            </p>
            <div className="flex gap-4 animate-fade-in delay-200">
              <Link 
                to="#security-features" 
                className="btn-primary"
              >
                Security Features
              </Link>
              <Link 
                to="/contact" 
                className="btn-secondary"
              >
                Contact Security Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section id="security-features" className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg border border-border/40 hover:border-primary transition-all"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Compliance Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {complianceStandards.map((standard, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg bg-primary/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{standard.name}</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {standard.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{standard.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Security Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Infrastructure Security</h3>
                <ul className="space-y-3">
                  {[
                    "24/7 infrastructure monitoring",
                    "Regular security patches and updates",
                    "Multi-region data backups",
                    "DDoS protection",
                    "Network segmentation"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Application Security</h3>
                <ul className="space-y-3">
                  {[
                    "Secure development lifecycle",
                    "Regular code reviews",
                    "Automated security testing",
                    "Vulnerability management",
                    "Third-party security assessments"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Security Issue */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Report a Security Issue</h2>
            <p className="text-muted-foreground mb-8">
              If you believe you've found a security vulnerability, please report it to our security team immediately.
            </p>
            <Link 
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Security Team
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage; 