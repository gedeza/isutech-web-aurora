import { Categories, Product } from '@/types/products';

export const categories: Categories = {
  marketing: {
    name: "Marketing Technology",
    description: "Enterprise marketing platforms",
    items: [
      { id: 'marketing-tech', name: 'Marketing Tech', count: 1 }
    ]
  },
  property: {
    name: "Property & Municipal",
    description: "Property valuation and analytical tools",
    items: [
      { id: 'property', name: 'Property & Municipal', count: 1 }
    ]
  },
  compliance: {
    name: "Compliance",
    description: "AI-powered ISO compliance and management",
    items: [
      { id: 'compliance', name: 'Compliance', count: 1 }
    ]
  },
  knowledge: {
    name: "Knowledge Management",
    description: "Documentation platforms",
    items: [
      { id: 'knowledge', name: 'Knowledge Management', count: 1 }
    ]
  }
};

export const products: Product[] = [
  {
    id: 1,
    name: "ThriveSend B2B2G",
    slug: "thrivesend",
    shortDescription: "Marketing Campaign Platform for Business & Government Clients",
    description: "A specialized content marketing platform designed for service providers who manage campaigns for both business and government clients.",
    category: "marketing-tech",
    year: "2025",
    images: ["/products/b2b2g-platform.jpg"],
    client: "Marketing Agencies & Govt Contractors",
    technologies: ['POPIA Compliance', 'Multi-tenant', 'Security Clearance', 'Next.js'],
    features: ['POPIA compliant data handling', 'Security clearance system', 'Government & business workflows', 'Multi-tenant architecture'],
    status: 'completed'
  },
  {
    id: 2,
    name: "AssessFlow",
    slug: "assessflow",
    shortDescription: "Property Valuation & Inspection Platform",
    description: "A comprehensive platform combining data aggregation, mobile inspection tools, and AI-powered analytics for property evaluators and municipalities across South Africa.",
    category: "property",
    year: "2025",
    images: ["/products/property-intelligence.jpg"],
    client: "Property Management Firms",
    technologies: ['PropertyData Engine', 'AI Analytics', 'Offline Mobile', 'MPRA'],
    features: ['83% cost reduction', 'AI-powered analytics', 'Mobile inspection tools (offline)', 'Sub-100ms response times'],
    status: 'completed'
  },
  {
    id: 3,
    name: "ConformEdge",
    slug: "conformedge",
    shortDescription: "AI-Powered ISO Compliance Management Platform",
    description: "An intelligent multi-tenant platform that transforms how organisations achieve, maintain, and demonstrate ISO certification compliance using artificial intelligence.",
    category: "compliance",
    year: "2025",
    images: ["/products/edtech-platform.jpg"],
    client: "ISO Consulting Firms",
    technologies: ['AI Classification', '7 ISO Standards', 'Subcontractor Portal', 'Real-time Gap Analysis'],
    features: ['AI document classification (90%+ accuracy)', 'Real-time gap analysis', 'One-click audit pack generation', '7 ISO standards supported'],
    status: 'completed'
  },
  {
    id: 4,
    name: "DocsHub",
    slug: "docshub",
    shortDescription: "Turnkey Documentation Platform for SA Organizations",
    description: "Professional, self-hosted documentation platform with POPIA compliance and South African data residency.",
    category: "knowledge",
    year: "2026",
    images: ["/products/design-system.jpg"],
    client: "Corporate Enterprises",
    technologies: ['MkDocs Material', 'SA Data Residency', 'POPIA Compliance'],
    features: ['Beautiful MkDocs interface', 'SA data residency (Hetzner CPT)', 'White-glove setup', 'Fixed monthly pricing'],
    status: 'ongoing'
  }
];