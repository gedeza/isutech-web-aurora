import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Smartphone,
  TrendingUp,
  Shield,
  Zap,
  Map,
  BarChart3,
  FileCheck,
  Wifi,
  WifiOff,
  CheckCircle2,
  Star,
  ArrowRight,
  Layers,
  Database,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import PropertyIntelligenceInquiryForm from '@/components/PropertyIntelligenceInquiryForm';

const PropertyIntelligencePage = () => {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Hybrid Web + Mobile Apps',
      description: 'Native mobile apps for iOS and Android plus responsive web dashboard. Seamless sync across all devices for maximum flexibility.',
      highlight: 'True Native Experience'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'AI Market Intelligence',
      description: 'Machine learning algorithms analyze market trends, comparable sales, and location data to provide accurate property valuations.',
      highlight: 'ML-Powered Insights'
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: 'Mobile Inspections',
      description: 'Conduct property inspections on-site with mobile app. Capture photos, notes, and measurements offline. Auto-sync when connected.',
      highlight: 'Offline-First Design'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'ROI Analytics Dashboard',
      description: 'Interactive heat maps and charts showing investment potential, rental yields, and market appreciation forecasts.',
      highlight: 'Data-Driven Decisions'
    },
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: 'MPRA Compliance',
      description: 'Built-in compliance with Municipal Property Rates Act standards for South African property valuations and reporting.',
      highlight: 'Regulatory Ready'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption, role-based access control, and audit trails for all property data and valuations.',
      highlight: 'Secure by Design'
    }
  ];

  const techStack = [
    { name: 'Next.js 15', category: 'Frontend', color: 'bg-blue-500' },
    { name: 'React Native', category: 'Mobile', color: 'bg-cyan-500' },
    { name: 'Express.js', category: 'Backend', color: 'bg-green-500' },
    { name: 'PostgreSQL', category: 'Database', color: 'bg-indigo-500' },
    { name: 'AI/ML', category: 'Intelligence', color: 'bg-purple-500' },
    { name: 'TypeScript', category: 'Language', color: 'bg-blue-600' }
  ];

  const metrics = [
    { value: '6,000+', label: 'Lines of Code' },
    { value: '100%', label: 'Spec Compliance' },
    { value: '13/13', label: 'TDD Components' },
    { value: '3 Platforms', label: 'Web + iOS + Android' }
  ];

  const faqs = [
    {
      question: 'What makes this different from other property management systems?',
      answer: 'Our platform uniquely combines hybrid web and native mobile apps with AI-powered market intelligence. The offline-first architecture means inspectors can work in remote areas without connectivity, while ML algorithms provide data-driven valuation insights that traditional systems lack.'
    },
    {
      question: 'Is the mobile app truly native or a web wrapper?',
      answer: 'We use React Native to build genuinely native iOS and Android apps, not web wrappers. This provides superior performance, native UI components, offline capabilities, and access to device features like camera, GPS, and local storage.'
    },
    {
      question: 'How does the AI valuation system work?',
      answer: 'Our machine learning models analyze historical sales data, comparable properties, location factors, market trends, and property characteristics to generate accurate valuations. The system continuously learns and improves as more data is processed.'
    },
    {
      question: 'What is MPRA compliance and why does it matter?',
      answer: 'The Municipal Property Rates Act (MPRA) sets standards for property valuations in South Africa. Our platform ensures all reports, calculations, and documentation meet these regulatory requirements, saving you from compliance headaches.'
    },
    {
      question: 'Can inspectors work without internet connection?',
      answer: 'Yes! The mobile app features full offline functionality. Inspectors can capture photos, add notes, record measurements, and complete property assessments without connectivity. Data automatically syncs when they reconnect to Wi-Fi or cellular networks.'
    },
    {
      question: 'What security measures protect property data?',
      answer: 'We implement bank-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit. Role-based access control ensures users only see authorized properties. Complete audit trails track all access and modifications for compliance and security monitoring.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky CTA Button */}
      {showStickyCTA && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            <Zap className="w-5 h-5" />
            <span className="font-bold">Request Demo</span>
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-fade-in">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">AI-Powered Property Intelligence</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Property Valuations{' '}
              <span className="gradient-text">Powered by AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in">
              Hybrid web and mobile platform for property management with AI-powered market intelligence, mobile inspections, and MPRA compliance for South African standards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              <Link to="/contact" className="btn-primary">
                Request Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/products" className="btn-secondary">
                View All Products
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in">
              {metrics.map((metric, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              The Property Management Challenge
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-4 text-red-600">Traditional Systems</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-muted-foreground">Desktop-only software limits field work</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-muted-foreground">Manual valuations prone to errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-muted-foreground">No offline capabilities for remote areas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">✗</span>
                    <span className="text-muted-foreground">Complex compliance tracking</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8 border-l-4 border-primary">
                <h3 className="text-xl font-bold mb-4 text-primary">Our Solution</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Native mobile apps + web dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">AI-powered accurate valuations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Full offline functionality with auto-sync</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Built-in MPRA compliance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">PLATFORM CAPABILITIES</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Modern Property Management</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade features designed for property managers, valuers, and inspectors who demand accuracy and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 hover:scale-105 transition-all duration-300 group">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {feature.highlight}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">TECHNOLOGY STACK</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built with Modern Technologies</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Enterprise-grade architecture using cutting-edge frameworks and proven technologies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                  <div className={`w-3 h-3 rounded-full ${tech.color} mb-3`} />
                  <h3 className="text-xl font-bold mb-1">{tech.name}</h3>
                  <p className="text-sm text-muted-foreground">{tech.category}</p>
                </div>
              ))}
            </div>

            {/* Architecture Diagram */}
            <div className="glass-card p-8 mt-8">
              <h3 className="text-xl font-bold mb-6 text-center">System Architecture</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Mobile Apps</h4>
                  <p className="text-sm text-muted-foreground">iOS & Android native apps</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Layers className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">API Layer</h4>
                  <p className="text-sm text-muted-foreground">Express.js REST API</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Database className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Database</h4>
                  <p className="text-sm text-muted-foreground">PostgreSQL with AI models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-lg text-primary mb-4">SECURITY & COMPLIANCE</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Enterprise-Grade Protection</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8">
                <Lock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Security Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>AES-256 encryption for data at rest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>TLS 1.3 for data in transit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Role-based access control (RBAC)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Complete audit trail logging</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-8">
                <FileCheck className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Compliance Standards</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>MPRA (Municipal Property Rates Act)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>POPIA data protection standards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>South African property valuation standards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Automated compliance reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">PERFORMANCE METRICS</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built for Speed & Reliability</h2>
          </div>

          <div className="glass-card p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wifi className="w-6 h-6 text-primary" />
                  <div className="text-4xl font-bold text-primary">100%</div>
                </div>
                <div className="text-muted-foreground">Offline Capability</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <div className="text-4xl font-bold text-primary">&lt;2s</div>
                </div>
                <div className="text-muted-foreground">Average API Response</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <div className="text-4xl font-bold text-primary">100%</div>
                </div>
                <div className="text-muted-foreground">Test Coverage</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div className="text-4xl font-bold text-primary">6K+</div>
                </div>
                <div className="text-muted-foreground">Lines of Code</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">FREQUENTLY ASKED QUESTIONS</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Got Questions? We've Got Answers</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-lg font-bold pr-8">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="px-8 pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="py-24 bg-background">
        <div className="container mx-auto">
          <PropertyIntelligenceInquiryForm />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Property Management?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              See how AI-powered property intelligence can streamline your valuations and inspections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/contact" className="btn-primary text-lg px-10 py-4">
                Request a Demo <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/products" className="btn-secondary text-lg px-10 py-4">
                View All Products
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="glass-card p-8 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <Shield className="w-12 h-12 text-primary mb-3" />
                  <div className="font-bold mb-1">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">Bank-grade encryption</div>
                </div>
                <div className="flex flex-col items-center">
                  <FileCheck className="w-12 h-12 text-primary mb-3" />
                  <div className="font-bold mb-1">MPRA Compliant</div>
                  <div className="text-sm text-muted-foreground">SA standards ready</div>
                </div>
                <div className="flex flex-col items-center">
                  <TrendingUp className="w-12 h-12 text-primary mb-3" />
                  <div className="font-bold mb-1">AI-Powered</div>
                  <div className="text-sm text-muted-foreground">Machine learning valuations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyIntelligencePage;
