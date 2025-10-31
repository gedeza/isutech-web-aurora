import type { Request, Response } from "express"
import type { AuthRequest } from "../middleware/auth"
import Product, { type IProduct } from "../models/product.model"
import type { FilterQuery } from "mongoose"
import mongoose from "mongoose"

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query
    const filter: FilterQuery<IProduct> = {}

    if (category) {
      filter.category = category as string
    }

    if (status) {
      filter.status = status as IProduct["status"]
    } else {
      // If no status filter, only show Active products for public requests
      if (!req.headers.authorization) {
        filter.status = "Active"
      }
    }

    const products = await Product.find(filter).sort("-createdAt")
    res.json(products)
  } catch (error) {
    console.error("Get products error:", error)
    res.status(500).json({ message: "Error fetching products" })
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    // Check if the id is 'categories' and handle it separately
    if (req.params.id === "categories") {
      return getProductCategories(req, res)
    }

    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    console.error("Get product error:", error)
    res.status(500).json({ message: "Error fetching product" })
  }
};

// Get product categories
export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct("category")
    res.json(categories)
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ message: "Error fetching categories" })
  }
};

// Get product by slug
export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, status: 'Active' });
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
    if (!req.user?._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const product = new Product({
      ...req.body,
      createdBy: req.user._id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error creating product' 
    });
  }
};

// Update product (admin only)
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Error updating product' 
    });
  }
};

// Update product status (admin only)
export const updateProductStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    
    if (!status || !['Active', 'Draft', 'Archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product status error:', error);
    res.status(500).json({ message: 'Error updating product status' });
  }
};

// Delete product (admin only)
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};


// @desc    Add product variant
// @route   POST /api/products/:id/variants
// @access  Private/Admin
export const addProductVariant = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (!req.user?._id) {
      return res.status(401).json({ message: "User not authenticated" })
    }

    product.variants.push({
      ...req.body,
      _id: new mongoose.Types.ObjectId(),
    })

    await product.save()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An error occurred" })
  }
};

export const updateProductVariant = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const variantIndex = product.variants.findIndex((v) => v._id?.toString() === req.params.variantId)

    if (variantIndex === -1) {
      return res.status(404).json({ message: "Variant not found" })
    }

    product.variants[variantIndex] = {
      ...product.variants[variantIndex],
      ...req.body,
    }

    await product.save()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An error occurred" })
  }
};

export const deleteProductVariant = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    product.variants = product.variants.filter((v) => v._id?.toString() !== req.params.variantId)

    await product.save()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : "An error occurred" })
  }
};