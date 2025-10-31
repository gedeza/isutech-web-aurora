import { Request, Response } from 'express';
import Service from '../models/service.model';
import { AuthRequest } from '../middleware/auth';

// Get all services
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
export const createService = async (req: AuthRequest, res: Response) => {
  try {
    const service = new Service({
      ...req.body,
      createdBy: req.user?._id
    });
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service
export const updateService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    Object.assign(service, req.body);
    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
export const deleteService = async (req: AuthRequest, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update service status
export const updateServiceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { status },
      { 
        new: true,
        runValidators: true,
        context: 'query' // This ensures only the status field is validated
      }
    );
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getServiceBySlug = async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Error getting service' });
  }
};

export const getServiceCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Service.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error getting categories' });
  }
}; 