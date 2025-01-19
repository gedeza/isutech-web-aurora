import { Request, Response } from 'express';
import Product from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = {
      ...req.body,
      images: (req.files as Express.Multer.File[])?.map(file => file.path) || [],
    };

    const product = new Product(productData);
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Error getting products' });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Error getting product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = { ...req.body };
    
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      productData.images = (req.files as Express.Multer.File[]).map(file => file.path);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Here you might want to also delete the product images from storage
    // This would require implementing a file deletion utility

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

export const getProductCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error getting categories' });
  }
}; 