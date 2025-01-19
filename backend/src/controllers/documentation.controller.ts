import { Request, Response } from 'express';
import Documentation from '../models/documentation.model';

export const createDoc = async (req: Request, res: Response) => {
  try {
    const doc = new Documentation({
      ...req.body,
      metadata: {
        ...req.body.metadata,
        author: req.user?.name || 'Admin',
      },
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (error) {
    console.error('Create documentation error:', error);
    res.status(500).json({ message: 'Error creating documentation' });
  }
};

export const getAllDocs = async (req: Request, res: Response) => {
  try {
    const { category, subcategory, status, version } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (status) filter.status = status;
    if (version) filter.version = version;

    const docs = await Documentation.find(filter)
      .sort({ category: 1, subcategory: 1, order: 1 })
      .populate('relatedDocs', 'title slug');

    res.json(docs);
  } catch (error) {
    console.error('Get documentation error:', error);
    res.status(500).json({ message: 'Error getting documentation' });
  }
};

export const getDocBySlug = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findOne({ slug: req.params.slug })
      .populate('relatedDocs', 'title slug');

    if (!doc) {
      return res.status(404).json({ message: 'Documentation not found' });
    }

    res.json(doc);
  } catch (error) {
    console.error('Get documentation error:', error);
    res.status(500).json({ message: 'Error getting documentation' });
  }
};

export const updateDoc = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        'metadata.lastUpdated': new Date(),
      },
      { new: true, runValidators: true }
    ).populate('relatedDocs', 'title slug');

    if (!doc) {
      return res.status(404).json({ message: 'Documentation not found' });
    }

    res.json(doc);
  } catch (error) {
    console.error('Update documentation error:', error);
    res.status(500).json({ message: 'Error updating documentation' });
  }
};

export const deleteDoc = async (req: Request, res: Response) => {
  try {
    const doc = await Documentation.findByIdAndDelete(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Documentation not found' });
    }

    // Remove this doc from relatedDocs arrays of other docs
    await Documentation.updateMany(
      { relatedDocs: doc._id },
      { $pull: { relatedDocs: doc._id } }
    );

    res.json({ message: 'Documentation deleted successfully' });
  } catch (error) {
    console.error('Delete documentation error:', error);
    res.status(500).json({ message: 'Error deleting documentation' });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Documentation.aggregate([
      {
        $group: {
          _id: '$category',
          subcategories: { $addToSet: '$subcategory' },
        },
      },
      {
        $project: {
          category: '$_id',
          subcategories: {
            $filter: {
              input: '$subcategories',
              as: 'subcategory',
              cond: { $ne: ['$$subcategory', null] },
            },
          },
          _id: 0,
        },
      },
    ]);

    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error getting categories' });
  }
};

export const searchDocs = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const docs = await Documentation.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { 'metadata.tags': { $regex: query, $options: 'i' } },
      ],
      status: 'published',
    }).select('title slug summary category subcategory version');

    res.json(docs);
  } catch (error) {
    console.error('Search documentation error:', error);
    res.status(500).json({ message: 'Error searching documentation' });
  }
}; 