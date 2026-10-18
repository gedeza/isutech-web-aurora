import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DocumentationPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('getting-started');

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
      id: 'getting-started',
      title: 'Getting Started',
      content: [
        { title: 'Introduction', href: '#introduction' },
        { title: 'Quick Start Guide', href: '#quick-start' },
        { title: 'Installation', href: '#installation' },
      ]
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      content: [
        { title: 'Authentication', href: '#authentication' },
        { title: 'Endpoints', href: '#endpoints' },
        { title: 'Rate Limits', href: '#rate-limits' },
      ]
    },
    {
      id: 'guides',
      title: 'Guides',
      content: [
        { title: 'Integration Guide', href: '#integration' },
        { title: 'Best Practices', href: '#best-practices' },
        { title: 'Troubleshooting', href: '#troubleshooting' },
      ]
    },
    {
      id: 'examples',
      title: 'Examples',
      content: [
        { title: 'Code Samples', href: '#code-samples' },
        { title: 'Use Cases', href: '#use-cases' },
        { title: 'Tutorials', href: '#tutorials' },
      ]
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
              Documentation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in delay-100">
              Everything you need to know about our products and services.
            </p>
            <div className="flex gap-4 animate-fade-in delay-200">
              <Link 
                to="#quick-start" 
                className="btn-primary"
              >
                Quick Start Guide
              </Link>
              <Link 
                to="#api-reference" 
                className="btn-secondary"
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-8">
                {sections.map((section) => (
                  <div key={section.id} className="space-y-3">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.content.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:flex-1 prose prose-lg max-w-none">
              {/* Getting Started */}
              <section id="getting-started" className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                <div className="space-y-8">
                  <div id="introduction">
                    <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
                    <p className="text-muted-foreground">
                      Welcome to our comprehensive documentation. Here you'll find everything you need to get started with our products and services.
                    </p>
                  </div>

                  <div id="quick-start">
                    <h3 className="text-2xl font-semibold mb-4">Quick Start Guide</h3>
                    <p className="text-muted-foreground mb-4">
                      Follow these steps to quickly get up and running with our platform:
                    </p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Sign up for an account</li>
                      <li>Generate your API keys</li>
                      <li>Install our SDK</li>
                      <li>Make your first API call</li>
                    </ol>
                  </div>

                  <div id="installation">
                    <h3 className="text-2xl font-semibold mb-4">Installation</h3>
                    <p className="text-muted-foreground mb-4">
                      Install our SDK using your preferred package manager:
                    </p>
                    <pre className="bg-black/90 text-white p-4 rounded-lg overflow-x-auto">
                      <code>npm install @isutech/sdk</code>
                    </pre>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section id="api-reference" className="mb-16">
                <h2 className="text-3xl font-bold mb-6">API Reference</h2>
                <div className="space-y-8">
                  <div id="authentication">
                    <h3 className="text-2xl font-semibold mb-4">Authentication</h3>
                    <p className="text-muted-foreground">
                      Learn how to authenticate your API requests using our secure authentication methods.
                    </p>
                  </div>

                  <div id="endpoints">
                    <h3 className="text-2xl font-semibold mb-4">Endpoints</h3>
                    <p className="text-muted-foreground">
                      Explore our comprehensive list of API endpoints and their functionalities.
                    </p>
                  </div>

                  <div id="rate-limits">
                    <h3 className="text-2xl font-semibold mb-4">Rate Limits</h3>
                    <p className="text-muted-foreground">
                      Understand our API rate limits and best practices for optimal usage.
                    </p>
                  </div>
                </div>
              </section>

              {/* Guides */}
              <section id="guides" className="mb-16">
                <h2 className="text-3xl font-bold mb-6">Guides</h2>
                <div className="space-y-8">
                  <div id="integration">
                    <h3 className="text-2xl font-semibold mb-4">Integration Guide</h3>
                    <p className="text-muted-foreground">
                      Step-by-step instructions for integrating our services into your applications.
                    </p>
                  </div>

                  <div id="best-practices">
                    <h3 className="text-2xl font-semibold mb-4">Best Practices</h3>
                    <p className="text-muted-foreground">
                      Learn about recommended practices and optimization techniques.
                    </p>
                  </div>

                  <div id="troubleshooting">
                    <h3 className="text-2xl font-semibold mb-4">Troubleshooting</h3>
                    <p className="text-muted-foreground">
                      Common issues and their solutions to help you resolve problems quickly.
                    </p>
                  </div>
                </div>
              </section>

              {/* Examples */}
              <section id="examples">
                <h2 className="text-3xl font-bold mb-6">Examples</h2>
                <div className="space-y-8">
                  <div id="code-samples">
                    <h3 className="text-2xl font-semibold mb-4">Code Samples</h3>
                    <p className="text-muted-foreground">
                      Practical code examples to help you implement our services effectively.
                    </p>
                  </div>

                  <div id="use-cases">
                    <h3 className="text-2xl font-semibold mb-4">Use Cases</h3>
                    <p className="text-muted-foreground">
                      Real-world examples and implementation scenarios.
                    </p>
                  </div>

                  <div id="tutorials">
                    <h3 className="text-2xl font-semibold mb-4">Tutorials</h3>
                    <p className="text-muted-foreground">
                      Detailed tutorials to guide you through specific implementations.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage; 