import { Request, Response } from 'express';
import Documentation from '../models/Documentation';

// @desc    Create documentation
// @route   POST /api/docs
// @access  Private (Admin)
export const createDocumentation = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.create({
      ...req.body,
      author: req.user?.id,
    });

    res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.error('Error creating documentation:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating documentation',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Get all documentation
// @route   GET /api/docs
// @access  Public
export const getAllDocumentation = async (req: Request, res: Response) => {
  try {
    const { category, tag, isPublished = true } = req.query;
    const filter: any = { isPublished };

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = tag;
    }

    const docs = await Documentation.find(filter)
      .populate('author', 'name')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: docs.length,
      data: docs,
    });
  } catch (error) {
    console.error('Error fetching documentation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documentation',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Get single documentation by slug
// @route   GET /api/docs/:slug
// @access  Public
export const getDocumentation = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findOne({ 
      slug: req.params.slug,
      isPublished: true,
    }).populate('author', 'name');

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Documentation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.error('Error fetching documentation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching documentation',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Update documentation
// @route   PUT /api/docs/:id
// @access  Private (Admin)
export const updateDocumentation = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastUpdated: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate('author', 'name');

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Documentation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.error('Error updating documentation:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating documentation',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Delete documentation
// @route   DELETE /api/docs/:id
// @access  Private (Admin)
export const deleteDocumentation = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: 'Documentation not found',
      });
    }

    await doc.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Documentation deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting documentation:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting documentation',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}; 