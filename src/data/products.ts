import { Categories, Product } from '@/types/products';

export const categories: Categories = {
  dx: {
    name: "Digital Transformation (DX)",
    description: "Modernizing businesses through digital solutions",
    items: [
      { id: 'apps-modernization', name: 'Apps Modernization', count: 2 },
      { id: 'bss', name: 'Business Support System', count: 2 },
      { id: 'cloud', name: 'Cloud Infrastructure', count: 2 },
      { id: 'product-dev', name: 'Product Development', count: 2 }
    ]
  },
  cx: {
    name: "Customer Experience Transformation (CX)",
    description: "Enhancing user experiences and interactions",
    items: [
      { id: 'design-system', name: 'Design System', count: 2 },
      { id: 'ui-ux', name: 'UI/UX Solutions', count: 2 }
    ]
  },
  rdx: {
    name: "Research, Experience, Development (RDX)",
    description: "Innovating through research and development",
    items: [
      { id: 'iot', name: 'IoT & Embedded System', count: 2 },
      { id: 'ai', name: 'AI & Deep Learning', count: 2 }
    ]
  }
};

export const products: Product[] = [
  {
    id: 1,
    name: "Payslip Management",
    shortDesc: "Automated Payroll System",
    description: "Streamline your payroll process with our comprehensive payslip management system.",
    category: "bss",
    year: "2024",
    image: "/products/payslip.jpg",
    client: "Internal Product",
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    features: ['Automated calculations', 'Tax management', 'Employee portal'],
    status: 'completed'
  },
  {
    id: 2,
    name: "Task Management",
    shortDesc: "Team Collaboration Platform",
    description: "Keep your team organized and productive with our intuitive task management solution.",
    category: "product-dev",
    year: "2023",
    image: "/products/task.jpg",
    client: "Internal Product",
    technologies: ['Vue.js', 'Express', 'MongoDB'],
    features: ['Real-time updates', 'Team chat', 'Project tracking'],
    status: 'completed'
  },
  {
    id: 3,
    name: "Timestamp Management",
    shortDesc: "Time Tracking Solution",
    description: "Monitor and manage employee work hours with precision.",
    category: "bss",
    year: "2023",
    image: "/products/timestamp.jpg",
    client: "Internal Product",
    technologies: ['React', 'Firebase', 'Node.js'],
    features: ['Attendance tracking', 'Leave management', 'Reports'],
    status: 'completed'
  },
  {
    id: 4,
    name: "IoT Dashboard",
    shortDesc: "Real-time Device Monitoring",
    description: "Comprehensive IoT dashboard for device monitoring and management.",
    category: "iot",
    year: "2024",
    image: "/products/iot.jpg",
    client: "Manufacturing Client",
    technologies: ['React', 'WebSocket', 'Python'],
    features: ['Real-time monitoring', 'Alert system', 'Analytics'],
    status: 'ongoing'
  },
  {
    id: 5,
    name: "E-commerce Platform",
    shortDesc: "Modern Shopping Experience",
    description: "Feature-rich e-commerce platform with advanced features.",
    category: "product-dev",
    year: "2024",
    image: "/products/ecommerce.jpg",
    client: "Retail Client",
    technologies: ['Next.js', 'Stripe', 'MongoDB'],
    features: ['Payment integration', 'Inventory management', 'Analytics'],
    status: 'ongoing'
  },
  {
    id: 6,
    name: "Legacy System Migration",
    shortDesc: "Modern Application Transformation",
    description: "Transform legacy applications into modern, scalable solutions using cutting-edge technologies.",
    category: "apps-modernization",
    year: "2024",
    image: "/products/legacy-migration.jpg",
    client: "Government Agency",
    technologies: ['Java', 'Spring Boot', 'React', 'AWS'],
    features: ['Cloud migration', 'API modernization', 'Performance optimization'],
    status: 'completed'
  },
  {
    id: 7,
    name: "Cloud Infrastructure Setup",
    shortDesc: "Scalable Cloud Solutions",
    description: "Design and implementation of robust cloud infrastructure with high availability and security.",
    category: "cloud",
    year: "2024",
    image: "/products/cloud-infra.jpg",
    client: "Enterprise Client",
    technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes'],
    features: ['Auto-scaling', 'Load balancing', 'Disaster recovery'],
    status: 'completed'
  },
  {
    id: 8,
    name: "Design System Implementation",
    shortDesc: "Unified Design Language",
    description: "Create and implement a comprehensive design system for consistent user experiences.",
    category: "design-system",
    year: "2024",
    image: "/products/design-system.jpg",
    client: "Tech Company",
    technologies: ['Figma', 'React', 'Storybook', 'Tailwind CSS'],
    features: ['Component library', 'Style guide', 'Design tokens'],
    status: 'completed'
  },
  {
    id: 9,
    name: "Smart Factory System",
    shortDesc: "Industrial IoT Solution",
    description: "Comprehensive IoT solution for smart manufacturing and industrial automation.",
    category: "iot",
    year: "2024",
    image: "/products/smart-factory.jpg",
    client: "Manufacturing Company",
    technologies: ['Python', 'MQTT', 'TensorFlow', 'AWS IoT'],
    features: ['Predictive maintenance', 'Quality control', 'Resource optimization'],
    status: 'ongoing'
  },
  {
    id: 10,
    name: "AI-Powered Analytics",
    shortDesc: "Intelligent Data Analysis",
    description: "Advanced analytics platform using AI for business intelligence and decision making.",
    category: "ai",
    year: "2024",
    image: "/products/ai-analytics.jpg",
    client: "Financial Institution",
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'AWS SageMaker'],
    features: ['Predictive analytics', 'Pattern recognition', 'Automated reporting'],
    status: 'ongoing'
  },
  {
    id: 11,
    name: "UX Research Platform",
    shortDesc: "User Research Tool",
    description: "Comprehensive platform for conducting and analyzing user research and feedback.",
    category: "ui-ux",
    year: "2024",
    image: "/products/ux-research.jpg",
    client: "Research Agency",
    technologies: ['React', 'Node.js', 'MongoDB', 'D3.js'],
    features: ['User testing', 'Analytics dashboard', 'Report generation'],
    status: 'completed'
  },
  {
    id: 12,
    name: "Monolith to Microservices",
    shortDesc: "Application Modernization",
    description: "Transform monolithic applications into scalable microservices architecture.",
    category: "apps-modernization",
    year: "2024",
    image: "/products/microservices.jpg",
    client: "Enterprise Client",
    technologies: ['Spring Boot', 'Docker', 'Kubernetes', 'MongoDB'],
    features: ['Service mesh', 'API gateway', 'Distributed tracing'],
    status: 'ongoing'
  },
  {
    id: 13,
    name: "Multi-Cloud Management",
    shortDesc: "Cloud Orchestration",
    description: "Unified platform for managing multi-cloud infrastructure and resources.",
    category: "cloud",
    year: "2024",
    image: "/products/multi-cloud.jpg",
    client: "Technology Company",
    technologies: ['AWS', 'Azure', 'GCP', 'Terraform'],
    features: ['Resource management', 'Cost optimization', 'Security compliance'],
    status: 'ongoing'
  },
  {
    id: 14,
    name: "AI Customer Service",
    shortDesc: "Intelligent Support System",
    description: "AI-powered customer service platform with natural language processing capabilities.",
    category: "ai",
    year: "2024",
    image: "/products/ai-support.jpg",
    client: "Service Provider",
    technologies: ['Python', 'NLP', 'FastAPI', 'Redis'],
    features: ['Chatbot', 'Sentiment analysis', 'Automated responses'],
    status: 'completed'
  },
  {
    id: 15,
    name: "Design System Portal",
    shortDesc: "Design Documentation",
    description: "Interactive portal for accessing and managing design system components.",
    category: "design-system",
    year: "2024",
    image: "/products/design-portal.jpg",
    client: "Digital Agency",
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Framer Motion'],
    features: ['Component showcase', 'Documentation', 'Version control'],
    status: 'completed'
  }
]; 