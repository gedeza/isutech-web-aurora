import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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

  const sections = [
    {
      title: 'Terms of Service',
      id: 'terms',
      content: `These Terms of Service govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms.`
    },
    {
      title: 'Privacy Policy',
      id: 'privacy',
      content: `We respect your privacy and are committed to protecting your personal data. Our Privacy Policy explains how we collect, use, and safeguard your information.`
    },
    {
      title: 'Acceptable Use',
      id: 'acceptable-use',
      content: `You agree to use our services only for lawful purposes and in accordance with these Terms of Service.`
    },
    {
      title: 'Intellectual Property',
      id: 'intellectual-property',
      content: `All content, features, and functionality of our services are owned by us and are protected by international copyright, trademark, and other intellectual property laws.`
    },
    {
      title: 'User Accounts',
      id: 'user-accounts',
      content: `When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.`
    },
    {
      title: 'Service Modifications',
      id: 'modifications',
      content: `We reserve the right to modify or discontinue our services at any time, with or without notice.`
    },
    {
      title: 'Limitation of Liability',
      id: 'liability',
      content: `We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.`
    },
    {
      title: 'Government Contracts',
      id: 'government-contracts',
      content: `For government contracts and tenders, additional terms and conditions may apply as per South African government procurement regulations and requirements.`
    },
    {
      title: 'Service Delivery',
      id: 'service-delivery',
      content: `We are committed to delivering high-quality services in accordance with agreed-upon specifications and timelines. For government projects, we adhere to all relevant public sector procurement and delivery guidelines.`
    },
    {
      title: 'Data Protection',
      id: 'data-protection',
      content: `We comply with the Protection of Personal Information Act (POPIA) and implement appropriate measures to protect your personal information. Our data protection practices align with South African legal requirements.`
    },
    {
      title: 'Governing Law',
      id: 'governing-law',
      content: `These terms shall be governed by and construed in accordance with the laws of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the South African courts.`
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
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Please read these terms carefully before using our services.
            </p>
            <div className="flex gap-4 animate-fade-in delay-200">
              <Link 
                to="#privacy" 
                className="btn-primary"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/contact" 
                className="btn-secondary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Quick Navigation</h3>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:flex-1 prose prose-lg max-w-none">
              <div className="space-y-12">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24">
                    <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {section.content}
                      </p>
                      {section.id === 'terms' && (
                        <div className="bg-primary/5 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3">Last Updated</h4>
                          <p className="text-muted-foreground">
                            These terms were last updated on March 15, 2024.
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>

              {/* Contact Section */}
              <section className="mt-12 p-6 bg-primary/5 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Questions About our Terms?</h3>
                <p className="text-muted-foreground mb-6">
                  If you have any questions about these terms or our services, please don't hesitate to contact us.
                </p>
                <Link 
                  to="/contact" 
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Contact Support
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage; 