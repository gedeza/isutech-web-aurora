import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const AboutPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

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

  return (
    <div className="about-page">
      {/* Hero Section with Progress */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.06)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.06)'} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.08)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.08)'} 1px, transparent 1px)
            `,
            backgroundSize: '160px 160px'
          }}
        />
        
        {/* Grain effect */}
        <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-repeat opacity-[0.03] dark:opacity-[0.15]" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-accent/5" />
        
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <div className="overflow-hidden">
                <span className="block transform transition-transform duration-1000 translate-y-0 gradient-text dark:text-primary">
                  PASSION
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="block transform transition-transform duration-1000 delay-300 translate-y-0 text-foreground">
                  THINK
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="block transform transition-transform duration-1000 delay-600 translate-y-0 text-foreground">
                  BUILD
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl mx-auto">
              Transforming ideas into reality since 2012
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 animate-fade-in">Our Vision</h2>
            <p className="text-xl text-muted-foreground leading-relaxed animate-slide-up" style={{ transitionDelay: '200ms' }}>
              To be the leading force in technological innovation, creating solutions that transform businesses and enrich lives.
            </p>
          </div>
        </div>
      </section>

      {/* Company Journey Section */}
      <section className="py-32">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-fade-in">Our Journey</h2>
            <div className="space-y-16">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" style={{ top: '0', zIndex: 0 }} />
              
              {/* Foundation */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative animate-slide-in-right" style={{ transitionDelay: '200ms' }}>
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Founded in 2012</h3>
                  <p className="text-muted-foreground">Founded by Nhlanhla Mnyandu with a vision to transform technological landscape in Africa.</p>
                </div>
                <div className="w-full md:w-2/3 bg-background/50 p-6 rounded-lg border border-border hover:shadow-card transition-all duration-300">
                  <h4 className="font-bold mb-3 text-xl">Government Partnerships</h4>
                  <p className="text-muted-foreground mb-4">Established as a trusted partner in government proposals, projects, tenders, and service delivery.</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>IT hub development for schools</li>
                    <li>Equipment supply and licensing services</li>
                    <li>Road safety app development with Datamaps</li>
                    <li>Municipal website development</li>
                  </ul>
                </div>
              </div>

              {/* Recent Projects */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative animate-slide-in-left" style={{ transitionDelay: '400ms' }}>
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Recent Projects</h3>
                  <p className="text-muted-foreground">Delivering impactful solutions for municipalities and rural communities.</p>
                </div>
                <div className="w-full md:w-2/3 bg-background/50 p-6 rounded-lg border border-border hover:shadow-card transition-all duration-300">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-xl">Mdoni Municipality Website (2023)</h4>
                      <p className="text-muted-foreground">Comprehensive website development for managing blogs, articles, tenders, and official documentation.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-xl">Rural Development Project (2024)</h4>
                      <p className="text-muted-foreground">Partnership with DottoWorld for data collection in rural areas, focusing on utility compliance and community education.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Core Services */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative animate-slide-in-right" style={{ transitionDelay: '600ms' }}>
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Core Services</h3>
                  <p className="text-muted-foreground">Comprehensive technology solutions for modern businesses.</p>
                </div>
                <div className="w-full md:w-2/3 bg-background/50 p-6 rounded-lg border border-border hover:shadow-card transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-bold mb-3 text-xl">AI & Automation</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                        <li>Process Automation</li>
                        <li>AI Integration</li>
                        <li>Workflow Optimization</li>
                      </ul>
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <h4 className="font-bold mb-3 text-xl">Software Development</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                        <li>Custom Software Solutions</li>
                        <li>Shopify Development</li>
                        <li>Web Applications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative animate-slide-in-left" style={{ transitionDelay: '800ms' }}>
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Leadership</h3>
                  <p className="text-muted-foreground">Guided by experienced professionals with a vision for innovation.</p>
                </div>
                <div className="w-full md:w-2/3 bg-background/50 p-6 rounded-lg border border-border hover:shadow-card transition-all duration-300">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-3 text-xl">Sibongamandla Mnyandu</h4>
                      <p className="text-muted-foreground">CEO and Executive Director since 2024, leading iSu Technologies' transformation into a tech powerhouse.</p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-3 text-xl">Executive Leadership</h4>
                      <p className="text-muted-foreground">Supported by experienced financial leadership ensuring sustainable growth and strategic development.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Top Marquee */}
        <div className="marquee-container relative overflow-hidden bg-gradient-to-r from-background via-transparent to-background">
          <hr className="border-border" />
          <div className="flex whitespace-nowrap">
            <div className="animate-marquee-right flex min-w-full justify-around">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 mx-4">
                  <span className="text-4xl font-bold">PASSION</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-4xl font-bold">THINK</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-4xl font-bold">BUILD</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-border" />
        </div>

        {/* Bottom Marquee */}
        <div className="marquee-container relative overflow-hidden bg-gradient-to-r from-background via-transparent to-background mt-8">
          <hr className="border-border" />
          <div className="flex whitespace-nowrap">
            <div className="animate-marquee-left flex min-w-full justify-around">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 mx-4">
                  <span className="text-4xl font-bold">BUILD</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-4xl font-bold">THINK</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-4xl font-bold">PASSION</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20" className="text-primary">
                    <path fill="currentColor" fillRule="evenodd" d="M11.244 13.143c0-1.031.842-1.867 1.874-1.867h2.714a1.241 1.241 0 0 0 0-2.48l-2.706-.007a1.893 1.893 0 0 1-1.874-1.885L11.246 4.2A1.246 1.246 0 0 0 9.99 2.957a1.264 1.264 0 0 0-1.255 1.261L8.73 6.922v.02a1.865 1.865 0 0 1-1.865 1.856H4.168a1.239 1.239 0 1 0 0 2.478h2.697c1.026 0 1.86.831 1.865 1.858l.006 2.686a1.264 1.264 0 0 0 1.255 1.261 1.243 1.243 0 0 0 1.252-1.243z" clipRule="evenodd"/>
                    <path fill="currentColor" fillRule="evenodd" d="M8.67 13.09a1.873 1.873 0 0 1 2.646.004l1.92 1.92a1.24 1.24 0 0 0 1.751 0 1.24 1.24 0 0 0 .002-1.754l-1.909-1.918a1.893 1.893 0 0 1 .008-2.658l1.908-1.916a1.246 1.246 0 0 0-.009-1.766 1.264 1.264 0 0 0-1.779.004l-1.916 1.907-.014.014c-.73.723-1.905.72-2.631-.006L6.74 5.014a1.239 1.239 0 1 0-1.752 1.752l1.907 1.907c.726.726.727 1.903.005 2.633l-1.895 1.903A1.264 1.264 0 0 0 5 14.99a1.243 1.243 0 0 0 1.765.006z" clipRule="evenodd"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-border" />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Innovation</h3>
              <p className="text-muted-foreground">Pushing boundaries and creating new possibilities through creative thinking and advanced technology.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Excellence</h3>
              <p className="text-muted-foreground">Delivering exceptional quality in everything we do, exceeding expectations at every turn.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
              <p className="text-muted-foreground">Working together with our clients and partners to achieve remarkable results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto">
          <div className="values-container">
            <div className="text-center mb-16">
              <h2 className="text-6xl md:text-7xl font-bold mb-6">
                <div className="overflow-hidden">
                  <div className="nested-lines">CULTURE</div>
                </div>
              </h2>
              <h3 className="text-2xl md:text-3xl text-muted-foreground">
                <div className="overflow-hidden">
                  <div className="nested-lines">Commit to elevate people</div>
                </div>
                <div className="overflow-hidden">
                  <div className="nested-lines">lives, with honesty.</div>
                </div>
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="values-item p-6 bg-white rounded-lg border border-border transition-transform hover:scale-105">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 72 72">
                    <rect width="71" height="71" x="0.5" y="0.5" stroke="#D0D5DD" rx="7.5"></rect>
                    <path stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M44.558 24.56h.008m2.82 2.828c-3.749 3.749-8.054 5.521-9.616 3.96-1.562-1.563.21-5.868 3.96-9.617s8.054-5.522 9.616-3.96-.21 5.868-3.96 9.616m0-5.658c3.75 3.75 5.522 8.055 3.96 9.617s-5.867-.21-9.616-3.96c-3.75-3.749-5.522-8.054-3.96-9.616s5.867.21 9.616 3.96"></path>
                    <path stroke="#FE5000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 52.174h5.22c.681 0 1.358.081 2.018.243l5.516 1.34a8.55 8.55 0 0 0 3.653.086l6.099-1.187a8.4 8.4 0 0 0 4.255-2.215l4.315-4.198a3.006 3.006 0 0 0 0-4.337 3.22 3.22 0 0 0-4.122-.285l-5.029 3.669c-.72.526-1.596.81-2.498.81h-4.856 3.091c1.742 0 3.154-1.373 3.154-3.068v-.614c0-1.407-.985-2.634-2.388-2.974l-4.77-1.16A10 10 0 0 0 35.285 38c-1.93 0-5.422 1.598-5.422 1.598L24 42.05m-8-.85v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C17.52 56 18.08 56 19.2 56h1.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C24 54.48 24 53.92 24 52.8V41.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C22.48 38 21.92 38 20.8 38h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C16 39.52 16 40.08 16 41.2"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Inclusive</h4>
                <p className="text-muted-foreground">Foster an open environment built on trust, where everyone feels empowered to be themselves and make impact.</p>
              </div>

              <div className="values-item p-6 bg-white rounded-lg border border-border transition-transform hover:scale-105">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 72 72">
                    <rect width="71" height="71" x="0.5" y="0.5" stroke="#D0D5DD" rx="7.5"></rect>
                    <path stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 44.999c-3 2.52-4 10-4 10s7.48-1 10-4c1.42-1.68 1.4-4.26-.18-5.82a4.36 4.36 0 0 0-5.82-.18"></path>
                    <path stroke="#FE5000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m36 42-6-6m6 6a44.7 44.7 0 0 0 8-4m-8 4v10s6.06-1.1 8-4c2.16-3.24 0-10 0-10m-14-2a44 44 0 0 1 4-7.9A25.76 25.76 0 0 1 56 16c0 5.44-1.56 15-12 22m-14-2H20s1.1-6.06 4-8c3.24-2.16 10 0 10 0"></path>
                    <circle cx="46.4" cy="25.598" r="3.2" stroke="#FE5000" strokeWidth="2"></circle>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Resilient</h4>
                <p className="text-muted-foreground">Breakdown is an opportunity to a breakthrough. Keep the faith, take risks and growth. But most of all, have fun.</p>
              </div>

              <div className="values-item p-6 bg-white rounded-lg border border-border transition-transform hover:scale-105">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 72 72">
                    <rect width="71" height="71" x="0.5" y="0.5" stroke="#D0D5DD" rx="7.5"></rect>
                    <path stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M36 16v2M18 36h-2m7-13-1.2-1.2M49 23l1.2-1.2M56 36h-2"></path>
                    <path stroke="#FE5000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M32.071 56h7.858m-7.072-19.2h6.286M36 36.8v9.6m4.714-1.078C44.431 43.525 47 39.668 47 35.2 47 29.014 42.075 24 36 24s-11 5.014-11 11.2c0 4.468 2.57 8.325 6.286 10.122V46.4c0 1.491 0 2.236.239 2.825.319.784.93 1.407 1.7 1.731.578.244 1.31.244 2.775.244s2.197 0 2.774-.244a3.17 3.17 0 0 0 1.701-1.731c.24-.589.24-1.334.24-2.825z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Re-Invent</h4>
                <p className="text-muted-foreground">Exploring more and more way of thinking and learning yet problem solving.</p>
              </div>

              <div className="values-item p-6 bg-white rounded-lg border border-border transition-transform hover:scale-105">
                <div className="mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="none" viewBox="0 0 72 72">
                    <rect width="71" height="71" x="0.5" y="0.5" stroke="#D0D5DD" rx="7.5"></rect>
                    <path stroke="#98A2B3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 33a9 9 0 0 0 12.385 8.342c.2-.081.3-.122.38-.14a1 1 0 0 1 .219-.024c.083 0 .173.015.353.045l3.558.593c.373.062.56.093.694.035a.5.5 0 0 0 .262-.262c.058-.135.027-.321-.035-.694l-.593-3.558c-.03-.18-.045-.27-.045-.353 0-.081.006-.14.024-.219.018-.08.059-.18.14-.38h0A9 9 0 1 0 16 33"></path>
                    <path stroke="#FE5000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M43.5 40h.01M48 40h.01m4.49 0h.01M48 49a9 9 0 1 0-8.342-5.615c.081.2.122.3.14.38a1 1 0 0 1 .024.219c0 .083-.015.173-.045.353l-.593 3.558c-.062.373-.093.56-.035.694a.5.5 0 0 0 .262.262c.135.058.321.027.694-.035l3.558-.593c.18-.03.27-.045.353-.045.081 0 .14.006.219.024.08.018.18.059.38.14A9 9 0 0 0 48 49m-4-9a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3">360 Feedback</h4>
                <p className="text-muted-foreground">Effective communication is mandatory. Ensure to keep everyone updated, 360° feedback, insightful, and wins.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Transform Your Vision?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Let's work together to bring your ideas to life and create something extraordinary.</p>
          <a href="/contact" className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-opacity-90 transition-all">
            Start Your Journey
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 