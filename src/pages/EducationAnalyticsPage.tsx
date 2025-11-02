import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Map, FileText, AlertCircle, GraduationCap, Target, Brain, Clock } from 'lucide-react';

const EducationAnalyticsPage = () => {
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

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Predictive Enrollment Forecasting',
      description: 'Leverage ML models to predict enrollment trends and optimize resource allocation for future academic periods.'
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Career Progression Tracking',
      description: 'Monitor student career paths post-graduation with comprehensive tracking and success metrics.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-time KPI Dashboards',
      description: 'Interactive dashboards providing instant insights into institutional performance across all metrics.'
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: 'Geographic Performance Analysis',
      description: 'Visualize student performance and institutional reach across different geographic regions.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Automated Report Generation',
      description: 'Schedule and generate comprehensive reports automatically for stakeholders and compliance.'
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Risk Assessment Models',
      description: 'Identify at-risk students early with predictive analytics and intervention recommendations.'
    }
  ];

  const technologies = [
    { name: 'Next.js 14', color: 'bg-blue-500' },
    { name: 'FastAPI', color: 'bg-green-500' },
    { name: 'PostgreSQL', color: 'bg-indigo-500' },
    { name: 'ML/AI', color: 'bg-purple-500' },
    { name: 'Railway', color: 'bg-pink-500' }
  ];

  const capabilities = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: 'ML-Powered Insights',
      description: 'Advanced machine learning models analyzing patterns across enrollment, retention, and performance data to provide actionable intelligence.'
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: 'Data-Driven Decision Making',
      description: 'Transform raw educational data into strategic insights that drive institutional success and student outcomes.'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: 'Real-Time Analytics',
      description: 'Access up-to-the-minute analytics and performance metrics to respond quickly to emerging trends and challenges.'
    }
  ];

  const metrics = [
    { value: '10K+', label: 'Students Tracked' },
    { value: '95%', label: 'Prediction Accuracy' },
    { value: '<200ms', label: 'Dashboard Load Time' },
    { value: '24/7', label: 'System Uptime' }
  ];

  return (
    <div className="education-analytics-page min-h-screen bg-background">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">ML-Powered Educational Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in delay-200">
              Education Analytics Platform
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in delay-300">
              Advanced analytics platform for educational institutions featuring predictive modeling, career progression analysis, and real-time dashboards for data-driven decision making.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in delay-400">
              {technologies.map((tech, index) => (
                <span key={index} className={`px-4 py-2 ${tech.color} text-white rounded-full text-sm font-semibold`}>
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in delay-500">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Core Capabilities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering educational institutions with intelligent analytics and predictive insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="group p-8 bg-card rounded-lg hover:shadow-lg transition-all duration-300 border border-border hover:border-primary">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
                <p className="text-muted-foreground">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive analytics tools designed for educational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-background rounded-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Status */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 border border-primary/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Project Status: Ongoing</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Educational Insights</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Developed for a leading educational institution to enhance data-driven decision making and improve student outcomes through advanced analytics and ML-powered predictions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                <div className="text-sm font-semibold text-primary mb-2">Client</div>
                <div className="text-lg font-medium">Educational Institution</div>
              </div>
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border border-primary/10">
                <div className="text-sm font-semibold text-primary mb-2">Year</div>
                <div className="text-lg font-medium">2024</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background/50 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="text-sm font-semibold text-primary mb-3">Technology Stack</div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-background rounded-full text-sm border border-border">
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Discover how our analytics platform can help your institution make data-driven decisions and improve student outcomes.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold text-lg"
            >
              Get in Touch
              <Users className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationAnalyticsPage;
