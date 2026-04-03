import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

// Get all content
export const getAllContent = async (req: Request, res: Response) => {
  try {
    const contents = await prisma.siteContent.findMany({
      orderBy: { key: 'asc' },
    });
    res.json(contents);
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ message: 'Server error fetching content' });
  }
};

// Get content by key
export const getContentByKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const content = await prisma.siteContent.findUnique({
      where: { key },
    });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content by key:', error);
    res.status(500).json({ message: 'Server error fetching content' });
  }
};

// Create or Update content
export const upsertContent = async (req: Request, res: Response) => {
  try {
    const { key, value, description, type } = req.body;
    
    if (!key || value === undefined) {
      return res.status(400).json({ message: 'Key and value are required' });
    }

    const content = await prisma.siteContent.upsert({
      where: { key },
      update: {
        value,
        description,
        type,
      },
      create: {
        key,
        value,
        description,
        type: type || 'text',
      },
    });

    res.status(200).json(content);
  } catch (error) {
    console.error('Error upserting content:', error);
    res.status(500).json({ message: 'Server error updating content' });
  }
};

// Delete content
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    
    await prisma.siteContent.delete({
      where: { key },
    });
    
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: 'Server error deleting content' });
  }
};
