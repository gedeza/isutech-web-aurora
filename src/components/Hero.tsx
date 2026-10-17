import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDCard } from './ui/3d-card';
import { API_URL } from '@/utils/api';

const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.15 
    }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

const Hero = () => {
  const [heroData, setHeroData] = useState({
    title: "Software for South Africa's public sector\nand regulated industries",
    subtitle: "Records management, property valuation, ISO compliance and government integration. Built in South Africa, with privacy by design."
  });

  useEffect(() => {
    fetch(`${API_URL}/content/hero_content`)
      .then(res => res.json())
      .then(data => {
        if (data && data.value) {
           const val = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
           setHeroData({
             title: val.title || heroData.title,
             subtitle: val.subtitle || heroData.subtitle
           });
        }
      })
      .catch(() => console.log('Using default hero content (API unavailable)'));
  }, []);

  const features = [
    {
      title: "Municipal & Public Sector",
      description: "Records management and government integration for institutions that run on legacy systems.",
    },
    {
      title: "Compliance & SHEQ",
      description: "ISO management-system evidence, gap analysis and audit packs for consultants and industry.",
    },
    {
      title: "Property Intelligence",
      description: "Property data, offline field inspections and analytics for valuers and municipalities.",
    }
  ];

  return (
    <section className="relative pt-24 pb-16 overflow-hidden min-h-screen flex flex-col justify-center bg-background transition-colors duration-300">
      {/* Absolute Background Glowing Orb */}
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-40" />
      
      {/* Inner Content */}
      <div className="container relative z-10 flex-1 flex flex-col justify-center">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={HERO_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {/* Framer Motion header reveal */}
          <motion.h1 
            variants={ITEM_VARIANTS}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 whitespace-pre-line leading-[1.1]"
          >
            {heroData.title}
          </motion.h1>

          <motion.p 
            variants={ITEM_VARIANTS}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-light"
          >
            {heroData.subtitle}
          </motion.p>
          
          <motion.div 
            variants={ITEM_VARIANTS}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/products" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-background bg-foreground rounded-full hover:scale-105 transition-transform duration-300 shadow-md">
              Explore Our Solutions
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-foreground bg-foreground/5 rounded-full hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-md border border-border">
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* 3D Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-3 gap-6 mt-20 lg:mt-32 max-w-6xl mx-auto"
        >
          {features.map((feature, idx) => (
            <ThreeDCard key={idx} className="h-full bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
              <div className="p-8 h-full flex flex-col justify-center text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  {/* Subtle iconic dot */}
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </ThreeDCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;