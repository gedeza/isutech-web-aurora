import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeDCard } from '@/components/ui/3d-card';
import { ShieldCheck, Target, Lightbulb, Users, LineChart, Globe } from 'lucide-react';

const AboutPage = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Ideally fetch from /api/content/about_mission etc, but fallback to static immediately
    setContent({
      mission: "To empower organizations with intelligent technology that transforms compliance from a burden into a strategic advantage.\n\nWe believe that compliance, training, and professional development should be seamless, data-driven, and predictive. Our mission is to build systems that don't just track what happened, but predict what will happen and recommend what should happen next.",
      vision: "To become Africa's leading provider of AI-powered compliance and training intelligence platforms.\n\nWe envision a future where:\n- Every educator, trainer, and learner has access to intelligent systems that predict their success\n- Compliance is proactive, not reactive\n- Training providers can optimize outcomes using real-time analytics\n- Government departments can track and improve program effectiveness at scale\n- Data-driven decisions replace guesswork in the training sector"
    });
  }, []);

  const stats = [
    { value: "134%", label: "ROI Within 18 Months", delay: "0s" },
    { value: "78%", label: "ML Prediction Accuracy", delay: "0.1s" },
    { value: "40%", label: "Admin Time Savings", delay: "0.2s" },
    { value: "445K+", label: "Users At Scale", delay: "0.3s" }
  ];

  const values = [
    { title: "Innovation First", desc: "We embrace cutting-edge technologies (AI, ML, predictive analytics) to solve real problems. We're not interested in replicating existing systems—we build the future.", icon: <Lightbulb className="w-5 h-5" /> },
    { title: "Evidence-Based Solutions", desc: "Every claim we make is backed by data. Our 78% prediction accuracy, 134% ROI, and 40% efficiency gains aren't marketing—they're measured outcomes from real deployments.", icon: <LineChart className="w-5 h-5" /> },
    { title: "Client Success", desc: "We don't just deliver software; we deliver measurable business outcomes. Our success is measured by our clients' success: improved completion rates, reduced compliance risk, increased ROI.", icon: <Target className="w-5 h-5" /> },
    { title: "Transparency & Trust", desc: "We document everything, share our knowledge, and operate with complete transparency. This documentation hub is proof of our commitment to open collaboration.", icon: <ShieldCheck className="w-5 h-5" /> },
    { title: "African Impact", desc: "We're proud to be a South African company solving African problems at African scale. Our solutions are designed for the complexity and diversity of the African market.", icon: <Globe className="w-5 h-5" /> },
    { title: "Continuous Learning", desc: "We practice what we preach. Our team constantly learns, adapts, and improves. Every project teaches us something that makes the next one better.", icon: <Users className="w-5 h-5" /> }
  ];

  if (!content) return <div className="min-h-screen bg-background text-foreground" />;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Hero Header */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none opacity-50 dark:opacity-30" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4"
          >
            Company Overview
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">future</span><br />
            of compliance intelligence.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            iSu Technologies (Pty) Ltd is a South African technology company specializing in AI-powered solutions for training, compliance, and professional development sectors.
          </motion.p>
        </div>
      </section>

      {/* Track Record Stats */}
      <section className="py-20 relative z-10 border-y border-border bg-foreground/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground mb-8">
                <Target className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Mission</h2>
              <div className="text-muted-foreground font-light leading-relaxed whitespace-pre-line text-lg">
                {content.mission}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center text-foreground mb-8">
                <Globe className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-foreground">Vision</h2>
              <div className="text-muted-foreground font-light leading-relaxed whitespace-pre-line text-lg">
                {content.vision}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-32 relative z-10 bg-foreground/[0.01] border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Core Values</h2>
            <p className="text-lg text-muted-foreground font-light">
              The foundational principles that drive our engineering and business operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <ThreeDCard className="h-full bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                   <div className="p-8 h-full flex flex-col justify-start">
                      <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground mb-6">
                        {v.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-foreground">{v.title}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed">{v.desc}</p>
                   </div>
                </ThreeDCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Structure / Approach */}
      <section className="py-32 relative z-10 border-t border-border">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-foreground">A South African company,<br/>solving African problems.</h2>
                <p className="text-lg text-muted-foreground mb-6 font-light">
                  Our team combines deep technical expertise with a profound understanding of the South African regulatory and operational landscape.
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-foreground font-bold">1.</span>
                    <span className="text-muted-foreground font-light">Research & Discovery</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-foreground font-bold">2.</span>
                    <span className="text-muted-foreground font-light">Architecture & Design</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-foreground font-bold">3.</span>
                    <span className="text-muted-foreground font-light">Development & Testing</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-foreground font-bold">4.</span>
                    <span className="text-muted-foreground font-light">Zero-downtime Deployment</span>
                  </li>
                </ul>
              </motion.div>
              <div className="relative">
                 <div className="aspect-square rounded-full border border-border bg-foreground/[0.02] flex items-center justify-center p-12">
                    <div className="text-center">
                      <h4 className="text-foreground font-bold tracking-widest uppercase mb-4">Industries Served</h4>
                      <p className="text-muted-foreground font-light text-sm leading-loose">
                        Education & Training<br/>
                        Government & Public Sector<br/>
                        Professional Bodies (SACE, SETA)<br/>
                        NGOs & Development
                      </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;