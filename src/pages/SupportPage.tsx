import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const SupportPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

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

  const faqs: FAQ[] = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
      category: "account"
    },
    {
      question: "How can I update my billing information?",
      answer: "You can update your billing information in your account settings under the 'Billing' tab. We accept all major credit cards and PayPal.",
      category: "billing"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, and PayPal. All payments are processed securely through our payment gateway.",
      category: "billing"
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Navigate to 'Subscriptions' and click 'Cancel Subscription'.",
      category: "account"
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use industry-standard encryption and security measures to protect your data. All information is stored securely on our servers.",
      category: "security"
    },
    {
      question: "How can I contact technical support?",
      answer: "You can reach our technical support team through our contact form, email at support@isutech.com, or by phone during business hours.",
      category: "general"
    }
  ];

  const categories = ['all', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs
    .filter(faq => selectedCategory === 'all' || faq.category === selectedCategory)
    .filter(faq => 
      searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              How can we help?
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Find answers to common questions or get in touch with our support team.
            </p>
            <div className="relative max-w-2xl mx-auto animate-fade-in delay-200">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border border-border/40 bg-background focus:border-primary transition-colors pl-14"
              />
              <svg 
                className="w-6 h-6 absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/documentation"
              className="p-6 rounded-lg border border-border/40 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Documentation</h3>
                  <p className="text-sm text-muted-foreground">Browse our technical documentation</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/contact"
              className="p-6 rounded-lg border border-border/40 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Contact Us</h3>
                  <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/terms"
              className="p-6 rounded-lg border border-border/40 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Legal</h3>
                  <p className="text-sm text-muted-foreground">View our terms and policies</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            
            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-background border border-border/40 hover:border-primary'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-border/40 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-medium text-left">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-primary/5 text-muted-foreground">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No results found. Try adjusting your search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-muted-foreground mb-8">
              Our support team is available to assist you with any questions or concerns.
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage; 