import { Link } from 'react-router-dom';
import ProgressSection from '../components/ProgressSection';

const ServicesPage = () => {
  const services = [
    {
      title: "Enterprise Software Development",
      description: "Custom-built solutions that drive business growth and efficiency",
      features: [
        "Web Applications",
        "Mobile Development",
        "Cloud Solutions",
        "API Integration"
      ]
    },
    {
      title: "Digital Transformation",
      description: "Modernize your business with cutting-edge digital solutions",
      features: [
        "Process Automation",
        "Legacy System Migration",
        "Digital Strategy",
        "Technology Consulting"
      ]
    },
    {
      title: "Cybersecurity Solutions",
      description: "Protect your business with advanced security measures",
      features: [
        "Network Security",
        "Data Protection",
        "Security Audits",
        "Compliance Management"
      ]
    }
  ];

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
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="glass-card p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-primary mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
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