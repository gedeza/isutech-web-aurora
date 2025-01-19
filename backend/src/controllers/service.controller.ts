import { Request, Response } from 'express';
import Service from '../models/service.model';

export const createService = async (req: Request, res: Response) => {
  try {
    const serviceData = {
      ...req.body,
      image: req.file?.path,
    };

    const service = new Service(serviceData);
    await service.save();

    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Error creating service' });
  }
};

export const getAllServices = async (req: Request, res: Response) => {
  try {
    const { category, status } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Error getting services' });
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

export const updateService = async (req: Request, res: Response) => {
  try {
    const serviceData = { ...req.body };
    
    if (req.file) {
      serviceData.image = req.file.path;
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      serviceData,
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Error updating service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Here you might want to also delete the service image from storage
    // This would require implementing a file deletion utility

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Error deleting service' });
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