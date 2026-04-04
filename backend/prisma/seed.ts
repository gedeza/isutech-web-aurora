import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with iSu Technologies Company Overview & Product Portfolio...');

  // 1. Seed Site Content (About page info)
  const aboutMission = {
    title: "Mission",
    content: "To empower organizations with intelligent technology that transforms compliance from a burden into a strategic advantage.\n\nWe believe that compliance, training, and professional development should be seamless, data-driven, and predictive. Our mission is to build systems that don't just track what happened, but predict what will happen and recommend what should happen next."
  };

  const aboutVision = {
    title: "Vision",
    content: "To become Africa's leading provider of AI-powered compliance and training intelligence platforms.\n\nWe envision a future where:\n- Every educator, trainer, and learner has access to intelligent systems that predict their success\n- Compliance is proactive, not reactive\n- Training providers can optimize outcomes using real-time analytics\n- Government departments can track and improve program effectiveness at scale\n- Data-driven decisions replace guesswork in the training sector"
  };

  const aboutValues = [
    { title: "Innovation First", desc: "We embrace cutting-edge technologies (AI, ML, predictive analytics) to solve real problems. We're not interested in replicating existing systems—we build the future." },
    { title: "Evidence-Based Solutions", desc: "Every claim we make is backed by data. Our 78% prediction accuracy, 134% ROI, and 40% efficiency gains aren't marketing—they're measured outcomes from real deployments." },
    { title: "Client Success", desc: "We don't just deliver software; we deliver measurable business outcomes. Our success is measured by our clients' success: improved completion rates, reduced compliance risk, increased ROI." },
    { title: "Transparency & Trust", desc: "We document everything, share our knowledge, and operate with complete transparency." },
    { title: "Continuous Learning", desc: "We practice what we preach. Our team constantly learns, adapts, and improves." },
    { title: "African Impact", desc: "We're proud to be a South African company solving African problems at African scale." }
  ];

  await prisma.siteContent.upsert({
    where: { key: 'about_mission' },
    update: { value: aboutMission },
    create: { key: 'about_mission', value: aboutMission, description: 'Company Mission', type: 'json' }
  });

  await prisma.siteContent.upsert({
    where: { key: 'about_vision' },
    update: { value: aboutVision },
    create: { key: 'about_vision', value: aboutVision, description: 'Company Vision', type: 'json' }
  });

  await prisma.siteContent.upsert({
    where: { key: 'about_values' },
    update: { value: aboutValues },
    create: { key: 'about_values', value: aboutValues, description: 'Core Values', type: 'json' }
  });

  // 2. Add an Admin User if it doesn't exist
  const admin = await prisma.user.upsert({
    where: { email: 'admin@isutech.co.za' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@isutech.co.za',
      password: 'hashedpasswordplaceholder', // Should be hashed in prod
      role: 'ADMIN'
    }
  });

  // 3. Seed Products
  const products = [
    {
      name: "ThriveSend B2B2G",
      slug: "thrivesend",
      category: "Marketing Technology",
      shortDescription: "Marketing Campaign Platform for Business & Government Clients",
      description: "A specialized content marketing platform designed for service providers who manage campaigns for both business and government clients.",
      price: 12000,
      status: "ACTIVE",
      technologies: ["POPIA Compliance", "Multi-tenant", "Security Clearance System"],
      images: []
    },
    {
      name: "AssessFlow",
      slug: "assessflow",
      category: "Property & Municipal",
      shortDescription: "Property Valuation & Inspection Platform",
      description: "A comprehensive platform combining data aggregation, mobile inspection tools, and AI-powered analytics for property evaluators and municipalities.",
      price: 8500,
      status: "ACTIVE",
      technologies: ["PropertyData Engine", "Offline-Capable Mobile", "AI Analytics", "MPRA Compliance"],
      images: []
    },
    {
      name: "ConformEdge",
      slug: "conformedge",
      category: "Compliance",
      shortDescription: "AI-Powered ISO Compliance Management Platform",
      description: "An intelligent multi-tenant platform that transforms how organisations achieve, maintain, and demonstrate ISO certification compliance using artificial intelligence.",
      price: 0,
      status: "ACTIVE",
      technologies: ["AI Classification", "7 ISO Standards", "Subcontractor Portal", "Real-time Gap Analysis"],
      images: []
    },
    {
      name: "DocsHub",
      slug: "docshub",
      category: "Knowledge Management",
      shortDescription: "Turnkey Documentation Platform for SA Organizations (Coming Soon)",
      description: "Professional, self-hosted documentation platform with POPIA compliance and South African data residency.",
      price: 7500,
      status: "DRAFT",
      technologies: ["MkDocs Material", "SA Data Residency", "POPIA Compliance"],
      images: []
    }
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        category: prod.category,
        shortDescription: prod.shortDescription,
        description: prod.description,
        price: prod.price,
        // @ts-ignore
        status: prod.status,
        technologies: prod.technologies,
        createdBy: admin.id
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        category: prod.category,
        shortDescription: prod.shortDescription,
        description: prod.description,
        price: prod.price,
        // @ts-ignore
        status: prod.status,
        technologies: prod.technologies,
        createdBy: admin.id
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
