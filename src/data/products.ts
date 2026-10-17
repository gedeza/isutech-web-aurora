import { Categories, Product } from '@/types/products';

export const categories: Categories = {
  records: {
    name: "Records Management",
    description: "Electronic records management for local government",
    items: [
      { id: 'records', name: 'Records Management', count: 1 }
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
    description: "AI-assisted ISO compliance and management",
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
    name: "Polelo DMS",
    slug: "polelo-dms",
    shortDescription: "Electronic Records Management for South African Municipalities",
    description: "A NARSSA-aligned, POPIA-aware electronic records management system for local government. Document and records management, a retention-aware file plan and configurable workflow in one platform, hosted in South Africa.",
    category: "records",
    year: "2026",
    images: [],
    client: "Municipalities & Local Government",
    technologies: ['NARSSA File Plan', 'POPIA by Design', 'Workflow Designer', 'Offline Sync'],
    features: ['NARSSA-aligned file plan and retention schedules', 'Versioning, full-text search and OCR', 'Graphical workflow designer', 'Multi-factor sign-in and field-level access control', 'Keeps working through connectivity loss'],
    status: 'completed'
  },
  {
    id: 2,
    name: "AssessFlow",
    slug: "assessflow",
    shortDescription: "Property Valuation & Inspection Platform",
    description: "A platform combining data aggregation, mobile inspection tools and AI-assisted analytics for property valuers and municipalities across South Africa.",
    category: "property",
    year: "2025",
    images: [],
    client: "Municipalities & Property Valuers",
    technologies: ['Property Data Aggregation', 'AI-Assisted Analytics', 'Offline Mobile', 'MPRA'],
    features: ['Property data brought together in one place', 'AI-assisted analytics', 'Mobile inspection tools that work offline', 'Supports municipal valuation (MPRA) workflows'],
    status: 'completed'
  },
  {
    id: 3,
    name: "ConformEdge",
    slug: "conformedge",
    shortDescription: "AI-Assisted ISO Compliance Management Platform",
    description: "A multi-tenant platform that helps organisations and the consultants who serve them organise evidence, find gaps and stay audit-ready across seven ISO management-system standards.",
    category: "compliance",
    year: "2025",
    images: [],
    client: "ISO Consultants, Construction & Mining Firms",
    technologies: ['AI Document Classification', '7 ISO Standards', 'Subcontractor Portal', 'Gap Analysis'],
    features: ['AI-assisted mapping of documents to ISO clauses', 'Live gap analysis', 'One-click audit pack generation', 'ISO 9001, 14001, 45001, 27001, 22301, 37001 and 39001'],
    status: 'completed'
  },
  {
    id: 4,
    name: "DocsHub",
    slug: "docshub",
    shortDescription: "Documentation Platform for South African Organisations",
    description: "A documentation platform for organisations that want a searchable, well-structured knowledge base hosted in South Africa.",
    category: "knowledge",
    year: "2026",
    images: [],
    client: "Organisations Needing a Documentation Hub",
    technologies: ['Searchable Knowledge Base', 'South African Data Residency', 'POPIA Aware'],
    features: ['Searchable, structured documentation', 'South African data residency', 'Public and sign-in-protected sections'],
    status: 'ongoing'
  }
];
