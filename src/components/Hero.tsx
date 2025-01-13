import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  const companyLogos = [
    { src: '/images/IBMLOGO.jpg', alt: 'IBM' },
    { src: '/images/Ethekwini Municipality Logo.jpeg', alt: 'Ethekwini Municipality' },
    { src: '/images/KZN Legislature Logo.png', alt: 'KZN Legislature' },
    { src: '/images/Microsoft Logo.png', alt: 'Microsoft' },
    { src: '/images/Moses Kotane Institute Logo.jpeg', alt: 'Moses Kotane Institute' },
    { src: '/images/MTN Logo.png', alt: 'MTN' }
  ];

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px'
        }}
      />
      
      {/* Grain effect */}
      <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-repeat opacity-[0.04]" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-accent/5" />
      
      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      
      {/* Content */}
      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 scroll-animation">
            <span className="gradient-text">Transform Your Business</span>
            <br />
            with iSu Technologies
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 scroll-animation" style={{ transitionDelay: '200ms' }}>
            Transform your business with cutting-edge technology solutions designed for the future of work.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 scroll-animation" style={{ transitionDelay: '400ms' }}>
            <Link to="/products" className="btn-primary">
              Explore Our Solutions
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              title: "Government Solutions",
              description: "Trusted partner for government projects, tenders, and service delivery.",
              delay: "600ms"
            },
            {
              title: "AI & Automation",
              description: "Cutting-edge solutions for business process automation.",
              delay: "600ms"
            },
            {
              title: "Custom Development",
              description: "Tailored software solutions for your specific needs.",
              delay: "600ms"
            }
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 rounded-lg scroll-animation"
              style={{ transitionDelay: feature.delay }}
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators with carousel */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-6 scroll-animation">
            Trusted by leading companies worldwide
          </p>
          <div className="logo-scroll-container">
            <div className="logo-scroll">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div
                  key={index}
                  className="mx-8 h-16 w-48 flex items-center justify-center"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-full w-full object-contain" 
                  />
                </div>
              ))}
            </div>
            <div className="logo-scroll logo-scroll-double">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div
                  key={index}
                  className="mx-8 h-16 w-48 flex items-center justify-center"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.alt} 
                    className="h-full w-full object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;