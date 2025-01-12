import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobApplicationForm from '@/components/careers/JobApplicationForm';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  status: 'active' | 'filled';
}

const CareersPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const jobListings: JobListing[] = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Durban, South Africa",
      type: "Full-time",
      description: "Join our engineering team to build innovative solutions for enterprise clients.",
      requirements: [
        "5+ years of experience in full-stack development",
        "Strong proficiency in React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS/Azure)",
        "Understanding of microservices architecture"
      ],
      status: 'active'
    },
    {
      id: 2,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful and intuitive user interfaces for our digital products.",
      requirements: [
        "3+ years of UI/UX design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing web/mobile projects",
        "Experience with user research and testing"
      ],
      status: 'active'
    },
    {
      id: 3,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Durban, South Africa",
      type: "Full-time",
      description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
      requirements: [
        "3+ years of DevOps experience",
        "Strong knowledge of AWS/Azure services",
        "Experience with Docker and Kubernetes",
        "Proficiency in Infrastructure as Code"
      ],
      status: 'active'
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      description: "Lead product strategy and development for our enterprise solutions.",
      requirements: [
        "4+ years of product management experience",
        "Strong analytical and problem-solving skills",
        "Experience with agile methodologies",
        "Excellent communication and leadership abilities"
      ],
      status: 'active'
    },
    {
      id: 5,
      title: "Data Scientist",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Develop and implement machine learning models and data analytics solutions.",
      requirements: [
        "Masters/PhD in Computer Science, Statistics, or related field",
        "Experience with Python, R, and ML frameworks",
        "Strong background in statistical analysis",
        "Knowledge of big data technologies"
      ],
      status: 'active'
    },
    {
      id: 6,
      title: "Technical Project Manager",
      department: "Product",
      location: "Durban, South Africa",
      type: "Full-time",
      description: "Manage and deliver complex technical projects for our enterprise clients.",
      requirements: [
        "5+ years of technical project management experience",
        "PMP certification preferred",
        "Strong understanding of software development lifecycle",
        "Experience with enterprise software implementations"
      ],
      status: 'active'
    },
    {
      id: 7,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build responsive and performant user interfaces for our web applications.",
      requirements: [
        "3+ years of frontend development experience",
        "Expertise in React and TypeScript",
        "Experience with modern CSS and animation",
        "Knowledge of performance optimization techniques"
      ],
      status: 'active'
    },
    {
      id: 8,
      title: "Business Analyst",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      description: "Analyze business requirements and translate them into technical specifications.",
      requirements: [
        "3+ years of business analysis experience",
        "Strong analytical and documentation skills",
        "Experience with enterprise software",
        "Excellent communication abilities"
      ],
      status: 'active'
    }
  ];

  const departments = ['all', ...new Set(jobListings.map(job => job.department))];
  const filteredJobs = jobListings
    .filter(job => selectedDepartment === 'all' || job.department === selectedDepartment)
    .filter(job => 
      searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="careers-page">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <h3 className="text-lg text-primary mb-4 animate-fade-in">JOIN OUR TEAM</h3>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in delay-200">
              Build the future<br />with us
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in delay-300">
              Join a team of innovators and problem solvers dedicated to transforming businesses through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-background/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Culture</h2>
              <p className="text-muted-foreground">
                At iSuTech, we foster an environment of innovation, collaboration, and continuous learning. 
                Our team members are empowered to take ownership of their work and make a real impact.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Innovation", desc: "We encourage creative solutions" },
                  { title: "Growth", desc: "Continuous learning and development" },
                  { title: "Balance", desc: "Flexible work arrangements" },
                  { title: "Impact", desc: "Make a difference in businesses" }
                ].map((value, index) => (
                  <div 
                    key={value.title}
                    className="p-6 rounded-lg bg-background border border-border/40 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Benefits</h2>
              <div className="space-y-4">
                {[
                  "Competitive salary and benefits package",
                  "Remote work options",
                  "Professional development opportunities",
                  "Health and wellness programs",
                  "Team building events",
                  "Modern work equipment",
                  "Performance bonuses",
                  "Paid time off"
                ].map((benefit, index) => (
                  <div 
                    key={benefit}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search and Filter Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-border/40 bg-background focus:border-primary transition-colors"
                />
                <svg 
                  className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 transform -translate-y-1/2"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedDepartment === dept
                      ? 'bg-primary text-white'
                      : 'bg-background border border-border/40 hover:border-primary'
                  }`}
                >
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted-foreground mb-8">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedDepartment !== 'all' && ` in ${selectedDepartment}`}
          </p>

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group p-6 rounded-lg bg-background border border-border/40 hover:border-primary transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      {job.status === 'active' && (
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn-primary whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Don't see a perfect match?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. 
            Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default CareersPage; 