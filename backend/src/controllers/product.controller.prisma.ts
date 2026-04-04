import type { Request, Response } from 'express';
import type { AuthRequest } from './auth.controller.prisma';
import { prisma } from '../lib/prisma';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    const where: any = {};

    if (category) {
      where.category = category as string;
    }

    if (status) {
      where.status = (status as string).toUpperCase();
    } else {
      // If no status filter, only show ACTIVE products for public requests
      if (!req.headers.authorization) {
        where.status = 'ACTIVE';
      }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        variants: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    // Check if the id is 'categories' and handle it separately
    if (req.params.id === 'categories') {
      return getProductCategories(req, res);
    }

    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        variants: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Get product categories
export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    const categories = products.map((p) => p.category);
    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

// Get product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: req.params.slug,
        status: 'ACTIVE',
      },
      include: {
        variants: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product by slug error:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create product (admin only)
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      name,
      slug,
      description,
      shortDescription,
      category,
      price,
      status,
      images,
      technologies,
      client,
      year,
      variants,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        category,
        price: parseFloat(price),
        status: status?.toUpperCase() || 'DRAFT',
        images: images || [],
        technologies: technologies || [],
        client,
        year,
        createdBy: req.user.id,
        variants: variants
          ? {
              create: variants.map((v: any) => ({
                name: v.name,
                price: parseFloat(v.price),
                description: v.description,
              })),
            }
          : undefined,
      },
      include: {
        variants: true,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update product (admin only)
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const {
      name,
      slug,
      description,
      shortDescription,
      category,
      price,
      status,
      images,
      technologies,
      client,
      year,
    } = req.body;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;
    if (description) updateData.description = description;
    if (shortDescription) updateData.shortDescription = shortDescription;
    if (category) updateData.category = category;
    if (price) updateData.price = parseFloat(price);
    if (status) updateData.status = status.toUpperCase();
    if (images) updateData.images = images;
    if (technologies) updateData.technologies = technologies;
    if (client !== undefined) updateData.client = client;
    if (year !== undefined) updateData.year = year;
    updateData.lastUpdated = new Date();

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        variants: true,
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Update product status (admin only)
export const updateProductStatus = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
        lastUpdated: new Date(),
      },
    });

    res.json(product);
  } catch (error) {
    console.error('Update product status error:', error);
    res.status(500).json({ message: 'Error updating product status' });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
