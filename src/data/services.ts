// Fallback service catalogue, shown when the CMS has no published services (or the API is down).
// Category strings must match the icon mapping in Services.tsx / ServicesPage.tsx.
export interface FallbackService {
  _id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  status: 'Published';
}

export const FALLBACK_SERVICES: FallbackService[] = [
  {
    _id: 'srv-records',
    name: 'Records & Document Management',
    category: 'Government Solutions',
    shortDescription: 'Electronic records management built for South African municipalities.',
    description:
      'Move from paper and shared drives to a governed electronic records system with a NARSSA-aligned file plan, retention schedules, workflow and POPIA-aware access control. Delivered as Polelo DMS.',
    features: ['NARSSA-aligned file plan', 'Workflow and approvals', 'Search, versioning and OCR', 'Works through connectivity loss'],
    status: 'Published',
  },
  {
    _id: 'srv-property',
    name: 'Property Valuation & Inspection',
    category: 'Digital Transformation',
    shortDescription: 'Data, field tools and analytics for valuers and municipalities.',
    description:
      'Bring property data together, take inspections into the field on a phone that keeps working offline, and use AI-assisted analytics to support valuation work. Delivered as AssessFlow.',
    features: ['Property data aggregation', 'Offline mobile inspections', 'AI-assisted analytics', 'Municipal valuation workflows'],
    status: 'Published',
  },
  {
    _id: 'srv-compliance',
    name: 'ISO & SHEQ Compliance',
    category: 'AI & Automation',
    shortDescription: 'Keep management-system evidence organised and audit-ready.',
    description:
      'AI-assisted mapping of documents to ISO clauses, live gap analysis, corrective-action tracking and one-click audit packs, for consultants and for construction, mining and infrastructure firms. Delivered as ConformEdge.',
    features: ['Seven ISO standards', 'Document-to-clause mapping', 'Gap analysis', 'Audit pack generation'],
    status: 'Published',
  },
  {
    _id: 'srv-govintegration',
    name: 'Government Integration',
    category: 'Government Solutions',
    shortDescription: 'Connect the systems an institution already runs to national digital infrastructure.',
    description:
      'GovBridge connects existing municipal and departmental systems without replacing them, returns only the data a declared purpose needs, records every exchange in a tamper-evident audit log, and leaves every decision to an official. Currently a working demonstrator on synthetic data; it is not connected to live government systems.',
    features: ['Read-only connectors to legacy systems', 'Purpose-based access and audit trail', 'Officials make every decision', 'Demonstrator on synthetic data'],
    status: 'Published',
  },
  {
    _id: 'srv-custom',
    name: 'Custom Software & AI',
    category: 'Custom Development',
    shortDescription: 'Software and AI-assisted workflows built around how you work.',
    description:
      'Web and mobile applications, integrations and AI-assisted workflows for organisations whose process does not fit an off-the-shelf product. We design AI to assist people, with a person approving what matters.',
    features: ['Web and mobile applications', 'System integration', 'AI-assisted workflows', 'Hosted in South Africa'],
    status: 'Published',
  },
];
