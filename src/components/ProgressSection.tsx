import { useEffect, useRef, useState } from 'react';

/**
 * ProgressSection - A scrollable section component with synchronized diagrams
 * Features:
 * - Vertical progress indicator
 * - Content sections with hover effects
 * - Interactive diagrams that update based on scroll position
 */
const ProgressSection = () => {
  // State management for section tracking and interactions
  const [activeSection, setActiveSection] = useState(0); // Currently visible section
  const [hoveredSection, setHoveredSection] = useState(null); // Section being hovered
  const sectionRefs = [useRef(null), useRef(null), useRef(null)]; // References to section DOM elements
  const [scrollProgress, setScrollProgress] = useState(0); // Scroll progress (0-1)
  const [isVisible, setIsVisible] = useState(false);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);

  // Configuration for the interactive diagrams
  const diagrams = [
    {
      title: "Legacy Infrastructure",
      elements: [
        { icon: "🏢", label: "Physical Servers", description: "High maintenance cost", delay: 100 },
        { icon: "🔒", label: "Basic Security", description: "Limited protection", delay: 200 },
        { icon: "💻", label: "Manual Processes", description: "Time consuming", delay: 300 },
        { icon: "📊", label: "Fixed Capacity", description: "Limited growth", delay: 400 }
      ],
      connectionLabel: "Traditional IT Setup",
      theme: "bg-white text-black"
    },
    {
      title: "Cloud Migration",
      elements: [
        { icon: "☁️", label: "Cloud Servers", description: "Flexible scaling", delay: 100 },
        { icon: "🔐", label: "Advanced Security", description: "Enhanced protection", delay: 200 },
        { icon: "🤖", label: "Automation", description: "Efficient processes", delay: 300 },
        { icon: "📈", label: "Dynamic Scaling", description: "Grow on demand", delay: 400 }
      ],
      connectionLabel: "Digital Transformation",
      theme: "bg-[#9c7c0b] text-white"
    },
    {
      title: "Enterprise Solution",
      elements: [
        { icon: "🌐", label: "Global Network", description: "Worldwide reach", delay: 100 },
        { icon: "🛡️", label: "Enterprise Security", description: "Maximum protection", delay: 200 },
        { icon: "⚡", label: "High Performance", description: "Optimal speed", delay: 300 },
        { icon: "🎯", label: "Smart Analytics", description: "Data-driven insights", delay: 400 }
      ],
      connectionLabel: "Enterprise Architecture",
      theme: "bg-[#6b21a8] text-white"
    }
  ];

  // Content sections data
  const sections = [
    {
      label: "Traditional Infrastructure",
      title: "Legacy systems holding back your potential",
      points: [
        "Complex and costly network maintenance",
        "Limited scalability constrains growth",
        "High operational and maintenance costs",
        "Basic security vulnerable to modern threats",
        "Slow deployment impacts business agility"
      ]
    },
    {
      label: "Cloud Transformation",
      title: "Modernize your infrastructure with cloud solutions",
      points: [
        "Flexible and scalable cloud architecture",
        "Automated deployment and management",
        "Reduced operational costs and overhead",
        "Enhanced security and compliance",
        "Rapid deployment and updates"
      ]
    },
    {
      label: "Enterprise Evolution",
      title: "Future-proof your business with enterprise solutions",
      points: [
        "Global network with instant scalability",
        "Enterprise-grade security and compliance",
        "AI-powered automation and optimization",
        "Real-time analytics and insights",
        "24/7 expert support and maintenance"
      ]
    }
  ];

  // Enhanced scroll handling with reduced sensitivity and threshold check
  useEffect(() => {
    // Debounce timer to reduce scroll event frequency
    let scrollTimeout: NodeJS.Timeout;
    
    // Track the last progress value to prevent small fluctuations
    let lastProgress = scrollProgress;
    
    const handleScroll = () => {
      // Clear existing timeout to debounce scroll events
      clearTimeout(scrollTimeout);
      
      // Set a new timeout to handle the scroll after a delay
      scrollTimeout = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Minimum change required to update progress (reduces sensitivity)
        const MIN_PROGRESS_CHANGE = 0.05; // 5% minimum change threshold
        
        sectionRefs.forEach((ref, index) => {
          if (ref.current) {
            const element = ref.current;
            const { top, bottom, height } = element.getBoundingClientRect();
            
            // Only trigger threshold when first section is fully in view
            if (index === 0) {
              const elementVisibility = (windowHeight - top) / height;
              if (elementVisibility >= 0.8) { // 80% visibility required
                setHasReachedThreshold(true);
              } else if (elementVisibility < 0.3) { // Reset when less than 30% visible
                setHasReachedThreshold(false);
              }
            }

            // Only proceed if threshold is reached and element is in view
            if (hasReachedThreshold && top < windowHeight && bottom > 0) {
              setActiveSection(index);
              
              // Calculate progress with reduced sensitivity
              let progress;
              if (index === 0) {
                // First section progress calculation
                const visibleHeight = windowHeight - top;
                const totalHeight = height;
                progress = Math.max(0, (visibleHeight / totalHeight) - 0.3); // Subtract initial 30%
              } else {
                // Subsequent sections progress calculation
                const sectionProgress = (windowHeight - top) / (height + windowHeight/2);
                progress = Math.max(0, sectionProgress);
              }
              
              // Normalize progress to 0-1 range
              progress = Math.min(Math.max(progress, 0), 1);
              
              // Only update if change is significant enough
              if (Math.abs(progress - lastProgress) >= MIN_PROGRESS_CHANGE) {
                // Apply stronger easing for smoother progression
                const easedProgress = easeInOutQuart(progress);
                setScrollProgress(easedProgress);
                lastProgress = easedProgress;
              }
            }
          }
        });
      }, 50); // 50ms debounce delay
    };

    // Enhanced easing function for smoother transitions
    const easeInOutQuart = (x: number): number => {
      // Quartic easing both in and out - more pronounced smooth effect
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasReachedThreshold, scrollProgress]);

  // Intersection Observer for initial visibility
  useEffect(() => {
    // Configure observer with higher threshold for better visibility detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only set visible when element is significantly in view
          if (entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
            setHasReachedThreshold(false); // Reset threshold state
          } else {
            setIsVisible(false);
          }
        });
      },
      { 
        threshold: [0.3, 0.8], // Observe at 30% and 80% visibility
        rootMargin: '-100px 0px' // Add top margin to delay trigger
      }
    );

    const section = document.querySelector('.progress-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Format progress percentage
  const progressPercentage = Math.round(scrollProgress * 100);

  return (
    <div className="relative py-12 overflow-hidden bg-background progress-section">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5" />
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, black 2%, transparent 0%),
            radial-gradient(circle at 75px 75px, black 2%, transparent 0%)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Progress indicator */}
        <div className="fixed top-24 right-8 z-50 hidden lg:block">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-4 shadow-lg border border-border/50">
            <div className="relative h-16 w-16">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  className="text-border"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                />
                <circle
                  className="text-primary transition-all duration-300 ease-in-out"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="30"
                  cx="32"
                  cy="32"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 30}`,
                    strokeDashoffset: `${2 * Math.PI * 30 * (1 - scrollProgress)}`
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="flex gap-4">
            {/* Progress line */}
            <div className="hidden md:block w-0.5 relative mx-4">
              <div className="absolute top-0 bottom-0 w-full bg-gray-800/30 rounded-full" />
              <div 
                className="absolute top-0 w-full bg-[#9c7c0b] rounded-full transition-all duration-500"
                style={{ 
                  height: `${scrollProgress * 100}%`,
                  boxShadow: '0 0 20px rgba(156,124,11,0.3)'
                }}
              />
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`absolute w-3 h-3 -left-1 transition-all duration-500 ${
                    index <= activeSection ? 'bg-[#9c7c0b]' : 'bg-gray-800/30'
                  } rounded-full ring-2 ring-offset-2 ring-offset-background ${
                    index <= activeSection ? 'ring-[#9c7c0b]/20' : 'ring-gray-800/10'
                  } ${hoveredSection === index ? 'scale-125' : 'scale-100'}`}
                  style={{ 
                    top: `${(index * 35)}%`,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredSection(index)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              ))}
            </div>

            {/* Content sections */}
            <div className="flex-1 space-y-16">
              {sections.map((section, index) => (
                <div
                  key={index}
                  ref={sectionRefs[index]}
                  className={`transform transition-all duration-500 p-6 rounded-lg 
                    hover:bg-accent/5 ${
                    index === activeSection ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'
                  } ${hoveredSection === index ? 'scale-102 shadow-lg' : 'scale-100'}`}
                  style={{
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={() => setHoveredSection(index)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <div 
                    className="inline-block px-4 py-2 mb-4 text-sm font-medium rounded-full 
                              transition-all duration-300 hover:scale-105 hover:shadow-md"
                    style={{ 
                      backgroundColor: index === 0 ? 'white' : 
                                     index === 1 ? '#9c7c0b' : 
                                     '#6b21a8',
                      color: index === 0 ? '#111' : 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                    {section.label}
                  </div>

                  <h3 className="text-2xl font-bold mb-6 transition-colors duration-300">
                    {section.title}
                  </h3>

                  <div className="space-y-3">
                    {section.points.map((point, i) => (
                      <div 
                        key={i} 
                        className="flex items-center space-x-3 text-muted-foreground p-2 
                                 rounded-md hover:bg-accent/10 transition-all duration-300
                                 hover:translate-x-2"
                        style={{
                          transitionDelay: `${i * 50}ms`
                        }}
                      >
                        <svg
                          className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                            index === activeSection ? 'text-[#9c7c0b]' : 'text-gray-400'
                          }`}
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
                        <span className="transition-colors duration-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="relative min-h-[500px] block">
            <div 
              className={`sticky top-24 w-full max-w-[400px] mx-auto aspect-square transition-all duration-700 ease-in-out
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ 
                transform: `translateY(${scrollProgress * 300}px)`,
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Grid of diagram elements */}
              <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4">
                {diagrams[activeSection].elements.map((element, i) => (
                  <div
                    key={i}
                    className={`transform transition-all duration-700 ease-in-out`}
                    style={{
                      transitionDelay: `${element.delay}ms`,
                      transform: `scale(${hoveredSection === activeSection ? 1.05 : 1})`
                    }}
                  >
                    <div className="bg-[rgb(30,33,36)] border border-white/20 rounded-lg shadow-lg p-6 
                                  flex flex-col items-center justify-center gap-3 group
                                  hover:bg-[rgb(40,43,46)] transition-all duration-500
                                  hover:shadow-xl hover:-translate-y-1">
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {element.icon}
                      </span>
                      <div className="text-center">
                        <span className="text-sm text-white/90 font-medium block">
                          {element.label}
                        </span>
                        <span className="text-xs text-white/60 block mt-1">
                          {element.description}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central connection and label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Connection lines */}
                  <div className="absolute inset-0 -m-16">
                    <div className="w-full h-0.5 bg-[#9c7c0b]/30 absolute top-1/2 -translate-y-1/2" />
                    <div className="h-full w-0.5 bg-[#9c7c0b]/30 absolute left-1/2 -translate-x-1/2" />
                  </div>
                  
                  {/* Central title */}
                  <div className={`px-6 py-3 rounded-lg shadow-lg text-sm font-medium 
                                hover:scale-105 hover:shadow-xl
                                transition-all duration-700 ease-in-out ${diagrams[activeSection].theme}`}>
                    {diagrams[activeSection].title}
                  </div>
                </div>
              </div>

              {/* Bottom connection label */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="bg-[#9c7c0b]/10 text-[#9c7c0b] px-6 py-3 rounded-lg text-sm 
                              font-medium transition-all duration-700 ease-in-out
                              hover:bg-[#9c7c0b]/20">
                  {diagrams[activeSection].connectionLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;