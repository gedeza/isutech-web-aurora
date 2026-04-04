import type { Request, Response } from 'express';
import type { AuthRequest } from './auth.controller.prisma';
import { prisma } from '../lib/prisma';

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (status) {
      where.status = (status as string).toUpperCase();
    } else {
      // If no status filter, only show PUBLISHED services for public requests
      if (!req.headers.authorization) {
        where.status = 'PUBLISHED';
      }
    }

    const services = await prisma.service.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        processSteps: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Error fetching services' });
  }
};

// Get service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        processSteps: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Error fetching service' });
  }
};

// Get service by slug
export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const service = await prisma.service.findUnique({
      where: {
        slug: req.params.slug,
      },
      include: {
        processSteps: true,
      },
    });

    if (!service || service.status !== 'PUBLISHED') {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Get service by slug error:', error);
    res.status(500).json({ message: 'Error fetching service' });
  }
};

// Get service categories
export const getServiceCategories = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    const categories = services.map((s) => s.category);
    res.json({ categories });
  } catch (error) {
    console.error('Get service categories error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Create service (admin only)
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      name,
      slug,
      category,
      description,
      shortDescription,
      features,
      benefits,
      technologies,
      price,
      status,
      processes,
    } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        category,
        description,
        shortDescription,
        features: features || [],
        benefits: benefits || [],
        technologies: technologies || [],
        priceStarter: price?.starter ? parseFloat(price.starter) : 0,
        priceProfessional: price?.professional ? parseFloat(price.professional) : 0,
        priceEnterprise: price?.enterprise ? parseFloat(price.enterprise) : 0,
        status: status?.toUpperCase() || 'DRAFT',
        createdBy: req.user.id,
        processSteps: processes
          ? {
              create: processes.map((p: any) => ({
                title: p.title,
                description: p.description,
                order: p.order || 0,
              })),
            }
          : undefined,
      },
      include: {
        processSteps: true,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Error creating service' });
  }
};

// Update service (admin only)
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const {
      name,
      slug,
      category,
      description,
      shortDescription,
      features,
      benefits,
      technologies,
      price,
      status,
    } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (shortDescription) updateData.shortDescription = shortDescription;
    if (features) updateData.features = features;
    if (benefits) updateData.benefits = benefits;
    if (technologies) updateData.technologies = technologies;
    if (price?.starter) updateData.priceStarter = parseFloat(price.starter);
    if (price?.professional) updateData.priceProfessional = parseFloat(price.professional);
    if (price?.enterprise) updateData.priceEnterprise = parseFloat(price.enterprise);
    if (status) updateData.status = status.toUpperCase();
    updateData.lastUpdated = new Date();

    const service = await prisma.service.update({
      where: { id },
      data: updateData,
      include: {
        processSteps: true,
      },
    });

    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
};

// Update service status (admin only)
export const updateServiceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        lastUpdated: new Date(),
      },
    });

    res.json(service);
  } catch (error) {
    console.error('Update service status error:', error);
    res.status(500).json({ message: 'Error updating service status' });
  }
};

// Delete service (admin only)
export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service ID' });
    }

    await prisma.service.delete({
      where: { id },
    });

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
};
